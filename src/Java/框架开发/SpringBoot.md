---
title: SpringBoot框架
---
# 一、SpringBoot入门

## 1.1 什么是SpringBoot

Spring Boot是由Pivotal团队提供的全新框架，其设计目的是用来==简化新Spring应用的初始搭建以及开发过程==。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。通过这种方式，Spring Boot致力于在蓬勃发展的快速应用开发领域(rapid application development)成为领导者。

![image-20220210160851852](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210160851852.png)

**官网这个图我们来简单了解一下，可以通过SpringBoot快速构建一个一个小的模块，我们可以认为是开发出一个个的微服务**

**之后通过SpringCloud协调你开发的微服务模块，这些微服务可以通过springdata进行数据交互**



**学习SpringBoot之前应该先学习SSM框架之后再来学习，这样才能体会到它带来的便利！**



## 1.2 SpringBoot优缺点

优点：

1. 创建独立Spring应用
2. 内嵌web服务器
3. 自动starter依赖，简化构建配置
4. 自动配置Spring以及第三方功能
5. 提供生产级别的监控、健康检查及外部化配置
6. 无代码生成、无需编写XML

> SpringBoot是整合Spring技术栈的一站式框架
>
> SpringBoot是简化Spring技术栈的快速开发脚手架

**什么是脚手架？？？**
对于程序员来说脚手架就是代码生成器。**不用重复的进行创建类和基本的增删改查等工作。只需要按照步骤配置好，就能自动完成基础类和各个实现类等的创建了。**





缺点：

1. 更新快，需要不断学习新技术
2. 封装太深，不利于精通



## 1.3 SpringBoot快速入门

环境如下：

![image-20220210152730189](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210152730189.png)

![image-20220210152756460](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210152756460.png)





### 1.3.1 通过Maven导入依赖

**pom文件**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.caq</groupId>
    <artifactId>SpringBootStudy</artifactId>
    <version>1.0-SNAPSHOT</version>
	    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
    </parent>

    <dependencies>
        <dependency>
           <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>
```



**在SpringBoot中我们想进行WEB开发，可以直接导入一个spring-boot-starter-web即可**

**在原来的SSM阶段我们要导入大量的包，springboot中这一个包就可以把SSM阶段WEB开发需要的都导入进来**

![image-20220210154014540](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210154014540.png)



### 1.3.2 直接上代码运行

**主程序代码**

> @SpringBootApplication代表这是一个springboot应用
>
> ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);属于固定写法

```java
package com.caq.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class MainApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
    }
}
```



**控制层代码**

> @RestController是@ResponseBody的结合@Controller
>
> @Controller是创建
>
> @RequestMapping注解的作用就是将请求和处理请求的控制器方法关联起来，建立映射关系。

```java
package com.caq.boot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @RequestMapping("/hello")
    public String handle01(){
        return "Hello SpringBoot 2 !";
    }
}
```



**运行主程序访问8080端口**

![image-20220210193809141](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210193809141.png)



![image-20220210193738498](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210193738498.png)

测试成功~~



## 1.4 简化配置

写一个application.properties配置文件，所有的配置文件都可以写这里面

比如我们改tomcat的端口号为8089

如下所示：

```
server.port=8089
```

重新启动程序访问测试

![image-20220210195752538](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210195752538.png)



## 1.5 简化部署

把项目打成jar包，直接在目标服务器执行即可。

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

通过如下命令运行我们的程序

> java -jar 运行我们的jar包
>
> dir查看当前目录下的文件

![image-20220210200138473](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210200138473.png)



**测试依旧可以访问，我还更改了返回的字符串**

![image-20220210200251306](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210200251306.png)





# 二、了解自动配置原理

## 2.1 SpringBoot特点

### 2.1.1 依赖管理

 父项目是用来解决依赖管理的   
****
>
> spring-boot-dependencies是spring-boot-starter-parent的父项目。它几乎声明了所有开发中常用的依赖的版本号,自动版本仲裁机制
>
>  spring-boot-starter-* ： *就某种场景
>
> 只要引入starter，这个场景的所有常规需要的依赖我们都自动引入

```xml
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
</parent>

 <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.3.4.RELEASE</version>
 </parent>

```



修改默认版本号

```xml
1、查看spring-boot-dependencies里面规定当前依赖的版本 用的 key。
2、在当前项目里面重写配置
    <properties>
        <mysql.version>5.1.43</mysql.version>
    </properties>
```



### 2.1.2 自动配置

- 自动配好SpringMVC

- - 引入SpringMVC全套组件
  - 自动配好SpringMVC常用组件（功能）

- 自动配好Web常见功能，如：字符编码问题

- - SpringBoot帮我们配置好了所有web开发的常见场景

- 默认的包结构

- - 主程序所在包及其下面的所有子包里面的组件都会被默认扫描进来
  - **无需以前的包扫描配置**

- - **想要改变扫描路径，@SpringBootApplication(scanBasePackages="com.example")**



```java
@SpringBootApplication
等同于
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.caq.boot")
```

- **@EnableAutoConfiguration帮助SpringBoot应用将所有符合条件的@Configuration配置都加载到当前SpringBoot**，并创建对应配置类的Bean，并把该Bean实体交给IoC容器进行管理。
- 各种配置拥有默认值

- - 默认配置最终都是映射到某个类上，如：MultipartProperties
  - 配置文件的值最终会绑定每个类上，这个类会在容器中创建对象

- 按需加载所有自动配置项

- - 非常多的starter
  - 引入了哪些场景这个场景的自动配置才会开启

- - SpringBoot所有的自动配置功能都在 spring-boot-autoconfigure 包里面



**那么它是如何自动配置的呢？**

我们需要先了解下SpringBoot底层的相关注解



## 2.2 常见注解



### 2.2.1 @Bean

==@Bean给容器中添加组件。==以方法名作为组件的id。返回类型就是组件类型。返回的值，就是组件在容器中的实例

> **组件的概念在上面提到了就是符合某种规范的类，可以理解为给容器中添加对象**

```java
/**
User类和Pet要提前写好
*/
@Bean
public User user01(){
    return new User("zs",12);
}

////这个我们自定义一个名字，不用方法名作为实例的名字了
@Bean("tiger")
public Pet animal01(){
    return new Pet("li");
}
```



如下，SpringApplication.run（）返回值是把IOC容器返回给我们了

```java
ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
```

**我们用返回的IOC容器进行测试看看通过@Bean添加的组件有没有添加成功**

```java
@SpringBootApplication
public class MainApplication {
    public static void main(String[] args) {
//        1.返回值是IOC容器
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);

        boolean tiger1 = run.containsBean("tiger");
        System.out.println(tiger1);

        boolean user01 = run.containsBean("user01");
        System.out.println(user01);
    }
}
```



![image-20220210214158961](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210214158961.png)



### 2.2.2 @Configuration

> **组件(component):**
>
>    组件也是抽象的概念,可以理解为一些符合某种规范的类组合在一起就构成了组件。他可以提供某些特定的功能。J2EE来说，有什么servlet，jsp, javabean，ejb都是组件。但实际他们都是类，只不过有他们特殊的规定。组件和类的关系:**符合某种规范的类的组合**构成组件

@Configuration作用是==告诉SpringBoot这是一个配置类 == 配置文件==

之前的Spring学习中，我们通过XML配置文件进行管理bean

通过@Configuration注解可以不用写XML配置文件，将它写在类上面可以把这个类当成配置类来用。对象的管理在这个配置类中进行

```java
@Configuration
public class Myconfig {
}
```





**@Configuration(proxyBeanMethods = true)，默认值是true的。那么它有什么用呢？**

> Full(proxyBeanMethods = true)、【保证每个@Bean方法被调用多少次返回的组件都是单实例的】
>
> Lite(proxyBeanMethods = false)【每个@Bean方法被调用多少次返回的组件都是新创建的】
>
> **组件依赖必须使用Full模式默认。其他默认是否Lite模式**
>
> 我们打印Myconfig对象可以看到是EnhancerBySpringCGLIB，**这个就代表它是一个被SpringCGLIB增强了的代理对象**
>
> com.caq.boot.config.Myconfig$$EnhancerBySpringCGLIB$$dfb5b12f@55f45b92
>
> ==如果代理对象调用配置类中注册组件使用的方法返回值一定是单实例==

```java
********配置类********
@Configuration(proxyBeanMethods = true)
public class Myconfig {
    @Bean
    public User user01(){
        return new User("zs",12);
    }

    @Bean("tiger")  //这个我们自定义一个名字，不用方法名作为实例的名字了
    public Pet animal01(){
        return new Pet("li");
    }
}
   

********主程序类********
@SpringBootApplication
public class MainApplication {
public static void main(String[] args) {
    //1.返回值是IOC容器
    ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
    
    Myconfig myconfig = run.getBean(Myconfig.class);
    System.out.println("对配置类中的这个组件注册方法调用看获取到的对象是不是同一对象");
    User user02 = myconfig.user01();
    User user03 = myconfig.user01();
    System.out.println(user02==user03);
    }
}

********测试结果*******
...
com.caq.boot.config.Myconfig$$EnhancerBySpringCGLIB$$3ea98f23@1d81e101
对配置类中的这个组件注册方法调用看获取到的对象是不是同一对象
true
```



### 2.2.3 @Import

> ==和@Bean功能类似，都是注册组件的==
>
> @Import({User.class, DBHelper.class})作用是给容器中自动创建出这两个类型的组件、默认组件的名字就是全类名

```java
@SpringBootApplication
public class MainApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);

        String[] beanNamesForType = run.getBeanNamesForType(User.class);
        for (String s : beanNamesForType) {
            System.out.println(s);
        }
    }
}


