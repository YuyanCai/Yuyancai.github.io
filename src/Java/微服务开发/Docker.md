---
title: Docker
---
## 一、简介

### 1.1 Docker是什么

Docker是基于Go语言实现的云开源项目。
Docker的主要目标是“Build，Ship and Run Any App,Anywhere”，也就是通过对应用组件的封装、分发、部署、运行等生命周期的管理，使用户的APP（可以是一个WEB应用或数据库应用等等）及其运行环境能够做到“一次镜像，处处运行”。



### 1.2 为什么会出现Docker

环境配置沟通过于繁琐，用docker的话把自己配好的环境写好的项目直接打包成镜像，别人拿到镜像后就可以运行成为一个容器，直接运行



### 1.3 虚拟机技术的发展

**传统虚拟机技术**

它可以在一种操作系统里面运行另一种操作系统，比如在Windows10系统里面运行Linux系统CentOS7。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。这类虚拟机完美的运行了另一套系统，能够使应用程序，操作系统和硬件三者之间的逻辑不变。

![image-20220404090904224](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404090904224.png)

虚拟机的缺点：
1    资源占用多               2    冗余步骤多                 3    启动慢





**容器虚拟化技术**

Linux 容器不是模拟一个完整的操作系统而是对进程进行隔离。有了容器，就可以将软件运行所需的所有资源打包到一个隔离的容器中。容器与虚拟机不同，不需要捆绑一整套操作系统，只需要软件工作所需的库资源和设置。系统因此而变得高效轻量并保证部署在任何环境中的软件都能始终如一地运行。

![image-20220404091031246](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404091031246.png)







**对比**

![image-20220404091122678](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404091122678.png)





### 1.4 一句话概括

==解决了运行环境和配置问题的软件容器，方便做持续集成并有助于整体发布的容器虚拟化技术==



### 1.5 能干嘛

==docker能够一次构建处处运行==

1.更快速的应用交付和部署

传统的应用开发完成后，需要提供一堆安装程序和配置说明文档，安装部署后需根据配置文档进行繁杂的配置才能正常运行。Docker化之后只需要交付少量容器镜像文件，在正式生产环境加载镜像并运行即可，应用安装配置在镜像里已经内置好，大大节省部署配置和测试验证时间。



2.更高效的计算资源利用

Docker是内核级虚拟化，其不像传统的虚拟化技术一样需要额外的Hypervisor支持，所以在一台物理机上可以运行很多个容器实例，可大大提升物理服务器的CPU和内存的利用率。



3.更简单的系统运维

应用容器化运行后，生产环境运行的应用可与开发、测试环境的应用高度一致，容器会将应用程序相关的环境和状态完全封装起来，不会因为底层基础架构和操作系统的不一致性给应用带来影响，产生新的BUG。当出现程序异常时，也可以通过测试环境的相同容器进行快速定位和修复。



4.更便捷的升级和扩缩容

随着微服务架构和Docker的发展，大量的应用会通过微服务方式架构，应用的开发构建将变成搭乐高积木一样，每个Docker容器将变成一块“积木”，应用的升级将变得非常容易。当现有的容器不足以支撑业务处理时，可通过镜像运行新的容器进行快速扩容，使应用系统的扩容从原先的天级变成分钟级甚至秒级。



![image-20220404091703677](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404091703677.png)

Docker借鉴了标准集装箱的概念。标准集装箱将货物运往世界各地，Docker将这个模型运用到自己的设计中，唯一不同的是:集装箱运输货物，而Docker运输软件。-













## 二、入门

### 2.1 部署

**云服务器部署docker**

> 直接用带docker的镜像，开机就可以用docker的命令

![image-20220404091938247](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404091938247.png)



**命令行部署docker**

保证虚拟机能稳定上网即可

```
第一步
yum -y install gcc && yum -y install gcc-c++
yum install -y yum-utils
第二步使用阿里云镜像
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo && yum makecache fast
第三步安装
yum install docker-ce docker-ce-cli containerd.io
systemctl start docker  && systemctl enable docker 
docker run hello-world
```

测试hello-world

![](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220402204821446.png)



#### 2.1.1 阿里云镜像加速（必配）

> "registry-mirrors": ["https://tptpe526.mirror.aliyuncs.com"]

![image-20220404101840726](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404101840726.png)

![image-20220413165211950](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220413165211950.png)



### 2.2 Docker的基本组成

#### 2.2.1 镜像

**Docker 镜像（Image）就是一个只读的模板。镜像可以用来创建 Docker 容器，一个镜像可以创建很多容器。**

它也相当于是一个root文件系统。比如官方镜像 centos:7 就包含了完整的一套 centos:7 最小系统的 root 文件系统。

相当于容器的“源代码”，docker镜像文件类似于Java的类模板，而docker容器实例类似于java中new出来的实例对象。



#### 2.2.2 容器

1 从面向对象角度
**Docker 利用容器（Container）独立运行的一个或一组应用，应用程序或服务运行在容器里面，容器就类似于一个虚拟化的运行环境，容器是用镜像创建的运行实例。**就像是Java中的类和实例对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器为镜像提供了一个标准的和隔离的运行环境，它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台

2 从镜像容器角度
可以把容器看做是一个简易版的 Linux 环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。





#### 2.2.3 仓库

==仓库（Repository）是集中存放镜像文件的场所。==

类似于
**Maven仓库，存放各种jar包的地方；**
**github仓库，存放各种git项目的地方；**
**Docker公司提供的官方registry被称为Docker Hub，存放各种镜像模板的地方。**

仓库分为公开仓库（Public）和私有仓库（Private）两种形式。
最大的公开仓库是 Docker Hub(https://hub.docker.com/)，
存放了数量庞大的镜像供用户下载。国内的公开仓库包括阿里云 、网易云等



#### 2.2.4 小总结

Docker 本身是一个容器运行载体或称之为管理引擎。我们把应用程序和配置依赖打包好形成一个可交付的运行环境，这个打包好的运行环境就是image镜像文件。只有通过这个镜像文件才能生成Docker容器实例(类似Java中new出来一个对象)。

**image文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。**



**镜像文件**

- image 文件生成的容器实例，本身也是一个文件，称为镜像文件。



**容器实例**

*  一个容器运行一种服务，当我们需要的时候，就可以通过docker客户端创建一个对应的运行实例，也就是我们的容器
  

**仓库**

*  就是放一堆镜像的地方，我们可以把镜像发布到仓库中，需要的时候再从仓库中拉下来就可以了。



### 2.3 架构图解

#### 2.3.1 运行流程

1. 用户是使用Docker Client与Docker Daemon建立通信，并发送请求给后者
2. Docker Daemon作为Docker架构中的主体部分，首先提供Docker Server的功能可以接受Docker Client请求
3. Docker Engine执行Docker内部的一些列工作，每一项工作都是一个Job的形式存在
4. Job的运行过程中，当需要容器镜像时，则从docker registry中下载镜像，并通过镜像管理驱动Graph driver将下载镜像以graph的形式存储
5. 当需docker创建网络环境时，通过网络管理驱动networkdriver创建并配置Docker容器网络环境
6. 当需要限制docker容器运行资源或执行用户指令等操作时，则通过Exec driver来完成
7. Libcontainer是一项独立的容器管理包，Network driver以及Exec driver都是通过Libcontainer来实现具体对容器进行的操作。

> 以上给爷理解着背，面试必考
>
> 你就想着容器创建的过程，通过dockerclient与dockerdaemon建立通信
>
> dockerdaemon是核心部分，它提供的第一个功能就是与用户通信docker server
>
> docker engine执行的是容器的内部工作，每一项工作都是一个job的形式
>
> 然后job需要镜像，去registry拉，注册进graph，需要网络有网络驱动给创建
>
> 最后需要一些特殊的指令的话通过exec driver来完成
>
> Libcontainer字如其名



![image-20220404093156122](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404093156122.png)





#### 2.3.2 为什么docker比vm快

(1)docker有着比虚拟机更少的抽象层
   由于docker不需要Hypervisor(虚拟机)实现硬件资源虚拟化,运行在docker容器上的程序直接使用的都是实际物理机的硬件资源。因此在CPU、内存利用率上docker将会在效率上有明显优势。

(2)docker利用的是宿主机的内核,而不需要加载操作系统OS内核
   当新建一个容器时,docker不需要和虚拟机一样重新加载一个操作系统内核。进而避免引寻、加载操作系统内核返回等比较费时费资源的过程,当新建一个虚拟机时,虚拟机软件需要加载OS,返回新建过程是分钟级别的。而docker由于直接利用宿主机的操作系统,则省略了返回过程,因此新建一个docker容器只需要几秒钟。

















## 三、常用命令

### 3.1 帮助启动类命令

![image-20220404102131493](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404102131493.png)



### 3.2 镜像命令

![image-20220404102433154](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404102433154.png)



#### 3.2.2 虚悬镜像
```
==仓库名、标签都是<none>的镜像，俗称虚悬镜像dangling image==
```


#### 3.2.1 docker system df

**查看镜像/容器/数据卷所占的空间**

[root@docker ~]## docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          2         0         177MB     177MB (100%)
Containers      2         0         0B        0B
Local Volumes   0         0         0B        0B
Build Cache     0         0         0B        0B





### 3.3 容器命令

![image-20220404102754006](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404102754006.png)

**docker run**

--name="容器新名字"       为容器指定一个名称；
-d: 后台运行容器并返回容器ID，也即启动守护式容器(后台运行)；

-i：以交互模式运行容器，通常与 -t 同时使用；
-t：为容器重新分配一个伪输入终端，通常与 -i 同时使用；
也即启动交互式容器(前台有伪终端，等待交互)；

-P: 随机端口映射，大写P
-p: 指定端口映射，小写p



**docker run -it centos /bin/bash** 

-i: 交互式操作。
-t: 终端。
centos : centos 镜像。
/bin/bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。
要退出终端，直接输入 exit:





**docker logs**

![image-20220404103318803](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404103318803.png)



**docker inspect**

> 查看容器内部细节，很重要！
>
> 能看挂载相关信息，和网络等详细信息



**docker cp**

![image-20220404103517389](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404103517389.png)



![](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220402222639429.png)



#### 3.3.1 常用命令

![image-20220404104044643](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404104044643.png)

- attach    Attach to a running container                 ## 当前 shell 下 attach 连接指定运行镜像
- build     Build an image from a Dockerfile              ## 通过 Dockerfile 定制镜像
- commit    Create a new image from a container changes   ## 提交当前容器为新的镜像
- cp        Copy files/folders from the containers filesystem to the host path   ##从容器中拷贝指定文件或者目录到宿主机中
- create    Create a new container                        ## 创建一个新的容器，同 run，但不启动容器
- diff      Inspect changes on a container's filesystem   ## 查看 docker 容器变化
- events    Get real time events from the server          ## 从 docker 服务获取容器实时事件
- exec      Run a command in an existing container        ## 在已存在的容器上运行命令
- export    Stream the contents of a container as a tar archive   ## 导出容器的内容流作为一个 tar 归档文件[对应 import ]
- history   Show the history of an image                  ## 展示一个镜像形成历史
- images    List images                                   ## 列出系统当前镜像
- import    Create a new filesystem image from the contents of a tarball ## 从tar包中的内容创建一个新的文件系统映像[对应export]
- info      Display system-wide information               ## 显示系统相关信息
- inspect   Return low-level information on a container   ## 查看容器详细信息
- kill      Kill a running container                      ## kill 指定 docker 容器
- load      Load an image from a tar archive              ## 从一个 tar 包中加载一个镜像[对应 save]
- login     Register or Login to the docker registry server    ## 注册或者登陆一个 docker 源服务器
- logout    Log out from a Docker registry server          ## 从当前 Docker registry 退出
- logs      Fetch the logs of a container                 ## 输出当前容器日志信息
- port      Lookup the public-facing port which is NAT-ed to PRIVATE_PORT    ## 查看映射端口对应的容器内部源端口
- pause     Pause all processes within a container        ## 暂停容器
- ps        List containers                               ## 列出容器列表
- pull      Pull an image or a repository from the docker registry server   ## 从docker镜像源服务器拉取指定镜像或者库镜像
- push      Push an image or a repository to the docker registry server    ## 推送指定镜像或者库镜像至docker源服务器
- restart   Restart a running container                   ## 重启运行的容器
- rm        Remove one or more containers                 ## 移除一个或者多个容器
- rmi       Remove one or more images       ## 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除]
- run       Run a command in a new container              ## 创建一个新的容器并运行一个命令
- save      Save an image to a tar archive                ## 保存一个镜像为一个 tar 包[对应 load]
- search    Search for an image on the Docker Hub         ## 在 docker hub 中搜索镜像
- start     Start a stopped containers                    ## 启动容器
- stop      Stop a running containers                     ## 停止容器
- tag       Tag an image into a repository                ## 给源中镜像打标签
- top       Lookup the running processes of a container   ## 查看容器中运行的进程信息
- unpause   Unpause a paused container                    ## 取消暂停容器
- version   Show the docker version information           ## 查看 docker 版本号
- wait      Block until a container stops, then print its exit code   ## 截取容器停止时的退出状态值





镜像服务的密码和阿里云账户的密码不是同一个密码，

上传成功

![image-20220403104927237](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220403104927237.png)





docker exec -it 1f1ed5798baa /bin/bash



docker commit -m="ifconfig cmd add" -a="pyy" 1f1ed5798baa:1.0





[root@VM-16-8-centos ~]## docker run -d -p 5000:5000 -v /myregistry:/tmp/registry --privileged=true registry




```
[root@VM-16-8-centos ~]## curl -XGET http://124.221.228.148:5000/v2/_catalog
{"repositories":["pyyubuntu"]}
```




## 四、镜像

### 4.1 是什么

**镜像**
是一种轻量级、可执行的独立软件包，它包含运行某个软件所需的所有内容，我们把应用程序和配置依赖打包好形成一个可交付的运行环境(包括代码、运行时需要的库、环境变量和配置文件等)，这个打包好的运行环境就是image镜像文件。

只有通过这个镜像文件才能生成Docker容器实例(类似Java中new出来一个对象)。



**分层的镜像**

我们拉取镜像的时候好像是一层一层下载的，这是为什么呢？

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。



特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录







### 4.2 镜像加载原理

**Docker镜像加载原理：**
   docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。bootfs(boot file system)主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启动时会加载bootfs文件系统，==在Docker镜像的最底层是引导文件系统bootfs。==这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已由bootfs转交给内核，此时系统也会卸载bootfs。

rootfs (root file system) ，在bootfs之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。 

![image-20220404105851911](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404105851911.png)



**对于一个精简的OS，rootfs可以很小，只需要包括最基本的命令、工具和程序库就可以了，因为底层直接用Host的kernel，自己只需要提供 rootfs 就行了。由此可见对于不同的linux发行版, bootfs基本是一致的, rootfs会有差别, 因此不同的发行版可以公用bootfs。**



### 4.3 为什么镜像要分层

镜像分层最大的一个好处就是共享资源，方便复制迁移，就是为了复用。

比如说有多个镜像都从相同的 base 镜像构建而来，那么 Docker Host 只需在磁盘上保存一份 base 镜像；
同时内存中也只需加载一份 base 镜像，就可以为所有容器服务了。而且镜像的每一层都可以被共享。



### 4.4 重点理解

> 看了好几遍docker了，这个真的很重要！

==Docker镜像层都是只读的，容器层是可写的==

当容器启动时，一个新的可写层被加载到镜像的顶部。这一层通常被称作“容器层”，“容器层”之下的都叫“镜像层”。
所有对容器的改动 - 无论添加、删除、还是修改文件都只会发生在容器层中。只有容器层是可写的，容器层下面的所有镜像层都是只读的。

![image-20220404110213095](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404110213095.png)



### 4.5 操作案例

新镜像

**docker commit提交容器副本使之成为一个新的镜像**

**docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]**



