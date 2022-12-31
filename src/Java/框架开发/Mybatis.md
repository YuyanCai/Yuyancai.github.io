---
title: Mybatis框架
---
## 一、MyBatis简介

**放一个官方的解释**

MyBatis 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。**MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。**



**以我的角度用简单的话来说**

一个持久层框架，封装大多数的 JDBC 样板代码，使得开发者只需关注 SQL 本身，而不需要花费精力去处理例如注册驱动，创建 Connection，以及确保关闭 Connection 这样繁杂的代码。通过写xml文件或者注解将Java的POJO映射成数据库中的记录

好像人家写的也很好理解，哈哈哈哈~！

下面这个是Mybatis的logo，带着红色眼罩的小胖鸟忍者

![image-20220125214615264](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220125214615264.png)



**原来的名字叫iBais**

本来代码在Apache放着，后来又放到Google Code上了。然后就改名为Mybatis了~



**优点**

- 很容易学，很小巧，没有第三方依赖，装两个jar包+几个sql映射文件即可
- 灵活，因为我是学完动态sql之后才回来写的笔记，月学到后面越发现这玩意是真灵活能有很多组合呀，判断啊。然后呢，sql写在xml文件里，能方便的进行统一管理和优化。
- 提供映射标签，支持对象与数据库的字段关系映射
- 提供xml标签，支持动态sql就是编写一些判断语句根据实时发生的情况进行改变这就叫动态



**缺点**

- 写sql 的时候工作量很大，对于很多字段的，关联了很多表的更是这样，学着学着我就有感觉这玩意也没多容易啊不想前面学的spring和springMVC这么简单，这还是要写这么多。
- sql语句依赖于数据库，移植性差
- 二级缓冲机制不太行



## 二、 入门案例

### 2.1 安装Mybatis

我们通过Maven来解决资源包问题

分别有mysql，mybatis，junit

后面我又放了个插件，防止注册的时候把xml文件打不进去（后面会用到）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.caq.jdbc</groupId>
    <artifactId>jdbc-demo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.10</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>RELEASE</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.1</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.2.3</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.2</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
        </dependency>


    </dependencies>
    <build>
        <!-- 项目打包时会将java目录中的*.xml文件也进行打包 -->
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
                <filtering>false</filtering>
            </resource>
        </resources>
    </build>
</project>
```





### 2.2 通过xml构建SqlSessionFactory

**通过xml构建SqlSessionFactory**

```java
String resource = "mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```



**以下是mybatis-config.xml和jdbc.properties配置**

每个基于 MyBatis 的应用都是以一个 SqlSessionFactory 的实例为核心的。SqlSessionFactory 的实例可以通过 SqlSessionFactoryBuilder 获得。而 SqlSessionFactoryBuilder 则可以从 XML 配置文件或一个预先配置的 Configuration 实例来构建出 SqlSessionFactory 实例。

==所以先写个xml配置文件来配置SqlSessionFactory==

**实验环境如下：**

> Idea2019.3
>
> mysql5.X
>
> mybatis5.X
>
> Maven3.8

**目录结构如下**

![image-20220125222116075](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220125222116075.png)



```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url = jdbc:mysql://localhost:3306/mybatis
jdbc.username=root
jdbc.password=root
```

mybatis可以使用properties来引入外部properties配置文件的内容
resource:引入类路径下的资源
url：引入网络路径或磁盘路径下资源

我们通过引入外部配置文件的方式来配置全局配置文件，进一步解耦方便维护~

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
<properties resource="dbconfig.properties"></properties>
<environments default="development">
    <environment id="development">
        <transactionManager type="JDBC"/>
        <dataSource type="POOLED">
            <!--                取出配置文件中的值用的是${}的形式-->
            <property name="driver" value="${jdbc.driver}"/>
            <property name="url" value="${jdbc.url}"/>
            <property name="username" value="${jdbc.username}"/>
            <property name="password" value="${jdbc.password}"/>
        </dataSource>
    </environment>
</environments>
</configuration>
```



### 2.3 从 SqlSessionFactory 中获取 SqlSession

获取sqlSession的实例，能直接执行已经映射的sql语句

```java
SqlSession openSession = sqlSessionFactory.openSession();
```

顾名思义（从名称想到所包含的意义，给用心的我点个大大的赞！），不在详细解释标题啥意思了~



==Mybatis执行流程：==

1. 根据xml文件（全局配置文件）创建一个SqlSessionFactory对象里面有数据源和一些运行环境信息

2. sql映射文件，配置了每一个sql，以及sql的封装规则等。

3. 将sql映射文件注册在全局配置文件中

4. 写代码

   ​    根据全局配置文件得到sqlSessionFactory

   ​    使用sqlSession工厂，获取到sqlSession对象使用它来执行CRUD

   ​    一个sqlSession就是代表和数据库的一次会话，用完关闭

   ​    使用sql的唯一标志来告诉Mybatis执行那个sql。sql都是保存在sql映射文件里的



###  2.4 探究已映射的 SQL 语句

既然要映射sql语句我们先要创建对应的数据库

和对应数据库字段的的实体类

![image-20220126113840915](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220126113840915.png)

@Alias这个注解是给这个实体类起的别名叫emp

通过这个实体类来映射数据库中的一条记录，一个对象就是数据库中的一条记录~

```java
package com.caq.mybatis.bean;

import org.apache.ibatis.type.Alias;

@Alias("emp")
@Data
@ToString
public class Employee {

    private Integer id;
    private String lastName;
    private String email;
    private String gender;
    private Department dept;


}
```



==下面这个就是sql映射文件==

1. **namespace就是命名空间;指定为接口的全类名**
2. **id就是唯一标识**
3. **resultType就是返回值类型，比如我们想返回的是员工的信息，那我们就返回Employee的全类名**
4. **##{id}:从传递过来的参数中取出id值**
5. **id指定接口中的方法，这样不仅文件和接口绑定，select标签也和方法进行了绑定**

以上几点都是重点！！！画黑板了，记到本子上！

映射文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.caq.mybatis.dao.EmployeeMapper">
    <!--什么意思呢？就是select这个标签是EmployeeMapper接口下getEmpById方法的实现-->
    <select id="getEmpById" resultType="emp">
        select * from tbl_employee
        where id = ##{id}
    </select>
</mapper>
```



将我们写好的sql映射文件一定要注册到全局配置文件中

```xml
<mappers>
    <!--        <mapper resource="EmployeeMapper.xml"/>-->
    <!--        <mapper class="com.caq.mybatis.dao.EmployeeMapperAnnotation"/>-->
    <!--        批量注册-->
    <package name="com.caq.mybatis.dao"/>
</mappers>
```



测试效果

```java
@Test
public void test01() throws IOException {
    SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
    SqlSession openSession = sqlSessionFactory.openSession();
    try {
        EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
        Employee employee = mapper.getEmpById(1);
        System.out.println(employee);
    } finally {
        openSession.close();
    }
}

结果如下：

Employee{id=1, lastName='tom', email='tom@caq.com', gender='0'}
```



