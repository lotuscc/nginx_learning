# 启动 docker
sudo service docker start

sudo docker build -t njs:v1 .
sudo docker images
sudo docker run --rm -p 8080:80 --name myubuntu_test njs:v1

# 根据IMAGE ID删除就像
sudo docker images
sudo docker rmi 13a835b18f71

# 连接已经启动的容器
sudo docker ps
sudo docker exec -it 690cf5f5f926 /bin/bash

# 测试
sudo nginx -t -c /home/lotuscc/work/lotuscc_nginx.conf 

# 启动
sudo nginx -c /home/lotuscc/git_test/newborn_learning/http-testpage_Nginx/lotuscc_nginx.conf 

# 重启
sudo nginx -s reload

# 关闭
sudo nginx -s stop

