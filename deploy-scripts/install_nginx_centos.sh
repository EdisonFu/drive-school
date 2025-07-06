#!/bin/bash

# 安装EPEL仓库
echo "安装EPEL仓库..."
sudo yum install -y epel-release

# 安装Nginx
echo "安装Nginx..."
sudo yum install -y nginx

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
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload

echo "Nginx安装完成!"