### 2.5 补充

==开发流程：==

1. user表，添加数据

2. 创建模块，导入坐标

3. 编写Mybatis核心配置文件--》替换连接信息，解决硬编码问题

4. 编写sql映射文件--》同一管理sql语句，解决硬编码问题

5. 编码

   - 定义POJO类
   - 加载核心配置文件，获取SqlSessionFactory对象
   - 获取SqlSession对象，执行SQL语句
   - 释放资源

   



Mybatis完成操作需要几步？

编写接口方法--》编写SQL--》执行方法



{}的作用：

参数传递的时候用##{}，可以将参数变为？能防止sql注入





### 2.6 注解开发

==面向接口编程==

什么是面向接口编程？

**面向接口编程是先把客户的业务逻辑线提取出来，作为接口，业务具体实现通过该接口的实现类来完成。当客户需求变化时，只需编写该业务逻辑的新的实现类，通过更改配置文件中该接口的实现类就可以完成需求，不需要改写现有代码，减少对系统的影响。（这个概念的理解很重要，先记着后面实践的时候会越来越清晰！）**



> 这里我结合后面springboot的一些方式，释放了mybatis-config.xml文件,通过yml文件中的指定来替换。数据库映射mapper.xml文件通过在接口上写@Mapper注解和方法上写注解的方式实现

如下：

yml文件

```yml
mybatis:
##  通过yml配置文件的方式解放了mybatis-config.xml文件
  configuration:
    map-underscore-to-camel-case: true ##开启驼峰命名
```



Mapper接口

```java
package com.caq.admin.mapper;

import com.caq.admin.bean.Account;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

//通过写@Mapper注解的方式释放了写mapper.xml映射文件的方式

@Mapper
public interface AccountMapper {

    @Select("select * from account where id = ##{id}")
    Account test(Long id);

}

```



service层

```java
package com.caq.admin.service;

import com.caq.admin.bean.Account;
import com.caq.admin.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    AccountMapper accountMapper;

    public Account getAcc(Long id){
        return accountMapper.test(id);
    }
}
```





controller层

```java
@Controller
@Slf4j
public class IndexController {
    @Autowired
    AccountService accountService;

    @ResponseBody
    @GetMapping("/account")
    public Account getAccount(@RequestParam("id") Long id){
        return accountService.getAcc(id);
    }
}
```



测试

![image-20220219184053789](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220219184053789.png)











## 三、MyBatis-全局配置文件

配置文件很重要，下面我们来看看配置文件中的参数都是什么意思！

 配置文档的顶层结构如下：

- configuration（配置）
  - properties（属性）
  - settings（设置）
  - typeAliases（类型别名）
  - typeHandlers（类型处理器）
  - objectFactory（对象工厂）
  - plugins（插件）
  - environments（环境配置）
    - environment（环境变量）
      - transactionManager（事务管理器）
      - dataSource（数据源）
  - databaseIdProvider（数据库厂商标识）
  - mappers（映射器）

### 3.1 属性（properties）

mybatis可以使用properties来引入外部properties配置文件的内容
        resource:引入类路径下的资源
        url：引入网络路径或磁盘路径下资源

```xml
 <properties resource="dbconfig.properties"></properties>
```

设置好的属性可以在整个配置文件中用来替换需要动态配置的属性值。

```xml
<environments default="development">
    <environment id="development">
        <transactionManager type="JDBC"/>
        <dataSource type="POOLED">
            <!--                取出配置文件中的值用的是${}的形式-->
            <property name="driver" value="${jdbc.driver}"/>
            <property name="url" value="${jdbc.url}"/>
            <property name="username" value="${jdbc.username}"/>
            <property name="password" value="${jdbc.password}"/>
        </dataSource>
    </environment>
</environments>
```

**前面的例子我们用的也是这种方式，写一个配置文件在外部，之后我们在全局配置文件中通过properties引入配置文件，之后通过${}来取配置文件中的值**



### 3.2 设置（settings）

这是 MyBatis 中极为重要的调整设置，它们会改变 MyBatis 的运行时行为。 下表描述了设置中各项设置的含义、默认值等。

这几个 是很重要的点，所以特地提出来

| 设置名                   | 描述                                                         | 有效值        | 默认值        |
| :----------------------- | :----------------------------------------------------------- | :------------ | :------------ |
| cacheEnabled             | 该配置影响所有映射器中配置的缓存的全局开关                   | true \| false | true          |
| lazyLoadingEnabled       | 延迟加载的全局开关。当开启时，所有关联对象都会延迟加载。 特定关联关系中可通过设置 `fetchType` 属性来覆盖该项的开关状态。 | true \| false | false         |
| useColumnLabel           | **使用列标签代替列名**。实际表现依赖于数据库驱动，具体可参考数据库驱动的相关文档，或通过对比测试来观察。 | true \| false | true          |
| defaultStatementTimeout  | **设置超时时间**，它决定数据库驱动等待数据库响应的秒数。     | 任意正整数    | 未设置 (null) |
| mapUnderscoreToCamelCase | **是否开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。** | true \| false | False         |

驼峰命名的开启很重要，因为在数据库中的字段两个字母组成的意思的时候往往通过下划线(_)分割，但在java中都是驼峰型的。为了解决这个问题，可以开启mapUnderscoreToCamelCase 来进行数据库字段和java属性的映射。下面会有演示



 settings包含很多重要的设置项
        setting用来设置每一个设置项
        name设置项名
        value设置项取值

```xml
<settings>
    <setting name="mapUnderscoreToCamelCase" value="true"/>
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```

第一个我们开启了驼峰映射，第二个是延迟加载后面我们会说

我们来看看是怎么映射的

```java
@Alias("emp")public class Employee {
    private Integer id;
    private String lastName;
}
```

我们的实体类Employee这个字段名是lastName

数据库中的这个字段是last_name
开启后，会自动把last_name映射为lastName所以查询的话是能查询成功的



这个是sql映射文件（接口式编程，我们要先在接口中定义getEmpById方法，参数设置为id）

```xml
<!--    id指定接口中的方法，这样不仅文件和接口绑定，select标签也和方法进行了绑定
什么意思呢？就是select这个标签是EmployeeMapper接口下getEmpById方法的实现
-->
<select id="getEmpById" resultType="emp">
    select * from tbl_employee
    where id = ##{id}
</select>
```

测试

```java
    //    接口式编程，方便解耦
    @Test
    public void test01() throws IOException {
//        1、获取sqlSessionFactory对象
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
//        2、获取sqlSession对象
        SqlSession openSession = sqlSessionFactory.openSession();

        try {
            //        3、获取接口的实现类对象
            EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
//            第二种方式是先获取接口的实现类对象，之后实现接口的方法传入参数
            Employee employee = mapper.getEmpById(1);
            System.out.println(employee);
        } finally {
            openSession.close();
        }
    }
```

Employee{id=1, lastName='tom', email='tom@caq.com', gender='0'}



可以看到lastName是有值的

