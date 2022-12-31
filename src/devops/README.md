---
title: linux容器化部署应用
---
## Docker环境安装

- 安装`yum-utils`：

```bash
yum install -y yum-utils device-mapper-persistent-data lvm2
```

- 为yum源添加docker仓库位置：

```bash
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

- 安装docker：

```bash
yum install docker-ce
```

- 启动docker：

```bash
systemctl start docker
```

## MySQL安装

- 下载MySQL`5.7`的docker镜像：

```bash
docker pull mysql:5.7
```

- 使用如下命令启动MySQL服务：

```bash
docker run -p 3306:3306 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root  \
-d mysql:5.7
```

- 参数说明
  - -p 3306:3306：将容器的3306端口映射到主机的3306端口
  - -v /mydata/mysql/conf:/etc/mysql：将配置文件夹挂在到主机
  - -v /mydata/mysql/log:/var/log/mysql：将日志文件夹挂载到主机
  - -v /mydata/mysql/data:/var/lib/mysql/：将数据文件夹挂载到主机
  - -e MYSQL_ROOT_PASSWORD=root：初始化root用户的密码
- 进入运行MySQL的docker容器：

```bash
docker exec -it mysql /bin/bash
```

- 使用MySQL命令打开客户端：

```bash
mysql -uroot -proot --default-character-set=utf8
```

- 创建mall数据库：

```sql
create database mall character set utf8
```

- 安装上传下载插件，并将`document/sql/mall.sql`上传到Linux服务器上：

```bash
yum -y install lrzsz
```

- 将`mall.sql`文件拷贝到mysql容器的`/`目录下：

```bash
docker cp /mydata/mall.sql mysql:/
```

- 将sql文件导入到数据库：

```bash
use mall;
source /mall.sql;
```

- 创建一个`reader:123456`帐号并修改权限，使得任何ip都能访问：

```sql
grant all privileges on *.* to 'reader' @'%' identified by '123456';
```

## Redis安装

- 下载Redis`7`的docker镜像：

```bash
docker pull redis:7
```

- 使用如下命令启动Redis服务：

```bash
docker run -p 6379:6379 --name redis \
-v /mydata/redis/data:/data \
-d redis:7 redis-server --appendonly yes
```

- 进入Redis容器使用`redis-cli`命令进行连接：

```bash
docker exec -it redis redis-cli
```

![image-20221224205009412](https://raw.githubusercontent.com/YuyanCai/imagebed/main/note/image-20221224205009412.png)

## Nginx安装

- 下载Nginx`1.22`的docker镜像：

```bash
docker pull nginx:1.22
```

- 先运行一次容器（为了拷贝配置文件）：

```bash
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx  \
-d nginx:1.22
```

- 将容器内的配置文件拷贝到指定目录：

```bash
docker container cp nginx:/etc/nginx /mydata/nginx/
```

- 修改文件名称：

```bash
mv nginx conf
```

- 终止并删除容器：

```bash
docker stop nginx
docker rm nginx
```

- 使用如下命令启动Nginx服务：

```bash
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx  \
-v /mydata/nginx/conf:/etc/nginx \
-d nginx:1.22
```

## RabbitMQ安装

- 下载rabbitmq`3.9-management`的docker镜像：

```bash
docker pull rabbitmq:3.9-management
```

- 使用如下命令启动RabbitMQ服务：

```bash
docker run -p 5672:5672 -p 15672:15672 --name rabbitmq \
-d rabbitmq:3.9-management
```

- 开启防火墙：

```bash
firewall-cmd --zone=public --add-port=15672/tcp --permanent
firewall-cmd --reload
```

- 访问地址查看是否安装成功：http://172.0.0.2:15672

![img](https://raw.githubusercontent.com/YuyanCai/imagebed/main/note/mall_linux_deploy_03.78dad8ac.png)

- 输入账号密码并登录：guest guest

- 创建帐号并设置其角色为管理员：mall mall



![img](https://raw.githubusercontent.com/YuyanCai/imagebed/main/note/mall_linux_deploy_04.2fd308c9.png)

- 创建一个新的虚拟host为：/mall

![img](https://www.macrozheng.com/assets/mall_linux_deploy_05.9a7bf37b.png)

- 点击mall用户进入用户配置页面

![img](https://raw.githubusercontent.com/YuyanCai/imagebed/main/note/mall_linux_deploy_06.309462ae.png)

- 给mall用户配置该虚拟host的权限

![img](https://www.macrozheng.com/assets/mall_linux_deploy_07.782ca72c.png)

## Elasticsearch安装

- 下载Elasticsearch`7.17.3`的docker镜像：

```bash
docker pull elasticsearch:7.17.3
```

- 修改虚拟内存区域大小，否则会因为过小而无法启动:

```bash
sysctl -w vm.max_map_count=262144
```

- 使用如下命令启动Elasticsearch服务，内存小的服务器可以通过`ES_JAVA_OPTS`来设置占用内存大小：

```bash
docker run -p 9200:9200 -p 9300:9300 --name elasticsearch \
-e "discovery.type=single-node" \
-e "cluster.name=elasticsearch" \
-e "ES_JAVA_OPTS=-Xms512m -Xmx1024m" \
-v /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-d elasticsearch:7.17.3
```

- 启动时会发现`/usr/share/elasticsearch/data`目录没有访问权限，只需要修改`/mydata/elasticsearch/data`目录的权限，再重新启动即可；

```bash
chmod 777 /mydata/elasticsearch/data/
```

- 安装中文分词器IKAnalyzer，注意下载与Elasticsearch对应的版本，下载地址：https://github.com/medcl/elasticsearch-analysis-ik/releases

![img](https://www.macrozheng.com/assets/mall_linux_deploy_new_02.d402f993.png)

- 下载完成后解压到Elasticsearch的`/mydata/elasticsearch/plugins`目录下；

![img](https://raw.githubusercontent.com/YuyanCai/imagebed/main/note/mall_linux_deploy_new_03.d123512a.png)

- 重新启动服务：



```bash
docker restart elasticsearch
```

- 开启防火墙：

```bash
firewall-cmd --zone=public --add-port=9200/tcp --permanent
firewall-cmd --reload
```

- 访问会返回版本信息：http://172.0.0.2:9200

```json
{
  "name": "708f1d885c16",
  "cluster_name": "elasticsearch",
  "cluster_uuid": "mza51wT-QvaZ5R0NmE183g",
  "version": {
    "number": "7.17.3",
    "build_flavor": "default",
    "build_type": "docker",
    "build_hash": "5ad023604c8d7416c9eb6c0eadb62b14e766caff",
    "build_date": "2022-04-19T08:11:19.070913226Z",
    "build_snapshot": false,
    "lucene_version": "8.11.1",
    "minimum_wire_compatibility_version": "6.8.0",
    "minimum_index_compatibility_version": "6.0.0-beta1"
  },
  "tagline": "You Know, for Search"
}
```

## Logstash安装

- 下载Logstash`7.17.3`的docker镜像：

```bash
docker pull logstash:7.17.3
```

- 修改Logstash的配置文件`logstash.conf`中`output`节点下的Elasticsearch连接地址为`es:9200`，配置文件地址：https://github.com/macrozheng/mall/blob/master/document/elk/logstash.conf

```text
output {
  elasticsearch {
    hosts => "es:9200"
    index => "mall-%{type}-%{+YYYY.MM.dd}"
  }
}
```

- 创建`/mydata/logstash`目录，并将Logstash的配置文件`logstash.conf`拷贝到该目录；

```bash
mkdir /mydata/logstash
```

- 使用如下命令启动Logstash服务；

```bash
docker run --name logstash -p 4560:4560 -p 4561:4561 -p 4562:4562 -p 4563:4563 \
--link elasticsearch:es \
-v /mydata/logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
-d logstash:7.17.3
```

- 进入容器内部，安装`json_lines`插件。

```bash
logstash-plugin install logstash-codec-json_lines
```

## Kibana安装

- 下载Kibana`7.17.3`的docker镜像：

```bash
docker pull kibana:7.17.3
```

- 使用如下命令启动Kibana服务：

```bash
docker run --name kibana -p 5601:5601 \
--link elasticsearch:es \
-e "elasticsearch.hosts=http://es:9200" \
-d kibana:7.17.3
```

- 开启防火墙：

```bash
firewall-cmd --zone=public --add-port=5601/tcp --permanent
firewall-cmd --reload
```

- 访问地址进行测试：http://172.0.0.2:5601

![img](https://raw.githubusercontent.com/YuyanCai/imagebed/main/note/mall_linux_deploy_new_04.5c098822.png)

## MongoDB安装

- 下载MongoDB`4`的docker镜像：

```bash
docker pull mongo:4
```

- 使用docker命令启动：

```bash
docker run -p 27017:27017 --name mongo \
-v /mydata/mongo/db:/data/db \
-d mongo:4
```

## Docker全部环境安装完成

- 所有下载镜像文件：

```bash
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
redis                 7                   604d80444252        2 days ago          117MB
nginx                 1.22                f9c88cc1c21a        2 weeks ago         142MB
elasticsearch         7.17.3              3c91aa69ae06        8 weeks ago         613MB
kibana                7.17.3              4897f4b8b6ee        8 weeks ago         797MB
logstash              7.17.3              dd4291c803f4        8 weeks ago         774MB
mongo                 4                   1c0f1e566fec        5 months ago        438MB
rabbitmq              3.9-management      6c3c2a225947        6 months ago        253MB
mysql                 5.7                 7faa3c53e6d6        3 years ago         373MB
nginx                 1.10                0346349a1a64        5 years ago         182MB
java                  8                   d23bdf5b1b1b        5 years ago         643MB
```

- 所有运行在容器里面的应用：

![img](https://www.macrozheng.com/assets/mall_linux_deploy_new_05.dbb53569.png)

## SpringBoot应用部署

### 构建所有Docker镜像并上传

- 修改项目根目录下的`pom.xml`中的`docker.host`属性：

```xml
<properties>
    <docker.host>http://192.168.3.101:2375</docker.host>
