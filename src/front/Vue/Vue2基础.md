---
title: Vue2基础
---
## 一、前端工程化

![image-20221115083618555](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115083618555.png)

JS的复用就是模块化

UI样式复用就是组件化(LayUI里面的都是组件化)

所以说前端工程化就是有规范的写,不能你一个样式我一个样式,不够统一不够专业!





## 二、WebPack

### 是什么

![image-20221115084730331](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115084730331.png)

**前端工程化的具体实现方案**

### 基本使用

#### 实现奇偶行变色

##### 1.初始化包管理工具

通过npm init -y生成

![image-20221115085243047](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115085243047.png)

##### 2.安装jquery

-S的意思是--save

```
npm install jquery -S
```

##### 3.在项目中安装webpack

-D就是把包放到devDependencies下,打包运行的时候不会被打包

-D为--save-dev简写

```
npm install webpack@5.42.1 webpack-cli@4.7.2 -D 
```

![image-20221115095016557](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115095016557.png)

##### 4.在项目中配置webpack

在项目根目录中，创建名为 webpack.config.js 的 webpack 配置文件，并初始化如下的基本配置：

```
module.exports = {
    mode: 'development'
};
```

在 package.json 的 scripts 节点下，新增 dev 脚本如下：

![image-20221115102840682](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115102840682.png)

> tips:webpack要和src同目录

![image-20221115102745568](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115102745568.png)

##### 5.运行代码

通过npm run dev运行

**这里的webpack将用jQuery写的操作和一些新的写法转换成了能被浏览器兼容的js文件(dist下的main.js)**

![image-20221115103323407](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115103323407.png)

实现效果如下:

![image-20221115104323386](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115104323386.png)

#### mode 的可选值

##### development

开发环境

不会对打包生成的文件进行代码压缩和性能优化

打包速度快，适合在开发阶段使用

##### production

生产环境

会对打包生成的文件进行代码压缩和性能优化

打包速度很慢，仅适合在项目发布阶段使用

![image-20221115104043506](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115104043506.png)



#### webpack.config.js 文件的作用

webpack.config.js 是 webpack 的配置文件。

**webpack 在真正开始打包构建之前，会先读取这个配置文件**， 从而基于给定的配置，对项目进行打包。 

**注意：由于 webpack 是基于 node.js 开发出来的打包工具**，因此在它的配置文件中，支持使用 node.js 相关 的语法和模块进行 webpack 的个性化配置。

##### webpack 中的默认约定

在 webpack 4.x 和 5.x 的版本中，有如下的默认约定：

 ① 默认的打包入口文件为 src -> index.js

 ② 默认的输出文件路径为 dist -> main.js 

注意：可以在 webpack.config.js 中修改打包的默认约定

##### 自定义打包的入口与出口

在 webpack.config.js 配置文件中，通过 entry 节点指定打包的入口。通过 output 节点指定打包的出口。

示例代码如下：

```js
const path = require('path')//导入node.js中专门操作路径的模块

module.exports = {
    mode: 'production',
    entry: path.join(__dirname,'./src/index.js'),//打包的入口文件
    output: {
        path: path.join(__dirname,'./dist'),//存放路径
        filename: "nice.js"//输入的文件名
    }
};
```

![image-20221115105746224](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115105746224.png)

### webpack中的插件

#### webpack 插件的作用

通过安装和配置第三方的插件，可以拓展 webpack 的能力，从而让 webpack 用起来更方便。最常用的webpack 插件有如下两个：

**① webpack-dev-server**

类似于 node.js 阶段用到的 nodemon 工具(修改代码自动重新打包和构建)

**每当修改了源代码，webpack 会自动进行项目的打包和构建(最常用)**

**② html-webpack-plugin**

webpack 中的 HTML 插件（类似于一个模板引擎插件）

可以通过此插件自定制 index.html 页面的内容



安装之后我们还不能直接访问,因为**打包生成的文件存放到了内存中**

#### 生成到内存中的文件该如何访问？

**webpack-dev-server 生成到内存中的文件，默认放到了项目的根目录中，而且是虚拟的、不可见的。**

可以直接用 / 表示项目根目录，后面跟上要访问的文件名称，即可访问内存中的文件

例如 /bundle.js 就表示要访问 webpack-dev-server 生成到内存中的 bundle.js 文件

