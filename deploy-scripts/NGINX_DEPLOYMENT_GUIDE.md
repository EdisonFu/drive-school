# 金寨驾校网站 - Nginx服务器部署指南

本文档提供在新服务器上部署Nginx并配置金寨驾校网站的详细步骤。

## 服务器准备

1. 确保您有一台可访问的服务器（Ubuntu、Debian、CentOS或RHEL系统）
2. 确保您有root或sudo权限
3. 确保服务器80端口（HTTP）和443端口（HTTPS，如果使用SSL）开放

## 部署步骤

### 步骤1：连接到服务器

```bash
ssh username@your-server-ip
```

### 步骤2：安装Nginx

#### Ubuntu/Debian系统：
```bash
# 上传脚本到服务器
scp deploy-scripts/install_nginx_ubuntu.sh username@your-server-ip:~/

# 在服务器上执行
ssh username@your-server-ip "chmod +x ~/install_nginx_ubuntu.sh && ~/install_nginx_ubuntu.sh"
```

#### CentOS/RHEL系统：
```bash
# 上传脚本到服务器
scp deploy-scripts/install_nginx_centos.sh username@your-server-ip:~/

# 在服务器上执行
ssh username@your-server-ip "chmod +x ~/install_nginx_centos.sh && ~/install_nginx_centos.sh"
```

### 步骤3：配置网站

1. 上传配置文件和设置脚本：
```bash
scp deploy-scripts/nginx.conf deploy-scripts/setup_nginx_site.sh username@your-server-ip:~/
```

2. 在服务器上执行设置脚本：
```bash
ssh username@your-server-ip "chmod +x ~/setup_nginx_site.sh && ~/setup_nginx_site.sh"
```

### 步骤4：部署网站内容

修改`deploy.sh`脚本中的以下变量：
- `SERVER_USER`: 服务器用户名
- `SERVER_IP`: 服务器IP地址
- `SERVER_PATH`: 网站部署路径（应与nginx.conf中的root路径一致）

然后执行部署脚本：
```bash
chmod +x deploy-scripts/deploy.sh
./deploy-scripts/deploy.sh
```

## 验证部署

部署完成后，可以通过以下方式验证：

1. 在浏览器中访问服务器IP地址或域名
2. 检查Nginx日志：
```bash
ssh username@your-server-ip "sudo tail -f /var/log/nginx/jinzhai-drive-school.access.log"
```

## 故障排除

### 网站无法访问：
1. 检查Nginx是否运行：
```bash
sudo systemctl status nginx
```

2. 检查Nginx配置是否正确：
```bash
sudo nginx -t
```

3. 检查防火墙设置：
```bash
# Ubuntu
sudo ufw status
# CentOS
sudo firewall-cmd --list-all
```

4. 检查网站目录权限：
```bash
ls -la /var/www/jinzhai-drive-school
```

### 刷新出现404错误：
确认Nginx配置中包含了处理React路由的配置：
```
location / {
    try_files $uri $uri/ /index.html;
}
```

## 性能优化

网站部署后，可考虑以下性能优化：

1. 启用Gzip压缩：
```
gzip on;
gzip_comp_level 5;
gzip_min_length 256;
gzip_proxied any;
gzip_vary on;
gzip_types
  application/javascript
  application/json
  application/x-javascript
  text/css
  text/javascript
  text/plain
  text/xml;
```

2. 配置SSL/HTTPS（使用Let's Encrypt免费证书）
3. 配置HTTP/2
4. 设置合理的缓存策略

## 更新网站

当需要更新网站内容时，只需重新运行部署脚本：
```bash
./deploy-scripts/deploy.sh
```

## 附录：手动部署步骤

如果自动化脚本不可用，以下是手动部署的基本步骤：

1. 在本地构建项目：
```bash
npm run build
```

2. 将dist目录上传到服务器：
```bash
scp -r dist/ username@your-server-ip:/var/www/jinzhai-drive-school/
```

3. 创建Nginx配置文件：
```bash
sudo nano /etc/nginx/sites-available/jinzhai-drive-school
```

4. 启用站点：
```bash
sudo ln -s /etc/nginx/sites-available/jinzhai-drive-school /etc/nginx/sites-enabled/
```

5. 重启Nginx：
```bash
sudo systemctl reload nginx
```