如果关闭驼峰，lastName这列是不显示值的如下

```xml
<settings>
    <setting name="mapUnderscoreToCamelCase" value="false"/>
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```

中间的步骤一样不在赘述，结果为：

Employee{id=1, lastName=NULL, email='tom@caq.com', gender='0'}



### 3.3 类型别名（typeAliases）

类型别名可为 Java 类型设置一个缩写名字。 它仅用于 XML 配置，意在降低冗余的全限定类名书写。例如：

typeAliases:别名处理器，可以为我们的java类型起别名
    别名不区分大小写
typeAliases为某个java类型起别名
type：指定要起别名的类型全类名；默认别名就是类名小写；employee
alias：指定新的别名



package：为某个包下的所有类批量起别名
**name：指定包名（为当前包以及下面所有的后代包的每一个类都起一个默认别名（类名小写）)**

```xml
<typeAliases>
    <typeAlias type="com.caq.mybatis.bean.Employee" alias="emp"></typeAlias>
</typeAliases>
<!--批量别名-->
<typeAliases>
    <package name="com.caq.mybatis.bean"/>
</typeAliases>
```



批量起别名的情况下我们不想用默认的话，**可以使用@Alias注解为某个类型指定新的别名**

是吧，我们在Employee实体类上面加了个@Alias给它起了个别名叫emp

```java
@Alias("emp")
public class Employee {}
```

**但是呢，虽然有别名，为了项目更好的维护我们一般都使用全类名。要不然谁知道你写的别名是啥意思**



### 3.4 类型处理器（typeHandlers）

无论是MyBatis在预处理语句(PreparedStatement )中设置一个参数时,还是从结果集中取出一个值时，都会用类型处理器将获取的值以合适的方式转换成Java类型。





### 3.5 plugins插件

插件是MyBatis提供的一个非常强大的机制，我们可以通过插件来修改MyBatis的一些核心行为。插件通过动态代理机制，可以介入四大对象的任何一个方法的执行





### 3.6 environments环境

**尽管可以配置多个环境，但每个 SqlSessionFactory 实例只能选择一种环境。**



所以，如果你想连接两个数据库，就需要创建两个 SqlSessionFactory 实例，每个数据库对应一个。而如果是三个数据库，就需要三个实例，依此类推，记起来很简单：

- **每个数据库对应一个 SqlSessionFactory 实例**



MyBatis可以配置多种环境，比如开发、测试和生产环境需要有不同的配置。

每种环境使用一个environment标签进行配置并指定唯一标识符

可以通过environments标签中的default属性指定

一个环境的标识符来快速的切换环境

id：指定当前环境的唯一标识

transactionManager、和dataSource都必须有



```xml
<environments default="development">
    <environment id="development"> 
        <transactionManager type="JDBC"/> 
        <dataSource type="POOLED">  
            <!--                取出配置文件中的值用的是${}的形式--> 
            <property name="driver" value="${jdbc.driver}"/> 
            <property name="url" value="${jdbc.url}"/>  
            <property name="username" value="${jdbc.username}"/> 
            <property name="password" value="${jdbc.password}"/> 
        </dataSource>  
    </environment>
</environments>
```

这个就很好理解了，一些环境和配置信息~





### 3.7 dataSource

有这些类型： UNPOOLED | POOLED | JNDI | 自定义

1. UNPOOLED：不使用连接池，UnpooledDataSourceFactory
2. POOLED：使用连接池， PooledDataSourceFactory 
3. JNDI： 在EJB 或应用服务器这类容器中查找指定的数据源
4. 自定义：实现DataSourceFactory接口，定义数据源的获取方式。

 • 实际开发中我们使用Spring管理数据源，并进行事务控制的配置来覆盖上述配置







### 3.8 mapper映射

重头戏它来了

既然 MyBatis 的行为已经由上述元素配置完了，我们现在就要来定义 SQL 映射语句了。 但首先，我们需要告诉 MyBatis 到哪里去找到这些语句。 在自动查找资源方面，Java 并没有提供一个很好的解决方案，所以最好的办法是直接告诉 MyBatis 到哪里去找映射文件。 

我们通过在全局配置文件进行注册



```xml
<mappers>  
    <mapper resource="org/mybatis/builder/AuthorMapper.xml"/> 
    <mapper url="file:///var/mappers/AuthorMapper.xml"/>
    <mapper class="org.mybatis.builder.AuthorMapper"/>
</mappers>
```



这种方式有待提高，比较麻烦写一个注册一个。我们可以通过批量注册！

 • 这种方式要求SQL映射文件名必须和接口名相同并且在同一目录下

```xml
<!--    将我们写好的sql映射文件一定要注册到全局配置文件中-->    
<mappers>
    <!--        <mapper resource="EmployeeMapper.xml"/>-->
    <!--        <mapper class="com.caq.mybatis.dao.EmployeeMapperAnnotation"/>-->
    <!--        批量注册--> 
    <package name="com.caq.mybatis.dao"/>  
</mappers>
```





## 四、MyBatis-映射文件

MyBatis 的真正强大在于它的语句映射，这是它的魔力所在

映射文件指导着Mybatis如何进行数据库CRUD，有着非常重要的意义

> cache-命名空间的二级缓存配置
>
> cache-ref-其他命名空间缓存配置的引用
>
> resultMap-自定义结果集映射
>
> sql抽取可重用语句块
>
> insert -映射插入语句
>
> update-映射更新语句
>
> delete -映射删除语句
>
> select-映射查询语句

**SQL映射文件一般命名为接口名+Mapper**

如EmployeeMapper、EmployeeMapperpro、EmployeeMapperpromax



下面我们来分别介绍sql映射文件中的这些元素~



### 4.1 参数（Parameters）传递

> Mybatis获取参数值的两种方式：${}和##{}
>
> ${}本质字符串拼接（可能造成sql注入）
>
> {}本质占位符赋值



**单个参数**
可以接受基本类型,对象类型,集合类型的值。这种情况MyBatis可值接使用这个参数﹐不需要经过任何处理。





**多个参数**
任意多个参数，都会被MyBatis重新包装成一个Map传入。Map的key是param1 , param2 ,0，1...，值就是参数的值。



**命名参数**
**为参数使用@Param起一个名字，MyBatis就会将这些参数封装进map中, key就是我们自己指定的名字**



**POJO**
当这些参数属于我们业务POJO时，我们直接传递POJO



**Map**
我们也可以封装多个参数为map ,直接传递



### 4.2 参数处理

参数位置支持的属性

javaType、jdbcType、mode、numericScale、resultMap、typeHandler、jdbcTypeName

实际上通常被设置的是∶

​	可能为空的列名指定jdbcType

**##{key}:获取参数的值，预编译到SQL中。安全。**

${key}:获取参数的值，拼接到SQL中。有SQL注入问题。ORDER BY ${name}



**一般选择##{key}的方式来获取参数的值**





### 4.3 增删改查元素

**Select元素来定义查询操作。**

**ld:唯一标识符。**

​	用来引用这条语句，需要和接口的方法名一致

