---
title: Redis
---
# 一、NoSQL数据库简介

## 1.1 NoSql数据库

### 1.1.1 概述

> ACID是衡量事务的四个特性：
>
> - 原子性（Atomicity，或称不可分割性）
> - 一致性（Consistency）
> - 隔离性（Isolation）
> - 持久性（Durability）



> 非关系型数据库就是没用遵循关系代数模式的数据库。举一些例子：
>
> 1. 文档数据库，没研究过定义，通常mongodb 就是文档数据库，特点就是数据定义比较灵活。
>
> 2. Kv数据库，提供的是kv的数据表示模式。单机的rocksdb，分布式的tikv之类。
>
> 3. 图数据库。数据可以用图来定义。
>
> 4. 列式数据库。hbase之类，这里可能有争议，很多人把hbase 定义为列存

NoSQL(NoSQL = **Not Only SQL** )，意即“不仅仅是SQL”，泛指**非关系型的数据库**。 

NoSQL 不依赖业务逻辑方式存储，而以简单的==key-value==模式存储。因此大大的增加了数据库的扩展能力。

- **不遵循SQL标准。**
- 不支持ACID。
- 远超于SQL的性能。





### 1.1.2  NoSQL适用场景

- 对数据高并发的读写
- 海量数据的读写
- 对数据高可扩展性的



### 1.1.3 NoSQL不适用场景

- 需要事务支持
- 基于sql的结构化查询存储，处理复杂的关系,需要即席查询。
- （用不着sql的和用了sql也不行的情况，请考虑用NoSql）



### 1.1.4 常见的NoSql

![image-20220307163845327](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307163845327.png)



![image-20220307163934525](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307163934525.png)





![image-20220307164111312](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307164111312.png)

HBase的目标就是处理数据量**非常庞大**的表，可以用**普通的计算机**处理超过**10**亿行数据**，还可处理有数百万**列元素的数据表。



![image-20220307164133010](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307164133010.png)



> 计算机存储单位 计算机存储单位一般用B，KB，MB，GB，TB，EB，ZB，YB，BB来表示，它们之间的关系是：
>
> 位 bit (比特)(Binary Digits)：存放一位二进制数，即 0 或 1，最小的存储单位。
>
> 字节 byte：8个二进制位为一个字节(B)，最常用的单位。
>
> 1KB (Kilobyte 千字节)=1024B，
>
> 1MB (Megabyte 兆字节 简称“兆”)=1024KB，
>
> 1GB (Gigabyte 吉字节 又称“千兆”)=1024MB，
>
> 1TB (Trillionbyte 万亿字节 太字节)=1024GB，其中1024=2^10 ( 2 的10次方)，
>
> 1PB（Petabyte 千万亿字节 拍字节）=1024TB，
>
> 1EB（Exabyte 百亿亿字节 艾字节）=1024PB，
>
> 1ZB (Zettabyte 十万亿亿字节 泽字节)= 1024 EB,
>
> 1YB (Jottabyte 一亿亿亿字节 尧字节)= 1024 ZB,
>
> 1BB (Brontobyte 一千亿亿亿字节)= 1024 YB.
>
> 注：“兆”为百万级数量单位。

![image-20220307164213324](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307164213324.png)







# 二、概述安装

- Redis是一个开源的key-value存储系统。
- 和Memcached类似，它支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）。
- 这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。
- 在此基础上，Redis支持各种不同方式的排序。
- 与memcached一样，为了保证效率，数据都是缓存在内存中。
- 区别的是Redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件。
- 并且在此基础上实现了master-slave(主从)同步。



## 2.1 应用场景

### 2.1.1 配合关系型数据库做高速缓存

- 高频次，热门访问的数据，降低数据库IO
- 分布式架构，做session共享

![image-20220307171123625](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307171123625.png)



### 2.1.2  多样的数据结构存储持久化数据

![image-20220307171156623](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307171156623.png)





## 2.2 安装redis

> 咱们在linux中安装

```
yum install centos-release-scl scl-utils-build

yum install -y devtoolset-8-toolchain

scl enable devtoolset-8 bash

测试 gcc版本 

gcc --version
```



![image-20220307171301179](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307171301179.png)



```
下载redis-6.2.1.tar.gz放/opt目录
解压命令: tar —zxvf redis-6.2.1.tar.gz
解压完成后进入目录: cd redis-6.2.1
在redis-6.2.1目录下再次执行make命令（只是编译好）
继续执行: make install

```

查看默认安装目录：

redis-benchmark:性能测试工具，可以在自己本子运行，看看自己本子性能如何

redis-check-aof：修复有问题的AOF文件，rdb和aof后面讲

redis-check-dump：修复有问题的dump.rdb文件

redis-sentinel：Redis集群使用

**redis-server：Redis服务器启动命令**

**redis-cli：客户端，操作入口**



### 2.2.1 前台启动

前台启动，命令行窗口不能关闭，否则服务器停止

![image-20220307171543412](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307171543412.png)



### 2.2.2 后台启动

修改redis.conf(128行)文件将里面的**daemonize no 改成 yes**，让服务在后台启动





### 2.2.3 测试

![image-20220307171731431](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307171731431.png)



**单实例关闭：redis-cli shutdown**

**多实例关闭，指定端口关闭：redis-cli -p 6379 shutdown**







### 2.2.4 端口6379从何而来