</properties>
```

- 如果项目根目录的`pom.mxl`中`docker-maven-plugin`的`<executions>`节点被注释掉了就打开注释，使项目在打包时直接构建Docker镜像；

![img](https://www.macrozheng.com/assets/mall_linux_deploy_new_06.bf2e2ee0.png)

- 直接双击根项目`mall`的`package`命令可以一次性打包所有应用的Docker镜像；

![img](https://raw.githubusercontent.com/YuyanCai/imagebed/main/note/mall_linux_deploy_12.fe095c6d.png)



```bash
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
mall/mall-portal      1.0-SNAPSHOT        c668ea32b405        24 hours ago        712MB
mall/mall-search      1.0-SNAPSHOT        627d1ebbc21b        24 hours ago        745MB
mall/mall-admin       1.0-SNAPSHOT        2300aca75270        24 hours ago        725MB
```

### 部署mall-admin

```bash
docker run -p 8080:8080 --name mall-admin \
--link mysql:db \
--link redis:redis \
-v /etc/localtime:/etc/localtime \
-v /mydata/app/admin/logs:/var/logs \
-d mall/mall-admin:1.0-SNAPSHOT
```

`注意`：如果想使用Logstash收集日志的话，需要将应用容器连接到Logstsh，添加如下配置即可；

```bash
--link logstash:logstash \
```

### 部署mall-search

```bash
docker run -p 8081:8081 --name mall-search \
--link elasticsearch:es \
--link mysql:db \
-v /etc/localtime:/etc/localtime \
-v /mydata/app/search/logs:/var/logs \
-d mall/mall-search:1.0-SNAPSHOT
```

### 部署mall-port

```bash
docker run -p 8085:8085 --name mall-portal \
--link mysql:db \
--link redis:redis \
--link mongo:mongo \
--link rabbitmq:rabbit \
-v /etc/localtime:/etc/localtime \
-v /mydata/app/portal/logs:/var/logs \
-d mall/mall-portal:1.0-SNAPSHOT
```

### 开启防火墙

```bash
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --zone=public --add-port=8081/tcp --permanent
firewall-cmd --zone=public --add-port=8085/tcp --permanent
firewall-cmd --reload
```

### 访问接口进行测试

- mall-admin的api接口文档地址：http://172.0.0.2:8080/swagger-ui/

![img](https://raw.githubusercontent.com/YuyanCai/imagebed/main/note/mall_linux_deploy_13.f1cb4e11.png)

- mall-search的api接口文档地址：http://172.0.0.2:8081/swagger-ui/

![img](https://www.macrozheng.com/assets/mall_linux_deploy_14.4cc0ed38.png)

- mall-portal的api接口文档地址：http://172.0.0.2:8085/swagger-ui/

![img](https://raw.githubusercontent.com/YuyanCai/imagebed/main/note/mall_linux_deploy_15.5964e33a.png)