**所以我们只有把index页面放到根目录它才能和bundle.js联合使用,才能实现实时更新**

怎么实现呢?拷贝过去一份不就行了!我们用下面的方法来实现

#### html-webpack-plugin

html-webpack-plugin 是 webpack 中的 HTML 插件，可以通过此插件自定制 index.html 页面的内容。 

**需求：通过 html-webpack-plugin 插件，将 src 目录下的 index.html 首页，复制到项目根目录中一份！**

> 安装

npm install html-webpack-plugin@5.3.2 -D

> 配置

```
const path = require('path')//导入node.js中专门操作路径的模块
const HtmlPlugin = require('html-webpack-plugin')

// 创建html插件的实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html',//源文件存放路径
    filename: './index.html'//生成的文件存放路径
})

module.exports = {
    mode: 'development',
    plugins: [htmlPlugin]//通过plugins节点,使htmlPlugin插件生效
};
```

> 总结

- 通过 HTML 插件复制到项目根目录中的 index.html 页面，也被放到了内存中 
- HTML 插件在生成的 index.html 页面，自动注入了打包的 bundle.js 文件

#### devServer 节点

在 webpack.config.js 配置文件中，可以通过 devServer 节点对 webpack-dev-server 插件进行更多的配置， 示例代码如下：

```js
module.exports = {
    mode: 'development',
    plugins: [htmlPlugin],//通过plugins节点,使htmlPlugin插件生效
    devServer: {
        open: true,
        // host: '',
        port: 80
    }
};
```

mac中要加sudo才能监听

![](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115114204001.png)

### webpack 中的 loader

#### loader 概述

在实际开发过程中，webpack 默认只能打包处理以 .js 后缀名结尾的模块。其他非 .js 后缀名结尾的模块， webpack 默认处理不了，**需要调用 loader 加载器才可以正常打包**，否则会报错！

loader 加载器的作用：**协助 webpack 打包处理特定的文件模块**。比如：

- css-loader 可以打包处理 .css 相关的文件 
- less-loader 可以打包处理 .less 相关的文件
- babel-loader 可以打包处理 webpack 无法处理的高级 JS 语法

![image-20221115142755075](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115142755075.png)

####  loader 的调用过程

![image-20221115141421952](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115141421952.png)

#### 打包处理 css 文件

- 运行 npm i style-loader@3.0.0 css-loader@5.2.6 -D 命令，安装处理 css 文件的 loader

- 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

```js
module: {
  rules: [
    {
      test: /\.css$/, use: ['style-loader', 'css-loader']
    }
  ]
}
```

![image-20221115143446870](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115143446870.png)

#### 打包处理 less 文件

less文件可以让CSS写的更简单,这里是让无序列表的间隙消失

```less
html,
body,
ul{
  margin: 0;
  padding: 0;
  li{
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
  }
}
```

之后在index.js文件中引入改less文件即可



如果不设置less文件加载器,也会报错.所以运行 npm i less-loader@10.0.1 less@4.1.1 -D 命令

在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

```js
module: {
    rules: [
        {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
    ]
}
```

效果不放了因为太刺眼了

### 打包发布

通过前面的学习我们也能知道,你输入npm run dev 的时候它就会生成一个dist目录,这个dist目录其实就是打包好的,可以直接点index文件去访问的

现在项目要上线了,我们要减少dist文件的体积,其实就是运行npm run 生产环境的配置



在package.json配置一下:

```json
"scripts": {
  "dev": "webpack serve",
  "build": "webpack --mode production"
},
```

![image-20221115155918186](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115155918186.png)

运行程序:

**npm run build**

### 总结

webpack了解概念即可,后面使用脚手架这东西都是配置好的

- 运行程序npm run dev
- 发布程序npm run build

如果不是这个两个命令,那就去看它的package咋写的替换run 后面的单词即可



## 三、Vue基础入门

### Vue简介

#### 什么是Vue

构建用户界面的框架

- 构建用户界面

用 vue 往 html 页面中填充数据，非常的方便

- 框架

框架是一套现成的解决方案，程序员只能遵守框架的规范，去编写自己的业务功能！

要学习 vue，就是在学习 vue 框架中规定的用法！

vue 的指令、组件（是对 UI 结构的复用）、路由、Vuex、vue 组件库

#### Vue 的两个特性

数据驱动视图：

