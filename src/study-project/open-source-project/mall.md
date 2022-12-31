# mall
从0开始一个开源项目

1. 看简介，知道项目是做什么的
2. 看代码更新频率，几年没更新的最好别用
3. 看README.md了解项目是否符合自己的技术栈
4. 运行项目
  - 本地拉取代码
  - 看项目从整体到局部，先看项目架构  =》 看POM文件  =》看YML配置文件  =》看目录结构



## 项目架构

### mall-admin-web

`mall-admin-web`是一个电商后台管理系统的前端项目，基于Vue+Element实现。主要包括商品管理、订单管理、会员管理、促销管理、运营管理、内容管理、统计报表、财务管理、权限管理、设置等功能。

![image-20220603115454940](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603115454940.png)



### mall

mall项目（50k+star）是一套电商系统，使用现阶段主流技术实现。涵盖了SpringBoot 2.3.0、MyBatis 3.4.6、Elasticsearch 7.6.2、RabbitMQ 3.7.15、Redis 5.0、MongoDB 4.2.5、Mysql5.7等技术，采用Docker容器化部署。

![image-20220603115647958](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603115647958.png)







从上面可以看出，这是一个前后端分离的项目

前端项目为mall-admin-web

后端项目为mall



所用技术栈也比较符合我们Java工程师

其中Mybatis不想用的话也可以用MP来代替

ES和Mongodb没接触过的话，不用从头去学，了解下怎么使用即可~







### Github1s

一个开源项目，能够直接在github页面通过vscode查看项目代码

使用方法就是在项目地址中的github关键字后加上1s回车即可查看

![image-20220603113325249](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603113325249.png)



==前端代码架构==

前端看视频学的谷粒学院很相似，

所以前端没啥大问题。

![image-20220603114859606](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603114859606.png)



==后端代码架构==

mall
├── mall-common -- 工具类及通用代码
├── mall-mbg -- MyBatisGenerator生成的数据库操作代码
├── mall-security -- SpringSecurity封装公用模块
├── mall-admin -- 后台商城管理系统接口
├── mall-search -- 基于Elasticsearch的商品搜索系统
├── mall-portal -- 前台商城系统接口
└── mall-demo -- 框架搭建时的测试代码

![image-20220603120918683](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603120918683.png)



简单了解下商品模块的功能

**这个商品列表，也就是CRUD中的查询，只不过人家查询的条目很多**

![image-20220603121451895](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603121451895.png)



**添加商品呢，也就是CRUD中的增**

![image-20220603121539759](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603121539759.png)



**商品回收站，也就是CRUD中的删**

![image-20220603121856964](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603121856964.png)





**商品的配置就属于是优化部分了，比如打开一级菜单的时候显示属于一级菜单的二级菜单**

![image-20220603122022521](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603122022521.png)



**最后是一些附加项，如商品的品牌管理，库存管理，图片管理，分类管理等等的一些CRUD操作**

![image-20220603122216298](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603122216298.png)



### 总结

实现功能如下，简单说就是针对商品的各种管理。如商品，类型，分类，品牌，订单...

![image-20220603122547653](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603122547653.png)

整体看下来，技术点是不难的。难点是细节比较多，业务逻辑可能稍微复杂，但是越难我们越要上！要对自己很有自信，一个一个的去攻破难点，这样我们才能不断的变强，与诸君共勉！





## 后台架构

mall
├── mall-common -- 工具类及通用代码
├── mall-mbg -- MyBatisGenerator生成的数据库操作代码
├── mall-security -- SpringSecurity封装公用模块
├── mall-admin -- 后台商城管理系统接口
├── mall-search -- 基于Elasticsearch的商品搜索系统
├── mall-portal -- 前台商城系统接口
└── mall-demo -- 框架搭建时的测试代码



通过前面的学习我们知道了开发接口的套路

1. 建表写sql
2. 定义实体类
3. dao与mapper
4. service
5. controller



## maven工程分析

> 此项目采用maven来做包的依赖管理
>
> 下面简单分析下maven的结构

### 聚合

项目采用maven的聚合和继承

聚合是为了更快的构建项目，是表示项目与子项目之间的关系

继承则是消除不同模块同种依赖节省了不必要配置



mall这个项目，有管理商品项目、mbg项目，权限管理项目。这个时候在maven中表达这种归属关系，就可以用maven的聚合来表示，如下：

```xml
<modules>
    <module>mall-common</module>
    <module>mall-admin</module>
    <module>mall-mbg</module>
</modules>
```

一般情况把子模块放到父模块下面，也可以在同一模块，只需要改变module的值即可

```xml
<modules>
    <module>../mall-common</module>
    <module>../mall-admin</module>
    <module>../mall-mbg</module>
</modules>
```



### 继承

> spring-boot-starter-actuator可以用于检测系统的健康情况、当前的Beans、系统的缓存等
>
> spring-boot-starter-aop Spring Boot使用AOP

项目的 dependencies 元素中声明该依赖，就会自动继承到子模块中

其中spring-boot-starter-actuator、spring-boot-starter-aop...都可以自动继承到子模块

![image-20220626133156247](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220626133156247.png)





## common模块

> 此模块定义多个微服务模块公用的工具类，异常处理类，统一返回类等公共部分

为了更好的理解，有一些前置知识需要在回顾一下：

**一、枚举**

​	Java 枚举是一个特殊的类，一般表示一组常量，它是线程安全的，所以定义固定的常量一般把他们定义在枚举类里

创建一个枚举类，经过编译后实际上会生成一个对应的抽象类，这个类继承了Java API中的java.lang.Enum类

还为我们生成了两个静态方法，分别是values()和 valueOf()