**parameterType :参数类型。**

​	可以不传，MyBatis会根据TypeHandler自动推断

**resultType:返回值类型。**

​	别名或者全类名﹐如果返回的是集合﹐定义集合中元素的类型。不能和resultMap同时使用

resultMap：自定义返回值类型

​	外部resultMap的命名引用。和resultType属性不能同时使用

```xml
<select id="getEmpById" resultType="emp">
    select * from tbl_employee    where id = ##{id}
</select>
```



insert, update 和 delete和上述查询其实查不到哪里去啦，差不多都一样的啦~

```xml
<insert id="insert" parameterType="com.caq.mybatis.bean.Employee" useGeneratedKeys="true" keyProperty="id">
    insert into tbl_employee(last_name,email,gender) values(##{lastName},##{email},##{gender})
</insert>

<update id="updateEmp">
    update tbl_employee    set last_name=##{lastName},email=##{email},gender=##{gender} where id = ##{id}
</update>

<delete id="deleteEmpById">
    delete from tbl_employee where id = ##{id}
</delete>
```

不难，主要是我们sql语句的书写

要注意的点是，删除修改数据库中的字段，我们传的参数都是一个javabean对象





**如果数我们查的数据中不只有属性还有个对象改怎么查呢？**

我们可以想象如下场景：

查询Employee的同时查询员工对应的部门
场景一：
    查询Employee的同时查询员工对应的部门
    Employee===Department
    一个员工有与之对应的部门信息；





**联合查询：级联属型封装结果集**

```xml
<resultMap id="MyEmpPlus" type="com.caq.mybatis.bean.Employee">
    <id column="id" property="id"/>
    <result column="last_name" property="lastName"/>
    <result column="gender" property="gender"/>
    <result column="did" property="dept.id"/>
    <result column="dept_name" property="dept.departmentName"/>
</resultMap>

<select id="getEmpAndDept" resultMap="MyEmpPlus">
    SELECT e.id id,e.last_name last_name,e.gender gender,e.d_id d_id,d.id did,d.dept_name dept_name
    FROM tbl_employee e,tbl_dept d
    where e.d_id = d.id
    and e.id = 1
</select>
```

上述方式的确可以解决这个问题

但是你看它是不是写的太麻烦了啊，那有没有简单的方法查询呢？



association可以指定联合的javaBean对象
            指定哪个属型是联合的对象
            javaType指定属型对象的类型【不能省略】
            使用association定义关联的单个对象的封装规则

```xml
<resultMap id="MyEmpByStep" type="com.caq.mybatis.bean.Employee">
    <!--        先按照员工id查询员工信息-->
    <!--        根据查询员工信息中的d_id值去查部门查处部门信息--> 
    <!--        部门设置到员工中-->  
    <id column="id" property="id"/>  
    <result column="last_name" property="lastName"/> 
    <result column="email" property="email"/>  
    <result column="gender" property="gender"/> 
    <!--        association来定义关联对象的封装规则            select表明当前属性是调用sekect指定的方法查出的结果            流程:使用select指定的方法（传入column指定的这列参数的值）查出对象，并封装给property指定的属性--> 
    <association property="dept"select="com.caq.mybatis.dao.DepartmentMapper.getDeptById" column="d_id"> 
    </association>
</resultMap>
<select id="getEmpByIdStep" resultMap="MyEmpByStep"> 
    select * from tbl_employee where id = ##{id}
</select>
```

> select：调用目标的方法查询当前属性的值 
>
> column：将指定列的值传入目标方法



没错我们可以用association来进行查询，也就是分布查询。

1. 先按照员工id查询员工信息
2. 根据查询员工信息中的d_id值去查部门查处部门信息
3. 部门设置到员工中



从这里就能看出Mybatis的灵活，处理一些很复杂的查询的时候association能帮我们解决头痛的问题	





### 4.4 SQL

这个元素可以用来定义可重用的 SQL 代码片段，以便在其它语句中使用。 参数可以静态地（在加载的时候）确定下来，并且可以在不同的 include 元素中定义不同的参数值。

```xml
<sql id="userColumns"> ${alias}.id,${alias}.username,${alias}.password </sql>
```

```xml
<select id="selectUsers" resultType="map">
    select
    <include refid="userColumns">
        <property name="alias" value="t1"/>
    </include>,   
    <include refid="userColumns">
        <property name="alias" value="t2"/>
    </include>
    from some_table t1 cross join some_table t2
</select>
```

**一般我们会把重复的sql字段提取出一个sql，然后不同的语句用这个sql字段的时候我们调这个提取出来的sql即可**





### 4.5 自动映射

**全局setting设置**

==autoMappingBehavior默认是PARTIAL==，开启自动映射的功能。唯一的要求是列名和javaBean属性名一致―如果autoMappingBehavior设置为null则会取消自动映射一数据库字段命名规范，POJO属性符合驼峰命名法，如A_COLUMN→>aColumn ,我们可以==开启自动驼峰命名规则映射功能,mapUnderscoreToCamelCase=true==

**自定义resultMap ，实现高级结果集映射。**



### 4.6 resultMap

==一些参数的介绍==

- constructor -类在实例化时,用来注入结果到构造方法中

- id 一个ID结果;标记结果作为ID可以帮助提高整体效能

- result一注入到字段或JavaBean属性的普通结果

- **association** 一个复杂的类型关联;许多结果将包成这种类型

  ​	嵌入结果映射

  ​	结果映射自身的关联,或者参考一个

- **collection** 复杂类型的集

  ​	嵌入结果映射	结果映射自身的集,或者参考一个

discriminator 使用结果值来决定使用哪个结果映射

​	case-基于某些值的结果映射
​		嵌入结果映射-这种情形结果也映射它本身,因此可以包含很多相同的元素,或者它可以参照个外部的结果映射。



```xml
   <resultMap id="MyEmp" type="com.caq.mybatis.bean.Employee">
       <!--            指定主键列的封装规则：            id定义主键列的话底层会有优化            column指定哪一列            property指定对应的javaBean属性-->        
       <id column="id" property="id"/>
       <!--        result定义普通列封装规则--> 
       <result column="last_name" property="lastName"/>
       <!--        其他不指定的列会自动封装,不过我们既然自定义了那就把字段都写上-->  
       <result column="gender" property="gender"/> 
       <result column="email" property="email"/> 
</resultMap>    
<!--        id就是方法名-->
<!--    <select id="getEmpById" resultType="emp">-->
<!--        select *-->
<!--        from mybatis.tbl_employee-->
<!--        where id = ##{id};-->
<!--    </select>-->    
<select id="getEmpById" resultMap="MyEmp">  
    select * from tbl_employee where id = ##{id}; 
</select>
```



### 4.7 鉴别器

有时候，一个数据库查询可能会返回多个不同的结果集（但总体上还是有一定的联系的）。 鉴别器（discriminator）元素就是被设计来应对这种情况的，另外也能处理其它情况，例如类的继承层次结构。 鉴别器的概念很好理解——它很像 Java 语言中的 switch 语句。



