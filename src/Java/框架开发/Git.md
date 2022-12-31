---
title: Git
---
## 一、Git概述

Git 是一个免费的、开源的分布式版本控制系统，可以快速高效地处理从小型到大型的各种项目。



#### 1.1  何为版本控制

版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统。
版本控制其实最重要的是可以记录文件修改历史记录，从而让用户能够查看历史版本， 方便版本切换。

![image-20220302163624181](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302163624181.png)







#### 1.2  为什么需要版本控制

个人开发过渡到团队协作。

![image-20220302163657738](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302163657738.png)



#### 1.3  版本控制工具

###### 集中式版本控制工具

CVS、**SVN(Subversion)**、VSS……

集中化的版本控制系统诸如 CVS、SVN 等，都有一个==单一的集中管理的服务器==，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。多年以来，这已成为版本控制系统的标准做法。

这种做法带来了许多好处，每个人都可以在一定程度上看到项目中的其他人正在做些什么。而管理员也可以轻松掌控每个开发者的权限，并且管理一个集中化的版本控制系统，要远比在各个客户端上维护本地数据库来得轻松容易。

事分两面，有好有坏。这么做显而易见的==缺点是中央服务器的单点故障==。如果服务器宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作。



![img](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/clip_image002.gif)



###### 分布式版本控制工具

**Git**、Mercurial、Bazaar、Darcs……

**像 Git 这种分布式版本控制工具，客户端提取的不是最新版本的文件快照，而是把代码仓库完整地镜像下来（本地库）。**这样任何一处协同工作用的文件发生故障，事后都可以用其他客户端的本地仓库进行恢复。因为每个客户端的每一次文件提取操作，实际上都是一次对整个文件仓库的完整备份。

分布式的版本控制系统出现之后,解决了集中式版本控制系统的缺陷:

1. 服务器断网的情况下也可以进行开发（因为版本控制是在本地进行的）

2. 每个客户端保存的也都是整个完整的项目（包含历史记录，更加安全）

![img](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/clip_image002.gif)





#### 1.4 Git工作机制

![image-20220302164701869](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302164701869.png)







#### 1.5 Git 和代码托管中心

代码托管中心是基于网络服务器的远程代码仓库，一般我们简单称为远程库。

###### 局域网

GitLab

###### 互联网

GitHub（外网）

Gitee 码云（国内网站）

#### 1.6 git颜色含义

**红色**——未加入版本控制；

**绿色**——已经加入控制暂未提交；

**蓝色**——加入，已提交，有改动；

**白色**——加入，已提交，无改动；

**灰色**——版本控制已忽略文件；

**黄色**——被git忽略，不跟踪。

## 二、Git 常用命令

| **命令名称**                          | **作用**       |
| ------------------------------------- | -------------- |
| git  config --global user.name 用户名 | 设置用户签名   |
| git config --global user.email 邮箱   | 设置用户签名   |
| git init                              | 初始化本地库   |
| git status                            | 查看本地库状态 |
| git add 文件名                        | 添加到暂存区   |
| git commit  -m "日志信息" 文件名      | 提交到本地库   |
| git reflog                            | 查看历史记录   |
| git reset --hard 版本号               | 版本穿梭       |





#### 2.1 git init

> 初始化本地库
>
> 初始化成功会有.git目录

![image-20220302165511949](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302165511949.png)



#### 2.2 快速打开git本地仓库

![image-20220302165142529](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302165142529.png)



可以看到直接就进去了

![image-20220302165316482](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302165316482.png)



#### 2.3 查看本地库状态

###### 2.3.1   首次查看（工作区没有任何文件）

![image-20220302165646891](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302165646891.png)





###### 2.3.2  再次查看（检测到未追踪的文件）

![image-20220302171541528](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302171541528.png)





###### 2.3.3   将工作区的文件添加到暂存区

git add 文件名

![image-20220302171755368](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302171755368.png)



###### 2.3.4 将暂存区的文件提交本地库

git commit -m  "日志信息"  文件名

![image-20220302172936895](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302172936895.png)





#### 2.4 查看历史版本

> 测试查看历史版本
>
> 我们修改后再次提交

![image-20220302173618955](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302173618955.png)



git reflog 查看版本信息

git log  查看版本详细信息

![image-20220302173709826](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302173709826.png)



#### 2.5 版本穿梭

git reset --hard 版本号

![image-20220302174007747](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302174007747.png)



## 三、Git分支操作

#### 3.1 什么是分支？

在版本控制过程中，同时推进多个任务，为每个任务，我们就可以创建每个任务的单独分支。使用分支意味着程序员可以把自己的工作从开发主线上分离开来，开发自己分支的时候，不会影响主线分支的运行。对于初学者而言，分支可以简单理解为副本，一个分支就是一个单独的副本。（**分支底层其实也是指针的引用**）

