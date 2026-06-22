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
import json
import sqlite3
import secrets
from datetime import datetime
from functools import wraps

from flask import (
    Flask, request, jsonify, session, redirect, url_for,
    render_template_string, Response, abort
)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

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

# 图片上传目录（nginx 静态目录下的 uploads，上传后可经 /uploads/xxx 直接访问）
UPLOAD_DIR = os.environ.get("UPLOAD_DIR", "/var/www/jinzhai-drive-school/uploads")
ALLOWED_IMG = {".jpg", ".jpeg", ".png", ".gif", ".webp"}

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


# ------------------------------------------------------------------
# 网站可编辑内容（核心常改字段）默认值——前端写死内容的副本，作为兜底
# ------------------------------------------------------------------
DEFAULT_CONTENT = {
    "global": {
        "phone": "0564-7358222",
        "address": "安徽省六安市金寨县现代产业园",
        "hours1": "周一至周五：8:00 - 18:00",
        "hours2": "周六：8:00 - 17:00",
        "hours3": "周日：9:00 - 16:00",
    },
    "home": {
        "hero_title": "专业驾驶培训",
        "hero_subtitle": "金寨驾校 - 金寨县专业驾培领航者 - 20余年驾培经验",
        "hero_image": "",
        "about_title": "驾校简介",
        "about_text1": "金寨驾校于1995年申报，1999年7月经省运管局批准立项，同年11月正式面向社会招生办学。作为金寨县历史悠久的驾驶培训机构，我们已有超过20年的办学经验，培养了数万名合格驾驶员。",
        "about_text2": "我校占地70余亩，拥有教学楼及附属房屋90间，配备完善的教学设施、宽敞的训练场地和一支经验丰富的教练团队，致力于为每一位学员提供专业、便捷、高效的驾驶培训服务。",
    },
    "courses": [
        {"name": "C1/C2驾照", "price": "¥3320起", "desc": "小型汽车，手动(C1)与自动挡(C2)培训费同价，自有考场，考训一体。", "image": ""},
        {"name": "货车（B2/A2）", "price": "¥3980起", "desc": "大型货车、牵引车，初学与增驾均可，专业大车带教，另设叉车特种作业培训。", "image": ""},
        {"name": "叉车", "price": "¥1600起", "desc": "特种作业培训，零基础可报，考取后持证上岗。", "image": ""},
        {"name": "摩托车（E/F证）", "price": "¥860起", "desc": "专业摩托车训练场地，学习周期短，1-2个月可完成。", "image": ""},
    ],
}


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
    conn.execute(
        "CREATE TABLE IF NOT EXISTS site_content (id INTEGER PRIMARY KEY CHECK(id=1), data TEXT)"
    )
    # 跟进记录字段（老库平滑升级）
    cols = [r[1] for r in conn.execute("PRAGMA table_info(enrollments)")]
    if "note" not in cols:
        conn.execute("ALTER TABLE enrollments ADD COLUMN note TEXT")
    # 访问埋点表
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS pageviews (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            path       TEXT,
            ip         TEXT,
            day        TEXT,
            user_agent TEXT,
            created_at TEXT NOT NULL
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_pv_day ON pageviews(day)")
    conn.commit()
    conn.close()


init_db()


def client_ip():
    xff = request.headers.get("X-Forwarded-For", "")
    if xff:
        return xff.split(",")[0].strip()
    return request.headers.get("X-Real-IP", request.remote_addr or "")


def _deep_merge(default, override):
    """把已保存内容覆盖到默认值上（新增的默认字段也能出现）。"""
    if isinstance(default, dict) and isinstance(override, dict):
        out = dict(default)
        for k, v in override.items():
            out[k] = _deep_merge(default.get(k), v)
        return out
    return override if override is not None else default


def get_content():
    conn = get_db()
    row = conn.execute("SELECT data FROM site_content WHERE id=1").fetchone()
    conn.close()
    stored = json.loads(row["data"]) if row and row["data"] else {}
    return _deep_merge(DEFAULT_CONTENT, stored)


def save_content(content):
    conn = get_db()
    conn.execute(
        "INSERT INTO site_content (id, data) VALUES (1, ?) "
        "ON CONFLICT(id) DO UPDATE SET data=excluded.data",
        (json.dumps(content, ensure_ascii=False),),
    )
    conn.commit()
    conn.close()


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
 .note-form{display:flex;flex-direction:column;gap:6px}
 .note-form textarea{width:180px;border:1px solid #d9dee5;border-radius:5px;padding:6px 8px;font-size:13px;font-family:inherit;resize:vertical}
 /* 手机端: 表格转卡片(标签在上,内容在下) */
 @media (max-width:700px){
  .note-form textarea{width:100%}
  header{padding:14px 16px;flex-wrap:wrap;row-gap:8px}
  header h1{font-size:16px}
  header a{margin-left:0;margin-right:16px}
  .wrap{padding:14px}
  table{background:transparent;box-shadow:none}
  table,tbody,tr,td{display:block;width:100%}
  tr:first-child{display:none}
  tr{background:#fff;border-radius:10px;margin-bottom:14px;box-shadow:0 2px 12px rgba(0,0,0,.06);overflow:hidden;padding:4px 0}
  td{padding:7px 16px;border-bottom:1px solid #f4f6f9;text-align:left;word-break:break-word}
  td::before{content:attr(data-label);display:block;font-size:12px;font-weight:600;color:#8a93a0;margin-bottom:3px}
  td.msg{max-width:none}
  td.actions{display:flex;gap:8px;padding-top:12px}
  td.actions::before{display:none}
  td:last-child{border-bottom:0}
  .btn{padding:8px 14px;font-size:13px}
 }
</style></head><body>
<header>
  <h1>金寨驾校 · 报名管理</h1>
  <div>
    <a href="{{ url_for('admin_content') }}">网站内容</a>
    <a href="{{ url_for('admin_logout') }}">退出登录</a>
  </div>
</header>
<div class="wrap">
  <div class="stat">共 {{ rows|length }} 条报名 · 待联系 {{ new_count }} 条</div>
  {% if rows %}
  <table>
    <tr>
      <th>#</th><th>提交时间</th><th>姓名</th><th>手机号</th><th>意向课程</th>
      <th>留言</th><th>来源</th><th>状态</th><th>操作</th><th>跟进记录</th>
    </tr>
    {% for r in rows %}
    <tr>
      <td data-label="#">{{ r['id'] }}</td>
      <td data-label="提交时间">{{ r['created_at'] }}</td>
      <td data-label="姓名">{{ r['name'] }}</td>
      <td class="phone" data-label="手机号">{{ r['phone'] }}</td>
      <td data-label="意向课程">{{ r['course'] or '-' }}</td>
      <td class="msg" data-label="留言">{{ r['message'] or '-' }}</td>
      <td data-label="来源">{{ r['source'] or '-' }}</td>
      <td data-label="状态">
        {% if r['status'] == 'done' %}
          <span class="badge b-done">已联系</span>
        {% else %}
          <span class="badge b-new">待联系</span>
        {% endif %}
      </td>
      <td data-label="操作" class="actions">
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
      <td data-label="跟进记录">
        <form method="post" action="{{ url_for('save_note', rid=r['id']) }}" class="note-form">
          <textarea name="note" rows="2" placeholder="填写跟进记录…">{{ r['note'] or '' }}</textarea>
          <button class="btn btn-toggle" type="submit">保存</button>
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


CONTENT_HTML = """
<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>网站内容管理 - 金寨驾校</title>
<style>
 body{font-family:-apple-system,"PingFang SC",sans-serif;background:#f4f6f9;margin:0;color:#222}
 header{background:#1a3b6e;color:#fff;padding:16px 28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;row-gap:8px}
 header h1{font-size:18px;margin:0}
 header a{color:#cfe0ff;text-decoration:none;font-size:14px;margin-left:18px}
 .wrap{max-width:820px;margin:0 auto;padding:22px 16px}
 .card{background:#fff;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,.05);padding:20px 22px;margin-bottom:20px}
 .card h2{font-size:17px;color:#1a3b6e;margin:0 0 16px;border-left:4px solid #1a73e8;padding-left:10px}
 .field{margin-bottom:16px}
 label{display:block;font-size:13px;color:#555;font-weight:600;margin-bottom:6px}
 input[type=text],textarea{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #d9dee5;border-radius:6px;font-size:14px;font-family:inherit}
 textarea{min-height:76px;resize:vertical;line-height:1.6}
 .row{display:flex;gap:14px;flex-wrap:wrap}
 .row .field{flex:1;min-width:160px}
 .imgbox{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
 .imgbox img{height:70px;border-radius:6px;border:1px solid #e3e7ee}
 .imgtip{font-size:12px;color:#999}
 .course{border:1px solid #eef1f5;border-radius:8px;padding:14px;margin-bottom:14px;background:#fafcff}
 .course h3{margin:0 0 12px;font-size:15px;color:#333}
 .save{position:sticky;bottom:0;background:#f4f6f9;padding:14px 0;text-align:center}
 .btn{background:#1a73e8;color:#fff;border:0;padding:13px 40px;border-radius:8px;font-size:16px;cursor:pointer}
 .toast{background:#e6f4ea;color:#1a7f37;padding:10px 16px;border-radius:6px;margin-bottom:16px;text-align:center}
</style></head><body>
<header>
  <h1>金寨驾校 · 网站内容管理</h1>
  <div>
    <a href="{{ url_for('admin') }}">报名管理</a>
    <a href="{{ url_for('admin_logout') }}">退出登录</a>
  </div>
</header>
<div class="wrap">
  {% if saved %}<div class="toast">✅ 已保存，网站已即时更新（访客刷新即可看到）</div>{% endif %}
  <form method="post" enctype="multipart/form-data">

    <div class="card">
      <h2>全局信息</h2>
      <div class="field"><label>报名电话</label><input type="text" name="g_phone" value="{{ c.global.phone }}"></div>
      <div class="field"><label>校区地址</label><input type="text" name="g_address" value="{{ c.global.address }}"></div>
      <div class="row">
        <div class="field"><label>营业时间·行1</label><input type="text" name="g_hours1" value="{{ c.global.hours1 }}"></div>
        <div class="field"><label>营业时间·行2</label><input type="text" name="g_hours2" value="{{ c.global.hours2 }}"></div>
        <div class="field"><label>营业时间·行3</label><input type="text" name="g_hours3" value="{{ c.global.hours3 }}"></div>
      </div>
    </div>

    <div class="card">
      <h2>首页</h2>
      <div class="field"><label>大图标题</label><input type="text" name="h_hero_title" value="{{ c.home.hero_title }}"></div>
      <div class="field"><label>大图副标题</label><input type="text" name="h_hero_subtitle" value="{{ c.home.hero_subtitle }}"></div>
      <div class="field">
        <label>首页大图（hero）</label>
        <div class="imgbox">
          {% if c.home.hero_image %}<img src="{{ c.home.hero_image }}">{% else %}<span class="imgtip">（当前使用默认图）</span>{% endif %}
          <input type="file" name="hero_image_file" accept="image/*">
        </div>
        <input type="hidden" name="hero_image_cur" value="{{ c.home.hero_image }}">
      </div>
      <div class="field"><label>关于·标题</label><input type="text" name="h_about_title" value="{{ c.home.about_title }}"></div>
      <div class="field"><label>关于·段落1</label><textarea name="h_about_text1">{{ c.home.about_text1 }}</textarea></div>
      <div class="field"><label>关于·段落2</label><textarea name="h_about_text2">{{ c.home.about_text2 }}</textarea></div>
    </div>

    <div class="card">
      <h2>课程（4 项）</h2>
      {% for i in range(4) %}
      <div class="course">
        <h3>课程 {{ i+1 }}</h3>
        <div class="row">
          <div class="field"><label>名称</label><input type="text" name="c{{ i }}_name" value="{{ c.courses[i].name }}"></div>
          <div class="field"><label>价格</label><input type="text" name="c{{ i }}_price" value="{{ c.courses[i].price }}"></div>
        </div>
        <div class="field"><label>描述</label><textarea name="c{{ i }}_desc">{{ c.courses[i].desc }}</textarea></div>
        <div class="field">
          <label>课程配图</label>
          <div class="imgbox">
            {% if c.courses[i].image %}<img src="{{ c.courses[i].image }}">{% else %}<span class="imgtip">（当前使用默认图）</span>{% endif %}
            <input type="file" name="c{{ i }}_image_file" accept="image/*">
          </div>
          <input type="hidden" name="c{{ i }}_image_cur" value="{{ c.courses[i].image }}">
        </div>
      </div>
      {% endfor %}
    </div>

    <div class="save"><button class="btn" type="submit">保存并发布</button></div>
  </form>
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


# ------------------------------------------------------------------
# 网站内容管理（CMS）
# ------------------------------------------------------------------
@app.route("/api/content")
def api_content():
    """前端读取网站内容（公开）。"""
    return jsonify(get_content())


def _save_image(file_storage, prefix):
    if not file_storage or not file_storage.filename:
        return None
    ext = os.path.splitext(file_storage.filename)[1].lower()
    if ext not in ALLOWED_IMG:
        return None
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    fname = secure_filename(f"{prefix}_{secrets.token_hex(6)}{ext}")
    file_storage.save(os.path.join(UPLOAD_DIR, fname))
    try:
        os.chmod(os.path.join(UPLOAD_DIR, fname), 0o644)
    except Exception:
        pass
    return "/uploads/" + fname


@app.route("/admin/content", methods=["GET", "POST"])
@login_required
def admin_content():
    saved = False
    if request.method == "POST":
        c = get_content()
        f = request.form
        c["global"] = {
            "phone": f.get("g_phone", "").strip(),
            "address": f.get("g_address", "").strip(),
            "hours1": f.get("g_hours1", "").strip(),
            "hours2": f.get("g_hours2", "").strip(),
            "hours3": f.get("g_hours3", "").strip(),
        }
        hero_img = _save_image(request.files.get("hero_image_file"), "hero") or f.get("hero_image_cur", "")
        c["home"] = {
            "hero_title": f.get("h_hero_title", "").strip(),
            "hero_subtitle": f.get("h_hero_subtitle", "").strip(),
            "hero_image": hero_img,
            "about_title": f.get("h_about_title", "").strip(),
            "about_text1": f.get("h_about_text1", "").strip(),
            "about_text2": f.get("h_about_text2", "").strip(),
        }
        courses = []
        for i in range(4):
            img = _save_image(request.files.get(f"c{i}_image_file"), f"course{i}") or f.get(f"c{i}_image_cur", "")
            courses.append({
                "name": f.get(f"c{i}_name", "").strip(),
                "price": f.get(f"c{i}_price", "").strip(),
                "desc": f.get(f"c{i}_desc", "").strip(),
                "image": img,
            })
        c["courses"] = courses
        save_content(c)
        saved = True
    return render_template_string(CONTENT_HTML, c=get_content(), saved=saved)


# ------------------------------------------------------------------
# 访问埋点 + 跟进记录 + 访问统计
# ------------------------------------------------------------------
@app.route("/api/track", methods=["POST", "OPTIONS"])
def api_track():
    """前端每次访问页面调用，记录 PV（JS 触发，天然过滤大部分爬虫）。"""
    if request.method == "OPTIONS":
        return ("", 204)
    data = request.get_json(silent=True) or {}
    path = (data.get("path") or "/")[:200]
    now = datetime.now()
    conn = get_db()
    conn.execute(
        "INSERT INTO pageviews (path, ip, day, user_agent, created_at) VALUES (?,?,?,?,?)",
        (path, client_ip(), now.strftime("%Y-%m-%d"),
         request.headers.get("User-Agent", "")[:300], now.strftime("%Y-%m-%d %H:%M:%S")),
    )
    conn.commit()
    conn.close()
    return ("", 204)


@app.route("/admin/<int:rid>/note", methods=["POST"])
@login_required
def save_note(rid):
    conn = get_db()
    conn.execute("UPDATE enrollments SET note=? WHERE id=?",
                 (request.form.get("note", "").strip()[:1000], rid))
    conn.commit()
    conn.close()
    return redirect(url_for("admin"))


STATS_HTML = """
<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>访问统计 - 金寨驾校</title>
<style>
 body{font-family:-apple-system,"PingFang SC",sans-serif;background:#f4f6f9;margin:0;color:#222}
 header{background:#1a3b6e;color:#fff;padding:16px 28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;row-gap:8px}
 header h1{font-size:18px;margin:0} header a{color:#cfe0ff;text-decoration:none;font-size:14px;margin-left:18px}
 .wrap{max-width:860px;margin:0 auto;padding:22px 16px}
 .cards{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:22px}
 .stat-card{flex:1;min-width:150px;background:#fff;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,.05);padding:20px;text-align:center}
 .stat-card .num{font-size:32px;font-weight:700;color:#1a73e8} .stat-card .lbl{font-size:13px;color:#777;margin-top:6px}
 .card{background:#fff;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,.05);padding:18px 20px;margin-bottom:20px}
 .card h2{font-size:16px;color:#1a3b6e;margin:0 0 14px;border-left:4px solid #1a73e8;padding-left:10px}
 table{width:100%;border-collapse:collapse;font-size:14px} th,td{padding:9px 12px;text-align:left;border-bottom:1px solid #eef1f5}
 th{background:#f7f9fc;color:#555} .muted{color:#888;font-size:12px}
</style></head><body>
<header>
  <h1>金寨驾校 · 访问统计</h1>
  <div><a href="{{ url_for('admin') }}">报名管理</a><a href="{{ url_for('admin_content') }}">网站内容</a><a href="{{ url_for('admin_logout') }}">退出登录</a></div>
</header>
<div class="wrap">
  <div class="cards">
    <div class="stat-card"><div class="num">{{ total_pv }}</div><div class="lbl">总访问次数 (PV)</div></div>
    <div class="stat-card"><div class="num">{{ total_uv }}</div><div class="lbl">独立访客 (IP去重)</div></div>
    <div class="stat-card"><div class="num">{{ today_pv }}</div><div class="lbl">今日访问</div></div>
    <div class="stat-card"><div class="num">{{ today_uv }}</div><div class="lbl">今日独立访客</div></div>
  </div>
  <div class="card">
    <h2>近 7 天</h2>
    <table><tr><th>日期</th><th>访问次数</th><th>独立访客</th></tr>
    {% for d in days %}<tr><td>{{ d.day }}</td><td>{{ d.pv }}</td><td>{{ d.uv }}</td></tr>{% endfor %}
    {% if not days %}<tr><td colspan="3" class="muted">暂无数据</td></tr>{% endif %}
    </table>
  </div>
  <div class="card">
    <h2>各页面访问</h2>
    <table><tr><th>页面</th><th>访问次数</th><th>独立访客</th></tr>
    {% for p in paths %}<tr><td>{{ p.path }}</td><td>{{ p.pv }}</td><td>{{ p.uv }}</td></tr>{% endfor %}
    {% if not paths %}<tr><td colspan="3" class="muted">暂无数据</td></tr>{% endif %}
    </table>
  </div>
  <p class="muted">说明：统计由网页 JS 触发，已天然过滤掉大部分不执行 JS 的爬虫；独立访客按 IP 去重。</p>
</div></body></html>
"""


@app.route("/admin/stats")
@login_required
def admin_stats():
    conn = get_db()
    today = datetime.now().strftime("%Y-%m-%d")
    total_pv = conn.execute("SELECT COUNT(*) FROM pageviews").fetchone()[0]
    total_uv = conn.execute("SELECT COUNT(DISTINCT ip) FROM pageviews").fetchone()[0]
    today_pv = conn.execute("SELECT COUNT(*) FROM pageviews WHERE day=?", (today,)).fetchone()[0]
    today_uv = conn.execute("SELECT COUNT(DISTINCT ip) FROM pageviews WHERE day=?", (today,)).fetchone()[0]
    days = conn.execute(
        "SELECT day, COUNT(*) pv, COUNT(DISTINCT ip) uv FROM pageviews GROUP BY day ORDER BY day DESC LIMIT 7"
    ).fetchall()
    paths = conn.execute(
        "SELECT path, COUNT(*) pv, COUNT(DISTINCT ip) uv FROM pageviews GROUP BY path ORDER BY pv DESC LIMIT 20"
    ).fetchall()
    conn.close()
    return render_template_string(
        STATS_HTML, total_pv=total_pv, total_uv=total_uv,
        today_pv=today_pv, today_uv=today_uv, days=days, paths=paths,
    )


@app.route("/healthz")
def healthz():
    return "ok"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