+ 数据的变化**会驱动视图**自动更新
+ 好处：程序员只管把数据维护好，那么页面结构会被 vue 自动渲染出来！

![image-20221115161034333](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115161034333.png)

双向数据绑定：

> 在网页中，form 表单负责**采集数据**，Ajax 负责**提交数据**。

+ js 数据的变化，会被自动渲染到页面上
+ 页面上表单采集的数据发生变化的时候，会被 vue 自动获取到，并更新到 js 数据中

> 注意：数据驱动视图和双向数据绑定的底层原理是 MVVM（Mode 数据源、View 视图、ViewModel 就是 vue 的实例）

![image-20221115161236461](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115161236461.png)

##### MVVM的原理

![image-20221115161907387](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115161907387.png)



![image-20221115164735079](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115164735079.png)

##### 总结

课件其实已经总结的很好了,**MVVM最重要的就是VUE的实例VM(ViewModel)**

- 它监听DOM的变化,当表单中的值发生变化时,VM会把数据同步到Model源中
- 它监听Model的变化,当Model发生变化时,它会把最新数据同步到View里

### Vue的基本使用

#### Vue的基本使用步骤

- 导入vue.js文件
- 在页面声明一个将要被vue所控制的DOM区域
- 创建vm实例

```vue
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <div id="app">{{username}}</div>

    <script src="./lib/vue-2.6.12.js"></script>

    <script>
      const vm = new Vue({
        el: "##app",
        data: {
          username: "zs",
        },
      });
    </script>
  </body>
</html>

```

#### 基本代码与 MVVM 的对应关系

![image-20221115173712799](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115173712799.png)

### Vue指令

#### 内容渲染指令

1. `v-text` 指令的缺点：会覆盖元素内部原有的内容！
2. `{{ }}` 插值表达式：在实际开发中用的最多，只是内容的占位符，不会覆盖原有的内容！
3. `v-html` 指令的作用：可以把带有标签的字符串，渲染成真正的 HTML 内容！

 

#### 属性绑定指令

>  注意：插值表达式只能用在元素的**内容节点**中，不能用在元素的**属性节点**中！

+ 在 vue 中，可以使用 `v-bind:` 指令，为元素的属性动态绑定值；

+ 简写是英文的 `:`

+ 在使用 v-bind 属性绑定期间，如果绑定内容需要进行动态拼接，则字符串的外面应该包裹单引号，例如：

  ```xml
  <div :title="'box' + index">这是一个 div</div>
  ```



#### 事件绑定

1. `v-on:` 简写是 `@`

2. 语法格式为：

   ```xml
   <button @click="add"></button>
   
   methods: {
      add() {
   			// 如果在方法中要修改 data 中的数据，可以通过 this 访问到
   			this.count += 1
      }
   }
   ```

3. `$event` 的应用场景：如果默认的事件对象 e 被覆盖了，则可以手动传递一个  $event。例如：

   ```xml
   <button @click="add(3, $event)"></button>
   
   methods: {
      add(n, e) {
   			// 如果在方法中要修改 data 中的数据，可以通过 this 访问到
   			this.count += 1
      }
   }
   ```

4. 事件修饰符：

   + `.prevent`

     ```xml
     <a @click.prevent="xxx">链接</a>
     ```

   + `.stop`

     ```xml
     <button @click.stop="xxx">按钮</button>
     ```


![image-20221115192231374](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221115192231374.png)

#### v-model 指令

1. input 输入框
   + type="radio"
   + type="checkbox"
   + type="xxxx"
2. textarea
3. select



#### 条件渲染指令

1. `v-show` 的原理是：动态为元素添加或移除 `display: none` 样式，来实现元素的显示和隐藏
   + 如果要频繁的切换元素的显示状态，用 v-show 性能会更好
2. `v-if` 的原理是：每次动态创建或移除元素，实现元素的显示和隐藏
   + 如果刚进入页面的时候，某些元素默认不需要被展示，而且后期这个元素很可能也不需要被展示出来，此时 v-if 性能更好

>  在实际开发中，绝大多数情况，不用考虑性能问题，直接使用 v-if 就好了！！！



v-if 指令在使用的时候，有两种方式：

1. 直接给定一个布尔值 true 或 false

   ```xml
   <p v-if="true">被 v-if 控制的元素</p>
   ```