![image-20220302174139825](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302174139825.png)



#### 3.2 分支好处

同时并行推进多个功能开发，提高开发效率。

**各个分支在开发过程中，如果某一个分支开发失败，不会对其他分支有任何影响。失败的分支删除重新开始即可。**



#### 3.3 分支的操作

| **命令名称**               | **作用**                     |
| -------------------------- | ---------------------------- |
| git branch 分支名          | 创建分支                     |
| git branch -v              | 查看分支                     |
| git checkout 分支名        | 切换分支                     |
| git merge 分支名           | 把指定的分支合并到当前分支上 |
| git branch --delete 分支名 | 删除分支                     |



###### 3.3.1 查看创建分支

![image-20220302174910088](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302174910088.png)



###### 3.3.2 修改分支

![image-20220302175250489](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302175250489.png)



###### 3.3.3 切换分支

git checkout 分支名

![image-20220302175614222](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302175614222.png)



###### 3.3.4 合并分支

git merge 分支名

![image-20220302180217274](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302180217274.png)



###### 3.3.5 解决冲突

> 冲突产生的原因：
>
> 合并分支时，两个分支在**同一个文件的同一个位置**有两套完全不同的修改。Git 无法替我们决定使用哪一个。必须**人为决定**新代码内容。

**编辑有冲突的文件，删除特殊符号，决定要使用的内容**

```bash
<<<<<<< HEAD 
当前分支的代码
=======
合并过来的代码
>>>>>>> hot-fix
```

![image-20220302180721614](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302180721614.png)



###### 3.3.6 创建分支和切换分支图解

![image-20220302182055317](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302182055317.png)

master、hot-fix 其实都是指向具体版本记录的指针。当前所在的分支，其实是由 HEAD决定的。所以创建分支的本质就是多创建一个指针。

HEAD 如果指向 master，那么我们现在就在master 分支上。

HEAD 如果执行 hotfix，那么我们现在就在hotfix 分支上。 **所以切换分支的本质就是移动HEAD 指针**



## 四、团队协作机制

#### 4.1 团队内协作

> 从远程服器克隆一个一模一样的版本库到本地,复制的是整个版本库，叫做clone（clone是将一个库复制到你的本地，是一个本地从无到有的过程）
>
> 从远程服务器获取到一个branch分支的更新到本地，并更新本地库，叫做pull.（pull是指同步一个在你本地有版本的库内容更新的部分到你的本地库）

![image-20220302190426496](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302190426496.png)





#### 4.2 跨团队协作

![image-20220302191803709](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302191803709.png)











## 五、Github操作

https://github.com/

创建远程仓库

![image-20220302192028424](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302192028424.png)



创建仓库

![image-20220302192120268](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302192120268.png)





#### 5.1 远程仓库操作

| **命令名称**                       | **作用**                                                 |
| ---------------------------------- | -------------------------------------------------------- |
| git remote -v                      | 查看当前所有远程地址别名                                 |
| git remote add 别名远程地址        | 起别名                                                   |
| git push 别名 分支                 | 推送本地分支上的内容到远程仓库                           |
| git clone 远程地址                 | 将远程仓库的内容克隆到本地                               |
| git pull 远程库地址别名 远程分支名 | 将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并 |



###### 5.1.1 创建远程仓库别名

git remote -v 查看当前所有远程地址别名

git  remote  add   别名 远程地址2

![image-20220302193336745](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302193336745.png)



> Git的fetch和pull指令区别
>
> git fetch：相当于是从远程获取最新版本到本地，但不会自动 merge
>
> git pull：相当于是从远程获取最新版本并 merge 到本地
>
> 实际使用中git fetch 更安全一些，因为在 merge 前，我们可以查看更新情况，然后再决定是否合并。



![image-20220302193938257](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302193938257.png)


这个远程仓库的地址就在创建完仓库后会提醒

![image-20220302194028410](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302194028410.png)





###### 5.1.2 推送本地分支到远程仓库

######## push an existing repository from the command line

```git
git remote add origin https://github.com/YuyanCai/springcloud-config.git
git branch -M main
git push -u origin main
```



>  Win10系统 的凭据管理器是一个**系统组件，能够帮助用户完成本地访问时的认证工作**。 当用户第一次输入用户名和密码的时候，凭证管理器可以将这些访问凭据 (用户、密码、证书等)保存在本地，再次访问该服务器站点时，WIN10系统会自动完成凭据的认证过程。
>
>  ![image-20220302194401116](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302194401116.png)

git push 别名 分支

保证凭据管理器没有账号相关信息

![image-20220302194605938](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302194605938.png)



推送成功