*************打印结果************
com.caq.boot.bean.User
user01
```



### 2.2.4 @Conditional

> ==@Conditional就是条件装配：满足Conditional指定的条件，则进行组件注入==
>
> @ConditionalOnBean(name = "tiger")如果容器中有tiger这个组件才会执行下面的配置
>
> @ConditionalOnMissingBean(name = "tiger")如果容器中没有tiger这个组件才会执行下面的配置

```java
@Import({User.class, DBHelper.class})
@Configuration(proxyBeanMethods = true)
@ConditionalOnBean(name = "tiger")
//@ConditionalOnMissingBean(name = "tiger")
public class Myconfig {
    @Bean
    public User user01(){
        return new User("zs",12);
    }

//    @Bean("tiger")
    public Pet animal01(){
        return new Pet("li");
    }
}
```



![image-20220210230048313](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210230048313.png)



### 2.2.5 @ImportResource

> 可以引入xml配置文件中的bean

```xml
======================beans.xml=========================
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <bean id="zs" class="com.caq.boot.bean.User">
        <property name="name" value="zhangsan"></property>
        <property name="age" value="18"></property>
    </bean>

    <bean id="dog" class="com.caq.boot.bean.Pet">
        <property name="name" value="tomcat"></property>
    </bean>
</beans>
```

```java
@ImportResource("classpath:beans.xml")
public class MyConfig {}
```



### 2.2.6 @ConfigurationProperties

> ==将我们的类和配置文件进行绑定==
> @ConfigurationProperties(prefix = "mycar")和配置文件绑定，prefix是和配置文件中的前缀对应
>
> 配置绑定可以理解为字面意思，将要配置给对象的属性写在配置文件中。通过@ConfigurationProperties注解来实现赋值

![image-20220210231714953](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210231714953.png)



```java
**************************car的实体类*******************
//只有在容器中的组件才有SpringBoot提供的功能
@Component
@ConfigurationProperties(prefix = "mycar")
public class Car {
    private String brand;
    private String price;

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Car{" +
                "brand='" + brand + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}


**********************web层代码***************************
@RestController
//@RestController是@ResponseBody的结合@Controller
public class Controller {

    @RequestMapping("/hello")
    public String handle01() {
        return "Hello SpringBoot 2 !" + "你好";
    }

    @Autowired
    Car car;

    @RequestMapping("/car")
    public Car car() {
        return car;
    }
}
```

运行springboot程序，访问可以发现成功把配置文件中的值注入到对象里了，绑定成功了

![image-20220210231941725](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210231941725.png)

第二种配置文件绑定的方式

> @Component+@ConfigurationProperties这种方式需要手动的把要绑定的类注册到容器中，如果是外部的类的话很不方便
>
> @EnableConfigurationProperties(Car.class)+@ConfigurationProperties
>
> 其中@EnableConfigurationProperties(Car.class)能实现
>
> 1.开启car配置绑定功能
>
> 2.把这个car组件自动注册到容器中

```java
@Configuration
@EnableConfigurationProperties(Car.class)
public class Myconfig {}

@ConfigurationProperties(prefix = "mycar")
public class Car {}
```







## 2.3 自动配置原理入门

### 2.3.1 回顾注解

==什么是元注解?==

元注解是可以注解到注解上的注解，或者说元注解是一种**基本注解**，但是它能够应用到其它的注解上面。它的作用和目的就是给其他普通的标签**进行解释说明**的。

Retention 的英文意为保留期的意思。当 `@Retention` 应用到一个注解上的时候，它解释说明了**这个注解的的存活时间**。

它的取值如下：

- RetentionPolicy.SOURCE 注解只在源码阶段保留，在编译器进行编译时它将被丢弃忽视。
- RetentionPolicy.CLASS 注解只被保留到编译进行的时候，它并不会被加载到 JVM 中。
- RetentionPolicy.RUNTIME 注解可以保留到程序运行的时候，它会被加载进入到 JVM 中，所以在程序运行时可以获取到它们。



==@Documented有什么用？==

`@Documented 保存到javadoc`

顾名思义，这个元注解肯定是和文档有关。它的作用是能够将注解中的元素**包含到 Javadoc 中**去。（Javadoc用于描述类或者方法的作用）





==@Target 限定使用场景==
Target 是目标的意思，@Target 指定了注解运用的地方。**当一个注解被 @Target 注解时，这个注解就被限定了运用的场景**。类比到标签，原本标签是你想张贴到哪个地方就到哪个地方，但是因为 @Target 的存在，它张贴的地方就非常具体了，比如只能张贴到方法上、类上、方法参数上等等。

**@Target 有下面的取值:**

1. ElementType.ANNOTATION_TYPE 可以给一个注解进行注解
2. ElementType.CONSTRUCTOR 可以给构造方法进行注解
3. ElementType.FIELD 可以给属性进行注解
4. ElementType.LOCAL_VARIABLE 可以给局部变量进行注解
5. ElementType.METHOD 可以给方法进行注解
6. ElementType.PACKAGE 可以给一个包进行注解
7. ElementType.PARAMETER 可以给一个方法内的参数进行注解
8. ElementType.TYPE 可以给一个类型进行注解，比如类、接口、枚举



==@Inherited 注解继承==

Inherited 是继承的意思，它的意思是@Inherited注解了B注解，B再注解别人，那么如果它的子类没有被任何注解应用的话，那么这个子类就继承了超类的注解，代码来解释。

```java
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@interface Test {}

@Test
public class A {}

public class B extends A {}
```

注解 Test 被 @Inherited 修饰，之后类 A 被 Test 注解，类 B 继承 A,类 B 也拥有 Test 这个注解。





### 2.3.2 @SpringBootConfiguration

> 这是注解@SpringBootConfiguration的源码，因为@Inherited注解
>
> 所以@SpringBootApplication注解的类继承了这个超类的三个注解@SpringBootConfiguration
> @EnableAutoConfiguration
> @ComponentScan

![image-20220211114648764](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211114648764.png)



**之后我们在分别看这三个注解**

![image-20220211114734876](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211114734876.png)

**原来@SpringBootConfiguration是@Configuration是用来表示类为配置类的**





### 2.3.3 @ComponentScan

> Spring部分就学过，是知道扫描哪些，spring注解



### 2.3.4 @EnableAutoConfiguration

EnableAutoConfiguration的目的是启动SpringBoot的自动配置机制。



![image-20220211115118579](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211115118579.png)

- `@AutoConfigurationPackage`：自动配置包
- `@Import`：给IOC容器导入组件



#### @AutoConfigurationPackage

我们可以发现，依靠的还是`@Import`注解，再点进去查看，我们发现重要的就是以下的代码：

![image-20220211115514409](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211115514409.png)

它的作用就是在**默认**的情况下将主配置类(`@SpringBootApplication`)的所在包及其子包里边的组件扫描到Spring容器中。

==这个扫描的和Component扫描的对象不同==

> 比如说，你用了Spring Data JPA，可能会在实体类上写`@Entity`注解。这个`@Entity`注解由`@AutoConfigurationPackage`扫描并加载，而我们平时开发用的`@Controller/@Service/@Component/@Repository`这些注解是由`ComponentScan`来扫描并加载的。





#### @Import(AutoConfigurationImportSelector.class)

使用Import自动导入所有符合自动配置条件的Bean定义并加载到IOC容器



### 2.3.5 总结

- pringBoot先加载所有的自动配置类  xxxxxAutoConfiguration
- 每个自动配置类按照条件进行生效，默认都会绑定配置文件指定的值。xxxxProperties里面拿。xxxProperties和配置文件进行了绑定

- 生效的配置类就会给容器中装配很多组件
- 只要容器中有这些组件，相当于这些功能就有了

- 定制化配置

- - 用户直接自己@Bean替换底层的组件
  - 用户去看这个组件是获取的配置文件什么值就去修改。



## 2.4 开发小技巧

### 2.4.1 lombok

> lombok能简化JavaBean的开发
>
> 在pom文件里添加依赖

```xml
<dependency>
<groupId>org.projectlombok</groupId>
<artifactId>lombok</artifactId>
</dependency>
```



并在idea中下载插件

![image-20220211161847670](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211161847670.png)



以前的getset方法我们不用写了，通过注解@Data,它就可以在编译的时候自动生成getset方法了

![image-20220211162046541](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211162046541.png)



```JAVA
@NoArgsConstructor//为JavaBean添加无参构造
@AllArgsConstructor//为JavaBean添加有参构造
@Data
@ToString
public class Pet {
    private String name;
}
```



==Slf4j==

**简化日志开发**

添加@Slf4j注解既有此功能

![image-20220211162758254](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211162758254.png)



### 2.4.2 dev-tools

项目或者页面修改以后：Ctrl+F9；

修改后的页面效果就会立马显示出来

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```





### 2.4.3 Spring Initailizr

==这个功能能帮我们快速构建SpringBoot项目==

如下：

![image-20220211164712156](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211164712156.png)



![image-20220211164746394](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211164746394.png)



**选中想要开发的项目需要的组件**

![image-20220211164757887](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211164757887.png)



目录结构直接给我们创建好了，而且SpringBoot的启动程序也写好了

我们只需要关注逻辑代码即可~

![image-20220211165921287](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211165921287.png)





# 三、SpringBoot2核心功能

## 3.1 配置文件

### 3.1.1 properties

就是正常的配置文件，和前面学的一样



### 3.1.2 yaml

### 3.1.3**简介**

YAML 是 "YAML Ain't Markup Language"（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）。 

==非常适合用来做以数据为中心的配置文件==



> 这个我太熟悉了啊，当时在专科的时候参加云计算竞赛，要写容器编排。我搁那天天练这个啊，当时也不知道格式啥的，就是死记硬背。
>
> 我想说的是，这个很重要，后面学ansible的时候也会用到这个，给爷狠学！！！



**基本语法**

- key: value；kv之间有空格
- 大小写敏感

- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格

- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释

- 字符串无需加引号，如果要加，''与""表示字符串内容 会被 转义/不转义



**数据类型**

- 字面量：单个的、不可再分的值。date、boolean、string、number、null

```yaml
k: v
```



- 对象：键值对的集合。map、hash、set、object

```yaml
行内写法：  k: {k1:v1,k2:v2,k3:v3}
#或
k: 
  k1: v1
  k2: v2
  k3: v3
```

- 数组：一组按次序排列的值。array、list、queue

```yaml
行内写法：  k: [v1,v2,v3]
#或者
k:
 - v1
 - v2
 - v3 
```



示例

```yaml
person:
  userName: zs
  boss: true
  birth: 2019/12/9
  age: 18
  
  # 数组写法
#  interests: [唱,跳,rap]
  interests:
    - 唱
    - 跳
    - rap

# 数组行内写法
#  集合也可以跟数组一样用-的形式来表示
#  也可以写成[]的形式
  animal: [Cat,Dog]


#  map的两种写法

#  score:
#    english: 99
#    math: 80

# 对象行内写法
#  score: {english:90,math:78}
#   这里面的冒号后面不用跟空格，因为这是json的表示方法
# 也可以写成键值对的形式{k:V,K:V}
  score: {english:90,math:78}

  salarys:
    - 9999.98
    - 9999.97
    
# 对象写法    
  pet:
    name: dog
    weight: 99.97

# 数组里面元素是对象的表示方法
  allPets:
    sick:
#     以下这两种都表示对象，分别是k:v的形式和{}的形式
      - {name: dog,weight: 34}
      - name: cat
        weight: 23
    health:
      - {name: A,weight: 10}
      - {name: B,weight: 20}
```

访问测试

![image-20220211181054123](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211181054123.png)



==配置提示==

自定义的类和配置文件绑定一般没有提示。

导入一个依赖即可~

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>


