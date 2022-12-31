---
title: Spring框架
---
## 一、Spring框架概述

1、Spring是轻量级的开源的JavaEE框架

2、Spring可以解决企业应用开发的复杂性

3、Spring有两个核心部分:IOC和Aop

> （1）IOC:控制反转，把创建对象过程交给Spring进行管理
>
> （2）Aop:面向切面，不修改源代码进行功能增强

4、Spring特点

> ​	(1）方便解耦，简化开发
>
> ​	(2) Aop编程支持
>
> ​	(3）方便程序测试
>
> ​	(4）方便和其他框架进行整合
>
> ​	(5）方便进行事务操作
>
> ​	(6) 降低API开发难度



### 1.1 入门案例

1.下载Spring5

[repo.spring.io](https://repo.spring.io/ui/native/release/org/springframework/spring)

**下载5.2.6**

![image-20220104191524202](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220104191524202.png)





![image-20220104191615380](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220104191615380.png)

2.idea新建个java工程

![image-20220104191810831](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220104191810831.png)





3.导入spring核心的jar包

![image-20220104191958477](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220104191958477.png)



![image-20220104191729700](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220104191729700.png)



4.通过spring的方式创建对象

**java代码**

```java
package com.caq.spring5;

public class User {
    public void add(){
        System.out.println("add.....");
    }
}
```



**xml代码**

选择spring配置文件，idea中也是xml格式的

在源文件下新建的~！

![image-20220104192326927](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220104192326927.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--    1配置User对象创建-->
    <bean id="user" class="com.caq.spring5.User"></bean>
</beans>
```

测试类测试

```java
public class TestSpring5 {
    @Test
    public void testAdd() {
//        加载spring配置文件
        ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");


//        获取配置创建的对象
        User user = context.getBean("user", User.class);

        System.out.println(user);
        user.add();
    }
}

com.caq.spring5.User@18bf3d14
add.....
```





### 1.2 Spring程序开发步骤

1. 导入Spring开发的基本包坐标（通过maven解决包依赖）
2. 编写Dao接口和实现类（面向接口编程）
3. 创建Spring 核心配置文件
4. 在Spring配置文件中配置UserDaolmpl
5. 使用Spring 的API获得 Bean 实例





### 1.3 Bean标签范围配置

> 当scope=
>
> singleton：加载配置文件的时候调用无参
>
> prototype：getBean的时候调用无参

![image-20220301122326607](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220301122326607.png)







## 二、IOC容器

### 2.1 什么是IOC

> Inversion of Control控制反转

IOC就是控制反转啊！

what你说啥？

#### 2.1.1 控制反转是什么意思？

假如有a和b两个对象，在没有引入IOC概念之前，a依赖于b那么a在需要用到b的时候，就必须自己主动去创建对象b或者使用已经创建的对象b，这个过程控制权都在对象a上。

而引入IOC概念之后，对象a与对象b之间失去了直接联系，当对象a需要用到对象b的时候，IOC容器会主动创建一个对象注入到对象a需要的地方。

对比两个过程，第一个过程对象a获得依赖对象b的过程由自己创建调用，第二个过程变成了IOC给你创建调用。控制权由主动变成了被动

Fine，这就是控制反转，由主动变被动了~

**控制反转是一种通过描述（XML或者注解）并通过第三方生产或获取特点对象的方式。在Spring中实现控制反转的是IOC容器，其实现方法是依赖注入**

![image-20220210170056926](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220210170056926.png)



#### 2.1.2 什么是DI

DI就是是依赖注入（Dependency Injection）英语单词的首字母的缩写

所谓依赖注入，即在运行期由容器将依赖关系注入到组件之中

**讲的通俗点，就是在运行期，由Spring根据配置文件，将其他对象的引用通过组件提供的setter方法进行设定**

它通过动态调用的方式避免了硬编码方式的约束

动态调用什么意思，我在编译阶段没有确定要创建那个对象（编译阶段就是你写完java源代码之后经过编译期编译为.class字节码文件的阶段）然后呢，我想到运行阶段根据我的配置文件创建对象（运行阶段就是将字节码文件加载到内存的阶段）这叫动态



然后能注入的数据类型有三类

基本类型和String
其他bean类型（在配置文件中或者注解配置过的bean）
复杂类型/集合类型



#### 2.1.3 动态性

**回顾下反射的概念（主要体会动态性！）**

比如有很多个球员的实例：乔丹、詹姆斯、科比，现在需要一个方法根据一个参数获得其中一个球员

不使用反射的写法：

public Person getPerson(String name) {
if(name.equals("乔丹") {
return new 乔丹();
}
if(name.equals("詹姆斯") {
return new 詹姆斯();
}

.....

如果要获得的球员很多的话要加很多的if判断，代码属实是很垃圾



使用反射的写法：
public Person getPerson(String name) {
Constructor cos = clazz.getConstructor(Class.forName(name));//根据类名获得对应构造方法
Object obj = cos.newInstance();
return (Person) obj;
}
球员的实例有多少，这个方法都不用变代码量就这么多

反射能动态生成实例的意思是，在程序运行的时候，可以根据需要和条件创建新的实例



先理解到这，后面理解的在深刻的话在写！





#### 2.1.4 IOC能带给我们什么？

IOC 的思想最核心的地方在于，资源不由使用资源的双方管理，而由不使用资源的第三方管理。

​    第一，资源集中管理，实现资源的可配置和易管理

​    第二，降低了使用资源双方的依赖程度，也就是我们说的耦合度

其实IoC对编程带来的最大改变不是从代码上，而是从思想上，发生了“主从换位”的变化。应用程序原本是老大，要获取什么资源都是主动出击，但是在IoC/DI思想中，应用程序就变成被动的了，被动的等待IoC容器来创建并注入它所需要的资源了。IoC很好的体现了面向对象设计法则之一好莱坞法则：“别找我们，我们找你”；即由IoC容器帮对象找相应的依赖对象并注入，而不是由对象主动去找





### 2.2 IOC底层原理

 **xml解析、工厂模式，反射**



原始方式，**在UserService类的execute方法中想调用UserDao类中的add方法**，那么我们就需要先生成UserDao的对象，之后在调用UserDao中的方法

![image-20220105225816364](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220105225816364.png)



用工厂模式呢？

在它们中间再搞个类（工厂类）生成UserDao类

工厂类来实现创建对象，在UserService类中通过创建工厂类来调用add方法

相当于搞了个代理...降低了耦合度多个了个中奸商

![image-20220105225925449](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220105225925449.png)





![image-20220105225737858](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220105225737858.png)



**先通过 XML 解析来加载 spring.xml 配置文件，然后使用反射机制调用无参构造函数动态创建对象，并调用 setter 方法完成对象属性的赋值，最后将创建好的对象放在一个类似于 HashMap 的容器里，调用 getBean 方法获取对象时，相当于 map.get(id) 返回一个对象。**

![image-20220106172056888](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220106172056888.png)







### 2.3 IOC接口（BeanFactory）

**ioc思想基于IOC容器完成，ioc容器底层就是对象工厂。**

**Spring提供了IOC容器实现的两种方式：两个接口**

- ​	BeanFactory：IOC容器基本实现，是spring内部使用接口，不提供开发人员使用。加载配置文件时不会创建对象，使用对象时才会创建对象（懒汉式加载对象）。
- ​	ApplicationContext：BeanFatory的子接口，提供更多更强大的功能，一般供开发人员进行使用。加载配置文件时就创建对象（饥汉式加载对象）。

ApplicationContext接口实现类

- ​	FileSystemXmlApplicationContext(“盘符路径(绝对路径)“）
- ​	ClassPathXmlApplicationContext(“src目录下类路径”)



#### 2.3.1 单例设计模式--懒汉式，饿汉式

单例设计模式是一种很常见的设计模式



**比如说某个服务器程序中，该服务器的配置信息存放在一个文件中，这些配置数据由一个单例对象统一读取，然后服务进程中的其他对象 再通过这个单例对象获取这些配置信息。**从而简化了在比较复杂的环境下配置管理。 通过上面的介绍，我们可以知道**单例模式最重要的就是要保证一个类只有一个实例并且这个类易于被访问**，那么要怎么做才能保证一个类具有一个实例呢？一个全局变量使得一个对象可以被访问，但是这样做却不能防止你实例化多个对象。 一个更好的办法就是，让该类自身负责保存它的唯一实例。并且这个类保证没有其他的实例可以被创建。 

​	怎样保证一个对象的唯一总结如下：

>  1.为了避免其它程序过多的建立该类的对象，先禁止其它程序建立该类对象实例（将构造器私有化）
>
>  2.为了方便其它程序访问该类的对象，只好在本类中自定义一个对象，由1可知该对象是static的，并对外提供访问方式。



#### 2.3.2 分析举例

在JAVA中单例设计模式

**1.饿汉式如下所示**

```javascript
/**
 * Created by ${wuyupku} on 2019/3/15 12:39
 */
 class Singleton01{
    private static Singleton01  modle = new Singleton01();//声明对象同时私有化
    private Singleton01(){}//构造函数私有化
    public static Singleton01 getInstance(){//向外声明访问该类对象的方法
        return modle;
    }

}
```

**2.懒汉式如下所示**

```javascript
/**
 * Created by ${wuyupku} on 2019/3/15 12:43
 */
 class Singleton02 {
    private static Singleton02 modle = null;//声明对象，不实例化

    private Singleton02()  {}//构造函数私有化
    public static Singleton02 getInstance(){//向外提供访问该类对象的方法
        if (modle == null)
            modle = new Singleton02();
            return modle;

    }
}
```



**到此我们总结两点：**

> 1.饿汉式这种方式加载类对象，我们称作：预先加载方式。 
>
> 2.懒汉式这种方式加载类对象，我们称作：延迟加载方式。

线程安全问题，我们后面在补充，现在不需要了解~





### 2.4 IOC操作Bean管理(基于XML)

#### 2.4.1 什么是Bean？

**使用Spring来创建对象，每一个对象在Spring中都被称为bean**



**1. 什么是Bean管理**

- Bean 管理指的是两个操作
- Spring 创建对象
- Spring 注入属性

**2. Bean 管理操作的两种方式**

- 基于xml配置文件方式实现
- 基于注解方式实现





#### 2.4.2 创建对象

(1) 在Spring配置文件中，使用Bean标签，标签里面添加对应属性，就可以实现对应对象创建

(2) 在Bean标签有很多属性，常用的属性：id、class、name

(3) 创建对象的时候，默认也是执行无参数构造方法

```xml
<!--配置User对象创建-->    
<bean id="user" class="com.spring5.User"></bean>
```



#### 2.4.3 注入属性

(1) DI：依赖注入，就是注入属性



**第一种注入方式：使用set方法进行注入**

(1) 创建类，定义属性和对应的set方法

```java
 public class Book {
     private String bname;
     private String bauthor;
 
     public void setBname(String bname) {
         this.bname = bname;
     }
     public void setBauthor(String bauthor) {
         this.bauthor = bauthor;
     }
     public static void main(String[] args) {
         Book book = new Book();
         book.setBname("TestBook");
     }
 }
```

(2) 在Spring配置文件配置对象创建，配置属性注入

```xml
 <!--set方法注入属性-->
 <bean id="book" class="com.spring5.Book">
 <!--使用property完成属性注入
     name：类里面属性名称
     value：向属性注入的值
 -->
     <property name="bname" value="TestBook"></property>
     <property name="bauthor" value="TestAuthor"></property>
 </bean>
```

 

**第二种注入方式：使用有参数构造进行注入**

(1) 创建类，定义属性，创建属性对应有参数构造方法'

```java
public class Orders {
    private String oname;
    private String address;
    public Orders(String oname, String address) { 
        this.oname = oname;
        this.address = address;
    }
}
```

(2) 在spring 配置文件中进行配置

```xml
    <!--    3有参构造注入属性-->    
<bean id="orders" class="com.caq.spring5.Orders">        
    <constructor-arg name="oname" value="美女"></constructor-arg>        
    <constructor-arg name="address" value="帅哥"></constructor-arg>    
</bean>
```

(3) 测试

```java
@Testpublic void TestOrder(){
    //1.加载Spring配置文件    
    ApplicationContext context = new ClassPathXmlApplicationContext("base1.xml");
    //2.获取配置创建的对象    
    Orders orders = context.getBean("orders",Orders.class);
    System.out.println(orders.toString());}
```



**P名称空间注入（了解）**

(1) 使用P名称空间注入，可以简化基于xml配置方式

第一步 添加P名称空间在配置文件中

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 		xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
```

 ```java
<bean id="book" class="com.spring5.Book" p:bname="平凡的人生" p:bauthor="路遥"></bean>
 ```





#### 2.4.4 注入字面量

#### (1) null值

```xml
<bean id="book" class="com.spring5.Book">
    <property name="bname" value="pyy"></property>    
    <property name="bauthor" value="pyy"></property>
    <property name="address">
        <null></null>
    </property></bean>
```

#### (2) 属性值包含特殊符号

```xml
//方法一：转义字符
<property name="address" value="&lt;北京&dt;"></property>
//方法二：CDATA
<property name="address">
    <value>    <![CDATA[<北京>]]>    </value>
</property>
```

#### (3 )注入外部bean（使用引用，注入其他类的对象）

(1) 创建两个类service类和dao类

(2) 在service调用dao类的方法

(3) 在spring配置文件中进行配置

```java
package com.caq.spring5.dao;
public interface UserDao {
    public void update();
}
```



```java
package com.caq.spring5.dao;
public class UserDaoImpl implements UserDao {
    @Override    
    public void update() {
        System.out.println("dao update!!!!!!!!!!!!!");
    }
}
```



```java
package com.caq.spring5.service;
import com.caq.spring5.User;
import com.caq.spring5.dao.UserDao;
import com.caq.spring5.dao.UserDaoImpl;
public class UserService {
    //    创建UserDao类型属性，生成set方法
    private UserDao userDao;
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao; 
    }   
    public void add(){ 
        System.out.println("add service!!!!!!!!!!!!!");
        //        创建UserDao对象(普通的方式实现)
        UserDao userDao = new UserDaoImpl();
        userDao.update();
    }
}
```



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


    <!--    1.service和dao的对象创建-->
    <bean id="userService" class="com.caq.spring5.service.UserService">
        <!--        注入userDao对象-->
        <!--        name属性值：类里面属性名称 -->
        <!--        ref属性：创建userDao对象bean标签id值-->
        <property name="userDao" ref="userDaoImpl"></property>
    </bean>

    <bean id="userDaoImpl" class="com.caq.spring5.dao.UserDaoImpl"></bean>
    <!--        注入userDao对象-->
    <!--        name属性值：类里面属性名称-->

    
    UserDao userDao = new userDaoImpl();

</beans>
```

![image-20220106122747592](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220106122747592.png)



再次回想上面所说，Spring就是将创建对象的操作交给IOC容器（体会到了工厂模式（中介）），通过XML解析获取要创建对象的信息中间也用到了反射，其实最后是通过反射来创建对象调用方法

#### (4)注入集合

1. 注入数组类型属性
2. 注入List集合类型属性
3. 注入Map集合类型属性
4. 注入集合元素是对象的集合

（1）创建类，定义数组、list、map、set类型属性，生成对应set方法

```java
package com.caq.spring5.collectiontype;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Stu {

    private String[] courses;
    private List<String> list;
    private Map<String,String> maps;
    private Set<String> sets;
    private List<Course> courseList;

    public void setCourseList(List<Course> courseList) {
        this.courseList = courseList;
    }

    public void setCourses(String[] courses) {
        this.courses = courses;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

    public void setMaps(Map<String, String> maps) {
        this.maps = maps;
    }

    public void setSets(Set<String> sets) {
        this.sets = sets;
    }

    public void test(){
        System.out.println(Arrays.toString(courses));
        System.out.println(list);
        System.out.println(maps);
        System.out.println(sets);
        System.out.println(courseList);
    }
}

```





xml代码

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="stu" class="com.caq.spring5.collectiontype.Stu">
        <property name="courses">
            <array>
                <value>Java</value>
                <value>Mysql</value>
            </array>
        </property>

        <property name="list">
            <list>
                <value>张三</value>
                <value>唐浩</value>
            </list>
        </property>

        <property name="maps">
            <map>
                <entry key="JAVA" value="java"></entry>
                <entry key="PHP" value="php"></entry>
            </map>
        </property>

        <property name="sets">
            <set>
                <value>Mysql</value>
                <value>Redis</value>
            </set>
        </property>
        
        <property name="courseList">
            <list>
                <ref bean="course1"></ref>
                <ref bean="course2"></ref>
            </list>
        </property>
    </bean>
    
    <bean id="course1" class="com.caq.spring5.collectiontype.Course">
        <property name="cname" value="Spring框架"></property>
    </bean>
    <bean id="course2" class="com.caq.spring5.collectiontype.Course">
        <property name="cname" value="MyBatis框架"></property>
    </bean>

</beans>
```



测试代码

```java
package com.caq.spring5.testdemo;

import com.caq.spring5.authwire.Emp;
import com.caq.spring5.bean.Orders;
import com.caq.spring5.collectiontype.Book;
import com.caq.spring5.collectiontype.Course;
import com.caq.spring5.collectiontype.Stu;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestSpring5Demo1 {
    @Test
    public void testCollection() {
        ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
        Stu stu = context.getBean("stu", Stu.class);
        stu.test();
    }

    @Test
    public void testCollection2() {
        ApplicationContext context = new ClassPathXmlApplicationContext("bean2.xml");
        Book book = context.getBean("book", Book.class);
        Book book2 = context.getBean("book", Book.class);
        book.test();
//        System.out.println(book);
//        System.out.println(book2);
    }

    @Test
    public void test3() {
        ApplicationContext context = new ClassPathXmlApplicationContext("bean3.xml");
        Course course = context.getBean("myBean", Course.class);
        System.out.println(course);
    }

    @Test
    public void testBean3() {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("bean4.xml");
        Orders orders = context.getBean("orders", Orders.class);
        System.out.println("第四步 获取创建bean实例对象");
        System.out.println(orders);

//        手动销毁bean实例
        context.close();
    }

    @Test
    public void testBean4() {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("bean5.xml");
        Emp emp = context.getBean("emp", Emp.class);
        System.out.println(emp);

//        手动销毁bean实例
        context.close();
    }
}

```





#### (5)把集合公共部分提取出来

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">

<!--    1.提取list集合类型属性注入-->
    <util:list id="booklist">
        <value>Curry</value>
        <value>Kb</value>
        <value>Jordan</value>
    </util:list>

<!--    2.提取list集合类型属性注入使用-->
    <bean id="book" class="com.caq.spring5.collectiontype.Book" scope="prototype">
        <property name="list" ref="booklist"></property>
    </bean>

</beans>
```



#### 2.4.5 FactotyBean

Spring 有两种类型bean，一种普通bean，另外一种工厂bean(FactoryBean)

（1）普通bean在配置文件中，定义bean类型就是返回类型

（2）工厂bean在配置文件中定义bean类型可以和返回类型不一样

第一步创建类，让这个类作为工厂Bean，实现接口FactoryBean

第二步实现接口里的方法，在实现方法中定义返回的bean类型



如下程序：

**xm文件中定义的返回bean返回类型是Mybean**

**然后我实现接口后，定义返回的类型为Course类型的bean**

```java
package com.caq.spring5.factorybean;

import com.caq.spring5.collectiontype.Course;
import org.springframework.beans.factory.FactoryBean;

public class MyBean implements FactoryBean<Course> {

//    定义返回bean
    @Override
    public Course getObject() throws Exception {
        Course course = new Course();
        course.setCname("abc");
        return course;
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }

    @Override
    public boolean isSingleton() {
        return false;
    }
}

```



#### 2.4.6 bean作用域

（1）在spring里，设置创建Bean实例是单实例还是多实例。

（2）在spring里，默认设置创建Bean实例是单实例。

（3）如何设置单实例还是多实例。

 spring配置文件bean标签里scope属性用于设置单实例还是多实例。

 scope属性值：第一个，默认值，singleton，表示单实例对象；第二个值：prototype，表示多实例对象。

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">

    <bean id="myBean" class="com.caq.spring5.factorybean.MyBean">

    </bean>

</beans>
```

**因为是多实例所以是两个不同的地址**



**（4）singleton 与 prototype区别**

第一，singleton表示单实例，prototype表示多实例。

第二，设置Scope是singleton时，加载spring配置文件时侯就会创建单实例对象；

 设置Scope是prototype时，不是加载spring配置文件时侯创建对象，而是在调用getBean方法时创建多实例对象。

 request,表示一次请求，每次创建对象放到request域对象中。

 session,表示一次会话，每次创建对象放到session域对象中。



#### 2.4.7 生命周期

**什么是生命周期？**

**从对象创建到对象销毁的过程**



bean生命周期

（1）通过构造器创建bean实例（无参数构造）

（2）为bean的属性设置值和对其他bean引用（调用set方法）
（3）调用bean的初始化的方法（需要进行配置）

（4）bean可以使用了（对象获取到了）

（5）当容器关闭的时候，调用bean的销毁的方法（需要进行配置销毁的方法）





bean的后置处理器，bean生命周期有七步

（1）通过构造器创建bean实例（无参数构造）

（2）为bean的属性设置值和对其他bean引用（调用set方法）

（3）把bean实例传递bean后置处理器的方法postProcessBeforeInitialization

（4）调用bean的初始化的方法（需要进行配置）

（5）把bean实例传递bean后置处理器的方法postProcessAfterInitialization

（6）bean可以使用了（对象获取到了）

（7）当容器关闭的时候，调用bean的销毁的方法（需要进行配置销毁的方法）





```java
package com.caq.spring5.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.lang.Nullable;

public class MyBeanPost implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之前执行的方法");
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之后执行的方法");
        return bean;
    }
}
```



```java

package com.caq.spring5.bean;

public class Orders {
    private String oname;

    public Orders() {
        System.out.println("第一步 执行无参构造创建bean实例");
    }

    public void setOname(String oname){
        this.oname = oname;
        System.out.println("第二步，调用set方法设置值");
    }

    public void initMethod(){
        System.out.println("第三部 执行初始化方法");
    }

    public void destoryMethod(){
        System.out.println("第五步 执行销毁的方法");
    }

}

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">

   <bean id="orders" class="com.caq.spring5.bean.Orders" init-method="initMethod" destroy-method="destoryMethod">
       <property name="oname" value="手机"></property>
   </bean>

<!--    配置后置处理器-->
    <bean id="myBeanPost" class="com.caq.spring5.bean.MyBeanPost"></bean>
</beans>
```







#### 2.4.8 自动装配

- 什么是自动装配

  （1）根据指定装配规则（属性名称或者属性类型），Spring自动将匹配的属性值进行注入

bean标签属性autowire，配置自动装配autowire属性常用两个值:

byName根据属性名称注入，注入值bean 的id 值和类属性名称一样

byType根据属性类型注入



根据名称就按照id（注入值bean 的id 值和类属性名称一样）

类型就是class后面的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">

<!--    实现自动装配-->
<!--    bean标签属性autowire，配置自动装配
        autowire属性常用两个值：
            byName根据属性名称注入  bean的id值和类里的属性一致
            byType根据属性类型注入
-->
    <bean id="emp" class="com.caq.spring5.authwire.Emp" autowire="byType">
<!--        <property name="dept" ref="dept"></property>-->
    </bean>
    <bean id="dept" class="com.caq.spring5.authwire.Dept"></bean>
</beans>
```





### 2.5 IOC操作Bean管理（基于注解)

#### 2.5.1 什么是注解

格式：@注解名称（属性名=属性值）
使用注解：注解作用在类（方法，属性）上
**使用目的：简化xml配置**





#### 2.5.2 Spring针对Bean管理中创建对象提供注解

- @Component 普通用法
- @Service 用于service业务逻辑层
- @Controller 用于web层
- @Repository 用于DAO持久层





#### 2.5.3 基于注解方式实现对象创建例子

**第一步 引入依赖**

![image-20220106200533678](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220106200533678.png)



**第二步 开启组件扫描**

1 如果扫描多个包，多个包使用逗号隔开 

2 扫描包上层目录

```xml
<context:component-scan base-package="com.caq"></context:component-scan>
```

上面就是扫描整个caq包



**第三步 创建类，在类上面添加创建对象注解** 

//在注解里面 value 属性值可以省略不写， 

//默认值是类名称，首字母小写 /

/UserService -- userService

```java
//@Component(value = "userService")
//<bean id = "userService" class = "">
//@Service
//@Controller
@Repository
public class UserService {}
```

**一些扫描细节直接粘贴笔记了**

**就是扫描的时候扫描那些，和不扫描那些**



![image-20220106201051542](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220106201051542.png)



#### 2.5.4 基于注解方式实现属性注入

**(1）@Autowired:根据属性类型进行自动装配**
第一步把service和 dao对象创建，在service和 dao类添加创建对象注解
第二步在service注入dao对象，在service类添加dao类型属性，在属性上面使用注解

![image-20220106202354762](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220106202354762.png)



(2）**@Qualifier:根据名称进行注入**

> @Qualifier注解的使用，和上面@Autowired一起使用
>
> 如果有多个类型相同的，可以加上@Qualifier按照id值从容器中匹配



![image-20220106202507342](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220106202507342.png)



（3）**@Resource：可以根据类型注入，可以根据名称注入**

![image-20220106202542722](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220106202542722.png)



（4）@Value：注入普通类型属性

![image-20220106202554158](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220106202554158.png)







#### 2.5.5 完全注解开发

就是我不依赖xml了，我全用注解的知识

（1）创建配置类，替代 xml 配置文件

```java
package com.caq.spring5.config;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
@Configuration  //作为配置类，代替xml配置文件
@ComponentScan(basePackages = {"com.caq"})
public class SpringConfig {}
```



（2）编写测试类

```java
@Testpublic void testService2(){
    ApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class); 
    UserService userService = context.getBean("userService", UserService.class);
    System.out.println(userService);
    userService.add();
}

com.caq.spring5.service.UserService@3eb7fc54Service
    add......abc
    do add...........
```



#### 2.5.6 Bean的依赖注入分析

![image-20220116201340256](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220116201340256.png)







![image-20220116201349421](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220116201349421.png)



如何把UserDao对象注入到UserService内部呢？

构造方法





set方法

通过设置对象的set方法即可注入对象

![image-20220116201532691](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220116201532691.png)







#### 2.5.7 Spring原始注解

![image-20220301131829644](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220301131829644.png)







## 三、Aop

### 3.1 AOP概念

(1）面向切面编程（方面)，利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。
(2）通俗描述:不通过修改源代码方式，在主干功能里面添加新功能(符合设计模式中的开闭原则，不修改源码，但是能打开扩展功能)
(3）使用登录例子说明AOP

![image-20220106210900186](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220106210900186.png)



### 3.2 底层原理

1、AOP 底层使用动态代理 

（1）有两种情况动态代理

 **第一种 有接口情况，使用 JDK 动态代理** 

创建接口实现类代理对象，增强类的方法

![image-20220108220900703](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220108220900703.png)



**第二种 没有接口情况，使用 CGLIB 动态代理** 

创建子类的代理对象，增强类的方法

![image-20220108220936801](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220108220936801.png)





### 3.3 AOP(JDK)动态代理

方法有三个参数:

第一参数，类加载器

第二参数，增强方法所在的类，这个类实现的接口，支持多个接口

第三参数，实现这个接口InvocationHandler，创建代理对象，写增强的部分



#### 3.3.1 难点解析

**想要实现动态代理，需要解决的问题？**

**问题一：如何根据加载到内存中的被代理类，动态的创建一个代理类及其对象**

**问题二：当通过代理类的对象调用方法a时，如何动态的去调用被代理类中的同名方法a**



1.通过反射提供的API动态的创建一个代理类

2.首先new一个被代理类的对象，传入创建代理类对象的方法中

3.创建代理类的方法中的参数handler其实就抽象化了被代理类要执行的方法

4.handler参数是一个接口，我们创建handler接口的实现类，实例化handler接口的实现类的时候参数为被代理类对象

5.handler接口的实现类重写了handler的invoke方法，

6.invoke方法第二个参数是Method类的method对象，我们通过这个对象可以调用运行时类的方法（运行时类就是我们的加载到内存中的被代理类）

7.之后我们通过method.invoke（obj,args）,第一个obj参数就是被代理类的对象，调用invoke方法时的参数（不知道invoke的可以回顾下反射）

8.这样就可以实现调用代理类对象的invoke方法时，也调用被代理类的方法

9.反射的主要特点就是体会到它的动态性，就是因为我们的代理类没有显示的给它定义出来，而是在运行的时候根据你传入的被代理类的对象是谁

10.我们动态的帮你创建的，体现了反射的动态性





简单来说就是AOP的底层是通过Spring提供的动态代理技术实现的。在运行期间，Spring通过动态代理技术动态生产代理对象，代理对象执行方法时会进行增强功能的介入，在去调用目标对象的方法



```java
package com.caq.spring5;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;

public class JDKProxy {
    public static void main(String[] args) {
//        创建接口实现类的代理对象
        Class[] interfaces = {UserDao.class};
        UserDaoImpl userDao = new UserDaoImpl();
        UserDao dao = (UserDao)Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new UserDaoProxy(userDao));
//        int add = dao.add(1, 2);
//        System.out.println(add);
        String update = dao.update("3");
        System.out.println(update);
    }
}

class UserDaoProxy implements InvocationHandler{
    private Object obj;
    public UserDaoProxy(Object obj) {
        this.obj = obj;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("方法之前执行......"+method.getName()+":传递的参数..."+ Arrays.toString(args));
        Object res = method.invoke(obj, args);
        System.out.println("方法之后执行......"+obj);
        return res;
    }
}
```



```java
    public static void main(String[] args) {
//        创建接口实现类的代理对象
        Class[] interfaces = {UserDao.class};
        UserDaoImpl userDao = new UserDaoImpl();
        UserDao dao = (UserDao)Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new UserDaoProxy(userDao));
//        int add = dao.add(1, 2);
//        System.out.println(add);
        String update = dao.update("3");
        System.out.println(update);
    }
}
```





### 3.4 AOP术语

#### 3.4.1 连接点

类里面哪些方法可以被增强,这些方法称为连接点

#### 3.4.2 切入点

实际被真正增强的方法，称为切入点

#### 3.4.3 通知（增强)

(1）实际增强的逻辑部分称为通知（增强)

(2)通知有多钟类型前置通知



- 后前通知：在要增强方法前执行
- 后置通知：在要增强方法后执行
- 环绕通知：在要增强方法前后都执行
- 异常通知：增强方法发生异常后执行
- 最终通知：类似与finally，无论发生不发生异常都会执行



#### 3.4.4 切面

是动作（过程）

(1）把通知应用到切入点过程



### 3.5 AOP操作（准备）

#### 3.5.1 什么是AspectJ？

也是一个框架，一般和Spring一起使用，进行AOP操作



#### 3.5.2 基于AspectJ实现AOP操作

（1）基于xml配置文件实现

（2）基于注解方式实现

 

#### 3.5.3 在项目工程中引入AOP依赖

![image-20220108233213339](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220108233213339.png)



#### 3.5.4 切入点表达式

切入点表达式作用就是知道对哪个类里面的方法进行增强

语法结构：

execution([权限修饰符] [返回类型]  [类全路径] [方法名称] ([参数列表]))

**举例：对com.caq.dao.BookDao类里的add进行增强**

execution(* com.caq.dao.BookDao.add(...))

==星号代表所有修饰符，返回值类型可以省略不写==



**对com.caq.dao.BookDao类里的所有方法进行增强**

execution(* com.caq.dao.BookDao.*(...))



**对com.caq.dao包里的所有类和方法进行增强**

对execution(* com.caq.dao. * . * (...))





### 3.6 AOP操作(AspectJ注解)

#### 3.6.1 创建类，在类里面定义方法

```java
package com.caq.spring5.aopano;
public class User {    
    public void add(){
        System.out.println("add...");
    }
}
```



#### 3.6.2 创建增强类（编写增强逻辑）

在增强类里面，创建方法，让不同方法代表不同通知类型

```java
package com.caq.spring5.aopano;
public class UserProxy {
    public void before(){
        System.out.println("before~~~");
    }
}
```



#### 3.6.3 进行通知的配置

#### (1)在spring配置文件中，开启注解扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                          http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                          http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
<!--       开启注释扫描-->
    <context:component-scan base-package="com.caq.spring5.aopano"></context:component-scan>
<!--    就是去扫描你的类，发现有aspect注解的，就生成对应的代理对象-->
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>

</beans>
```

#### (2)使用注解创建User和UserProxy对象

其实就是在它们上面加个Compoent就行了

```java
package com.caq.spring5.aopano;

import org.springframework.stereotype.Component;

@Component
public class User {
    public void add(){
        System.out.println("add...");
    }
}

```



```java
package com.caq.spring5.aopano;
import org.springframework.stereotype.Component;

@Componentpublic 
class UserProxy {
    public void before(){
        System.out.println("before~~~");
    }
}
```

#### (3)在增强类上添加注解@Aspect

```java
package com.caq.spring5.aopano;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
@Component
@Aspect//生产代理对象
public class UserProxy {
    public void before(){
        System.out.println("before~~~");
    }
}
```



#### (4)在Spring配置文件中开启生产代理对象

```xml
<?xml version="1.0" encoding="UTF-8"?><beans xmlns="http://www.springframework.org/schema/beans"       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"       xmlns:context="http://www.springframework.org/schema/context"       xmlns:aop="http://www.springframework.org/schema/aop"       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd                          http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd                          http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--       开启注释扫描-->    
    <context:component-scan base-package="com.caq.spring5.aopano">
        
    </context:component-scan><!--    就是去扫描你的类，发现有aspect注解的，就生成对应的代理对象-->  
    	<aop:aspectj-autoproxy>
    </aop:aspectj-autoproxy></beans>
```



#### 3.7 配置不同类型的通知

```java
package com.caq.spring5.aopano;
import org.aspectj.lang.ProceedingJoinPoint;import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
@Component@Aspect//生产代理对象
public class UserProxy {    //    beforer注解表示作为前置通知    
    @Before(value = "execution(* com.caq.spring5.aopano.User.add(..))")    
    public void before() {
        System.out.println("before~~~");
    }    //后置通知    
    @AfterReturning(value = "execution(* com.caq.spring5.aopano.User.add(..))")
    public void afterReturning() {
        System.out.println("AfterReturning~~~");
    }    //最终通知    
    @After(value = "execution(* com.caq.spring5.aopano.User.add(..))")
    public void after() {
        System.out.println("after~~~");
    }//    异常通知    
    @AfterThrowing(value = "execution(* com.caq.spring5.aopano.User.add(..))")
    public void afterThrowing() {
        System.out.println("afterThrowing~~~");
    }//    环绕通知    
    @Around(value = "execution(* com.caq.spring5.aopano.User.add(..))")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable { 
        System.out.println("环绕之前~~~");//        被增强的方法执行
        proceedingJoinPoint.proceed();
        System.out.println("环绕之后~~~");
    }
}




环绕之前~~~
    before~~~add...
    环绕之后~~~
    after~~~
    AfterReturning~~~
```





#### 3.8 公共切入点抽取

```java
package com.caq.spring5.aopano;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Aspect//生产代理对象
@Order(3)
public class UserProxy {

    //相同切入点抽取
    @Pointcut(value = "execution(* com.caq.spring5.aopano.User.add(..))")
    public void pointdemo(){

    }

    //后置通知
    @AfterReturning(value = "pointdemo()")
    public void afterReturning() {
        System.out.println("AfterReturning~~~");
    }

    //最终通知
    @After(value = "pointdemo()")
    public void after() {
        System.out.println("after~~~");
    }

//    异常通知
    @AfterThrowing(value = "pointdemo()")
    public void afterThrowing() {
        System.out.println("afterThrowing~~~");
    }

//    环绕通知
    @Around(value = "pointdemo()")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕之前~~~");
//        被增强的方法执行
        proceedingJoinPoint.proceed();
        System.out.println("环绕之后~~~");
    }
}


```

对相同切入点进行抽取后，如果要修改相同切入点只需要更改公共切入点即可





#### 3.9 多个增强类对同一个方法进行增强设置增强类优先级

#### 3.9.1 @Order（数字类型值）

（1）在增强类上添加注解@Order（数字类型值），数字类型值越小优先级越高

```java
@Component@Aspect//生产代理对象
@Order(3)
public class UserProxy { 
    //    beforer注解表示作为前置通知
    @Before(value = "pointdemo()")
    public void before() {
        System.out.println("before~~~");
    }
```

```java
@Component@Aspect@Order(1)
public class PersonProxy {
    @Before(value = "execution(* com.caq.spring5.aopano.User.add(..))")
    public void afterReturning(){
        System.out.println("Peoson Before..."); 
    }
```

测试

优先级更大的PersonProxy代理类先执行

```
Peoson Before...
before~~~
```



## 四、JdbcTemplate

### 4.1 JdbcTemplate(概念和准备)

#### 4.1.1 什么是JdbcTemplate

(1) Spring框架对JDBC进行封装，使用JdbcTemplate方便实现对数据库操作

#### 4.1.2 准备工作

**在原有包的基础上引入新包~**

![image-20220109114021024](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220109114021024.png)





**在Spring配置文件配置数据库连接池**，**配置JdbcTemplate对象，注入DataSource**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                          http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                          http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

<!--    组件扫描-->
    <context:component-scan base-package="com.caq"></context:component-scan>


    <!-- 数据库连接池 -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
          destroy-method="close">
        <property name="url" value="jdbc:mysql:///user_db" />
        <property name="username" value="root" />
        <property name="password" value="root" />
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    </bean>

<!--    JdbcTemplate对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
<!--        注入dataSource-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>

</beans>
```



**创建service类，创建dao类，在dao注入jdbctemplate对象**



### 4.2 JdbcTemplate 操作数据库（添加）

#### 4.2.1 Dao层

```java
package com.caq.spring5.dao;

import com.caq.spring5.entity.Book;

public interface BookDao {
    void add(Book book);

}



package com.caq.spring5.entity;

public class Book {
    private String userId;
    private String username;
    private String ustatus;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUstatus() {
        return ustatus;
    }

    public void setUstatus(String ustatus) {
        this.ustatus = ustatus;
    }
}

```



#### 4.2.2 Services层

```java
package com.caq.spring5.service;

import com.caq.spring5.dao.BookDao;
import com.caq.spring5.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    //    注入dao对象
    @Autowired
    private BookDao bookDao;

//    添加的方法
    public void addBook(Book book){
        bookDao.add(book);
    }

}
```

xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                          http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                          http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

<!--    组件扫描-->
    <context:component-scan base-package="com.caq"></context:component-scan>


    <!-- 数据库连接池 -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
          destroy-method="close">
        <property name="url" value="jdbc:mysql:///user_db" />
        <property name="username" value="root" />
        <property name="password" value="root" />
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    </bean>

<!--    JdbcTemplate对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
<!--        注入dataSource-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>

</beans>
```



#### 4.2.3 测试

```java
package com.caq.spring5.test;

import com.caq.spring5.entity.Book;
import com.caq.spring5.service.BookService;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class testAdd {

    @Test
    public void testJdbcTemplate(){
//        1.解析xml文件
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
//        2.得到对象
        BookService bookService = context.getBean("bookService", BookService.class);
//        3.调用方法
        Book book = new Book();
        book.setUserId("1");
        book.setUsername("php");
        book.setUstatus("running");
        bookService.addBook(book);
    }
}
```

![image-20220110155103108](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110155103108.png)



### 4.3 JdbcTemplate 操作数据库（修改和删除）

#### 4.3.1 Dao层

```java
package com.caq.spring5.dao;

import com.caq.spring5.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BookDaoImpl implements BookDao {

    //    注入jdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;

    //    添加的方法
    public void add(Book book) {
//        创建sql语句
        String sql = "insert into t_book values(?,?,?)";
//        调用方法实现
        Object[] args = {book.getUserId(), book.getUsername(), book.getUstatus()};
        int update = jdbcTemplate.update(sql, args);
        System.out.println(update);//0,1,-1
    }

//    修改
    @Override
    public void updateBook(Book book) {
        String sql = "update t_book set username=?,ustatus=? where user_id=?";
        Object[] args = {book.getUsername(), book.getUstatus(), book.getUserId()};
        int update = jdbcTemplate.update(sql, args);
        System.out.println(update);//0,1,-1
    }

//    删除
    @Override
    public void deleteBook(String id) {
        String sql = "delete from t_book where user_id=?";
        int update = jdbcTemplate.update(sql, id);
        System.out.println(update);//0,1,-1
    }
}
```



#### 4.3.2 Services层

```java
package com.caq.spring5.service;

import com.caq.spring5.dao.BookDao;
import com.caq.spring5.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    //    注入dao对象
    @Autowired
    private BookDao bookDao;

//    添加的方法
    public void addBook(Book book){
        bookDao.add(book);
    }

    public void updateBook(Book book){
        bookDao.updateBook(book);
    }

    public void deleteBook(String id){
        bookDao.deleteBook(id);
    }

}

```



#### 4.3.3 测试

```java
package com.caq.spring5.test;

import com.caq.spring5.entity.Book;
import com.caq.spring5.service.BookService;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class testAdd {

    @Test
    public void testJdbcTemplate(){
//        1.解析xml文件
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
//        2.得到对象
        BookService bookService = context.getBean("bookService", BookService.class);
        
        //        修改的测试
        Book book = new Book();
        book.setUserId("1");
        book.setUsername("javanb");
        book.setUstatus("Failed");
        bookService.updateBook(book);
        
        //        删除的测试
        bookService.deleteBook("1");

    }
}

```

​	

修改后

![image-20220110160804012](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110160804012.png)





删除后

![image-20220110161231124](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110161231124.png)





### 4.4 JdbcTemplate 操作数据库（查询返回对象）

下面只放关键代码了，全粘贴上去太浪费时间了

```java
public int findCount(){
        return bookDao.selectCount();
    }

@Override
public int selectCount() {
    String sql = " select count(*) from t_book";
    Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
    return count;
}

int count = bookService.findCount();
        System.out.println(count);




一月 10, 2022 4:22:11 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} inited
2
```





### 4.5 JdbcTemplate 操作数据库（查询返回对象）

![image-20220110164950703](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110164950703.png)

#### 4.5.1 返回某个对象

```java
//    根据id返回某个对象，类似于查看某个图书的详细信息，其实就是查看这个对象
    public Book findOne(String id){
        return bookDao.findBookInfo(id);
    }




@Override
    public Book findBookInfo(String id) {
        String sql = "select * from t_book where user_id=?";
//        调用方法
        Book book = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<Book>(Book.class),id);
        return book;
    }
    


    一月 10, 2022 4:39:15 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} inited
Book{userId='1', username='a', ustatus='S'}
```



#### 4.5.2 返回集合对象

```java
//    查询数据库中所有对象，返回一个集合
    public List<Book> findAll(){
        return bookDao.findAllBook();
    }
    
    
    
    
    
        @Override
    public List<Book> findAllBook() {
        String sql = "select * from t_book";
        List<Book> bookList = jdbcTemplate.query(sql, new BeanPropertyRowMapper<Book>(Book.class));
        return bookList;
    }
    
    
    
    //        查询返回集合
        List<Book> all = bookService.findAll();
        System.out.println(all);
        
        
  一月 10, 2022 4:47:21 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} inited
[Book{userId='1', username='a', ustatus='S'}, Book{userId='2', username='b', ustatus='F'}]
      
```

























### 4.6 JdbcTemplate 操作数据库（批量操作）

#### 4.6.1 批量添加

```java
//    批量添加
    public void batchAddBook(List<Object[]> batchArgs){
        bookDao.batchAddBook(batchArgs);
    }
    
    
    
    
    
     @Override
    public void batchAddBook(List<Object[]> batchArgs) {
        String sql = "insert into t_book values(?,?,?)";
        int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
        System.out.println(Arrays.toString(ints));
    }
    
    
    
    
    
    
    
List<Object[]> batchArgs = new ArrayList<>();
        Object[] o1 = {"3","C","Success"};
        Object[] o2 = {"4","C++","Success"};
        Object[] o3 = {"5","C##","Success"};
        batchArgs.add(o1);
        batchArgs.add(o2);
        batchArgs.add(o3);
//        调用批量添加
        bookService.batchAddBook(batchArgs);
```



![image-20220110181607759](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110181607759.png)







#### 4.6.2 批量修改

```java
public void batchUpdate(List<Object[]> batchArgs) {
    bookDao.batchUpdate(batchArgs);
}




    @Override
    public void batchUpdate(List<Object[]> batchArgs) {
        String sql = "update t_book set username=?,ustatus=? where user_id=?";
        int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
        System.out.println(Arrays.toString(ints));
    }
    
    
    
      List<Object[]> batchArgs = new ArrayList<>();
        Object[] o1 = {"Python", "Success", "3"};
        Object[] o2 = {"Object-c", "Success", "4"};
        Object[] o3 = {"Linux", "Success", "5"};
        batchArgs.add(o1);
        batchArgs.add(o2);
        batchArgs.add(o3);
//        调用批量添加
        bookService.batchUpdate(batchArgs);


一月 10, 2022 6:50:51 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} inited
[1, 1, 1]
```





![image-20220110185109540](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110185109540.png)





#### 4.6.3 批量删除

```java
//    批量删除
    public void batchDelete(List<Object[]> batchArgs) {
        bookDao.batchDelete(batchArgs);

    }
    
    
    
    
    
        @Override
    public void batchDelete(List<Object[]> batchArgs) {
        String sql = "delete from t_book where user_id=?";
        int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
        System.out.println(Arrays.toString(ints));
    }
    
    
    
    
    
    
    
    
    
            List<Object[]> batchArgs = new ArrayList<>();
        Object[] o1 = {"3"};
        Object[] o2 = {"4"};
        Object[] o3 = {"5"};
        batchArgs.add(o1);
        batchArgs.add(o2);
        batchArgs.add(o3);
//        调用批量添加
        bookService.batchDelete(batchArgs);




一月 10, 2022 7:00:19 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} inited
[1, 1, 1]
```

![image-20220110190110606](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110190110606.png)









## 五、事务管理

### 5.1 事务操作（事务概念）

#### 5.1.1 什么是事物？

**事物是数据库操作最基本单元，逻辑上一组操作，要么都成功要么都失败，如果有一个失败所有操作都失败**



#### 5.1.2 事物的特性(ACID)

#### (1)原子性（Atomicity）

一组事物要么都成功要么都失败



#### (2)一致性（Consistency）

操作之前和操作之后它的总量是不变的



#### (3)隔离性（Isolation）

即一个事务内部的操作及正在操作的数据必须封锁起来，不被其它企图进行修改的事务看到。 

两人同时去操作同一条数据，这个过程是不会产生影响的



#### (4)持久性（Durability）

事物提交，表中数据发生变化





### 5.2 事务操作（Spring 事务管理介绍)

事务添加到JavaEE三层结构里面Service层(业务逻辑层)因为是业务层对数据进行操作

在 Spring进行事务管理操作

(1)有两种方式:编程式事务管理和声明式事务管理（使用)





3、声明式事务管理

(1）基于注解方式(使用)

(2）基于xml 配置文件方式





4、在 Spring进行声明式事务管理，底层使用AOP原理





5、Spring事务管理API

(1）提供一个接口，代表事务管理器，这个接口针对不同的框架提供不同的实现类

![image-20220110225351366](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110225351366.png)







### 5.3 事务操作（注解声明式事务管理）

#### 5.3.1 在spring配置文件配置事务管理器

```xml
<!--    创建事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
<!--        注入数据源-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>
```



#### 5.3.2 在 spring 配置文件，开启事务注解 

#### (1)在 spring 配置文件引入名称空间 tx

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                          http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                          http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
                          http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

<!--    组件扫描-->
    <context:component-scan base-package="com.caq"></context:component-scan>


    <!-- 数据库连接池 -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
          destroy-method="close">
        <property name="url" value="jdbc:mysql:///user_db" />
        <property name="username" value="root" />
        <property name="password" value="root" />
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    </bean>

<!--    JdbcTemplate对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
<!--        注入dataSource-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>

<!--    创建事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
<!--        注入数据源-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>


<!--    开启事物注解-->
    <tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>

</beans>

```

#### (2)开启事务注解

```xml
<!--    开启事物注解-->
    <tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>
```



#### 5.3.3 在 service 类上面（或者 service 类里面方法上面）添加事务注解 

> @Transactional，这个注解添加到类上面，也可以添加方法上面 
>
> 如果把这个注解添加类上面，这个类里面所有的方法都添加事务 
>
> 如果把这个注解添加方法上面，为这个方法添加事务





### 5.4 事务操作（声明式事务管理参数配置）

#### 5.4.1 @Transactional相关参数

![image-20220110230154250](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110230154250.png)



#### 5.4.2 propagation：事务传播行为 

#### (1)事物方法？

事物方法就是对数据库表数据进行变化的操作，如增加删除数据的方法就是事物方法



#### (2)事物传播行为？

**指的就是当一个事物方法被另一个事务方法调用时，这个事务改如何进行**

例如当A事物方法调用B事物方法时，B是继续在A事物方法中运行呢，还是为自己新开一个事物运行呢，**这就是B事物方法传播行为决定的~**



这里视频讲的一笔带过了，想了解详细的话要去补一下mysql基础！

视频这里主要是讲这些在spring中怎么配置



![image-20220110231007145](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110231007145.png)



**Spring框架事务传播行为有7种**



主要了解这两种

**REQUIRED**

如果add方法本身有事务，调用update方法之后，update使用当前add方法里面事务

如果add方法本身没有事务，调用update方法之后，创建新事务



**REQUIRED_NEW**

使用add方法调用updato方法，如果add无论是否有事务，都创建新的事务



![image-20220110232940154](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110232940154.png)



#### 5.4.3 ioslation：事务隔离级别

#### (1)事务并发可能出现的情况

##### 脏读（Dirty Read）

> 一个事务读到了另一个未提交事务修改过的数据

![image-20220110235544761](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110235544761.png)

> 会话B开启一个事务，把id=1的name为武汉市修改成温州市，此时另外一个会话A也开启一个事务，读取id=1的name，此时的查询结果为温州市，会话B的事务最后回滚了刚才修改的记录，这样会话A读到的数据是不存在的，这个现象就是脏读。（脏读只在读未提交隔离级别才会出现）



##### 不可重复读（Non-Repeatable Read）

> 事物B读取了两次数据资源，在这两次读取过程中事物A修改了数据，导致事物B两次读取的数据不一致这就是不可重复读（不可重复读在读未提交和读已提交隔离级别都可能会出现）

![image-20220110235339265](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110235339265.png)

> 会话A开启一个事务，查询id=1的结果，此时查询的结果name为武汉市。接着会话B把id=1的name修改为温州市（隐式事务，因为此时的autocommit为1，每条SQL语句执行完自动提交），此时会话A的事务再一次查询id=1的结果，读取的结果name为温州市。会话B再此修改id=1的name为杭州市，会话A的事务再次查询id=1，结果name的值为杭州市，这种现象就是不可重复读。





##### 幻读（Phantom）

> 一个事务先根据某些条件查询出一些记录，之后另一个事务又向表中插入了符合这些条件的记录，原先的事务再次按照该条件查询时，能把另一个事务插入的记录也读出来。
>
> 幻读和不可重复读有些类似，但是幻读强调的是集合的增减，而不是单条数据的更新。
>
> （幻读在读未提交、读已提交、可重复读隔离级别都可能会出现）

![image-20220110235232170](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220110235232170.png)

> 会话A开启一个事务，查询id>0的记录，此时会查到name=武汉市的记录。接着会话B插入一条name=温州市的数据（隐式事务，因为此时的autocommit为1，每条SQL语句执行完自动提交），这时会话A的事务再以刚才的查询条件（id>0）再一次查询，此时会出现两条记录（name为武汉市和温州市的记录），这种现象就是幻读。



#### (2)事务的隔离级别

==通过设置事物的隔离级别来解决读问题==

> MySQL的事务隔离级别一共有四个，分别是读未提交、读已提交、可重复读以及可串行化。
>
> MySQL的隔离级别的作用就是让事务之间互相隔离，互不影响，这样可以保证事务的一致性。
>
> 隔离级别比较：可串行化>可重复读>读已提交>读未提交
>
> 隔离级别对性能的影响比较：可串行化>可重复读>读已提交>读未提交
>
> 由此看出，隔离级别越高，所需要消耗的MySQL性能越大（如事务并发严重性），为了平衡二者，一般建议设置的隔离级别为可重复读，MySQL默认的隔离级别也是可重复读。

##### 读未提交（READ UNCOMMITTED）

![image-20220111000248689](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220111000248689.png)

> 在读未提交隔离级别下，事务A可以读取到事务B修改过但未提交的数据。
>
> 可能发生脏读、不可重复读和幻读问题，一般很少使用此隔离级别。



##### 读已提交（READ COMMITTED）

![image-20220111000409644](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220111000409644.png)

> 在读已提交隔离级别下，事务B只能在事务A修改过并且已提交后才能读取到事务A修改的数据。
>
> 读已提交隔离级别解决了脏读的问题，但可能发生不可重复读和幻读问题，一般很少使用此隔离级别。





##### 可重复读（REPEATABLE READ）

![image-20220111000923945](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220111000923945.png)

> 在可重复读隔离级别下，事务B只能在事务A修改过数据并提交后，自己也提交事务后，才能读取到事务A修改的数据
>
> 可重复读隔离级别解决了脏读和不可重复读的问题，但可能发生幻读问题。
>
> 提问：为什么上了写锁（写操作），别的事务还可以读操作？
>
> 因为InnoDB有MVCC机制（多版本并发控制），可以使用快照读，而不会被阻塞。





##### 可串行化（SERIALIZABLE）

> 串行化(Serializable)，这是最高的隔离级别。它要求事务序列化执行，事务只能一个接着一个地执行，不能并发执行。在这个级别，可以解决上面提到的所有并发问题，但可能导致大量的超时现象和锁竞争，通常不会用这个隔离级别。

![image-20220111000807274](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220111000807274.png)

![image-20220111000819292](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220111000819292.png)



![image-20220111000832562](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220111000832562.png)



![image-20220111000840054](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220111000840054.png)

> 各种问题（脏读、不可重复读、幻读）都不会发生，通过加锁实现（读锁和写锁）。

![image-20220112115422810](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220112115422810.png)



#### (3)四种隔离级别的比较

![image-20220111001636335](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220111001636335.png)



spring中的默认情况(不写括号里的内容，默认是这些)

```java
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ)
```





#### 5.4.4 timeout:超时时间

(1）事务需要在一定时间内进行提交，如果不提交进行回滚

(2）默认值是-1，设置时间以秒单位进行计算

#### 5.4.5 readOnly:是否只读

(1）读:查询操作，写:添加修改删除操作

(2) readOnly 默认值false，表示可以查询，可以添加修改删除操作

(3）设置readOnly值是true，设置成true之后，只能查询

#### 5.4.6 rollbackFor:回滚

(1）设置出现哪些异常进行事务回滚

#### 5.4.7 noRollbackFor:不回滚

(1）设置出现哪些异常不进行事务回滚





### 5.5 事物操作（XML声明式事务管理）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                          http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                          http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
                          http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

<!--    组件扫描-->
    <context:component-scan base-package="com.caq"></context:component-scan>


    <!-- 数据库连接池 -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
          destroy-method="close">
        <property name="url" value="jdbc:mysql:///user_db" />
        <property name="username" value="root" />
        <property name="password" value="root" />
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    </bean>

<!--    JdbcTemplate对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
<!--        注入dataSource-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>

<!--    1.创建事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
<!--        注入数据源-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>

<!--    2.配置通知-->
    <tx:advice id="txadvice">
        <tx:attributes>
<!--            指定那种规则的方法上面添加事物-->
            <tx:method name="accountMoney" propagation="REQUIRED"/>
<!--            <tx:method name="account*"/>-->
        </tx:attributes>
    </tx:advice>

<!--    3.配置切入点和切面-->
    <aop:config>
<!--        给UserService类里的所有方法都运行这个规则-->
        <aop:pointcut id="pt" expression="execution(* com.caq.spring5.service.UserService.*(..)"/>
<!--    配置切面-->
        <aop:advisor advice-ref="txadvice" pointcut-ref="pt"></aop:advisor>
    </aop:config>



</beans>
```



```java
@Autowired
private UserDao userDao;

public void accountMoney(){

    userDao.reduceMoney();
    int i = 10/0;

    userDao.addMoney();
}


@Test
    public void test2(){
        ApplicationContext context = new ClassPathXmlApplicationContext("bean2.xml");
        UserService userService = context.getBean("userService", UserService.class);
        userService.accountMoney();

    }
```

事物会发生回滚，数据库表数据不变



### 5.6 事务操作（完全注解声明式事务管理）

#### 5.6.1 注解类

```java
package com.caq.spring5.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration //配置类
@ComponentScan(basePackages = "com.caq")    //扫描com.caq包下所有
@EnableTransactionManagement    //开启事物
public class TxConfig {

    //创建数据库连接池
    @Bean
    public DruidDataSource getDruidDataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql:///user_db");
        dataSource.setUsername("root");
        dataSource.setPassword("root");
        return dataSource;
    }

    //    JdbcTemplate对象
    @Bean
    public JdbcTemplate getJdbcTemplate(DataSource dataSource) {
//        到ioc容器中根据数据类型找到dataSource
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        //        注入dataSource
        jdbcTemplate.setDataSource(dataSource);
        return jdbcTemplate;
    }

    //声明事物管理器
    @Bean
    public DataSourceTransactionManager dataSourceTransactionManager(DataSource dataSource) {
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }

}

```





#### 5.6.2 测试

```java
@Test
public void test3(){
    ApplicationContext context = new AnnotationConfigApplicationContext(TxConfig.class);
    UserService userService = context.getBean("userService", UserService.class);
    userService.accountMoney();

}
```

事物会发生回滚，数据库表数据不变





## 六、Spring5新特性

### 6.1 日志封装

#### 6.1.1 引入jar包

![image-20220111221208276](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220111221208276.png)



#### 6.1.2 创建 log4j2.xml 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--日志级别以及优先级排序: OFF > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL -->
<!--Configuration后面的status用于设置log4j2自身内部的信息输出，可以不设置，当设置成trace时，可以看到log4j2内部各种详细输出-->
<configuration status="DEBUG">
    <!--先定义所有的appender-->
    <appenders>
        <!--输出日志信息到控制台-->
        <console name="Console" target="SYSTEM_OUT">
            <!--控制日志输出的格式-->
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </console>
    </appenders>
    <!--然后定义logger，只有定义了logger并引入的appender，appender才会生效-->
    <!--root：用于指定项目的根日志，如果没有单独指定Logger，则会使用root作为默认的日志输出-->
    <loggers>
        <root level="info">
            <appender-ref ref="Console"/>
        </root>
    </loggers>
</configuration>
```



### 6.2 @Nullable 注解

**@Nullable注解可以使用在方法上面，属性上面，参数上面，表示方法返回可以为空，属性值可以为空，参数值可以为空**



**注解用在方法上面，方法返回值可以为空**



注解使用在方法参数里面，方法参数可以为空



注解使用在属性上面，属性值可以为空



可实验下面的代码



### 6.3 函数式风格 GenericApplicationContext

```java
@Test
    public void testGenericApplicationContext(){
        //1.创建GenericApplicationContext对象
        GenericApplicationContext context = new GenericApplicationContext();
        context.refresh();

//        context.registerBean(User.class,() -> new User());
        context.registerBean("user1",User.class,() -> new User());
        //    public <T> void registerBean(@Nullable String beanName, Class<T> beanClass, @Nullable Supplier<T> supplier, BeanDefinitionCustomizer... customizers) {
//        Nullable前面带它的参数值可以为空，如context.registerBean(User.class,() -> new User());中的第一个参数就没写，也是可以创建的。当然你写了也可以
   
//        获取spring注册的对象
        User user = (User)context.getBean("user1");
        System.out.println(user);
    }
```



还有些新特性不确定，还是先别上车了。需要的时候在进行学习即可



## 七、总结

### 7.1 Spring框架概述

(1）轻量级开源JavaEE框架，为了解决企业复杂性，两个核心组成:IOC和AOP

**IOC控制反转，依赖注入**



Spring5.2.6稳点的版本



### 7.2 IOC容器

**(1）IOC底层原理（工厂、反射等)**

**先通过 XML 解析来加载 spring.xml 配置文件，然后使用反射机制调用无参构造函数动态创建对象，并调用 setter 方法完成对象属性的赋值，最后将创建好的对象放在一个类似于 HashMap 的容器里，调用 getBean 方法获取对象时，相当于 map.get(id) 返回一个对象。**



**(2) IOC接口（BeanFactory）**

- **BeanFactory：IOC容器基本实现，是spring内部使用接口**，不提供开发人员使用。加载配置文件时不会创建对象，使用对象时才会创建对象（懒汉式加载对象）。
- ​	ApplicationContext：BeanFatory的子接口，提供更多更强大的功能，一般供开发人员进行使用。加载配置文件时就创建对象（饥汉式加载对象）。



**(3)IOC操作Bean管理（基于注解)**

**创建对象**

- @Component 普通用法
- @Service 用于service业务逻辑层
- @Controller 用于web层
- @Repository 用于DAO持久层



**注入属性**

@Autowired:根据属性类型进行自动装配





### 7.3 Aop

**(1) AOP底层原理**

动态代理，有接口（JDK动态代理)，没有接口（CGLIB动态代理)



**(2）关键术语**

切入点：实际增强的方法

增强（通知）：方法增强的部分

切面：将通知应用到切入点的过程



**(3）基于Aspect]实现AOP操作**

创建被代理类

创建代理类,通过@Component

在代理类,上添加注解@Aspect

在Spring配置文件中开启生产代理对象

 配置不同类型的通知







### 7.4 JdbcTemplate

(1）使用JdbcTemplate实现数据库curd操作

创建UserDao接口，创建实现类

> 1、注入jdbcTemplate
>
> 2、创建添加的方法
>
> 3、创建sql语句
>
> 4、调用方法实现jdbcTemplate.update(sql, args);

CRUD其余类似



创建UserService调用实现类方法



创建测试类调用UserService逻辑方法

> 1.解析xml文件
>
> 2.得到对象



(2）使用JdbcTemplate实现数据库批量操作

> 1.将参数放到一个集合里
>
> 2.调用jdbcTemplate.batchUpdate(sql, batchArgs);进行批量处理
>
> 3.设置参数添加到集合
>
> 4.实施





### 7.5 事务管理

(1）事务概念

事务是数据库操作基本单元，逻辑上一组事物要么同时成功要么同时失败，只要有一个失败，那么所有操作都失败



(2)传播行为

**传播行为：事务B方法被事务A方法调用时，事物B方法应该如何进行**



（3）隔离级别：

**如果事务并发可能会出现脏读，不可重复读，幻读等情况。为了避免发生这种情况可以通过事务的隔离级别来解决这个问题**

分别是

> 读未提交：什么都避免不了
>
> 读已提交：事物B只能在事物A修改过并且提交过才能读取到A修改过的数据,能避免脏读
>
> ==可重复读（Mysql默认事物隔离级别）==：事务B只能在事务A修改过提交过后，自己也提交后，才能读取到事务A修改过的数据
>
> 可串行化：事务的最高级别。给操作的记录上一个共享锁（读写锁），即当读某条记录时就占用这条记录的读锁，此时其它事务一样可以申请到这条记录的读锁来读取，但是不能写（读锁被占的话，写锁就不能被占；读锁可以被多个事务同时占有）



(3)完全注解方式实现声明式事务管理

声明注解类

```java
package com.caq.spring5.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration //配置类
@ComponentScan(basePackages = "com.caq")    //扫描com.caq包下所有
@EnableTransactionManagement    //开启事物
public class TxConfig {

    //创建数据库连接池
    @Bean
    public DruidDataSource getDruidDataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql:///user_db");
        dataSource.setUsername("root");
        dataSource.setPassword("root");
        return dataSource;
    }

    //    JdbcTemplate对象
    @Bean
    public JdbcTemplate getJdbcTemplate(DataSource dataSource) {
//        到ioc容器中根据数据类型找到dataSource
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        //        注入dataSource
        jdbcTemplate.setDataSource(dataSource);
        return jdbcTemplate;
    }

    //声明事物管理器
    @Bean
    public DataSourceTransactionManager dataSourceTransactionManager(DataSource dataSource) {
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }

}
```



开启事物

```java
package com.caq.spring5.service;


import com.caq.spring5.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service //生成UserService对象
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ)    //开启事物，并设置事物相关参数
public class UserService {

//    注入dao
    @Autowired
    private UserDao userDao;

    public void accountMoney(){

        userDao.reduceMoney();
        int i = 10/0;

        userDao.addMoney();
    }


}
```





测试

```java
@Test
public void test3(){
    ApplicationContext context = new AnnotationConfigApplicationContext(TxConfig.class);
    UserService userService = context.getBean("userService", UserService.class);
    userService.accountMoney();
}
```









参考文章：

[浅谈 IOC 什么是 IOC？_平凡的人类的博客-CSDN博客_ioc](https://blog.csdn.net/qq_36537546/article/details/90599137?ops_request_misc=%7B%22request%5Fid%22%3A%22164145677216781685368333%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=164145677216781685368333&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-90599137.first_rank_v2_pc_rank_v29&utm_term=什么是ioc&spm=1018.2226.3001.4187)

[10. Spring IOC 底层原理_Training.L的博客-CSDN博客](https://blog.csdn.net/qq_41775769/article/details/120146473)

[单例设计模式-------懒汉式，饿汉式（超详细，附代码） - 云+社区 - 腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1414936)

[彻底搞懂 MySQL 事务的隔离级别-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/743691)