==ubuntu安装vim命令==

apt-get update
apt-get -y install vim



==本地镜像发布阿里云==

1. 登录

```shell
$ docker login --username=用户名 registry.cn-hangzhou.aliyuncs.com
```

用于登录的用户名为阿里云账号全名，密码为开通服务时设置的密码。

2. 推送

```
docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/pengyuyan_ubuntu/pengyuyan_repository:[镜像版本号]
docker push registry.cn-hangzhou.aliyuncs.com/pengyuyan_ubuntu/pengyuyan_repository:[镜像版本号]
```



![image-20220404112028335](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404112028335.png)

![image-20220404111457512](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404111457512.png)



==下载阿里云镜像到本地==

```shell
docker pull registry.cn-hangzhou.aliyuncs.com/pengyuyan_ubuntu/pengyuyan_repository:[镜像版本号]
```



==本地镜像发布到私有库==

私有库：

1 官方Docker Hub地址：https://hub.docker.com/，中国大陆访问太慢了且准备被阿里云取代的趋势，不太主流。

2 Dockerhub、阿里云这样的公共镜像仓库可能不太方便，涉及机密的公司不可能提供镜像给公网，所以需要创建一个本地私人仓库供给团队使用，基于公司内部项目构建镜像。

    Docker Registry是官方提供的工具，可以用于构建私有镜像仓库



![image-20220404112410838](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404112410838.png)



1. 安装运行私有仓库

docker pull registry

docker run -d -p 5000:5000  -v /myregistry/:/tmp/registry --privileged=true registry

默认情况，仓库被创建在容器的/var/lib/registry目录下，建议自行用容器卷映射，方便于宿主机联调



2. 给容器增加命令

docker run -it ubuntu /bin/bash

apt-get update

apt-get install net-tools



公式：
docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]
命令：在容器外执行，记得
docker commit -m="ifconfig cmd add" -a="pyy" a69d7c825c4f pyyubuntu:1.2



3. 打标签，改配置

docker tag  pyyubuntu:1.2  192.168.100.10:5000/pyyubuntu:1.2



vim /etc/docker/daemon.json

{
  "registry-mirrors": ["https://pengyuyan227.mirror.aliyuncs.com"],
  "insecure-registries": ["192.168.100.10:5000"]
}



4. 上传

docker push 192.168.111.162:5000/zzyyubuntu:1.2





### 4.6 小总结

Docker中的镜像分层，支持通过扩展现有镜像，创建新的镜像。类似Java继承于一个Base基础类，自己再按需扩展。
新镜像是从 base 镜像一层一层叠加生成的。每安装一个软件，就在现有镜像的基础上增加一层

![image-20220404110700038](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404110700038.png)









## 五、容器卷

> --privileged=true
>
> **Docker挂载主机目录访问如果出现cannot open directory .: Permission denied**
> **解决办法：在挂载目录后多加一个--privileged=true参数即可**



### 5.1 是什么

一句话：有点类似我们Redis里面的rdb和aof文件

将docker容器内的数据保存进宿主机的磁盘中

运行一个带有容器卷存储功能的容器实例

 docker run -it --privileged=true -v /宿主机绝对路径目录:/容器内目录      镜像名



### 5.2 能干嘛

*将运用与运行的环境打包镜像，run后形成容器实例运行 ，但是==我们对数据的要求希望是持久化的==

Docker容器产生的数据，如果不备份，那么当容器实例删除后，容器内的数据自然也就没有了。
为了能保存数据在docker中我们使用卷。

特点：
**1：数据卷可在容器之间共享或重用数据**
**2：卷中的更改可以直接实时生效，爽**
**3：数据卷中的更改不会包含在镜像的更新中**
**4：数据卷的生命周期一直持续到没有容器使用它为止**



### 5.3 数据卷案例

```
[root@VM-16-8-centos ~]## docker run -it --privileged=true -v /tmp/host_data:/tmp/docker_data --name=u1 ubuntu
root@2e431ba4f3bf:/## cd /tmp/docker_data/  
root@2e431ba4f3bf:/tmp/docker_data## mkdir test_docker.txt


[root@VM-16-8-centos ~]## cd /tmp/host_data/
[root@VM-16-8-centos host_data]## ll
total 4
drwxr-xr-x 2 root root 4096 Apr  3 16:10 test_docker.txt


[root@VM-16-8-centos host_data]## mkdir test_host.txt
root@2e431ba4f3bf:/tmp/docker_data##  ll
total 16
drwxr-xr-x 4 root root 4096 Apr  3 08:13 ./
drwxrwxrwt 1 root root 4096 Apr  3 08:10 ../
drwxr-xr-x 2 root root 4096 Apr  3 08:10 test_docker.txt/
drwxr-xr-x 2 root root 4096 Apr  3 08:13 test_host.txt/
```

可以发现，容器卷和挂载在本地的目录内容是一致的

查看改容器详细信息，也能查看到

docker inspect imageID

![image-20220403161747230](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220403161747230.png)





### 5.4 卷的继承

--volumes-from `要继承的容器名`

```
[root@VM-16-8-centos ~]## docker run -it --privileged=true --volumes-from u1  --name u2 ubuntu
root@de0f937528ac:/## cd /tmp
root@de0f937528ac:/tmp## cd docker_data/
root@de0f937528ac:/tmp/docker_data## ll
total 16
drwxr-xr-x 4 root root 4096 Apr  3 08:13 ./
drwxrwxrwt 1 root root 4096 Apr  3 08:26 ../
drwxr-xr-x 2 root root 4096 Apr  3 08:10 test_docker.txt/
drwxr-xr-x 2 root root 4096 Apr  3 08:13 test_host.txt/
```





## 六、常用软件安装

### 6.1 Tomcat

```
[root@VM-16-8-centos ~]## docker pull tomcat
Using default tag: latest
latest: Pulling from library/tomcat
dbba69284b27: Pull complete 
9baf437a1bad: Pull complete 
6ade5c59e324: Pull complete 
b19a994f6d4c: Pull complete 
43c0aceedb57: Pull complete 
24e7c71ec633: Pull complete 
612cf131e488: Pull complete 
dc655e69dd90: Pull complete 
efe57b7441f6: Pull complete 
8db51a0119f4: Pull complete 
Digest: sha256:263f93ac29cb2dbba4275a4e647b448cb39a66334a6340b94da8bf13bde770aa
Status: Downloaded newer image for tomcat:latest
docker.io/library/tomcat:latest
[root@VM-16-8-centos ~]## docker images
REPOSITORY                       TAG       IMAGE ID       CREATED             SIZE
124.221.228.148:5000/pyyubuntu   1.1       138c010d2c99   About an hour ago   109MB
ubuntu                           1.0       138c010d2c99   About an hour ago   109MB
tomcat                           latest    b00440a36b99   37 hours ago        680MB
registry                         latest    d3241e050fc9   4 days ago          24.2MB
ubuntu                           latest    ff0fea8310f3   2 weeks ago         72.8MB



启动多个tomcat实例
docker run -d -p 8081:8080 tomcat
docker run -d -p 8082:8080 tomcat
cp -rf webapps.dist/* webapps

```







新版tomcat，首页不在webapp下了

> 把webapps.dist目录换成webapps

![image-20220403164902673](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220403164902673.png)



当然我们不修改也是可以的，只需要下载tomcat8即可



#### 6.1.1

```sh
docker run -d -p 13245:8080  \
-v  /mydata/tomcat/webapps:/usr/local/tomcat/webapps \
--name tomcat tomcat:8.5
```



### 6.2 Mysql