2. 给 v-if 提供一个判断条件，根据判断的结果是 true 或 false，来控制元素的显示和隐藏

   ```xml
   <p v-if="type === 'A'">良好</p>
   ```


### 过滤器

> Vue3已经放弃,Vue2可以用

怎么理解过滤器?就跟linux里的grep命令一样,就是筛选,它定义在filters里面

我们来看看代码示例:

- 要定义到 filters 节点下，**本质是一个函数**
- 在过滤器函数中，**一定要有 return 值**
- 在过滤器的形参中，可以获取到“管道符”前面待处理的那个值
- 如果全局过滤器和私有过滤器名字一致，此时按照“**就近原则**”，调用的是”私有过滤器“

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <p>message的值是{{message | capi}}</p>
</div>

<script src="/lib/vue-2.6.12.js"></script>

<script>
    const vm = new Vue({
        el: '##app',
        data: {
            message: 'hello vue.js'
        },
        filters:{
            //过滤器函数形参中的val,永远都是"管道符"前面的那个值
            capi(val){
                const first = val.charAt(0).toUpperCase()
                const other = val.slice(1)
                
                return first + other
            }
        }
    })
</script>

</body>
</html>
```

#### 全局过滤器

> 全局过滤器 - 独立于每个 vm 实例之外
> Vue. filter（）方法接收两个参数：
> 第1 个参数，是全局过滤器的”名字”
> 第2 个参数，是全局过滤器的”处理函数”

```js
Vue.filter('capi',(val) =>{
	return val.charAt(0).toUpperCase() + val.slice(1) + '~~~~~~~~~~~~~'
})
```

#### 连续调用多个过滤器
```
把 message 的值，交给 filterA 进行处理
把 filterA 处理的结果，再交给 filterB 进行处理
最终把 filterB 处理的结果，作为最终的值這染到页面上
{{ message 1 filterA I filterB }}
```

```js
{{ message | filterA | filterB }}
```

#### 过滤器传参

过滤器的本质是 JavaScript 函数，因此可以接收参数，格式如下：

![image-20221116113238654](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221116113238654.png)

> 示例代码如下：

![image-20221116113315121](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221116113315121.png)

### 入门实例

#### 实现增删查功能

实现思路:

- 增加功能

首先要收集品牌名称,然后阻止表单的默认提交行为,改为调用自定义方法add

在add中定义要添加的对象,name为收集到的brand,状态为status设置为默认值即可,创建时间也设置一个默认值即可

id的话想要保证自增,所以可以自定义一个id,然后每添加一个对象id+1

对象创建好之后,直接push进list列表即可

- 删除功能

从list列表中过滤对象,通过传入的对象id即可过滤

- 查询功能

通过v-for去遍历data区域的list数组



![image-20221116105130811](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221116105130811.png)

完整代码如下:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>品牌列表案例</title>
    <link rel="stylesheet" href="./lib/bootstrap.css">
    <link rel="stylesheet" href="./css/brandlist.css">
</head>

<body>

<div id="app">
    <!-- 卡片区域 -->
    <div class="card">
        <div class="card-header">
            添加品牌
        </div>
        <div class="card-body">
            <!-- 添加品牌的表单区域 -->
            <!--            表单有默认的提交行为,通过@submit.prevent可以阻止它的默认行为-->
            <form @submit.prevent="add">
                <div class="form-row align-items-center">
                    <div class="col-auto">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">品牌名称</div>
                            </div>
                            <input type="text" class="form-control" placeholder="请输入品牌名称" v-model.trim="brand">
                        </div>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary mb-2">添加</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- 表格区域 -->
    <table class="table table-bordered table-hover table-striped">
        <thead>
        <tr>
            <th scope="col">##</th>
            <th scope="col">品牌名称</th>
            <th scope="col">状态</th>
            <th scope="col">创建时间</th>
            <th scope="col">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" :id="'cd' + item.id" v-model="item.status">
                    <label class="custom-control-label" :for="'cd' + item.id" v-if="item.status">已启用</label>
                    <label class="custom-control-label" :for="'cd' + item.id" v-else>已禁用</label>
                </div>
            </td>
            <td>{{item.time}}</td>
            <td>
                <a href="javascript:;" @click="remove(item.id)">删除</a>
            </td>
        </tr>
        </tbody>
    </table>
</div>

<script src="./lib/vue-2.6.12.js"></script>

<script>
    const vm = new Vue({
        el: '##app',
        data: {
            //品牌的列表数据
            brand: "",
            list: [
                {id: 1, name: '宝马', status: true, time: new Date()},
                {id: 2, name: '奔驰', status: false, time: new Date()},
                {id: 3, name: '奥迪', status: true, time: new Date()},
            ],
            nextId: 4,
        },
        methods: {
            remove(id) {
                // console.log(id)
                this.list = this.list.filter(item => item.id != id)
            },
            add() {
                // console.log(this.brand)
                // 如果判断到brand的值为空字符串,则return出去
                if (this.brand === '') return alert("必须填写品牌名称")

                // 如果没有return出去,应该去执行添加的逻辑
                // 先把要添加的品牌对象,整理出来
                const obj = {
                    id: this.nextId,
                    name: this.brand,
                    status: true,
                    time: new Date()
                }
                this.list.push(obj)
                this.brand = ''
                this.nextId += 1

            }
        }
    })
</script>
</body>

</html>
```



