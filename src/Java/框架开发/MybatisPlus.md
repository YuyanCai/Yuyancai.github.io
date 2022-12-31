---
title: MybatisPlus框架
---
# 一、简介

[MyBatis-Plus (opens new window)](https://github.com/baomidou/mybatis-plus)（简称 MP）是一个 [MyBatis (opens new window)](https://www.mybatis.org/mybatis-3/)的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

> mybatis-plus能够简化开发，提高效率

这个蓝色的胖鸟就是plus啦~

![image-20220216223900535](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220216223900535.png)



**Mybatis支持很多数据库如常用的mysql, oracle, DB2, H2, HSQL, SQLite，PostgreSQL，SQLServer**等等



**框架架构**

![image-20220217113013693](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220217113013693.png)







## 1.1 快速入门

建立数据库插入内容进行测试

我们就用官网上的例子来测试

内容如下：

![image-20220217113336790](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220217113336790.png)



### 1.1.1 添加依赖

> 我们创建SpringBoot工程，导入相关依赖
>
> mybatis-plus-boot-starter

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.pyy.mp</groupId>
    <artifactId>mp</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>mp</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.0.5</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```



### 1.1.2 配置

编写mysql数据源信息

```yml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://localhost:3306/mybatis-plus?useSSL=false&useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
    driver-class-name: com.mysql.cj.jdbc.Driver

mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```



编写实体类

```java
package com.pyy.mp.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```



编写Mapper接口继承BaseMapper

> @Repository和@Controller、@Service、@Component的作用差不多，都是把对象交给spring管理。
>
> @Repository用在持久层的接口上，这个注解是将接口的一个实现类交给spring管理。

```java
package com.pyy.mp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pyy.mp.pojo.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMapper extends BaseMapper<User> {

}
```



**在SpringBoot启动类中添加MapperScan注解扫描Mapper类**

> 因为MP是第三方技术，要和Spring整合的话需要交给Spring来管理。所以一定要加@MapperScan注解在SB启动类上

```java
package com.pyy.mp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.pyy.mp")
@SpringBootApplication
public class MpApplication {

    public static void main(String[] args) {
        SpringApplication.run(MpApplication.class, args);
    }

}
```





### 1.1.3 测试

> 语法糖：用简介的写法表达逻辑
>
> 成语：用简介的词语表示句意

```java
package com.pyy.mp;

import com.pyy.mp.mapper.UserMapper;
import com.pyy.mp.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
class MpApplicationTests {

//    继承了BaseMapper，所有的方法都来自自己的父类
    @Autowired
    private UserMapper userMapper;


    @Test
    void contextLoads() {
//        参数是一个weapper，条件构造器，这里我们先不用。写成null
        List<User> users = userMapper.selectList(null);
//        ::的写法
//        users.forEach(System.out::println);

//        循环的写法
//        for (User user : users) {
//            System.out.println(user);
//        }

//        lambda表达式的写法
        users.forEach(a->{
            System.out.println(a);
        });
    }
}
```



结果如下

![image-20220217114425093](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220217114425093.png)

入门结束，可以看出Mybatis-plus真的很简单，连映射文件sql语句都不用写，只需要引入 **starter 工程**，并**配置 mapper 扫描路径**即可

# 二、核心功能

## 2.1 通用CRUD

> 我们通过继承BaseMapper就可以获取到通用的CRUD操作

![image-20220218155240284](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220218155240284.png)



### 2.1.1 插入操作

> 插入操作很简单，做好数据库字段与实体类属性的对应
>
> 之后调用通用CRUD中的插入操作

数据库字段如下：

![image-20220218163455042](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220218163455042.png)



实体类如下：

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @TableId(type = IdType.INPUT)
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```



测试

```java
@SpringBootTest
class MpApplicationTests {

//    继承了BaseMapper，所有的方法都来自自己的父类
    @Autowired
    private UserMapper userMapper;


@Test
public void testInsert(){
    User pyy = new User();
    pyy.setId(6L);
    pyy.setName("A");
    pyy.setAge(3);
    pyy.setEmail("A@qq.cn");
    int result = userMapper.insert(pyy);
    System.out.println(result);
    System.out.println(pyy);
}
    
    
结果如下：
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6ed16657] was not registered for synchronization because synchronization is not active
JDBC Connection [HikariProxyConnection@1942612200 wrapping com.mysql.cj.jdbc.ConnectionImpl@de8039f] will not be managed by Spring
==>  Preparing: INSERT INTO user ( id, name, age, email ) VALUES ( ?, ?, ?, ? ) 
==> Parameters: 6(Long), A(String), 3(Integer), A@qq.cn(String)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6ed16657]
1
User(id=6, name=A, age=3, email=A@qq.cn)
```



#### **@TableField** 

> @TableField注解可以指定字段的一些属性，能解决的问题有两个：
>
> 1. 对象中的属性名和字段名不一致问题（非驼峰）
> 2. 对象中属性字段在表中不存在



| 属性   | 类型    | 必须指定 | 默认值 | 描述                 |
| :----- | :------ | :------- | :----- | :------------------- |
| value  | String  | 否       | ""     | 数据库字段名         |
| exist  | boolean | 否       | true   | 是否为数据库表字段   |
| select | boolean | 否       | true   | 是否进行 select 查询 |



测试

```java
实体类
package com.pyy.mp.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("user")//表名注解，标识实体类对应的表
public class User {

    @TableId(type = IdType.INPUT)
    private Long id;
    private String name;
    @TableField(value = "age")
    private Integer aage;
    @TableField(select = false)//select不查询这个字段
    private String email;
    @TableField(exist = false)
    private String noexist;

}


测试类
@SpringBootTest
class MpApplicationTests {

//    继承了BaseMapper，所有的方法都来自自己的父类
    @Autowired
    private UserMapper userMapper;


    @Test
    void contextLoads() {
//        参数是一个weapper，条件构造器，这里我们先不用。写成null
        List<User> users = userMapper.selectList(null);
//        ::的写法
//        users.forEach(System.out::println);

//        循环的写法
//        for (User user : users) {
//            System.out.println(user);
//        }

//        lambda表达式的写法
        users.forEach(a->{
            System.out.println(a);
        });
    }

测试结果
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@7979b8b7] was not registered for synchronization because synchronization is not active
JDBC Connection [HikariProxyConnection@1766122814 wrapping com.mysql.cj.jdbc.ConnectionImpl@52e04737] will not be managed by Spring
==>  Preparing: SELECT id,name,age AS aage FROM user 
==> Parameters: 
<==    Columns: id, name, aage
<==        Row: 1, Jone, 18
<==        Row: 2, Jack, 20
<==        Row: 3, Tom, 28
<==        Row: 4, Sandy, 21
<==        Row: 5, Billie, 24
<==        Row: 6, A, 3
<==      Total: 6
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@7979b8b7]
User(id=1, name=Jone, aage=18, email=null, noexist=null)
User(id=2, name=Jack, aage=20, email=null, noexist=null)
User(id=3, name=Tom, aage=28, email=null, noexist=null)
User(id=4, name=Sandy, aage=21, email=null, noexist=null)
User(id=5, name=Billie, aage=24, email=null, noexist=null)
User(id=6, name=A, aage=3, email=null, noexist=null)
```







### 2.1.2 更新操作

> 在MP中更新有两种方式，一种是根据id更新，一种是根据条件更新
>
> QueryWrapper：
>
> 继承自 AbstractWrapper ,自身的内部属性 entity 也用于生成 where 条件
>
> **--------------------------------------------------------------------------分割线--------------------------------------------------------------**
>
> UpdateWrapper
>
> 继承自 `AbstractWrapper` ,自身的内部属性 `entity` 也用于生成 where 条件及 `LambdaUpdateWrapper`, 可以通过 `new UpdateWrapper().lambda()` 方法获取!



#### **根据id更新**

```java
    @Test
    public void testUpdate1() {

        User user = new User();
        //更新的字段
        user.setId(6L);
        user.setAge(14);
        user.setName("DDD");
        int i = userMapper.updateById(user);
        System.out.println(i);
    }
    
   Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@5e65afb6] was not registered for synchronization because synchronization is not active
JDBC Connection [HikariProxyConnection@1012776440 wrapping com.mysql.cj.jdbc.ConnectionImpl@352c44a8] will not be managed by Spring
==>  Preparing: UPDATE user SET name=?, age=? WHERE id=? 
==> Parameters: DDD(String), 14(Integer), 6(Long)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@5e65afb6]
1 
```





#### **根据条件更新**

```java
package com.pyy.mp.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @TableId(type = IdType.INPUT)
    private Long id;
    private String name;
    private Integer age;
    private String email;

}




根绝QueryWrapper进行更新
@SpringBootTest
class MpApplicationTests {

//    继承了BaseMapper，所有的方法都来自自己的父类
    @Autowired
    private UserMapper userMapper;


	@Test
    public void testUpdate(){
        User user = new User();
        //更新的字段
        user.setAge(14);
        user.setName("CCC");

//        更新的条件
        QueryWrapper<User> wrapper = new QueryWrapper<>();
//        更新的条件是id = 6
        wrapper.eq("id",6);

        int i = userMapper.update(user,wrapper);
        System.out.println(i);
    }
}




Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@65a48602] was not registered for synchronization because synchronization is not active
JDBC Connection [HikariProxyConnection@1706939736 wrapping com.mysql.cj.jdbc.ConnectionImpl@1dba4e06] will not be managed by Spring
==>  Preparing: UPDATE user SET name=?, age=? WHERE id = ? 
==> Parameters: CCC(String), 14(Integer), 6(Integer)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@65a48602]
1
    
    
    
    
我们还可以根据updateWrapper进行更新
    @Test
    public void testUpdate02(){
        UpdateWrapper<User> wrapper01 = new UpdateWrapper<>();
        wrapper01.eq("id",6).set("name","sadas");

        int i = userMapper.update(null,wrapper01);
        System.out.println(i);
    }


Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@28da7d11] was not registered for synchronization because synchronization is not active
JDBC Connection [HikariProxyConnection@728236551 wrapping com.mysql.cj.jdbc.ConnectionImpl@2a3194c6] will not be managed by Spring
==>  Preparing: UPDATE user SET name=? WHERE id = ? 
==> Parameters: sadas(String), 14(Integer), 6(Integer)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@28da7d11]
1
    
 
```





### 2.1.3 删除操作

#### **deleteById**

> 直接上实例，因为这部分都是api的调用

```java
@Test
public void testDelete01() {
    int i = userMapper.deleteById(6L);
    System.out.println(i);
}

==>  Preparing: DELETE FROM user WHERE id=? 
==> Parameters: 6(Long)
<==    Updates: 1
```





#### **deleteByMap**

> 接受一个map，mao中的元素会被设置为删除的条件，多个之间为and关系

```java
源码：
int deleteByMap(@Param("cm") Map<String, Object> var1);
```

```java
@Test
public void testDelete02() {
    HashMap<String, Object> map = new HashMap<>();
    map.put("age",14);
    map.put("name","CCC");
    int i = userMapper.deleteByMap(map);
    System.out.println(i);
}



==>  Preparing: DELETE FROM user WHERE name = ? AND age = ? 
==> Parameters: CCC(String), 14(Integer)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@767191b1]
1
```



#### **delete**

```java
@Test
public void testDelete03() {
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("name","Jone")
        .eq("age",18);
    userMapper.delete(wrapper);
}

==>  Preparing: DELETE FROM user WHERE name = ? AND age = ? 
    ==> Parameters: Jone(String), 18(Integer)
        <==    Updates: 1
```





第二种方式

```java
@Test
public void testDelete03() {
    User user = new User();
    user.setAge(20);
    user.setName("Jack");

    //        将实体对象进行包装，包装为操作条件
    QueryWrapper<User> wrapper = new QueryWrapper<>(user);
    userMapper.delete(wrapper);
    }


==>  Preparing: DELETE FROM user WHERE name=? AND age=? 
==> Parameters: Jack(String), 20(Integer)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6eb17ec8]
1
```





#### **deleteBatchIds**

> 根据id集合批量删除

```java
@Test
    public void testDelete04() {
    	userMapper.deleteBatchIds(Arrays.asList(1L, 11L, 12L));
    }


==>  Preparing: DELETE FROM user WHERE id IN ( ? , ? , ? ) 
==> Parameters: 1(Long), 11(Long), 12(Long)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@767191b1]
```



### 2.1.4 查询操作

> 和上面类型，简单的API调用会用即可

#### selectById

```java
package com.pyy.mp;

import com.pyy.mp.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MpApplicationTests02 {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testSelectById(){
        userMapper.selectById(2L);
    }

}


==>  Preparing: SELECT id,name,age,email FROM user WHERE id=? 
==> Parameters: 2(Long)
<==    Columns: id, name, age, email
<==        Row: 2, Jack, 20, test2@baomidou.com
<==      Total: 1
```



#### selectBatchIds

> 根据id集合批量查询

```java
@Test
public void testSelectBatchIds(){
    userMapper.selectBatchIds(Arrays.asList(3L,4L,66L));
}

==>  Preparing: SELECT id,name,age,email FROM user WHERE id IN ( ? , ? , ? ) 
==> Parameters: 3(Long), 4(Long), 66(Long)
<==    Columns: id, name, age, email
<==        Row: 3, Tom, 28, test3@baomidou.com
<==        Row: 4, Sandy, 21, test4@baomidou.com
<==      Total: 2
```

#### selectOne

```java
@Test
public void testSelectOne(){
    QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
    userQueryWrapper.eq("name","Jack");
    userMapper.selectOne(userQueryWrapper);
}



==>  Preparing: SELECT id,name,age,email FROM user WHERE name = ? 
==> Parameters: Jack(String)
<==    Columns: id, name, age, email
<==        Row: 2, Jack, 20, test2@baomidou.com
<==      Total: 1
```



#### selectCount

> 根据Wrapper条件，查询总记录数

```java
@Test
public void testSelectCount(){
    QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
    userQueryWrapper.gt("age",23);
    Integer integer = userMapper.selectCount(userQueryWrapper);
    System.out.println(integer);
}


==>  Preparing: SELECT COUNT(1) FROM user WHERE age > ? 
==> Parameters: 23(Integer)
<==    Columns: COUNT(1)
<==        Row: 2
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@5c77ba8f]
2
```



#### selectList

> gt = greater than
>
> lt = little than
>
> 其他的类似



```java
@Test
public void testSelectList(){
    QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
    userQueryWrapper.lt("age",30);
    List<User> users = userMapper.selectList(userQueryWrapper);
    users.forEach(x-> System.out.println(x));
}



==>  Preparing: SELECT id,name,age,email FROM user WHERE age < ? 
==> Parameters: 30(Integer)
<==    Columns: id, name, age, email
<==        Row: 2, Jack, 20, test2@baomidou.com
<==        Row: 3, Tom, 28, test3@baomidou.com
<==        Row: 4, Sandy, 21, test4@baomidou.com
<==        Row: 5, Billie, 24, test5@baomidou.com
<==      Total: 4
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@25290bca]
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
User(id=3, name=Tom, age=28, email=test3@baomidou.com)
User(id=4, name=Sandy, age=21, email=test4@baomidou.com)
User(id=5, name=Billie, age=24, email=test5@baomidou.com)
```





#### selectpage

> 什么是分页查询？
>
> 使用SELECT查询时，如果结果集数据量很大，比如几万行数据，放在一个页面显示的话数据量太大，不如分页显示，每次显示100条。
>
> 要实现分页功能，实际上就是从结果集中显示第1~100条记录作为第1页，显示第101~200条记录作为第2页，以此类推。
>
> 举例？
>
> SELECT id, name, gender, score
> FROM students
> ORDER BY score DESC
> LIMIT 3 OFFSET 0;
>
> 上述查询`LIMIT 3 OFFSET 0`表示，对结果集从0号记录开始，最多取3条。




```
==Page<User> page = new Page<>(1,1);==
```

**查询第一页，查询1条数据**





- getTotal()	数据总条数
- getPages() 数据总页数
- getCurrent 当前页数
- getRecords 得到数据

```java
@Test
public void testSelectList(){
    QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
    userQueryWrapper.lt("age",30);

    Page<User> page = new Page<>(1,1);
    IPage<User> iPage = userMapper.selectPage(page, userQueryWrapper);
    System.out.println(iPage.getTotal());
    System.out.println(iPage.getPages());

    List<User> users = iPage.getRecords();
    users.forEach(x-> System.out.println(x));
}


==>  Preparing: SELECT COUNT(1) FROM user WHERE age < ? 
==> Parameters: 30(Integer)
<==    Columns: COUNT(1)
<==        Row: 4
==>  Preparing: SELECT id,name,age,email FROM user WHERE age < ? LIMIT 0,1 
==> Parameters: 30(Integer)
<==    Columns: id, name, age, email
<==        Row: 2, Jack, 20, test2@baomidou.com
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@46c269e0]
4
4
User(id=2, name=Jack, age=20, email=test2@baomidou.com)

2022-02-18 20:31:03.877  INFO 19944 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-02-18 20:31:03.899  INFO 19944 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0

```



## 2.2 条件构造器

> Wrapper就是条件构造器
>
> 下面我们看它的继承结构
>
> QueryWrapper(LambdaQueryWrapper) 和 UpdateWrapper(LambdaUpdateWrapper) 的父类
> 用于生成 sql 的 where 条件, entity 属性也用于生成 sql 的 where 条件

![image-20220218204250598](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220218204250598.png)





### 2.2.1 allEq

> `params` : `key`为数据库字段名,`value`为字段值
> `null2IsNull` : 为`true`则在`map`的`value`为`null`时调用 isNull方法,为`false`时则忽略`value`为`null`的



```java
@Test
public void testSelectAllEq(){
    Map<String, Object> map = new HashMap<>();
    map.put("name","Jack");
    map.put("age",20);
    map.put("password",null);

    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.allEq(map,false);
    List<User> users = userMapper.selectList(wrapper);
    users.forEach(x-> System.out.println(x));

}


==>  Preparing: SELECT id,name,age,email FROM user WHERE name = ? AND age = ? 
==> Parameters: Jack(String), 20(Integer)
<==    Columns: id, name, age, email
<==        Row: 2, Jack, 20, test2@baomidou.com
<==      Total: 1
```



### 2.2.2 基本比较操作

> e:equals
>
> n:not
>
> g:greater 
>
> l:little
>
> 组合的话意思也组合

:moon::moon::moon::moon::moon::moon::moon::moon::moon::moon::moon::moon:

:冒号加英文单词可以打出符号哦:cow:(:cow)

- eq 等于
- ne 不等于
- gt 大于
- ge 大于等于
- It 小于
- le	小于等于
- between between value1 and value2
- notBetween not between value1 and value2
- in 字段IN（value.get(0),value.get(1),...）

### 2.2.3 模糊查询

#### like

> - LIKE '%值%'
> - 例: `like("name", "王")`--->`name like '%王%'`

```java
@Test
public void testLike(){
    QueryWrapper<User> wrapper = new QueryWrapper<>();

    wrapper.like("name","J");

    List<User> users = userMapper.selectList(wrapper);
    users.forEach(x-> System.out.println(x));
}

==>  Preparing: SELECT id,name,age,email FROM user WHERE name LIKE ? 
==> Parameters: %J%(String)
<==    Columns: id, name, age, email
<==        Row: 2, Jack, 20, test2@baomidou.com
<==        Row: 9, Jam, 18, test6@qq.cn
<==      Total: 2
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@46c269e0]
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
User(id=9, name=Jam, age=18, email=test6@qq.cn)
```



### 2.2.4 排序

#### orderBy

> - 排序：ORDER BY 字段, ...
> - 例: `orderBy(true, true, "id", "name")`--->`order by id ASC,name ASC`



#### orderByAsc

> - 排序：ORDER BY 字段, ... ASC(升序)
> - 例: `orderByAsc("id", "name")`--->`order by id ASC,name ASC`



#### orderByDesc

> - 排序：ORDER BY 字段, ... DESC（降序）
> - 例: `orderByDesc("id", "name")`--->`order by id DESC,name DESC`



```java
@Test
public void testOrder(){
    QueryWrapper<User> wrapper = new QueryWrapper<>();

    wrapper.orderByDesc("age");
    List<User> users = userMapper.selectList(wrapper);
    users.forEach(x-> System.out.println(x));
}

==>  Preparing: SELECT id,name,age,email FROM user ORDER BY age DESC 
==> Parameters: 
<==    Columns: id, name, age, email
<==        Row: 3, Tom, 28, test3@baomidou.com
<==        Row: 5, Billie, 24, test5@baomidou.com
<==        Row: 4, Sandy, 21, test4@baomidou.com
<==        Row: 2, Jack, 20, test2@baomidou.com
<==        Row: 9, Jam, 18, test6@qq.cn
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@5fa23c]
User(id=3, name=Tom, age=28, email=test3@baomidou.com)
User(id=5, name=Billie, age=24, email=test5@baomidou.com)
User(id=4, name=Sandy, age=21, email=test4@baomidou.com)
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
User(id=9, name=Jam, age=18, email=test6@qq.cn)

2022-02-18 21:38:58.700  INFO 1588 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-02-18 21:38:58.725  INFO 1588 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0

```





### 2.2.5 逻辑查询

#### or

> 主动调用`or`表示紧接着下一个**方法**不是用`and`连接!(不调用`or`则默认为使用`and`连接)
>
> 例: `eq("id",1).or().eq("name","老王")`--->`id = 1 or name = '小王`



#### and

> AND 嵌套
>
> 例: `and(i -> i.eq("name", "李四").ne("status", "平凡"))`--->`and (name = '李四' and status <> '平凡')`



```java
@Test
public void testOrder(){
    QueryWrapper<User> wrapper = new QueryWrapper<>();

    wrapper.orderByDesc("age");
    List<User> users = userMapper.selectList(wrapper);
    users.forEach(x-> System.out.println(x));
}


==>  Preparing: SELECT id,name,age,email FROM user WHERE name = ? OR age = ? 
==> Parameters: Jack(String), 20(Integer)
<==    Columns: id, name, age, email
<==        Row: 2, Jack, 20, test2@baomidou.com
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@46c269e0]
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
```



### 2.2.6 select

> 在MP查询中，默认查询所有的字段，如果有需要也可以通过select方法进行指定字段。
>



```java
@Test
public void testSelect(){
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("name","Jack")
            .or()
            .eq("age",20)
            .select("id","name","age");
    List<User> users = userMapper.selectList(wrapper);
    users.forEach(x-> System.out.println(x));
}


==>  Preparing: SELECT id,name,age FROM user WHERE name = ? OR age = ? 
==> Parameters: Jack(String), 20(Integer)
<==    Columns: id, name, age
<==        Row: 2, Jack, 20
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@558756be]
User(id=2, name=Jack, age=20, email=null)
```



## 2.3 主键策略

> @TableId
>
> 描述：主键注解
>
> 使用位置：实体类主键字段



| 属性  | 类型   | 必须指定 | 默认值      | 描述值       |
| ----- | ------ | -------- | ----------- | ------------ |
| value | String | 否       | ""          | 主键字段名   |
| type  | Enum   | 否       | IdType.NONE | 指定主键类型 |

主键类型：

- AUTO(0)	数据库id自增
- NONE(1)	未设置主键
- INPUT(2)	手动输入
- ID_WORKER(3)	默认的全局唯一id
- UUID(4)	全局唯一id	uuid
- ID_WORKER_STR(5)	ID_WORKER	字符串表示法



### 2.3.1 AUTO

**数据库设置id字段自动递增**

![image-20220217204713293](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220217204713293.png)



**实体类添加注解设置自增**

```java
package com.pyy.mp.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```



**测试**

```java
@SpringBootTest
class MpApplicationTests {

//    继承了BaseMapper，所有的方法都来自自己的父类
    @Autowired
    private UserMapper userMapper;
    //测试插入
    @Test
    public void testInsert(){
        User pyy = new User();
        pyy.setName("a");
        pyy.setAge(3);
        pyy.setEmail("a@aa.cn");
        int result = userMapper.insert(pyy);
        System.out.println(result);
        System.out.println(pyy);
    }
}

.........
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@14823f76] was not registered for synchronization because synchronization is not active
JDBC Connection [HikariProxyConnection@1509506488 wrapping com.mysql.cj.jdbc.ConnectionImpl@1aabf50d] will not be managed by Spring
==>  Preparing: INSERT INTO user ( name, age, email ) VALUES ( ?, ?, ? ) 
==> Parameters: a(String), 3(Integer), a@aa.cn(String)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@14823f76]
1
User(id=6, name=a, age=3, email=a@aa.cn)
```



![image-20220217205818036](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220217205818036.png)





### 2.3.2 INPUT

**实体类**

```java
package com.pyy.mp.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @TableId(type = IdType.INPUT)
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```



**测试类**

```java
@SpringBootTest
class MpApplicationTests {

//    继承了BaseMapper，所有的方法都来自自己的父类
    @Autowired
    private UserMapper userMapper;

    //测试插入
    @Test
    public void testInsert(){
        User pyy = new User();
        pyy.setId(7L);
        pyy.setName("a");
        pyy.setAge(3);
        pyy.setEmail("a@aa.cn");
        int result = userMapper.insert(pyy);
        System.out.println(result);
        System.out.println(pyy);
    }
}


...........
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@48840594] was not registered for synchronization because synchronization is not active
JDBC Connection [HikariProxyConnection@2028088629 wrapping com.mysql.cj.jdbc.ConnectionImpl@2e8a1ab4] will not be managed by Spring
==>  Preparing: INSERT INTO user ( id, name, age, email ) VALUES ( ?, ?, ?, ? ) 
==> Parameters: 7(Long), a(String), 3(Integer), a@aa.cn(String)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@48840594]
1
User(id=7, name=a, age=3, email=a@aa.cn)

2022-02-17 20:59:30.554  INFO 2152 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-02-17 20:59:30.567  INFO 2152 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

![image-20220217210037342](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220217210037342.png)





# 三、扩展

## 3.1 自动填充

> 插入数据时进行填充，也就是为email添加自动填充功能，在新增数据时有效



### 3.1.1 实体类添加注解

让email字段插入时自动填充数据

```java
@TableField(fill = FieldFill.INSERT)
private String email;
```



### 3.1.2 自定义实现类 MyMetaObjectHandler

```java
package com.pyy.mp.handle;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    //插入数据时填充
    @Override
    public void insertFill(MetaObject metaObject) {
        Object email = getFieldValByName("email", metaObject);
        if (null == email){
            setFieldValByName("email","111111",metaObject);
        }
    }

    //更新数据时填充
    @Override
    public void updateFill(MetaObject metaObject) {

    }
}
```



### 3.1.3 测试

```java
@Test
public void testInsert() {
    User pyy = new User();
    pyy.setId(6L);
    pyy.setName("B");
    pyy.setAge(3);

    int result = userMapper.insert(pyy);
    System.out.println(result);
    System.out.println(pyy);
}


