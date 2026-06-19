# -*- coding: utf-8 -*-
"""
金寨驾校 报名后端服务
- POST /api/enroll        接收报名信息，写入 SQLite
- GET  /admin             管理后台（需登录）查看报名列表
- GET/POST /admin/login   管理员登录
- GET  /admin/logout      退出登录
- POST /admin/<id>/status 切换处理状态（待联系/已联系）
- POST /admin/<id>/delete 删除一条报名
- GET  /admin/export.csv  导出全部报名为 CSV

依赖: flask  (见 requirements.txt)
配置(环境变量, 可选):
  ADMIN_USER       管理员用户名     默认 admin
  ADMIN_PASSWORD   管理员密码       默认见下方 DEFAULT_PASSWORD
  SECRET_KEY       会话加密密钥     默认随机(重启后登录态失效, 生产建议固定)
  DB_PATH          数据库文件路径   默认 当前目录 enrollments.db
"""
import os
import re
import csv
import io
import sqlite3
import secrets
from datetime import datetime
from functools import wraps

from flask import (
    Flask, request, jsonify, session, redirect, url_for,
    render_template_string, Response, abort
)
from werkzeug.security import generate_password_hash, check_password_hash

# ------------------------------------------------------------------
# 配置
# ------------------------------------------------------------------
ADMIN_USER = os.environ.get("ADMIN_USER", "admin")
DEFAULT_PASSWORD = "Jzjx@2026!"          # 默认密码, 强烈建议用环境变量 ADMIN_PASSWORD 覆盖
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", DEFAULT_PASSWORD)
ADMIN_PASSWORD_HASH = generate_password_hash(ADMIN_PASSWORD)

DB_PATH = os.environ.get(
    "DB_PATH",
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "enrollments.db"),
)

PHONE_RE = re.compile(r"^1[3-9]\d{9}$")   # 中国大陆 11 位手机号

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", secrets.token_hex(32))
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)


# ------------------------------------------------------------------
# 数据库
# ------------------------------------------------------------------
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS enrollments (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT NOT NULL,
            phone      TEXT NOT NULL,
            course     TEXT,
            message    TEXT,
            source     TEXT,
            status     TEXT NOT NULL DEFAULT 'new',   -- new=待联系 done=已联系
            ip         TEXT,
            user_agent TEXT,
            created_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()


init_db()


# ------------------------------------------------------------------
# 报名接口 (前端表单调用)
# ------------------------------------------------------------------
COURSE_LABELS = {
    "C1C2": "C1/C2 小型汽车",
    "Truck": "货车（B2/A2）",
    "Forklift": "叉车",
    "Motor": "摩托车（E/F证）",
    "C1": "C1驾照（手动挡）",
    "C2": "C2驾照（自动挡）",
    "B2": "B2驾照（货车）",
    "A2": "牵引车 A2",
    "enrollment": "报名咨询",
    "course": "课程咨询",
    "price": "价格咨询",
    "visit": "预约参观",
    "other": "其他咨询",
}


@app.after_request
def add_cors(resp):
    # 仅为 /api 放开跨域, 方便本地 vite 开发 (生产同源由 nginx 代理, 无影响)
    if request.path.startswith("/api/"):
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
        resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return resp


@app.route("/api/enroll", methods=["POST", "OPTIONS"])
def enroll():
    if request.method == "OPTIONS":
        return ("", 204)

    data = request.get_json(silent=True) or request.form
    name = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()
    course = (data.get("course") or "").strip()
    message = (data.get("message") or "").strip()
    source = (data.get("source") or "").strip()

    # 服务端校验 (不信任前端)
    if not (2 <= len(name) <= 50):
        return jsonify(success=False, error="请输入正确的姓名"), 400
    if not PHONE_RE.match(phone):
        return jsonify(success=False, error="请输入正确的11位手机号码"), 400
    if len(message) > 500:
        message = message[:500]

    course = COURSE_LABELS.get(course, course)[:50]

    conn = get_db()
    conn.execute(
        "INSERT INTO enrollments (name, phone, course, message, source, ip, user_agent, created_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (
            name, phone, course, message, source,
            request.headers.get("X-Forwarded-For", request.remote_addr),
            request.headers.get("User-Agent", "")[:300],
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        ),
    )
    conn.commit()
    conn.close()
    return jsonify(success=True, message="报名成功，我们会尽快与您联系！")