> column指定判定的列名，javaType列值对应的java类型
>
> 男生,如果是男生，把last_name这一列的值赋给email，女生则查询出所在部门信息

```xml
<resultMap id="MyEmpDis" type="com.caq.mybatis.bean.Employee">
    <id column="id" property="id"/>
    <result column="last_name" property="lastName"/>
    <result column="email" property="email"/>
    <result column="gender" property="gender"/>
    <!--        column指定判定的列名，javaType列值对应的java类型-->
    <discriminator javaType="string" column="gender">
        <!--            女生-->
        <case value="0" resultType="com.caq.mybatis.bean.Employee">
            <association property="dept"
                         select="com.caq.mybatis.dao.DepartmentMapper.getDeptById"
                         column="d_id">
            </association>
        </case>
        <!--            男生,如果是男生，把last_name这一列的值赋给email-->
        <case value="1" resultType="com.caq.mybatis.bean.Employee">
            <id column="id" property="id"/>
            <result column="last_name" property="lastName"/>
            <result column="last_name" property="email"/>
            <result column="gender" property="gender"/>
        </case>
    </discriminator>
</resultMap>

<select id="getEmpByIdStep" resultMap="MyEmpDis">
    SELECT * FROM tbl_employee WHERE id = ##{id};
</select>
```



这个很好理解的，我还是把测试结果写出来

```java
//    根据id分布查员工信息
@Test
public void test03() throws IOException {
    SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
    SqlSession openSession = sqlSessionFactory.openSession();  
    try {
        EmployeeMapperPlus mapper = openSession.getMapper(EmployeeMapperPlus.class);  
        Employee empByIdStep = mapper.getEmpByIdStep(4);      
        System.out.println(empByIdStep);
        System.out.println(empByIdStep.getDept());
    } finally {
        openSession.close();
    }
}
```

 **我们查询id为4的员工，根据我们前面写的sql映射文件，如果它的性别是男则他的邮件地址就是它的姓名，如果他的性别是女那么就能打印出她的部门信息（查部门信息又是一个新的对象我们用的association分步查询）**



![image-20220126215438773](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220126215438773.png)

显示结果分别如下：

Employee{id=4, lastName='jerry2', email='jerry2', gender='1'}
null



Employee{id=1, lastName='tom', email='tom@caq.com', gender='0'}
Department{id=1, departmentName='开发'}



## 五、MyBatis-动态SQL

动态SQL是MyBatis强大特性之一。极大的简化我们拼装SQL的操作，例如拼接时要确保不能忘记添加必要的空格，还要注意去掉列表最后一个列名的逗号。利用动态 SQL，可以彻底摆脱这种痛苦。。动态SQL元素和使用JSTL或其他类似基于XML的文本处理器相似。MyBatis采用功能强大的基于OGNL的表达式来简化操作。

- if

- choose (when, otherwise)
- trim (where,set)
- foreach



### 5.1 if

使用动态 SQL 最常见情景是根据条件包含 where 子句的一部分。

比如我们有很多字段，那我们写条件的时候要在where后面写很长的判断条件，那么有了if我们就可以根据if判断条件。如果条件成立则添加不添加。



**遇见特殊符号其实可以写转义字符**