 <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
```





之后就能愉快的自动提示了

![image-20220211182549904](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211182549904.png)



==给属性赋值的几种方式==

我们可以通过yaml文件来给对象进行赋值，通过@ConfigurationProperties(prefix = "person")

注解的意思是可以让类和配置文件进行绑定，绑定配置文件中前缀为person的属性



第二种方式是通过@Value注解进行



## 3.2 Web开发

### 3.2.1 静态资源访问

在springboot，我们可以使用以下方式处理静态资源

1. webjars     loca1host:8080/webjars/
2. public，static，/**，resources
3. localhost:8080/

优先级: resources>static>public

> 只要静态资源放在类路径下： called `/static` (or `/public` or `/resources` or `/META-INF/resources`
>
> 访问 ： 当前项目根路径/ + 静态资源名 
>
> 原理： 静态映射/**
>
> 请求进来，先去找Controller看能不能处理。不能处理的所有请求又都交给静态资源处理器。静态资源也找不到则响应404页面

![image-20220211223549479](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211223549479.png)



启动成功后，直接访问 当前项目根路径/ + 静态资源名 

![image-20220211223613571](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211223613571.png)



==改变默认的静态资源路径==

> 改变为AAA文件为静态资源文件夹

![image-20220211224501384](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220211224501384.png)



==webjar==

> WebJars是一个很神奇的东西，可以让大家以jar包的形式来使用前端的各种框架、组件。

**完成依赖添加**

```xml
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>jquery</artifactId>
        <version>3.5.1</version>
    </dependency>
```



**进行测试**

可以尝试CTRL+f9快速编译

记得重启之后在访问，便可访问web静态资源了

![image-20220212110202662](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220212110202662.png)





### 3.2.2 欢迎页支持

> 静态资源路径下  index.html
>
> - 可以配置静态资源路径
>
> - 但是不可以配置静态 资源的访问前缀。否则导致 index.html不能被默认访问



就是把index页面放到静态资源目录下，他会自动访问这个页面

==如果访问不了，记得clean一下（Maven插件clean功能）==

![image-20220212113142116](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220212113142116.png)







### 3.2.3 自定义Favicon

> favicon.ico 放在静态资源目录下即可更换网站图标
>
> 设置静态资源访问路径会导致 Favicon 功能失效

![image-20220212114351400](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220212114351400.png)





### 3.2.4 请求映射

> @xxxMapping
>
> Rest风格支持==使用HTTP请求方式动词来表示对资源的操作==

 以前访问资源路径:

- /getUser 获取用户 
- /deleteUser 删除用户 
- /editUser 修改用户 
- /saveUser 存用户

 现在访问资源路径:

 **/user**

- **GET-获取用户** 
- **DELETE-删除用户**
- **PUT-修改用户**
- **POST-保存用户**

核心Filter; HiddenHttpMethodFilter 







 **SpringBoot中手动开启** 

```yaml
#开启rest风格在springboot里要手动开启
spring:
  mvc:
    hiddenmethod:
      filter:
        enabled: true
```

**表单**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
测试REST风格
<form action="/user" method="get">
    <input value="REST-GET 提交" type="submit">
</form>

<form action="/user" method="post">
    <input value="REST-POST 提交" type="submit">
</form>

表单method=post, 隐藏域 _method=put 
<form action="/user" method="post">
    <input name="_method" type="hidden" value="put">
    <input value="REST-put 提交" type="submit">
</form>

<form action="/user" method="post">
    <input name="_method" type="hidden" value="DELETE">
    <input value="REST-delete 提交" type="submit">
</form>
</body>
</html>
```





### 3.2.5 普通参数与基本注解

> 基本注解：
>
> @PathVariablev 获取路径变量
>
> @RequestHeader	获取请求头
>
> @RequestParams 获得请求参数
>
> @CookieValue 获取Cookie的值
>
> @RequestBody	获取请求体

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
测试REST风格
<form action="/user" method="get">
    <input value="REST-GET 提交" type="submit">
</form>

<form action="/user" method="post">
    <input value="REST-POST 提交" type="submit">
</form>

<form action="/user" method="post">
    <input name="_method" type="hidden" value="put">
    <input value="REST-put 提交" type="submit">
</form>

<form action="/user" method="post">
    <input name="_method" type="hidden" value="DELETE">
    <input value="REST-delete 提交" type="submit">
</form>


<hr>

测试基本注解
<ur>
    <a href="car/3/owner/zs?age=18&interest=girl&interest=boy">car/{id}}/owner/{username}</a>
    <li>@PathVariable(路径变量)</li>
    <li>@RequestHeader（获取请求头）</li>
    <li>@RequestParam（获取请求参数）</li>
    <li>@CookieValue（获取cookie）</li>
    <li>@RequestAttribute（获取request域属性）</li>
    <li>@RequestBody（获取请求体）</li>
    <li>@MatrixVariable（矩阵变量）</li>
</ur>


<form action="/save" method="post">
    测试@RequestBody注解<br>
    用户名:<input name="UserName"><br>
    邮箱：<input name="email"><br>
    <input type="submit" value="提交">
</form>

</body>
</html>





```





> @GetMapping用于将HTTP get请求映射到特定处理程序的方法注解
> 具体来说，@GetMapping是一个组合注解，是@RequestMapping(method = RequestMethod.GET)的缩写。
>
> @PostMapping用于将HTTP post请求映射到特定处理程序的方法注解
> 具体来说，@PostMapping是一个组合注解，是@RequestMapping(method = RequestMethod.POST)的缩写

```java
package com.caq.boot.controller;

