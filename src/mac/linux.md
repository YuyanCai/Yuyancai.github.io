# linux常用技巧
## 使用alias设置别名，永久生效

vim ~/.bashrc

source ~/.bashrc


```
alias
```

可以看到所有的别名

## 向centos中拖放文件

yum -y install lrzsz



## 离线安装

rpm -ivh gitlab-ce-13.10.2-ce.0.el7.x86_64.rpm



## yum问题

### 本地yum源

```shell
rm -rf * /etc/yum.repos.d/*
vi /etc/yum.repos.d/local.repo

[centos]
name=centos
baseurl=file:///opt/centos
gpgcheck=0
enabled=1
```



### 网路yum源

```bash
wget -O /etc/yum.repos.d/local.repo http://mirrors.aliyun.com/repo/Centos-7.repo
或者curl下载
curl -o /etc/yum.repos.d/local.repo http://mirrors.aliyun.com/repo/Centos-7.repo

yum clean all && yum makecache

yum install -y epel-release

yum clean all && yum makecache
```





## 改名

```bash
hostnamectl set-hostname redis
```



## 关防火墙

systemctl stop firewalld

systemctl disable firewalld

setenforce 0

sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config



## LINUX 杀死、暂停、继续、后台运行进程

1. jobs 查看后台运行的进程
2. fg %n 让后台运行的进程n到前台来
3. bg %n 让进程n到后台去；

**"n"为jobs查看到的进程编号.**



ctrl + z

可以将一个正在前台执行的命令放到后台，并且暂停



fg

将后台中的命令调至前台继续运行

如果后台中有多个命令，可以用 fg %jobnumber将选中的命令调出



ps -ef|grep 进程名

kill -9 进程id



## vim问题

### vim 取消查找后的高亮显示

:noh

或者输入一个不存在的字符串

### vim替换文本

%s/源内容/替换内容



### vim全选，全部复制，全部删除

**全选（高亮显示**）：按esc后，然后ggvG或者ggVG

**全部复制：**按esc后，然后ggyG

**全部删除：**按esc后，然后dG



解析：

**gg：**是让光标移到首行，在**vim**才有效，vi中无效

**v ：** 是进入Visual(可视）模式

**G ：**光标移到最后一行

**选**中内容以后就可以其他的操作了，比如：
**d** 删除**选**中内容
**y** 复制**选**中内容到0号寄存器
**"+y** 复制**选**中内容到＋寄存器，也就是系统的剪贴板，供其他程序用



### sed在文本指定位置添加内容

sed '1i 添加的内容' file 　　 #这是在第一行前添加字符串
sed '$i 添加的内容' file 　　 #这是在最后一行行前添加字符串
sed '$a添加的内容' file 　　 #这是在最后一行行后添加字符串

sed -i '$a\192.168.10.10 node1\n\192.168.10.20 node2\n\192.168.10.30 node3' /etc/hosts

我们只需要努力，然后剩下的交给时间。





## netstat常用命令

### 安装netstat

包含**netstat**的软件包称为**net-tools**

yum install -y net-tools





### 查看网络路由表

netstat -nr



### 查看端口占用情况

netstat -tnlp



#### 参数说明

-a 显示所有socket，包括正在监听的。

-n 以数字形式显示地址和端口号。

-r 显示核心路由表，格式同“route -e”。

-t 显示当前连接卸载状态。

-v 显示正在进行的工作。

-p proto 显示proto指定的协议的连接。

-b 显示在创建每个连接或侦听端口时涉及的可执行程序。

-e 显示以太网统计。此选项可以与 -s 选项结合使用。

-f 显示外部地址的完全限定域名(FQDN)。

-o 显示拥有的与每个连接关联的进程PID。

-q 显示所有连接、侦听端口和绑定的非侦听 TCP 端口。

-s 显示每个协议的统计。

-x 显示 NetworkDirect 连接、侦听器和共享端点。

-y 显示所有连接的 TCP 连接模板。无法与其他选项结合使用。







## 编译安装环境问题

因为我们通过源码的方式安装，需要编译器

yum install gcc-c++ -y

进入源码目录

./configure && make && make install



## 时间同步

中国上海的时区：

timedatectl set-timezone "Asia/Shanghai"

https://www.jiebaiyou.com/2019/11/20/CentOS-7-8-%E4%B8%AD%E8%AE%BE%E7%BD%AE%E6%97%B6%E9%97%B4%E3%80%81%E6%97%B6%E5%8C%BA%E3%80%81%E6%97%B6%E9%97%B4%E5%90%8C%E6%AD%A5/





## 切换root用户

sudo su -