**[HTML 字符实体 (w3school.com.cn)](https://www.w3school.com.cn/html/html_entities.asp)**

**我们可以去这里寻找特殊符号对应的转义字符！**

```xml
<select id="getEmpByConditionIf" resultType="com.caq.mybatis.bean.Employee">
    select *
    from tbl_employee
    where
    <!-- test：判定表达式（OGNL）
    OGNL参照PPT或官方文档
    从参数中取值进行判断
    遇见特殊符号其实可以写转义字符
    -->

    <if test="id!=null">
        id=##{id}
    </if>
    <if test="lastName!=null &amp;&amp; lastName != &quot;&quot;">
        and last_name like ##{lastName}
    </if>
    <if test="email!=null and email.trim() != &quot;&quot;">
        and email =##{email}
    </if>
    ## ognl会进行字符串与数字的转换判断
    <if test="gender==0 or gender==1">
        and gender=##{gender}
    </if>
</select>
```



### 5.2 choose、when、otherwise

```xml
<select id="getEmpByConditionChoose" resultType="com.caq.mybatis.bean.Employee">
    select *
    from tbl_employee
    <where>
        ## 如果带了id就用id查，如果带了lastName就用lastName查，只会进入其中一个
        <choose>
            <when test="id!=null">
                id = ##{id}
            </when>
            <when test="lastName!=null">
                last_name like ##{lastName}
            </when>
            <when test="email!=null">
                email = ##{email}
            </when>
            <otherwise>
                gender = 0
            </otherwise>
        </choose>
    </where>
</select>
```





下面我们看测试文件的结果

```java
//    测试自定义字符串截取
@Test
public void test07 () throws IOException {
    SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
    SqlSession openSession = sqlSessionFactory.openSession();

    try {
        EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
        Employee employee = new Employee(null, null, null, null,null);
        List<Employee> list = mapper.getEmpByConditionChoose(employee);
        for (Employee employee1 : list) {
            System.out.println(employee1);
        }
    } finally {
        openSession.close();
    }
}
```

我们什么参数也没传入，所以她就会按照默认的来查。就是gender=0的情况

所以会出现如下结果：

> Employee{id=1, lastName='tom', email='tom@caq.com', gender='0'}
> Employee{id=6, lastName='tom', email='tom@qq.com', gender='0'}
> Employee{id=7, lastName='Rose', email='Rose@qq.com', gender='0'}





### 5.3 trim、where、set



> prefix="":前缀：trim标签体中是整个字符串拼串后的结果
>
>
> prefixOverrides="":
>
> 前缀覆盖：去掉整个字符串前面多余的字符
>
> suffix="":后缀
>
> suffix给拼串后的整个字符串加上一个后缀
>
> suffixOverrides=""
>
> 后缀覆盖：去掉整个字符串后面多余的字符
>
> *set* 元素可以用于动态包含需要更新的列，忽略其它不更新的列。



把我们容易多写少写的and去掉或者自动通过关键字加上，真是好用呢！

```xml
<select id="getEmpByConditionTrim" resultType="com.caq.mybatis.bean.Employee">
    select * from tbl_employee
    <trim prefix="where" suffixOverrides="and">
        <if test="id!=null">
            id=##{id}
        </if>
        <if test="lastName!=null &amp;&amp; lastName != &quot;&quot;">
            last_name like ##{lastName} and
        </if>
        <if test="email!=null and email.trim() != &quot;&quot;">
            email =##{email} and
        </if>
        <if test="gender==0 or gender==1">
            gender=##{gender} and
        </if>
    </trim>
</select>
```





### 5.4 foreach

*foreach* 元素的功能非常强大，它允许你指定一个集合，声明可以在元素体内使用的集合项（item）和索引（index）变量。它也允许你指定开头与结尾的字符串以及集合项迭代之间的分隔符。这个元素也不会错误地添加多余的分隔符



你可以将任何可迭代对象（如 List、Set 等）、Map 对象或者数组对象作为集合参数传递给 *foreach*。当使用可迭代对象或者数组时，index 是当前迭代的序号，item 的值是本次迭代获取到的元素。当使用 Map 对象（或者 Map.Entry 对象的集合）时，index 是键，item 是值。



**有个错误一定要记得，sql语句在navicat里写或者别的sql工具。**

**不然在idea写错个标点要排查半天搞人心态**

```xml
<insert id="addEmps">
    insert into
    tbl_employee(last_name,email,gender,d_id)
    values
    <foreach collection="emps" item="emp" separator=",">
        (##{emp.lastName},##{emp.email},##{emp.gender},##{emp.dept.id})
    </foreach>
</insert>

```

```java
@Test
    public void test08 () throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();
        try {
            EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
            ArrayList<Employee> emps = new ArrayList<>();
            emps.add(new Employee(null,"tim","tim@qq.com","0",new Department(1)));
            emps.add(new Employee(null,"apple","apple@163.com.com","0",new Department(2)));
            mapper.addEmps(emps);
            openSession.commit();
            System.out.println("Success！！！");
        } finally {
            openSession.close();
        }
    }
```

![image-20220127000540840](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220127000540840.png)

添加成功啦~~~



### 5.5 bind

bind元素可以从OGNL表达式中创建一个变量并将其绑定到上下文。

```
<!--    List<Employee> getEmpsTestInnerParameter(Employee employee);-->
<select id="getEmpsTestInnerParameter" resultType="com.caq.mybatis.bean.Employee">
    ## 可以将OGNL表达式的值绑定到一个变量中，方便后来引用这个变量的值
    <bind name="_testBind" value="'_'+lastName+'%'"/>
    select * from tbl_employee where last_name like ##{_testBind}
</select>
```





```java
@Test
public void test09 () throws IOException {
    SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
    SqlSession openSession = sqlSessionFactory.openSession();
    try {
        EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL .class);
        Employee employee = new Employee();
        employee.setLastName("%e%");
        List<Employee> list = mapper.getEmpsTestInnerParameter(employee);
        for (Employee employee1 : list) {
            System.out.println(employee1);
        }
    } finally {
        openSession.close();
    }
}
```

测试结果如下

Employee{id=3, lastName='jerry1', email='jerry1@qq.com', gender='1'}
Employee{id=4, lastName='jerry2', email='jerry2@qq.com', gender='1'}
Employee{id=5, lastName='jerry3', email='jerry3@qq.com', gender='1'}
Employee{id=8, lastName='jerry2', email='jerry2@qq.com', gender='1'}





![image-20220127005050972](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220127005050972.png)





### 5.6 实例

数据库表结构如下：

![image-20220227170611769](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220227170611769.png)



mybatis-config文件：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <properties resource="dbconfig.properties"></properties>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>

        <setting name="cacheEnabled" value="true"/>
        <setting name="useGeneratedKeys" value="true"/>
        <setting name="defaultExecutorType" value="REUSE"/>
        <setting name="logImpl" value="STDOUT_LOGGING"/>

    </settings>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!--                取出配置文件中的值用的是${}的形式-->
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>


    <mappers>
        <package name="com.caq.jdbc.mapper"/>
    </mappers>

</configuration>
```



BrandMapper的接口：

```java
List<Brand> selectByCondition(Map map);
```



BrandMapper的sql映射文件：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.caq.jdbc.mapper.BrandMapper">
    <select id="selectByCondition" resultType="com.caq.jdbc.pojo.Brand">
        select *
        from tb_brand
        -- where 1 = 1
        <where>
            <if test="status != null">
                and status = ##{status}
            </if>

            <if test="companyName != null and companyName != '' ">
                and company_name like ##{companyName}
            </if>

            <if test="brandName != null and brandName != '' ">
                and brand_name like ##{companyName}
            </if>
        </where>
    </select>
</mapper>
```



测试：

```java
@Test
    public void testSelectByCondition2() throws IOException {
        int status = 1;
        String companyName = "华为";
        String brandName = "华为";

        companyName = "%" + companyName + "%";
        brandName = "%" + brandName + "%";

        Map map = new HashMap();
//        map.put("status",status);
        map.put("companyName",companyName);
//        map.put("brandName",brandName);

        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();

        BrandMapper mapper = sqlSession.getMapper(BrandMapper.class);
        List<Brand> brands = mapper.selectByCondition(map);
        System.out.println(brands);
        sqlSession.close();
    }
```





### 5.7 mybatis的参数封装

```java
/**
 * MyBatis参数封装:
 *  *单个参数:
 *      1. P0J0类型:
 *      2. Map集合:
 *      3. Collection:
 			map.put("collection",collection集合)
 			map.put("arg0",collection集合)
 *      4. List:
 			map.put("collection",list集合)
 			map.put("list",list集合)
 			map.put("arg0",list集合)
 *      5. Array:
 			map.put("array",数组)
 			map.put("arg0",数组)
 *      6.其他类型:
 *  *多个参数:
 *      封装为Map集合
 *      map.put("arg0"，参数值1)
 *      map.put("agr1"，参数值2)
 *      map.put("param1"，参数值1)
 *      map.put("param2"，参数值2)
 *
 *
 *
 * @param username
 * @param age
 * @return
 */
User test(@Param("username")String username,@Param("age")Integer age);
```



为什么在接口传入参数，就能被拿来使用呢？

> entrySet() 方法返回映射中包含的映射的 Set 视图。
>
> 返回此映射中包含的映射的 Set 视图。
>
> **注意：**Set 视图意思是 HashMap 中所有的键值对都被看作是一个 set 集合。
>
> 

**实际上mybatis通过ParamNameResolver类中的getNamedParams(Object[] args)方法来实现的**

我们debug来运行，可以看到参数被传到了getNamedParams(Object[] args)方法中，之后被放到param集合中，这个就是放你参数的地方，之后遍历names的集合。然后往param集合中put添加



![image-20220227211406510](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220227211406510.png)



但并不推荐用自带的键值对，因为可读性不好。所以可以用@Param注解来设置key值









## 六、MyBatis-缓存机制

缓存机制就是用来提高查询效率的，就想我们看电影一样，把它缓存下来在看就不卡了对吧，很好理解Mybatis中的缓存机制也是处于这个目的~

下面我们分别介绍下mybatis中的缓存机制：



MyBatis包含一个非常强大的查询缓存特性,它可以非常方便地配置和定制。缓存可以极大的提升查询效率。

MyBatis系统中默认定义了两级缓存。一级缓存和二级缓存。

- 1、默认情况下,只有一级缓存（SqlSession级别的缓存﹐也称为本地缓存)开启。
- 2、二级缓存需要手动开启和配置﹐他是基于namespace级别的缓存。
- 3、为了提高扩展性。MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来自定义二级缓存



