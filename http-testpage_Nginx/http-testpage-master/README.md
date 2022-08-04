# 各种HTML测试页面

- 使用项目docker镜像

    ```shell
    #docker login git.koal.com:4567
    docker run --rm -p 8080:80 git.koal.com:4567/gw-server/docker/http-testpage
    ```

- 使用nginx docker镜像（仅静态页面）

    ```shell
    docker run --rm -p 8080:80 -v $PWD/www:/usr/share/nginx/html nginx
    ```

测试`curl http://127.0.0.1:8080/1k.html`

## 简单页面（不同字节数）
- 1b.html
- 1k.html
- 4k.html
- 10k.html
- 16k.html
- 64k.html
- 256k.html
- 1m.html
- 10m.html

## 复杂页面
- 100resource.html：含100个图片资源的页面
- httpvars.php：显示所有HTTP变量（URL参数，Header，Cookie等）
- chunked.php：以CHUNK方式输出任意长度数据，支持两个参数
  - bs：数据块大小
  - count：块数量
  - 例子 http://127.0.0.1:8080/chuncked.php?bs=1024&count=100
- upload.php：PHP上传文件（最大500M）

## 302跳转页面
- 302/index.php：跳转起始页面
