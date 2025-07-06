#!/bin/bash

# 更新软件包列表
echo "更新软件包列表..."
sudo apt update

# 安装Nginx
echo "安装Nginx..."
sudo apt install -y nginx

# 启动Nginx服务
echo "启动Nginx服务..."
sudo systemctl start nginx

# 设置Nginx开机自启
echo "设置Nginx开机自启..."
sudo systemctl enable nginx

# 检查Nginx状态
echo "检查Nginx状态..."
sudo systemctl status nginx

# 配置防火墙（如果已启用）
echo "配置防火墙..."
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'

echo "Nginx安装完成!"
