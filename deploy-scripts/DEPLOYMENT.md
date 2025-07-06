# 金寨驾校官网部署指南

本文档提供了将金寨驾校React官网部署到服务器的详细步骤。

## 前提条件

- 一台Linux服务器（推荐Ubuntu或CentOS）
- 已安装Nginx或Apache
- 已配置SSH访问权限

## 部署步骤

### 方法一：手动部署

1. **构建项目**
   ```bash
   # 在本地项目目录中执行
   npm run build
   ```

2. **将dist目录上传到服务器**
   ```bash
   # 使用scp或rsync
   rsync -avz --delete ./dist/ user@your-server-ip:/var/www/jinzhai-drive-school/
   ```

3. **配置Nginx**
   - 复制`deploy-scripts/nginx.conf`中的内容
   - 将其添加到服务器的Nginx配置文件中（通常在`/etc/nginx/sites-available/`）
   - 创建符号链接到`sites-enabled`目录
   - 重启Nginx
   ```bash
   sudo ln -s /etc/nginx/sites-available/jinzhai-drive-school /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

### 方法二：使用自动部署脚本

1. **修改部署脚本**
   - 编辑`deploy-scripts/deploy.sh`
   - 更新`SERVER_USER`、`SERVER_IP`和`SERVER_PATH`变量

2. **运行部署脚本**
   ```bash
   chmod +x deploy-scripts/deploy.sh
   ./deploy-scripts/deploy.sh
   ```

### 方法三：使用Docker部署

1. **构建Docker镜像**
   ```bash
   docker build -t jinzhai-drive-school .
   ```

2. **运行Docker容器**
   ```bash
   docker run -d -p 80:80 jinzhai-drive-school
   ```

## 故障排除

- 如果遇到404错误，请确保Nginx配置中包含React路由处理
- 如果静态资源无法加载，请检查路径和权限

## 更新网站

要更新网站内容，只需重复部署步骤，上传新的构建文件到服务器。