![image-20220302194644411](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302194644411.png)



查看远程仓库，master分支上的内容已经被推送到Github远程仓库了

![image-20220302194721785](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302194721785.png)





###### 5.1.3 拉取远程仓库的内容

![image-20220302212531813](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302212531813.png)

![image-20220302212639121](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302212639121.png)





###### 5.1.4 克隆远程仓库到本地

> 我们在模拟一个新的仓库，通过git clone的方式克隆代码
>
> 所以先删除windows凭据管理保存的我第一个github账号

git clone 远程地址

![image-20220302221027597](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302221027597.png)



**拉取代码，初始化本地仓库**

![image-20220302221309174](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302221309174.png)



**自动起别名**

![](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302221509385.png)



**克隆不需要登录账号，因为我们的库是public的**

clone 会做如下操作。1、拉取代码。2、初始化本地仓库。3、创建别名







![image-20220302222213206](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302222213206.png)



![image-20220302222244922](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302222244922.png)





###### 5.1.5 邀请加入团队

######## 选择邀请合作者

![image-20220302222801317](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302222801317.png)



######## 复制Pending Invite 地址

在第一个账号浏览器打开，接受邀请

![image-20220302223112577](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302223112577.png)



######## 修改内容并 push 到远程仓库

![image-20220302223322597](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302223322597.png)





![image-20220302223434628](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302223434628.png)



###### 5.1.6 跨团队协作

######## 远程仓库的地址复制发给邀请跨团队协作的人



![image-20220302225218848](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302225218848.png)



######## Fork项目到本地仓库

![image-20220302225349134](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302225349134.png)



######## 编辑项目提交更改

![image-20220302225647037](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302225647037.png)



######## 创建pull请求

![image-20220302230306754](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302230306754.png)

![image-20220302230434722](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302230434722.png)



同时，第一个github也收到了这个请求

![image-20220302230533526](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302230533526.png)





接受请求

![image-20220302230702975](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302230702975.png)





![image-20220302230838060](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302230838060.png)



######## 协作成功

![image-20220302230925947](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302230925947.png)

#### 5.2 SSH免密登录

###### 创建秘钥

![image-20220302231616894](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302231616894.png)

###### 查看公钥

![image-20220302231731752](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302231731752.png)



###### Github设置SSH免密

![image-20220302231930581](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302231930581.png)



**接下来再往远程仓库push 东西的时候使用 SSH 连接就不需要登录了**



## 六、IDEA集成Git

#### 6.1 配置 Git 忽略文件

创建忽略规则文件xxxx.ignore（前缀名随便起，建议是 git.ignore）

这个文件的存放位置原则上在哪里都可以，为了便于让~/.gitconfig 文件引用，建议也放在用户家目录下

**git.ignore**

```bash
## Compiled class file
*.class

## Log file
*.log

## BlueJ files
*.ctxt

## Mobile Tools for Java (J2ME)
.mtj.tmp/

## Package Files ##
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

## virtual machine crash logs，see http: //www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
.classpath
.project
.settings target
.idea
*.iml
```



#### 6.2 在.gitconfig 文件中引用忽略配置文件

> 注意：这里要使用“正斜线（/）”，不要使用“反斜线（\）”

```bash
[user]
	name = pyy
	email = pyy@qq.com
[core]
excludesfile = C:/Users/Jack/git.ignore
```



#### 6.3 定位git程序

![image-20220302233649116](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302233649116.png)



#### 6.4 添加到暂存区

> 右键点击项目选择Git -> Add 将项目添加到暂存区。
>
> 
>
> 扩充知识点：
>
> **红色在git中代表违背追踪**
>
> ![image-20220302235042890](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302235042890.png)
>
> 
>
> **绿色代表已经添加到了暂存区**
>
> ![image-20220302235145602](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302235145602.png)
>
> 
>
> 
>
> 
>
> ![image-20220302235459133](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220302235459133.png)
>
> 
>
> ![image-20220303000521751](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303000521751.png)
>
> 
>
> ![image-20220303000547192](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303000547192.png)
>
> 
>
> 



![image-20220303105139033](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303105139033.png)



#### 6.5 提交到本地库

![image-20220303105139033](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303105139033.png)



#### 6.6 切换版本

![image-20220303105433768](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303105433768.png)





#### 6.7 创建，切换，合并，解决冲突

![image-20220303105530056](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303105530056.png)

![image-20220303105607759](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303105607759.png)





![image-20220303105804017](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303105804017.png)



![image-20220303110144741](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303110144741.png)







## 七、IDEA集成Github

#### 7.1 设置github账号

![image-20220303110511668](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303110511668.png)



#### 7.2 分享工程到 GitHub

![image-20220303110641090](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303110641090.png)