==>  Preparing: INSERT INTO user ( name, age, email ) VALUES ( ?, ?, ? ) 
==> Parameters: B(String), 3(Integer), 111111(String)
<==    Updates: 1
 Time：33 ms - ID：com.pyy.mp.mapper.UserMapper.insert
Execute SQL：
    INSERT 
    INTO
        user
        ( name, age, email ) 
    VALUES
        ( 'B', 3, '111111' )

Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@a66e580]
1
User(id=11, name=B, age=3, email=111111, version=null)
```



## 3.2 逻辑删除

> 开发系统时，有时候在实现功能时，删除操作需要实现逻辑删除，所谓逻辑删除就是将数据标记为删除，而并非真正 的物理删除（非DELETE操作），查询时需要携带状态条件，确保被标记的数据不被查询到。这样做的目的就是避免 数据被真正的删除。
>
> 就像用户删除购买的订单一样，用户看到实际上是删除了的，但实际上只是逻辑上的删除后台依旧还有数据存在。

### 3.2.1 修改表结构

![image-20220218231621644](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220218231621644.png)



### 3.2.2 修改实体类

```java
@TableLogic
private Integer deleted;
```



### 3.2.3 配置文件

新版本的mp可以直接修改yml文件即可

逻辑删除为1，反之为0

```yml
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      logic-delete-value: 1
      logic-not-delete-value: 0