# ------------------------------------------------------------------
# 管理后台
# ------------------------------------------------------------------
def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get("logged_in"):
            return redirect(url_for("admin_login"))
        return f(*args, **kwargs)
    return wrapper


LOGIN_HTML = """
<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>管理员登录 - 金寨驾校</title>
<style>
 body{font-family:-apple-system,"PingFang SC",sans-serif;background:#f4f6f9;margin:0;
  display:flex;align-items:center;justify-content:center;min-height:100vh}
 .card{background:#fff;padding:36px 32px;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.08);width:320px}
 h1{font-size:20px;margin:0 0 24px;text-align:center;color:#1a3b6e}
 label{display:block;font-size:13px;color:#555;margin:14px 0 6px}
 input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #d9dee5;border-radius:6px;font-size:14px}
 button{width:100%;margin-top:24px;padding:11px;background:#1a73e8;color:#fff;border:0;border-radius:6px;
  font-size:15px;cursor:pointer}
 button:hover{background:#155ab0}
 .err{color:#d93025;font-size:13px;margin-top:14px;text-align:center}
</style></head><body>
<form class="card" method="post">
 <h1>金寨驾校 · 报名管理后台</h1>
 <label>用户名</label>
 <input name="username" autocomplete="username" autofocus>
 <label>密码</label>
 <input name="password" type="password" autocomplete="current-password">
 {% if error %}<div class="err">{{ error }}</div>{% endif %}
 <button type="submit">登录</button>
</form></body></html>
"""

ADMIN_HTML = """
<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>报名管理 - 金寨驾校</title>
<style>
 body{font-family:-apple-system,"PingFang SC",sans-serif;background:#f4f6f9;margin:0;color:#222}
 header{background:#1a3b6e;color:#fff;padding:16px 28px;display:flex;justify-content:space-between;align-items:center}
 header h1{font-size:18px;margin:0}
 header a{color:#cfe0ff;text-decoration:none;font-size:14px;margin-left:18px}
 .wrap{padding:24px 28px}
 .stat{color:#555;font-size:14px;margin-bottom:16px}
 table{width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;
  box-shadow:0 2px 12px rgba(0,0,0,.05)}
 th,td{padding:12px 14px;text-align:left;font-size:14px;border-bottom:1px solid #eef1f5;vertical-align:top}
 th{background:#f7f9fc;color:#555;font-weight:600;white-space:nowrap}
 tr:hover td{background:#fafcff}
 .phone{font-weight:600;color:#1a3b6e}
 .badge{display:inline-block;padding:3px 9px;border-radius:20px;font-size:12px}
 .b-new{background:#fff4e5;color:#b9651b}
 .b-done{background:#e6f4ea;color:#1a7f37}
 .btn{font-size:12px;padding:5px 10px;border:0;border-radius:5px;cursor:pointer;text-decoration:none;color:#fff}
 .btn-toggle{background:#1a73e8}
 .btn-del{background:#d93025}
 .msg{color:#666;max-width:260px;white-space:pre-wrap}
 .empty{padding:60px;text-align:center;color:#999}
 form.inline{display:inline}
</style></head><body>
<header>
  <h1>金寨驾校 · 报名管理</h1>
  <div>
    <a href="{{ url_for('export_csv') }}">导出 CSV</a>
    <a href="{{ url_for('admin_logout') }}">退出登录</a>
  </div>
</header>
<div class="wrap">
  <div class="stat">共 {{ rows|length }} 条报名 · 待联系 {{ new_count }} 条</div>
  {% if rows %}
  <table>
    <tr>
      <th>#</th><th>提交时间</th><th>姓名</th><th>手机号</th><th>意向课程</th>
      <th>留言</th><th>来源</th><th>状态</th><th>操作</th>
    </tr>
    {% for r in rows %}
    <tr>
      <td>{{ r['id'] }}</td>
      <td>{{ r['created_at'] }}</td>
      <td>{{ r['name'] }}</td>
      <td class="phone">{{ r['phone'] }}</td>
      <td>{{ r['course'] or '-' }}</td>
      <td class="msg">{{ r['message'] or '-' }}</td>
      <td>{{ r['source'] or '-' }}</td>
      <td>
        {% if r['status'] == 'done' %}
          <span class="badge b-done">已联系</span>
        {% else %}
          <span class="badge b-new">待联系</span>
        {% endif %}
      </td>
      <td>
        <form class="inline" method="post" action="{{ url_for('toggle_status', rid=r['id']) }}">
          <button class="btn btn-toggle" type="submit">
            {{ '设为待联系' if r['status']=='done' else '标记已联系' }}
          </button>
        </form>
        <form class="inline" method="post" action="{{ url_for('delete_row', rid=r['id']) }}"
              onsubmit="return confirm('确定删除这条报名？');">
          <button class="btn btn-del" type="submit">删除</button>
        </form>
      </td>
    </tr>
    {% endfor %}
  </table>
  {% else %}
  <div class="empty">暂无报名信息</div>
  {% endif %}
</div></body></html>
"""


