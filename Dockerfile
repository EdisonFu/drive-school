FROM nginx:alpine

# 删除默认的nginx静态资源
RUN rm -rf /usr/share/nginx/html/*

# 复制构建的文件到nginx服务器
COPY dist/ /usr/share/nginx/html/

# 复制nginx配置
COPY deploy-scripts/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