```



**我用的是3.0的，所以我要在配置类中添加逻辑删除组件**

```java
//删除组件
@Bean
public ISqlInjector sqlInjector(){
    return new LogicSqlInjector();
}
```



### 3.2.4 测试

```java
@Test
public void testDelete01() {
    userMapper.deleteById(12L);
}

==>  Preparing: UPDATE user SET deleted=1 WHERE id=? AND deleted=0 
==> Parameters: 12(Long)
<==    Updates: 1
 Time：0 ms - ID：com.pyy.mp.mapper.UserMapper.deleteById
Execute SQL：
    UPDATE
        user 
    SET
        deleted=1 
    WHERE
        id=12 
        AND deleted=0
```



**再次查看**

12号已被删除

```java
@Test
    void contextLoads() {
        List<User> users = userMapper.selectList(null);
        users.forEach(a -> {
            System.out.println(a);
        });
    }

==>  Preparing: SELECT id,name,age,email,version,deleted FROM user WHERE deleted=0 
==> Parameters: 
<==    Columns: id, name, age, email, version, deleted
<==        Row: 2, Jack, 30, test2@baomidou.com, 2, 0
<==        Row: 3, Tom, 28, test3@baomidou.com, 1, 0
<==        Row: 4, Sandy, 21, test4@baomidou.com, 1, 0
<==        Row: 5, Billie, 24, test5@baomidou.com, 1, 0
<==      Total: 4
 Time：37 ms - ID：com.pyy.mp.mapper.UserMapper.selectList