## 四、Vue基础进阶

### watch 侦听器

#### 什么是侦听器

**watch 侦听器**允许开发者监视数据的变化，从而**针对数据的变化做特定的操作**

![image-20221116114639935](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221116114639935.png)

#### 侦听器的格式

1. 方法格式的侦听器

   + 缺点1：无法在刚进入页面的时候，自动触发！！！
   + 缺点2：如果侦听的是一个对象，如果对象中的属性发生了变化，不会触发侦听器！！！

2. 对象格式的侦听器

   + 好处1：可以通过 **immediate** 选项，让侦听器自动触发！！！

   ![image-20221116152955400](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221116152955400.png)

   + 好处2：可以通过 **deep** 选项，让侦听器深度监听对象中每个属性的变化！！！

   ![image-20221116153008596](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221116153008596.png)

#### 侦听器测试

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div id="app">
    <input type="text" v-model="username">
</div>
<script src="/lib/vue-2.6.12.js"></script>


<script>
    const vm = new Vue({
        el: '##app',
        data: {
            username: '',
        },
        watch: {
            username(newOlder, oldValue) {
                console.log('监听到了username发生了变化', newOlder, oldValue)
            },

        }
    })
</script>


</body>
</html>

```

![image-20221116120019015](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221116120019015.png)



### 计算属性

#### 是什么?

计算属性指的是通过一系列运算之后，最终得到一个属性值。

这个动态计算出来的属性值可以被模板结构或 methods 方法使用。示例代码如下：

![image-20221117110139193](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117110139193.png)



#### 特点

- **定义的时候，要被定义为“方法”**
- 在**使用计算属性的时候，当普通的属性使用即可**

#### 好处

- 实现了代码的复用
- 只要计算属性中依赖的数据源变化了，则计算属性会自动重新求值！

### axios

> axios(发音：艾克C奥斯) 是一个专注于网络请求的库！
>
> 它封装了Ajax(通过 **Ajax** 可以异步从服务器**请求**数据并将数据更新到网页中，整个过程不需要重载（刷新）整个网页，可以将网页的内容更快的呈现给用户。)

#### axios 的基本使用

##### 发起 GET 请求 

```js
axios({
  // 请求方式
  method: 'GET',
  // 请求的地址
  url: 'http://www.liulongbin.top:3006/api/getbooks',
  // URL 中的查询参数
  params: {
    id: 1
  },
  //请求体参数
  data:{}
}).then(function (result) {
  console.log(result)
})
```

简写:

```
const resu = axios.get('https://www.escook.cn/api/cart')
resu.then(function (books) {
	console.log(books)
})
```

`axios`返回的是一个`Promise`对象,在**Promise对象中并不是服务器返回的结果,而是axios对服务器返回的结果又进行了一次封装**,如下:

![image-20221119172253294](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221119172253294.png)

> 简化如下:

![image-20221119171748440](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221119171748440.png)

##### 发起 POST 请求

```js
document.querySelector('##btnPost').addEventListener('click', async function () {
  // 如果调用某个方法的返回值是 Promise 实例，则前面可以添加 await！
  // await 只能用在被 async “修饰”的方法中
  const { data: res } = await axios({
    method: 'POST', 
    url: 'http://www.liulongbin.top:3006/api/post',
    data: {
      name: 'zs',
      age: 20
    }
  })

  console.log(res)
})
```

#### 使用解构赋值

基于axios



![image-20221119182015125](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221119182015125.png)



### vue-cli

#### 什么是单页面应用程序?

**SPA(Single Page Application)**

指的就是**一个Web网站中只有唯一的一个HTML页面,所有的功能与交互都是在这唯一的一个页面完成**

一般Vue项目打包之后会生成一个dist文件,这个dist文件就是下面这个样式的

![image-20221117110545419](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117110545419.png)

#### 什么是vue-cli?

**快速生成一个vue项目的开发环境**,程序员可以专注在撰写应用上，而不必花好几天去纠结 webpack 配置的问题。

#### 安装和使用

![image-20221117111105875](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117111105875.png)



1. 在终端下运行如下的命令，创建指定名称的项目：

   ```bash
   vue cerate 项目的名称
   ```

2. vue 项目中 src 目录的构成：

   ```
   assets 文件夹：存放项目中用到的静态资源文件，例如：css 样式表、图片资源
   components 文件夹：程序员封装的、可复用的组件，都要放到 components 目录下
   main.js 是项目的入口文件。整个项目的运行，要先执行 main.js
   App.vue 是项目的根组件。
   ```



#### vue项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：通过` main.js `把` App.vue `渲染到` index.html` 的指定区域中。

![image-20221117152015785](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117152015785.png)

- App.vue 用来编写待渲染的模板结构
- index.html 中需要预留一个 el 区域
- main.js 把 App.vue 渲染到了 index.html 所预留的区域中



渲染之后,会代替index页面原有的代码

![image-20221117152808987](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117152808987.png)





### vue组件

#### 组件化开发

组件化开发指的是：根据封装的思想，把**页面上可重用的 UI 结构**封装为`组件`，从而方便项目的开发和维护。

#### vue 中的组件化开发

vue 是一个支持组件化开发的前端框架。 vue 中规定：组件的后缀名是` .vue`。之前接触到的 App.vue 文件本质上就是一个` vue 的组件`。

#### vue 组件的三个组成部分

每个.vue组件都由3部分构成,分别是:

template -> 组件的模版结构

Script -> 组件的JavaScript行为

Style -> 组件的样式

其中，**每个组件中必须包含 template 模板结构**，而 script 行为和 style 样式是可选的组成部分

##### template

vue 规定：每个组件对应的模板结构，需要定义到`<template>`节点中

```
<template>
<!--当前组件的DOM结构,需要定义到template标签的内部 -->
</template>
```

> tips:

- **template是vue提供的容器标签,只起到包裹性质的作用,他不会被渲染为真正的DOM元素**
- template 中只能包含唯一的根节点

##### script

vue 规定：开发者可以在` <script>` 节点中封装组件的 JavaScript 业务逻辑。

![image-20221117114636442](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117114636442.png)

> .vue 组件中的 data 必须是函数

![image-20221117114820766](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117114820766.png)

##### style

![image-20221117114843269](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117114843269.png)

![image-20221117114906636](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117114906636.png)

##### 实例

```html
<template>
  <div class="wahahaha">
    <h3>这是用户自定义的vue组件--{{ username }}</h3>
  </div>
