---
title: Nginx
---
## 一、Nginx简介

Nginx (“engine x”) 是一个高性能的 HTTP 和[反向代理](https://so.csdn.net/so/search?q=反向代理&spm=1001.2101.3001.7020)服务器,特点是占有`内存少`，`并发能力强`



## 二、Nginx 作为 web 服务器

Nginx 可以作为静态页面的 web 服务器，同时还支持 CGI 协议的动态语言，比如 perl、php等。但是不支持 java。Java 程序只能通过与 tomcat 配合完成。Nginx 专为性能优化而开发，性能是其最重要的考量,实现上非常注重效率 ，能经受高负载的考验,有报告表明能支持高达 50,000 个并发连接数。

### 2.1 正向代理

正向代理（forward proxy）：是一个位于客户端和目标服务器之间的服务器(代理服务器)，为了从目标服务器取得内容，客户端向代理服务器发送一个请求并指定目标，然后代理服务器向目标服务器转交请求并将获得的内容返回给客户端。

这种代理其实在生活中是比较常见的，比如访问外国网站技术，其用到的就是代理技术。

有时候，用户想要访问某国外网站，该网站无法在国内直接访问，但是我们可以访问到一个代理服务器，这个代理服务器可以访问到这个国外网站。这样呢，用户对该国外网站的访问就需要通过代理服务器来转发请求，并且该代理服务器也会将请求的响应再返回给用户。这个上网的过程就是用到了正向代理。

![image-20220317165503106](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317165503106.png)









### 2.2 反向代理

反向代理（reverse proxy）：是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

![image-20220317165547351](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317165547351.png)





**反向代理，其实是"代理服务器"代理了"目标服务器"，去和"客户端"进行交互。**



通过反向代理服务器访问目标服务器时，客户端是不知道真正的目标服务器是谁的，甚至不知道自己访问的是一个代理。





### 2.3 正向代理和反向代理的区别



虽然正向代理服务器和反向代理服务器所处的位置都是客户端和真实服务器之间，所做的事情也都是把客户端的请求转发给服务器，再把服务器的响应转发给客户端，但是二者之间还是有一定的差异的。



1、**正向代理其实是客户端的代理**，帮助客户端访问其无法访问的服务器资源。**反向代理则是服务器的代理**，帮助服务器做负载均衡，安全防护等。



2、**正向代理一般是客户端架设的**，比如在自己的机器上安装一个代理软件。而**反向代理一般是服务器架设的**，比如在自己的机器集群中部署一个反向代理服务器。



3、**正向代理中，服务器不知道真正的客户端到底是谁**，以为访问自己的就是真实的客户端。而在**反向代理中，客户端不知道真正的服务器是谁**，以为自己访问的就是真实的服务器。



4、正向代理和反向代理的作用和目的不同。**正向代理主要是用来解决访问限制问题。而反向代理则是提供负载均衡、安全防护等作用。二者均能提高访问速度。**



## 三、安装

> 推荐网络yum源

（1）安装 pcre 依赖

 tar –xvf pcre-8.37.tar.gz

进入源码目录

./configure && make && make install



（2）安装 openssl 、zlib 、 gcc 依赖

yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel



（3）安装 nginx

 tar –xvf nginx...

进入源码目录

./configure && make && make install

![image-20220317173337392](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317173337392.png)



**进入目录 /usr/local/nginx/sbin/nginx 启动服务**

![image-20220317190604997](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317190604997.png)



## 四、常用命令

![image-20220317191402101](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317191402101.png)





## 五、Nginx的配置文件

> nginx 配置文件位置
>
> 安装完nginx之后，配置文件位置如下
>
> /usr/local/nginx/conf/nginx.conf

配置文件中的内容 包含三部分内容 

（1）全局块：配置服务器整体运行的配置指令 比如 worker_processes 1;处理并发数的配置 

（2）events 块：影响 Nginx 服务器与用户的网络连接 比如 worker_connections 1024; 支持的最大连接数为 1024 

（3）http 块 还包含两部分： http 全局块 server 块







### 5.1 反向代理实例一

#### 5.1.1 实现效果

使用 nginx 反向代理，访问` www.123.com` 直接跳转到 127.0.0.1:8080



#### 5.1.2 环境配置

![image-20220317204621892](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317204621892.png)



![image-20220317204538874](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317204538874.png)



#### 5.1.3 测试

**访问Nginx代理服务器的IP将会转发到本地tomcat服务器**



![image-20220317204641093](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317204641093.png)









### 5.2 反向代理实例二

#### 5.2.1 实现效果

使用 nginx 反向代理，根据访问的路径跳转到不同端口的服务中 **nginx 监听端口为 9001**

访问 `http://127.0.0.1:9001/edu/` 直接跳转到 127.0.0.1:8081 

访问 `http://127.0.0.1:9001/vod/` 直接跳转到 127.0.0.1:8082



#### 5.2.2 环境配置

修改第二个服务器端口号为8081

还有shutdown端口和第一台不一致即可

![image-20220317210235458](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317210235458.png)



![image-20220317210331055](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317210331055.png)





```
[root@tomcat2 edu]## pwd
/usr/src/tomcat8080/apache-tomcat-7.0.70/webapps/edu
[root@tomcat2 edu]## cat a.html 
<p>Hello Tomcat1<p>


[root@tomcat2 vod]## pwd
/usr/src/tomcat8081/apache-tomcat-7.0.70/webapps/vod
[root@tomcat2 vod]## cat a.html 
<p>Hello Tomcat2<p>
```



#### 5.2.3 测试

![image-20220317211419065](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317211419065.png)

#### 5.2.4 location 指令说明  

>  URL就是一个完整的链接（统一资源定位符）
>
> URI是一个标识，用来区别于其他资源的标识，它并不是一个完整的链接，而是相对地址

该指令用于匹配 URL。 语法如下：

```
location [= | ~ | ~* | ^~] uri {

}
```

1、= ：用于不含正则表达式的 uri 前，要求请求字符串与 uri 严格匹配，如果匹配 成功，就停止继续向下搜索并立即处理该请求。

 2、~：用于表示 uri 包含正则表达式，并且区分大小写。

 3、`~*`：用于表示 uri 包含正则表达式，并且不区分大小写。

4、`^~`：用于不含正则表达式的 uri 前，要求 Nginx 服务器找到标识 uri 和请求字 符串匹配度最高的 location 后，立即使用此 location 处理请求，而不再使用 location  块中的正则 uri 和请求字符串做匹配。

 注意：如果 uri 包含正则表达式，则必须要有 ~ 或者 ~* 标识。



![image-20220317212348722](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317212348722.png)



重新加载nginx配置文件

![image-20220317212405603](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317212405603.png)



![image-20220317212546369](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317212546369.png)





## 六、负载均衡

### 6.1 实现效果

浏览器地址栏输入地址 `http://www.123.com/edu/a.html`，负载均衡效果，平均8080和8081端口中



### 6.2 环境配置

![image-20220317220048357](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317220048357.png)





![image-20220317221043090](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317221043090.png)



重新加载该配置文件

```
[root@tomcat2 sbin]## ./nginx -s reload
[root@tomcat2 sbin]## pwd
/usr/local/nginx/sbin
```





### 6.3 测试

![](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317221317425.png)











## 七、动静分离

### 7.1 实现效果

将静态资源独立存放，由nginx转发静态资源



### 7.2 环境准备

```
[root@tomcat2 data]## ll
total 0
drwxr-xr-x 2 root root 19 Mar 17 17:26 image
drwxr-xr-x 2 root root 19 Mar 17 17:29 www

[root@tomcat2 data]## cd image/
[root@tomcat2 image]## ls
1.jpeg

[root@tomcat2 data]## cd www/
[root@tomcat2 www]## ll
total 4
-rw-r--r-- 1 root root 27 Mar 17 17:29 a.html
```



![image-20220317225149636](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317225149636.png)



每次修改过配置文件，都要重新加载配置文件

```
[root@tomcat2 conf]## cd /usr/local/nginx/sbin/
[root@tomcat2 sbin]## ./nginx -s reload
```



### 7.3 测试

![image-20220317225915461](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317225915461.png)











## 八、高可用

![image-20220317230659093](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317230659093.png)



### 8.1 环境准备

部署两台nginx服务器

![image-20220317231852938](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317231852938.png)



yum install -y keepalived

[root@nginx-master ~]## rpm -q keepalived
keepalived-1.3.5-19.el7.x86_64





==/usr/local/src/nginx_check.sh==

```shell
[root@nginx-master ~]## vim /usr/local/src/nginx_check.sh

##!/bin/bash
A=`ps -C nginx –no-header |wc -l`
if [ $A -eq 0 ];then
    /usr/local/nginx/sbin/nginx ##nginx启动路径
    sleep 2
    if [ `ps -C nginx --no-header |wc -l` -eq 0 ];then
        killall keepalived ##nginx挂掉后，杀掉这个服务器的所有keepalived进程
    fi
fi
```



==keepalived.conf==

```shell
[root@nginx-master src]## vim /etc/keepalived/keepalived.conf

##全局配置
global_defs {
    notification_email {
    acassen@firewall.loc
    failover@firewall.loc
    sysadmin@firewall.loc
    }
    notification_email_from Alexandre.Cassen@firewall.loc
    smtp_server 172.20.10.13 ##主机ip
    smtp_connect_timeout 30
    router_id LVS_DEVEL ##服务器域名名字，可在/etc/hosts中查看127.0.0.1映射的域名
}

##脚本配置
vrrp_script chk_http_port {
    script "/usr/local/src/nginx_check.sh" ##脚本路径
    interval 2 ##（检测脚本执行的间隔）;每隔2s检查一次
    weight 2 ##设置服务器权重
}

##虚拟ip的配置
vrrp_instance VI_1 {
        state MASTER ## Master为Master；Salve为BACKUP
        interface ens33 ##网卡；可以用ip addr 看网卡名
        virtual_router_id 51 ## 主、备机的 virtual_router_id 必须相同
        priority 90 ## 主、备机取不同的优先级，主机值较大，备份机值较小
        advert_int 1 ##每1s发送一次心跳
        authentication {
        auth_type PASS
        auth_pass 1111
        }
        virtual_ipaddress {
        172.20.10.50 ##VRRP H 虚拟ip地址,多台keepalived绑定一个ip；必须同一网段
        }
}
```



==slave同上，以下为不同点==

```shell
smtp_server 172.20.10.13 ##主机ip
state BACK
priority 90
```



### 8.2 测试

![image-20220317235241845](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317235241845.png)



**访问测试**

![image-20220317234823891](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317234823891.png)



**把master的keepalived和nginx断掉**

```
[root@nginx-master ~]## systemctl stop keepalived      
[root@nginx-master ~]## cd /usr/local/nginx/sbin/
[root@nginx-master sbin]## ./nginx -s stop
[root@nginx-master sbin]## 
```



![image-20220317235542268](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317235542268.png)



**不断刷新还是能访问nginx页面**

![image-20220317234823891](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220317234823891.png)







## 九、优秀文章

[终于有人把正向代理和反向代理解释的明明白白了！ - 云+社区 - 腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1418457##:~:text=2、 正向代理一般是客户端架设的 ，比如在自己的机器上安装一个代理软件。. 而 反向代理一般是服务器架设的 ，比如在自己的机器集群中部署一个反向代理服务器。. 3、 正向代理中，服务器不知道真正的客户端到底是谁,而在 反向代理中，客户端不知道真正的服务器是谁 ，以为自己访问的就是真实的服务器。. 4、正向代理和反向代理的作用和目的不同。. 正向代理主要是用来解决访问限制问题。. 而反向代理则是提供负载均衡、安全防护等作用。. 二者均能提高访问速度。. PS：本文的特殊形式只是为了更加通俗易懂的讲解知识。.)