Execute SQL：
    SELECT
        id,
        name,
        age,
        email,
        version,
        deleted 
    FROM
        user 
    WHERE
        deleted=0

Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@22a6e998]
User(id=2, name=Jack, age=30, email=test2@baomidou.com, version=2, deleted=0)
User(id=3, name=Tom, age=28, email=test3@baomidou.com, version=1, deleted=0)
User(id=4, name=Sandy, age=21, email=test4@baomidou.com, version=1, deleted=0)
User(id=5, name=Billie, age=24, email=test5@baomidou.com, version=1, deleted=0)
```



实际上只进行了逻辑删除

![image-20220218234722339](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220218234722339.png)





# 四、插件

## 4.1 MybatisX快速开发插件

> 两个功能：
>
> - Java与XML调回跳转
> - Mapper方法自动生成XML



![image-20220218224831067](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220218224831067.png)



## 4.2 乐观锁插件

> 锁的机制：
>
> 锁的机制主要用来处理数据冲突之后的解决方式，比如在关系型数据库里，如果一个事物执行的操作对某个数据加了锁，那么只有当这个事物把锁释放，其他的事物才能执行与改锁冲突的操作



### 4.2.1 悲观锁

正如其名，它指的是对数据被外界修改持保守（悲观），因此在整个数据处理过程中，将数据处于锁定状态。**悲观锁的实现，往往依靠数据库提供的锁机制**



### 4.2.2 乐观锁

相对悲观锁而言，乐观锁假设认为数据一般情况下不会有冲突，所以在数据进行提交更新的时候，才会正式对数据的冲突与否进行检测，如果发现了冲突，则让返回用户错误的信息，让用户决定如何去做。**乐观锁的实现方式一般是记录数据版本**



### 4.2.3 乐观锁的实现方式

- 取出记录，获取当前Version
- 更新时，带上这个version
- 执行更新时，set version = newVersion where version = oldVersion
- 如果version不对，就更新失败



### 4.2.4主要适用场景 

意图： 当要更新一条记录的时候，希望这条记录没有被别人更新

乐观锁实现方式： 

1. 取出记录时，获取当前version 
2. 更新时，带上这个version 执行更新时， set version = newVersion where version = oldVersion 
3. 如果version不对，就更新失败



**插件配置**

```java
@Bean
public OptimisticLockerInterceptor optimisticLockerInterceptor(){
    return new OptimisticLockerInterceptor();
}
```



**注解实体类**

```java
package com.pyy.mp.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.Version;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private Integer age;
    private String email;
    @Version
    private Integer version;

}
```



**测试**

```
@Test
public void testUpdate() {
    User user = new User();
    user.setAge(30);
    user.setId(2L);
    user.setVersion(1);//获取到version为1

    userMapper.updateById(user);
}


