---
title: Elasticsearch
---
## 概述

### Elasticsearch是什么？

它是一个分布式的、RESTful风格的数据分析引擎

网上很火的ELK其实就是Elasticsearch+Kibana（也称为 ELK Stack）,前者是数据进行搜索、分析后者对数据进行可视化。它的扩展性很好，可以扩展到上百台服务器，处理PB 级别的数据。

> **1PB=1024TB**

[Elasticsearch：官方分布式搜索和分析引擎 | Elastic](https://www.elastic.co/cn/elasticsearch/)

更详细特点官网查看



### 安装

> 这里装的版本为7.8.0

安装没什么说的，下载安装包，运行即可

这里学习使用为了方便使用windows客户端版本

访问测试：`http://localhost:9200`

**出现如下页面既安装成功!**

![image-20220529181124580](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529181124580.png)



## 入门

### RESTful

**URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作。**

推荐文章里有更详细的解释，有兴趣的话可以研究一下。



### 数据格式

Elasticsearch 是面向文档型数据库，一条数据在这里就是一个文档。

Elasticsearch与mysql的类比：

![image-20220529231109466](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529231109466.png)



### HTTP操作

#### 索引操作

##### 创建索引

> put请求
>
> es地址+索引名称

对比关系型数据库，创建索引就等同于创建数据库

![image-20220529182454009](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529182454009.png)

```json
{

    "acknowledged"【响应结果】: true, ## true 操作成功

    "shards_acknowledged"【分片结果】: true, ## 分片操作成功

    "index"【索引名称】: "shopping"

}
```





##### 查询所有索引

> get请求
>
> `http://127.0.0.1:9200/_cat/indices?v`
>
> es地址+_cat关键字+indices+?+v

![image-20220529183055481](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529183055481.png)

![image-20220529231638745](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529231638745.png)



##### 查询单个索引

> get请求
>
> es地址+索引名称

![image-20220529231931746](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529231931746.png)





##### 删除索引

> delete请求
>
> es地址+索引名称

![image-20220529183004885](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529183004885.png)



再次查看时，发现索引已被删除

![image-20220529232052926](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529232052926.png)







#### 文档操作

> 这里的文档可以类比为关系型数据库中的表数据，添加的数据格式为 JSON 格式

##### 创建文档

> post请求
>
> es地址+索引名称+_doc关键字

![image-20220529184811686](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529184811686.png)



**当重复添加的时候发现id是随机生成的**

> 由于没有指定数据唯一性标识（ID），默认情况下，ES 服务器会随机生成一个

![image-20220529184924913](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529184924913.png)

从返回数据的id字段可知，每次返回的数据都是不一样的，所以可以知道post请求不是幂等性的



那么想要自定义唯一性标识的话，需要在创建的时候指定

`http://127.0.0.1:9200/shopping/phone/1`

![image-20220529232547417](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220529232547417.png)



##### 查看文档

==主键查询==

> get请求
>
> es地址+索引名称+文档名称+主键id

查文档时，需要指定文档的唯一性标识。这一点和mysql中数据的主键查询很像

![image-20220530103803396](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530103803396.png)



如果输入一个不存在的id

则found会返回false，找不到

![image-20220530103926761](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530103926761.png)



==全查询==

> es地址+索引名称+_search关键字

![image-20220530104149685](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530104149685.png)



##### 修改文档

==全覆盖==

> 这里是全覆盖，满足幂等性，可以用put来请求
>
> _doc是对文档的操作，1是主键id
>
> es地址+索引名称+_doc+文档id

![image-20220530104334808](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530104334808.png)





##### 修改字段

> 修改文档中的title字段为iphone
> http://127.0.0.1:9200/shopping/_update/1地址中的_update意思是更新索引，1是主键
>
> 局部更新使用post请求
>
> es地址+索引名称+_update+文档id

![image-20220530104614708](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530104614708.png)



再次查询测试

![image-20220530104953956](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530104953956.png)



##### 删除文档

> 删除使用http中的delete请求来实现
>
> 不可重复删除
>
> es地址+索引名称+_doc+文档id

![image-20220530105230590](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530105230590.png)



ES中最主要的还是查询，以上为文档的CRUD

下面来写关键的条件查询



##### 条件查询

> `http://127.0.0.1:9200/shopping/_search?q=category:华为`
>
> get请求
>
> es地址+索引名称+_search+?q=字段名称

这里的q是query的意思 ，后面跟具体的条件

![image-20220530110127016](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530110127016.png)



一般不在路径里传参数，中文容易出现乱码。所以在请求体中传入参数即可

![image-20220530111146331](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530111146331.png)



==全查询==

> es地址+索引名称+_search
>
> 查询的参数不在地址栏写，而是写到请求体中（json格式）
>
> 关键字“query”代表查询
>
> 关键字”match_all“代表查询所有
>
> 可嵌套

![image-20220530111330300](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530111330300.png)



##### 分页查询

> es地址+索引名称+_search，
>
> 查询的参数不在地址栏写，而是写到请求体中（json格式），
>
> 关键字“query”代表查询，
>
> 关键字”match_all“代表查询所有，
>
> 关键字“from”代表当前页
>
> 关键字”size“代表分几页查询

![image-20220530121618944](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530121618944.png)





##### 查询排序

> es地址+索引名称+_search，
>
> 查询的参数不在地址栏写，而是写到请求体中（json格式），
>
> 关键字“query”代表查询，
>
> 关键字”match_all“代表查询所有，
>
> 关键字“from”代表当前页，
>
> 关键字”size“代表分几页查询，
>
> 关键字“sort”代表排序，里面嵌套排序条件，使用文档字段
>
> 例如对文档中价格进行降序
>
> “price”:{"order:desc"}

![image-20220530123121749](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530123121749.png)



##### 多条件查询

> es地址+索引名称+_search，
>
> 查询的参数不在地址栏写，而是写到请求体中（json格式），
>
> 关键字“query”代表查询，
>
> 关键字”bool“代表多条件查询，
>
> 关键字“should”里面写匹配条件，**数组的形式**，
>
> 关键字“match”代表匹配关键字，
>
> match里面写匹配的字段名称

这里的查询类似与mysql中的and（与）

==must==

![image-20220530171735304](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530171735304.png)



==should==

这里的查询类似与mysql中的or（或）

![image-20220530172021094](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530172021094.png)



##### 范围查询

> es地址+索引名称+_search，
>
> 查询的参数不在地址栏写，而是写到请求体中（json格式），
>
> 关键字“query”代表查询，
>
> 关键字”bool“代表多条件查询，
>
> 关键字“should”里面写匹配条件，**数组的形式**，
>
> 关键字“match”代表匹配关键字，
>
> match里面写匹配的字段名称，
>
> 关键字“filter”写范围匹配条件，
>
> 关键字“range”代表范围匹配关键字，
>
> 里面写范围匹配的字段及范围

![image-20220530172259827](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530172259827.png)



##### 全文检索

正向索引：由关键字找文档

反向索引（倒排索引）：由关键字找文档，倒排索引一般由两部分组成，单词词典和倒排文件

==单词词典==**是文档集合中出现过的所有单词构成的字符串集合，单词词典中的索引记载着单词本身的信息和指向倒排列表的指针**

==倒排列表==：**它是记录了所有出现过某个单词的所有文档的文档列表，每一个记录就称为是一个倒排项**

==倒排文件==：倒排列表的一个集合，它是一个物理文件

![image-20220530182921778](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530182921778.png)



> 这里写的是一个词，
> 但其实底层匹配的时候，会将他们拆解开一个一个的匹配，
> 也就是小和华都会进行全文检索，
> 这是es的机制

![image-20220530190200664](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530190200664.png)











##### 完全匹配

> es地址+索引名称+_search，
>
> 查询的参数不在地址栏写，而是写到请求体中（json格式），
>
> 关键字“query”代表查询，
>
> 使用关键字match_phrase

![image-20220530222840066](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530222840066.png)





##### 高亮查询

> es地址+索引名称+_search，
>
> 查询的参数不在地址栏写，而是写到请求体中（json格式），
>
> 关键字“highlight”代表高亮查询，
>
> 里面嵌套“fields”关键字指定高亮的字段

![image-20220530223344501](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220530223344501.png)



##### 聚合查询

> es地址+索引名称+_search，
>
> 查询的参数不在地址栏写，而是写到请求体中（json格式），
>
> 关键字“price_group”代表聚合查询的名字，
>
> 里面嵌套“terms”关键字指定分组查询
>
> size关键字代表不显示查询结果条目，只显示聚合查询结果

![image-20220531192610219](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531192610219.png)



> 关键字“price_avg”代表聚合查询的名字，
>
> 里面嵌套“avg”关键字指定求平均值

![image-20220531192724444](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531192724444.png)



#### 映射操作

> 有了前面写的索引库，就相当于有了数据库中的database
>
> 接下来就需要来建立**索引库**中的映射关系了，类似于数据库中的表 的结构。创建数据库需要设置字段的name，类型，长度，约束啊等等；索引库同样也是需要的，需要知道这个类型下有那些字段那些约束信息，这就叫映射（mapping）



##### 创建映射

> put请求
>
> es地址+索引名称+_mapping，
>
> 关键字“properties”代表设置属性，
>
> 里面嵌套字段的类型如全搜索还是模糊搜索



==这里我们在创建一个索引student来进行测试==

![image-20220531223535890](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531223535890.png)



创建映射

![image-20220531223731011](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531223731011.png)



创建文档，增加内容

![image-20220531224018155](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531224018155.png)



##### 查看映射

> get请求
>
> es地址+索引名称+_mapping，
>
> 不带请求体也可以

![image-20220531224654972](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531224654972.png)





##### 索引映射关联

> 这里主要测试关联后的效果

![image-20220531224236655](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531224236655.png)



![image-20220531224415958](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531224415958.png)



![image-20220531224533856](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531224533856.png)





### JavaAPI

> 通过java操作es

#### 索引操作

##### 创建索引

1、建模块，改pom

```xml
<dependencies>
    <dependency>
        <groupId>org.elasticsearch</groupId>
        <artifactId>elasticsearch</artifactId>
        <version>7.8.0</version>
    </dependency>
    <!-- elasticsearch的客户端 -->
    <dependency>
        <groupId>org.elasticsearch.client</groupId>
        <artifactId>elasticsearch-rest-high-level-client</artifactId>
        <version>7.8.0</version>
    </dependency>
    <!-- elasticsearch依赖2.x的log4j -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>2.8.2</version>
    </dependency>
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.8.2</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.9.9</version>
    </dependency>
    <!-- junit单元测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency>
</dependencies>

```



2、创建客户端对象

```java
public class ESTest_Index_Create {
    public static void main(String[] args) throws Exception {

        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

//        创建索引
        CreateIndexRequest request = new CreateIndexRequest("user");
        //设置esClient请求方式
        CreateIndexResponse createIndexResponse =
                esClient.indices().create(request, RequestOptions.DEFAULT);

//        响应状态
        boolean acknowledged = createIndexResponse.isAcknowledged();
        System.out.println("索引操作："+acknowledged);

        esClient.close();
    }
}
```



通过java创建索引成功

![image-20220531231557625](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531231557625.png)



##### 查询索引

> 如图，我们使用测试工具查询的时候也会获得alias，mapping，settings。使用java的api自然也可以获得

![image-20220531232046012](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531232046012.png)





![image-20220531232259414](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531232259414.png)





##### 删除索引

> 同上，这里使用DeleteIndexRequest对象

![image-20220602113055475](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602113055475.png)



#### 文档操作

##### 创建文档

> 通过创建user对象的形式传递文档内容
>
> 这里将java的对象转换为json，这里用特殊的类ObjectMapper的writeValueAsString方法进行转换

![image-20220531233652567](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531233652567.png)



##### 修改文档

![image-20220531234542334](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220531234542334.png)



##### 查询文档

> 查询文档用的对象是GetRequest对象

![image-20220602113724703](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602113724703.png)





##### 删除文档

> 删除文档用的对象是DeleteRequest
>
> 还是很好理解的，跟着视频把代码敲一遍就能理解

![image-20220602113956793](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602113956793.png)



**再次查询就会发现，已经查不到user文档了**

![image-20220602114106424](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602114106424.png)





##### 批量创建

> bulk
>
> 主体，大部分；庞大的身躯，肥硕的体形；（巨大的）容积，体积
>
> adj. 大批的，大宗的

![image-20220602114849084](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602114849084.png)



##### 批量删除

> 同上
>
> 删除对象是DeleteRequest

![image-20220602115543496](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602115543496.png)



#### 高级查询

##### 查询所有文档

先创建多个文档

```java
public class ESTest_Doc_Delete_Batch {
    public static void main(String[] args) throws Exception {

        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

//        批量插入数据
        BulkRequest request = new BulkRequest();

        request.add(new DeleteRequest().index("user").id("1001"));
        request.add(new DeleteRequest().index("user").id("1002"));
        request.add(new DeleteRequest().index("user").id("1003"));

        BulkResponse responses = esClient.bulk(request, RequestOptions.DEFAULT);
        System.out.println(responses.getTook());
        System.out.println(responses.getItems());

        esClient.close();
    }
}
```



> 构建条件查询的对象为SearchSourceBuilder
>
> 演示的查询为全查询

![image-20220602161320872](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602161320872.png)





##### 匹配查询

![image-20220602161607846](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602161607846.png)



##### 分页查询

![image-20220602161848879](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602161848879.png)



##### 排序查询

```java
public class ESTest_Doc_Query {
    public static void main(String[] args) throws Exception {

        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

//      排序查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        //分页查询   termQuery
        SearchSourceBuilder builder = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());

        //指定排序的字段，并设置升序降序
        builder.sort("age", SortOrder.ASC);

        request.source(builder);

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getTotalHits());
        System.out.println(response.getTook());

        hits.forEach(x-> System.out.println(x.getSourceAsString()));

        esClient.close();
    }
}

5 hits
36ms
{"name":"zs","age":30,"sex":"男"}
{"name":"ls","age":40,"sex":"男"}
{"name":"ww","age":50,"sex":"男"}
{"name":"ww1","age":60,"sex":"女"}
{"name":"ww2","age":70,"sex":"女"}
```





##### 过滤查询

![image-20220602162806659](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602162806659.png)





##### 组合查询

```java
public class ESTest_Doc_Query {
    public static void main(String[] args) throws Exception {

        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

//      组合查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder builder = new SearchSourceBuilder();
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();

        boolQueryBuilder.must(QueryBuilders.matchQuery("age",30));
        boolQueryBuilder.must(QueryBuilders.matchQuery("sex","男"));
//        boolQueryBuilder.mustNot(QueryBuilders.matchQuery("sex","男"));
        builder.query(boolQueryBuilder);

        request.source(builder);
        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getTotalHits());
        System.out.println(response.getTook());

        hits.forEach(x-> System.out.println(x.getSourceAsString()));

        esClient.close();
    }
}
```



> 每行代码解释都放这张图了，下面其实也都是类似，不在详细写

![image-20220602163726001](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602163726001.png)



##### 范围查询

> 范围查询对象RangeQuery

![image-20220602165414540](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602165414540.png)



##### 模糊查询

```java
SearchRequest request = new SearchRequest();
request.indices("user");

SearchSourceBuilder builder = new SearchSourceBuilder();
builder.query(QueryBuilders.fuzzyQuery("name","ww").fuzziness(Fuzziness.ONE));

request.source(builder);
SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

SearchHits hits = response.getHits();
System.out.println(hits.getTotalHits());
System.out.println(response.getTook());
hits.forEach(x-> System.out.println(x.getSourceAsString()));
```

![image-20220602170456168](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602170456168.png)



##### 高亮查询

![image-20220602171248680](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602171248680.png)





##### 聚合查询

==最大值查询==

```java
SearchRequest request = new SearchRequest();
request.indices("user");

SearchSourceBuilder builder = new SearchSourceBuilder();
MaxAggregationBuilder aggregationBuilder = AggregationBuilders.max("maxAge").field("age");

builder.aggregation(aggregationBuilder);

request.source(builder);
SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

SearchHits hits = response.getHits();
System.out.println(hits.getTotalHits());
System.out.println(response.getTook());
hits.forEach(x-> System.out.println(x.getSourceAsString()));

esClient.close();
```



## 环境

### Linux版ES安装

[Elasticsearch - 尚硅谷（5. Elasticsearch 环境）学习笔记_yuan_404的博客-CSDN博客_尚硅谷elasticsearch笔记](https://blog.csdn.net/weixin_44449838/article/details/116480032)

其中一个容易出错的点，在bug纪录里有解决方案





### ES集群

和正常安装es一样，在多台虚拟机上安装es

重要的是对配置文件进行修改进行分发文件

```yml
## 加入如下配置
##集群名称
cluster.name: cluster-es
##节点名称，每个节点的名称不能重复
node.name: node-1
##ip 地址，每个节点的地址不能重复
network.host: linux1
##是不是有资格主节点
node.master: true
node.data: true
http.port: 9200
## head 插件需要这打开这两个配置
http.cors.allow-origin: "*"
http.cors.enabled: true
http.max_content_length: 200mb
##es7.x 之后新增的配置，初始化一个新的集群时需要此配置来选举 master
cluster.initial_master_nodes: ["node-1"]
##es7.x 之后新增的配置，节点发现
discovery.seed_hosts: ["节点一IP:ES端口","节点二IP:ES端口","节点三IP:ES端口"]
gateway.recover_after_nodes: 2
network.tcp.keep_alive: true
network.tcp.no_delay: true
transport.tcp.compress: true
##集群内同时启动的数据任务个数，默认是 2 个
cluster.routing.allocation.cluster_concurrent_rebalance: 16
##添加或删除节点及负载均衡时并发恢复的线程个数，默认 4 个
cluster.routing.allocation.node_concurrent_recoveries: 16
##初始化数据恢复时，并发恢复线程的个数，默认 4 个
cluster.routing.allocation.node_initial_primaries_recoveries: 16
```



## 进阶

### Kibana

Kibana是一款Elasticsearch的数据软件

- 下载地址：https://artifacts.elastic.co/downloads/kibana/kibana-7.8.0-windows-x86_64.zip



```yml
## 默认端口
server.port: 5601
## ES 服务器的地址
elasticsearch.hosts: ["http://localhost:9200"]
## 索引名
kibana.index: ".kibana"
## 支持中文
i18n.locale: "zh-CN"
```



修改完配置文件，启动bat文件即可运行**kibana**



## 优秀文章推荐

[[(10 封私信 / 40 条消息) 怎样用通俗的语言解释REST，以及RESTful？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/28557115)](https://www.jianshu.com/p/350122cf63f2)



[URI、 URL 和 URN 的区别 - 简书 (jianshu.com)](https://www.jianshu.com/p/09ac6fc0f8cb)



[信息检索——简单易懂的倒排索引（原理+例子）_土豆同学的博客-CSDN博客_倒排索引](https://blog.csdn.net/qq_43403025/article/details/114779166)



[Elasticsearch - 尚硅谷（5. Elasticsearch 环境）学习笔记_yuan_404的博客-CSDN博客_尚硅谷elasticsearch笔记](https://blog.csdn.net/weixin_44449838/article/details/116480032)



## Bug纪录

### elasticsearch 运行问题（一）—— exception 'path data'

![image-20220602223434991](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602223434991.png)



**测试**

![image-20220602223547048](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220602223547048.png)