- 一级缓存，既是本地的缓存，作用域默认是sqlSession。当 Session flush 或 close 后, 该 Session 中的所有 Cache 将被清空。
- **本地缓存不能被关闭**, 但可以调用 clearCache()  来清空本地缓存, 或者改变缓存的作用域. 
- 在mybatis3.1之后, 可以配置本地缓存的作用域.  在 mybatis.xml 中配

用关键字localCacheScope

**如下图所示**

![image-20220207115802676](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220207115802676.png)



### 6.1 一级缓存(本地缓存)

**sqlSession级别的缓存。一级缓存是一直开启的**；sqlSession级别的一个Map（如果map里有，那就直接拿。没有就再去调用）

*          与数据库同一次会话期间查询到的数据会放在本地缓存中
*          以后如果需要获取相同的数据,直接从缓存中拿,没必要再去查询数据库



**一级缓存失效情况（没有使用到当前一级缓存的情况，效果就是，还需要再向数据库发出查询）**

1. sqlSession不同
2. sqlSession相同，查询条件不同
3. sqlSession相同，两次查询之间执行了增删改操作
4. sqlSession相同，手动清楚了一级缓存（缓存情况）



```java
@Test
public void test10() throws IOException {
    SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
    SqlSession openSession = sqlSessionFactory.openSession();
    try {
        EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
        Employee emp01 = mapper.getEmpById(1);
        System.out.println(emp01);

        Employee emp02 = mapper.getEmpById(1);
        System.out.println(emp02);

        System.out.println(emp01==emp02);
    } finally {
        openSession.close();
    }
}
```



关键的输出结果如下：

```wiki
Setting autocommit to false on JDBC Connection [com.mysql.jdbc.JDBC4Connection@491cc5c9]
==>  Preparing: select * from tbl_employee where id = ? 
==> Parameters: 1(Integer)
<==    Columns: id, last_name, gender, email, d_id
<==        Row: 1, tom, 0, tom@caq.com, 1
<==      Total: 1
Employee{id=1, lastName='tom', email='tom@caq.com', gender='0'}
Employee{id=1, lastName='tom', email='tom@caq.com', gender='0'}
true
```



下面我进行清理本地缓冲的操作

也就是在源代码的基础上加上

```java
openSession.clearCache();
```



然后再次查询

关键的输出结果如下：

```wiki
Setting autocommit to false on JDBC Connection [com.mysql.jdbc.JDBC4Connection@491cc5c9]
==>  Preparing: select * from tbl_employee where id = ? 
==> Parameters: 1(Integer)
<==    Columns: id, last_name, gender, email, d_id
<==        Row: 1, tom, 0, tom@caq.com, 1
<==      Total: 1
Employee{id=1, lastName='tom', email='tom@caq.com', gender='0'}
Employee{id=1, lastName='tom', email='tom@caq.com', gender='0'}
false
```

可以看到这次查询的两个对象不在是同一个了，而是两个不同的对象，所以比较对象的地址值的时候返回的是false







### 6.2 二级缓存(全局缓存)

基于namespace级别的缓存；一个namespace对应一个二级缓存；

工作机制：

1. 查询一条数据：这个数据就会被放在当前会话的一级缓存中

2. 如果会话关闭；一级缓存中的数据会被保存到二级缓存中；新的会话查询信息，就可以参照二级缓存

3. sqlSession---》EmployeeMapper---》Employee

   ​					DepartMentMapper===》Department

   不同namespace查出的数据会被放在自己对应的缓存（map中）



使用：

1. 开启二级缓存<setting name="cacheEnabled" value="true"/>
2. 去mapper.xml中配置使用二级缓存
3. 我们的pojo需要实现序列化接口



和缓存有关的设置/属性：

1. cacheEnable=true false
2. eviction:缓存的回收策略
3. LRU – 最近最少使用：移除最长时间不被使用的对象。
4. FIFO – 先进先出：按对象进入缓存的顺序来移除它们。
5. SOFT – 软引用：基于垃圾回收器状态和软引用规则移除对象。
6. WEAK – 弱引用：更积极地基于垃圾收集器状态和弱引用规则移除对象。
7. flushInterval:缓存刷新间隔
8. 缓存多长时间清空一次，默认不清空，设置一个毫秒值





readonly:是否只读;
true.只读: mybatis认为所有从缓存中获取数据的操作都是只读操作，不会修改数据。mybatis为了加快获取速度，直接就会将数据在缓存中的引用交给用户。不安全，速度快

false:非只读:mybatis觉得获取的鼓据可能会被修改。mybatis会利用序列化&反序列的技术克隆一I份新的数据给你。安全，速度慢

size，缓存存放多少元素


## 七、MyBatis-逆向工程

Mybatis 提供了一个逆向工程工具，该工具可以根据数据表自动生成针对单表的 po 类、mapper 映射文件和 mapper 接口。大大缩减了开发时间，可以让开发人员将更多的精力放在繁杂的业务逻辑上。

之所以强调单表两个字，是因为 MyBatis 逆向工程生成的 Mapper 中的操作都是针对单表的。在大型项目中，很少有复杂的多表关联查询，所以该工具作用还是很大的。

我们只需编写复杂的sql编写和表连接



以下mybatis的逆向工程我们称之为MBG

### 7.1 MBG的使用

编写MBG配置文件

我们去mybatis官网查看MBG的配置文件怎么写的

