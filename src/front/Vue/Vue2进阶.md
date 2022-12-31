---
title: Vue2进阶
---
# 五、生命周期&数据共享

## 生命周期 & 生命周期函数

`生命周期`（Life Cycle）是指一个组件从**创建 -> 运行 -> 销毁**的整个阶段，**强调的是一个`时间段`。**

`生命周期函数`：是由 vue 框架提供的内置函数，会伴随着组件的生命周期，自动按次序执行。

注意：**生命周期强调的是时间段，生命周期函数强调的是时间点。**

## 组件生命周期函数的分类

![image-20221118072616877](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118072616877.png)



## 生命周期详解

### 简洁版本

**回调函数**是你留个处理方法给事件，事件发生了以后会自动执行你留下调处理方法

**钩子函数**是好比找了个代理，监视事件是否发生，如果发生了这个代理就执行你的事件处理方法；在这个过程中，代理就是钩子函数

在某种意义上，回调函数做的处理过程跟钩子函数中要调用调方法一样
但是有一点： 钩子函数一般是由事件发生者提供的。直白了说，它留下一个钩子，这个钩子的作用就是钩住你的回调方法



> ==钩子函数是在一个事件触发的时候，在系统级捕获到了他，然后做一些操作。==一段用以处理系统消息的程序，用以处理系统消息的程序，是说钩子函数是用于处理系统消息的