[Alessia Merz](https://link.zhihu.com/?target=http%3A//it.wikipedia.org/wiki/Alessia_Merz) 是一位意大利舞女、女演员。

后来 Antirez 重新定义了 "MERZ" ，形容”具有很高的技术价值，包含技艺、耐心和劳动，但仍然保持简单本质“。



到了给 Redis 选择一个数字作为默认端口号时，Antirez 没有多想，把 "MERZ" 在手机键盘上对应的数字 6379 拿来用了。

![image-20220307181837325](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307181837325.png)





默认16个数据库，类似数组下标从0开始，**初始默认使用0号库**

使用命令 select  \<dbid>来切换数据库。如: select 8 

 统一密码管理，所有库同样密码。

dbsize查看当前数据库的key的数量

flushdb清空当前库

flushall通杀全部库



Redis是单线程+多路IO复用技术

多路复用是指使用一个线程来检查多个文件描述符（Socket）的就绪状态，比如调用select和poll函数，传入多个文件描述符，如果有一个文件描述符就绪，则返回，否则阻塞直到超时。得到就绪状态后进行真正的操作可以在同一个线程里执行，也可以启动线程执行（比如使用线程池）



串行  vs  多线程+锁（memcached） vs  单线程+多路IO复用(Redis)

与Memcache三点不同: 支持多数据类型，支持持久化，单线程+多路IO复用



# 三、常用五大数据类型

[Redis命令中心（Redis commands） -- Redis中国用户组（CRUG）](http://www.redis.cn/commands.html)

## 3.1 Redis键(key)

keys *查看当前库所有key  (匹配：keys *1)

exists key判断某个key是否存在

type key 查看你的key是什么类型

del key    删除指定的key数据

unlink key  根据value选择非阻塞删除

仅将keys从keyspace元数据中删除，真正的删除会在后续异步操作。

expire key 10  10秒钟：为给定的key设置过期时间

ttl key 查看还有多少秒过期，-1表示永不过期，-2表示已过期

 

select命令切换数据库

dbsize查看当前数据库的key的数量

flushdb清空当前库

flushall通杀全部库





## 3.2 Redis字符串

> **原子性**
>
> 所谓**原子**操作是指不会被线程调度机制打断的操作；
>
> 这种操作一旦开始，就一直运行到结束，中间不会有任何 context switch （切换到另一个线程）。
>
> （1）在单线程中， 能够在单条指令中完成的操作都可以认为是"原子操作"，因为中断只能发生于指令之间。
>
> （2）在多线程中，不能被其它进程（线程）打断的操作就叫原子操作。
>
> Redis单命令的原子性主要得益于Redis的单线程。

String是Redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。

String类型==是二进制安全的==。意味着Redis的string可以包含任何数据。比如jpg图片或者序列化的对象。

String类型是Redis最基本的数据类型，一个Redis中字符串value最多可以是==512M==









### 3.2.1 常用命令

set  \<key>\<value>添加键值对

![image-20220307215018015](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307215018015.png)

*NX：当数据库中key不存在时，可以将key-value添加数据库

*XX：当数据库中key存在时，可以将key-value添加数据库，与NX参数互斥

*EX：key的超时秒数

*PX：key的超时毫秒数，与EX互斥



get  \<key>查询对应键值

append \<key>\<value>将给定的\<value> 追加到原值的末尾

strlen \<key>获得值的长度

setnx \<key>\<value>只有在 key 不存在时  设置 key 的值

 

incr \<key>

将 key 中储存的数字值增1

只能对数字值操作，如果为空，新增值为1

decr \<key>

将 key 中储存的数字值减1

只能对数字值操作，如果为空，新增值为-1

incrby / decrby \<key><步长>将 key 中储存的数字值增减。自定义步长。



mset `<key1><value1><key2><value2>` ..... 

同时设置一个或多个 key-value对 



mget `<key1><key2><key3>` .....

同时获取一个或多个 value 



msetnx `<key1><value1><key2><value2>` ..... 

同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。

**原子性，有一个失败则都失败**

 

getrange \<key><起始位置><结束位置>

获得值的范围，类似java中的substring，**前包，后包**

setrange \<key><起始位置>\<value>

用 \<value> 覆写\<key>所储存的字符串值，从<起始位置>开始(**索引从0**开始)。

 

**setex \<key><**过期时间>\<value>

设置键值的同时，设置过期时间，单位秒。

getset `<key><value>`

以新换旧，设置了新值同时获得旧值。



### 3.2.2 数据结构

String的数据结构为简单动态字符串(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配

![image-20220307215733145](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307215733145.png)

如图中所示，内部为当前字符串实际分配的空间capacity一般要高于实际字符串长度len。当字符串长度小于1M时，扩容都是加倍现有的空间，如果超过1M，扩容时一次只会多扩1M的空间。需要注意的是字符串最大长度为512M。



## 3.3 Redis列表（List）

单键多值

Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

它的底层实际是个**双向链表**，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。

![image-20220307215808238](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307215808238.png)



### 3.3.1  常用命令

`lpush/rpush <key><value1><value2><value3> .... 从左边/右边插入一个或多个值。`

`lpop/rpop <key>从左边/右边吐出一个值。值在键在，值光键亡。`

 

`rpoplpush <key1><key2>从<key1>列表右边吐出一个值，插到<key2>列表左边。`

 

`lrange <key><start><stop>`

`按照索引下标获得元素(从左到右)`

`lrange mylist 0 -1  0左边第一个，-1右边第一个，（0-1表示获取所有）`

`lindex <key><index>按照索引下标获得元素(从左到右)`

`llen <key>获得列表长度 `

 

`linsert <key> before <value><newvalue>在<value>的后面插入<newvalue>插入值`

`lrem <key><n><value>从左边删除n个value(从左到右)`

`lset<key><index><value>将列表key下标为index的值替换成value`





### 3.3.2  数据结构

List的数据结构为快速链表quickList。

首先在列表元素较少的情况下会使用一块连续的内存存储，这个结构是ziplist，也即是压缩列表。

它将所有的元素紧挨着一起存储，分配的是一块连续的内存。

当数据量比较多的时候才会改成quicklist。

因为普通的链表需要的附加指针空间太大，会比较浪费空间。比如这个列表里存的只是int类型的数据，结构上还需要两个额外的指针prev和next。

![image-20220307215937317](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307215937317.png)

Redis将链表和ziplist结合起来组成了quicklist。也就是将多个ziplist使用双向指针串起来使用。这样既满足了快速的插入删除性能，又不会出现太大的空间冗余。



## 3.4 Redis集合(Set)

Redis set对外提供的功能与list类似是一个列表的功能，特殊之处在于set是可以**自动排重**的，当你需要存储一个列表数据，又不希望出现重复数据时，set是一个很好的选择，并且set提供了判断某个成员是否在一个set集合内的重要接口，这个也是list所不能提供的。

Redis的Set是string类型的**无序集合。它底层其实是一个value为null的hash表**，所以添加，删除，查找的复杂度都是O(1)。

一个算法，随着数据的增加，执行时间的长短，如果是O(1)，数据增加，查找数据的时间不变



### 3.4.1 常用命令

`sadd <key><value1><value2> ..... `

将一个或多个 member 元素加入到集合 key 中，已经存在的 member 元素将被忽略

`smembers <key>取出该集合的所有值。`

`sismember <key><value>判断集合<key>是否为含有该<value>值，有1，没有0`

`scard<key>返回该集合的元素个数。`

`srem <key><value1><value2> .... 删除集合中的某个元素。`

`spop <key>**随机从该集合中吐出一个值。`**

`srandmember <key><n>随机从该集合中取出n个值。不会从集合中删除 。`

`smove <source><destination>value把集合中一个值从一个集合移动到另一个集合`

`sinter <key1><key2>返回两个集合的交集元素。`

`sunion <key1><key2>返回两个集合的并集元素。`

`sdiff <key1><key2>返回两个集合的**差集**元素(key1中的，不包含key2中的)`



Set数据结构是dict字典，字典是用哈希表实现的。

Java中HashSet的内部实现使用的是HashMap，只不过所有的value都指向同一个对象。Redis的set结构也是一样，它的内部也使用hash结构，所有的value都指向同一个内部值。



## 3.5 Redis哈希(Hash)

Redis hash 是一个键值对集合。

Redis hash是一个string类型的field和value的映射表，hash特别适合用于存储对象。

类似Java里面的Map<String,Object>

用户ID为查找的key，存储的value用户对象包含姓名，年龄，生日等信息，如果用普通的key/value结构来存储

主要有以下2种存储方式：

![image-20220307220408245](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307220408245.png)

### 3.5.1 常用命令

`hset <key><field><value>给<key>集合中的 <field>键赋值<value>`

`hget <key1><field>从<key1>集合<field>取出 value `

`hmset <key1><field1><value1><field2><value2>... 批量设置hash的值`

`hexists<key1><field>查看哈希表 key 中，给定域 field 是否存在。` 

`hkeys <key>列出该hash集合的所有field`

`hvals <key>列出该hash集合的所有value`

`hincrby <key><field><increment>为哈希表 key 中的域 field 的值加上增量 1  -1`

`hsetnx <key><field><value>将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在 .`



Hash类型对应的数据结构是两种：ziplist（压缩列表），hashtable（哈希表）。当field-value长度较短且个数较少时，使用ziplist，否则使用hashtable。







## 3.6 Redis有序集合Zset

Redis有序集合zset与普通集合set非常相似，是一个**没有重复元素**的字符串集合。

不同之处是有序集合的每个成员都关联了一个**评分（score）,这个评分（score）被用来按照从最低分到最高分的方式排序集合中的成员。**集合的成员是唯一的，但是评分可以是重复了 。

因为元素是有序的, 所以你也可以很快的根据评分（score）或者次序（position）来获取一个范围的元素。

访问有序集合的中间元素也是非常快的,因此你能够使用有序集合作为一个没有重复成员的智能列表。

### 3.6.1 常用命令

`zadd <key><score1><value1><score2><value2>…`

`将一个或多个 member 元素及其 score 值加入到有序集 key 当中。`

`**zrange <key><start><stop> [WITHSCORES]**  `

`返回有序集 key 中，下标在<start><stop>之间的元素`

`带WITHSCORES，可以让分数一起和值返回到结果集。`

`zrangebyscore key minmax [withscores] [limit offset count]`

返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员。有序集成员按 score 值递增(从小到大)次序排列。 

zrevrangebyscore key maxmin [withscores] [limit offset count]        

同上，改为从大到小排列。 

`zincrby <key><increment><value>   为元素的score加上增量`

`zrem <key><value>删除该集合下，指定值的元素`

`zcount <key><min><max>统计该集合，分数区间内的元素个数 `

`zrank <key><value>返回该值在集合中的排名，从0开始。`



案例：如何利用zset实现一个文章访问量的排行榜？

![image-20220307221417514](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307221417514.png)



SortedSet(zset)是Redis提供的一个非常特别的数据结构，一方面它等价于Java的数据结构Map<String, Double>，可以给每一个元素value赋予一个权重score，另一方面它又类似于TreeSet，内部的元素会按照权重score进行排序，可以得到每个元素的名次，还可以通过score的范围来获取元素的列表。

zset底层使用了两个数据结构

（1）hash，hash的作用就是关联元素value和权重score，保障元素value的唯一性，可以通过元素value找到相应的score值。

（2）跳跃表，跳跃表的目的在于给元素value排序，根据score的范围获取元素列表。





# 四、配置文件介绍

## 4.1 Units单位

配置大小单位,开头定义了一些基本的度量单位，只支持bytes，不支持bit

大小写不敏感

![image-20220307221522940](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307221522940.png)

4.2 INCLUDES包含

![image-20220307221536456](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307221536456.png)

类似jsp中的include，多实例的情况可以把公用的配置文件提取出来



## 4.3 网络相关配置

### 4.3.1 bind

默认情况bind=127.0.0.1只能接受本机的访问请求

不写的情况下，无限制接受任何ip地址的访问

生产环境肯定要写你应用服务器的地址；服务器是需要远程访问的，所以需要将其注释掉

**如果开启了protected-mode，那么在没有设定bind ip且没有设密码的情况下，Redis只允许接受本机的响应**



保存配置，停止服务，重启启动查看进程，不再是本机访问了。

![image-20220307221731444](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307221731444.png)





### 4.3.2 protected-mode  

将本机访问保护模式设置 no

![image-20220307221739300](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307221739300.png)



### 4.3.3 port

端口号，默认 6379





### 4.3.4 timeout

一个空闲的客户端维持多少秒会关闭，0表示关闭该功能。即**永不关闭**

![image-20220307221825463](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307221825463.png)



### 4.3.5 tcp-keepalive

对访问客户端的一种心跳检测，每个n秒检测一次。

单位为秒，如果设置为0，则不会进行Keepalive检测，建议设置成60 

![image-20220307221851728](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307221851728.png)



## 4.4 GENERAL通用

### 4.4.1 daemonize

是否为后台进程，设置为yes

守护进程，后台启动

![image-20220307221941720](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307221941720.png)



### 4.4.2 pidfile

存放pid文件的位置，每个实例会产生一个不同的pid文件

![image-20220307222008641](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222008641.png)





### 4.4.3 loglevel 

指定日志记录级别，Redis总共支持四个级别：debug、verbose、notice、warning，默认为**notice**

**四个级别根据使用阶段来选择，生产环境选择notice 或者warning**

![image-20220307222042983](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222042983.png)







## 4.5 SECURITY安全

### 4.5.1 设置密码

![image-20220307222125672](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222125672.png)

访问密码的查看、设置和取消

在命令中设置密码，只是临时的。重启redis服务器，密码就还原了。

永久设置，需要再配置文件中进行设置。

![image-20220307222132066](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222132066.png)



## 4.6 LIMITS限制



### 4.6.1 maxclients

- 设置redis同时可以与多少个客户端进行连接。
- 默认情况下为10000个客户端。
- 如果达到了此限制，redis则会拒绝新的连接请求，并且向这些连接请求方发出“max number of clients reached”以作回应。



![image-20220307222236574](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222236574.png)



### 4.6.2 maxmemory

建议**必须设置**，否则，将内存占满，造成服务器宕机

设置redis可以使用的内存量。一旦到达内存使用上限，redis将会试图移除内部数据，移除规则可以通过**maxmemory-policy**来指定。

如果redis无法根据移除规则来移除内存中的数据，或者设置了“不允许移除”，那么redis则会针对那些需要申请内存的指令返回错误信息，比如SET、LPUSH等。

但是对于无内存申请的指令，仍然会正常响应，比如GET等。如果你的redis是主redis（说明你的redis有从redis），那么在设置内存使用上限时，需要在系统中留出一些内存空间给同步队列缓存，只有在你设置的是“不移除”的情况下，才不用考虑这个因素。

![image-20220307222321503](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222321503.png)



### 4.6.3 maxmemory-policy 

- volatile-lru：使用LRU算法移除key，只对设置了过期时间的键；（最近最少使用）
- allkeys-lru：在所有集合key中，使用LRU算法移除key
- volatile-random：在过期集合中移除随机的key，只对设置了过期时间的键
- allkeys-random：在所有集合key中，移除随机的key
- volatile-ttl：移除那些TTL值最小的key，即那些最近要过期的key
- noeviction：不进行移除。针对写操作，只是返回错误信息

![image-20220307222425237](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222425237.png)





# 五、Redis的发布和订阅

Redis 发布订阅 (pub/sub) 是一种消息通信模式：发送者 (pub) 发送消息，订阅者 (sub) 接收消息。

 Redis 客户端可以订阅任意数量的频道。



客户端可以订阅频道如下图

![image-20220307222452820](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222452820.png)





当给这个频道发布消息后，消息就会发送给订阅的客户端

![image-20220307222505629](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222505629.png)







## 5.1 测试

打开一个客户端订阅channel1

SUBSCRIBE channel1

![image-20220307222539767](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222539767.png)



打开另一个客户端，给channel1发布消息hello

![image-20220307222713187](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222713187.png)

返回的1是订阅者数量



打开第一个客户端可以看到发送的消息

![image-20220307222722811](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222722811.png)



注：发布的消息没有持久化，如果在订阅的客户端收不到hello，只能收到订阅后发布的消息





# 六、Redis新数据类型

## 6.1 Bitmaps

现代计算机用二进制（位） 作为信息的基础单位， 1个字节等于8位， 例如“abc”字符串是由3个字节组成， 但实际在计算机存储时将其用二进制表示， “abc”分别对应的ASCII码分别是97、 98、 99， 对应的二进制分别是01100001、 01100010和01100011，如下图

​        ![image-20220307222837734](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222837734.png)                       

合理地使用操作位能够有效地提高内存使用率和开发效率。

   Redis提供了Bitmaps这个“数据类型”可以实现对位的操作：

（1）  Bitmaps本身不是一种数据类型， 实际上它就是字符串（key-value） ， 但是它可以对字符串的位进行操作。

（2）  Bitmaps单独提供了一套命令， 所以在Redis中使用Bitmaps和使用字符串的方法不太相同。 可以把Bitmaps想象成一个以位为单位的数组， 数组的每个单元只能存储0和1， 数组的下标在Bitmaps中叫做偏移量。

 ![image-20220307222841471](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307222841471.png)



### 6.1.1 命令

setbit

（1）格式
```
setbit<key><offset><value>设置Bitmaps中某个偏移量的值（0或1）
```
![](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223000190.png)

*offset:偏移量从0开始



（2）实例

每个独立用户是否访问过网站存放在Bitmaps中， 将访问的用户记做1， 没有访问的用户记做0， 用偏移量作为用户的id。

设置键的第offset个位的值（从0算起） ， 假设现在有20个用户，userid=1， 6， 11， 15， 19的用户对网站进行了访问， 那么当前Bitmaps初始化结果如图

![image-20220307223023691](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223023691.png)

unique:users:20201106代表2020-11-06这天的独立访问用户的Bitmaps

![image-20220307223036423](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223036588.png)

注：

很多应用的用户id以一个指定数字（例如10000） 开头， 直接将用户id和Bitmaps的偏移量对应势必会造成一定的浪费， 通常的做法是每次做setbit操作时将用户id减去这个指定数字。

在第一次初始化Bitmaps时， 假如偏移量非常大， 那么整个初始化过程执行会比较慢， 可能会造成Redis的阻塞。

 

2、getbit

（1）格式

`getbit<key><offset>获取Bitmaps中某个偏移量的值`

![image-20220307223101027](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223101027.png)

获取键的第offset位的值（从0开始算）

（2）实例

获取id=8的用户是否在2020-11-06这天访问过， 返回0说明没有访问过：

![image-20220307223120279](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223120279.png)

注：因为100根本不存在，所以也是返回0



3、bitcount

统计**字符串**被设置为1的bit数。一般情况下，给定的整个字符串都会被进行计数，通过指定额外的 start 或 end 参数，可以让计数只在特定的位上进行。start 和 end 参数的设置，都可以使用负数值：比如 -1 表示最后一个位，而 -2 表示倒数第二个位，start、end 是指bit组的字节的下标数，二者皆包含。

（1）格式

`bitcount<key>[start end] 统计字符串从start字节到end字节比特值为1的数量`

![image-20220307223213272](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223213272.png)



（2）实例

计算2022-11-06这天的独立访问用户数量

![image-20220307223223184](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223223184.png)

start和end代表起始和结束字节数， 下面操作计算用户id在第1个字节到第3个字节之间的独立访问用户数， 对应的用户id是11， 15， 19。

![image-20220307223231831](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223231831.png)





## 6.2 HyperLogLog

在工作当中，我们经常会遇到与统计相关的功能需求，比如统计网站PV（PageView页面访问量）,可以使用Redis的incr、incrby轻松实现。

但像UV（UniqueVisitor，独立访客）、独立IP数、搜索记录数等需要去重和计数的问题如何解决？这种求集合中不重复元素个数的问题称为基数问题。

解决基数问题有很多种方案：

（1）数据存储在MySQL表中，使用distinct count计算不重复个数

（2）使用Redis提供的hash、set、bitmaps等数据结构来处理

以上的方案结果精确，但随着数据不断增加，导致占用空间越来越大，对于非常大的数据集是不切实际的。



什么是基数?

比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为5。 基数估计就是在误差可接受的范围内，快速计算基数。

### 6.2.1 命令

1、pfadd 

（1）格式

`pfadd <key>< element> [element ...]  添加指定元素到 HyperLogLog 中`

![image-20220307223445184](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223445184.png)

（2）实例

![image-20220307223453591](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223453591.png)



将所有元素添加到指定HyperLogLog数据结构中。如果执行命令后HLL估计的近似基数发生变化，则返回1，否则返回0。

2、pfcount

（1）格式

`pfcount<key> [key ...] 计算HLL的近似基数，可以计算多个HLL，比如用HLL存储每天的UV，计算一周的UV可以使用7天的UV合并计算即可`

![image-20220307223517311](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223517311.png)





（2）实例

![image-20220307223523140](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223523140.png)





3、pfmerge

（1）格式

`pfmerge<destkey><sourcekey> [sourcekey ...] 将一个或多个HLL合并后的结果存储在另一个HLL中，比如每月活跃用户可以使用每天的活跃用户来合并计算可得`

![image-20220307223546882](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307223546882.png)



# 七、Jedis测试

## 7.1 导包

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.3.0</version>
</dependency>
```



## 7.2 各种测试

```java
package com.caq.jedis;

import org.junit.Test;
import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.Set;

public class JedisDemo1 {

    public static void main(String[] args) {
        //创建jedis对象
        Jedis jedis = new Jedis("172.20.10.9", 6379);

        //测试
        String ping = jedis.ping();
        System.out.println(ping);
    }


    //    操作zset
    @Test
    public void demo05() {
        Jedis jedis = new Jedis("172.20.10.9", 6379);
        jedis.zadd("china",100d,"shanghai");
        Set<String> china = jedis.zrange("china", 0, -1);
        System.out.println(china);
        jedis.close();
    }

    // 操作hash
    @Test
    public void demo04() {
        Jedis jedis = new Jedis("172.20.10.9", 6379);
        jedis.hset("demo04", "age", "20");
        String hget = jedis.hget("demo04", "age");
        System.out.println(hget);
        jedis.close();

    }

    //    操作set
    @Test
    public void demo03() {
        Jedis jedis = new Jedis("172.20.10.9", 6379);
        jedis.sadd("demo03", "lucy");
        jedis.sadd("demo03", "monkey");
        Set<String> name = jedis.smembers("demo03");
        System.out.println(name);
        jedis.close();

    }

    //操作list
    @Test
    public void demo02() {
        Jedis jedis = new Jedis("172.20.10.9", 6379);
        jedis.lpush("demo02", "lucy", "jack", "tom");
        List<String> key1 = jedis.lrange("demo02", 0, -1);
        System.out.println(key1);
        jedis.close();

    }


    //操作key
    @Test
    public void demo1() {
        //创建redis对象
        Jedis jedis = new Jedis("172.20.10.9", 6379);
//        Set<String> keys = jedis.keys("*");
//        keys.forEach(x-> System.out.println(x));
//        添加
//        jedis.set("name","jack");
//        String name = jedis.get("name");


//        添加多个key
        jedis.mset("k1", "v1", "k2", "v2");
        List<String> mget = jedis.mget("k1", "k2");

        System.out.println(mget);
        jedis.close();

    }
}
```

## 7.3 连接Redis注意事项

禁用Linux的防火墙：Linux(CentOS7)里执行命令

**systemctl stop/disable firewalld.service**  

redis.conf中注释掉bind 127.0.0.1 ,然后 protected-mode no



## 7.4 手机验证码实例

要求：

1、输入手机号，点击发送后随机生成6位数字码，2分钟有效

2、输入验证码，点击验证，返回成功或失败

3、每个手机号每天只能输入3次

```java
package com.caq.jedis;

import redis.clients.jedis.Jedis;

import java.util.Random;

public class PhoneCode {
    public static void main(String[] args) {
        //模拟验证码发送
//        verifyCode("342352132");

        //校验
        getRedisCode("342352132", "833731");
    }

    //1 生成6位数字验证码
    public static String getCode() {
        Random random = new Random();
        String code = "";
        for (int i = 0; i < 6; i++) {
            int rand = random.nextInt(10);
            code += rand;
        }
        return code;
    }

    //2 每个手机每天只能发送三次，验证码放到redis中，设置超时时间
    public static void verifyCode(String phone) {
//        连接redis
        Jedis jedis = new Jedis("10.216.54.73", 6379);

//        拼接key
//        手机发送次数key
        String countKey = "VerityCode" + phone + ":count";
//        验证码key
        String codeKey = "VerityCode" + phone + ":code";
//        每个手机每天只能发送三次
        String count = jedis.get(countKey);
        if (count == null) {
//            没有发送次数，第一次发送
//            设置发送次数是1
            jedis.setex(countKey, 24 * 60 * 60, "1");
        } else if (Integer.parseInt(count) <= 2) {
//            发送次数+1
            jedis.incr(countKey);
        } else if (Integer.parseInt(count) > 2) {
//            发送三次，不能再发送
            System.out.println("今天发送次数已经超过三次");
            jedis.close();
            return;
        }

        //发送验证码放到redis里面
        String vcode = getCode();
        jedis.setex(codeKey, 120, vcode);
        jedis.close();
    }

    //    3 验证码校验
    public static void getRedisCode(String phone, String code) {
        //从redis获取验证码
        Jedis jedis = new Jedis("10.216.54.73", 6379);

        //验证码key
        String codeKey = "VerityCode" + phone + ":code";
        String redisCode = jedis.get(codeKey);

        //判断
        if (redisCode.equals(code)) {
            System.out.println("success");
        } else {
            System.out.println("fail");
        }
        jedis.close();
    }
}
```











# 八、 Redis与Spring Boot整合

## 8.1 引入依赖

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- spring2.X集成redis所需common-pool2-->
<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-pool2</artifactId>
</dependency>

<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
</dependency>

```



## 8.2 配置文件

```yml
spring:
  redis:
    #Redis服务器地址
    host: 10.216.54.73
    #Redis服务器连接端口
    port: 6379
    #Redis数据库索引（默认为0）
    database: 0
    #连接超时时间（毫秒）
    timeout: 1800000
    lettuce:
      pool:
        #连接池最大连接数（使用负值表示没有限制）
        max-active: 20
        #最大阻塞等待时间(负数表示没限制)
        max-wait: -1
        #最大阻塞等待时间(负数表示没限制)
        max-idle: 5
        #连接池中的最小空闲连接
        min-idle: 0
```



## 8.3 测试

```java
package com.caq.boot.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

@EnableCaching
@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        template.setConnectionFactory(factory);
//key序列化方式
        template.setKeySerializer(redisSerializer);
//value序列化
        template.setValueSerializer(jackson2JsonRedisSerializer);
//value hashmap序列化
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        return template;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
//解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
// 配置序列化（解决乱码的问题）,过期时间600秒
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(600))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
                .disableCachingNullValues();
        RedisCacheManager cacheManager = RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
        return cacheManager;
    }
}
```





RedisTestController中添加测试方法

```java
package com.caq.boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/redisTest")
public class RedisTestController {

    @Autowired
    private RedisTemplate redisTemplate;

    @GetMapping
    public String testRedis(){
        //设置值到redis
        redisTemplate.opsForValue().set("name","lucy");
//        从redis获取值
        String name = (String) redisTemplate.opsForValue().get("name");
        return name;
    }

}
```





# 九、Redis事务

> 涉及到很多秒杀相关的实例，这里只做简单的介绍

Redis事务是一个单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。

Redis事务的主要作用就是串联多个命令防止别的命令插队。





## 9.1 Multi、Exec、discard

从输入Multi命令开始，输入的命令都会依次进入命令队列中，但不会执行，直到输入Exec后，Redis会将之前的命令队列中的命令依次执行。

组队的过程中可以通过discard来放弃组队。 

![image-20220307224415423](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307224415423.png)



![image-20220307224427082](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307224427082.png)



组队成功，提交成功

![image-20220307224433982](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307224433982.png)



组队阶段报错，提交失败

![image-20220307224441877](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307224441877.png)



组队成功，提交有成功有失败情况



## 9.2 事务的错误处理

组队中某个命令出现了报告错误，执行时整个的所有队列都会被取消。

![image-20220307224539207](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307224539207.png)

如果执行阶段某个命令报出了错误，则只有报错的命令不会被执行，而其他的命令都会执行，不会回滚。

![image-20220307224553868](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307224553868.png)



## 9.3 乐观锁和悲观锁

乐观锁和悲观锁是两种思想，用于解决并发场景下的数据竞争问题。

- 乐观锁：乐观锁在操作数据时非常乐观，认为别人不会同时修改数据。因此乐观锁不会上锁，只是在执行更新的时候判断一下在此期间别人是否修改了数据：如果别人修改了数据则放弃操作，否则执行操作。
- 悲观锁：悲观锁在操作数据时比较悲观，认为别人会同时修改数据。因此操作数据时直接把数据锁住，直到操作完成后才会释放锁；上锁期间其他人不能修改数据。











# 十、Redis持久化

Redis 提供了2个不同形式的持久化方式。

- RDB（Redis DataBase）
- AOF（Append Of File）



## 10.1 RDB

在指定的时间间隔内将内存中的数据集快照写入磁盘， 也就是行话讲的Snapshot快照，它恢复时是将快照文件直接读到内存里

## 10.2 备份是如何执行的

Redis会单独创建（fork）一个子进程来进行持久化，会先将数据写入到 一个临时文件中，待持久化过程都结束了，再用这个临时文件替换上次持久化好的文件。 整个过程中，主进程是不进行任何IO操作的，这就确保了极高的性能 如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那RDB方式要比AOF方式更加的高效。**RDB**的缺点是最后一次持久化后的数据可能丢失。



## 10.3 AOF（Append Only File）

以**日志**的形式来记录每个写操作（增量保存），将Redis执行过的所有写指令记录下来(**读操作不记录**)， **只许追加文件但不可以改写文件**，redis启动之初会读取该文件重新构建数据，换言之，redis 重启的话就根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作







# 十一、Redis主从

主机数据更新后根据配置和策略， 自动同步到备机的master/slaver机制，Master以写为主，Slave以读为主

优点：

- 读写分离，性能扩展
- 容灾快速恢复

![image-20220307225345875](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307225345875.png)

## 11.1 部署流程

拷贝多个redis.conf文件include(写绝对路径)

开启daemonize yes

Pid文件名字pidfile

指定端口port

Log文件名字

dump.rdb名字dbfilename

Appendonly 关掉或者换名字



![image-20220307225514719](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307225514719.png)





![image-20220307225520582](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307225520582.png)



![image-20220307225525729](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307225525729.png)



配从(库)不配主(库) 

`slaveof <ip><port>`

成为某个实例的从服务器

1、在6380和6381上执行: slaveof 127.0.0.1 6379

![image-20220307225720515](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307225720515.png)

2、在主机上写，在从机上可以读取数据

在从机上写数据报错

![image-20220307225751398](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307225751398.png)

3、主机挂掉，重启就行，一切如初

4、从机重启需重设：slaveof 127.0.0.1 6379

可以将配置增加到文件中。永久生效。

![image-20220307225801577](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307225801577.png)



## 11.2 复制原理

1. Slave启动成功连接到master后会发送一个sync命令
2. Master接到命令启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令， 在后台进程执行完毕之后，master将传送整个数据文件到slave,以完成一次完全同步
3. 全量复制：而slave服务在接收到数据库文件数据后，将其存盘并加载到内存中。
4. 增量复制：Master继续将新的所有收集到的修改命令依次传给slave,完成同步
5. 但是只要是重新连接master,一次完全同步（全量复制)将被自动执行



## 11.3 哨兵模式(sentinel)

**能够后台监控主机是否故障，如果故障了根据投票数自动将从库转换为主库**

![image-20220307225853742](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307225853742.png)



### 11.3.1 初始环境



### 11.3.2 部署

自定义的/myredis目录下新建sentinel.conf文件，名字绝不能错

```xml
sentinel monitor mymaster 127.0.0.1 6379 1
```

其中mymaster为监控对象起的服务器名称， 1 为至少有多少个哨兵同意迁移的数量。



### 11.3.3 启动哨兵

/usr/local/bin

redis做压测可以用自带的redis-benchmark工具

执行redis-sentinel /myredis/sentinel.conf 



![image-20220307091149963](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307091149963.png)









**当主机挂掉，从机选举中产生新的主机**

(大概10秒左右可以看到哨兵窗口日志，切换了新的主机)

哪个从机会被选举为主机呢？根据优先级别：slave-priority 

原主机重启后会变为从机。

![image-20220307230131225](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307230131225.png)



# 十二、Redis集群

## 12.1 出现的问题

容量不够，redis如何进行扩容？

并发写操作， redis如何分摊？

之前通过代理主机来解决，但是redis3.0中提供了解决方案。就是无中心化集群配置。





## 12.2 初始化环境

我们在一台虚拟机上模拟多台redis服务器，通过模拟端口的形式来进行

制作6个实例，6379,6380,6381,6389,6390,6391





> cluster-enabled yes  打开集群模式
>
> cluster-config-file nodes-6379.conf 设定节点配置文件名
>
> cluster-node-timeout 15000  设定节点失联时间，超过该时间（毫秒），集群自动进行主从切换。

```shell
include /home/bigdata/redis.conf
port 6379
pidfile "/var/run/redis_6379.pid"
dbfilename "dump6379.rdb"
dir "/home/bigdata/redis_cluster"
logfile "/home/bigdata/redis_cluster/redis_err_6379.log"
cluster-enabled yes
cluster-config-file nodes-6379.conf
cluster-node-timeout 15000

```



**修改好redis6379**.conf文件，拷贝多个redis.conf文件

![image-20220307230350312](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307230350312.png)

 **修改好redis6379**.conf文件，拷贝多个redis.conf文件

**使用查找替换修改另外5个文件**

> %s/6379/6380 



![image-20220307102712422](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307102712422.png)



文件都正常生成

![image-20220307102745380](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307102745380.png)



## 12.3 将6个结点合成一个集群

```shell
[root@redis src]# redis-cli --cluster create --cluster-replicas 1 192.168.10.10:6379 192.168.10.10:6380 192.168.10.10:6381 192.168.10.10:6389 192.168.10.10:6390 192.168.10.10:6391
```

![image-20220307103343839](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307103343839.png)



![image-20220307103359547](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307103359547.png)



## 12.4 集群常用操作

 **-c** 采用集群策略连接，设置数据会自动切换到相应的写主机



**通过 cluster nodes 命令查看集群信息**

![image-20220307103759758](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307103759758.png)



**redis cluster如何分配这六个节点?**

一个集群至少要有三个主节点。

选项 --cluster-replicas 1 表示我们希望为集群中的每个主节点创建一个从节点。

分配原则尽量保证每个主数据库运行在不同的IP地址，每个从库和主库不在一个IP地址上。





# 十三、Redis应用问题



## 13.1 缓存穿透

**key对应的数据在数据源并不存在，每次针对此key的请求从缓存获取不到，请求都会压到数据源，从而可能压垮数据源。**比如用一个不存在的用户id获取用户信息，不论缓存还是数据库都没有，若黑客利用此漏洞进行攻击可能压垮数据库。

![image-20220307231233509](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307231233509.png)





### 13.1.1 解决方案



一个一定不存在缓存及查询不到的数据，由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。

解决方案：

（1）  **对空值缓存：**如果一个查询返回的数据为空（不管是数据是否不存在），我们仍然把这个空结果（null）进行缓存，设置空结果的过期时间会很短，最长不超过五分钟

（2）  **设置可访问的名单（白名单）：**

使用bitmaps类型定义一个可以访问的名单，名单id作为bitmaps的偏移量，每次访问和bitmap里面的id进行比较，如果访问id不在bitmaps里面，进行拦截，不允许访问。

（3）  **采用布隆过滤器**：(布隆过滤器（Bloom Filter）是1970年由布隆提出的。它实际上是一个很长的二进制向量(位图)和一系列随机映射函数（哈希函数）。

布隆过滤器可以用于检索一个元素是否在一个集合中。它的优点是空间效率和查询时间都远远超过一般的算法，缺点是有一定的误识别率和删除困难。)

将所有可能存在的数据哈希到一个足够大的bitmaps中，一个一定不存在的数据会被 这个bitmaps拦截掉，从而避免了对底层存储系统的查询压力。

**（4）**  **进行实时监控：**当发现Redis的命中率开始急速降低，需要排查访问对象和访问的数据，和运维人员配合，可以设置黑名单限制服务









## 13.2 缓存击穿

**key对应的数据存在，但在redis中过期，此时若有大量并发请求过来，这些请求发现缓存过期一般都会从后端DB加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端DB压垮。**

![image-20220307231347390](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307231347390.png)





### 13.2.1 解决方案

key可能会在某些时间点被超高并发地访问，是一种非常“热点”的数据。这个时候，需要考虑一个问题：缓存被“击穿”的问题。

解决问题：

**（1**）预先设置热门数据：在redis高峰访问之前，把一些热门数据提前存入到redis里面，加大这些热门数据key的时长

**（2**）实时调整：现场监控哪些数据热门，实时调整key的过期时长

**（3**）使用锁：

（1）  就是在缓存失效的时候（判断拿出来的值为空），不是立即去load db。

（2）  先使用缓存工具的某些带成功操作返回值的操作（比如Redis的SETNX）去set一个mutex key

（3）  当操作返回成功时，再进行load db的操作，并回设缓存,最后删除mutex key；

（4）  当操作返回失败，证明有线程在load db，当前线程睡眠一段时间再重试整个get缓存的方法。

![image-20220307231428298](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307231428298.png)



## 13.3 缓存雪崩

key对应的数据存在，但在redis中过期，此时若有大量并发请求过来，这些请求发现缓存过期一般都会从后端DB加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端DB压垮。

缓存雪崩与缓存击穿的区别在于这里针对很多key缓存，前者则是某一个key

 

正常访问

![image-20220307231437196](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307231437196.png)



缓存失效瞬间

![image-20220307231442289](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220307231442289.png)







### 13.3.1 解决方案

缓存失效时的雪崩效应对底层系统的冲击非常可怕！

解决方案：

**（1）**  **构建多级缓存架构：**nginx缓存 + redis缓存 +其他缓存（ehcache等）

**（2）**  **使用锁或队列：**

用加锁或者队列的方式保证来保证不会有大量的线程对数据库一次性进行读写，从而避免失效时大量的并发请求落到底层存储系统上。不适用高并发情况

**（3）**  **设置过期标志更新缓存：**

记录缓存数据是否过期（设置提前量），如果过期会触发通知另外的线程在后台去更新实际key的缓存。

**（4）**  **将缓存失效时间分散开：**

比如我们可以在原有的失效时间基础上增加一个随机值，比如1-5分钟随机，这样每一个缓存的过期时间的重复率就会降低，就很难引发集体失效的事件。