```shell
[root@VM-16-8-centos ~]##  docker run -d -p 3306:3306 --privileged=true -v /pyy/mysql/log:/var/log/mysql -v /pyy/mysql/data:/var/lib/mysql -v /pyy/mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=a  --name mysql mysql:5.7
b0fbfe45fce1ef90b4caf946efacbef0e50a425a25dec1d8e15902244e43747b
[root@VM-16-8-centos ~]## docker ps
CONTAINER ID   IMAGE       COMMAND                  CREATED             STATUS             PORTS                    NAMES
b0fbfe45fce1   mysql:5.7   "docker-entrypoint.s…"   8 seconds ago       Up 7 seconds       3306/tcp, 33060/tcp      test-mysql
ce89351d51ec   tomcat      "catalina.sh run"        16 minutes ago      Up 16 minutes      0.0.0.0:8080->8080/tcp   funny_bose
de0f937528ac   ubuntu      "bash"                   29 minutes ago      Up 29 minutes                               u2
2e431ba4f3bf   ubuntu      "bash"                   45 minutes ago      Up 45 minutes                               u1
9dabfdf1b57d   registry    "/entrypoint.sh /etc…"   About an hour ago   Up About an hour   0.0.0.0:5000->5000/tcp   sharp_brown
1f1ed5798baa   ubuntu      "/bin/bash"              6 hours ago         Up 47 minutes                               vigorous_dewdney
[root@VM-16-8-centos ~]## docker exec -it b0fbfe45fce1 /bin/bash
root@b0fbfe45fce1:/## mysql -uroot -pa
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.37 MySQL Community Server (GPL)

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> create database test_mysql;
Query OK, 1 row affected (0.00 sec)

mysql> use test_mysql;
Database changed
mysql> create table docker_mysql (id int,name varchar(22));
Query OK, 0 rows affected (0.02 sec)
mysql> insert into docker_mysql values(1,'zs'),(2,'ls');
Query OK, 2 rows affected (0.01 sec)
Records: 2  Duplicates: 0  Warnings: 0
mysql> select count(*) Sum  from docker_mysql;
+-----+
| Sum |
+-----+
|   2 |
+-----+
1 row in set (0.00 sec)
mysql> SHOW VARIABLES LIKE 'character%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | latin1                     |
| character_set_connection | latin1                     |
| character_set_database   | latin1                     |
| character_set_filesystem | binary                     |
| character_set_results    | latin1                     |
| character_set_server     | latin1                     |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
8 rows in set (0.00 sec)

```



navicat测试连接

![image-20220403171241962](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220403171241962.png)







#### 6.2.1 编码问题的解决

**插入中文会报错**

在本地写好my.cnf文件

```
[root@VM-16-8-centos conf]## cat my.cnf 
[client]
default_character_set=utf-8
[mysqld]
collation_server=utf8_general_ci
character_set_server=utf8
[root@VM-16-8-centos conf]## pwd
/pyy/mysql/conf
```

重新启动mysql容器实例再重新进入并查看字符编码



![image-20220404143900870](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404143900870.png)



### 6.3 Redis

复制一份好的redis配置文件，

#### 6.3.1 Redis配置文件

> 开启redis验证    可选
>     requirepass 123
>
> 允许redis外地连接  必须
>      注释掉 ## bind 127.0.0.1
>
> daemonize no
>      将daemonize yes注释起来或者 daemonize no设置，因为该配置和docker run中-d参数冲突，会导致容器一直启动失败
>
> 开启redis数据持久化  appendonly yes  可选