</template>

<!--固定写法-->
<script>
export default {
  data() {
    return {
      username: 'zs'
    }
  }
}
</script>

<style>
  .wahahaha{
    background-color: pink;
  }
</style>
```

##### 启用less语法以及唯一根节点

- 组件中只能有一个根节点,也就是说不能写多个一级div,只能在一级div里定义多个低级div
- less语法就是让css的编写更简单

```vue
<template>
  <div>
    <div id="wahahaha">
      <h3>这是用户自定义的vue组件--{{ username }}</h3>
      <button @click="changeName">点我改变名字</button>
    </div>
    <div>123</div>
  </div>

</template>

<!--固定写法-->
<script>
export default {
  data() {
    return {
      username: 'zs'
    }
  },
  methods: {
    changeName() {
      console.log(this),
          this.username = 'Wahahah'
    }
  },
  // 当前组件的监听器
  watch: {},
  // 当前组件的计算属性
  computed: {}
}
</script>

<style lang="less">
#wahahaha {
  background-color: pink;

  h3 {
      color: azure;
  }
}
</style>
```





#### 组件之间的父子关系

![image-20221117114957733](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117114957733.png)

##### 使用组件的三个步骤

![image-20221117115039148](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117115039148.png)



##### 实例

![image-20221117163916959](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117163916959.png)

Hello.vue是我后来加

![image-20221117165053906](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117165053906.png)



> 通过 components 注册的是私有子组件

例如： 

- 在组件 A 的 components 节点下，注册了组件 F。 

- 则组件 F 只能用在组件 A 中；不能被用在组件 C 中。



> 注册全局组件

在 vue 项目的 main.js 入口文件中，通过 Vue.component() 方法，可以注册全局组件。

实例如下:

![image-20221117115346254](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117115346254.png)

#### 组件的props

​	

props 是组件的**`自定义属性`**，在封装通用组件的时候，合理地使用 props 可以极大的提高组件的复用性！

- props中的数据,可以直接在模版结构中使用

![image-20221117200707847](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117200707847.png)

##### 实例

> left组件

- 使用v-bind可以给属性赋值
- **这里init自定义属性为字符串类型,通过v-bind代表你后面写的是js表达式,数字在js中就是Number型**

```vue
<template>
  <div class="left-container">
    <h3>我是left</h3>
    <MyCount :init="9"></MyCount>
  </div>