过程需要绑定账号，一次绑定后。后面就不需要在绑定了

![image-20220303102043918](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303102043918.png)





#### 7.3 push 推送本地库到远程库

> push代码只能将本地库代码推送到远程库，如果代码版本不一致，push操作会拒绝，也就是说push成功，一定要保证本地库的版本要比远程库的版本高。
>
> 如果本地的代码版本已经落后，切记要先 pull 拉取一下远程库的代码，将本地代码更新到最新以后，然后再修改，提交，推送！

**修改代码后，点击push即可同步到远程库**

![image-20220303110746598](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303110746598.png)





#### 7.4 pull 拉取远程库到本地库

> pull拉取分支并合并
>
> fetch拉取，不合并

![image-20220303111121643](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303111121643.png)





#### 7.5 clone 克隆远程库到本地

> 删除我们之前的项目，通过导入github仓库的形式将远程库代码克隆到本地

![image-20220303104621921](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303104621921.png)



## 八、国内代码托管中心-码云

> 国内代码托管平台

#### 8.1 IDEA集成码云

只需要下载gitee插件即可

![image-20220303130430675](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303130430675.png)





#### 8.2 IDEA连接码云

Idea 连接码云和连接 GitHub 几乎一样，首先在 Idea 里面创建一个工程，初始化 git 工程，然后将代码添加到暂存区，提交到本地库

![image-20220303130614783](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303130614783.png)





#### 8.3 码云赋值Github项目

![image-20220303130657974](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303130657974.png)



**很简单的操作，一步一步进行即可**

![image-20220303130716619](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303130716619.png)







**如果GitHub 项目更新了以后，在码云项目端可以手动重新同步，进行更新！**

![image-20220303113030806](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303113030806.png)





## 九、自建代码托管平台GitLab

#### git安装

> 需提前准备好安装包gitlab-ce-13.10.2-ce.0.el7.x86_64.rpm
>
> 安装最重要的是一个干净的环境，所以建议清理好环境在进行安装
>
> 安装相关包的时候最好用网络yum源
>
> 网路yum源如下设置即可
>
> ```bash
> wget -O /etc/yum.repos.d/local.repo http://mirrors.aliyun.com/repo/Centos-7.repo
> 
> yum clean all && yum makecache
> 
> yum install -y epel-release
> 
> yum clean all && yum makecache
> ```
>



下列命令一条一条执行即可~

```shell
systemctl stop firewalld && systemctl disable firewalld && setenforce 0
yum install openssh-server -y 
yum install postfix -y 
systemctl start postfix
systemctl enable postfix
yum install cronie -y
rpm -ivh gitlab-ce-13.10.2-ce.0.el7.x86_64.rpm
EXTERNAL_URL="http://gitlab.test.com"
gitlab-ctl reconfigure
```



> 这个是错误的信息，这个 情况是因为内存不够。
>
> 按照官方给的提示信息，2个cpu和2个内存才行

![image-20220303204829956](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303204829956.png)





![image-20220303232226578](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303232226578.png)



#### 访问

> 首次登陆之前，需要修改下 GitLab 提供的 root 账户的密码，要求 8 位以上，包含大小写子母和特殊符号

![image-20220303232321346](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303232321346.png)



> 默认的用户名是root
>
> 密码是我们一开始设置的

![image-20220303232409114](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303232409114.png)





#### idea集成Gitlab

安装插件

![image-20220303235446692](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303235446692.png)



> gitlab的操作和github、码云几乎一样
>
> 注意配置地址的时候是本地的地址即可



定义远程库

![image-20220303235009649](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303235009649.png)





提交成功

![image-20220303235222413](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220303235222413.png)









## 十、Bug记录

#### You appear to have cloned an empty repository.

 一般是目录层级错了

  要cd 进你的项目层级内

  如果是新clone 要清空文件夹





#### 连接github报错“ssh: connect to host github.com port 22: Connection timed out”

（1）进入`~/.ssh/`目录下（存放生成[ssh](https://so.csdn.net/so/search?q=ssh&spm=1001.2101.3001.7020)秘钥 id_rsa和id_rsa.pub 的目录）

 右键点击Git Bash Here 进入终端

（2）输入vi命令创建config文件,加入配置内容

```
windows@DESKTOP-R3F1R3Q MINGW64 ~/.ssh
$ vi config
```



```git
Host github.com
port 443 
HostName ssh.github.com
IdentityFile ~/.ssh/id_rsa
User mildcaq@163.com
PreferredAuthentications publickey
```



再次执行 [ssh](https://so.csdn.net/so/search?q=ssh) -T git@github.com 测试是否可连接，如果出现提示，回车”yes”即可。





















![image-20220223201836426](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220223201836426.png)