```shell
[root@VM-16-8-centos ~]## cat /app/redis/redis.conf 
## redis configuration file example.
 
####### Main configuration start #######
 
##注释掉bind 127.0.0.1，使redis可以外部访问
##bind 127.0.0.1
 
## 端口号
port 6379
 
##给redis设置密码
requirepass redis123
 
###redis持久化　　默认是no
appendonly yes
 
##开启protected-mode保护模式，需配置bind ip或者设置访问密码
##关闭protected-mode模式，此时外部网络可以直接访问
protected-mode no
 
##是否开启集群
##cluster-enabled no
 
##集群的配置文件,该文件自动生成
##cluster-config-file nodes.conf
 
##集群的超时时间
##cluster-node-timeout 5000
 
##用守护线程的方式启动
daemonize no   
 
##防止出现远程主机强迫关闭了一个现有的连接的错误 默认是300
tcp-keepalive 300
 
####### Main configuration end #######
 
timeout 0
 
tcp-backlog 511
 
## Note: these supervision methods only signal "process is ready."
##       They do not enable continuous liveness pings back to your supervisor.
supervised no
 
## If a pid file is specified, Redis writes it where specified at startup
## and removes it at exit.
##
## When the server runs non daemonized, no pid file is created if none is
## specified in the configuration. When the server is daemonized, the pid file
## is used even if not specified, defaulting to "/var/run/redis.pid".
##
## Creating a pid file is best effort: if Redis is not able to create it
## nothing bad happens, the server will start and run normally.
pidfile /var/run/redis_6379.pid
 
## Specify the server verbosity level.
## This can be one of:
## debug (a lot of information, useful for development/testing)
## verbose (many rarely useful info, but not a mess like the debug level)
## notice (moderately verbose, what you want in production probably)
## warning (only very important / critical messages are logged)
loglevel notice
 
## Specify the log file name. Also the empty string can be used to force
## Redis to log on the standard output. Note that if you use standard
## output for logging but daemonize, logs will be sent to /dev/null
logfile ""
 
## To enable logging to the system logger, just set 'syslog-enabled' to yes,
## and optionally update the other syslog parameters to suit your needs.
## syslog-enabled no
 
## Specify the syslog identity.
## syslog-ident redis
 
## Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.
## syslog-facility local0
 
## Set the number of databases. The default database is DB 0, you can select
## a different one on a per-connection basis using SELECT <dbid> where
## dbid is a number between 0 and 'databases'-1
databases 16
 
## By default Redis shows an ASCII art logo only when started to log to the
## standard output and if the standard output is a TTY. Basically this means
## that normally a logo is displayed only in interactive sessions.
##
## However it is possible to force the pre-4.0 behavior and always show a
## ASCII art logo in startup logs by setting the following option to yes.
always-show-logo yes
 
################################ SNAPSHOTTING  ################################
##
## Save the DB on disk:
##
##   save <seconds> <changes>
##
##   Will save the DB if both the given number of seconds and the given
##   number of write operations against the DB occurred.
##
##   In the example below the behaviour will be to save:
##   after 900 sec (15 min) if at least 1 key changed
##   after 300 sec (5 min) if at least 10 keys changed
##   after 60 sec if at least 10000 keys changed
##
##   Note: you can disable saving completely by commenting out all "save" lines.
##
##   It is also possible to remove all the previously configured save
##   points by adding a save directive with a single empty string argument
##   like in the following example:
##
##   save ""
 
save 900 1
save 300 10
save 60 10000
 
## By default Redis will stop accepting writes if RDB snapshots are enabled
## (at least one save point) and the latest background save failed.
## This will make the user aware (in a hard way) that data is not persisting
## on disk properly, otherwise chances are that no one will notice and some
## disaster will happen.
##
## If the background saving process will start working again Redis will
## automatically allow writes again.
##
## However if you have setup your proper monitoring of the Redis server
## and persistence, you may want to disable this feature so that Redis will
## continue to work as usual even if there are problems with disk,
## permissions, and so forth.
stop-writes-on-bgsave-error yes
 
## Compress string objects using LZF when dump .rdb databases?
## For default that's set to 'yes' as it's almost always a win.
## If you want to save some CPU in the saving child set it to 'no' but
## the dataset will likely be bigger if you have compressible values or keys.
rdbcompression yes
 
## Since version 5 of RDB a CRC64 checksum is placed at the end of the file.
## This makes the format more resistant to corruption but there is a performance
## hit to pay (around 10%) when saving and loading RDB files, so you can disable it
## for maximum performances.
##
## RDB files created with checksum disabled have a checksum of zero that will
## tell the loading code to skip the check.
rdbchecksum yes
 
## The filename where to dump the DB
dbfilename dump.rdb
 
## Remove RDB files used by replication in instances without persistence
## enabled. By default this option is disabled, however there are environments
## where for regulations or other security concerns, RDB files persisted on
## disk by masters in order to feed replicas, or stored on disk by replicas
## in order to load them for the initial synchronization, should be deleted
## ASAP. Note that this option ONLY WORKS in instances that have both AOF
## and RDB persistence disabled, otherwise is completely ignored.
##
## An alternative (and sometimes better) way to obtain the same effect is
## to use diskless replication on both master and replicas instances. However
## in the case of replicas, diskless is not always an option.
rdb-del-sync-files no
 
## The working directory.
##
## The DB will be written inside this directory, with the filename specified
## above using the 'dbfilename' configuration directive.
##
## The Append Only File will also be created inside this directory.
##
## Note that you must specify a directory here, not a file name.
dir ./
 
 
## When a replica loses its connection with the master, or when the replication
## is still in progress, the replica can act in two different ways:
##
## 1) if replica-serve-stale-data is set to 'yes' (the default) the replica will
##    still reply to client requests, possibly with out of date data, or the
##    data set may just be empty if this is the first synchronization.
##
## 2) if replica-serve-stale-data is set to 'no' the replica will reply with
##    an error "SYNC with master in progress" to all the kind of commands
##    but to INFO, replicaOF, AUTH, PING, SHUTDOWN, REPLCONF, ROLE, CONFIG,
##    SUBSCRIBE, UNSUBSCRIBE, PSUBSCRIBE, PUNSUBSCRIBE, PUBLISH, PUBSUB,
##    COMMAND, POST, HOST: and LATENCY.
##
replica-serve-stale-data yes
 
## You can configure a replica instance to accept writes or not. Writing against
## a replica instance may be useful to store some ephemeral data (because data
## written on a replica will be easily deleted after resync with the master) but
## may also cause problems if clients are writing to it because of a
## misconfiguration.
##
## Since Redis 2.6 by default replicas are read-only.
##
## Note: read only replicas are not designed to be exposed to untrusted clients
## on the internet. It's just a protection layer against misuse of the instance.
## Still a read only replica exports by default all the administrative commands
## such as CONFIG, DEBUG, and so forth. To a limited extent you can improve
## security of read only replicas using 'rename-command' to shadow all the
## administrative / dangerous commands.
replica-read-only yes
 
 
## When diskless replication is used, the master waits a configurable amount of
## time (in seconds) before starting the transfer in the hope that multiple
## replicas will arrive and the transfer can be parallelized.
##
## With slow disks and fast (large bandwidth) networks, diskless replication
## works better.
repl-diskless-sync no
 
## When diskless replication is enabled, it is possible to configure the delay
## the server waits in order to spawn the child that transfers the RDB via socket
## to the replicas.
##
## This is important since once the transfer starts, it is not possible to serve
## new replicas arriving, that will be queued for the next RDB transfer, so the
## server waits a delay in order to let more replicas arrive.
##
## The delay is specified in seconds, and by default is 5 seconds. To disable
## it entirely just set it to 0 seconds and the transfer will start ASAP.
repl-diskless-sync-delay 5
 
 
## In many cases the disk is slower than the network, and storing and loading
## the RDB file may increase replication time (and even increase the master's
## Copy on Write memory and salve buffers).
## However, parsing the RDB file directly from the socket may mean that we have
## to flush the contents of the current database before the full rdb was
## received. For this reason we have the following options:
##
## "disabled"    - Don't use diskless load (store the rdb file to the disk first)
## "on-empty-db" - Use diskless load only when it is completely safe.
## "swapdb"      - Keep a copy of the current db contents in RAM while parsing
##                 the data directly from the socket. note that this requires
##                 sufficient memory, if you don't have it, you risk an OOM kill.
repl-diskless-load disabled
 
 
## Disable TCP_NODELAY on the replica socket after SYNC?
##
## If you select "yes" Redis will use a smaller number of TCP packets and
## less bandwidth to send data to replicas. But this can add a delay for
## the data to appear on the replica side, up to 40 milliseconds with
## Linux kernels using a default configuration.
##
## If you select "no" the delay for data to appear on the replica side will
## be reduced but more bandwidth will be used for replication.
##
## By default we optimize for low latency, but in very high traffic conditions
## or when the master and replicas are many hops away, turning this to "yes" may
## be a good idea.
repl-disable-tcp-nodelay no
 
 
## The replica priority is an integer number published by Redis in the INFO
## output. It is used by Redis Sentinel in order to select a replica to promote
## into a master if the master is no longer working correctly.
##
## A replica with a low priority number is considered better for promotion, so
## for instance if there are three replicas with priority 10, 100, 25 Sentinel
## will pick the one with priority 10, that is the lowest.
##
## However a special priority of 0 marks the replica as not able to perform the
## role of master, so a replica with priority of 0 will never be selected by
## Redis Sentinel for promotion.
##
## By default the priority is 100.
replica-priority 100
 
 
## ACL LOG
##
## The ACL Log tracks failed commands and authentication events associated
## with ACLs. The ACL Log is useful to troubleshoot failed commands blocked 
## by ACLs. The ACL Log is stored in memory. You can reclaim memory with 
## ACL LOG RESET. Define the maximum entry length of the ACL Log below.
acllog-max-len 128
 
## Using an external ACL file
##
## Instead of configuring users here in this file, it is possible to use
## a stand-alone file just listing users. The two methods cannot be mixed:
## if you configure users here and at the same time you activate the exteranl
## ACL file, the server will refuse to start.
##
## The format of the external ACL user file is exactly the same as the
## format that is used inside redis.conf to describe users.
##
## aclfile /etc/redis/users.acl
 
 
## Command renaming (DEPRECATED).
##
## ------------------------------------------------------------------------
## WARNING: avoid using this option if possible. Instead use ACLs to remove
## commands from the default user, and put them only in some admin user you
## create for administrative purposes.
## ------------------------------------------------------------------------
##
## It is possible to change the name of dangerous commands in a shared
## environment. For instance the CONFIG command may be renamed into something
## hard to guess so that it will still be available for internal-use tools
## but not available for general clients.
##
## Example:
##
## rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52
##
## It is also possible to completely kill a command by renaming it into
## an empty string:
##
## rename-command CONFIG ""
##
## Please note that changing the name of commands that are logged into the
## AOF file or transmitted to replicas may cause problems.
 
################################### CLIENTS ####################################
 
## Set the max number of connected clients at the same time. By default
## this limit is set to 10000 clients, however if the Redis server is not
## able to configure the process file limit to allow for the specified limit
## the max number of allowed clients is set to the current file limit
## minus 32 (as Redis reserves a few file descriptors for internal uses).
##
## Once the limit is reached Redis will close all the new connections sending
## an error 'max number of clients reached'.
##
## IMPORTANT: When Redis Cluster is used, the max number of connections is also
## shared with the cluster bus: every node in the cluster will use two
## connections, one incoming and another outgoing. It is important to size the
## limit accordingly in case of very large clusters.
##
## maxclients 10000
 
############################## MEMORY MANAGEMENT ################################
 
## Set a memory usage limit to the specified amount of bytes.
## When the memory limit is reached Redis will try to remove keys
## according to the eviction policy selected (see maxmemory-policy).
##
## If Redis can't remove keys according to the policy, or if the policy is
## set to 'noeviction', Redis will start to reply with errors to commands
## that would use more memory, like SET, LPUSH, and so on, and will continue
## to reply to read-only commands like GET.
##
## This option is usually useful when using Redis as an LRU or LFU cache, or to
## set a hard memory limit for an instance (using the 'noeviction' policy).
##
## WARNING: If you have replicas attached to an instance with maxmemory on,
## the size of the output buffers needed to feed the replicas are subtracted
## from the used memory count, so that network problems / resyncs will
## not trigger a loop where keys are evicted, and in turn the output
## buffer of replicas is full with DELs of keys evicted triggering the deletion
## of more keys, and so forth until the database is completely emptied.
##
## In short... if you have replicas attached it is suggested that you set a lower
## limit for maxmemory so that there is some free RAM on the system for replica
## output buffers (but this is not needed if the policy is 'noeviction').
##
## maxmemory <bytes>
 
## MAXMEMORY POLICY: how Redis will select what to remove when maxmemory
## is reached. You can select one from the following behaviors:
##
## volatile-lru -> Evict using approximated LRU, only keys with an expire set.
## allkeys-lru -> Evict any key using approximated LRU.
## volatile-lfu -> Evict using approximated LFU, only keys with an expire set.
## allkeys-lfu -> Evict any key using approximated LFU.
## volatile-random -> Remove a random key having an expire set.
## allkeys-random -> Remove a random key, any key.
## volatile-ttl -> Remove the key with the nearest expire time (minor TTL)
## noeviction -> Don't evict anything, just return an error on write operations.
##
## LRU means Least Recently Used
## LFU means Least Frequently Used
##
## Both LRU, LFU and volatile-ttl are implemented using approximated
## randomized algorithms.
##
## Note: with any of the above policies, Redis will return an error on write
##       operations, when there are no suitable keys for eviction.
##
##       At the date of writing these commands are: set setnx setex append
##       incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd
##       sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby
##       zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby
##       getset mset msetnx exec sort
##
## The default is:
##
## maxmemory-policy noeviction
 
## LRU, LFU and minimal TTL algorithms are not precise algorithms but approximated
## algorithms (in order to save memory), so you can tune it for speed or
## accuracy. For default Redis will check five keys and pick the one that was
## used less recently, you can change the sample size using the following
## configuration directive.
##
## The default of 5 produces good enough results. 10 Approximates very closely
## true LRU but costs more CPU. 3 is faster but not very accurate.
##
## maxmemory-samples 5
 
## Starting from Redis 5, by default a replica will ignore its maxmemory setting
## (unless it is promoted to master after a failover or manually). It means
## that the eviction of keys will be just handled by the master, sending the
## DEL commands to the replica as keys evict in the master side.
##
## This behavior ensures that masters and replicas stay consistent, and is usually
## what you want, however if your replica is writable, or you want the replica
## to have a different memory setting, and you are sure all the writes performed
## to the replica are idempotent, then you may change this default (but be sure
## to understand what you are doing).
##
## Note that since the replica by default does not evict, it may end using more
## memory than the one set via maxmemory (there are certain buffers that may
## be larger on the replica, or data structures may sometimes take more memory
## and so forth). So make sure you monitor your replicas and make sure they
## have enough memory to never hit a real out-of-memory condition before the
## master hits the configured maxmemory setting.
##
## replica-ignore-maxmemory yes
 
## Redis reclaims expired keys in two ways: upon access when those keys are
## found to be expired, and also in background, in what is called the
## "active expire key". The key space is slowly and interactively scanned
## looking for expired keys to reclaim, so that it is possible to free memory
## of keys that are expired and will never be accessed again in a short time.
##
## The default effort of the expire cycle will try to avoid having more than
## ten percent of expired keys still in memory, and will try to avoid consuming
## more than 25% of total memory and to add latency to the system. However
## it is possible to increase the expire "effort" that is normally set to
## "1", to a greater value, up to the value "10". At its maximum value the
## system will use more CPU, longer cycles (and technically may introduce
## more latency), and will tollerate less already expired keys still present
## in the system. It's a tradeoff betweeen memory, CPU and latecy.
##
## active-expire-effort 1
 
############################# LAZY FREEING ####################################
 
## Redis has two primitives to delete keys. One is called DEL and is a blocking
## deletion of the object. It means that the server stops processing new commands
## in order to reclaim all the memory associated with an object in a synchronous
## way. If the key deleted is associated with a small object, the time needed
## in order to execute the DEL command is very small and comparable to most other
## O(1) or O(log_N) commands in Redis. However if the key is associated with an
## aggregated value containing millions of elements, the server can block for
## a long time (even seconds) in order to complete the operation.
##
## For the above reasons Redis also offers non blocking deletion primitives
## such as UNLINK (non blocking DEL) and the ASYNC option of FLUSHALL and
## FLUSHDB commands, in order to reclaim memory in background. Those commands
## are executed in constant time. Another thread will incrementally free the
## object in the background as fast as possible.
##
## DEL, UNLINK and ASYNC option of FLUSHALL and FLUSHDB are user-controlled.
## It's up to the design of the application to understand when it is a good
## idea to use one or the other. However the Redis server sometimes has to
## delete keys or flush the whole database as a side effect of other operations.
## Specifically Redis deletes objects independently of a user call in the
## following scenarios:
##
## 1) On eviction, because of the maxmemory and maxmemory policy configurations,
##    in order to make room for new data, without going over the specified
##    memory limit.
## 2) Because of expire: when a key with an associated time to live (see the
##    EXPIRE command) must be deleted from memory.
## 3) Because of a side effect of a command that stores data on a key that may
##    already exist. For example the RENAME command may delete the old key
##    content when it is replaced with another one. Similarly SUNIONSTORE
##    or SORT with STORE option may delete existing keys. The SET command
##    itself removes any old content of the specified key in order to replace
##    it with the specified string.
## 4) During replication, when a replica performs a full resynchronization with
##    its master, the content of the whole database is removed in order to
##    load the RDB file just transferred.
##
## In all the above cases the default is to delete objects in a blocking way,
## like if DEL was called. However you can configure each case specifically
## in order to instead release memory in a non-blocking way like if UNLINK
## was called, using the following configuration directives.
 
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
 
## It is also possible, for the case when to replace the user code DEL calls
## with UNLINK calls is not easy, to modify the default behavior of the DEL
## command to act exactly like UNLINK, using the following configuration
## directive:
 
lazyfree-lazy-user-del no
 
 
 
## The name of the append only file (default: "appendonly.aof")
 
appendfilename "appendonly.aof"
 
## The fsync() call tells the Operating System to actually write data on disk
## instead of waiting for more data in the output buffer. Some OS will really flush
## data on disk, some other OS will just try to do it ASAP.
##
## Redis supports three different modes:
##
## no: don't fsync, just let the OS flush the data when it wants. Faster.
## always: fsync after every write to the append only log. Slow, Safest.
## everysec: fsync only one time every second. Compromise.
##
## The default is "everysec", as that's usually the right compromise between
## speed and data safety. It's up to you to understand if you can relax this to
## "no" that will let the operating system flush the output buffer when
## it wants, for better performances (but if you can live with the idea of
## some data loss consider the default persistence mode that's snapshotting),
## or on the contrary, use "always" that's very slow but a bit safer than
## everysec.
##
## More details please check the following article:
## http://antirez.com/post/redis-persistence-demystified.html
##
## If unsure, use "everysec".
 
## appendfsync always
appendfsync everysec
## appendfsync no
 
## When the AOF fsync policy is set to always or everysec, and a background
## saving process (a background save or AOF log background rewriting) is
## performing a lot of I/O against the disk, in some Linux configurations
## Redis may block too long on the fsync() call. Note that there is no fix for
## this currently, as even performing fsync in a different thread will block
## our synchronous write(2) call.
##
## In order to mitigate this problem it's possible to use the following option
## that will prevent fsync() from being called in the main process while a
## BGSAVE or BGREWRITEAOF is in progress.
##
## This means that while another child is saving, the durability of Redis is
## the same as "appendfsync none". In practical terms, this means that it is
## possible to lose up to 30 seconds of log in the worst scenario (with the
## default Linux settings).
##
## If you have latency problems turn this to "yes". Otherwise leave it as
## "no" that is the safest pick from the point of view of durability.
 
no-appendfsync-on-rewrite no
 
## Automatic rewrite of the append only file.
## Redis is able to automatically rewrite the log file implicitly calling
## BGREWRITEAOF when the AOF log size grows by the specified percentage.
##
## This is how it works: Redis remembers the size of the AOF file after the
## latest rewrite (if no rewrite has happened since the restart, the size of
## the AOF at startup is used).
##
## This base size is compared to the current size. If the current size is
## bigger than the specified percentage, the rewrite is triggered. Also
## you need to specify a minimal size for the AOF file to be rewritten, this
## is useful to avoid rewriting the AOF file even if the percentage increase
## is reached but it is still pretty small.
##
## Specify a percentage of zero in order to disable the automatic AOF
## rewrite feature.
 
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
 
## An AOF file may be found to be truncated at the end during the Redis
## startup process, when the AOF data gets loaded back into memory.
## This may happen when the system where Redis is running
## crashes, especially when an ext4 filesystem is mounted without the
## data=ordered option (however this can't happen when Redis itself
## crashes or aborts but the operating system still works correctly).
##
## Redis can either exit with an error when this happens, or load as much
## data as possible (the default now) and start if the AOF file is found
## to be truncated at the end. The following option controls this behavior.
##
## If aof-load-truncated is set to yes, a truncated AOF file is loaded and
## the Redis server starts emitting a log to inform the user of the event.
## Otherwise if the option is set to no, the server aborts with an error
## and refuses to start. When the option is set to no, the user requires
## to fix the AOF file using the "redis-check-aof" utility before to restart
## the server.
##
## Note that if the AOF file will be found to be corrupted in the middle
## the server will still exit with an error. This option only applies when
## Redis will try to read more data from the AOF file but not enough bytes
## will be found.
aof-load-truncated yes
 
## When rewriting the AOF file, Redis is able to use an RDB preamble in the
## AOF file for faster rewrites and recoveries. When this option is turned
## on the rewritten AOF file is composed of two different stanzas:
##
##   [RDB file][AOF tail]
##
## When loading Redis recognizes that the AOF file starts with the "REDIS"
## string and loads the prefixed RDB file, and continues loading the AOF
## tail.
aof-use-rdb-preamble yes
 
################################ LUA SCRIPTING  ###############################
 
## Max execution time of a Lua script in milliseconds.
##
## If the maximum execution time is reached Redis will log that a script is
## still in execution after the maximum allowed time and will start to
## reply to queries with an error.
##
## When a long running script exceeds the maximum execution time only the
## SCRIPT KILL and SHUTDOWN NOSAVE commands are available. The first can be
## used to stop a script that did not yet called write commands. The second
## is the only way to shut down the server in the case a write command was
## already issued by the script but the user doesn't want to wait for the natural
## termination of the script.
##
## Set it to 0 or a negative value for unlimited execution without warnings.
lua-time-limit 5000
 
################################ REDIS CLUSTER  ###############################
 
## Normal Redis instances can't be part of a Redis Cluster; only nodes that are
## started as cluster nodes can. In order to start a Redis instance as a
## cluster node enable the cluster support uncommenting the following:
##
## cluster-enabled yes
 
## Every cluster node has a cluster configuration file. This file is not
## intended to be edited by hand. It is created and updated by Redis nodes.
## Every Redis Cluster node requires a different cluster configuration file.
## Make sure that instances running in the same system do not have
## overlapping cluster configuration file names.
##
## cluster-config-file nodes-6379.conf
 
## Cluster node timeout is the amount of milliseconds a node must be unreachable
## for it to be considered in failure state.
## Most other internal time limits are multiple of the node timeout.
##
## cluster-node-timeout 15000
 
## A replica of a failing master will avoid to start a failover if its data
## looks too old.
##
## There is no simple way for a replica to actually have an exact measure of
## its "data age", so the following two checks are performed:
##
## 1) If there are multiple replicas able to failover, they exchange messages
##    in order to try to give an advantage to the replica with the best
##    replication offset (more data from the master processed).
##    Replicas will try to get their rank by offset, and apply to the start
##    of the failover a delay proportional to their rank.
##
## 2) Every single replica computes the time of the last interaction with
##    its master. This can be the last ping or command received (if the master
##    is still in the "connected" state), or the time that elapsed since the
##    disconnection with the master (if the replication link is currently down).
##    If the last interaction is too old, the replica will not try to failover
##    at all.
##
## The point "2" can be tuned by user. Specifically a replica will not perform
## the failover if, since the last interaction with the master, the time
## elapsed is greater than:
##
##   (node-timeout * replica-validity-factor) + repl-ping-replica-period
##
## So for example if node-timeout is 30 seconds, and the replica-validity-factor
## is 10, and assuming a default repl-ping-replica-period of 10 seconds, the
## replica will not try to failover if it was not able to talk with the master
## for longer than 310 seconds.
##
## A large replica-validity-factor may allow replicas with too old data to failover
## a master, while a too small value may prevent the cluster from being able to
## elect a replica at all.
##
## For maximum availability, it is possible to set the replica-validity-factor
## to a value of 0, which means, that replicas will always try to failover the
## master regardless of the last time they interacted with the master.
## (However they'll always try to apply a delay proportional to their
## offset rank).
##
## Zero is the only value able to guarantee that when all the partitions heal
## the cluster will always be able to continue.
##
## cluster-replica-validity-factor 10
 
## Cluster replicas are able to migrate to orphaned masters, that are masters
## that are left without working replicas. This improves the cluster ability
## to resist to failures as otherwise an orphaned master can't be failed over
## in case of failure if it has no working replicas.
##
## Replicas migrate to orphaned masters only if there are still at least a
## given number of other working replicas for their old master. This number
## is the "migration barrier". A migration barrier of 1 means that a replica
## will migrate only if there is at least 1 other working replica for its master
## and so forth. It usually reflects the number of replicas you want for every
## master in your cluster.
##
## Default is 1 (replicas migrate only if their masters remain with at least
## one replica). To disable migration just set it to a very large value.
## A value of 0 can be set but is useful only for debugging and dangerous
## in production.
##
## cluster-migration-barrier 1
 
## By default Redis Cluster nodes stop accepting queries if they detect there
## is at least an hash slot uncovered (no available node is serving it).
## This way if the cluster is partially down (for example a range of hash slots
## are no longer covered) all the cluster becomes, eventually, unavailable.
## It automatically returns available as soon as all the slots are covered again.
##
## However sometimes you want the subset of the cluster which is working,
## to continue to accept queries for the part of the key space that is still
## covered. In order to do so, just set the cluster-require-full-coverage
## option to no.
##
## cluster-require-full-coverage yes
 
## This option, when set to yes, prevents replicas from trying to failover its
## master during master failures. However the master can still perform a
## manual failover, if forced to do so.
##
## This is useful in different scenarios, especially in the case of multiple
## data center operations, where we want one side to never be promoted if not
## in the case of a total DC failure.
##
## cluster-replica-no-failover no
 
## This option, when set to yes, allows nodes to serve read traffic while the
## the cluster is in a down state, as long as it believes it owns the slots. 
##
## This is useful for two cases.  The first case is for when an application 
## doesn't require consistency of data during node failures or network partitions.
## One example of this is a cache, where as long as the node has the data it
## should be able to serve it. 
##
## The second use case is for configurations that don't meet the recommended  
## three shards but want to enable cluster mode and scale later. A 
## master outage in a 1 or 2 shard configuration causes a read/write outage to the
## entire cluster without this option set, with it set there is only a write outage.
## Without a quorum of masters, slot ownership will not change automatically. 
##
## cluster-allow-reads-when-down no
 
## In order to setup your cluster make sure to read the documentation
## available at http://redis.io web site.
 
########################## CLUSTER DOCKER/NAT support  ########################
 
## In certain deployments, Redis Cluster nodes address discovery fails, because
## addresses are NAT-ted or because ports are forwarded (the typical case is
## Docker and other containers).
##
## In order to make Redis Cluster working in such environments, a static
## configuration where each node knows its public address is needed. The
## following two options are used for this scope, and are:
##
## * cluster-announce-ip
## * cluster-announce-port
## * cluster-announce-bus-port
##
## Each instruct the node about its address, client port, and cluster message
## bus port. The information is then published in the header of the bus packets
## so that other nodes will be able to correctly map the address of the node
## publishing the information.
##
## If the above options are not used, the normal Redis Cluster auto-detection
## will be used instead.
##
## Note that when remapped, the bus port may not be at the fixed offset of
## clients port + 10000, so you can specify any port and bus-port depending
## on how they get remapped. If the bus-port is not set, a fixed offset of
## 10000 will be used as usually.
##
## Example:
##
## cluster-announce-ip 10.1.1.5
## cluster-announce-port 6379
## cluster-announce-bus-port 6380
 
################################## SLOW LOG ###################################
 
## The Redis Slow Log is a system to log queries that exceeded a specified
## execution time. The execution time does not include the I/O operations
## like talking with the client, sending the reply and so forth,
## but just the time needed to actually execute the command (this is the only
## stage of command execution where the thread is blocked and can not serve
## other requests in the meantime).
##
## You can configure the slow log with two parameters: one tells Redis
## what is the execution time, in microseconds, to exceed in order for the
## command to get logged, and the other parameter is the length of the
## slow log. When a new command is logged the oldest one is removed from the
## queue of logged commands.
 
## The following time is expressed in microseconds, so 1000000 is equivalent
## to one second. Note that a negative number disables the slow log, while
## a value of zero forces the logging of every command.
slowlog-log-slower-than 10000
 
## There is no limit to this length. Just be aware that it will consume memory.
## You can reclaim memory used by the slow log with SLOWLOG RESET.
slowlog-max-len 128
 
 
## By default latency monitoring is disabled since it is mostly not needed
## if you don't have latency issues, and collecting data has a performance
## impact, that while very small, can be measured under big load. Latency
## monitoring can easily be enabled at runtime using the command
## "CONFIG SET latency-monitor-threshold <milliseconds>" if needed.
latency-monitor-threshold 0
 
##  By default all notifications are disabled because most users don't need
##  this feature and the feature has some overhead. Note that if you don't
##  specify at least one of K or E, no events will be delivered.
notify-keyspace-events ""
 
 
 
############################### ADVANCED CONFIG ###############################
 
## Hashes are encoded using a memory efficient data structure when they have a
## small number of entries, and the biggest entry does not exceed a given
## threshold. These thresholds can be configured using the following directives.
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
 
## Lists are also encoded in a special way to save a lot of space.
## The number of entries allowed per internal list node can be specified
## as a fixed maximum size or a maximum number of elements.
## For a fixed maximum size, use -5 through -1, meaning:
## -5: max size: 64 Kb  <-- not recommended for normal workloads
## -4: max size: 32 Kb  <-- not recommended
## -3: max size: 16 Kb  <-- probably not recommended
## -2: max size: 8 Kb   <-- good
## -1: max size: 4 Kb   <-- good
## Positive numbers mean store up to _exactly_ that number of elements
## per list node.
## The highest performing option is usually -2 (8 Kb size) or -1 (4 Kb size),
## but if your use case is unique, adjust the settings as necessary.
list-max-ziplist-size -2
 
## Lists may also be compressed.
## Compress depth is the number of quicklist ziplist nodes from *each* side of
## the list to *exclude* from compression.  The head and tail of the list
## are always uncompressed for fast push/pop operations.  Settings are:
## 0: disable all list compression
## 1: depth 1 means "don't start compressing until after 1 node into the list,
##    going from either the head or tail"
##    So: [head]->node->node->...->node->[tail]
##    [head], [tail] will always be uncompressed; inner nodes will compress.
## 2: [head]->[next]->node->node->...->node->[prev]->[tail]
##    2 here means: don't compress head or head->next or tail->prev or tail,
##    but compress all nodes between them.
## 3: [head]->[next]->[next]->node->node->...->node->[prev]->[prev]->[tail]
## etc.
list-compress-depth 0
 
## Sets have a special encoding in just one case: when a set is composed
## of just strings that happen to be integers in radix 10 in the range
## of 64 bit signed integers.
## The following configuration setting sets the limit in the size of the
## set in order to use this special memory saving encoding.
set-max-intset-entries 512
 
## Similarly to hashes and lists, sorted sets are also specially encoded in
## order to save a lot of space. This encoding is only used when the length and
## elements of a sorted set are below the following limits:
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
 
## The suggested value is ~ 3000 in order to have the benefits of
## the space efficient encoding without slowing down too much PFADD,
## which is O(N) with the sparse encoding. The value can be raised to
## ~ 10000 when CPU is not a concern, but space is, and the data set is
## composed of many HyperLogLogs with cardinality in the 0 - 15000 range.
hll-sparse-max-bytes 3000
 
## Streams macro node max size / items. The stream data structure is a radix
## tree of big nodes that encode multiple items inside. Using this configuration
## it is possible to configure how big a single node can be in bytes, and the
## maximum number of items it may contain before switching to a new node when
## appending new stream entries. If any of the following settings are set to
## zero, the limit is ignored, so for instance it is possible to set just a
## max entires limit by setting max-bytes to 0 and max-entries to the desired
## value.
stream-node-max-bytes 4096
stream-node-max-entries 100
 
 
## use "activerehashing yes" if you don't have such hard requirements but
## want to free memory asap when possible.
activerehashing yes
 
 
## Instead there is a default limit for pubsub and replica clients, since
## subscribers and replicas receive data in a push fashion.
##
## Both the hard or the soft limit can be disabled by setting them to zero.
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
 
## Client query buffers accumulate new commands. They are limited to a fixed
## amount by default in order to avoid that a protocol desynchronization (for
## instance due to a bug in the client) will lead to unbound memory usage in
## the query buffer. However you can configure it here if you have very special
## needs, such us huge multi/exec requests or alike.
##
## client-query-buffer-limit 1gb
 
## In the Redis protocol, bulk requests, that are, elements representing single
## strings, are normally limited ot 512 mb. However you can change this limit
## here.
##
## proto-max-bulk-len 512mb
 
 
## The range is between 1 and 500, however a value over 100 is usually not
## a good idea. Most users should use the default of 10 and raise this up to
## 100 only in environments where very low latency is required.
hz 10
 
 
## When dynamic HZ is enabled, the actual configured HZ will be used
## as a baseline, but multiples of the configured HZ value will be actually
## used as needed once more clients are connected. In this way an idle
## instance will use very little CPU time while a busy instance will be
## more responsive.
dynamic-hz yes
 
## When a child rewrites the AOF file, if the following option is enabled
## the file will be fsync-ed every 32 MB of data generated. This is useful
## in order to commit the file to the disk more incrementally and avoid
## big latency spikes.
aof-rewrite-incremental-fsync yes
 
## When redis saves RDB file, if the following option is enabled
## the file will be fsync-ed every 32 MB of data generated. This is useful
## in order to commit the file to the disk more incrementally and avoid
## big latency spikes.
rdb-save-incremental-fsync yes
 
 
 
## Jemalloc background thread for purging will be enabled by default
jemalloc-bg-thread yes
```