@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    error = None
    if request.method == "POST":
        u = request.form.get("username", "")
        p = request.form.get("password", "")
        if u == ADMIN_USER and check_password_hash(ADMIN_PASSWORD_HASH, p):
            session["logged_in"] = True
            return redirect(url_for("admin"))
        error = "用户名或密码错误"
    return render_template_string(LOGIN_HTML, error=error)


@app.route("/admin/logout")
def admin_logout():
    session.clear()
    return redirect(url_for("admin_login"))


@app.route("/admin")
@login_required
def admin():
    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM enrollments ORDER BY id DESC"
    ).fetchall()
    new_count = sum(1 for r in rows if r["status"] != "done")
    conn.close()
    return render_template_string(ADMIN_HTML, rows=rows, new_count=new_count)


@app.route("/admin/<int:rid>/status", methods=["POST"])
@login_required
def toggle_status(rid):
    conn = get_db()
    row = conn.execute("SELECT status FROM enrollments WHERE id=?", (rid,)).fetchone()
    if row:
        new_status = "new" if row["status"] == "done" else "done"
        conn.execute("UPDATE enrollments SET status=? WHERE id=?", (new_status, rid))
        conn.commit()
    conn.close()
    return redirect(url_for("admin"))


@app.route("/admin/<int:rid>/delete", methods=["POST"])
@login_required
def delete_row(rid):
    conn = get_db()
    conn.execute("DELETE FROM enrollments WHERE id=?", (rid,))
    conn.commit()
    conn.close()
    return redirect(url_for("admin"))


@app.route("/admin/export.csv")
@login_required
def export_csv():
    conn = get_db()
    rows = conn.execute("SELECT * FROM enrollments ORDER BY id DESC").fetchall()
    conn.close()

    buf = io.StringIO()
    buf.write("﻿")  # BOM, 让 Excel 正确识别中文
    writer = csv.writer(buf)
    writer.writerow(["ID", "提交时间", "姓名", "手机号", "意向课程", "留言", "来源", "状态"])
    for r in rows:
        writer.writerow([
            r["id"], r["created_at"], r["name"], r["phone"],
            r["course"] or "", r["message"] or "", r["source"] or "",
            "已联系" if r["status"] == "done" else "待联系",
        ])
    return Response(
        buf.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment; filename=enrollments.csv"},
    )


@app.route("/healthz")
def healthz():
    return "ok"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
