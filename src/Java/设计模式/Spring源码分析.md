---
title: Spring源码
---
## 核心注解

| 注解             | 功能                                                         |
| ---------------- | ------------------------------------------------------------ |
| @Bean            | 容器中注册组件                                               |
| @Primary         | 同类组件如果有多个，标注主组件                               |
| @DependsOn       | 组件之间声明依赖关系                                         |
| @Lazy            | 组件懒加载                                                   |
| @Scope           | 声明组件的作用范围（SCOPE_PROTOTYPE,SCOPE_SINGLETON）        |
| @Configuration   | 声明这是一个配置类，可以替换以前配置文件                     |
| @Component       | @Controller、@Service、@Repository，被标注的类会被加入到Spring容器中 |
| @Indexed         | 加速注解，所有标注了@Indexed的组件，直接会                   |
| @Order           | 数字越小优先级越高，越先工作                                 |
| @componentScan   | 包扫描                                                       |
| @Conditional     | 条件注入                                                     |
| @Import          | 导入第三方jar包中的组件，或定制批量导入组件逻辑              |
| @ImportResource  | 导入以前的XML配置文件，让其生效                              |
| @Profile         | 基于多环境激活                                               |
| @PropertySource  | 外部properties配置文件和JavaBean进行绑定，结合ConfigurationProperties |
| @PropertySources | @PropertySource组合注解                                      |
| @Autowired       | 自动装配                                                     |
| @Qualifier       | 精确指定                                                     |
| @Value           | 取值、计算机环境变量、JVM系统。xxxx。@Value(“${xx}”)         |
| @Lookup          | 单例组件依赖非单例组件，非单例组件获取需要使用方法           |

## 整体架构







## 源码解析