</template>

<script>
export default {
  name: "Left",
}
</script>

<style>
.left-container {
  padding: 0 20px 20px;
  background-color: ##42b983;
  min-height: 250px;
  flex: 1;
}
</style>
```

> count组件

```vue
<template>
  <div>
    <p>count的值是:{{ init }}</p>
    <button @click="init += 1">Hi,点我给count+1</button>
  </div>
</template>

<script>
export default {
  props: ['init'],
  name: "Count",
  data() {
    return {
      count: 0,
    }
  }
}
</script>

<style scoped>

</style>
```

如图所示:

![image-20221117200944902](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117200944902.png)

##### props 是只读的

![image-20221117201751163](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117201751163.png)

要想修改 props 的值，可以把 props 的值转存到 data 中，因为 data 中的数据都是可读可写的！

所以props值的作用就是做一个初始化,最好是去操作data里的数据,所以这里可以通过this.init去把初始值赋给data里的count

> this代表当前组件对象

```vue
<template>
  <div>
    <p>count的值是:{{ count }}</p>
    <button @click="count += 1">Hi,点我给count+1</button>
  </div>
</template>

<script>
export default {
  props: ['init'],
  name: "Count",
  data() {
    return {
      count: this.init
    }
  }
}
</script>

<style scoped>

</style>
```

##### props 的 default 默认值

在声明自定义属性时，可以通过 default 来定义属性的默认值。示例代码如下：

props:{

​	自定义属性A:{},

​	自定义属性B:{},

​	自定义属性C:{},

}

```js
export default {
  props: {
    init: {
      default: 0,
    }
  },
  name: "Count",
  data() {
    return {
      count: this.init
    }
  }
}
```

##### props 的 type 值类型

在声明自定义属性时，可以通过 type 来定义属性的值类型。示例代码如下：

```js
export default {
  props: {
    init: {
      default: 0,
    }
  },
  name: "Count",
  data() {
    return {
      count: this.init,
      type: Number
    }
  }
}
```

##### props 的 required 必填项

就是说,你自定义的这个属性是必填项,不填就会报错

![image-20221117203428415](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117203428415.png)

#### 组件之间的样式冲突问题

##### scoped

默认情况下，写在 .vue 组件中的样式会全局生效，因此很容易造成多个组件之间的样式冲突问题。

导致组件之间样式冲突的根本原因是：

- **单页面应用程序中，所有组件的 DOM 结构，都是基于唯一的 index.html 页面进行呈现的**
- **每个组件中的样式，都会影响整个 index.html 页面中的 DOM 元素**

为了提高开发效率和开发体验，vue 为 style 节点提供了 scoped 属性，从而防止组件之间的样式冲突问题：

![image-20221117204209632](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117204209632.png)



##### /deep/ 样式穿透

![image-20221117204641697](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221117204641697.png)

> 什么时候会用到

如果代码引入了第三方组件库,想修改它的样式不能去直接修改它的源码,**找到要修改的组件位置通过/deep/做样式穿透**



