import org.springframework.web.bind.annotation.*;
import sun.management.Agent;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ParameterController {

    @GetMapping("/car/{id}/owner/{username}")
    public Map<String,Object> getCar(@PathVariable("id") Integer id,
                                     @PathVariable("username") String username,
                                     @PathVariable Map<String,String> pv,
                                     @RequestHeader("user-Agent") String userAgent,
                                     @RequestHeader Map<String,String> header,
                                     @RequestParam("age") Integer age,
                                     @RequestParam("interest") List<String> interest,
                                     @RequestHeader Map<String,String> param
                                     ){
        /*
        @CookieValue("_ga")
        传入一个Map<String,String>可以接受所有的参数
        @PathVariable带key了就拿特点的，不带了就拿所有的
        @RequestHeader同上
         */
        HashMap<String, Object> map = new HashMap<>();

        map.put("id",id);
        map.put("username",username);
//        map.put("pv",pv);
//        map.put("userAgent",userAgent);
//        map.put("header",header);

//        map.put("age",age);
//        map.put("interest",interest);
////        map.put("param",param);
////        map.put("_ga",_ga);
        return map;
    }

    @PostMapping("/save")
    public Map postMethod(@RequestBody String content){
        HashMap<String, Object> map = new HashMap<>();

        map.put("content",content);
        return map;
    }

}
```





### 3.2.6 视图解析流程

1. 目标方法处理的过程中，所有数据都会被放在**ModelAndViewContainer 里面。包括数据和视图地址**
2. **方法的参数是一个自定义类型对象（从请求参数中确定的），把他重新放在** **ModelAndViewContainer** 
3. 任何目标方法执行完成以后都会返回 ModelAndView（数据和视图地址）
4. **processDispatchResult  处理派发结果（页面改如何响应）**



**视图解析：**

- 返回值以 forward: 开始： new InternalResourceView(forwardUrl); -->  转发request.getRequestDispatcher(path).forward(request, response);

- 返回值以 redirect: 开始：new RedirectView() --》 render就是重定向 

- 返回值是普通字符串： new ThymeleafView（）--->



### **3.2.7 Thymeleaf**

![image-20220225100624959](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220225100624959.png)



**只要需要使用thymeleaf，只需要导入对应的依赖即可!**

我们可以将html放在我们templates目录下即可！



> 为什么用Thymeleaf？
>
> JSP不好用，Thymeleaf好用它适用于SpringBoot模块。它使用html作为模板页，**通过html一些特殊标签语法代表其含义，不破坏html的结构**

![image-20220214182105607](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220214182105607.png)

Thymeleaf是一款==现代化、服务端Java模板引擎==

Thymeleaf是Springboot官方支持的模板引擎，有着动静分离等独有特点



- Thymeleaf的主要目标是为您的开发工作流程带来优雅自然的模板-HTML可以在浏览器中正确显示，也可以作为静态原型工作，从而可以在开发团队中加强协作。
- Thymeleaf拥有适用于Spring Framework的模块，与您喜欢的工具的大量集成以及插入您自己的功能的能力，对于现代HTML5 JVM Web开发而言，Thymeleaf是理想的选择——尽管它还有很多工作要做。





1. **基本语法**

| 表达式名字 | 语法   | 用途                              |
| ---------- | ------ | --------------------------------- |
| 变量取值   | ${...} | 获取请求域、session域、对象等值   |
| 选择变量   | *{...} | 获取上下文对象值                  |
| 消息       | #{...} | 获取国际化等值                    |
| 链接       | @{...} | 生成链接                          |
| 片段表达式 | ~{...} | jsp:include作用，引入公共页面片段 |



| 标签      | 作用               | 示例                                                         |
| :-------- | :----------------- | :----------------------------------------------------------- |
| th:id     | 替换id             | `<input th:id="${user.id}"/>`                                |
| th:text   | 文本替换           | `<p text:="${user.name}">bigsai</p>`                         |
| th:utext  | 支持html的文本替换 | `<p utext:="${htmlcontent}">content</p>`                     |
| th:object | 替换对象           | `<div th:object="${user}"></div>`                            |
| th:value  | 替换值             | `<input th:value="${user.name}" >`                           |
| th:each   | 迭代               | `<tr th:each="student:${user}" >`                            |
| th:href   | 替换超链接         | `<a th:href="@{index.html}">超链接</a>`                      |
| th:src    | 替换资源           | `<script type="text/javascript" th:src="@{index.js}"></script>` |



**2. thymeleaf使用**

> 我们只需要给request域中放一些数据，然后跳转到页面我们就能通过thymeleaf来取得这些值



引入依赖包

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```



控制层代码

```java
package com.caq.boot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewTestController {

    @GetMapping("/thymeleaf")
    public String forwardTest(Model model){
        //model中的数据会被放在请求域中 request.setAttribute("a",aa)
        model.addAttribute("message","你好thymeleaf");
        model.addAttribute("link","http://www.baidu.com");
        return "success";
    }
}
```



**html页面**

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title >Title</title>
</head>
<body>
<h1 th:text="${message}">哈哈</h1>
<h2>
    <a href="www.jd.com" th:href="${link}">去百度</a>
    <a href="www.jd.com" th:href="@{link}">去百度</a>
</h2>
</body>
</html>
```



> 补充：
>
> 假如在这个页面上有一个请求，url 为 "showAgain"
>
> 那么访问全 url 就是：http://localhost:8080/first/showAgain 相对路径，就是show.html 同级目录
>
>  
>
> 假如在这个页面上有一个请求，url 为 "/showAgain"
>
> 那么访问全 url 就是 http://localhost:8080/showAgain   绝对路径，就是从根目录 拼接 url

```java
@GetMapping("/responsive_table")
public String responsive_table(){
    return "table/responsive_table";
}
```



![image-20220215110854872](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220215110854872.png)





### 3.2.8 Thymeleaf补充

#### Thymeleaf处理SpringMVC请求及资源路径问题

如果工程运行起来后，CSS样式未加载，在检查元素中发现css的资源路径为http://localhost:8080/css/style.css这种格式的话，说明引用路径出现了问题，经过下面的方法处理后就会变成正确的引用路径例如http://localhost:8080/你的工程名/css/style.css

```html

<!-- 第一种方式（推荐）:<base> 标签为页面上的所有链接规定默认地址或默认目标 -->
<base th:href="@{/}">
<!-- 上面定义了base路径标签，SSM工程通常将css等静态资源目录放在WEB-INF下,那么这里的css路径就可以直接写css路径 -->
<link href="css/style.css" rel="stylesheet">

<!--  第二种方式:如果不使用base标签,就需要在每个引用的资源设置：@{/你的文件路径},每次引用都必须带上th:src="@{/}"才能正确引用-->
<script th:src="@{/js/javascript.js}"></script>
```



#### 配置Thymeleaf

第一步：在HTML文件头部引用Thymeleaf模板

```html
<html xmlns:th="http://www.thymeleaf.org">
```


第二步：pom.xml中添加maven依赖

```xml
<!-- thymeleaf -->
<dependency>
  <groupId>org.thymeleaf</groupId>
  <artifactId>thymeleaf-spring5</artifactId>
  <version>3.0.11.RELEASE</version>
</dependency>
```



#### 常用标签

| 标签      | 作用               | 示例                                                         |
| :-------- | :----------------- | :----------------------------------------------------------- |
| th:id     | 替换id             | `<input th:id="${user.id}"/>`                                |
| th:text   | 文本替换           | `<p text:="${user.name}">bigsai</p>`                         |
| th:utext  | 支持html的文本替换 | `<p utext:="${htmlcontent}">content</p>`                     |
| th:object | 替换对象           | `<div th:object="${user}"></div>`                            |
| th:value  | 替换值             | `<input th:value="${user.name}" >`                           |
| th:each   | 迭代               | `<tr th:each="student:${user}" >`                            |
| th:href   | 替换超链接         | `<a th:href="@{index.html}">超链接</a>`                      |
| th:src    | 替换资源           | `<script type="text/javascript" th:src="@{index.js}"></script>` |

#### 链接表达式: @{}

在Thymeleaf 中，如果想引入链接比如link，href，src，需要使用`@{资源地址}`引入资源



#### 变量表达式: ${...}

在Thymeleaf 中，如果想引入链接比如link，href，src，需要使用`@{资源地址}`引入资源



#### 消息表达: #{}

通俗易懂的来说`#{…}`语法就是用来**读取配置文件中数据**的



#### 行内写法

```
<h1 >[[${session.user.username}]]欢迎您</h1>
```





#### thymeleaf获取cookie缓存值

```html
<p>Username:<input type="text" id="username" name="username" th:each="cookie :${#httpServletRequest.getCookies()}"
                   th:if="${cookie.getName().equals('username')}"
                   th:value="${cookie.getValue()}"></p>

<p>Password:<input type="text" id="password" name="password" th:each="cookie :${#httpServletRequest.getCookies()}"
                               th:if="${cookie.getName().equals('password')}"
                               th:value="${cookie.getValue()}"></p></p>
```

