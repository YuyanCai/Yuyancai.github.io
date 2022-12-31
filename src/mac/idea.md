# 开发常用
## Mac基础操作

> 剪切文件

command + c 复制

command + option + v剪切



> 关闭程序

command +   q



> 关闭当前页面

浏览器（command + w）

程序最小化（command + w）



### Mac安装软件的“已损坏，无法打开

在终端粘贴复制输入命令（注意最后有一个空格）：

```text
sudo xattr -r -d com.apple.quarantine 
```

然后打开 **“访达”（Finder）**进入 **“应用程序”** 目录，找到该软件图标，将图标拖到刚才的终端窗口里面，会得到如下组合(如图所示)：

```text
sudo xattr -r -d com.apple.quarantine /Applications/WebStrom.app
```



> homebrew安装指定版本node

1. 如果之前使用`brew install node`安装过node,需要先执行`brew unlink node`来'解绑'node
2. 查找可用的node版本 `brew search node`
3. 安装你需要的版本, 比如 `brew install node@8`
4. 然后 `brew link node@8`, 这一步可能会报错, 按照提示执行命令就ok了, 比如我最后执行的是`brew link --overwrite --force node@8`
5. `node -v` 不出意外, 就安装好了你想要的node版本



> mac快捷键

- **Command-Z**：撤销上一个命令。随后您可以按 Shift-Command-Z 来重做，从而反向执行撤销命令。在某些 App 中，您可以撤销和重做多个命令。



### mac删除被锁定的应用



sudo /usr/bin/chflags -R noschg /Applications/Karabiner-EventViewer.app

sudo rm -rf Karabiner-EventViewer.app



> PD破解

https://qiujunya.com/article/2022/9/12/248.html



### mac查看隐藏文件



Cmd + Shift +句点 (.)



### 	mac在根目录创建软连接

```
sudo vi /etc/synthetic.conf

在文件中添加类似下面的
data /Users/your_name/data 
home /Users/your_name/home 
```

重启电脑



### Mac的netstat和lsof使用

使用netstat命令，用来显示各种网络信息，比如网络连接、端口号、协议、状态、进程ID等信息；

使用lsof命令，用来显示当前系统打开文件的信息，因为包括端口和网络状态在linux和mac中都属于文件，所以系统也为它们分配了文件描述法fd

**在Linux上面使用的方法通常为：netstat -nltp，参数含义为：查询TCP协议写Listen的信息**

-a (all)显示所有选项，默认不显示LISTEN相关
-t (tcp)仅显示tcp相关选项
-u (udp)仅显示udp相关选项
-n 拒绝显示别名，能显示数字的全部转化成数字。
-l 仅列出有在 Listen (监听) 的服務状态

-p 显示建立相关链接的程序名
-r 显示路由信息，路由表
-e 显示扩展信息，例如uid等
-s 按各个协议进行统计
-c 每隔一个固定时间，执行该netstat命令

**但是在Mac上执行该命令，会报错误：**

netstat: option requires an argument -- p
Usage:  netstat [-AaLlnW] [-f address_family | -p protocol]
netstat [-gilns] [-f address_family]
netstat -i | -I interface [-w wait] [-abdgRtS]
netstat -s [-s] [-f address_family | -p protocol] [-w wait]
netstat -i | -I interface -s [-f address_family | -p protocol]
netstat -m [-m]
netstat -r [-Aaln] [-f address_family]
netstat -rs [-s]

### Mac上使用

**在Mac上正确使用的方法是：即-f需要加上地址族，-p需要加上协议TCP或者UDP等**

a)如果需要查询inet，netstat -anvf inet

b）如果需要查询TCP， netstat -anvp tcp

c）如果需要查询UDP，netstat -anvp udp

### lsof用法

lsof输出各列的信息的意义如下：

command、pid、user 用来标识进程的名称、ID、拥有者

fd文件描述符file description，应用程序通过文件描述符来识别该文件