图中所举例子TEST1将会变成public [static](https://so.csdn.net/so/search?q=static&spm=1001.2101.3001.7020) final R TEST1;

![image-20220603222434900](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220603222434900.png)



项目中用到的是枚举的高级用法，向enum类添加方法与自定义属性和构造函数

```java
public enum ResultCode implements IErrorCode {
    SUCCESS(200, "操作成功"),
    FAILED(500, "操作失败"),
    VALIDATE_FAILED(404, "参数检验失败"),
    UNAUTHORIZED(401, "暂未登录或token已经过期"),
    FORBIDDEN(403, "没有相关权限");

    private long code;
    private String message;

    private ResultCode(long code, String message) {
        this.code = code;
        this.message = message;
    }

    public long getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
```



**二、泛型**

1.什么是泛型？

泛型是程序语言的一种特性，**指类型参数化**



2.为什么要有泛型？

**为了使代码更灵活**，因为java是强类型语言(强类型语言是一种**强制类型定义的语言**，即一旦某一个变量被定义类型，如果不经强制转换，那么它永远就死该数据类型。)，引入泛型后可以让部分代码可变，这部分代码在使用前必须声明。还有就是减少强制类型转换



3.泛型方法

泛型方法就是方法的返回值不是确定的类型，通过一个通配符来占位，等真正用到此方法的时候在指定返回值类型。



4.泛型类

同泛型方法

在详细可看我之前发布的文章泛型篇

[强哥说Java--Java的泛型_小蜗牛耶的博客-CSDN博客_强哥说java](https://blog.csdn.net/qq_45714272/article/details/119974269?ops_request_misc=%7B%22request%5Fid%22%3A%22165427101016782248534560%22%2C%22scm%22%3A%2220140713.130102334.pc%5Fblog.%22%7D&request_id=165427101016782248534560&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-119974269-null-null.nonecase&utm_term=泛型&spm=1018.2226.3001.4450)



### pom

> 这里redis先注释，等整合的时候再用

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>mall-study</artifactId>
        <groupId>com.caq.mall</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <artifactId>mall-common</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
<!--        <dependency>-->
<!--            <groupId>org.springframework.boot</groupId>-->
<!--            <artifactId>spring-boot-starter-data-redis</artifactId>-->
<!--        </dependency>-->
        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-commons</artifactId>
        </dependency>
        <dependency>
            <groupId>net.logstash.logback</groupId>
            <artifactId>logstash-logback-encoder</artifactId>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
    </dependencies>

</project>
```



### 统一返回类

> 将后端处理好的数据以同一的格式返回给前端

格式固定，可以根据项目需求更改

这个项目写的这套返回类是很标准的，工作了我们也可以拿这个来写

```java
/**
 * 通用返回对象
 */
public class CommonResult<T> {
    /**
     * 状态码
     */
    private long code;
    /**
     * 提示信息
     */
    private String message;
    /**
     * 数据封装
     */
    private T data;

    protected CommonResult() {
    }

    protected CommonResult(long code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 成功返回结果
     *
     * @param data 获取的数据
     */
    public static <T> CommonResult<T> success(T data) {
        return new CommonResult<T>(ResultCode.SUCCESS.getCode(), ResultCode.SUCCESS.getMessage(), data);
    }

    /**
     * 成功返回结果
     *
     * @param data 获取的数据
     * @param  message 提示信息
     */
    public static <T> CommonResult<T> success(T data, String message) {
        return new CommonResult<T>(ResultCode.SUCCESS.getCode(), message, data);
    }

    /**
     * 失败返回结果
     * @param errorCode 错误码
     */
    public static <T> CommonResult<T> failed(IErrorCode errorCode) {
        return new CommonResult<T>(errorCode.getCode(), errorCode.getMessage(), null);
    }

    /**
     * 失败返回结果
     * @param errorCode 错误码
     * @param message 错误信息
     */
    public static <T> CommonResult<T> failed(IErrorCode errorCode,String message) {
        return new CommonResult<T>(errorCode.getCode(), message, null);
    }

    /**
     * 失败返回结果
     * @param message 提示信息
     */
    public static <T> CommonResult<T> failed(String message) {
        return new CommonResult<T>(ResultCode.FAILED.getCode(), message, null);
    }

    /**
     * 失败返回结果
     */
    public static <T> CommonResult<T> failed() {
        return failed(ResultCode.FAILED);
    }

    /**
     * 参数验证失败返回结果
     */
    public static <T> CommonResult<T> validateFailed() {
        return failed(ResultCode.VALIDATE_FAILED);
    }

    /**
     * 参数验证失败返回结果
     * @param message 提示信息
     */
    public static <T> CommonResult<T> validateFailed(String message) {
        return new CommonResult<T>(ResultCode.VALIDATE_FAILED.getCode(), message, null);
    }

    /**
     * 未登录返回结果
     */
    public static <T> CommonResult<T> unauthorized(T data) {
        return new CommonResult<T>(ResultCode.UNAUTHORIZED.getCode(), ResultCode.UNAUTHORIZED.getMessage(), data);
    }

    /**
     * 未授权返回结果
     */
    public static <T> CommonResult<T> forbidden(T data) {
        return new CommonResult<T>(ResultCode.FORBIDDEN.getCode(), ResultCode.FORBIDDEN.getMessage(), data);
    }

    public long getCode() {
        return code;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
```



### 分页数据封装类

```java
package com.caq.mall.common.api;

import com.github.pagehelper.PageInfo;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 分页数据封装类
 */
public class CommonPage<T> {
    /**
     * 当前页码
     */
    private Integer pageNum;
    /**
     * 每页数量
     */
    private Integer pageSize;
    /**
     * 总页数
     */
    private Integer totalPage;
    /**
     * 总条数
     */
    private Long total;
    /**
     * 分页数据
     */
    private List<T> list;

    /**
     * 将PageHelper分页后的list转为分页信息
     */
    public static <T> CommonPage<T> restPage(List<T> list) {
        CommonPage<T> result = new CommonPage<T>();
        PageInfo<T> pageInfo = new PageInfo<T>(list);
        result.setTotalPage(pageInfo.getPages());
        result.setPageNum(pageInfo.getPageNum());
        result.setPageSize(pageInfo.getPageSize());
        result.setTotal(pageInfo.getTotal());
        result.setList(pageInfo.getList());
        return result;
    }

    /**
     * 将SpringData分页后的list转为分页信息
     */
    public static <T> CommonPage<T> restPage(Page<T> pageInfo) {
        CommonPage<T> result = new CommonPage<T>();
        result.setTotalPage(pageInfo.getTotalPages());
        result.setPageNum(pageInfo.getNumber());
        result.setPageSize(pageInfo.getSize());
        result.setTotal(pageInfo.getTotalElements());
        result.setList(pageInfo.getContent());
        return result;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
```











### 异常处理

分别定义自定义异常、全局异常、断言

**断言的作用是简化方法入参检测的代码**

不使用断言的情况下我们要这样写：

```java
public InputStream getData(String file) { 
    if (file == null || file.length() == 0|| file.replaceAll("\\s", "").length() == 0) {
        throw new IllegalArgumentException("file入参不是有效的文件地址"); 
    } 
```

在应用 Assert 断言类后，其代码可以简化为以下的形式：

```java
public InputStream getData(String file){ 
    Assert.hasText(file,"file入参不是有效的文件地址"); 
```



**自定义异常类：ApiException**

```java
package com.macro.mall.common.exception;

import com.macro.mall.common.api.IErrorCode;

/**
 * 自定义API异常
 */
public class ApiException extends RuntimeException {
    private IErrorCode errorCode;

    public ApiException(IErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ApiException(String message) {
        super(message);
    }

    public ApiException(Throwable cause) {
        super(cause);
    }

    public ApiException(String message, Throwable cause) {
        super(message, cause);
    }

    public IErrorCode getErrorCode() {
        return errorCode;
    }
}
```



**断言类：Asserts**

```java
/**
 * 断言处理类，用于抛出各种API异常
 */
public class Asserts {
    public static void fail(String message) {
        throw new ApiException(message);
    }

    public static void fail(IErrorCode errorCode) {
        throw new ApiException(errorCode);
    }
}
```



**全局异常处理类：GlobalExceptionHandler**

```java
/**
 * 全局异常处理
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ExceptionHandler(value = ApiException.class)
    public CommonResult handle(ApiException e) {
        if (e.getErrorCode() != null) {
            return CommonResult.failed(e.getErrorCode());
        }
        return CommonResult.failed(e.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public CommonResult handleValidException(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        String message = null;
        if (bindingResult.hasErrors()) {
            FieldError fieldError = bindingResult.getFieldError();
            if (fieldError != null) {
                message = fieldError.getField()+fieldError.getDefaultMessage();
            }
        }
        return CommonResult.validateFailed(message);
    }

    @ResponseBody
    @ExceptionHandler(value = BindException.class)
    public CommonResult handleValidException(BindException e) {
        BindingResult bindingResult = e.getBindingResult();
        String message = null;
        if (bindingResult.hasErrors()) {
            FieldError fieldError = bindingResult.getFieldError();
            if (fieldError != null) {
                message = fieldError.getField()+fieldError.getDefaultMessage();
            }
        }
        return CommonResult.validateFailed(message);
    }
}
```



### Swagger

以下是固定写法

```java
/**
 * Swagger基础配置
 */
public abstract class BaseSwaggerConfig {

    @Bean
    public Docket createRestApi() {
        SwaggerProperties swaggerProperties = swaggerProperties();
        Docket docket = new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo(swaggerProperties))
            .select()
            .apis(RequestHandlerSelectors.basePackage(swaggerProperties.getApiBasePackage()))
            .paths(PathSelectors.any())
            .build();
        //        if (swaggerProperties.isEnableSecurity()) {
        //            docket.securitySchemes(securitySchemes()).securityContexts(securityContexts());
        //        }
        return docket;
    }

    private ApiInfo apiInfo(SwaggerProperties swaggerProperties) {
        return new ApiInfoBuilder()
            .title(swaggerProperties.getTitle())
            .description(swaggerProperties.getDescription())
            .contact(new Contact(swaggerProperties.getContactName(), swaggerProperties.getContactUrl(), swaggerProperties.getContactEmail()))
            .version(swaggerProperties.getVersion())
            .build();
    }
}
```



Swagger自定义配置

```java
/**
 * Swagger自定义配置
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Builder
public class SwaggerProperties {
    /**
     * API文档生成基础路径
     */
    private String apiBasePackage;
    /**
     * 是否要启用登录认证
     */
    private boolean enableSecurity;
    /**
     * 文档标题
     */
    private String title;
    /**
     * 文档描述
     */
    private String description;
    /**
     * 文档版本
     */
    private String version;
    /**
     * 文档联系人姓名
     */
    private String contactName;
    /**
     * 文档联系人网址
     */
    private String contactUrl;
    /**
     * 文档联系人邮箱
     */
    private String contactEmail;
}
```



## mbg模块

> mb就是Mybatis简写，g是generator，连起来就是mbg。意思是mybatis的生成器
>
> 这个模块是mybatis自动生成的代码，它将数据库中的表一键生成对应java中的实体类和mapper（数据库映射文件）
>
> 其他模块用的时候直接引用mbg模块生成的实体类或映射文件



如下是mybatis官网对mbg的介绍：

[MyBatis Generator Core – Introduction to MyBatis Generator](http://mybatis.org/generator/)

![image-20220207160557125](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220207160557125.png)



### 代码生成器类

> 固定写法

```java
public class Generator {
    public static void main(String[] args) throws Exception {
        //MBG 执行过程中的警告信息
        List<String> warnings = new ArrayList<String>();
        //当生成的代码重复时，覆盖原代码
        boolean overwrite = true;
        //读取我们的 MBG 配置文件
        InputStream is = Generator.class.getResourceAsStream("/generatorConfig.xml");
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = cp.parseConfiguration(is);
        is.close();

        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        //创建 MBG
        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        //执行生成代码
        myBatisGenerator.generate(null);
        //输出警告信息
        for (String warning : warnings) {
            System.out.println(warning);
        }
    }
}
```



### 注释类

> 给自动生成的代码加一些自定义的注释

```java
public class CommentGenerator extends DefaultCommentGenerator {
    private boolean addRemarkComments = false;
    private static final String EXAMPLE_SUFFIX="Example";
    private static final String MAPPER_SUFFIX="Mapper";
    private static final String API_MODEL_PROPERTY_FULL_CLASS_NAME="io.swagger.annotations.ApiModelProperty";

    /**
     * 设置用户配置的参数
     */
    @Override
    public void addConfigurationProperties(Properties properties) {
        super.addConfigurationProperties(properties);
        this.addRemarkComments = StringUtility.isTrue(properties.getProperty("addRemarkComments"));
    }

    /**
     * 给字段添加注释
     */
    @Override
    public void addFieldComment(Field field, IntrospectedTable introspectedTable,
                                IntrospectedColumn introspectedColumn) {
        String remarks = introspectedColumn.getRemarks();
        //根据参数和备注信息判断是否添加swagger注解信息
        if(addRemarkComments&&StringUtility.stringHasValue(remarks)){
//            addFieldJavaDoc(field, remarks);
            //数据库中特殊字符需要转义
            if(remarks.contains("\"")){
                remarks = remarks.replace("\"","'");
            }
            //给model的字段添加swagger注解
            field.addJavaDocLine("@ApiModelProperty(value = \""+remarks+"\")");
        }
    }

    /**
     * 给model的字段添加注释
     */
    private void addFieldJavaDoc(Field field, String remarks) {
        //文档注释开始
        field.addJavaDocLine("/**");
        //获取数据库字段的备注信息
        String[] remarkLines = remarks.split(System.getProperty("line.separator"));
        for(String remarkLine:remarkLines){
            field.addJavaDocLine(" * "+remarkLine);
        }
        addJavadocTag(field, false);
        field.addJavaDocLine(" */");
    }

    @Override
    public void addJavaFileComment(CompilationUnit compilationUnit) {
        super.addJavaFileComment(compilationUnit);
        //只在model中添加swagger注解类的导入
        if(!compilationUnit.getType().getFullyQualifiedName().contains(MAPPER_SUFFIX)&&!compilationUnit.getType().getFullyQualifiedName().contains(EXAMPLE_SUFFIX)){
            compilationUnit.addImportedType(new FullyQualifiedJavaType(API_MODEL_PROPERTY_FULL_CLASS_NAME));
        }
    }
}
```





### 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <properties resource="generator.properties"/>
<!--    targetRuntime="MyBatis3"能生成复杂的查询
        MyBatis3Simple只能生成简单的CRUD
        -->
    <context id="MySqlContext" targetRuntime="MyBatis3Simple" defaultModelType="flat">
        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>
        <property name="javaFileEncoding" value="UTF-8"/>
        <!-- 为模型生成序列化方法-->
        <plugin type="org.mybatis.generator.plugins.SerializablePlugin"/>
        <!-- 为生成的Java模型创建一个toString方法 -->
        <plugin type="org.mybatis.generator.plugins.ToStringPlugin"/>
        <!--生成mapper.xml时覆盖原文件-->
        <plugin type="org.mybatis.generator.plugins.UnmergeableXmlMappersPlugin" />

<!--        取消自动生成的注释，用自定义的注释-->
        <commentGenerator type="com.caq.mall.CommentGenerator">
            <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
            <property name="suppressAllComments" value="true"/>
            <property name="suppressDate" value="true"/>
            <property name="addRemarkComments" value="true"/>
        </commentGenerator>


        <jdbcConnection driverClass="${jdbc.driverClass}"
                        connectionURL="${jdbc.connectionURL}"
                        userId="${jdbc.userId}"
                        password="${jdbc.password}">
            <!--解决mysql驱动升级到8.0后不生成指定数据库代码的问题-->
            <property name="nullCatalogMeansCurrent" value="true" />
        </jdbcConnection>

<!--        指定代码生成位置-->
        <javaModelGenerator targetPackage="com.caq.mall.model" targetProject="mall-mbg\src\main\java"/>
        <!--        指定代码生成位置-->
        <sqlMapGenerator targetPackage="com.caq.mall.mapper" targetProject="mall-mbg\src\main\resources"/>
        <!--        指定代码生成位置-->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.caq.mall.mapper"
                             targetProject="mall-mbg\src\main\java"/>
        <!--生成全部表tableName设为%-->
        <table tableName="%">
            <generatedKey column="id" sqlStatement="MySql" identity="true"/>
        </table>
    </context>
</generatorConfiguration>
```

```properties
jdbc.driverClass=com.mysql.cj.jdbc.Driver
jdbc.connectionURL=jdbc:mysql://localhost:3306/mall?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
jdbc.userId=root
jdbc.password=root
```



当配置文件targetRuntime="MyBatis3Simple"时，生成代码结构如下：

![image-20220626131017012](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220626131017012.png)



当配置文件targetRuntime="MyBatis3"时

![image-20220626131256812](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220626131256812.png)





##  mall-admin模块

### pom

> 这里先只引入mbg模块代码

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>mall-study</artifactId>
        <groupId>com.caq.mall</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <artifactId>mall-admin</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.caq.mall</groupId>
            <artifactId>mall-mbg</artifactId>
        </dependency>
<!--        <dependency>-->
<!--            <groupId>com.macro.mall</groupId>-->
<!--            <artifactId>mall-security</artifactId>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>com.aliyun.oss</groupId>-->
<!--            <artifactId>aliyun-sdk-oss</artifactId>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>io.minio</groupId>-->
<!--            <artifactId>minio</artifactId>-->
<!--        </dependency>-->
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>com.spotify</groupId>
                <artifactId>docker-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```





### 模块简介

了解代码后，这个模块就是来接受前端一些CRUD的操作

我们先来看下这些包名都什么意思

> 配置类（通过配置类来设置属性）
> 控制层（用来处理请求）
> dao层（用来操作数据库）
> 数据传输层（将数据封装成对象的形式传输）
> 服务层（抽取出所需要的功能写成一个接口的形式，通过实现类实现这些功能）

这样分层的好处是代码结构清晰，逻辑严谨

其他模块也是这种分层形式来写代码，包名就是实际意义的英文缩写

![image-20220604102429164](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220604102429164.png)











```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.caq.mall.mapper.PmsProductAttributeCategoryDao">
    <resultMap id="getListWithAttrMap" type="com.caq.mall.dto.PmsProductAttributeCategoryItem" extends="com.caq.mall.mapper.PmsProductAttributeCategoryMapper.BaseResultMap">
        <collection property="productAttributeList" columnPrefix="attr_" resultMap="com.caq.mall.mapper.PmsProductAttributeMapper.BaseResultMap">
        </collection>
    </resultMap>
    <select id="getListWithAttr" resultMap="getListWithAttrMap">
        SELECT
            pac.id,
            pac.name,
            pa.id attr_id,
            pa.name attr_name
        FROM
            pms_product_attribute_category pac
            LEFT JOIN pms_product_attribute pa ON pac.id = pa.product_attribute_category_id
        AND pa.type=1;
    </select>
</mapper>
```





























## 品牌管理接口

> **开发接口就是开发Controller，service，mapper的过程**

品牌管理这个接口写着是很简单的，因为它都是单表查询，mapper文件我们不用写，用mbg自动生成的就行。

后面写的接口也是一样，**涉及到多表查询的mapper文件需要自己写，单表查询的我们就直接用mbg自动生成的文件就可以。**

### 分析前端需求

![image-20220628231630548](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220628231630548.png)

**这里的查询比较简单，就是简单的单表查询**



### dto

> dto为数据传输对象英文简写
>
> 作用是接受用户传来的参数，之后在赋值到实体类中从而插入数据

```java
/**
 * 品牌请求参数
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class PmsBrandParam {
    @NotEmpty
    @ApiModelProperty(value = "品牌名称",required = true)
    private String name;

    @ApiModelProperty(value = "品牌首字母")
    private String firstLetter;

    @Min(value = 0)
    @ApiModelProperty(value = "排序字段")
    private Integer sort;

    @FlagValidator(value = {"0","1"}, message = "厂家状态不正确")
    @ApiModelProperty(value = "是否为厂家制造商")
    private Integer factoryStatus;

    @FlagValidator(value = {"0","1"}, message = "显示状态不正确")
    @ApiModelProperty(value = "是否进行显示")
    private Integer showStatus;

    @NotEmpty
    @ApiModelProperty(value = "品牌logo",required = true)
    private String logo;

    @ApiModelProperty(value = "品牌大图")
    private String bigPic;

    @ApiModelProperty(value = "品牌故事")
    private String brandStory;
}
```



### service

> mapper不用写，用mbg生成的。因为是单表所以可以直接拿来用

```java
/**
 * 商品品牌管理Service
 */
public interface PmsBrandService {
    /**
     * 获取所有品牌
     */
    List<PmsBrand> listAllBrand();

    /**
     * 创建品牌
     */
    int createBrand(PmsBrandParam pmsBrandParam);

    /**
     * 修改品牌
     */
    @Transactional
    int updateBrand(Long id, PmsBrandParam pmsBrandParam);

    /**
     * 删除品牌
     */
    int deleteBrand(Long id);

    /**
     * 批量删除品牌
     */
    int deleteBrand(List<Long> ids);

    /**
     * 分页查询品牌
     */
    List<PmsBrand> listBrand(String keyword, int pageNum, int pageSize);

    /**
     * 获取品牌详情
     */
    PmsBrand getBrand(Long id);

    /**
     * 修改显示状态
     */
    int updateShowStatus(List<Long> ids, Integer showStatus);

    /**
     * 修改厂家制造商状态
     */
    int updateFactoryStatus(List<Long> ids, Integer factoryStatus);
}
```



### impl

==分页查询==

> 通过pageHelper对象设置分页，参数为当前页和每页数量
>
> 生成PmsBrandExample对象，设置里面的属性即可实现升序降序，desc为降序，asc为升序
>
> criteria.andNameLike作用是查询的时候将条件设置为模糊查询

```java
@Override
public List<PmsBrand> listBrand(String keyword, int pageNum, int pageSize) {
    PageHelper.startPage(pageNum, pageSize);
    PmsBrandExample pmsBrandExample = new PmsBrandExample();
    pmsBrandExample.setOrderByClause("sort desc");
    PmsBrandExample.Criteria criteria = pmsBrandExample.createCriteria();
    if (!StringUtils.isEmpty(keyword)) {
        criteria.andNameLike("%" + keyword + "%");
    }
    return brandMapper.selectByExample(pmsBrandExample);
}
```



完整代码：

```java
/**
 * 商品品牌管理Service实现类
 */
@Service
public class PmsBrandServiceImpl implements PmsBrandService {
    @Autowired
    private PmsBrandMapper brandMapper;
    @Autowired
    private PmsProductMapper productMapper;

    @Override
    public List<PmsBrand> listAllBrand() {
        return brandMapper.selectByExample(new PmsBrandExample());
    }

    @Override
    public int createBrand(PmsBrandParam pmsBrandParam) {
        PmsBrand pmsBrand = new PmsBrand();
        BeanUtils.copyProperties(pmsBrandParam, pmsBrand);
        //如果创建时首字母为空，取名称的第一个为首字母
        if (StringUtils.isEmpty(pmsBrand.getFirstLetter())) {
            pmsBrand.setFirstLetter(pmsBrand.getName().substring(0, 1));
        }
        return brandMapper.insertSelective(pmsBrand);
    }

    @Override
    public int updateBrand(Long id, PmsBrandParam pmsBrandParam) {
        PmsBrand pmsBrand = new PmsBrand();
        BeanUtils.copyProperties(pmsBrandParam, pmsBrand);
        pmsBrand.setId(id);
        //如果创建时首字母为空，取名称的第一个为首字母
        if (StringUtils.isEmpty(pmsBrand.getFirstLetter())) {
            pmsBrand.setFirstLetter(pmsBrand.getName().substring(0, 1));
        }
        //更新品牌时要更新商品中的品牌名称
        PmsProduct product = new PmsProduct();
        product.setBrandName(pmsBrand.getName());
        PmsProductExample example = new PmsProductExample();
        example.createCriteria().andBrandIdEqualTo(id);
        productMapper.updateByExampleSelective(product,example);
        return brandMapper.updateByPrimaryKeySelective(pmsBrand);
    }

    @Override
    public int deleteBrand(Long id) {
        return brandMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int deleteBrand(List<Long> ids) {
        PmsBrandExample pmsBrandExample = new PmsBrandExample();
        pmsBrandExample.createCriteria().andIdIn(ids);
        return brandMapper.deleteByExample(pmsBrandExample);
    }

    @Override
    public List<PmsBrand> listBrand(String keyword, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        PmsBrandExample pmsBrandExample = new PmsBrandExample();
        pmsBrandExample.setOrderByClause("sort desc");
        PmsBrandExample.Criteria criteria = pmsBrandExample.createCriteria();
        if (!StringUtils.isEmpty(keyword)) {
            criteria.andNameLike("%" + keyword + "%");
        }
        return brandMapper.selectByExample(pmsBrandExample);
    }

    @Override
    public PmsBrand getBrand(Long id) {
        return brandMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateShowStatus(List<Long> ids, Integer showStatus) {
        PmsBrand pmsBrand = new PmsBrand();
        pmsBrand.setShowStatus(showStatus);
        PmsBrandExample pmsBrandExample = new PmsBrandExample();
        pmsBrandExample.createCriteria().andIdIn(ids);
        return brandMapper.updateByExampleSelective(pmsBrand, pmsBrandExample);
    }

    @Override
    public int updateFactoryStatus(List<Long> ids, Integer factoryStatus) {
        PmsBrand pmsBrand = new PmsBrand();
        pmsBrand.setFactoryStatus(factoryStatus);
        PmsBrandExample pmsBrandExample = new PmsBrandExample();
        pmsBrandExample.createCriteria().andIdIn(ids);
        return brandMapper.updateByExampleSelective(pmsBrand, pmsBrandExample);
    }
}
```



### controller

```java
/**
 * 商品品牌管理Controller
 */
@RestController
@Api(tags = "PmsBrandController", description = "商品品牌管理")
@RequestMapping("/brand")
public class PmsBrandController {
    @Autowired
    private PmsBrandService brandService;

    @ApiOperation(value = "获取全部品牌列表")
    @GetMapping("/listAll")
    public CommonResult<List<PmsBrand>> getList() {
        return CommonResult.success(brandService.listAllBrand());
    }

    @ApiOperation(value = "添加品牌")
    @PostMapping("/create")
    //@RequestBody主要用来接收前端传递给后端的json字符串中的数据的(请求体中的数据的)；
    //前端传来的json就对应我们后端的一个个对象
    public CommonResult create(@Validated @RequestBody PmsBrandParam pmsBrand) {
        CommonResult commonResult;
        int count = brandService.createBrand(pmsBrand);
        if (count == 1) {
            commonResult = CommonResult.success(count);
        } else {
            commonResult = CommonResult.failed();
        }
        return commonResult;
    }

    @ApiOperation(value = "更新品牌")
    @PostMapping("/update/{id}")
    public CommonResult update(@PathVariable("id") Long id,
                               @Validated @RequestBody PmsBrandParam pmsBrandParam) {
        CommonResult commonResult;
        int count = brandService.updateBrand(id, pmsBrandParam);
        if (count == 1) {
            commonResult = CommonResult.success(count);
        } else {
            commonResult = CommonResult.failed();
        }
        return commonResult;
    }

    @ApiOperation(value = "删除品牌")
    @DeleteMapping("/delete/{id}")
    public CommonResult delete(@PathVariable("id") Long id) {
        int count = brandService.deleteBrand(id);
        if (count == 1) {
            return CommonResult.success(null);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation(value = "根据品牌名称分页获取品牌列表")
    @GetMapping("/list")
    public CommonResult<CommonPage<PmsBrand>> getList(@RequestParam(value = "keyword", required = false) String keyword,
                                                      @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
                                                      @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize) {
        List<PmsBrand> brandList = brandService.listBrand(keyword, pageNum, pageSize);
        return CommonResult.success(CommonPage.restPage(brandList));
    }

    @ApiOperation(value = "根据编号查询品牌信息")
    @GetMapping("/{id}")
    public CommonResult<PmsBrand> getItem(@PathVariable("id") Long id) {
        return CommonResult.success(brandService.getBrand(id));
    }

    @ApiOperation(value = "批量删除品牌")
    @DeleteMapping("/delete/batch")
    public CommonResult deleteBatch(@RequestParam("ids") List<Long> ids) {
        int count = brandService.deleteBrand(ids);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation(value = "批量更新显示状态")
    @PostMapping("/update/showStatus")
    public CommonResult updateShowStatus(@RequestParam("ids") List<Long> ids,
                                   @RequestParam("showStatus") Integer showStatus) {
        int count = brandService.updateShowStatus(ids, showStatus);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation(value = "批量更新厂家制造商状态")
    @PostMapping("/update/factoryStatus")
    public CommonResult updateFactoryStatus(@RequestParam("ids") List<Long> ids,
                                      @RequestParam("factoryStatus") Integer factoryStatus) {
        int count = brandService.updateFactoryStatus(ids, factoryStatus);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }
}
```



### swagger测试

![image-20220628232501149](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220628232501149.png)



## 商品类型接口

### 分析前端需求

![image-20220628212714895](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220628212714895.png)

**不难看出，我们只需要写这个页面的查询即可，属性列表和参数列表应该是按找类型id来分别查**

**像添加、编辑、删除都属于单表操作，单表操作的所有mapper文件都由mbg自动生成了**



### 实体类

#### PmsProductAttributeCategoryItem

> **接受查询结果**

```java
@Data
public class PmsProductAttributeCategoryItem extends PmsProductAttributeCategory {
    @ApiModelProperty(value = "商品属性列表")
    private List<PmsProductAttribute> productAttributeList;
}
```



#### PmsProductAttributeParam

> **接受增加、修改商品参数**

接受如下属性：

![image-20220629105900776](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220629105900776.png)

```java
/**
 * 商品属性参数
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class PmsProductAttributeParam {
    @NotEmpty
    @ApiModelProperty("属性分类ID")
    private Long productAttributeCategoryId;

    @NotEmpty
    @ApiModelProperty("属性名称")
    private String name;

    @FlagValidator({"0","1","2"})
    @ApiModelProperty("属性选择类型：0->唯一；1->单选；2->多选")
    private Integer selectType;

    @FlagValidator({"0","1"})
    @ApiModelProperty("属性录入方式：0->手工录入；1->从列表中选取")
    private Integer inputType;

    @ApiModelProperty("可选值列表，以逗号隔开")
    private String inputList;
    private Integer sort;

    @ApiModelProperty("分类筛选样式：0->普通；1->颜色")
    @FlagValidator({"0","1"})
    private Integer filterType;

    @ApiModelProperty("检索类型；0->不需要进行检索；1->关键字检索；2->范围检索")
    @FlagValidator({"0","1","2"})
    private Integer searchType;

    @ApiModelProperty("相同属性产品是否关联；0->不关联；1->关联")
    @FlagValidator({"0","1"})
    private Integer relatedStatus;

    @ApiModelProperty("是否支持手动新增；0->不支持；1->支持")
    @FlagValidator({"0","1"})
    private Integer handAddStatus;

    @ApiModelProperty("属性的类型；0->规格；1->参数")
    @FlagValidator({"0","1"})
    private Integer type;

}
```





### dao

#### PmsProductAttributeCategoryDao

> **获取包含属性的商品属性分类**

![image-20220629110103556](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220629110103556.png)



```java
/**
 * 商品属性分类管理自定义Dao
 */
public interface PmsProductAttributeCategoryDao {
    /**
     * 获取包含属性的商品属性分类
     */
    List<PmsProductAttributeCategoryItem> getListWithAttr();
}
```



#### PmsProductAttributeCategoryDao.xml

> **查询的结果就是一级分类对象和它们的二级分类**
>
> resultMap通过PmsProductAttributeMapper.BaseResultMap继承了基础字段，后面又自定义了collection标签来映射二级分类集合
>
>
>
> collection接受的集合是PmsProductAttributeMapper类型的集合，所以还可以通过继承PmsProductAttributeMapper.BaseResultMap做基础字段，由于自定义的sql查询的pms_product_attribute表是attr开头，所以用columnPrefix="attr_"

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.caq.mall.mapper.PmsProductAttributeCategoryDao">
    <resultMap id="getListWithAttrMap" type="com.caq.mall.dto.PmsProductAttributeCategoryItem" extends="com.caq.mall.mapper.PmsProductAttributeCategoryMapper.BaseResultMap">
        <collection property="productAttributeList" columnPrefix="attr_" resultMap="com.caq.mall.mapper.PmsProductAttributeMapper.BaseResultMap">
        </collection>
    </resultMap>
    <select id="getListWithAttr" resultMap="getListWithAttrMap">
        SELECT
            pac.id,
            pac.name,
            pa.id attr_id,
            pa.name attr_name
        FROM
            pms_product_attribute_category pac
            LEFT JOIN pms_product_attribute pa ON pac.id = pa.product_attribute_category_id
        AND pa.type=1;
    </select>
</mapper>
```



#### PmsProductAttributeDao

> 获取商品属性信息

![image-20220629115131666](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220629115131666.png)

```java
/**
 * 商品属性管理自定义Dao
 */
public interface PmsProductAttributeDao {
    /**
     * 获取商品属性信息
     */
    List<ProductAttrInfo> getProductAttrInfo(@Param("id") Long productCategoryId);
}

```



#### PmsProductAttributeDao.xml

> 商品属性管理自定义Dao

**比如这里，显示的结果意思就是24号属性对应的是1号分类**

![image-20220629115814924](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220629115814924.png)



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.caq.mall.mapper.PmsProductAttributeDao">
    <select id="getProductAttrInfo" resultType="com.caq.mall.dto.ProductAttrInfo">
        SELECT
            pa.id  attributeId,
            pac.id attributeCategoryId
        FROM
            pms_product_category_attribute_relation pcar
            LEFT JOIN pms_product_attribute pa ON pa.id = pcar.product_attribute_id
            LEFT JOIN pms_product_attribute_category pac ON pa.product_attribute_category_id = pac.id
        WHERE
            pcar.product_category_id = #{id}
    </select>
</mapper>
```



### service

#### PmsProductAttributeCategoryService

> 商品属性分类管理Service

```java
/**
 * 商品属性分类管理Service
 */
public interface PmsProductAttributeCategoryService {
    /**
     * 创建属性分类
     */
    int create(String name);

    /**
     * 修改属性分类
     */
    int update(Long id, String name);

    /**
     * 删除属性分类
     */
    int delete(Long id);

    /**
     * 获取属性分类详情
     */
    PmsProductAttributeCategory getItem(Long id);

    /**
     * 分页查询属性分类
     */
    List<PmsProductAttributeCategory> getList(Integer pageSize, Integer pageNum);

    /**
     * 获取包含属性的属性分类
     */
    List<PmsProductAttributeCategoryItem> getListWithAttr();
}
```



#### PmsProductAttributeService

> 商品属性管理Service

```java
/**
 * 商品属性管理Service
 */
public interface PmsProductAttributeService {
    /**
     * 根据分类分页获取商品属性
     * @param cid 分类id
     * @param type 0->规格；1->参数
     */
    List<PmsProductAttribute> getList(Long cid, Integer type, Integer pageSize, Integer pageNum);

    /**
     * 添加商品属性
     */
    @Transactional
    int create(PmsProductAttributeParam pmsProductAttributeParam);

    /**
     * 修改商品属性
     */
    int update(Long id, PmsProductAttributeParam productAttributeParam);

    /**
     * 获取单个商品属性信息
     */
    PmsProductAttribute getItem(Long id);

    /**
     * 批量删除商品属性
     */
    @Transactional
    int delete(List<Long> ids);

    /**
     * 获取商品分类对应属性列表
     */
    List<ProductAttrInfo> getProductAttrInfo(Long productCategoryId);
}
```







### impl

#### PmsProductAttributeCategoryServiceImpl

```java
/**
 * 商品属性分类管理Service实现类
 */
@Service
public class PmsProductAttributeCategoryServiceImpl implements PmsProductAttributeCategoryService {
    @Autowired
    private PmsProductAttributeCategoryMapper productAttributeCategoryMapper;
    @Autowired
    private PmsProductAttributeCategoryDao productAttributeCategoryDao;

    @Override
    public int create(String name) {
        PmsProductAttributeCategory productAttributeCategory = new PmsProductAttributeCategory();
        productAttributeCategory.setName(name);
        return productAttributeCategoryMapper.insertSelective(productAttributeCategory);
    }

    @Override
    public int update(Long id, String name) {
        PmsProductAttributeCategory productAttributeCategory = new PmsProductAttributeCategory();
        productAttributeCategory.setName(name);
        productAttributeCategory.setId(id);
        return productAttributeCategoryMapper.updateByPrimaryKeySelective(productAttributeCategory);
    }

    @Override
    public int delete(Long id) {
        return productAttributeCategoryMapper.deleteByPrimaryKey(id);
    }

    @Override
    public PmsProductAttributeCategory getItem(Long id) {
        return productAttributeCategoryMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<PmsProductAttributeCategory> getList(Integer pageSize, Integer pageNum) {
        PageHelper.startPage(pageNum,pageSize);
        return productAttributeCategoryMapper.selectByExample(new PmsProductAttributeCategoryExample());
    }

    @Override
    public List<PmsProductAttributeCategoryItem> getListWithAttr() {
        return productAttributeCategoryDao.getListWithAttr();
    }
}
```



#### PmsProductAttributeServiceImpl

```java
/**
 * 商品属性管理Service实现类
 */
@Service
public class PmsProductAttributeServiceImpl implements PmsProductAttributeService {
    @Autowired
    private PmsProductAttributeMapper productAttributeMapper;
    @Autowired
    private PmsProductAttributeCategoryMapper productAttributeCategoryMapper;
    @Autowired
    private PmsProductAttributeDao productAttributeDao;

    @Override
    public List<PmsProductAttribute> getList(Long cid, Integer type, Integer pageSize, Integer pageNum) {
        PageHelper.startPage(pageNum, pageSize);
        PmsProductAttributeExample example = new PmsProductAttributeExample();
        example.setOrderByClause("sort desc");
        example.createCriteria().andProductAttributeCategoryIdEqualTo(cid).andTypeEqualTo(type);
        return productAttributeMapper.selectByExample(example);
    }

    @Override
    public int create(PmsProductAttributeParam pmsProductAttributeParam) {
        PmsProductAttribute pmsProductAttribute = new PmsProductAttribute();
        BeanUtils.copyProperties(pmsProductAttributeParam, pmsProductAttribute);
        int count = productAttributeMapper.insertSelective(pmsProductAttribute);
        //新增商品属性以后需要更新商品属性分类数量
        PmsProductAttributeCategory pmsProductAttributeCategory = productAttributeCategoryMapper.selectByPrimaryKey(pmsProductAttribute.getProductAttributeCategoryId());
        if(pmsProductAttribute.getType()==0){
            pmsProductAttributeCategory.setAttributeCount(pmsProductAttributeCategory.getAttributeCount()+1);
        }else if(pmsProductAttribute.getType()==1){
            pmsProductAttributeCategory.setParamCount(pmsProductAttributeCategory.getParamCount()+1);
        }
        productAttributeCategoryMapper.updateByPrimaryKey(pmsProductAttributeCategory);
        return count;
    }

    @Override
    public int update(Long id, PmsProductAttributeParam productAttributeParam) {
        PmsProductAttribute pmsProductAttribute = new PmsProductAttribute();
        pmsProductAttribute.setId(id);
        BeanUtils.copyProperties(productAttributeParam, pmsProductAttribute);
        return productAttributeMapper.updateByPrimaryKeySelective(pmsProductAttribute);
    }

    @Override
    public PmsProductAttribute getItem(Long id) {
        return productAttributeMapper.selectByPrimaryKey(id);
    }

    @Override
    public int delete(List<Long> ids) {
        //获取分类
        PmsProductAttribute pmsProductAttribute = productAttributeMapper.selectByPrimaryKey(ids.get(0));
        Integer type = pmsProductAttribute.getType();
        PmsProductAttributeCategory pmsProductAttributeCategory = productAttributeCategoryMapper.selectByPrimaryKey(pmsProductAttribute.getProductAttributeCategoryId());
        PmsProductAttributeExample example = new PmsProductAttributeExample();
        example.createCriteria().andIdIn(ids);
        int count = productAttributeMapper.deleteByExample(example);
        //删除完成后修改数量
        if(type==0){
            if(pmsProductAttributeCategory.getAttributeCount()>=count){
                pmsProductAttributeCategory.setAttributeCount(pmsProductAttributeCategory.getAttributeCount()-count);
            }else{
                pmsProductAttributeCategory.setAttributeCount(0);
            }
        }else if(type==1){
            if(pmsProductAttributeCategory.getParamCount()>=count){
                pmsProductAttributeCategory.setParamCount(pmsProductAttributeCategory.getParamCount()-count);
            }else{
                pmsProductAttributeCategory.setParamCount(0);
            }
        }
        productAttributeCategoryMapper.updateByPrimaryKey(pmsProductAttributeCategory);
        return count;
    }

    @Override
    public List<ProductAttrInfo> getProductAttrInfo(Long productCategoryId) {
        return productAttributeDao.getProductAttrInfo(productCategoryId);
    }
}
```





### controller

#### PmsProductAttributeCategoryController

> **对商品类型基础的CRUD和获取所有商品属性分类及其下属性**

```java
/**
 * 商品属性分类管理Controller
 */
@RestController
@Api(tags = "PmsProductAttributeCategoryController", description = "商品属性分类管理")
@RequestMapping("/productAttribute/category")
public class PmsProductAttributeCategoryController {
    @Autowired
    private PmsProductAttributeCategoryService productAttributeCategoryService;

    @ApiOperation("添加商品属性分类")
    @PostMapping("/create")
    public CommonResult create(@RequestParam String name) {
        int count = productAttributeCategoryService.create(name);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("修改商品属性分类")
    @PostMapping("/update/{id}")
    public CommonResult update(@PathVariable Long id, @RequestParam String name) {
        int count = productAttributeCategoryService.update(id, name);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("删除单个商品属性分类")
    @DeleteMapping("/delete/{id}")
    public CommonResult delete(@PathVariable Long id) {
        int count = productAttributeCategoryService.delete(id);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("获取单个商品属性分类信息")
    @GetMapping("/{id}")
    public CommonResult<PmsProductAttributeCategory> getItem(@PathVariable Long id) {
        PmsProductAttributeCategory productAttributeCategory = productAttributeCategoryService.getItem(id);
        return CommonResult.success(productAttributeCategory);
    }

    @ApiOperation("分页获取所有商品属性分类")
    @GetMapping("/list")
    public CommonResult<CommonPage<PmsProductAttributeCategory>> getList(@RequestParam(defaultValue = "5") Integer pageSize, @RequestParam(defaultValue = "1") Integer pageNum) {
        List<PmsProductAttributeCategory> productAttributeCategoryList = productAttributeCategoryService.getList(pageSize, pageNum);
        return CommonResult.success(CommonPage.restPage(productAttributeCategoryList));
    }

    @ApiOperation("获取所有商品属性分类及其下属性")
    @GetMapping("/list/withAttr")
    public CommonResult<List<PmsProductAttributeCategoryItem>> getListWithAttr() {
        List<PmsProductAttributeCategoryItem> productAttributeCategoryResultList = productAttributeCategoryService.getListWithAttr();
        return CommonResult.success(productAttributeCategoryResultList);
    }
}
```



#### PmsProductAttributeController

> 对商品属性做基础的CRUD和根据商品分类的id获取商品属性及属性分类

```java
/**
 * 商品属性管理Controller
 */
@Controller
@Api(tags = "PmsProductAttributeController", description = "商品属性管理")
@RequestMapping("/productAttribute")
public class PmsProductAttributeController {
    @Autowired
    private PmsProductAttributeService productAttributeService;

    @ApiOperation("根据分类查询属性列表或参数列表")
    @ApiImplicitParams({@ApiImplicitParam(name = "type", value = "0表示属性，1表示参数", required = true, paramType = "query", dataType = "integer")})
    @RequestMapping(value = "/list/{cid}", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<CommonPage<PmsProductAttribute>> getList(@PathVariable Long cid,
                                                                 @RequestParam(value = "type") Integer type,
                                                                 @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize,
                                                                 @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum) {
        List<PmsProductAttribute> productAttributeList = productAttributeService.getList(cid, type, pageSize, pageNum);
        return CommonResult.success(CommonPage.restPage(productAttributeList));
    }

    @ApiOperation("添加商品属性信息")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult create(@RequestBody PmsProductAttributeParam productAttributeParam) {
        int count = productAttributeService.create(productAttributeParam);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("修改商品属性信息")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult update(@PathVariable Long id, @RequestBody PmsProductAttributeParam productAttributeParam) {
        int count = productAttributeService.update(id, productAttributeParam);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("查询单个商品属性")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<PmsProductAttribute> getItem(@PathVariable Long id) {
        PmsProductAttribute productAttribute = productAttributeService.getItem(id);
        return CommonResult.success(productAttribute);
    }

    @ApiOperation("批量删除商品属性")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult delete(@RequestParam("ids") List<Long> ids) {
        int count = productAttributeService.delete(ids);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("根据商品分类的id获取商品属性及属性分类")
    @RequestMapping(value = "/attrInfo/{productCategoryId}", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<List<ProductAttrInfo>> getAttrInfo(@PathVariable Long productCategoryId) {
        List<ProductAttrInfo> productAttrInfoList = productAttributeService.getProductAttrInfo(productCategoryId);
        return CommonResult.success(productAttrInfoList);
    }
}
```



### swagger测试

![image-20220628225346788](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220628225346788.png)



![image-20220629122217930](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220629122217930.png)





## 商品分类接口

### 分析前端需求

![image-20220628225723675](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220628225723675.png)

**和商品类型接口类似，我们只需要写这个页面的查询即可。查看下级就是按分类id在查里面的集合**

> 例如点击服装分类的查看下级就按照服装id查询服装的子集合



**像添加、编辑、删除都属于单表操作，单表操作的所有mapper文件都由mbg自动生成了**



### 实体类

#### PmsProductCategoryWithChildrenItem

> 接受查询出的所有结果的
>
> 在继承mbg生成的分类表对应的实体类基础上加了一个集合属性

```java
/**
 * 包含子级分类的商品分类
 */
@Data
public class PmsProductCategoryWithChildrenItem extends PmsProductCategory {

    @ApiModelProperty("子级分类")
    private List<PmsProductCategory> children;
}
```



#### PmsProductCategoryParam

> 用来接受创建新分类时的参数



==为啥不直接用PmsProductCategory对象呢？==

**这样写更规范，根据前端的需要按条件定义参数，后端定义dto对象来接受这些参数，最后通过赋值的方式传给PmsProductCategory对象即可**



```java
/**
 * 添加更新产品分类的参数
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class PmsProductCategoryParam {
    @ApiModelProperty("父分类的编号")
    private Long parentId;

    @NotEmpty
    @ApiModelProperty(value = "商品分类名称",required = true)
    private String name;

    @ApiModelProperty("分类单位")
    private String productUnit;

    @FlagValidator(value = {"0","1"},message = "状态只能为0或1")
    @ApiModelProperty("是否在导航栏显示")
    private Integer navStatus;

    @FlagValidator(value = {"0","1"},message = "状态只能为0或1")
    @ApiModelProperty("是否进行显示")
    private Integer showStatus;

    @Min(value = 0)
    @ApiModelProperty("排序")
    private Integer sort;

    @ApiModelProperty("图标")
    private String icon;

    @ApiModelProperty("关键字")
    private String keywords;

    @ApiModelProperty("描述")
    private String description;

    @ApiModelProperty("产品相关筛选属性集合")
    private List<Long> productAttributeIdList;

}
```



### dao

#### PmsProductCategoryAttributeRelationDao

> 做批量创建的

![image-20220629122322184](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220629122322184.png)





```java
/**
 * 商品分类和属性关系自定义Dao
 */
public interface PmsProductCategoryAttributeRelationDao {
    /**
     * 批量创建
     */
    int insertList(@Param("list") List<PmsProductCategoryAttributeRelation> productCategoryAttributeRelationList);
}

```

#### PmsProductCategoryAttributeRelationDao.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.caq.mall.mapper.PmsProductCategoryAttributeRelationDao">
    <!--批量新增回写主键支持-->
    <insert id="insertList">
        INSERT INTO pms_product_category_attribute_relation (product_category_id, product_attribute_id) VALUES
        <foreach collection="list" separator="," item="item" index="index">
            (#{item.productCategoryId,jdbcType=BIGINT},
            #{item.productAttributeId,jdbcType=BIGINT})
        </foreach>
    </insert>
</mapper>
```



#### PmsProductCategoryDao

```java
/**
 * 商品分类自定义Dao
 */
public interface PmsProductCategoryDao {
    /**
     * 获取商品分类及其子分类
     */
    List<PmsProductCategoryWithChildrenItem> listWithChildren();
}
```



#### PmsProductCategoryDao.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.caq.mall.mapper.PmsProductCategoryDao">
    <resultMap id="listWithChildrenMap" type="com.caq.mall.dto.PmsProductCategoryWithChildrenItem"
               extends="com.caq.mall.mapper.PmsProductCategoryMapper.BaseResultMap">
        <collection property="children" resultMap="com.caq.mall.mapper.PmsProductCategoryMapper.BaseResultMap"
                    columnPrefix="child_"></collection>
    </resultMap>
    <select id="listWithChildren" resultMap="listWithChildrenMap">
        select
            c1.id,
            c1.name,
            c2.id   child_id,
            c2.name child_name
        from pms_product_category c1 left join pms_product_category c2 on c1.id = c2.parent_id
        where c1.parent_id = 0
    </select>
</mapper>
```





#### PmsProductAttributeValueDao

```java
/**
 * 商品参数/规格属性自定义Dao
 */
public interface PmsProductAttributeValueDao {
    /**
     * 批量创建
     */
    int insertList(@Param("list")List<PmsProductAttributeValue> productAttributeValueList);
}
```

#### PmsProductAttributeValueDao.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.caq.mall.mapper.PmsProductAttributeValueDao">
    <insert id="insertList">
        insert into pms_product_attribute_value (product_id,product_attribute_id,value) values
        <foreach collection="list" item="item" index="index" separator=",">
            (#{item.productId,jdbcType=BIGINT},
            #{item.productAttributeId,jdbcType=BIGINT},
            #{item.value,jdbcType=VARCHAR})
        </foreach>
    </insert>
</mapper>
```





### service

#### PmsProductCategoryService

```java
/**
 * 商品分类管理Service
 */
public interface PmsProductCategoryService {
    /**
     * 创建商品分类
     */
    @Transactional
    int create(PmsProductCategoryParam pmsProductCategoryParam);

    /**
     * 修改商品分类
     */
    @Transactional
    int update(Long id, PmsProductCategoryParam pmsProductCategoryParam);

    /**
     * 分页获取商品分类
     */
    List<PmsProductCategory> getList(Long parentId, Integer pageSize, Integer pageNum);

    /**
     * 删除商品分类
     */
    int delete(Long id);

    /**
     * 根据ID获取商品分类
     */
    PmsProductCategory getItem(Long id);

    /**
     * 批量修改导航状态
     */
    int updateNavStatus(List<Long> ids, Integer navStatus);

    /**
     * 批量修改显示状态
     */
    int updateShowStatus(List<Long> ids, Integer showStatus);

    /**
     * 以层级形式获取商品分类
     */
    List<PmsProductCategoryWithChildrenItem> listWithChildren();
}
```



### impl

#### PmsProductCategoryServiceImpl

```java
/**
 * 商品分类管理Service实现类
 */
@Service
public class PmsProductCategoryServiceImpl implements PmsProductCategoryService {
    @Autowired
    private PmsProductCategoryMapper productCategoryMapper;
    @Autowired
    private PmsProductMapper productMapper;
    @Autowired
    private PmsProductCategoryAttributeRelationDao productCategoryAttributeRelationDao;
    @Autowired
    private PmsProductCategoryAttributeRelationMapper productCategoryAttributeRelationMapper;
    @Autowired
    private PmsProductCategoryDao productCategoryDao;
    @Override
    public int create(PmsProductCategoryParam pmsProductCategoryParam) {
        PmsProductCategory productCategory = new PmsProductCategory();
        productCategory.setProductCount(0);
        BeanUtils.copyProperties(pmsProductCategoryParam, productCategory);
        //没有父分类时为一级分类
        setCategoryLevel(productCategory);
        int count = productCategoryMapper.insertSelective(productCategory);
        //创建筛选属性关联
        List<Long> productAttributeIdList = pmsProductCategoryParam.getProductAttributeIdList();
        if(!CollectionUtils.isEmpty(productAttributeIdList)){
            insertRelationList(productCategory.getId(), productAttributeIdList);
        }
        return count;
    }

    /**
     * 批量插入商品分类与筛选属性关系表
     * @param productCategoryId 商品分类id
     * @param productAttributeIdList 相关商品筛选属性id集合
     */
    private void insertRelationList(Long productCategoryId, List<Long> productAttributeIdList) {
        List<PmsProductCategoryAttributeRelation> relationList = new ArrayList<>();
        for (Long productAttrId : productAttributeIdList) {
            PmsProductCategoryAttributeRelation relation = new PmsProductCategoryAttributeRelation();
            relation.setProductAttributeId(productAttrId);
            relation.setProductCategoryId(productCategoryId);
            relationList.add(relation);
        }
        productCategoryAttributeRelationDao.insertList(relationList);
    }

    @Override
    public int update(Long id, PmsProductCategoryParam pmsProductCategoryParam) {
        PmsProductCategory productCategory = new PmsProductCategory();
        productCategory.setId(id);
        BeanUtils.copyProperties(pmsProductCategoryParam, productCategory);
        setCategoryLevel(productCategory);
        //更新商品分类时要更新商品中的名称
        PmsProduct product = new PmsProduct();
        product.setProductCategoryName(productCategory.getName());
        PmsProductExample example = new PmsProductExample();
        example.createCriteria().andProductCategoryIdEqualTo(id);
        productMapper.updateByExampleSelective(product,example);
        //同时更新筛选属性的信息
        if(!CollectionUtils.isEmpty(pmsProductCategoryParam.getProductAttributeIdList())){
            PmsProductCategoryAttributeRelationExample relationExample = new PmsProductCategoryAttributeRelationExample();
            relationExample.createCriteria().andProductCategoryIdEqualTo(id);
            productCategoryAttributeRelationMapper.deleteByExample(relationExample);
            insertRelationList(id,pmsProductCategoryParam.getProductAttributeIdList());
        }else{
            PmsProductCategoryAttributeRelationExample relationExample = new PmsProductCategoryAttributeRelationExample();
            relationExample.createCriteria().andProductCategoryIdEqualTo(id);
            productCategoryAttributeRelationMapper.deleteByExample(relationExample);
        }
        return productCategoryMapper.updateByPrimaryKeySelective(productCategory);
    }

    @Override
    public List<PmsProductCategory> getList(Long parentId, Integer pageSize, Integer pageNum) {
        PageHelper.startPage(pageNum, pageSize);
        PmsProductCategoryExample example = new PmsProductCategoryExample();
        example.setOrderByClause("sort desc");
        example.createCriteria().andParentIdEqualTo(parentId);
        return productCategoryMapper.selectByExample(example);
    }

    @Override
    public int delete(Long id) {
        return productCategoryMapper.deleteByPrimaryKey(id);
    }

    @Override
    public PmsProductCategory getItem(Long id) {
        return productCategoryMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateNavStatus(List<Long> ids, Integer navStatus) {
        PmsProductCategory productCategory = new PmsProductCategory();
        productCategory.setNavStatus(navStatus);
        PmsProductCategoryExample example = new PmsProductCategoryExample();
        example.createCriteria().andIdIn(ids);
        return productCategoryMapper.updateByExampleSelective(productCategory, example);
    }

    @Override
    public int updateShowStatus(List<Long> ids, Integer showStatus) {
        PmsProductCategory productCategory = new PmsProductCategory();
        productCategory.setShowStatus(showStatus);
        PmsProductCategoryExample example = new PmsProductCategoryExample();
        example.createCriteria().andIdIn(ids);
        return productCategoryMapper.updateByExampleSelective(productCategory, example);
    }

    @Override
    public List<PmsProductCategoryWithChildrenItem> listWithChildren() {
        return productCategoryDao.listWithChildren();
    }

    /**
     * 根据分类的parentId设置分类的level
     */
    private void setCategoryLevel(PmsProductCategory productCategory) {
        //没有父分类时为一级分类
        if (productCategory.getParentId() == 0) {
            productCategory.setLevel(0);
        } else {
            //有父分类时选择根据父分类level设置
            PmsProductCategory parentCategory = productCategoryMapper.selectByPrimaryKey(productCategory.getParentId());
            if (parentCategory != null) {
                productCategory.setLevel(parentCategory.getLevel() + 1);
            } else {
                productCategory.setLevel(0);
            }
        }
    }
}
```



### controller

#### PmsProductCategoryController

```java
/**
 * 商品分类管理Controller
 */
@RestController
@Api(tags = "PmsProductCategoryController", description = "商品分类管理")
@RequestMapping("/productCategory")
public class PmsProductCategoryController {
    @Autowired
    private PmsProductCategoryService productCategoryService;

    @ApiOperation("添加商品分类")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public CommonResult create(@Validated @RequestBody PmsProductCategoryParam productCategoryParam) {
        int count = productCategoryService.create(productCategoryParam);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("修改商品分类")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public CommonResult update(@PathVariable Long id,
                         @Validated
                         @RequestBody PmsProductCategoryParam productCategoryParam) {
        int count = productCategoryService.update(id, productCategoryParam);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("分页查询商品分类")
    @RequestMapping(value = "/list/{parentId}", method = RequestMethod.GET)
    public CommonResult<CommonPage<PmsProductCategory>> getList(@PathVariable Long parentId,
                                                                @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize,
                                                                @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum) {
        List<PmsProductCategory> productCategoryList = productCategoryService.getList(parentId, pageSize, pageNum);
        return CommonResult.success(CommonPage.restPage(productCategoryList));
    }

    @ApiOperation("根据id获取商品分类")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public CommonResult<PmsProductCategory> getItem(@PathVariable Long id) {
        PmsProductCategory productCategory = productCategoryService.getItem(id);
        return CommonResult.success(productCategory);
    }

    @ApiOperation("删除商品分类")
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public CommonResult delete(@PathVariable Long id) {
        int count = productCategoryService.delete(id);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("修改导航栏显示状态")
    @RequestMapping(value = "/update/navStatus", method = RequestMethod.POST)
    public CommonResult updateNavStatus(@RequestParam("ids") List<Long> ids, @RequestParam("navStatus") Integer navStatus) {
        int count = productCategoryService.updateNavStatus(ids, navStatus);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("修改显示状态")
    @RequestMapping(value = "/update/showStatus", method = RequestMethod.POST)
    public CommonResult updateShowStatus(@RequestParam("ids") List<Long> ids, @RequestParam("showStatus") Integer showStatus) {
        int count = productCategoryService.updateShowStatus(ids, showStatus);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    @ApiOperation("查询所有一级分类及子分类")
    @RequestMapping(value = "/list/withChildren", method = RequestMethod.GET)
    public CommonResult<List<PmsProductCategoryWithChildrenItem>> listWithChildren() {
        List<PmsProductCategoryWithChildrenItem> list = productCategoryService.listWithChildren();
        return CommonResult.success(list);
    }
}

```



### swagger

![image-20220629130638220](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220629130638220.png)









## 商品列表接口

### 简要分析

![image-20220629173949481](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220629173949481.png)



![image-20220629173820575](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220629173820575.png)





### 查询所有商品

> 默认情况是查询所有，当选择条件查询的时候会加上选择的条件重新查询

```java
@Override
public List<PmsProduct> list(PmsProductQueryParam productQueryParam, Integer pageSize, Integer pageNum) {
    PageHelper.startPage(pageNum, pageSize);
    PmsProductExample productExample = new PmsProductExample();
    PmsProductExample.Criteria criteria = productExample.createCriteria();
    criteria.andDeleteStatusEqualTo(0);
    if (productQueryParam.getPublishStatus() != null) {
        criteria.andPublishStatusEqualTo(productQueryParam.getPublishStatus());
    }
    if (productQueryParam.getVerifyStatus() != null) {
        criteria.andVerifyStatusEqualTo(productQueryParam.getVerifyStatus());
    }
    if (!StringUtils.isEmpty(productQueryParam.getKeyword())) {
        criteria.andNameLike("%" + productQueryParam.getKeyword() + "%");
    }
    if (!StringUtils.isEmpty(productQueryParam.getProductSn())) {
        criteria.andProductSnEqualTo(productQueryParam.getProductSn());
    }
    if (productQueryParam.getBrandId() != null) {
        criteria.andBrandIdEqualTo(productQueryParam.getBrandId());
    }
    if (productQueryParam.getProductCategoryId() != null) {
        criteria.andProductCategoryIdEqualTo(productQueryParam.getProductCategoryId());
    }
    return productMapper.selectByExample(productExample);
}
```







### 单个商品信息查询

**PmsProductDao.xml**

> 多表联查，目的是查询产品相关的所有信息

![image-20220617215707289](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220617215707289.png)



## 部署

### admin

```
docker run -p 8912:8080 --name mall-admin --link mysql:db -v /etc/localtime:/etc/localtime -v /mydata/app/admin/logs:/var/logs -d mall/mall-admin:1.0-SNAPSHOT
```



### mysql

```bash
docker run -p 3306:3306 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root  \
-d mysql:5.7
```



### nginx

```bash
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx  \
-v /mydata/nginx/conf:/etc/nginx \
-d nginx:1.22
```

## 文章推荐

### 枚举类

[枚举类的使用方法_青鸟88的博客-CSDN博客_枚举](https://blog.csdn.net/weixin_43610698/article/details/90737759)



### 泛型

[Java 泛型 | 菜鸟教程 (runoob.com)](https://www.runoob.com/java/java-generics.html)



### 断言

[spring的断言工具类Assert的基本使用 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/109455623)



### SQL练习

[自学SQL网(教程 视频 练习全套) (xuesql.cn)](http://xuesql.cn/)