需要[遍历](https://so.csdn.net/so/search?q=遍历&spm=1001.2101.3001.7020)该浏览器的所有cookie以获得对应值



### 3.2.8 SpringBoot实战

> 学了这么多我们来用SpringBoot构建一个后台管理系统
>
> 我们只关注业务逻辑的实现，前端代码展示不关注

**1. SpringBoot项目创建**

选中web开发常用的组件

thymeleaf、web-starter、devtools、lombok



**2. 静态资源处理**

自动配置好，我们只需要把所有静态资源放到static文件夹下即可



**3. 路径构建**

th:action="@{/login}"



**4. 模板抽取**

> 因为left side和header section部分所有的页面都是一样的，所以我们抽取出来一个公共部分，需要的这段代码的地方直接引用公共代码，这样让我们的代码更加简介。
>
> 
>
> 怎么抽取呢？
>
> 我们用thymeleaf，fragment类似于JSP的tag，在html中文件中，可以将多个地方出现的元素块用fragment包起来使用。

1. **th:insert:保留自己的主标签，保留th:fragment的主标签。**
2. **th:replace:不要自己的主标签，保留th:fragment的主标签。**
3. **th:include:保留自己的主标签，不要th:fragment的主标签。（官方3.0后不推荐）**

```html
<div th:insert="footer :: copy"></div>  
<div th:replace="footer :: copy"></div>  
<div th:include="footer :: copy"></div>
```

结果为：

```html
<div>  
    <footer>  
       the content of footer   
    </footer>    
</div>    

<footer>  
    the content of footer 
</footer>    

<div>  
    the content of footer 
</div>  
```



**5. 页面跳转**

> 如果账户密码匹配了就把账号密码封装到User对象中然后把对象保存到session域，以便后面的页面根据是否登录做判断。
>
> 密码匹配保存对象重定向至新页面
>
> 不配通过thymeleaf传入渲染后的数据到view层提示账号或密码错误之后返回到登录页

```java
@PostMapping("/login")
public String main(User user, HttpSession session, Model model){

    if(StringUtils.hasLength(user.getUserName()) && "123456".equals(user.getPassword())){
        //把登陆成功的用户保存起来
        session.setAttribute("loginUser",user);
        //登录成功重定向到main.html;  重定向防止表单重复提交
        return "redirect:/main.html";
    }else {
        model.addAttribute("msg","账号密码错误");
        //回到登录页面
        return "login";
    }
}
```



### 3.2.9 拦截器

> SpringBoot中的拦截器和我们javaweb阶段学的filter很像
>
> 拦截器就是用来拦截请求，根据拦截规则进行放行





==拦截器的使用步骤==

1. 编写一个拦截器实现HandlerInterceptor接口
2. 拦截器注册到容器中（实现WebMvcConfigurer的addInterceptors）
3. 指定拦截规则（如果是拦截所有，静态资源也会被拦截）



**1.编写一个拦截器实现HandlerInterceptor接口**

```java
package com.caq.admin.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 登录检查
 * 配置拦截器要拦截哪些请求
 * 把配置放在容器中
 */
@Slf4j
public class LoginInterceptor implements HandlerInterceptor {
    /**
     * 目标方法执行前
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String requestURI = request.getRequestURI();
        log.info("拦截的请求是"+requestURI);
        //        登录检查逻辑
        HttpSession session = request.getSession();

        Object loginUser = session.getAttribute("loginUser");
        if (loginUser != null){
            return true;
        }

        //拦截住，未登录，跳转到登录页
//        session.setAttribute("msg","Please login");
        request.setAttribute("msg","Please Login！！！");
        request.getRequestDispatcher("/").forward(request,response);
        return false;
    }

    /**
     * 目标方法执行后
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.info("postHandle执行{}",modelAndView);
    }

    /**
     * 页面渲染之后
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        log.info("afterCompletion{}执行异常（）",ex);
    }
}
```





**2.拦截器注册到容器中（实现WebMvcConfigurer的addInterceptors）**

- 指定拦截规则（如果是拦截所有，静态资源也会被拦截）

```java
package com.caq.admin.config;

import com.caq.admin.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 编写一个拦截器实现HandlerInterceptor接口
 * 拦截器注册到容器中（实现WebMvcConfigurer的addInterceptors）
 * 指定拦截规则（如果是拦截所有，静态资源也会被拦截）
 */
@Configuration
public class AdminWebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/**")//所有请求都会被拦截，包括静态资源
                .excludePathPatterns("/","/login","/css/**","/fonts/**","/images/**","/js/**");
    }
}
```



**3.测试**

> 我们访问main页面进行测试，原来写的拦截规则就可以去掉了，因为拦截器会帮我们自动拦截。
>
> 为了测试拦截器的常用方法的执行顺序我们在访问main页面的时候进行日志打印，查看我们访问main页面时所执行的方法

```java
  @GetMapping("/main.html")
    public String mainPage(HttpSession session,Model model){
        log.info("当前方法是：{}","mainPage");
//        //是否登录，拦截器，过滤器
//        Object loginUser = session.getAttribute("loginUser");
//        if (loginUser != null){
            return "main";
//        }else {
//            model.addAttribute("msg","请重新登陆");
//            return "login";
//        }
    }
```



> 测试一：直接访问main页面
>
> 我们直接访问main页面进行测试，发现拦截器帮我们拦截了下来并提示我们需要先登录才能访问

![image-20220215152240298](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220215152240298.png)



> 测试二：登录之后，查看拦截器方法的执行顺序
>
> preHandle在目标方法执行前执行
>
> 目标方法执行
>
> postHandle在目标方法执行后执行
>
> afterCompletion在页面渲染后执行

![image-20220215153151035](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220215153151035.png)



### 3.2.10 文件上传功能

> MultipartFile headerImg 允许上传单个文件
>
> MultipartFile[] photos	允许上传多个文件



**表单代码**

```html
<form method="post" action="/upload" enctype="multipart/form-data">
    <input type="file" name="file"><br>
    <input type="submit" value="提交">
</form>
```





**控制层代码**

```java
package com.caq.admin.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件上传测试
 */
@Slf4j
@Controller
public class FormTestController {

    @GetMapping("/form_layouts")
    public String form_layouts(){
        return "form/form_layouts";
    }

    @PostMapping("/upload")
    public String upload(@RequestParam("email") String email,
                         @RequestParam("username") String username,
                         @RequestPart("headerImg")MultipartFile headerImg,
                         @RequestPart("photos")MultipartFile[] photos){
        log.info("上传的信息:email={},username={}.headerImg={},photos={}",email,username,headerImg.getSize(),photos.length);

        return "main";
    }


}
```



**测试结果为**

![image-20220216153605507](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220216153605507.png)







### 3.2.11 异常处理

> 官网给出的解释如下：
>
> 默认情况下，Spring Boot提供`/error`处理所有错误的映射
>
> 对于机器客户端，它将生成JSON响应，其中包含错误，HTTP状态和异常消息的详细信息。对于浏览器客户端，响应一个“ whitelabel”错误视图，以HTML格式呈现相同的数据



![image-20220216160759097](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220216160759097.png)



**我们自定义错误页的时候，可以通过thymeleaf把错误信息打印到错误页面**

```html
<section class="error-wrapper text-center">
    <h1><img alt="" src="images/404-error.png"></h1>
    <h2 th:text="${status}">page not found</h2>
    <h3 th:text="${message}">We Couldn’t Find This Page</h3>
    <a class="back-btn" th:href="@{/main.html}"> Back To Home</a>
</section>
```

![image-20220216161302097](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220216161302097.png)





![image-20220216160912825](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220216160912825.png)



error/下的4xx，5xx页面会被自动解析

error/404.html   error/5xx.html；有精确的错误状态码页面就匹配精确，没有就找 4xx.html；如果都没有就触发白页



### 3.2.12 Web原生组件注入

> 简单API的使用，不用过多说明。会用即可



**使用Servlet API**

@ServletComponentScan("com.caq.admin") 指定原生的servlet组件都放在哪里

@WebServlet(urlPatterns = "/my") 直接响应，没有经过spring的拦截器

@WebListener

@WebFilter(urlPatterns = {"/css/*","/images/*"})

只有结合这几个注解开发，我们的原生组件才能注入过来

日常开发推荐以上这种方式





**使用RegistrationBean**

```java
@Configuration
public class MyRegistConfig {

    @Bean
    public ServletRegistrationBean myServlet(){
        MyServlet myServlet = new MyServlet();

        return new ServletRegistrationBean(myServlet,"/my","/my02");
    }


    @Bean
    public FilterRegistrationBean myFilter(){

        MyFilter myFilter = new MyFilter();
//        return new FilterRegistrationBean(myFilter,myServlet());
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(myFilter);
        filterRegistrationBean.setUrlPatterns(Arrays.asList("/my","/css/*"));
        return filterRegistrationBean;
    }

    @Bean
    public ServletListenerRegistrationBean myListener(){
        MySwervletContextListener mySwervletContextListener = new MySwervletContextListener();
        return new ServletListenerRegistrationBean(mySwervletContextListener);
    }
}
```



### 3.2.13 嵌入式Servlet容器

- 默认支持的webServer

- - `Tomcat`, `Jetty`, or `Undertow`
  - `ServletWebServerApplicationContext 容器启动寻找ServletWebServerFactory 并引导创建服务器`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

原理

- **SpringBoot应用启动发现当前是Web应用。web场景包-导入tomcat**
- web应用会创建一个web版的ioc容器 `ServletWebServerApplicationContext` 

- `ServletWebServerApplicationContext` 启动的时候寻找 `ServletWebServerFactory``（Servlet 的web服务器工厂---> Servlet 的web服务器）` 
- SpringBoot底层默认有很多的WebServer工厂；`TomcatServletWebServerFactory`, `JettyServletWebServerFactory`, or `UndertowServletWebServerFactory`

- `底层直接会有一个自动配置类。ServletWebServerFactoryAutoConfiguration`
- `ServletWebServerFactoryAutoConfiguration导入了ServletWebServerFactoryConfiguration（配置类）`

- `ServletWebServerFactoryConfiguration 配置类 根据动态判断系统中到底导入了那个Web服务器的包。（默认是web-starter导入tomcat包），容器中就有 TomcatServletWebServerFactory`
- `TomcatServletWebServerFactory 创建出Tomcat服务器并启动；TomcatWebServer 的构造器拥有初始化方法initialize---this.tomcat.start();`

- `内嵌服务器，就是手动把启动服务器的代码调用（tomcat核心jar包存在）`



### 3.2.14 SpringBoot原理套路

**引入场景starter** **-- xxxxAutoConfiguration --导入xxx组件 - 绑定xxxProperties --** **绑定配置文件项** 





## 3.3 数据访问

### 3.3.1 数据源的自动配置

> 我们发现只要导入jdbc场景，SpringBoot就会自动给我们导入HiKariDS
>
> HiKariDS它是性能最好的数据源



**导入JDBC场景**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>
```



![image-20220219110545981](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220219110545981.png)



导入jdbc之后并没有导入数据库的驱动，是因为官方不知道我们要导入什么数据库

**之后数据库的版本要和驱动版本对应**

![image-20220219111232997](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220219111232997.png)





**有两种修改方式**

1. 重新声明版本（maven的属性的就近优先原则）

2. 直接依赖引入具体版本（maven的就近依赖原则）

   

![image-20220219112809058](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220219112809058.png)







**配置文件**

```yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mp
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver
```



**测试**

```java
@Slf4j
@SpringBootTest
class AdminSystemApplicationTests {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {
        Long aLong = jdbcTemplate.queryForObject("select count(*) from user", Long.class);
        log.info("总数有"+aLong);
    }

}


2022-02-19 11:50:03.332  INFO 7200 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2022-02-19 11:50:03.804  INFO 7200 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2022-02-19 11:50:04.120  INFO 7200 --- [           main] c.caq.admin.AdminSystemApplicationTests  : Started AdminSystemApplicationTests in 4.476 seconds (JVM running for 6.428)

2022-02-19 11:50:04.521  INFO 7200 --- [           main] c.caq.admin.AdminSystemApplicationTests  : 总数有5
```

 

### 3.3.2 使用Druid数据源

==修改默认的数据源步骤：==

1. **导入第三方数据源**
2. **设置配置类**
3. **测试**

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.17</version>
</dependency>
```





```java
@Configuration
public class MyDataSourceConfig {

    //把组件的东西和配置文件的东西进行绑定
    @ConfigurationProperties("spring.datasource")
    @Bean
    public DataSource dataSource(){
        DruidDataSource druidDataSource = new DruidDataSource();
        return druidDataSource;
    }
}
```



```java
@Slf4j
@SpringBootTest
class AdminSystemApplicationTests {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    DataSource dataSource;

    @Test
    void contextLoads() {
        Long aLong = jdbcTemplate.queryForObject("select count(*) from user", Long.class);
        log.info("总数有"+aLong);
        log.info("数据源类型：{}",dataSource.getClass());
    }

}


...........
2022-02-19 12:12:09.644  INFO 16124 --- [           main] c.caq.admin.AdminSystemApplicationTests  : 总数有5
2022-02-19 12:12:09.644  INFO 16124 --- [           main] c.caq.admin.AdminSystemApplicationTests  : 数据源类型：class com.alibaba.druid.pool.DruidDataSource
```



==开启druid监控功能==

步骤：

1. 配置监控页，开启监控功能
2. sql查询进行测试

```java
@Configuration
public class MyDataSourceConfig {

    //把组件的东西和配置文件的东西进行绑定
    @ConfigurationProperties("spring.datasource")
    @Bean
    public DataSource dataSource() throws SQLException {
        DruidDataSource druidDataSource = new DruidDataSource();

        //加入监控功能
        druidDataSource.setFilters("stat");

        return druidDataSource;
    }

    /**
     * 配置druid的监控页
     * @return
     */
    @Bean
    public ServletRegistrationBean statViewServlet(){
        StatViewServlet statViewServlet = new StatViewServlet();
        ServletRegistrationBean<StatViewServlet> registrationBean = new ServletRegistrationBean<>(statViewServlet,"/druid/*");

        return registrationBean;
    }
}
```



```java
@Autowired
JdbcTemplate jdbcTemplate;

@ResponseBody
@GetMapping("/sql")
public String queryFormDb()   {
    Long aLong = jdbcTemplate.queryForObject("select count(*) from user", Long.class);

    return aLong.toString();
}
```

![image-20220219125839949](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220219125839949.png)

![image-20220219125825951](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220219125825951.png)





==使用官方starter方式==

> 使用官方的stater方式之后，我们就不用写配置类了。所有的功能设置我们都可以由配置文件来完成

所有功能开启参照如下步骤即可：

1. 引入依赖
2. 设置配置文件
3. 测试



**引入druid-starter**

```xml
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid-spring-boot-starter</artifactId>
        <version>1.1.17</version>
    </dependency>
```



**设置配置文件**

写配置文件这种方式简化了我们去写配置类往spring容器中注入组件这种方式，因为它们有自动配置功能...

```yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mp
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver
    druid:
      aop-patterns: com.caq.admin.* # 监控SpringBean

      filters: stat,wall  # 底层开启功能，stat（sql监控），wall（防火墙）

      stat-view-servlet:  # 配置监控页功能
        enabled: true
        login-username: admin
        login-password: admin
        reset-enable: false

      web-stat-filter:
        enabled: true
        url-pattern: /*
        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*'

      filter:
        stat: # 对上面filters里面的stat的详细配置
          slow-sql-millis: 1000
          log-slow-sql: true
          enabled: true
        wall:
          enabled: true
          config:
            drop-table-allow: false
```



**测试**

功能都被完整的开启了

![image-20220219151423642](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220219151423642.png)











### 3.3.3 整合Mybatis操作

==引入依赖：==

```xml
        <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>2.1.4</version>
    </dependency>
```



![image-20220219164132730](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220219164132730.png)



==原生操作==

- 创建实体类
- 写mybatis主配置文件
- 写接口
- 写mapper映射文件
- 获得sqlsession
- 测试



==SpringBoot整合Mybatis==

释放了mybatis-config.xml文件,通过yml文件中的指定来替换。数据库映射mapper.xml文件通过在接口上写@Mapper注解和方法上写注解的方式实现

yml文件

```yml
mybatis:
#  通过yml配置文件的方式解放了mybatis-config.xml文件
  configuration:
    map-underscore-to-camel-case: true #开启驼峰命名
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

    @Select("select * from account where id = #{id}")
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





### 3.3.4 整合Mybatis-Plus完成CRUD

引入mp依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.1</version>
</dependency>
```



![image-20220219202300014](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220219202300014.png)



编写mysql数据源信息

```properties
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

**在我们学习MP的时候，直接写个mapper就好了。但是在我们的web开发阶段，我们将Mapper分成service接口和实现类。面向接口编程使程序更灵活，逻辑更清楚**

> 面向接口编程是先把客户的业务逻辑线提取出来，作为接口，业务具体实现通过该接口的实现类来完成。当客户需求变化时，只需编写该业务逻辑的新的实现类，通过更改配置文件中该接口的实现类就可以完成需求，不需要改写现有代码，减少对系统的影响。（这个概念的理解很重要，先记着后面实践的时候会越来越清晰！）

```java
package com.caq.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.caq.admin.bean.User;

public interface UserService extends IService<User> {
}







package com.caq.admin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.caq.admin.bean.User;
import com.caq.admin.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> {

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



测试

```java
package com.caq.admin.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.caq.admin.bean.User;
import com.caq.admin.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class testController {

    //    @Autowired
//    UserService userService;
//    @Autowired
//    UserMapper userMapper;

    @Autowired
    UserServiceImpl userServiceImpl;

    @GetMapping("/")
    public String test1(@RequestParam(value = "pn",defaultValue = "1") Integer pn, Model model) {
//        List<User> list = userService.list(null);
//        model.addAttribute("users",list);
//        List<User> list = userMapper.selectList(null);
//        model.addAttribute("users",list);
        List<User> list = userServiceImpl.list(null);
//        model.addAttribute("users",list);

//        分页数据
        Page<User> userPage = new Page<>(pn,2);

//        分页查询的结果
        IPage<User> page = userServiceImpl.page(userPage, null);

        long current = page.getCurrent();
        long pages = page.getPages();
        long total = page.getTotal();
        List<User> records = page.getRecords();

        model.addAttribute("page",page);

        return "a";
    }
```



```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

    <table>
        <thead>
        <tr>
            <th>#</th>
            <th>id</th>
            <th>name</th>
            <th>age</th>
            <th>email</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="user,stat:${page.records}">
            <td th:text="${stat.count}">序号</td>
            <td th:text="${user.id}">id</td>
            <td th:text="${user.name}">name</td>
            <td th:text="${user.age}">age</td>
            <td th:text="${user.email}">email</td> 
            <td>
                <a th:href="@{/user/delete/{id}(id=${user.id})}" type="button">删除</button>
            </td>
        </tr>
        </tbody>
    </table>
    当前第[[${page.current}]]页  总计 [[${page.pages}]]页  共[[${page.total}]]条记录
    <ul>
        <li><a href="#">← 前一页</a></li>
        <li th:each="num:${#numbers.sequence(1,page.pages)}">
            <a th:href="@{/(pn=${num})}">[[${num}]]</a>
        </li>
        <li><a href="#">下一页 → </a></li>
    </ul>
<!-- </body>th:class="${num == page.current?'active':''}" -->
</html>

```



为了提高访问速度，我写了个简陋的前端页面，但是实现了RD功能

完成CRUD功能需要很多thymeleaf知识点，不是我们学习重点，所以现写到RD功能

![image-20220220224343007](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220220224343007.png)



## 3.4 单元测试

### 3.4.1 Junit5的变化

Junit5是SpringBoot2.2.0版本后开始引入的默认单元测试默认库

![image-20220222081505722](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220222081505722.png)



以前：

@SpringBootTest + @RunWith(SpringTest.class)



SpringBoot整合Junit以后。

- 编写测试方法：@Test标注（注意需要使用junit5版本的注解）
- Junit类具有Spring的功能，@Autowired、比如 @Transactional 标注测试方法，测试完成后自动回滚



### 3.4.2 Junit5常用注解

- @Test :表示方法是测试方法。但是与JUnit4的@Test不同，他的职责非常单一不能声明任何属性，拓展的测试将会由Jupiter提供额外测试
- @ParameterizedTest :表示方法是参数化测试，下方会有详细介绍

- @RepeatedTest :表示方法可重复执行，下方会有详细介绍
- @DisplayName :为测试类或者测试方法设置展示名称

- @BeforeEach :表示在每个单元测试之前执行
- @AfterEach :表示在每个单元测试之后执行

- @BeforeAll :表示在所有单元测试之前执行
- @AfterAll :表示在所有单元测试之后执行

- @Tag :表示单元测试类别，类似于JUnit4中的@Categories
- @Disabled :表示测试类或测试方法不执行，类似于JUnit4中的@Ignore

- @Timeout :表示测试方法运行如果超过了指定时间将会返回错误
- @ExtendWith :为测试类或测试方法提供扩展类引用



```java
import org.junit.jupiter.api.Test; //注意这里使用的是jupiter的Test注解！！


public class TestDemo {

  @Test
  @DisplayName("第一次测试")
  public void firstTest() {
      System.out.println("hello world");
  }
```



### 3.4.3 断言

==简单的断言==

断言（assertions）是测试方法中的核心部分，用来对测试需要满足的条件进行验证。**这些断言方法都是 org.junit.jupiter.api.Assertions 的静态方法**。JUnit 5 内置的断言可以分成如下几个类别：

**检查业务逻辑返回的数据是否合理。**

**所有的测试运行结束以后，会有一个详细的测试报告；**

| 方法            | 说明                                 |
| --------------- | ------------------------------------ |
| assertEquals    | 判断两个对象或两个原始类型是否相等   |
| assertNotEquals | 判断两个对象或两个原始类型是否不相等 |
| assertSame      | 判断两个对象引用是否指向同一个对象   |
| assertNotSame   | 判断两个对象引用是否指向不同的对象   |
| assertTrue      | 判断给定的布尔值是否为 true          |
| assertFalse     | 判断给定的布尔值是否为 false         |
| assertNull      | 判断给定的对象引用是否为 null        |
| assertNotNull   | 判断给定的对象引用是否不为 null      |

```java
@Test
@DisplayName("simple assertion")
public void simple() {
     assertEquals(3, 1 + 2, "simple math");
     assertNotEquals(3, 1 + 1);

     assertNotSame(new Object(), new Object());
     Object obj = new Object();
     assertSame(obj, obj);

     assertFalse(1 > 2);
     assertTrue(1 < 2);

     assertNull(null);
     assertNotNull(new Object());
}
```



==数组断言==

通过 assertArrayEquals 方法来判断两个对象或原始类型的数组是否相等

```java
@Test
@DisplayName("array assertion")
public void array() {
 assertArrayEquals(new int[]{1, 2}, new int[] {1, 2});
}
```



==组合断言==

assertAll 方法接受多个 org.junit.jupiter.api.Executable 函数式接口的实例作为要验证的断言，可以通过 lambda 表达式很容易的提供这些断言



```java
@Test
@DisplayName("assert all")
public void all() {
 assertAll("Math",
    () -> assertEquals(2, 1 + 1),
    () -> assertTrue(1 > 0)
 );
}
```



==异常断言==

在JUnit4时期，想要测试方法的异常情况时，需要用**@Rule**注解的ExpectedException变量还是比较麻烦的。而JUnit5提供了一种新的断言方式**Assertions.assertThrows()** ,配合函数式编程就可以进行使用。

```java
@Test
@DisplayName("异常测试")
public void exceptionTest() {
    ArithmeticException exception = Assertions.assertThrows(
           //扔出断言异常
            ArithmeticException.class, () -> System.out.println(1 % 0));

}
```



==超时断言==

Junit5还提供了**Assertions.assertTimeout()** 为测试方法设置了超时时间

```java
@Test
@DisplayName("超时测试")
public void timeoutTest() {
    //如果测试方法时间超过1s将会异常
    Assertions.assertTimeout(Duration.ofMillis(1000), () -> Thread.sleep(500));
}
```



==快速失败==

通过 fail 方法直接使得测试失败

```java
@Test
@DisplayName("fail")
public void shouldFail() {
 fail("This should fail");
}
```



### 3.4.4 前置条件（assumptions）

JUnit 5 中的前置条件（**assumptions【假设】**）类似于断言，不同之处在于**不满足的断言会使得测试方法失败**，而不满足的**前置条件只会使得测试方法的执行终止**。前置条件可以看成是测试方法执行的前提，当该前提不满足时，就没有继续执行的必要。

```java
@DisplayName("前置条件")
public class AssumptionsTest {
 private final String environment = "DEV";
 
 @Test
 @DisplayName("simple")
 public void simpleAssume() {
    assumeTrue(Objects.equals(this.environment, "DEV"));
    assumeFalse(() -> Objects.equals(this.environment, "PROD"));
 }
 
 @Test
 @DisplayName("assume then do")
 public void assumeThenDo() {
    assumingThat(
       Objects.equals(this.environment, "DEV"),
       () -> System.out.println("In DEV")
    );
 }
}
```

assumeTrue 和 assumFalse 确保给定的条件为 true 或 false，不满足条件会使得测试执行终止。assumingThat 的参数是表示条件的布尔值和对应的 Executable 接口的实现对象。只有条件满足时，Executable 对象才会被执行；当条件不满足时，测试执行并不会终止。



### 3.4.5 嵌套测试

JUnit 5 可以通过 Java 中的内部类和@Nested 注解实现嵌套测试，从而可以更好的把相关的测试方法组织在一起。在内部类中可以使用@BeforeEach 和@AfterEach 注解，而且嵌套的层次没有限制。



```java
@DisplayName("A stack")
class TestingAStackDemo {

    Stack<Object> stack;

    @Test
    @DisplayName("is instantiated with new Stack()")
    void isInstantiatedWithNew() {
        new Stack<>();
    }

    @Nested
    @DisplayName("when new")
    class WhenNew {

        @BeforeEach
        void createNewStack() {
            stack = new Stack<>();
        }

        @Test
        @DisplayName("is empty")
        void isEmpty() {
            assertTrue(stack.isEmpty());
        }

        @Test
        @DisplayName("throws EmptyStackException when popped")
        void throwsExceptionWhenPopped() {
            assertThrows(EmptyStackException.class, stack::pop);
        }

        @Test
        @DisplayName("throws EmptyStackException when peeked")
        void throwsExceptionWhenPeeked() {
            assertThrows(EmptyStackException.class, stack::peek);
        }

        @Nested
        @DisplayName("after pushing an element")
        class AfterPushing {

            String anElement = "an element";

            @BeforeEach
            void pushAnElement() {
                stack.push(anElement);
            }

            @Test
            @DisplayName("it is no longer empty")
            void isNotEmpty() {
                assertFalse(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when popped and is empty")
            void returnElementWhenPopped() {
                assertEquals(anElement, stack.pop());
                assertTrue(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when peeked but remains not empty")
            void returnElementWhenPeeked() {
                assertEquals(anElement, stack.peek());
                assertFalse(stack.isEmpty());
            }
        }
    }
}
```



### 3.5.6 参数化测试

参数化测试是JUnit5很重要的一个新特性，它使得用不同的参数多次运行测试成为了可能，也为我们的单元测试带来许多便利。



利用**@ValueSource**等注解，指定入参，我们将可以使用不同的参数进行多次单元测试，而不需要每新增一个参数就新增一个单元测试，省去了很多冗余代码。



**@ValueSource**: 为参数化测试指定入参来源，支持八大基础类以及String类型,Class类型

**@NullSource**: 表示为参数化测试提供一个null的入参

**@EnumSource**: 表示为参数化测试提供一个枚举入参

**@CsvFileSource**：表示读取指定CSV文件内容作为参数化测试入参

**@MethodSource**：表示读取指定方法的返回值作为参数化测试入参(注意方法返回需要是一个流)



当然如果参数化测试仅仅只能做到指定普通的入参还达不到让我觉得惊艳的地步。让我真正感到他的强大之处的地方在于他可以支持外部的各类入参。如:CSV,YML,JSON 文件甚至方法的返回值也可以作为入参。只需要去实现**ArgumentsProvider**接口，任何外部文件都可以作为它的入参。

```java
@ParameterizedTest
@ValueSource(strings = {"one", "two", "three"})
@DisplayName("参数化测试1")
public void parameterizedTest1(String string) {
    System.out.println(string);
    Assertions.assertTrue(StringUtils.isNotBlank(string));
}


@ParameterizedTest
@MethodSource("method")    //指定方法名
@DisplayName("方法来源参数")
public void testWithExplicitLocalMethodSource(String name) {
    System.out.println(name);
    Assertions.assertNotNull(name);
}

static Stream<String> method() {
    return Stream.of("apple", "banana");
}
```





## 3.5 指标监控

### 3.5.1 SpringBoot Actuator

未来每一个微服务在云上部署以后，我们都需要对其进行监控、追踪、审计、控制等。SpringBoot就抽取了Actuator场景，使得我们每个微服务快速引用即可获得生产级别的应用监控、审计等功能。

```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
```



**1.0和2.0的区别**

![image-20220223080424720](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220223080424720.png)



**如何使用**

1. 引入场景

2. 访问 http://localhost:8080/actuator/**

3. 暴露所有监控信息为HTTP

   ```yml
   management:
     endpoints:
       enabled-by-default: true #暴露所有端点信息
       web:
         exposure:
           include: '*'  #以web方式暴露
   ```

4. 测试

http://localhost:8080/actuator/beans

http://localhost:8080/actuator/configprops

http://localhost:8080/actuator/metrics

http://localhost:8080/actuator/metrics/jvm.gc.pause

[http://localhost:8080/actuator/](http://localhost:8080/actuator/metrics)endpointName/detailPath



**可视化**

https://github.com/codecentric/spring-boot-admin





### 3.5.2 Actuator Endpoint

==最常使用的端点==

| ID                 | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| `auditevents`      | 暴露当前应用程序的审核事件信息。需要一个`AuditEventRepository组件`。 |
| `beans`            | 显示应用程序中所有Spring Bean的完整列表。                    |
| `caches`           | 暴露可用的缓存。                                             |
| `conditions`       | 显示自动配置的所有条件信息，包括匹配或不匹配的原因。         |
| `configprops`      | 显示所有`@ConfigurationProperties`。                         |
| `env`              | 暴露Spring的属性`ConfigurableEnvironment`                    |
| `flyway`           | 显示已应用的所有Flyway数据库迁移。 需要一个或多个`Flyway`组件。 |
| `health`           | 显示应用程序运行状况信息。                                   |
| `httptrace`        | 显示HTTP跟踪信息（默认情况下，最近100个HTTP请求-响应）。需要一个`HttpTraceRepository`组件。 |
| `info`             | 显示应用程序信息。                                           |
| `integrationgraph` | 显示Spring `integrationgraph` 。需要依赖`spring-integration-core`。 |
| `loggers`          | 显示和修改应用程序中日志的配置。                             |
| `liquibase`        | 显示已应用的所有Liquibase数据库迁移。需要一个或多个`Liquibase`组件。 |
| `metrics`          | 显示当前应用程序的“指标”信息。                               |
| `mappings`         | 显示所有`@RequestMapping`路径列表。                          |
| `scheduledtasks`   | 显示应用程序中的计划任务。                                   |
| `sessions`         | 允许从Spring Session支持的会话存储中检索和删除用户会话。需要使用Spring Session的基于Servlet的Web应用程序。 |
| `shutdown`         | 使应用程序正常关闭。默认禁用。                               |
| `startup`          | 显示由`ApplicationStartup`收集的启动步骤数据。需要使用`SpringApplication`进行配置`BufferingApplicationStartup`。 |
| `threaddump`       | 执行线程转储。                                               |



如果您的应用程序是Web应用程序（Spring MVC，Spring WebFlux或Jersey），则可以使用以下附加端点：

| ID           | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `heapdump`   | 返回`hprof`堆转储文件。                                      |
| `jolokia`    | 通过HTTP暴露JMX bean（需要引入Jolokia，不适用于WebFlux）。需要引入依赖`jolokia-core`。 |
| `logfile`    | 返回日志文件的内容（如果已设置`logging.file.name`或`logging.file.path`属性）。支持使用HTTP`Range`标头来检索部分日志文件的内容。 |
| `prometheus` | 以Prometheus服务器可以抓取的格式公开指标。需要依赖`micrometer-registry-prometheus`。 |



最常用的Endpoint

- Health：监控状况
- Metrics：运行时指标

- Loggers：日志记录



==Health Endpoint==

健康检查端点，我们一般用于在云平台，平台会定时的检查应用的健康状况，我们就需要Health Endpoint可以为平台返回当前应用的一系列组件健康状况的集合。

重要的几点：

- health endpoint返回的结果，应该是一系列健康检查后的一个汇总报告
- 很多的健康检查默认已经自动配置好了，比如：数据库、redis等

- 可以很容易的添加自定义的健康检查机制



访问如下网址即可查看健康检查

[localhost:8080/actuator/health](http://localhost:8080/actuator/health)

![image-20220223081849021](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220223081849021.png)



==Metrics Endpoint==

> metrics  度量
>
> Endpoint  端点

提供详细的、层级的、空间指标信息，这些信息可以被pull（主动推送）或者push（被动获取）方式得到；

- 通过Metrics对接多种监控系统
- 简化核心Metrics开发

- 添加自定义Metrics或者扩展已有Metrics



![image-20220223082152719](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220223082152719.png)



==管理Endpoint==

**开启与禁用Endpoints**

```yaml
management:
  endpoint:
    beans:
      enabled: true
```



- 或者禁用所有的Endpoint然后手动开启指定的Endpoint

```yaml
management:
  endpoints:
    enabled-by-default: false
  endpoint:
    beans:
      enabled: true
    health:
      enabled: true
```





==暴露Endpoints==

支持的暴露方式

- HTTP：默认只暴露**health**和**info** Endpoint
- **JMX**：默认暴露所有Endpoint

- 除过health和info，剩下的Endpoint都应该进行保护访问。如果引入SpringSecurity，则会默认配置安全访问规则

| ID                 | JMX  | Web  |
| ------------------ | ---- | ---- |
| `auditevents`      | Yes  | No   |
| `beans`            | Yes  | No   |
| `caches`           | Yes  | No   |
| `conditions`       | Yes  | No   |
| `configprops`      | Yes  | No   |
| `env`              | Yes  | No   |
| `flyway`           | Yes  | No   |
| `health`           | Yes  | Yes  |
| `heapdump`         | N/A  | No   |
| `httptrace`        | Yes  | No   |
| `info`             | Yes  | Yes  |
| `integrationgraph` | Yes  | No   |
| `jolokia`          | N/A  | No   |
| `logfile`          | N/A  | No   |
| `loggers`          | Yes  | No   |
| `liquibase`        | Yes  | No   |
| `metrics`          | Yes  | No   |
| `mappings`         | Yes  | No   |
| `prometheus`       | N/A  | No   |
| `scheduledtasks`   | Yes  | No   |
| `sessions`         | Yes  | No   |
| `shutdown`         | Yes  | No   |
| `startup`          | Yes  | No   |
| `threaddump`       | Yes  | No   |





### 3.5.3 定制Endpoint

==定制 Health 信息==

```java
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class MyHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        int errorCode = check(); // perform some specific health check
        if (errorCode != 0) {
            return Health.down().withDetail("Error Code", errorCode).build();
        }
        return Health.up().build();
    }

}

构建Health
Health build = Health.down()
                .withDetail("msg", "error service")
                .withDetail("code", "500")
                .withException(new RuntimeException())
                .build();
management:
    health:
      enabled: true
      show-details: always #总是显示详细信息。可显示每个模块的状态信息
```



```java
@Component
public class MyComHealthIndicator extends AbstractHealthIndicator {

    /**
     * 真实的检查方法
     * @param builder
     * @throws Exception
     */
    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        //mongodb。  获取连接进行测试
        Map<String,Object> map = new HashMap<>();
        // 检查完成
        if(1 == 2){
//            builder.up(); //健康
            builder.status(Status.UP);
            map.put("count",1);
            map.put("ms",100);
        }else {
//            builder.down();
            builder.status(Status.OUT_OF_SERVICE);
            map.put("err","连接超时");
            map.put("ms",3000);
        }


        builder.withDetail("code",100)
                .withDetails(map);

    }
}
```



==定制info信息==

常用两种方式

1. 编写配置文件

```yaml
info:
  appName: boot-admin
  version: 2.0.1
  mavenProjectName: @project.artifactId@  #使用@@可以获取maven的pom文件值
  mavenProjectVersion: @project.version@
```

2. 编写InfoContributor

```java
import java.util.Collections;

import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.stereotype.Component;

@Component
public class ExampleInfoContributor implements InfoContributor {

    @Override
    public void contribute(Info.Builder builder) {
        builder.withDetail("example",
                Collections.singletonMap("key", "value"));
    }

}
```



http://localhost:8080/actuator/info 会输出以上方式返回的所有info信息





## 3.6 原理解析

### 3.6.1 Profile功能

为了方便多环境适配，springboot简化了profile功能。

- 默认配置文件  application.yaml；任何时候都会加载
- 指定环境配置文件  application-{env}.yaml

- 激活指定环境

- - 配置文件激活
  - 命令行激活：java -jar xxx.jar --**spring.profiles.active=prod  --person.name=haha**

- - - **修改配置文件的任意值，命令行优先**

- 默认配置与环境配置同时生效
- 同名配置项，profile配置优先



**测试**

```java
package com.caq.admin.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController02 {

    //${}是取值运算符，之后的：后面的意思是默认值
    @Value("${person.name:ls}")
    private String name;

    @GetMapping("/test2")
    public String hello(){
        return "hello" + name;
    }
}
```



**默认配置文件application.yml**

为空

```yml
#person.name=zs
```



生产环境配置文件application-prod.yml

```yml
person:
  name: prod-zs
```



测试环境配置文件application-test.yml

```yml
person:
  name: test-zs
```

启动SpringBoot，访问测试

```java
package com.caq.admin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.caq.admin")
@SpringBootApplication
public class SbMpApplication {

    public static void main(String[] args) {
        SpringApplication.run(SbMpApplication.class, args);
    }

}
```

![image-20220223091226805](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220223091226805.png)







**默认配置文件application.yml**

为空

```yml
#person.name=zs
spring:
  profiles:
    active: test
```



生产环境配置文件application-prod.yml

```yml
person:
  name: prod-zs
  
server:
  port: 8080
```



测试环境配置文件application-test.yml

```yml
person:
  name: test-zs
  
server:
  port: 8000
```



![image-20220223093400340](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220223093400340.png)





### 3.6.2 外部化配置

==Profile功能==

为了方便多环境适配，springboot简化了profile功能。

1. **application-profile功能**

- 默认配置文件  application.yaml；任何时候都会加载
- 指定环境配置文件  application-{env}.yaml

- 激活指定环境

- - 配置文件激活
  - 命令行激活：java -jar xxx.jar --**spring.profiles.active=prod  --person.name=haha**

- - - **修改配置文件的任意值，命令行优先**

- 默认配置与环境配置同时生效
- 同名配置项，profile配置优先





2. **@Profile条件装配功能**

```java
@Configuration(proxyBeanMethods = false)
@Profile("production")
public class ProductionConfiguration {

    // ...

}
```

3. **profile分组**

```plain
spring.profiles.group.production[0]=proddb
spring.profiles.group.production[1]=prodmq

使用：--spring.profiles.active=production  激活
```





# 







































