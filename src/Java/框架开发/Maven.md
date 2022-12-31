---
title: Maven
---
**GroupId（俗称：包结构）、ArtifactId（俗称：项目名）**

![image-20220113111548180](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113111548180.png)



**自行设置**

![image-20220113111616611](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113111616611.png)



## tomcat插件安装，启动web项目

![image-20220113113413392](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113113413392.png)



![image-20220113113137055](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113113137055.png)



## 简便启动maven工程

![image-20220113113647374](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113113647374.png)





## pom文件的参数详解

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!-- $Id: pom.xml 642118 2008-03-28 08:04:16Z reinhard $ -->
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

<!--    指定pom的模型版本-->
    <modelVersion>4.0.0</modelVersion>
<!--    打包方式，web工程打包为war，java工程打包为jar-->
    <packaging>war</packaging>

<!--    组织id-->
    <groupId>com.caq</groupId>
<!--    项目id-->
    <artifactId>web</artifactId>
<!--    版本号：release完整版，snapshot开发版-->
    <version>1.0-SNAPSHOT</version>

<!--    设置当前工程的所有依赖-->
    <dependencies>
<!--        具体的依赖-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

<!--
    使用maven构建的项目可以直接使用maven build完成项目的编译、测试、打包，无需额外配置。
build标签描述了如何编译及打包项目，具体的编译和打包工作是通过其中的plugin配置来实现的。当然，plugin不是必须的，即使不添加默认也会引入以下插件：

    -->
    <build>
<!--        设置插件-->
        <plugins>
<!--            设置具体的插件-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.1</version>
                <configuration>
                    <port>80</port>
                    <path>/</path>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```





## 依赖传递

![image-20220113121135632](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113121135632.png)



## 可选依赖

![image-20220113131742481](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113131742481.png)

## 排除依赖

排除依赖指主动断开依赖的资源，被排除的资源无需指定版本――不需要





![image-20220113131137661](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113131137661.png)

![image-20220113131514267](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113131514267.png)







**依赖传过来，你不想用，用排除依赖**

**你不想让别人看见你的依赖用可选依赖**







## 依赖范围

![image-20220113132740891](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113132740891.png)





## 依赖范围传递性

![image-20220113133605920](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113133605920.png)

![image-20220113133056454](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113133056454.png)





## 生命周期与插件

![image-20220113154557542](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113154557542.png)



![image-20220113160132746](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220113160132746.png)



**插件在生命周期中执行特定的功能**





## maven依赖问题

==出现错误，检查是否缺包，不缺包检查scope==