#### 6.3.2 启动实例

因为前面设置的有redis认证密码，所以输入auth 密码即可完成认证

```
[root@VM-16-8-centos ~]## docker run -p 6379:6379 --name redis2 --privileged=true -v /app/redis/redis.conf:/etc/redis/redis.conf  -v /app/data:/data -d redis:6.0.8 redis-server /etc/redis/redis.conf --appendonly yes
561618b1a13521e7119536ed3cdaf3e4344c2962d1c968acc01a60cc802af7d0

[root@VM-16-8-centos ~]## docker ps
CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS                    NAMES
561618b1a135   redis:6.0.8   "docker-entrypoint.s…"   45 minutes ago   Up 45 minutes   0.0.0.0:6379->6379/tcp   redis2

[root@VM-16-8-centos ~]## docker exec -it 561618b1a135 bash
root@561618b1a135:/data## redis-cli

127.0.0.1:6379> auth redis123
OK

127.0.0.1:6379> set k1 v1
OK

127.0.0.1:6379> get k1
"v1"

127.0.0.1:6379> 
```

### 6.4 Nginx

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
cd /mydata/nginx/&&mv nginx conf
```

- 终止并删除容器：

```sh
docker stop nginx
docker rm nginx
```

- 使用如下命令启动Nginx服务：

```sh
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx  \
-v /mydata/nginx/conf:/etc/nginx \
-d nginx:1.22
```

## 七、安装高级篇

### 6.1 Mysq主从

```shell
1.新建主服务器容器实例3307
docker run -p 3307:3306 --name mysql-master \
-v /mydata/mysql-master/log:/var/log/mysql \
-v /mydata/mysql-master/data:/var/lib/mysql \
-v /mydata/mysql-master/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root  \
-d mysql:5.7



