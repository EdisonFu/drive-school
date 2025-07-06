#!/bin/bash

# 创建网站目录
echo "创建网站目录..."
sudo mkdir -p /var/www/jinzhai-drive-school

# 设置正确的权限
echo "设置目录权限..."
sudo chown -R $USER:$USER /var/www/jinzhai-drive-school
sudo chmod -R 755 /var/www/jinzhai-drive-school

# 复制Nginx配置文件
echo "配置Nginx站点..."
sudo cp nginx.conf /etc/nginx/sites-available/jinzhai-drive-school

# 创建符号链接启用站点
echo "启用网站配置..."

# 检查是否是Debian/Ubuntu系统（使用sites-available目录）
if [ -d "/etc/nginx/sites-available" ] && [ -d "/etc/nginx/sites-enabled" ]; then
    sudo ln -sf /etc/nginx/sites-available/jinzhai-drive-school /etc/nginx/sites-enabled/
# CentOS/RHEL系统
else
    # 如果是CentOS/RHEL系统，直接放到conf.d目录
    sudo cp nginx.conf /etc/nginx/conf.d/jinzhai-drive-school.conf
fi

# 创建日志目录（如果不存在）
sudo mkdir -p /var/log/nginx

# 测试Nginx配置
echo "测试Nginx配置..."
sudo nginx -t

# 重新加载Nginx配置
echo "重新加载Nginx配置..."
sudo systemctl reload nginx

echo "Nginx站点配置完成！"
