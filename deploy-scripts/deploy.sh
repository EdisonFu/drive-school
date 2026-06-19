#!/bin/bash
set -euo pipefail

# ============================================================
# 金寨驾校官网 自动部署脚本
# 使用前请先填写下面三个服务器变量（标记 TODO 的行）：
#   SERVER_USER  你的服务器登录用户名，例如 root / ubuntu
#   SERVER_IP    你的服务器公网 IP 或域名，例如 1.2.3.4
#   SERVER_PATH  网站在服务器上的部署目录（需与 nginx.conf 的 root 一致）
# 前置条件：已配置 SSH 免密登录，服务器已安装并运行 Nginx
# ============================================================

# 项目根目录（脚本所在目录的上一级），无需修改
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_DIST_PATH="$PROJECT_DIR/dist"

SERVER_USER="your_username"   # TODO: 修改为你的服务器用户名
SERVER_IP="your_server_ip"    # TODO: 修改为你的服务器 IP/域名
SERVER_PATH="/var/www/jinzhai-drive-school"  # 部署目录，需与 nginx.conf root 对应

# 防止未填占位符就误执行
if [ "$SERVER_USER" = "your_username" ] || [ "$SERVER_IP" = "your_server_ip" ]; then
  echo "❌ 请先编辑本脚本，填写 SERVER_USER 和 SERVER_IP 后再运行。"
  exit 1
fi

echo "开始部署金寨驾校官网到服务器..."

# 1. 打包项目
echo "正在构建项目..."
cd "$PROJECT_DIR"
npm run build

# 2. 复制文件到服务器
echo "正在将文件复制到服务器 $SERVER_USER@$SERVER_IP:$SERVER_PATH ..."
ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $SERVER_PATH"
rsync -avz --delete "$LOCAL_DIST_PATH/" "$SERVER_USER@$SERVER_IP:$SERVER_PATH/"

# 3. 重新加载 Nginx 服务
echo "重新加载 Nginx 服务..."
ssh "$SERVER_USER@$SERVER_IP" "sudo systemctl reload nginx"

echo "✅ 部署完成！访问 http://$SERVER_IP 查看效果。"