2.进入/mydata/mysql-master/conf目录下新建my.cnf
[root@VM-16-8-centos conf]## pwd
/mydata/mysql-master/conf
[root@VM-16-8-centos conf]## cat my.cnf 
[mysqld]
### 设置server_id，同一局域网中需要唯一
server_id=101 
### 指定不需要同步的数据库名称
binlog-ignore-db=mysql  
### 开启二进制日志功能
log-bin=mall-mysql-bin  
### 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M  
### 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=mixed  
### 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7  
### 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
### 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062


3.修改完配置后重启master实例
[root@VM-16-8-centos conf]## docker restart mysql-master
mysql-master
[root@VM-16-8-centos conf]## docker ps
CONTAINER ID   IMAGE         COMMAND                  CREATED         STATUS         PORTS                               NAMES
789a4d55e367   mysql:5.7     "docker-entrypoint.s…"   6 minutes ago   Up 6 seconds   33060/tcp, 0.0.0.0:3307->3306/tcp   mysql-master
561618b1a135   redis:6.0.8   "docker-entrypoint.s…"   9 hours ago     Up 9 hours     0.0.0.0:6379->6379/tcp              redis2

4.进入mysql-master容器
docker exec -it mysql-master /bin/bash
mysql -uroot -proot

bug记录
mysql> CREATE USER 'slave'@'%' IDENTIFIED BY '123456';
ERROR 1396 (HY000): Operation CREATE USER failed for 'slave'@'%'
查看后数据库不存在，回忆了一下操作，手动删除过slave这用户，可能是这个操作引起的，现在执行命令重新删除一下
drop user 'slave'@'%';

5.master容器实例内创建数据同步用户
CREATE USER 'slave'@'%' IDENTIFIED BY '123456';
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';

6.新建从服务器容器实例3308
docker run -p 3308:3306 --name mysql-slave \
-v /mydata/mysql-slave/log:/var/log/mysql \
-v /mydata/mysql-slave/data:/var/lib/mysql \
-v /mydata/mysql-slave/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root  \
-d mysql:5.7

7.进入/mydata/mysql-slave/conf目录下新建my.cnf
cd /mydata/mysql-slave/conf
vim my.cnf
[mysqld]
### 设置server_id，同一局域网中需要唯一
server_id=102
### 指定不需要同步的数据库名称
binlog-ignore-db=mysql  
### 开启二进制日志功能，以备Slave作为其它数据库实例的Master时使用
log-bin=mall-mysql-slave1-bin  
### 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M  
### 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=mixed  
### 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7  
### 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
### 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062  
### relay_log配置中继日志
relay_log=mall-mysql-relay-bin  
### log_slave_updates表示slave将复制事件写进自己的二进制日志
log_slave_updates=1  
### slave设置为只读（具有super权限的用户除外）
read_only=1

8.修改完配置后重启slave实例
docker restart mysql-slave

9.在主数据库中查看主从同步状态
docker exec -it mysql-master /bin/bash
mysql -uroot -proot
show master status;

10.进入mysql-slave容器
docker exec -it mysql-slave /bin/bash
mysql -uroot -proot

11.在从数据库中配置主从复制
change master to master_host='124.221.228.148', master_user='slave', master_password='123456', master_port=3307, master_log_file='mall-mysql-bin.000001', master_log_pos=617, master_connect_retry=30;

