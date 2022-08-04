

主要任务：使用nginx搭建一个反向代理的测试环境
1.  搭建容器 http://git.koal.com/gw-server/docker/http-testpage， 配置网关代理容器
2.  利用http-testpage 演示信息绑定功能
3.  利用http-testpage 演示302跳转
4.  上传1G大小文件到 http-testpage
5.  利用http-testpage 演示缓存功能


完成情况：

### 搭建容器

根据Dockerfile文件创建容器
> sudo docker build -t myubuntu:v2 .

查看系统容器
> sudo docker images

运行容器
> sudo docker run --rm -p 8080:80 --name myubuntu_test myubuntu:v2

### 信息绑定功能

主要编写了两个文件 [lotuscc_chunked_test.php](../http-testpage_Nginx/http-testpage-master/www/lotuscc_chunked_test.php) ，[lotuscc_request_test.php](../http-testpage_Nginx/http-testpage-master/www/lotuscc_request_test.php)

lotuscc_chunked_test.php 文件主要显示一个页面并提示用户输入名字信息
![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/1.PNG)

lotuscc_request_test.php 文件主要通过PHP获取用户输入信息并显示
![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/2.PNG)


### 302跳转功能

通过查看代码发现原来的跳转路径为：

http://127.0.0.1:8080/302/index.php ->

http://127.0.0.1:8080/302/302_relative.php ->

http://127.0.0.1:8080/302/relative.php ->

http://127.0.0.1:8080/302/302_by_host.php ->

http://127.0.0.1:8080/by_host.php

而最后一个文件:8080/by_host.php是没有的，因此会失败


![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/3.PNG)
![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/4.PNG)
![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/6.PNG)

为了学习nginx反向代理功能，我修改了302_by_host.php文件，使其下一步跳转地址变为 http://127.0.0.1:8090/by_host.php

```PHP
<?php
// header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . "/by_host.php");
header("Location: " . "http://127.0.0.1:8090/by_host.php");
?>
```

然后在nginx代理配置中配置了如下代理，因此下一步会跳转到 http://127.0.0.1:8080/302/302_out.php

```bash
listen       8090;
server_name  127.0.0.1;

location /by_host.php {
    proxy_pass http://127.0.0.1:8080/302/302_out.php;
}
```

而302_out.php文件中将会设置下一步跳转地址为https://oa.koal.com/， 所以最后正确跳转至首页
![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/7.PNG)

最后完整的跳转过程为

http://127.0.0.1:8080/302/index.php  ->

http://127.0.0.1:8080/302/302_relative.php ->

http://127.0.0.1:8080/302/relative.php ->

http://127.0.0.1:8080/302/302_by_host.php ->

http://127.0.0.1:8090/by_host.php ->

http://127.0.0.1:8080/302/302_out.php ->

https://oa.koal.com


### 上传1G文件
在php.ini配置文件中可以看到如下配置语句，所以最多只能上传500M大小文件，经过测试发现上传1G大小文件会一直卡住
```bash
upload_max_filesize = 500M
post_max_size = 500M
```

按如下修改php.ini配置文件，再次测试发现可以上传成功
```bash
upload_max_filesize = 2048M
post_max_size = 2048M
```
![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/uploadFile.PNG)

### 缓存功能

nginx代理配置中配置了如下代理（完整的配置见文件）后，之后通过8090端口请求的100resource.html页面以及image文件夹下图片文件将通过nginx代理

```bash
listen       8090;
server_name  127.0.0.1;

location /100resource.html {
    proxy_pass http://127.0.0.1:8080/100resource.html;
}

location /image/ {
    proxy_cache my_zone;
    proxy_pass http://127.0.0.1:8080/image/;

    proxy_set_header  Nginx-Cache $upstream_cache_status;
}
```

同时nginx中配置了如下缓存设置，因此反复请求图片资源时应该会直接从nginx代理返回，而不会再去http://127.0.0.1:8080/image/ 请求资源。

```bash
proxy_cache_path /home/lotuscc/data/nginx_cache/ levels=1:2 keys_zone=my_zone:10m inactive=300s max_size=5g;
    
proxy_buffering on;
proxy_buffer_size 4k;
proxy_buffers 50 4k;
proxy_busy_buffers_size 4k;
proxy_temp_path /tmp/nginx_proxy_tmp 1 2;
proxy_max_temp_file_size 20M;
proxy_temp_file_write_size 8k;
```

关闭nginx代理时无法通过8090端口获取资源
![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/8.PNG)


开启nginx代理时可以通过8090端口获取资源
![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/9.PNG)

但是我在查看响应头的时候却发现Niginx-Cache一直显示MISS，此处留待以后研究
![avatar](http://git.koal.com/zhangpengli/newborn_learning/-/raw/http-testpage_Nginx/http-testpage_Nginx/img/nginx_missPNG.PNG)