type、size、name，文件类型、大小、文件的确切名称

device 磁盘的名称，

node 索引节点，该文件在磁盘上的标识

**lsof -i:8080 查看8080端口的使用情况**

lsof -i4TCP:8080， 查看8080端口的TCP情况

#### Mac上开启多个终端

command+n

#### MAc上开启一个窗口多个终端选项

command+t



## Mac上docker相关操作

### 安装Redis

#### 直接启动版

不带密码可以直接去掉后面的--requirepass参数

**测试环境**

```sh
docker run -p 6379:6379 --name redis \
-v /mydata/redis/data:/data \
-d redis:7 redis-server --appendonly yes
```

> 参数说明：

- appendonly yes  #开启AOF模式（Redis可以实现数据的持久化存储，即将数据保存到磁盘上）
- -d redis 表示后台启动redis

> 测试

docker exec -it redis redis-cli

**生产环境**

```sh
docker run -p 6379:6379 --name redis \
-v /mydata/redis/data:/data \
-d redis:7 redis-server --appendonly yes --requirepass "Baidu12#$"
```

#### 配置文件版

前提是下好配置文件在本地，并配置好了

redis.conf的配置文件可以在 http://download.redis.io/redis-stable/redis.conf 上下载

```sh
cd /mydata/redis
wget http://download.redis.io/redis-stable/redis.conf
vi redis.conf

bind 127.0.0.1  //127.0.0.1 限制只能本机访问 将其改为0.0.0.0
protected-mode no # 默认yes，开启保护模式，限制为本地访问
daemonize no 默认no，改为yes意为以守护进程方式启动，yes会使配置文件方式启动redis失败（一开启就退出）
```

> 启动容器

```sh
docker run -p 6379:6379 --name redis \
-v /mydata/redis/redis.conf:/etc/redis/redis.conf \
-v /mydata/redis/data:/data \
-d redis:6.2.6 redis-server /etc/redis/redis.conf --appendonly yes --requirepass "Baidu12#$"
```

### 安装Nginx

- 先运行一次容器（为了拷贝配置文件）：

```sh
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx  \
-d nginx:1.22
```

- 将容器内的配置文件拷贝到指定目录：

```sh
docker container cp nginx:/etc/nginx /mydata/nginx/
```

- 修改文件名称：

```sh
cd /mydata/nginx/ && mv nginx conf
```

- 终止并删除容器：

```sh
docker stop nginx && docker rm nginx
```

- 使用如下命令启动Nginx服务：

```sh
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx  \
-v /mydata/nginx/conf:/etc/nginx \
-d nginx:1.22
```

### 容器开机启动

docker update --restart=always xxx



### 阿里云镜像加速

"registry-mirrors": ["https://tptpe526.mirror.aliyuncs.com"]



## Mac上Java相关操作

### nacos启动

sh startup.sh -m standalone



### idea自动导包

![image-20221102223226355](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221102223226355.png)



- 勾选标注第1个选项，IDEA 自动帮我们导入需要用到的包。但是对于那些同名的包，还是需要手动 Alt + Enter 进行导入的
- 勾选标注第2个选项，IDEA自动帮我们优化导入的包，比如自动去掉一些没有用到的包。

### vim撤销,恢复

按u

恢复是ctrl+R















## JMETER使用

https://blog.csdn.net/zuojunyuan/article/details/94152368



## 前端返回状态码错误

### 401

在网页能访问,在测试软件里不能访问.只需要把拦截器路径中设置一下就可以





## Mac上使用idea小技巧

### 提取方法

commadn+alt+m

### 模拟微服务集群环境

在services里面点击服务按command+d



### 快速try catch

ctrl + alt + t

### 让字母大写

command + shift + u



### 选中多行

按住opetion(alt)键之后可以做到



### 撤销回退

ctrl + shift + z



## Mac上使用WebStrom小技巧

关闭eslint检查

<Vssue  />