12.在从数据库中查看主从同步状态
show slave status \G;
```







![image-20220404212759583](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220404212759583.png)



```
[root@VM-16-8-centos myfile]## docker run -it add55e71a136 bash
[root@cf6ad357f282 local]## pwd
/usr/local
[root@cf6ad357f282 local]## ifconfig 
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.2  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:02  txqueuelen 0  (Ethernet)
        RX packets 8  bytes 656 (656.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

[root@cf6ad357f282 local]## java -version
java version "1.8.0_77"
Java(TM) SE Runtime Environment (build 1.8.0_77-b03)
Java HotSpot(TM) 64-Bit Server VM (build 25.77-b03, mixed mode)
```



## 八、DockerFile

### 8.1 是什么？

**Dockerfile是用来构建Docker镜像的文本文件，是由==一条条构建镜像所需的指令和参数构成的脚本==。**

[官网](https://docs.docker.com/engine/reference/builder/)



### 8.2 DockerFile构建过程解析

构建三步骤

1. 编写Dockerfile文件
2. docker build命令构建镜像
3. docker run依镜像运行容器实例





#### 8.2.1 Dockerfile内容基础知识

1：每条保留字指令都**必须为大写字母**且后面要跟随至少一个参数

2：指令按照从上到下，顺序执行

3：##表示注释

4：每条指令都会创建一个新的镜像层并对镜像进行提交



#### 8.2.2 Docker执行Dockerfile的大致流程

1. docker从基础镜像运行一个容器
2. 执行一条指令并对容器做出修改
3. 执行类似docker commit的操作提交一个新的镜像层
4. docker基于刚提交的镜像运行一个新容器
5. 执行dockerfile中的下一条指令直到所有指令都执行完毕



#### 8.2.3 小总结

从应用软件的角度来看，Dockerfile、Docker镜像与Docker容器分别代表软件的三个不同阶段，
*  Dockerfile是软件的原材料
*  Docker镜像是软件的交付品
*  Docker容器则可以认为是软件镜像的运行态，也即依照镜像运行的容器实例
Dockerfile面向开发，Docker镜像成为交付标准，Docker容器则涉及部署与运维，三者缺一不可，合力充当Docker体系的基石。

![image-20220405103302981](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405103302981.png)

1 Dockerfile，需要定义一个Dockerfile，Dockerfile定义了进程需要的一切东西。Dockerfile涉及的内容包括执行代码或者是文件、环境变量、依赖包、运行时环境、动态链接库、操作系统的发行版、服务进程和内核进程(当应用进程需要和系统服务和内核进程打交道，这时需要考虑如何设计namespace的权限控制)等等;

2 Docker镜像，在用Dockerfile定义一个文件之后，docker build时会产生一个Docker镜像，当运行 Docker镜像时会真正开始提供服务;

3 Docker容器，容器是直接提供服务的。



### 8.3 Dockerfile常用保留字指令

- **FROM**  基础镜像，当前新镜像是基于哪个镜像的，指定一个已经存在的镜像作为模板，第一条必须是from

```
- **MAINTAINER ** 这条命令主要是指定维护者信息，方便他人寻找作者 指令后面的内容其实没有规定写什么， 只要可以联系上作者即可，一般使用邮箱地址 格式为 MAINTAINER Name <Email>。注意：这个标签已经弃用，但现在还有很多 Dockerfi 使用这个标签，所以短时间内不会删除 现在推荐使用更灵活的 LABEL 命令，详见 面的讲解。
```


- **EXPOSE**   当前容器对外暴露出的端口



- **WORKDIR**    指定在创建容器后，终端默认登陆的进来工作目录，一个落脚点

- **USER**    指定该镜像以什么样的用户去执行，如果都不指定，默认是root

- **ENV**    用来在构建镜像过程中设置环境变量

- ENV MY_PATH /usr/mytest
  这个环境变量可以在后续的任何RUN指令中使用，这就如同在命令前面指定了环境变量前缀一样；
  也可以在其它指令中直接使用这些环境变量，

  比如：WORKDIR $MY_PATH

  

- **ADD**    将宿主机目录下的文件拷贝进镜像且会自动处理URL和解压tar压缩包

- **VOLUME**    容器数据卷，用于数据保存和持久化工作



#### 8.3.1 RUN

 ![image-20220405104013642](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405104013642.png)

shell格式： RUN yum -y install vim

到 shell 格式中，可以使用反斜杠将单个 RUN 命令跨到下一行

RUN echo ” Hello ”&& \ 

​	 echo "World”\ 

 	&& echo ” Docker”



exec格式：RUN ["可执行文件"，"参数1","参数2"]	

例：RUN ["./test.php","dev","offline"] 等价于 ./test.php dev offline

以这种格式运行程序，可以免除运行 n/sh 的消耗 这种格式是用 Ison 格式将程序名 与所需参 数组成一个字符串数组，所以如果参数中有引号等特殊字符，贝lj 需要进行转义



==RUN是在 docker build时运行==



- **COPY**  类似ADD，拷贝文件和目录到镜像中。将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的 <目标路径> 位置

![image-20220405104400946](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405104400946.png)

#### 8.3.2 CMD

![image-20220405104724204](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405104724204.png)

==CMD是在docker run时运行==

==CMD指令可以有多条，但只有最后一个生效，CMD会被docker run后面的参数替换==

![image-20220405105228712](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405105228712.png)

上面这个实例什么意思呢，官网编写的关于tomcat的Dockerfile文件的最后一行是运行catalina.sh脚本

![image-20220405105643278](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405105643278.png)

**能访问tomcat**

加上/bin/bash

则不能访问tomcat





```shell
FROM ubuntu  

CMD [” echo ” , ” Hello Ubuntu” ] 
```

docker build -t user/test .

![image-20220405113325401](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405113325401.png)





docker run -it imageId echo "Hello Docker"这个方式启动容器时，echo "HelloDocker”命令会覆盖原有的CMD命令。也就是说，CMD 命令可以通过docker run命令覆盖，这一点也是CMD和ENTRYPOINT指令的最大区别。

![image-20220405105139911](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405105139911.png)



#### 8.3.3 ENTRYPOINT

也是用来指定一个容器启动时要运行的命令

类似于 CMD 指令，但是ENTRYPOINT不会被docker run后面的命令覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序

FROM ubuntu  

ENTRYPOINT [ ” echo” ] 

![image-20220405121627847](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405121627847.png)

#### 8.3.4 小总结

![image-20220405121706206](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405121706206.png)



### 8.4 Dockerfile实战

#### Redis容器化

（1）基础镜像：centos:centos7.5.1804；

（2）作者：Chinaskill；

（3）修改配置文件中的bind 127.0.0.1为bind 0.0.0.0；

（4）设置Redis免密，并关闭保护模式；

（5）开放端口：6379；

（6）设置服务开机自启。

```dockerfile
[root@master redis]## cat Dockerfile 
FROM centos:centos7.5.1804
MAINTAINER Chinaskill
RUN rm -rf /etc/yum.repos.d/*
ADD ftp.repo /etc/yum.repos.d/ftp.repo
RUN yum clean all
RUN yum list
RUN yum install -y redis
RUN sed -i 's/bind 127.0.0.1/bind 0.0.0.0/g' /etc/redis.conf
RUN sed -i 's/protected-mode yes/protected-mode no/g' /etc/redis.conf
RUN sed -i 's/daemonize no/daemonize yes/g' /etc/redis.conf
EXPOSE 6379
ENTRYPOINT ["/usr/bin/redis-server","/etc/redis.conf"]
```

#### 容器化MariaDB

（1）基础镜像：centos:centos7.5.1804；

（2）作者：Chinaskill；

（3）设置数据库密码：123456；

（4）创建数据库gpmall并导入数据库文件gpmall.sql；

（5）设置字符编码：UTF-8；

（6）开放端口：3306；

（7）设置服务开机自启。

```dockerfile
[root@master redis]## cd /root/mariadb/
[root@master mariadb]## ls
Dockerfile ftp.repo gpmall.sql init.sh
[root@master mariadb]## cat Dockerfile 
FROM centos:centos7.5.1804
MAINTAINER Chinaskill
RUN rm -rf /etc/yum.repos.d/*
ADD ftp.repo /etc/yum.repos.d/
RUN yum install -y mariadb-server
ADD init.sh /root/init.sh
RUN chmod +x /root/init.sh
ADD gpmall.sql /root/gpmall.sql
RUN /root/init.sh
ENV C.LANG UTF-8
EXPOSE 3306
CMD ["mysqld_safe"]
```

#### 容器化Zookeeper

（1）基础镜像：centos:centos7.5.1804；

（2）作者：Chinaskill；

（3）开放端口：2181；

（4）设置服务开机自启。

[root@master zookeeper]## ls

Dockerfile ftp.repo zookeeper-3.4.14.tar.gz

```dockerfile
[root@master zookeeper]## cat Dockerfile 
FROM centos:centos7.5.1804
MAINTAINER Chinaskill
RUN rm -rvf /etc/yum.repos.d/*
COPY ftp.repo /etc/yum.repos.d/local.repo
RUN yum -y install java-1.8.0
ADD zookeeper-3.4.14.tar.gz /usr/local
ENV ZOOKEEPER_HOME /usr/local/zookeeper-3.4.14
ENV PATH $PATH:$JAVA_HOME/bin:$JRE_HOME/bin:$ZOOKEEPER_HOME/bin
RUN cp $ZOOKEEPER_HOME/conf/zoo_sample.cfg $ZOOKEEPER_HOME/conf/zoo.cfg
EXPOSE 2181
CMD $ZOOKEEPER_HOME/bin/zkServer.sh start-foreground
```

#### 虚悬镜像
```
仓库名、标签都是<none>的镜像，俗称dangling image
```

==虚悬镜像的由来==

通常出现这种情况，是因为构建了一个新镜像，然后为该镜像打了一个已经存在的标签。接着Docker会移除旧镜像上面的标签，将该标签标在新的镜像之上。例如，首先基于alpine:3.4构建一个新的镜像，并打上`dodge:challenger`标签。然后更新`Dockerfile`，将`alpine:3.4`替换为`alpine:3.5`，并且再次执行`docker image build`命令。该命令会构建一个新的镜像，并且标签为`dodge:challenger`，同时移除了旧镜像上面对应的标签，旧镜像就变成了悬虚镜像

```
查询显示虚悬镜像
docker images -f dangling=true
删除虚悬镜像
docker rmi $(docker images -q -f dangling=true)
```

## 九、微服务实战

**1.修改之前的SpringBoot项目yml中数据库配置，改为容器化的mysql地址**

![image-20220406083234936](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406083234936.png)

**2.根据实体类新建数据库**

```sql
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    id int(20) NOT NULL COMMENT '主键ID' auto_increment,
    name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
    age INT(11) NULL DEFAULT NULL COMMENT '年龄',
    email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (id)
);

DELETE FROM user;
INSERT INTO user (id, name, age, email) VALUES
(1, 'Banana', 18, 'test1@pyy.com'),
(2, 'Jack', 20, 'test2@pyy.com'),
(3, 'Tom', 28, 'test3@pyy.com'),
(4, 'Milk', 21, 'test4@pyy.com'),
(6,'zs@qq',10,'asd'),
(5, 'Apple', 24, 'test5@pyy.com');
```

**3.项目打包**

![image-20220405123335304](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220405123335304.png)

**4. 容器化myqsl**

 docker run -d -p 3306:3306 --privileged=true -v /pyy/mysql/log:/var/log/mysql -v /pyy/mysql/data:/var/lib/mysql -v /pyy/mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=a  --name mysql mysql:5.7

![image-20220406083505545](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406083505545.png)

**5. 构建镜像**

[root@VM-16-8-centos springboot_test]## cat Dockerfile 
FROM java:8
MAINTAINER pyy
VOLUME /tmp
ADD sys-admin-0.0.1-SNAPSHOT.jar pyy_docker.jar
RUN bash -c 'touch /pyy_docker.jar'
ENTRYPOINT ["java","-jar","/pyy_docker.jar"]
EXPOSE 8080



docker build -t pyy_docker:1.0 .

**6.运行容器**

 docker run -d -p 8080:8080 pyy_docker:1.6

![image-20220406084507695](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406084507695.png)



**7.测试**

![image-20220406084548796](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406084548796.png)





## 十、网络模式

### 10.1 简介

docker不启动，默认网络情况

- ens33
- lo
- virbr0



docker启动后，网络情况

```shell
[root@VM-16-8-centos springboot_test]## docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
2c74a4b5d76a   bridge    bridge    local
dd3008378058   host      host      local
9ebd6b25e4c3   none      null      local
```



**常用命令**

查看网络

docker network ls



查看网络源数据

docker network inspect  XXX网络名字



删除网络

docker network rm XXX网络名字



**案例**

```shell
[root@VM-16-8-centos springboot_test]## docker network create test_docker_network
7a7c98e51c6effc0498579ec3cf9bfe6b0a9052ae8c3996781f61389b2529165
[root@VM-16-8-centos springboot_test]## docker network ls
NETWORK ID     NAME                  DRIVER    SCOPE
2c74a4b5d76a   bridge                bridge    local
dd3008378058   host                  host      local
9ebd6b25e4c3   none                  null      local
7a7c98e51c6e   test_docker_network   bridge    local
[root@VM-16-8-centos springboot_test]## docker network rm test_docker_network
test_docker_network
[root@VM-16-8-centos springboot_test]## docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
2c74a4b5d76a   bridge    bridge    local
dd3008378058   host      host      local
9ebd6b25e4c3   none      null      local
```





**网络模式能干嘛**

容器间的互联和通信以及端口映射

容器IP变动时候可以通过服务名直接网络通信而不受到影响



**小总结**

![image-20220406090336141](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406090336141.png)

- bridge模式：使用--network  bridge指定，默认使用docker0
- host模式：使用--network host指定
- none模式：使用--network none指定
- container模式：使用--network container:NAME或者容器ID指定





==容器实例内默认网络IP生产规则==

运行centos1和centos2，查看它们的ip分别为172.16.0.2，172.16.0.3。那么当centos2挂掉的话，在新建容器centos3，那么它的ip就会变为172.16.0.3





### 10.2 bridge

> 很像交换机

Docker 服务默认会创建一个 docker0 网桥（其上有一个 docker0 内部接口），该桥接网络的名称为docker0，==它在内核层连通了其他的物理或虚拟网卡，这就将所有容器和本地主机都放到同一个物理网络。==Docker 默认指定了 docker0 接口 的 IP 地址和子网掩码，让主机和容器之间可以通过网桥相互通信。



1 Docker使用Linux桥接，在宿主机虚拟一个Docker容器网桥(docker0)，Docker启动一个容器时会根据Docker网桥的网段分配给容器一个IP地址，称为Container-IP，同时Docker网桥是每个容器的默认网关。因为在同一宿主机内的容器都接入同一个网桥，这样容器之间就能够通过容器的Container-IP直接通信。

2 ==docker run 的时候，没有指定network的话默认使用的网桥模式就是bridge=，使用的就是docker0==。在宿主机ifconfig,就可以看到docker0和自己create的network(后面讲)eth0，eth1，eth2……代表网卡一，网卡二，网卡三……，lo代表127.0.0.1，即localhost，inet addr用来表示网卡的IP地址

3 网桥docker0创建一对对等虚拟设备接口一个叫==veth，另一个叫eth0，成对匹配==。
   3.1 整个宿主机的网桥模式都是docker0，类似一个交换机有一堆接口，每个接口叫veth，在本地主机和容器内分别创建一个虚拟接口，并让他们彼此联通（这样一对接口叫veth pair）；
   3.2 每个容器实例内部也有一块网卡，每个接口叫eth0；
   3.3 docker0上面的每个veth匹配某个容器实例内部的eth0，两两配对，一一匹配。
 通过上述，将宿主机上的所有容器都连接到这个内部网络上，两个容器在同一个网络下,会从这个网关下各自拿到分配的ip，此时两个容器的网络是互通的。

![image-20220406091532965](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406091532965.png)



![image-20220406091916322](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406091916322.png)

![image-20220406092125307](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406092125307.png)





### 10.3 host

直接使用宿主机的 IP 地址与外界进行通信，不再需要额外进行NAT 转换。

容器将不会获得一个独立的Network Namespace， 而是和宿主机共用一个Network Namespace。==容器将不会虚拟出自己的网卡而是使用宿主机的IP和端口。==



错误的写法：

docker run -d -p 8083:8080 --network host --name tomcat83 pyy/tomcat8-jdk8



正确的写法

docker run -d --network host --name tomcat83 pyy/tomcat8-jdk8

![image-20220406092343717](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406092343717.png)

http://宿主机IP:8080/

在CentOS里面用默认的火狐浏览器访问容器内的tomcat83看到访问成功，因为此时容器的IP借用主机的，
所以容器共享宿主机网络IP，这样的好处是外部主机与容器可以直接通信。



### 10.4 none

> 禁用网络功能，只有lo标识(就是127.0.0.1表示本地回环)

在none模式下，并不为Docker容器进行任何网络配置。 
也就是说，这个Docker容器没有网卡、IP、路由等信息，只有一个lo
需要我们自己为Docker容器添加网卡、配置IP等。



![image-20220406092902863](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406092902863.png)



### 10.5 container

新建的容器和已经存在的一个容器共享一个网络ip配置而不是和宿主机共享。新创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围等。同样，两个容器除了网络方面，其他的如文件系统、进程列表等还是隔离的.

![image-20220406093118037](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406093118037.png)



docker run -d -p 8086:8080 --network container:tomcat85 --name tomcat86 billygoo/tomcat8-jdk8

![image-20220406093839711](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406093839711.png)



关闭alpine1，在看alpine2![image-20220406094014970](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406094014970.png)



### 10.6 自定义网络

![image-20220406094316737](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220406094316737.png)



## 十一、容器编排

### 11.1 简介

Compose 是 Docker 公司推出的一个工具软件，可以管理多个 Docker 容器组成一个应用。你需要定义一个 YAML 格式的配置文件docker-compose.yml，写好多个容器之间的调用关系。然后，只要一个命令，就能同时启动/关闭这些容器



**能干嘛**

 docker建议我们每一个容器中只运行一个服务,因为docker容器本身占用资源极少,所以最好是将每个服务单独的分割开来但是这样我们又面临了一个问题？

如果我需要同时部署好多个服务,难道要每个服务单独写Dockerfile然后在构建镜像,构建容器,这样累都累死了,所以docker官方给我们提供了docker-compose多服务部署的工具

例如要实现一个Web微服务项目，除了Web服务容器本身，往往还需要再加上后端的数据库mysql服务容器，redis服务器，注册中心eureka，甚至还包括负载均衡容器等等。。。。。。

Compose允许用户通过一个单独的**docker-compose.yml**模板文件（YAML 格式）来定义一组相关联的**应用容器为一个项目（project）。**

可以很容易地用一个配置文件定义一个多容器的应用，然后使用一条指令安装这个应用的所有依赖，完成构建。Docker-Compose 解决了容器与容器之间如何管理编排的问题。



**安装**

```shell
[root@VM-16-8-centos springboot_test]## curl -L "https://github.com/docker/compose/releases/download/1.29.2
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   664  100   664    0     0    982      0 --:--:-- --:--:-- --:--:--   982
100 12.1M  100 12.1M    0     0  29870      0  0:07:06  0:07:06 --:--:-- 64748
[root@VM-16-8-centos springboot_test]## chmod +x /usr/local/bin/docker-compose
[root@VM-16-8-centos springboot_test]## cd /usr/local/bin/
[root@VM-16-8-centos bin]## vim docker-compose 
[root@VM-16-8-centos bin]## ll
total 13420
-rwxr-xr-x 1 root root  1001112 Aug  5  2020 busybox-x86_64
-rwxr-xr-x 1 root root 12737304 Apr  6 10:17 docker-compose
[root@VM-16-8-centos bin]## docker-compose --version
docker-compose version 1.29.2, build 5becea4c
```



### 11.2 docker-compose核心

**一文件**

docker-compose.yml



**两要素**

服务（service）

一个个应用容器实例，比如订单微服务、库存微服务、mysql容器、nginx容器或者redis容器



工程（project）

由一组关联的应用容器组成的一个==完整业务单元==，在 docker-compose.yml 文件中定义。



**Compose使用的三个步骤**

1. 编写Dockerfile定义各个微服务应用并构建出对应的镜像文件
2. 使用 docker-compose.yml 定义一个完整业务单元，安排好整体应用中的各个容器服务。
3. 最后，执行docker-compose up命令 来启动并运行整个应用程序，完成一键部署上线



### 11.3 Compose常用命令

docker-compose -h                           ## 查看帮助
docker-compose up                           ## 启动所有docker-compose服务
docker-compose up -d                        ## 启动所有docker-compose服务并后台运行
docker-compose down                         ## 停止并删除容器、网络、卷、镜像。
docker-compose exec  yml里面的服务id                 ## 进入容器实例内部  docker-compose exec docker-compose.yml文件中写的服务id /bin/bash
docker-compose ps                      ## 展示当前docker-compose编排过的运行的所有容器
docker-compose top                     ## 展示当前docker-compose编排过的容器进程

docker-compose logs  yml里面的服务id     ## 查看容器输出日志
**docker-compose config     ## 检查配置**
docker-compose config -q  ## 检查配置，有问题才有输出
docker-compose restart   ## 重启服务
docker-compose start     ## 启动服务
docker-compose stop      ## 停止服务



### 11.4 快速入门Compose 

跟着官网写个wordpress来写个实例

创建目录my_wordpress

进入目录，创建docker-compose.yml文件

```yml
version: "3.9"
    
services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    
  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    volumes:
      - wordpress_data:/var/www/html
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
volumes:
  db_data: {}
  wordpress_data: {}
```



`docker-compose up -d`项目目录运行。

```
[root@VM-16-8-centos my_wordpress]## docker-compose up -d
Creating network "my_wordpress_default" with the default driver
Creating volume "my_wordpress_db_data" with default driver
Creating volume "my_wordpress_wordpress_data" with default driver
Pulling wordpress (wordpress:latest)...
latest: Pulling from library/wordpress
c229119241af: Already exists
47e86af584f1: Pull complete
e1bd55b3ae5f: Downloading [====>                                              ]  7.903MB/91.6MB
e1bd55b3ae5f: Pull complete
1f3a70af964a: Pull complete
0f5086159710: Pull complete
7d9c764dc190: Pull complete
ec2bb7a6eead: Pull complete
9d9132470f34: Pull complete
fb23ab197126: Pull complete
cbdd566be443: Pull complete
be224cc1ae0f: Pull complete
629912c3cae4: Pull complete
f1bae9b2bf5b: Pull complete
19542807523e: Pull complete
59191c568fb8: Pull complete
30be9b012597: Pull complete
bb41528d36dd: Pull complete
bfd3efbb7409: Pull complete
7f19a53dfc12: Pull complete
23dc552fade0: Pull complete
5133d8c158a7: Pull complete
Digest: sha256:c8d7b938e831b715cf16f22b678f9c7a0ffd5e5efa9b9b2d77f39bed5cf5b2fd
Status: Downloaded newer image for wordpress:latest
Creating my_wordpress_db_1 ... done
Creating my_wordpress_wordpress_1 ... done
```



测试

> 在云服务器上部署的记得放开开云服务器的端口

![image-2022040713525984](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407135259844.png)



## 十二、Portainer

###  12.1 是什么

Portainer 是一款轻量级的应用，它提供了图形化界面，用于方便地管理Docker环境，包括单机环境和集群环境。



### 12.2 安装

[官网](https://www.portainer.io/)



### 安装nginx

docker run --name nginx -p 80:80 --link=tomcat:tomcat1 --link=tomcat02:tomca -v /opt/docker-nginx/nginx.conf:/etc/nginx/nginx.conf -v /opt/docker-nginx/log:/var/log/nginx -v /opt/docker-nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf -d 313ec0a602bc

 ![image-20220407141316883](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407141316883.png)



因为我docker环境部署在了云服务器上，所以直接选本地即可

![image-20220407141559059](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407141559059.png)



![image-20220407141903885](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407141903885.png)



![image-20220407143128082](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407143128082.png)



**测试**

![image-20220407143207736](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407143207736.png)



**docker stats**

![image-20220407143611100](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407143611100.png)







## 十三、CAdvisor+InfluxDB+Granfana

**docker ps**

**docker stats**

> 用来查看容器占用资源
>
> 通过docker stats命令可以很方便的看到当前宿主机上所有容器的CPU,内存以及网络流量等数据，一般小公司够用了。。。。
>
> 但是，
>
> docker stats统计结果只能是当前宿主机的全部容器，数据资料是实时的，没有地方存储、没有健康指标过线预警等功能



### 13.1 容器监控三剑客

CAdvisor监控收集+InfluxDB存储数据+Granfana展示图表

![image-20220407191755111](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407191755111.png)



下面我们用docker-compose一键部署三剑客

```yml
version: '3.1'
 
volumes:
  grafana_data: {}
 
services:
 influxdb:
  image: tutum/influxdb:0.9
  restart: always
  environment:
    - PRE_CREATE_DB=cadvisor
  ports:
    - "8083:8083"
    - "8086:8086"
  volumes:
    - ./data/influxdb:/data
 
 cadvisor:
  image: google/cadvisor
  links:
    - influxdb:influxsrv
  command: -storage_driver=influxdb -storage_driver_db=cadvisor -storage_driver_host=influxsrv:8086
  restart: always
  ports:
    - "8080:8080"
  volumes:
    - /:/rootfs:ro
    - /var/run:/var/run:rw
    - /sys:/sys:ro
    - /var/lib/docker/:/var/lib/docker:ro
 
 grafana:
  user: "104"
  image: grafana/grafana
  user: "104"
  restart: always
  links:
    - influxdb:influxsrv
  ports:
    - "3000:3000"
  volumes:
    - grafana_data:/var/lib/grafana
  environment:
    - HTTP_USER=admin
    - HTTP_PASS=admin
    - INFLUXDB_HOST=influxsrv
    - INFLUXDB_PORT=8086
    - INFLUXDB_NAME=cadvisor
    - INFLUXDB_USER=root
    - INFLUXDB_PASS=root

```



![image-20220407165542929](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407165542929.png)











## bug记录

==方案一==

docker启动的nginx

想修改的它的配置文件，vi命令也没有，vim命令也没有

apt-get update 完成之后 apt-get install vim



==方案二==

但是这样太麻烦了，我们在宿主机挂载卷即可

需要自己准备好nginx.conf 和default.conf文件，我是直接从容器里面复制的，然后根据自己的需要改的

mkdir -p /opt/docker-nginx/conf.d

mv nginx.conf /opt/docker-nginx/ && mv default.conf /opt/docker-nginx/conf.d/

docker run --name nginx -p 80:80 -v /opt/docker-nginx/nginx.conf:/etc/nginx/nginx.conf -v /opt/docker-nginx/log:/var/log/nginx -v /opt/docker-nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf -d nginx







