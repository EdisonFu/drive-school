# 在新服务器上部署Nginx步骤指南

本文档提供了在新服务器上安装和配置Nginx以托管金寨驾校官网的详细步骤。

## 1. 安装Nginx

### Ubuntu/Debian系统：

```bash
# 更新软件包列表
sudo apt update

# 安装Nginx
sudo apt install nginx -y

# 启动Nginx
sudo systemctl start nginx

# 设置开机自启
sudo systemctl enable nginx

# 检查Nginx状态
sudo systemctl status nginx
```

### CentOS/RHEL系统：

```bash
# 安装EPEL仓库
sudo yum install epel-release -y

# 安装Nginx
sudo yum install nginx -y

# 启动Nginx
sudo systemctl start nginx

# 设置开机自启
sudo systemctl enable nginx

# 检查Nginx状态
sudo systemctl status nginx
```

## 2. 配置防火墙

### Ubuntu/Debian系统：

```bash
# 允许HTTP流量
sudo ufw allow 'Nginx HTTP'

# 检查防火墙状态
sudo ufw status
```

### CentOS/RHEL系统：

```bash
# 允许HTTP流量
sudo firewall-cmd --permanent --add-service=http

# 重新加载防火墙配置
sudo firewall-cmd --reload

# 检查防火墙状态
sudo firewall-cmd --list-all
```

## 3. 创建网站目录

```bash
# 创建网站目录
sudo mkdir -p /var/www/jinzhai-drive-school

# 设置目录权限
sudo chown -R $USER:$USER /var/www/jinzhai-drive-school
sudo chmod -R 755 /var/www/jinzhai-drive-school
```

## 4. 创建Nginx配置文件

```bash
# 创建配置文件
sudo nano /etc/nginx/sites-available/jinzhai-drive-school
```

将以下内容粘贴到配置文件中（此配置已为您准备好）：

```nginx
server {
    listen 80;
    server_name www.jzjiaxiao.com; # 金寨驾校官网域名
    
    root /var/www/jinzhai-drive-school; # 服务器上的部署目录
    index index.html;
    
    # 处理React路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存设置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
    
    # 日志配置
    access_log /var/log/nginx/jinzhai-drive-school.access.log;
    error_log /var/log/nginx/jinzhai-drive-school.error.log;
}
```

## 5. 启用站点配置

### Ubuntu/Debian系统：

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/jinzhai-drive-school /etc/nginx/sites-enabled/

# 检查Nginx配置是否有语法错误
sudo nginx -t

# 重新加载Nginx配置
sudo systemctl reload nginx
```

### CentOS/RHEL系统：

```bash
# CentOS/RHEL通常将配置文件直接放在conf.d目录中
sudo cp /etc/nginx/sites-available/jinzhai-drive-school /etc/nginx/conf.d/

# 检查Nginx配置是否有语法错误
sudo nginx -t

# 重新加载Nginx配置
sudo systemctl reload nginx
```

## 6. 设置日志目录权限

```bash
# 确保日志目录存在并具有正确的权限
sudo mkdir -p /var/log/nginx
sudo chmod 755 /var/log/nginx
```

## 7. 部署网站文件

使用您的部署脚本（deploy.sh）将构建好的文件部署到服务器：

```bash
# 给部署脚本添加执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

## 8. 配置SSL（可选但推荐）

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx -y  # Ubuntu/Debian
# 或
sudo yum install certbot python3-certbot-nginx -y  # CentOS/RHEL

# 获取并配置SSL证书
sudo certbot --nginx -d www.jzjiaxiao.com

# 测试自动续期
sudo certbot renew --dry-run
```

## 9. 检查网站是否正常访问

在浏览器中访问 http://www.jzjiaxiao.com 检查网站是否正常显示。

## 10. 故障排查

如果网站无法访问，可以检查以下几点：

1. 确认Nginx服务正在运行：`sudo systemctl status nginx`
2. 检查Nginx错误日志：`sudo tail -f /var/log/nginx/error.log`
3. 检查网站特定的错误日志：`sudo tail -f /var/log/nginx/jinzhai-drive-school.error.log`
4. 确认防火墙允许HTTP流量
5. 检查DNS设置，确保域名www.jzjiaxiao.com指向服务器IP