![img](https://raw.githubusercontent.com/YuyanCai/imagebed/main/11370083-f279314aef6741db.jpg)

### 详细版本



![lifecycle](https://raw.githubusercontent.com/YuyanCai/imagebed/main/lifecycle.png)



### 最重要的三个阶段

- created

  **`组件的 porps/data/methods已创建好，都处于可用的状态。`但是组件的模板结构尚未生成！**

- mounted

  **已经把内存中的 HTML 结构，成功的渲染到了浏览器之中。`此时浏览器中己然包含了当前组件的 DOM 结构。`**

- update

  **组件的最新数据,可以操作`最新的DOM`结构**

## 组件之间的关系

在项目开发中，组件之间的最常见的关系分为如下两种：

① 父子关系 

② 兄弟关系

![image-20221118083359316](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118083359316.png)

### 父子组件之间的数据共享

父子组件之间的数据共享又分为：

① 父 -> 子共享数据

② 子 -> 父共享数据

#### 父组件向子组件共享数据

父组件向子组件共享数据需要使用自定义属性

如下:

> 父组件

```vue
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div class="box">
    <Left></Left>
    <Right :username=userinfo :passwd=passwd></Right>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Left from "@/components/Left";
import Right from "@/components/Right";

export default {
  name: 'App',
  components: {
    HelloWorld,
    Left,
    Right
  },
  data() {
    return {
      userinfo: {name: 'zs', age: 12},
      passwd: 123
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.box {
  display: flex;
}
</style>
```

> 子组件

```vue
<template>

  <div class="rightContainer">
    <h2>
      我是right
    </h2>

    <h2>您的姓名是:{{username}}</h2>
    <h2>您的密码是:{{passwd}}</h2>
  </div>


</template>

<script>
export default {
  name: "Right",
  props: ['username','passwd']
}
</script>

<style scoped>
.rightContainer {
  background-color: aquamarine;
  flex: 1;
  height: 300px;
}
</style>
```

#### 子组件向父组件共享数据

**子组件向父组件共享数据使用自定义事件。**

![image-20221118101743108](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118101743108.png)

如下：

![image-20221118102521747](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118102521747.png)



![image-20221118102135369](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118102135369.png)

### 兄弟组件之间的数据共享

在 vue2.x 中，兄弟组件之间数据共享的方案是 EventBus

![image-20221118103529647](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118103529647.png)

> EventBus 的使用步骤

1. 创建 eventBus.js 模块，并向外共享一个 Vue 的实例对象
2. 在数据发送方，调用 bus.$emit('事件名称', 要发送的数据) 方法触发自定义事件
3. 在数据接收方，调用 bus.$on('事件名称', 事件处理函数) 方法注册一个自定义事件



## ref 引用

ref 用来辅助开发者在不依赖于 jQuery 的情况下，获取 DOM 元素或组件的引用。

每个 vue 的组件实例上，都包含一个 $refs 对象，里面存储着对应的 DOM 元素或组件的引用。默认情况下，组件的 $refs 指向一个空对象。

### 什么是 ref 引用

ref 用来辅助开发者在**不依赖于 jQuery 的情况下**，**获取 DOM 元素或组件的引用。**

每个 vue 的组件实例上，都包含一个 `$refs` 对象，里面存储着对应的 DOM 元素或组件的引用。默认情况下，

**组件的 $refs 指向一个空对象。**

![image-20221118114026831](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118114026831.png)

###  使用 ref 引用 DOM 元素

如果想要使用 ref 引用页面上的 DOM 元素，则可以按照如下的方式进行操作：

![image-20221118114121487](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118114121487.png)

### 使用 ref 引用组件实例

![image-20221118114137863](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118114137863.png)

### 控制文本框和按钮的按需切换

![image-20221118114709005](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118114709005.png)

>  让文本框自动获得焦点

当文本框展示出来之后，如果希望它立即获得焦点，则可以为其添加 ref 引用，并调用原生 DOM 对象的 .focus() 方法即可。示例代码如下：

![image-20221118114802704](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118114802704.png)

### this.$nextTick(cb) 方法

组件的 $nextTick(cb) 方法，会把 cb 回调推迟到下一个 DOM 更新周期之后执行。通俗的理解是：等组件的 DOM 更新完成之后，再执行 cb 回调函数。从而能保证 cb 回调函数可以操作到最新的 DOM 元素。

![image-20221118143829921](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118143829921.png)

![image-20221118143842473](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118143842473.png)

## 数组中的方法

### some循环

- 简单来说some循环就是遇到终止条件可以停止继续寻找
- foreach即使遇到终止条件也会继续寻找

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script>
    const arr = ['詹姆斯', '科比', '2届MVP得主库里', '1.5']

    arr.forEach((item, index) => {
        console.log('ok')
        if (item === '2届MVP得主库里') {
            console.log(index)
        }
    })

    console.log('arr.some使用效果如下:')

    arr.some((item, index) => {
        console.log('ok')
        if (item === '2届MVP得主库里') {
            console.log(index)
            return true
        }
    })

</script>

</body>
</html>
```

![image-20221118145828031](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118145828031.png)

### foreach循环

**foreach就是循环每一项,some是循环到满足条件就停下来**

### every循环

**判断数组中的数据是否被全选了使用every循环**

![image-20221118150334089](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118150334089.png)



### reduce的基本用法

> 不用reduce计算总和

![image-20221118150529758](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118150529758.png)



> 用reduce计算总和

![image-20221118150948771](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118150948771.png)

> reduce的简化写法

![image-20221118151333626](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221118151333626.png)



## 购物车案例

### 导入,注册,使用组件

这里的组件是写好的,我们直接导入,注册,使用

> Tips:

- 导入的组件名称一般都给它设置为首字母大写.这样和普通标签能有一个区分

![image-20221119163139000](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221119163139000.png)

### 基于axios请求列表数据

> axios是对ajax的封装,向后端发送请求就用它
>
> 这里是先定义一个封装请求列表数据的方法,然后在vue的created的生命周期阶段调用

```js
created() {
  this.initCartList()
},
methods: {
  //封装请求列表数据的方法
  async initCartList() {
    //调用axios的get方法,请求列表数据
    const {data: res} = await axios.get('https://www.escook.cn/api/cart')
    // 只要请求回来的数据,在页面渲染期间要用到,则必须转存到data里
    this.list = res.list
  }
},
```

这里的await是用来`解构赋值`的它一般和async联合使用

> 那么`解构赋值`是什么呢?

就是前段通过axios向后端发送请求之后,后端返回的数据会先经过axios进行一次封装,不能直接拿到真实数据

如下:

![image-20221119171748440](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221119171748440-20221120201618310.png)

所以为了直接拿到真实数据,**我们需要解构,从回复的数据中取出真实数据**
```
{{data:res}}这是啥意思呢?
```

`axios`返回的是一个`Promise`对象,在**Promise对象中并不是服务器返回的结果,而是axios对服务器返回的结果又进行了一次封装**,如下:

![image-20221119172253294](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221119172253294.png)

**通过`{{data:res}}`意思就是取出Promise对象中的data区域数据,并把名字`重命名为res`**

### 渲染Goods组件

> 1.商品数据其实就是一个个Goods组件

导入,注册,使用组件

```js
<Goods></Goods>
```

> 2.给组件赋值,这里通过v-for来实现

首先看看请求到的结果

![image-20221120093440652](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120093440652.png)

list数组里不就是如下一个个的对象吗,然后赋值的时候通过对象.属性即可取得对应的值

这里的:key,:id,:title等都是为子组件的自定义属性,父组件向子组件传递数据就是通过自定义属性来进行传递的

```js
<!--    这里为啥一直要写v-bind呢因为在等号后面我们写的是js表达式,如果不写v-bind则相当于我们传给它了一个字符串!-->
<Goods
    v-for="item in list"
    :key="item.id"
    :id="item.id"
    :title="item.goods_name"
    :img="item.goods_img"
    :price="item.goods_price"
    :state="item.goods_state "
>
</Goods>
```

> 3.修改商品的勾选状态

修改商品的勾选状态为`子组件向父组件`**共享数据**

通过自定义事件来实现

> 3.1 在子组件中为复选框绑定自定义事件

复选框状态每发生一次改变就会触发自定义事件

```js
<input type="checkbox" class="custom-control-input" :id="'cb' + id" :checked="state"
       @change="stateChange"/>
```

> 3.2 在子组件中自定义事件如下

自定义时间名字为`state-change`,传递给父组件的数据为`id和value`

- id表示当前商品
- value表示最新的勾选状态

```js
methods: {
  stateChange(e) {
    // console.log(e)
    console.log(e.target.checked)
    const newState = e.target.checked
    // 触发自定义事件
    this.$emit('state-change', {id: this.id, value: newState})
  }
}
```

> 3.3 父组件绑定自定义事件

通过参数e来接受子组件传来的数据

通过some循环找到改变状态的子组件判断的条件是id,找到之后给组件的状态赋值为子组件传来的真实数据

```js
<Goods @state-change="getNewState"></Goods>
methods: {
    getNewState(e) {
      console.log(e)
      this.list.some(item => {
        if (item.id === e.id) {
          item.goods_state = e.value
        }
      })
    }
  },
```

### 渲染Footer组件

> 引入footer组件

footer组件做二件事:

- 全选
- 计算总价

全选为`子组件向父组件`**共享数据**     =>   自定义事件

计算总价为`父组件向子组件`**共享数据**    =>   自定义属性

```js
<Footer
    :is-full="fullState"
    @fullChange="getFullState"
    :total-prices="amt"
></Footer>
```

> 全选功能的实现

```js
//子组件
<input type="checkbox" class="custom-control-input" id="cbFull" :checked="isFull" @change="fullChange"/>

  methods: {
    fullChange(e) {
      // console.log(e.target.checked)
      // 触发自定义事件
      this.$emit('fullChange', e.target.checked)
    }
  }


// 动态计算全选的状态是true还是false
fullState() {
  return this.list.every(item => item.goods_state)
},
  
//父组件
  // 动态计算全选的状态是true还是false
  fullState() {
    return this.list.every(item => item.goods_state)
  },
```

> 计算总价功能的实现

子组件

```js
props: {
  isFull: {
    type: Boolean,
      default: true
  },
    totalPrices: {
      type: Number,
        default: 0
    }
},

<div>
    <span>合计：</span>
<span class="total-price">￥{{ totalPrices.toFixed(2) }}</span>
</div>

<!-- 结算按钮 -->
<button type="button" class="btn btn-primary btn-settle">结算（{{ totalPrices.toFixed() }}）</button>

```

父组件

```js
computed: {
  //总价格
  amt() {
    // 先filter过滤,在reduce累加
    return this.list
        .filter(item => item.goods_state)
        //只有一行的箭头函数,可以省略return和{}花括号
        .reduce((total, item) =>
            (total += item.goods_price * item.goods_count),0)
  }
},
```

> 购买数量实现

和计算总价实现一个思路

- 从集合中过滤出选中的商品
- 取得选中商品的数量

取得数量之后,还需要和子组件共享数据,所以就用自定义属性来传递数据

```js
computed: {
  //总数量
  totalQuantity() {
    return this.list
        .filter(item => item.goods_state)
        .reduce((total, item) => (total += item.goods_count), 0)
  }
```

子组件

```js
<!-- 结算按钮 -->
<button type="button" class="btn btn-primary btn-settle">结算（{{ totalNum}}）</button>

  props: {
    totalNum:{
      type:Number,
      default:0
    }
  },
```

# 六、动态组件&插槽&自定义指令&axios

## 动态组件

### 什么是动态组件

动态组件指的是动态切换**组件的显示与隐藏**

### 如何实现动态组件渲染

vue 提供了一个内置的  组件，专门用来实现动态组件的渲染。示例代码如下：![image-20221120194223304](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120194223304.png)

### 使用 keep-alive 保持状态

默认情况下，切换动态组件时无法保持组件的状态。此时可以使用 vue 内置的  组件保持动态组 件的状态。示例代码如下：

![image-20221120194246584](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120194246584.png)

### keep-alive 对应的生命周期函数

当组件`被缓存`时，会自动触发组件的 `deactivated` 生命周期函数。 

当组件`被激活`时，会自动触发组件的 `activated `生命周期函数。

![image-20221120194329705](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120194329705.png)

###  keep-alive 的 include 属性

include 属性用来指定：只有名称匹配的组件会被缓存。多个组件名之间使用英文的逗号分隔:

![image-20221120194346399](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120194346399.png)

## 插槽

`插槽（Slot）`是 vue 为`组件的封装者`提供的能力。允许开发者在封装组件时，把不确定的、希望由用户指定的 部分定义为插槽。

![image-20221120194532307](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120194532307.png)

可以把插槽认为是组件封装期间，为用户预留的内容的占位符。

### 体验插槽的基础用法

在封装组件时，可以通过  元素定义插槽，从而为用户预留内容占位符。示例代码如下：

![image-20221120194635365](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120194635365.png)

> vue 官方规定：每一个 slot 插槽，都要有一个 name 名称--；
> 如果省略了 slot 的 name 属性，则有一个默认名称叫做 default
>
> **`v-slot只能放在组件上和template上,放在其他上面会报错`**

默认情况下，在使用组件的时候，提供的内容都会被填充到名字为default 的插槽之中

![image-20221120200200258](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120200200258.png)

#### 为具名插槽提供内容

在向具名插槽提供内容的时候，我们可以在一个` <template>(包裹作用)` 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称。示例代码如下:

![image-20221120200451005](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120200451005.png)

#### 具名插槽的简写形式

跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。

例如 `v-slot:header `可以被重写为` #header：`

![image-20221120200547696](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120200547696.png)

### 作用域插槽

在封装组件的过程中，可以为预留的插槽绑定 props 数据，这种带有 props 数据的  叫做作用 `域插槽`。

示例代码如下： 

![image-20221120201822789](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120201822789.png)

#### 使用作用域插槽

可以使用 v-slot: 的形式，接收作用域插槽对外提供的数据。示例代码如下：

![image-20221120202402592](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120202402592.png)

> 实例

![image-20221120203040876](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120203040876.png)

#### 解构插槽 Prop

作用域插槽对外提供的数据对象，可以使用解构赋值简化数据的接收过程。

示例代码如下：

![image-20221120202640156](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120202640156.png)

> 实例

 ![image-20221120203414937](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120203414937.png)

## 自定义指令

### 什么是自定义指令

vue 官方提供了 v-text、v-for、v-model、v-if 等常用的指令。除此之外 vue 还允许开发者自定义指令。

### 自定义指令的分类

vue 中的自定义指令分为两类，分别是：

- 私有自定义指令 

- 全局自定义指令

### 私有自定义指令

在每个 vue 组件中，可以在 directives 节点下声明私有自定义指令。示例代码如下：

![image-20221120204949304](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120204949304.png)

### 使用自定义指令

在使用自定义指令时，需要加上 v- 前缀。示例代码如下

![image-20221120204724614](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120204724614.png)

### 为自定义指令动态绑定参数值

为自定义指令动态绑定参数值

在 template 结构中使用自定义指令时，可以通过等号（=）的方式，为当前指令动态绑定参数值：

![image-20221120205114156](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120205114156.png)

### 通过 binding 获取指令的参数值

在声明自定义指令时，可以通过形参中的第二个参数，来接收指令的参数值：

![image-20221120205143256](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120205143256.png)

### update 函数

bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发。 update 函 数会在每次 DOM 更新时被调用。示例代码如下：

![image-20221120205222590](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120205222590.png)

### 函数简写

如果 insert 和update 函数中的逻辑完全相同，则对象格式的自定义指令可以简写成函数格式：

![image-20221120205243275](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120205243275.png)

### 全局自定义指令

全局共享的自定义指令需要通过“Vue.directive()”进行声明

示例代码如下：

![image-20221120205317529](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120205317529.png)

## 把axios挂载到vue原型上

**缺点是无法对api接口实现复用!**

![image-20221202144907847](https://raw.githubusercontent.com/YuyanCai/imagebed/main/noteimage-20221202144907847.png)

**在其他组件上直接通过this.$http.get或者this.$http.post来发请求就行了**





# 七、路由

## 是什么?

一组对应关系,在 SPA 项目中，不同功能之间的切换，要依赖于前端路由来完成 

## 前端路由的工作方式

![image-20221120215504662](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120215504662.png)

## 实现简易的前端路由

> 步骤1：通过 `<component>`标签，结合 `comName` 动态渲染组件。示例代码如下：

![image-20221120215552901](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120215552901.png)



> 步骤2：在 App.vue 组件中，为  链接添加对应的 hash 值：

![image-20221120215736699](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120215736699.png)

> 步骤3：在 created 生命周期函数中，监听浏览器地址栏中 hash 地址的变化，动态切换要展示的组件的名称：

![image-20221120215812178](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221120215812178.png)

## vue-router 的基本用法

vue-router 是 vue.js 官方给出的路由解决方案。它只能结合 vue 项目进行使用，能够轻松的管理 SPA 项目 中组件的切换。

vue-router 的官方文档地址：https://router.vuejs.org/zh/

### vue-router安装

在 vue2 的项目中，安装 vue-router 的命令如下：

```vue
npm i vue - router@3.5.2 -S
```

### 创建路由模块

在 src 源代码目录下，新建 router/index.js 路由模块，并初始化如下的代码：

![image-20221121093807714](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121093807714.png)

### 导入并挂载路由模块

在 src/main.js 入口文件中，导入并挂载路由模块。示例代码如下：

![image-20221121094045835](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094045835.png)

### 声明路由链接和占位符

![image-20221121094102418](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094102418.png)

### 声明路由的匹配规则

![image-20221121094227580](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094227580.png)



## 路由重定向

`路由重定向`指的是：用户在访问地址 A 的时候，强制用户跳转到地址 C ，从而展示特定的组件页面。 通过路由规则的 `redirect` 属性，指定一个新的路由地址，可以很方便地设置路由的重定向：

![image-20221121094327986](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094327986.png)

### 嵌套路由

![image-20221121094346744](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094346744.png)



###  声明子路由链接和子路由占位符

![image-20221121094440465](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094440465.png)

### 通过 children 属性声明子路由规则

![image-20221121094457351](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094457351.png)

## 动态路由匹配

动态路由指的是：把 Hash 地址中可变的部分定义为参数项，从而提高路由规则的复用性。 在 vue-router 中使用英文的冒号（:）来定义路由的参数项。示例代码如下： 

![image-20221121094619335](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094619335.png)

### $route.params 参数对象

![image-20221121094644113](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094644113.png)

### 使用 props 接收路由参数

![image-20221121094656134](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121094656134.png)

### 声明式导航 & 编程式导航



#### vue-router 中的编程式导航 API

![image-20221121095018303](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095018303.png)

####  $router.push

![image-20221121095038559](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095038559.png)

#### $router.replace

![image-20221121095059840](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095059840.png)

#### $router.go

![image-20221121095112629](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095112629.png)



####  $router.go 的简化用法

![image-20221121095123592](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095123592.png)

### 导航守卫

![image-20221121095140954](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095140954.png)

#### 全局前置守卫

> 什么是回调函数?
>
> **`回调函数是一个参数,将这个函数作为参数传到另一个函数里面`**,当那个函数执行完之后,在执行传进去这个函数,这个过程就叫回调!
>
> 白话文:主函数的事先干完,回头在调用传进来的那个函数.

![image-20221121095154479](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095154479.png)

#### 守卫方法的 3 个形参

![](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095204691.png)

#### next 函数的 3 种调用方式

![image-20221121095226022](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095226022.png)



#### 控制后台主页的访问权限

![image-20221121095241472](https://raw.githubusercontent.com/YuyanCai/imagebed/main/image-20221121095241472.png)



## URL种的#是什么意思?

> #代表网页中的一个位置。

比如，http://www.example.com/index.html#print就代表网页index.html的print位置。浏览器读取这个URL后，会自动将print位置滚动至可视区域。

在VUE中，路由的实现方式有两种，其中一种就是通过#标识符进行页面内导航从而实现路由切换。

![image-20221202172317471](https://raw.githubusercontent.com/YuyanCai/imagebed/main/noteimage-20221202172317471.png)



### HTTP请求不包括#

\#是用来指导浏览器动作的，对服务器端完全无用。所以，HTTP请求中不包括#。
比如，访问下面的网址，[http://www.example.com/index.html#print](https://blog.csdn.net/zlingyun/article/details/83536589#print)，浏览器实际发出的请求是这样的：

```
GET /index.html HTTP/1.1

Host: www.example.com
```

### #后的字符

在第一个#后面出现的任何字符，都会被浏览器解读为位置标识符。这意味着，这些字符都不会被发送到服务器端。
比如，下面URL的原意是指定一个颜色值：[http://www.example.com/?color=#fff](https://blog.csdn.net/zlingyun/article/details/83536589#fff)，但是，浏览器实际发出的请求是：

```
GET /?color= HTTP/1.1
 
Host: www.example.com
```

### 改变#不触发网页重载

单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页。
比如，从http://www.example.com/index.html#location1改成http://www.example.com/index.html#location2，浏览器不会重新向服务器请求index.html。

说明同第一个，例如单页面应用SPA一样，路由的切换，不会重新加载页面，只是切换位置，或者切换组件；第二种应用就是在单个页面里面通过name和id切换当前显示的位置。

### 改变#会改变浏览器的访问历史

每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。这对于ajax应用程序特别有用，可以用不同的#值，表示不同的访问状态，然后向用户给出可以访问某个状态的链接。值得注意的是，上述规则对IE 6和IE 7不成立，它们不会因为#的改变而增加历史记录。

说明：通过#的切换，是算在浏览器的访问历史中的，前进和后退都是生效的。

## ？说明

### **连接作用**

通过？来带参数，连接域名和参数，经常会用到。

http://www.xxx.com/Show.asp?id=77&nameid=2905210001&page=1

### 清除缓存

http://www.xxxxx.com/index.html

http://www.xxxxx.com/index.html?test123123

两个url打开的页面一样，但是后面这个有问号，说明不调用缓存的内容，而认为是一个新地址，重新读取。

因为在做http请求的时候，如果浏览器检测到你的地址完全没变，会从缓存里读取先前请求过的数据，不再发送请求。有些时候是页面资源的加载，有些时候是API的get请求，都有可能。加上这个，会让浏览器认为这是一个新的地址，从而保证重新获取资源。

## &说明

不同参数的间隔符

http://www.xxx.com/Show.asp?id=77&nameid=2905210001&page=1















