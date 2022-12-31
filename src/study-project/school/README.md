## 前言

在线教育平台

在线教育顾名思义，是以网络为介质的教学方式，通过网络，学员与教师即使相隔万里也可以开展教学活动；此外，借助网络课件，学员还可以随时随地进行学习，真正打破了时间和空间的限制，对于工作繁忙，学习时间不固定的职场人而言网络远程教育是最方便不过的学习方式。



## 项目功能模块介绍

![image-20220407195624722](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407195624722.png)





## 项目技术点介绍

![image-20220407200052911](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220407200052911.png)





### 前后端分离

> 开发接口就是开发Controller，service，mapper的过程

![image-20220408221513260](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220408221513260.png)



# 二、项目开发

> 说明：
>
> 为了整体的阅读体验，不在粘贴代码
>
> 有需要的地方会粘贴关键代码，其余则图片形式展示

## 前端相关知识点

为了更好的阅读见博客：

[快速入门Vue_小蜗牛耶的博客-CSDN博客](https://blog.csdn.net/qq_45714272/article/details/124319750?spm=1001.2014.3001.5502)

[前端常见知识点汇总(ES6，Vue，axios，Node.js，npm，webpack)_小蜗牛耶的博客-CSDN博客](https://blog.csdn.net/qq_45714272/article/details/124319805?spm=1001.2014.3001.5502)





## 开发CRUD接口

[SpringBoot+MybatisPlus+Swagger快速开发套路和总结_小蜗牛耶的博客-CSDN博客](https://blog.csdn.net/qq_45714272/article/details/124201534?spm=1001.2014.3001.5502)



## 日志系统

引入依赖，添加logback.xml文件即可

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="10 seconds">
    <!-- 日志级别从低到高分为TRACE < DEBUG < INFO < WARN < ERROR < FATAL，如果设
    置为WARN，则低于WARN的信息都不会输出 -->
    <!-- scan:当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值
    为true -->
    <!-- scanPeriod:设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认
    单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。 -->
    <!-- debug:当此属性设置为true时，将打印出logback内部日志信息，实时查
    看logback运行状态。默认值为false。 -->
    <contextName>logback</contextName>
    <!-- name的值是变量的名称，value的值时变量定义的值。通过定义的值会被插入
    到logger上下文中。定义变量后，可以使“${}”来使用变量。 -->
    <!--日志输出在文件夹的哪个位置-->
    <property name="log.path" value="D:/logback"/>

    <!-- 彩色日志 -->
    <!-- 配置格式变量：CONSOLE_LOG_PATTERN 彩色日志格式 -->
    <!-- magenta:洋红 -->
    <!-- boldMagenta:粗红-->
    <!-- cyan:青色 -->
    <!-- white:白色 -->
    <!-- magenta:洋红 -->
    <property name="CONSOLE_LOG_PATTERN"
              value="%yellow(%date{yyyy-MM-dd HH:mm:ss}) |%highlight(%-5level)
|%blue(%thread) |%blue(%file:%line) |%green(%logger) |%cyan(%msg%n)"/>
    <!--输出到控制台-->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!--此日志appender是为开发使用，只配置最底级别，控制台输出的日志级别是大于或
        等于此级别的日志信息-->
        <!-- 例如：如果此处配置了INFO级别，则后面其他位置即使配置了DEBUG级别的日
        志，也不会被输出 -->
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>INFO</level>
        </filter>
        <encoder>
            <Pattern>${CONSOLE_LOG_PATTERN}</Pattern>
            <!-- 设置字符集 -->
            <charset>UTF-8</charset>
        </encoder>
    </appender>
    <!--输出到文件-->
    <!-- 时间滚动输出 level为 INFO 日志 -->
    <appender name="INFO_FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文件的路径及文件名 -->
        <file>${log.path}/log_info.log</file>
        <!--日志文件输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level
                %logger{50} - %msg%n
            </pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy
                class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 每天日志归档路径以及格式 -->
            <fileNamePattern>${log.path}/info/log-info-%d{yyyy-MM-
                dd}.%i.log
            </fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy
                    class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文件保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录info级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 时间滚动输出 level为 WARN 日志 -->
    <appender name="WARN_FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文件的路径及文件名 -->
        <file>${log.path}/log_warn.log</file>
        <!--日志文件输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level
                %logger{50} - %msg%n
            </pattern>
            <charset>UTF-8</charset> <!-- 此处设置字符集 -->
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy
                class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/warn/log-warn-%d{yyyy-MM-
                dd}.%i.log
            </fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy
                    class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文件保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录warn级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>warn</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 时间滚动输出 level为 ERROR 日志 -->
    <appender name="ERROR_FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文件的路径及文件名 -->
        <file>${log.path}/log_error.log</file>
        <!--日志文件输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level
                %logger{50} - %msg%n
            </pattern>
            <charset>UTF-8</charset> <!-- 此处设置字符集 -->
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy
                class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/error/log-error-%d{yyyy-MM-
                dd}.%i.log
            </fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy
                    class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文件保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录ERROR级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!--
    <logger>用来设置某一个包或者具体的某一个类的日志打印级别、以及指
    定<appender>。
    <logger>仅有一个name属性，
    一个可选的level和一个可选的addtivity属性。
    name:用来指定受此logger约束的某一个包或者具体的某一个类。
    level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL
    和 OFF，
    如果未设置此属性，那么当前logger将会继承上级的级别。
    -->
    <!--
    使用mybatis的时候，sql语句是debug下才会打印，而这里我们只配置了info，所以想
    要查看sql语句的话，有以下两种操作：
        第一种把<root level="INFO">改成<root level="DEBUG">这样就会打印sql，不过
            这样日志那边会出现很多其他消息
        第二种就是单独给mapper下目录配置DEBUG模式，代码如下，这样配置sql语句会打
            印，其他还是正常DEBUG级别：
-->

    <!--开发环境:打印控制台-->
    <springProfile name="dev">
        <!--可以输出项目中的debug日志，包括mybatis的sql日志-->
        <logger name="com.guli" level="INFO"/>
        <!--
        root节点是必选节点，用来指定最基础的日志输出级别，只有一个level属性
        level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR,
        ALL 和 OFF，默认是DEBUG
        可以包含零个或多个appender元素。
        -->
        <root level="INFO">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="INFO_FILE"/>
            <appender-ref ref="WARN_FILE"/>
            <appender-ref ref="ERROR_FILE"/>
        </root>
    </springProfile>
    <!--生产环境:输出到文件-->
    <springProfile name="pro">
        <root level="INFO">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="DEBUG_FILE"/>
            <appender-ref ref="INFO_FILE"/>
            <appender-ref ref="ERROR_FILE"/>
            <appender-ref ref="WARN_FILE"/>
        </root>
    </springProfile>
</configuration>
```



## 改造登录到本地接口

我们用vue的模板，快速构建一个后台管理系统的模板

默认启动的时候使用的地址是

![image-20220421221508516](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220421221508516.png)

这样的话会出现跨域问题！！！



### 跨域

简单说下跨域问题

> 跨域：指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对javascript施加的安全限制。
>
> 例如：a页面想获取b页面资源，如果a、b页面的协议、域名、端口、子域名不同，所进行的访问行动都是跨域的，而浏览器为了安全问题一般都限制了跨域访问，也就是不允许跨域请求资源。注意：跨域限制访问，其实是**浏览器的限制**。理解这一点很重要！！！
>
> 同源策略：是指协议，域名，端口都要相同，其中有一个不同都会产生跨域；

![img](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/9487719-d9eb2035e204d817.png)



#### 如何解决跨域问题？

由之前的介绍我们已经知道错误的原因，既然跨域会产生问题，那么我们就不跨域不就完了嘛！！！

==注解@CrossOrigin==

在后端接口加上@CrossOrigin即可解决跨域问题



==使用网关解决==

后面在写



### 登录功能完善

> **avatar	**头像的意思



根据vue模板，对登录的需求我们需要写两个接口

login登录操作方法，和info登录之后获取用户信息的方法。

1. login返回token值
2. info返回roles name avatar



> url里写的为后端的接口地址，最后访问的时候实际是dev.env.js中定义的BASE_API和这个里url拼接的地址
>
> **trim方法能够移除字符串右侧的空白字符或其他预定义字符。**

**1、定义登录API**

> 主要是和后端写的接口路径一致，这样才能请求成功

![image-20220422110733503](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422110733503.png)



**账号密码是直接写死的，login现在只是用来获取用户信息**

![image-20220422110139164](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422110139164.png)





**2、与后端接口整合**

> 这里说的接口不是interface，而是开发功能的时候就叫开发接口

![image-20220422110323122](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422110323122.png)



**3、测试**

![image-20220423150556447](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423150556447.png)

![image-20220422111445160](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422111445160.png)





### 常见的跨域错误

> 没有写@CrossOrign注解
>
> URL路径不对
>
> 访问请求错误（get，post）前后端是否一致



## 前端框架开发

### 架结构说明

图里没有截取完整，在 main.js中还有

>  **render: h => h(App)	它的作用就是将App汇总组件放入容器中**

```vue
new Vue({

 el: '#app',

 // 使用组件

 router,

 store,

 // 将App组件放入容器中

 render: h => h(App)

})
```



![image-20220422144804071](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422144804071.png)





# 三、前后端整合

## 整合CRUD

### 前后端对接流程

> 我们这里拿查询所有user做实例

全栈开发流程

![image-20220507095959632](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220507095959632.png)

![image-20220422114748269](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422114748269.png)

![image-20220422114444458](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422114444458.png)



#### 添加路由

> 模板中给的其实也有目录，我们看着复制粘贴根据自己的需求改改即可

![image-20220422152026688](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422152026688.png)



#### 点击路由显示页面

> redirect:'/teacher/table'作用是当访问/teacher时会自动跳到/teacher/table
>
> component是做布局的，就是页面做固定不动的部分

![image-20220422152340394](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422152340394.png)



#### 在api文件夹创建js文件，定义接口地址和参数

![image-20220422152930751](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422152930751.png)



#### 创建vue页面引入js文件，调用方法实现功能

> 我们先来了解一下response对象

以下是response对象的属性和方法

所以说，response就是代表接口返回的数据

![image-20220422223516849](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422223516849.png)

​



![image-20220422225856659](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422225856659.png)





在看我们后端定义的接口

![image-20220422224305331](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422224305331.png)





> 这里的scope.row是获取行数据是固定写法

![image-20220422230224393](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422230224393.png)



这样功能就实现了



![image-20220422230800965](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422230800965.png)



==补充下分页条实现方式==

分页条

> 直接拿element-ui里面的来用就可以

因为我分页条和表单在同一页面，所以写在同一组件下

![image-20220422231913492](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422231913492.png)





### 多条件查询

> 直接拿element-ui里面的来用就可以

因为我分页条和表单在同一页面，所以写在同一组件下



**主要是js对象和java对象的问题，注意区分即可**

**其余的也是直接用element-ui组件直接拿过来改改数据**

![image-20220423090900436](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423090900436.png)



有了查询对象之后把查询对象传入我们写的获取讲师列表即可

我们在查询按钮绑定方法

![image-20220423091140995](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423091140995.png)



测试

![image-20220423091221673](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423091221673.png)





### 删除功能

![image-20220423092331661](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423092331661.png)



### 增加功能

![image-20220423095057832](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423095057832.png)



3、定义增加API

![image-20220423095142609](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423095142609.png)





4、引入js，写vue页面

![image-20220423094948248](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423094948248.png)



5、测试

![image-20220423100159283](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423100159283.png)



6、补充

![image-20220423101307100](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423101307100.png)





### 修改功能

> 我们想让增加和修改在同一页面下进行

增加和修改不同点在于，修改要做数据回显



那么如何区分这两个请求呢？

答案是修改的时候地址栏会有id，而保存没有



**定义Api、定义路由、定义跳转路径**

![image-20220423105407052](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423105407052.png)



==修改功能逻辑==

![image-20220423110736418](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423110736418.png)





测试

![image-20220423110820022](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423110820022.png)



修改成功

![image-20220423110833691](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423110833691.png)



#### 修改是用put请求还是post请求？

> idempotent 幂等的

**这两个方法看起来都是讲一个资源附加到服务器端的请求，但其实是不一样的。一些狭窄的意见认为，POST方法用来创建资源，而PUT方法则用来更新资源。**



幂等（idempotent、idempotence）是一个抽象代数的概念。在计算机中，可以这么理解，一个幂等操作的特点就是其任意多次执行所产生的影响均与依次一次执行的影响相同。

POST在请求的时候，服务器会每次都创建一个文件，但是在PUT方法的时候只是简单地更新，而不是去重新创建。因此PUT是幂等的。



举一个简单的例子，假如有一个博客系统提供一个Web API，模式是这样http://superblogging/blogs/post/{blog-name}，很简单，将{blog-name}替换为我们的blog名字，往这个URI发送一个HTTP PUT或者POST请求，HTTP的body部分就是博文，这是一个很简单的REST API例子。我们应该用PUT方法还是POST方法？取决于这个REST服务的行为是否是idempotent的，假如我们发送两个http://superblogging/blogs/post/Sample请求，服务器端是什么样的行为？如果产生了两个博客帖子，那就说明这个服务不是idempotent的，因为多次使用产生了副作用了嘛；如果后一个请求把第一个请求覆盖掉了，那这个服务就是idempotent的。前一种情况，应该使用POST方法，后一种情况，应该使用PUT方法。



## 整合阿里云OSS

> 我们想实现在添加讲师信息的时候加上头像上传功能，怎么办呢？
>
> 用阿里云的OSS对象存储即可

### 环境部署

**首先我们打开阿里云注册个OSS对象存储**

![image-20220423140743003](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423140743003.png)





### Java操作OSS

详细操作可查官方文档，下面只写关键代码

[[SDK示例 (aliyun.com)](https://help.aliyun.com/document_detail/32006.html)](https://help.aliyun.com/document_detail/32008.html)



**1、定义工具类读取配置文件**

> 通过继承InitializingBean
>
> 当项目已启动，spring加载之后，执行接口一个方法。就是afterPropertiesSet
>
> 读取配置文件内容后，在通过执行接口里的一个方法，从而让外面能使用

![image-20220423141537765](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423141537765.png)



**2、编写上传文件接口**

> MultipartFile类是org.springframework.web.multipart包下面的一个类，如果想使用MultipartFile类来进行文件操作，那么一定要引入Spring框架。MultipartFile主要是用表单的形式进行文件上传，在接收到文件时，可以获取文件的相关属性，比如文件名、文件大小、文件类型等等。



我们对着官网实例进行修改

![image-20220413151840052](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220413151840052.png)





![image-20220423143711082](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423143711082.png)



![image-20220423143946687](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423143946687.png)



**3、controller调用接口**

![image-20220423145150551](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423145150551.png)



**4、前端部分**

引入上传图片框也在save页面，所以

![image-20220423151338689](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423151338689.png)



![image-20220423151602576](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423151602576.png)



**5、测试**

![image-20220413153714195](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220413153714195.png)



上传成功

![image-20220416173228178](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416173228178.png)



![image-20220416173356445](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416173356445.png)







### nginx反向代理

> [Nginx快速入门_小蜗牛耶的博客-CSDN博客_nginx 快速入门](https://blog.csdn.net/qq_45714272/article/details/123564368?spm=1001.2014.3001.5502)
>
> 首先知道nginx的配置文件是nginx.config
>
> 其次是nginx的配置文件是可以看成一个http请求处理的
>
> 然后是nginx的server服务。可以理解为每个服务监听不同的端口，分发不同的连接服务。如果是自己的可以直接删掉初始server ，直接新建自己的server。

![image-20220507103254309](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220507103254309.png)



配置文件如下：

```shell
worker_processes  1;
events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
	client_max_body_size 1024m;

    sendfile        on;
    keepalive_timeout  65;
	
    server {
        listen       81;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    
	server {
        listen       9001;    #监听端口号
        server_name  localhost;  #主机名称
        location ~ /eduService/ {  #匹配路径        
            proxy_pass http://localhost:8001;
        }
		location ~ /eduService1/ {  #匹配路径        
            proxy_pass http://localhost:6001;
        }
        location ~ /eduUser/ {
            proxy_pass http://localhost:8001;
        }
        location ~ /eduOss/ {
            proxy_pass http://localhost:8002;
        }
        location ~ /eduVod/ {
            proxy_pass http://localhost:8003;
        }
        location ~ /eduCms/ {
            proxy_pass http://localhost:8004;
        }
        location ~ /ucenterService/ {
            proxy_pass http://localhost:8006;
        }
        location ~ /eduMsm/ {
            proxy_pass http://localhost:8005;
        }
        location ~ /orderService/ {
            proxy_pass http://localhost:8007;
        }
        location ~ /staService/ {
            proxy_pass http://localhost:8008;
        }
        location ~ /admin/ {
            proxy_pass http://localhost:8009;
        }
    }

}

```

![image-20220422104023424](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422104023424.png)



**启动nginx**

![image-20220422104029132](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422104029132.png)



**修改项目访问路径为nginx的ip**

![image-20220422104300215](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422104300215.png)



![image-20220422104207226](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422104207226.png)







## EasyExcel

### 简介

> [alibaba/easyexcel: 快速、简洁、解决大文件内存溢出的java处理Excel工具 (github.com)](https://github.com/alibaba/easyexcel)

1.Java领域解析、生成Excel比较有名的框架有Apache  poi、jxl等。但他们都存在一个严重的问题就是非常的耗内存。如果你的系统并发量不大的话可能还行，但是一旦并发上来后一定会OOM或者JVM频繁的full gc。

2.EasyExcel是阿里巴巴开源的一个excel处理框架，以使用简单、节省内存著称。EasyExcel能大大减 少占用内存的主要原因是在解析Excel时没有将文件数据一次性全部加载到内存中，而是从磁盘上一行行读取数据，逐个解析

3.EasyExcel采用一行一行的解析模式，并将一行的解析结果以观察者的模式通知处理

（AnalysisEventListener）



### 写入测试

![image-20220423161146730](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423161146730.png)

> 引入依赖
>
> <dependency>
>  <groupId>com.alibaba</groupId>
>  <artifactId>easyexcel</artifactId>
>  <version>2.1.1</version>
> </dependency>



![image-20220417104720208](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220417104720208.png)



### 读取测试

![image-20220423160946627](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423160946627.png)



**1、创建实体类和excel对应**

![image-20220423160823600](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423160823600.png)



**2、创建回调监听器**

![image-20220423161031862](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423161031862.png)



**3、直接读**

![image-20220423161100532](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423161100532.png)

![image-20220423161304098](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423161304098.png)



## 整合课程分类

### 实现思路

**1、图解**

树形控件考到前端页面，按需求更改

![image-20220423222349967](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220423222349967.png)



**2、实现Excel表格数据导入数据库功能**

前端找一个上传的组件

后端使用前面学的easyexcel功能来实现



**3、树状图显示数据功能**

前端找一个树状图组件

**后端返回上传的表格数据课程分类集合给前端，传递给组件自动遍历**



### 表格数据导入数据库

> 这个功能用前面学的easyExcel来实现



**1、添加依赖**

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>2.1.6</version>
</dependency>
```



**2、创建excel对应实体类对象**

![image-20220424131826095](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424131826095.png)



**3、通过代码生成器生成课程表代码**

![image-20220424132117470](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424132117470.png)



==**4、创建回调监听器**==

![image-20220424133652715](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424133652715.png)



![image-20220424134204593](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424134204593.png)





**5、自定义接口方法**

![image-20220424132617821](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424132617821.png)



==**实现类完成读取功能**==

![image-20220424132654493](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424132654493.png)



**6、控制类完成调用**

![image-20220424134327972](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424134327972.png)



**7、swagger完成测试**

![image-20220418162110054](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220418162110054.png)

![image-20220418162124144](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220418162124144.png)









### 树状图显示数据

> 树状图由element-ui获取

**1、树状图前端代码结构说明**

![image-20220424142534091](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424142534091.png)



==**2、设计思路**==

给el-tree返回一个集合对象就可以实现遍历

这个集合对象格式是，`{一级分类对象，二级分类对象数组[],一级分类对象，二级分类对象数组[].......}`



**对应到实体类中就是这个形式**

![image-20220424144444120](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424144444120.png)



==**3、返回集合对象**==

> 在数据库中查询通过表格上传的数据，返回为集合对象

![image-20220424150242288](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424150242288.png)



**源码也放下来，供大家理解**

```java
@Service
public class EduSubjectServiceImpl extends ServiceImpl<EduSubjectMapper, EduSubject> implements EduSubjectService {

    //添加课程分类
    @Override
    public void saveSubject(MultipartFile file, EduSubjectService subjectService) {

        try {
            //文件输入流
            InputStream in = file.getInputStream();

            //调用方法进行读取
            EasyExcel.read(in, SubjectData.class, new SubjectExcelListener(subjectService)).sheet().doRead();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<OneSubject> getAllOneTwoSubject() {
        //查询所有一级分类 parentid=0
        QueryWrapper<EduSubject> wrapperOne = new QueryWrapper<>();
        wrapperOne.eq("parent_id", "0");
        List<EduSubject> oneSubjectList = baseMapper.selectList(wrapperOne);
//        this.list()也可以通过这种方式调用查询。


        //查询所有二级分类 parentid!=0
        QueryWrapper<EduSubject> wrapperTwo = new QueryWrapper<>();
        wrapperOne.ne("parent_id", "0");
        List<EduSubject> twoSubjectList = baseMapper.selectList(wrapperTwo);


        //创建list集合，用于存放最终封装的数据
        List<OneSubject> finalSubjectList = new ArrayList<>();
        //封装一级分类
        //查询出来所有的一级分类list集合遍历，得到每一级分类对象，获得每个一级分类对象值
        //封装到要求的list集合里面
        for (int i = 0; i < oneSubjectList.size(); i++) {
            EduSubject eduSubject = oneSubjectList.get(i);
            OneSubject oneSubject = new OneSubject();
//            oneSubject.setId(eduSubject.getId());
//            oneSubject.setTitle(eduSubject.getTitle());
            //把eduSubject值复制到对应的oneSubject对象里面，两个对象里面的属性相同对应的的自动赋值
            BeanUtils.copyProperties(eduSubject, oneSubject);

            //在一级分类循环遍历查询所有的二级分类
            //创建list集合封装每个一级分类的二级分类
            List<TwoSubject> twoFinalSubjectList = new ArrayList<>();
            //遍历二级分类list集合
            for (int j = 0; j < twoSubjectList.size(); j++) {
                EduSubject tSubject = twoSubjectList.get(j);
                //如果二级分类的parentid和一级分类的id一样，就把它加入到一级分类
                if (tSubject.getParentId().equals(eduSubject.getId())) {
                    TwoSubject twoSubject = new TwoSubject();
                    BeanUtils.copyProperties(tSubject, twoSubject);
                    twoFinalSubjectList.add(twoSubject);
                }
            }
            //把一级下面所有的二级分类放到一级分类里面
            oneSubject.setChildren(twoFinalSubjectList);
            finalSubjectList.add(oneSubject);
        }
        return finalSubjectList;
    }
}
```



**4、控制类调用接口返回集合**

![image-20220424150518771](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424150518771.png)



**5、Swagger测试**

![image-20220424151956364](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424151956364.png)





> ==加黑的小标题就是前后端整合的过程==

**1、定义路由、跳转页面**

![image-20220424134831992](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424134831992.png)





**2、定义API**

> ==定义的API就是后端写好的接口==

![image-20220424151041047](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424151041047.png)





**3、添加上传组件**

> element-ui找

![image-20220424135411929](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424135411929.png)



**组件参数说明**

template部分

![image-20220424140408463](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424140408463.png)



![image-20220424140713207](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424140713207.png)





数据部分

![image-20220424151144520](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424151144520.png)





**4、测试**

![image-20220424151351016](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424151351016.png)



![image-20220424151432184](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424151432184.png)





### 树形数据与懒加载

![image-20220507194709416](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220507194709416.png)



## 整合课程发布

### 实现思路

**1、图解**

![04-课程发布流程的说明](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/04-%E8%AF%BE%E7%A8%8B%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B%E7%9A%84%E8%AF%B4%E6%98%8E.png)

**2、获取步骤条**

![image-20220424155553991](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424155553991.png)





**3、代码思路**

写三个vue组件，每个组件根据需要自定义内容





### 课程基本信息

#### 实现效果

![image-20220425224223717](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425224223717.png)



#### 后端编码

**提前生成课程相关表**

> 通过代码生成器生成一键生成

![image-20220424155426823](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424155426823.png)



**1、创建vo封装每个步骤提交的数据**

![image-20220424161815851](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424161815851.png)



课程描述类id和课程类id是一样的，所以我们提前设置好

![image-20220424162316730](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424162316730.png)



**2、service**

定义添加课程方法

![image-20220424163900392](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424163900392.png)



**3、controller**

调用添加课程方法

![image-20220424164903170](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424164903170.png)



#### 前端编码

**1、添加路由，做页面跳转**

> 隐藏路由的目的是用来跳转步骤条

![image-20220424164135055](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424164135055.png)



**2、定义API**

![image-20220424164345506](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424164345506.png)



**3、编写Vue页面**

引入步骤条和表单

![image-20220424164445694](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424164445694.png)





==显示所有讲师列表==

> ：label表示的是下拉列表的名字的名字
>
> ：value是此表单提交时名字对应的teacherid也会被提交

![image-20220424201955347](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424201955347.png)



![image-20220424202931383](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424202931383.png)







==二级联动==

> 这是重点！！！

![image-20220424205837357](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424205837357.png)

bug提示：

==其中this.courseInfo.subjectId要在每次一级分类的时候进行清空==







==整合文本编辑器==

![image-20220424194815407](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424194815407.png)



==封面上传==

![image-20220424213838425](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220424213838425.png)



#### 数据回显

![image-20220425171037081](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425171037081.png)



![image-20220425172447908](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425172447908.png)





### 课程大纲

#### 实现效果

![image-20220425224307554](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425224307554.png)



#### 后端编码

写后端接口处理数据

分别是章节相关的，小节相关的

![image-20220425222906250](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425222906250.png)



![image-20220425223022818](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425223022818.png)



==查询所有章节和小节方法==

> 再次理解

![image-20220425225239707](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425225239707.png)



#### 前端编码

添加，修改之前我们使用的是跳到一个具体的页面

这次我们使用弹框，在弹框内进行操作

**这里我们使用element-ui中的Dialog**

![image-20220425191650837](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425191650837.png)



前端定义API

![image-20220425223058501](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425223058501.png)



==增加章节==

编码思路：

1. 点击添加，出现弹框
2. 填写内容，提交表单
3. 刷新页面，展示数据

![image-20220425223602232](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425223602232.png)





==修改章节==

1. 点击修改，出现弹框
2. 回显数据，修改提交
3. 刷新页面，展示数据

![image-20220425223841747](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425223841747.png)







==章节删除==

获取id，按id删除

![image-20220425224638149](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425224638149.png)





==小节增加删除修改==

同上，不在一一截取

![image-20220425230650453](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425230650453.png)





![image-20220425230926964](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220425230926964.png)





### 课程最终发布

#### 实现效果

![image-20220510161305923](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510161305923.png)





#### 后端编码

后端主要是做数据回显了，如下：

> 1. 根据id查询课程发布信息
> 2. 根据id发布课程



**1、根据id查询课程发布信息**

方式一：业务层组装多个表多次的查询结果

方式二：数据访问层进行关联查询

我们使用第二种方式实现



定义VO

![image-20220510161824144](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510161824144.png)



dao

![image-20220510162149394](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510162149394.png)



![image-20220510162325062](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510162325062.png)



业务层

![image-20220510163427642](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510163427642.png)





**2、根据id发布课程**

```
@PostMapping("publishCourse/{id}")
public R publishCourse(@PathVariable String id) {
    EduCourse eduCourse = new EduCourse();
    eduCourse.setId(id);
    eduCourse.setStatus("Normal");//设置课程发布状态
    courseService.updateById(eduCourse);
    return R.ok();
}
```





#### 前端编码

1、定义API

![image-20220510163629570](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510163629570.png)





2、写页面

![image-20220510163754020](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510163754020.png)



![image-20220510164015109](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510164015109.png)



![image-20220510164121852](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510164121852.png)







3、显示课程发布的信息

> 和前面显示讲师类似，不详细说明

![image-20220510164417238](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510164417238.png)



Ending.......



## 整合视频点播

### 简介

https://blog.csdn.net/qq_33857573/article/details/79564255

视频点播（ApsaraVideo for VoD）是集音视频采集、编辑、上传、自动化转码处理、媒体资源管理、分发加速于一体的一站式音视频点播解决方案。

![img](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/030a7226-1f25-4c7d-9d52-91160bf35c89.png)



应用场景

- 音视频网站：无论是初创视频服务企业，还是已拥有海量视频资源，可定制化的点播服务帮助客户快速搭建拥有极致观看体验、安全可靠的视频点播应用。
- 短视频：集音视频拍摄、特效编辑、本地转码、高速上传、自动化云端转码、媒体资源管理、分发加速、播放于一体的完整短视频解决方案。目前已帮助1000+APP快速实现手机短视频功能。
- 直播转点播：将直播流同步录制为点播视频，用于回看。并支持媒资管理、媒体处理（转码及内容审核/智能首图等AI处理）、内容制作（云剪辑）、CDN分发加速等一系列操作。
- 在线教育：为在线教育客户提供简单易用、安全可靠的视频点播服务。可通过控制台/API等多种方式上传教学视频，强大的转码能力保证视频可以快速发布，覆盖全网的加速节点保证学生观看的流畅度。防盗链、视频加密等版权保护方案保护教学内容不被窃取。
- 视频生产制作：提供在线可视化剪辑平台及丰富的OpenAPI，帮助客户高效处理、制作视频内容。除基础的剪切拼接、混音、遮标、特效、合成等一系列功能外，依托云剪辑及点播一体化服务还可实现标准化、智能化剪辑生产，大大降低视频制作的槛，缩短制作时间，提升内容生产效率。
- 内容审核：应用于短视频平台、传媒行业审核等场景，帮助客户从从语音、文字、视觉等多维度精准识别视频、封面、标题或评论的违禁内容进行AI智能审核与人工审核。



#### 功能介绍

> 我们把视频点播服务加到我们的课程发布中
>
> 更详细说明可看官方文档
>
> [视频点播 (aliyun.com)](https://help.aliyun.com/product/29932.html?spm=a2c4g.11186623.6.540.3c356a58OEmVZJ)



[![产品功能](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/0.8804617085856941.png)](http://docs-aliyun.cn-hangzhou.oss.aliyun-inc.com/assets/pic/85506/cn_zh/1542030629145/产品功能.png)





#### 基本使用

![image-20220510170254006](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510170254006.png)



#### 上传视频

**1、简介**

sdk的方式将api进行了进一步的封装，不用自己创建工具类。

我们可以基于服务端SDK编写代码来调用点播API，实现对点播产品和服务的快速操作



**2、功能介绍**

- SDK封装了对API的调用请求和响应，避免自行计算较为繁琐的 API签名。
- 支持所有点播服务的API，并提供了相应的示例代码。
- 支持7种开发语言，包括：Java、Python、PHP、.NET、Node.js、Go、C/C++。
- 通常在发布新的API后，我们会及时同步更新SDK，所以即便您没有找到对应API的示例代码，也可以参考旧的示例自行实现调用。



**3、安装**

![image-20220510170451321](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510170451321.png)



![image-20220510170710250](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510170710250.png)



**4、调用上传视频API**

![image-20220510192228809](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510192228809.png)





#### 获取视频播放地址

> 同样是获取API

![image-20220510192424493](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510192424493.png)



### 整合

#### 后端编码

> 建module，改pom，yml，启动类，业务类

这里用的是properties，也可以改成yml形式

![image-20220510192701738](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510192701738.png)





**启动类**

![image-20220510192736965](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510192736965.png)





**常量类**

![image-20220510192857284](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510192857284.png)



**service**

![image-20220510195108714](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510195108714.png)



**控制类**

![image-20220510193435686](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510193435686.png)



启动微服务，先用swagger测试一下在整合前端即可



#### 前端编码

> 因为所有微服务前面我们用了nginx做反向代理，
>
> 所以第一件事就是加上vod微服务请求路径，
>
> 第二是要改变nginx允许上传最大body大小改成1G，
>
> 第三重启

![image-20220510193602204](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510193602204.png)



**二、上传视频组件**

![image-20220510193822641](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510193822641.png)





![image-20220510194110379](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510194110379.png)





## 整合SpringCloud

> 简介
>
> [Spring全家桶--SpringCloud（初级）_小蜗牛耶的博客-CSDN博客_springcloud开源项目](https://blog.csdn.net/qq_45714272/article/details/123699797?spm=1001.2014.3001.5502)
>
> [Spring全家桶--SpringCloud（中级）_小蜗牛耶的博客-CSDN博客_springcloud](https://blog.csdn.net/qq_45714272/article/details/123797260?spm=1001.2014.3001.5502)
>
> [Spring全家桶--SpringCloud（高级）_小蜗牛耶的博客-CSDN博客](https://blog.csdn.net/qq_45714272/article/details/123915679?spm=1001.2014.3001.5502)



下面我们就简单的接受下

### 微服务简介

**1、微服务的由来**

微服务最早由Martin Fowler与James Lewis于2014年共同提出，微服务架构风格是一种使用一套小服务来开发单个应用的方式途径，每个服务运行在自己的进程中，并使用轻量级机制通信，通常是HTTP API，这些服务基于业务能力构建，并能够通过自动化部署机制来独立部署，这些服务使用不同的编程语言实现，以及不同数据存储技术，并保持最低限度的集中式管理。



**2、为什么需要微服务**

在传统的IT行业软件大多都是各种独立系统的堆砌，这些系统的问题总结来说就是扩展性差，可靠性不高，维护成本高。到后面引入了SOA服务化，但是，由于 SOA 早期均使用了总线模式，这种总线模式是与某种技术栈强绑定的，比如：J2EE。这导致很多企业的遗留系统很难对接，切换时间太长，成本太高，新系统稳定性的收敛也需要一些时间。



**3、微服务与单体架构区别**

（1）单体架构所有的模块全都耦合在一块，代码量大，维护困难。

​     微服务每个模块就相当于一个单独的项目，代码量明显减少，遇到问题也相对来说比较好解决。

（2）单体架构所有的模块都共用一个数据库，存储方式比较单一。

​     微服务每个模块都可以使用不同的存储方式（比如有的用redis，有的用mysql等），数据库也是单个模块对应自己的数据库。

（3）单体架构所有的模块开发所使用的技术一样。

​     微服务每个模块都可以使用不同的开发技术，开发模式更灵活。



**4、微服务本质**

（1）微服务，关键其实不仅仅是微服务本身，而是系统要提供一套基础的架构，这种架构使得微服务可以独立的部署、运行、升级，不仅如此，这个系统架构还让微服务与微服务之间在结构上“松耦合”，而在功能上则表现为一个统一的整体。这种所谓的“统一的整体”表现出来的是统一风格的界面，统一的权限管理，统一的安全策略，统一的上线过程，统一的日志和审计方法，统一的调度方式，统一的访问入口等等。
（2）微服务的目的是有效的拆分应用，实现敏捷开发和部署 。
（3）微服务提倡的理念团队间应该是 inter-operate, not integrate 。inter-operate是定义好系统的边界和接口，在一个团队内全栈，让团队自治，原因就是因为如果团队按照这样的方式组建，将沟通的成本维持在系统内部，每个子系统就会更加内聚，彼此的依赖耦合能变弱，跨系统的沟通成本也就能降低。


**5、什么样的项目适合微服务**

微服务可以按照业务功能本身的独立性来划分，如果系统提供的业务是非常底层的，如：操作系统内核、存储系统、网络系统、数据库系统等等，这类系统都偏底层，功能和功能之间有着紧密的配合关系，如果强制拆分为较小的服务单元，会让集成工作量急剧上升，并且这种人为的切割无法带来业务上的真正的隔离，所以无法做到独立部署和运行，也就不适合做成微服务了。



**6、微服务开发框架**

目前微服务的开发框架，最常用的有以下四个：

Spring Cloud：http://projects.spring.io/spring-cloud（现在非常流行的微服务架构）

Dubbo：http：//dubbo.io

Dropwizard：http://www.dropwizard.io （关注单个微服务的开发）

Consul、etcd&etc.（微服务的模块）



**7、什么是Spring Cloud**

Spring Cloud是一系列框架的集合。它利用Spring Boot的开发便利性简化了分布式系统基础设施的开发，如服务发现、服务注册、配置中心、消息总线、负载均衡、 熔断器、数据监控等，都可以用Spring Boot的开发风格做到一键启动和部署。Spring并没有重复制造轮子，它只是将目前各家公司开发的比较成熟、经得起实际考验的服务框架组合起来，通过SpringBoot风格进行再封装屏蔽掉了复杂的配置和实现原理，最终给开发者留出了一套简单易懂、易部署和易维护的分布式系统开发工具包



**8、Spring Cloud和Spring Boot是什么关系**

Spring Boot 是 Spring 的一套快速配置脚手架，可以基于Spring Boot 快速开发单个微服务，Spring Cloud是一个基于Spring Boot实现的开发工具；Spring Boot专注于快速、方便集成的单个微服务个体，Spring Cloud关注全局的服务治理框架； Spring Boot使用了默认大于配置的理念，很多集成方案已经帮你选择好了，能不配置就不配置，Spring Cloud很大的一部分是基于Spring Boot来实现，必须基于Spring Boot开发。可以单独使用Spring Boot开发项目，但是Spring Cloud离不开 Spring Boot。



**9、Spring Cloud相关基础服务组件**

服务发现——Netflix Eureka （Nacos）

服务调用——Netflix Feign

熔断器——Netflix Hystrix

服务网关——Spring Cloud GateWay

分布式配置——Spring Cloud Config  （Nacos）

消息总线 —— Spring Cloud Bus （Nacos）



**10、Spring Cloud的版本**

Spring Cloud并没有熟悉的数字版本号，而是对应一个开发代号。

| Cloud代号 | Boot版本(train) | Boot版本(tested)      | lifecycle        |
| --------- | --------------- | --------------------- | ---------------- |
| Angle     | 1.2.x           | incompatible with 1.3 | EOL in July 2017 |
| Brixton   | 1.3.x           | 1.4.x                 | 2017-07卒        |
| Camden    | 1.4.x           | 1.5.x                 | -                |
| Dalston   | 1.5.x           | not expected 2.x      | -                |
| Edgware   | 1.5.x           | not expected 2.x      | -                |
| Finchley  | 2.0.x           | not expected 1.5.x    | -                |
| Greenwich | **2.1.x**       |                       |                  |
| Hoxton    | 2.2.x           |                       |                  |

开发代号看似没有什么规律，但实际上首字母是有顺序的，比如：Dalston版本，我们可以简称 D 版本，对应的 Edgware 版本我们可以简称 E 版本。



**小版本**

Spring Cloud 小版本分为:

SNAPSHOT： 快照版本，随时可能修改

M： MileStone，M1表示第1个里程碑版本，一般同时标注PRE，表示预览版版。

SR： Service Release，SR1表示第1个正式版本，一般同时标注GA：(GenerallyAvailable),表示稳定版本。



### Nacos

**（1）Nacos是什么**

Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。



**（2）常见的注册中心：**

1. Eureka（原生，2.0遇到性能瓶颈，停止维护）

2. Zookeeper（支持，专业的独立产品。例如：dubbo）

3. Consul（原生，GO语言开发）

4. Nacos

相对于 Spring Cloud Eureka 来说，Nacos 更强大。**Nacos = Spring Cloud Eureka + Spring Cloud Config**

Nacos 可以与 Spring, Spring Boot, Spring Cloud 集成，并能代替 Spring Cloud Eureka, Spring Cloud Config

\- 通过 Nacos Server 和 spring-cloud-starter-alibaba-nacos-discovery 实现服务的注册与发现。



**（3）Nacos功能**

Nacos是以服务为主要服务对象的中间件，Nacos支持所有主流的服务发现、配置和管理。

Nacos主要提供以下四大功能：

1. 服务发现和服务健康监测

2. 动态配置服务

3. 动态DNS服务

4. 服务及其元数据管理



**（4）Nacos结构图**

![img](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/6e5b55f7-3252-4dea-81e9-e0ffd86987b4.jpg)

**安装**

解压安装包，进入cmd运行nacos即可

![image-20220510223828607](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510223828607.png)



![image-20220510223910128](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510223910128.png)



### 服务注册

我们把后面要用的service-edu、service-oss、service-vod都加入到nacos中

怎么加呢？



**1、配置依赖**

```
<!--服务注册-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```



**2、添加服务配置信息**

![image-20220510224731899](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510224731899.png)



**3、添加Nacos客户端注解**

在客户端微服务启动类中添加注解

![image-20220510224819651](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510224819651.png)



**4、启动客户端微服务**

启动注册中心

启动已注册的微服务，可以在Nacos服务列表中看到被注册的微服务

![image-20220510224855455](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510224855455.png)



### 服务调用-Feign

> feign
> 英 [feɪn] 美 [feɪn]
> v. 假装，装作，佯装(有某种感觉或生病、疲倦等)

Feign是一个声明式WebService客户端。使用Feign能让编写Web Service客户端更加简单。它的使用方法是定义一个服务接口然后在上面添加注解。Feign也支持可拔插式的编码器和解码器。Spring Cloud对Feign进行了封装，使其支持了Spring MVC标准注解和HttpMessageConverters。Feign可以与Eureka和Ribbon组合使用以支持负载均衡。



#### Web Service

分布式的调用服务，多个客户端可以通过web配置来调用发布的服务。

例如：微服务A想调用微服务B，要想实现这个功能就要使用WebService

WebServic 很重要，但不被经常使用，它更多的是一种分布服务的方式，所以对它了解就好了。



Web 服务端提供的是服务或功能，继面向对象后，面向服务形成了新的特色。例如请求天气预报服务，如今很多手机、小网站等小成本的经营者都可以进行天气的预报，这是因为气象站将天气的预报的服务发布了出去，只要符合一定条件就都可以调用这个服务。简单说就是web服务就是一个URL资源，客户端可以调用这个服务。





#### 后端编码

删除课时的同时删除云端视频

> 哎，这不就出现了微服务之间互相调用的情况了吗

**1、pom文件**

> 引用feign实现远程调用

![image-20220510232341831](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510232341831.png)



**2、调用端的启动类添加注解**

> feign 是通过接口+注解实现微服务调用

消费者添加@EnableFeignClients开启feign

![image-20220510232544149](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510232544149.png)



**3、创建包和接口**

> 业务逻辑接口+@FeignClient配置调用provider服务

创建client包

@FeignClient注解用于指定从哪个服务中调用功能 ，名称与被调用的服务名保持一致。

@GetMapping注解用于对被调用的微服务进行地址映射。

@PathVariable注解一定要指定参数名称，否则出错

@Component注解防止，在其他位置注入CodClient时idea报错

![image-20220510233110255](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510233110255.png)



前提是我们vod微服务中批量删除是可以用的

![image-20220511091241884](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220511091241884.png)





**4、调用微服务**

> 课程微服务调用视频微服务
>
> 目的是删除课程同时删除视频

**1、注入vod微服务中删除视频接口vodClient**



![image-20220510233845586](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220510233845586.png)



**2、具体流程**

![image-20220511103602090](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220511103602090.png)



#### 前端编码

还是和前面一样，我们每次点击添加小节弹框要清空

```vue
//添加小节弹框的方法
openVideo(chapterId) {
//弹框
this.dialogVideoFormVisible = true;
//清空
this.video = {};
this.fileList = [];
//设置章节id
this.video.chapterId = chapterId;
},
```



这次我们多添加几个小节来测试能不能同时删除

![image-20220511104724517](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220511104724517.png)

![image-20220511104714683](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220511104714683.png)



发布课程后删除课程，看视频点播还有没有视频

![image-20220511104736929](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220511104736929.png)







![image-20220511105602352](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220511105602352.png)



### 服务熔断-Hystrix

Spring Cloud 在接口调用上，大致会经过如下几个组件配合：

> 接口调用的流程很重要，我们一定要理解
>
> 自己用过这些组件的话还是很好理解的

**`Feign` ----->`Hystrix` —>`Ribbon` —>`Http Client`（apache http components 或者 Okhttp）`** 具体交互流程上，如下图所示：

![img](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/d5be6f27-caff-45b6-8f27-837ea6b11134.jpg)



**（1）接口化请求调用**当调用被`@FeignClient`注解修饰的接口时，在框架内部，将请求转换成Feign的请求实例`feign.Request`，交由Feign框架处理。

**（2）Feign** ：转化请求Feign是一个http请求调用的轻量级框架，可以以Java接口注解的方式调用Http请求，封装了Http调用流程。

**（3）Hystrix**：熔断处理机制 Feign的调用关系，会被Hystrix代理拦截，对每一个Feign调用请求，Hystrix都会将其包装成`HystrixCommand`,参与Hystrix的流控和熔断规则。如果请求判断需要熔断，则Hystrix直接熔断，抛出异常或者使用`FallbackFactory`返回熔断`Fallback`结果；如果通过，则将调用请求传递给`Ribbon`组件。

**（4）Ribbon**：服务地址选择 当请求传递到`Ribbon`之后,`Ribbon`会根据自身维护的服务列表，根据服务的服务质量，如平均响应时间，Load等，结合特定的规则，从列表中挑选合适的服务实例，选择好机器之后，然后将机器实例的信息请求传递给`Http Client`客户端，`HttpClient`客户端来执行真正的Http接口调用；

**（5）HttpClient** ：Http客户端，真正执行Http调用根据上层`Ribbon`传递过来的请求，已经指定了服务地址，则HttpClient开始执行真正的Http请求



#### Hystrix（豪猪哥）

Hystrix 是一个供分布式系统使用，提供延迟和容错功能，保证复杂的分布系统在面临不可避免的失败时，仍能有其弹性。

比如系统中有很多服务，当某些服务不稳定的时候，使用这些服务的用户线程将会阻塞，如果没有隔离机制，系统随时就有可能会挂掉，从而带来很大的风险。SpringCloud使用Hystrix组件提供断路器、资源隔离与自我修复功能。下图表示服务B触发了断路器，==阻止了级联失败==

![img](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/59809c07-0923-4546-aa83-ed920f53a3a5.jpg)





#### feign结合Hystrix使用

**1、添加依赖**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
</dependency>

<!--hystrix依赖，主要是用  @HystrixCommand -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>

<!--服务注册-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<!--服务调用-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```



**2、配置文件中添加hystrix配置**

![image-20220511110835088](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220511110835088.png)



**3、在service-edu的client包里面创建熔断器的实现类**

![image-20220511111356527](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220511111356527.png)



**4、测试熔断器效果**

我们模拟视频点播微服务宕机了，我们再去调用它，看看会不会触发hystrix

![image-20220511111642364](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220511111642364.png)



debug启动edu服务，关闭vod服务，会触发熔断器

![image-20220428112639643](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220428112639643.png)