[MyBatis Generator Core – Introduction to MyBatis Generator](http://mybatis.org/generator/)

![image-20220207160557125](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220207160557125.png)

之后我们自定义配置文件的内容、jdbcConnection配置数据库连接信息



**一、编写MBG的配置文件**

1. javaModelGenerator配置javaBean的生成策略 
2. sqlMapGenerator 配置sql映射文件生成策略 
3. javaClientGenerator配置Mapper接口的生成策略 
4. table 配置要逆向解析的数据表 

- ​	tableName：表名 
- ​	domainObjectName：对应的javaBean名



**二、运行代码生成器生成代码**

Context标签

targetRuntime="MyBatis3"可以生成带条件的增删改查

targetRuntime="MyBatis3Simple“可以生成基本的增删改查

如果再次生成，建议将之前生成的数据删除﹐避免xml向后追加内容出现的问题。



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <classPathEntry location="E:\Environment\Maven\repository\mysql\mysql-connector-java\5.1.16\mysql-connector-java-5.1.16.jar" />

    <context id="DB2Tables" targetRuntime="MyBatis3">
        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/mybatis"
                        userId="root"
                        password="root">
        </jdbcConnection>

        <javaTypeResolver >
            <property name="forceBigDecimals" value="false" />
        </javaTypeResolver>

<!--        javaBean的生成策略
            targetProject=”test.model“目标包名
            targetProject="\MBGTestProject\src" 目标工程
-->
        <javaModelGenerator targetPackage="com.caq.mybatis.bean"
                            targetProject="src/main/java">
            <property name="enableSubPackages" value="true" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>

<!--        sqlMapGenerator：sql映射生成策略-->
        <sqlMapGenerator targetPackage="com.caq.mybatis.dao"
                         targetProject="src/main/java">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>

<!--        javaClientGenerator:指定mapper接口的位置-->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.caq.mybatis.dao"
                             targetProject="src/main/java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>

<!--        指定要逆行分析哪些表:根据表要创建javaBean-->
        <table tableName="tbl_dept" domainObjectName="Department" ></table>
        <table tableName="tbl_employee" domainObjectName="Employee"></table>

    </context>
</generatorConfiguration>
```

生成器代码如下：

```java

public class MybatisTest {

    public SqlSessionFactory getSqlSessionFactory() throws IOException {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        return new SqlSessionFactoryBuilder().build(inputStream);
    }

    @Test
    public void testMbg() throws Exception {
        List<String> warnings = new ArrayList<String>();
        boolean overwrite = true;
        File configFile = new File("src/main/resources/mbg.xml");
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = cp.parseConfiguration(configFile);
        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        myBatisGenerator.generate(null);
    }
}
```

Ok,我们来测试一下

```java
@Test
public void testSimple() throws IOException {
    SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
    SqlSession openSession = sqlSessionFactory.openSession();

    try {
        EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
        List<Employee> employees = mapper.selectAll();
        for (Employee employee : employees) {
            System.out.println(employee);
        }
    } finally {
        openSession.close();
    }
}
```





我们把条件改成targetRuntime="MyBatis3"在进行测试

![image-20220207162145679](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220207162145679.png)

目录结构如上所示



我们来测试一下带条件的增删改查

```java
   @Test
    public void testMyBatis3Simple() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();
        try {
            EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
            //xxxExample就是封装查询条件的
//            查询所有
//            List<Employee> list = mapper.selectByExample(null);
//            查询员工中带有e字母的，和员工性别是1的
            EmployeeExample example = new EmployeeExample();
//            创建一个Criteria，它就是拼装查询条件的
//            WHERE ( last_name like ? and gender = ? )
            EmployeeExample.Criteria criteria = example.createCriteria();
            criteria.andLastNameLike("%e%");
            criteria.andGenderEqualTo("1");


//            select id, last_name, gender, email, d_id from tbl_employee WHERE ( last_name like ? and gender = ? ) or( email like ? )
            EmployeeExample.Criteria criteria1 = example.createCriteria();
            criteria1.andEmailLike("%e%");
            example.or(criteria1);
            List<Employee> list = mapper.selectByExample(example);
            for (Employee employee : list) {
                System.out.println(employee.getId());
            }
        } finally {
            openSession.clearCache();
        }
    }
```



测试结果如下：

可以看到员工中带有e字母的，和员工性别是1的都被查询出来

之后我们又拼接了一个or条件可以看我们的sql语句select id, last_name, gender, email, d_id from tbl_employee WHERE ( last_name like ? and gender = ? ) or( email like ? ) 

在测试代码中我们也打印了每个员工的id

很好理解~！



```
Logging initialized using 'class org.apache.ibatis.logging.stdout.StdOutImpl' adapter.
PooledDataSource forcefully closed/removed all connections.
PooledDataSource forcefully closed/removed all connections.
PooledDataSource forcefully closed/removed all connections.
PooledDataSource forcefully closed/removed all connections.
Opening JDBC Connection
Created connection 2015781843.
Setting autocommit to false on JDBC Connection [com.mysql.jdbc.JDBC4Connection@782663d3]
==>  Preparing: select id, last_name, gender, email, d_id from tbl_employee WHERE ( last_name like ? and gender = ? ) or( email like ? ) 
==> Parameters: %e%(String), 1(String), %e%(String)
<==    Columns: id, last_name, gender, email, d_id
<==        Row: 3, jerry1, 1, jerry1@qq.com, 2
<==        Row: 4, jerry2, 1, jerry2@qq.com, 1
<==        Row: 5, jerry3, 1, jerry3@qq.com, 2
<==        Row: 7, Rose, 0, Rose@qq.com, 2
<==        Row: 8, jerry2, 1, jerry2@qq.com, null
<==        Row: 12, apple, 0, apple@163.com.com, 2
<==      Total: 6
3
4
5
7
8
12
```



## 八、学习Mybatis遇到的问题

### 解决Mybatis 报错Invalid bound statement (not found)

出现此错误的原因

1.xml文件不存在

2.xml文件和mapper没有映射上

- namespace指定映射mapper的路径错误
- id和mapper中的方法名不一致

![image-20211023230835681](https://img-blog.csdnimg.cn/img_convert/c335228011b8375116109b787a201dcb.png)

3.xml文件在java目录下而不在resource目录下，因此生成target中无xml



**在pom文件中添加**

```xml
<build>
        <!-- 项目打包时会将java目录中的*.xml文件也进行打包 -->
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
                <filtering>false</filtering>
            </resource>
        </resources>
    </build>
```



### Mybatis 报错There is no getter for property named 'lastname' in 'class com.caq.mybatis.bean.Employee'



出现这样的报错是什么原因呢，绝大多数是因为你的不细心导致的。

![image-20220122233146198](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220122233146198.png)



我们知道在 xxxMapper.xml 配置文件中，sql中的参数##{XXXX}要与你的JAVABean中定义名称一致（大小写要完全一致）。

![image-20220122233659046](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220122233659046.png)



![image-20220122233708267](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220122233708267.png)

**第一个红框圈的要和数据库字段一样**

**第二个红框圈的要和JavaBean中字段一致**





很显然我没有对应好~

改过来





### MyBatis配置文件开启驼峰命名映射

今天看SpringBoot整合Mybatis时看到了，遇到了一个遗忘的点，mybatis属性使用驼峰命名，我居然给忘了怎么配置来着。修改mybatis配置文件，配置驼峰命名。

所以整理一下这些遗忘的点和用到的配置。

mybatis支持属性使用驼峰的命名,用

属性是这样的

```xml
<settings> 
    <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
<!--是否启用下划线与驼峰式命名规则的映射（如first_name => firstName）-->
```

在setting中设置**mapUnderscoreToCamelCase**为`true`,就可以实现驼峰转换了， 这个的默认是`false`；

在SpringBoot 项目中没有mybatis.xml文件，可以在application.properties中，加入下面的配置项:

```
mybatis.configuration.mapUnderscoreToCamelCase=true或mybatis.configuration.map-underscore-to-camel-case=true
```





### 怎么解决配置文件中出现的The content of element type "configuration" must match...问题



```xml
The content of element type "configuration" must match 
 "(properties?,settings?,typeAliases?,typeHandlers?,objectFactory?
 ,objectWrapperFactory?,reflectorFactory?,plugins?,environments?,databaseIdProvider?,mappers?)".s
```



出现这个错误的原因是：`<configuration>`下的各个标签是有顺序的，我当时是把`<plugins>`放到了`<typeAliases>`的前面。调整顺序后问题解决。在写xml文件时要注意各标签的顺序，`<configuration>`中的各子标签顺序应按上图报错信息所示。





### IDEA连接Mysql数据库之后，编写Mapper.xml时不会自动提示表信息问题。

