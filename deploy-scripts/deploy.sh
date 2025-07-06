#!/bin/bash

# 设置变量
LOCAL_DIST_PATH="/Users/fuzhendong/web-project/drive-school/web/dist"
SERVER_USER="your_username"
SERVER_IP="your_server_ip"
SERVER_PATH="/var/www/jinzhai-drive-school"

# 创建部署脚本
echo "开始部署金寨驾校官网到服务器..."

# 1. 打包项目
echo "正在构建项目..."
cd /Users/fuzhendong/web-project/drive-school/web
npm run build

# 2. 复制文件到服务器
echo "正在将文件复制到服务器..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $SERVER_PATH"
rsync -avz --delete $LOCAL_DIST_PATH/ $SERVER_USER@$SERVER_IP:$SERVER_PATH/

# 3. 重启Nginx服务
echo "重启Nginx服务..."
ssh $SERVER_USER@$SERVER_IP "sudo systemctl reload nginx"

echo "部署完成！"