==>  Preparing: UPDATE user SET age=?, version=? WHERE id=? AND version=? 
==> Parameters: 30(Integer), 2(Integer), 2(Long), 1(Integer)
<==    Updates: 0
 Time：0 ms - ID：com.pyy.mp.mapper.UserMapper.updateById
Execute SQL：
    UPDATE
        user 
    SET
        age=30,
        version=2 
    WHERE
        id=2 
        AND version=1
```

可以看到sql语句中有version条件，更新时会修改verison为2。

如果再次执行，更新则不成功。这样就避免了多人更新时导致数据的不一致



### 4.2.5特别说明

1. 支持的数据类型只有:int,Integer,long,Long,Date,Timestamp,LocalDateTime 
2. **整数类型下 newVersion = oldVersion + 1** 
3. newVersion 会回写到 entity 中 
4. 仅支持 updateById(id) 与 update(entity, wrapper) 方法
5. 在 update(entity, wrapper) 方法下, wrapper 不能复用!!!



## 4.3 性能分析插件

> @profile 注解的作用是**指定类或方法在特定的 Profile 环境生效**



### 4.3.1 在配置类添加插件

```java
package com.pyy.mp.conf;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@MapperScan("com.pyy.mp")
public class MPConfig {

    @Bean//配置分页插件
    public PaginationInterceptor paginationInterceptor(){
        return new PaginationInterceptor();
    }

    @Bean
    @Profile({"dev","test"})    //设置dev test环境开启，保证效率
    public PerformanceInterceptor performanceInterceptor(){
        PerformanceInterceptor performanceInterceptor = new PerformanceInterceptor();
        performanceInterceptor.setMaxTime(1);//设置sql执行的最大时间
        performanceInterceptor.setFormat(true);
        return performanceInterceptor;
    }
}
```



### 4.3.2 yaml文件

```yaml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://localhost:3306/mp
    driver-class-name: com.mysql.cj.jdbc.Driver
  profiles:
    active: dev
```



### 4.3.3 测试

> 可以看到代码被格式化了，但是确报错了。因为我们前面设置了最大查询时间为一毫秒，所以我们可以通过这个插件来进行调优，看看哪些语句执行时间太长

![image-20220218220503024](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220218220503024.png)



**修改后在进行测试**

![image-20220218220920216](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220218220920216.png)







# 五、补充

## 数据库表名映射问题

Error querying database.  Cause: java.sql.SQLSyntaxErrorException: Table 'ssmp_db.book' doesn't exist

```yml
mybatis-plus:
  global-config:
    db-config:
      table-prefix: tbl_
```







