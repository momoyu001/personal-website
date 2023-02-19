## html

### 1、页面中的JS需要提前加载，不阻塞页面渲染，怎么做

### 2、对html语义化的理解

### 3、两个image标签，并排展示和上下展示有什么区别吗



## css

### 1、CSS盒模型由几种。怎么去设置盒模型

### 2、如何实现一个元素的水平垂直方向上的居中

### 3、CSS的选择器有哪些，他们的优先级如何

### 4、如何实现一个元素水平垂直方向上的居中

### 5、rem是什么。适配的原理是什么

### 6、媒体查询有接触过吗

### 7、BFC是什么，有什么特点，如何触发BFC

### 8、如何隐藏一个元素

### 9、什么是重排和重绘，如何避免重排和重绘

### 10、伪元素和伪类有什么区别

### 11、哪些css树形的改变会引起重绘而不会引起重排

### 12、使用transform对某个div进行位移，会引起回流（重排）吗

### 13、h5的不同屏幕分辨率怎么适配

### 14、给两个div分别设置`transform: translateX(400px) scale(.5)`，`transform: scale(.5) translateX(400px)`会有什么不同吗

### 15、rem、em、vh、vw、px都是相对于谁的

### 16、常见的水平居中的方式

### 17、css中的计算属性：calc



## js

### 1、对象和数组，如何区分哪个是对象哪个是数组

### 2、改变this指向的方法？call、apply、bind的区别

### 3、基本数据类型和引用数据类型的区别

### 4、箭头函数和普通函数的区别

### 5、简单说一下原型链

### 6、闭包是什么

### 7、如何实现深拷贝

### 8、forEach和map的区别

### 9、遍历数组的方式，他们的区别：for循环、forEach、for...in、for...of

### 10、for...in可以遍历set和map吗

### 11、TS相比JS增加了什么

### 12、TS中interface和type有什么异同

### 13、promise是如何实现链式调用的

### 14、MutationObserver和ResizeObserver

### 15、为什么会有对象的深浅拷贝

### 16、TS中interface和class的区别

### 17、promise.all、promise.race()、promise.allSettled()有什么区别

### 18、promise.then方法的传参有几个，分别是什么

### 19、在then方法链最后添加了一个catch，then方法里面使用reject回调，catch会捕获到吗？

### 20、原生JS，进入某个页面的时候，地址里面带上了hash值，页面会有什么效果

### 21、JS中如何进行事件绑定（绑定事件的方式）

### 22、addEventListener和onclick=这两种方式有什么区别

### 23、ES的解构是深拷贝还是浅拷贝

### 24、JSON.parse盒JSON.stringfy实现深拷贝有什么缺点

### 25、判断数据类型的方法

### 26、判断一个变量是不是数组有哪几种方法

### 27、ES6的symbol

### 28、微任务盒宏任务；

```js

setTimeout(() => {
    console.log(1)

    new Promise((resolve, reject) => {
        console.log(2);
        resolve();
    }).then(() => {
        console.log(3)
    })
    
    setTimeout(() => {
        console.log(4)
    })

})

new Promise((resolve) => {
    console.log(5);
    resolve()
}).then(() => {
    throw 'nihao'
    console.log(7)
})

console.log(8)

```



### 29、JS的包装类型是什么

### 30、JS中的迭代器

### 31、for...in和for...of的区别

### 32、取到一个对象的所有属性用什么方法

### 33、Reflect和Proxy

### 34、实现交换两个变量的值

### 35、null == 0，null >= 0这两个逻辑表达式的值分别是什么

### 36、js数据精度的问题，如何保证数据做了运算之后，精度不变

### 37、如何实现数组的去重

### 38、promise.all[promise1, promise2, promise3, ....]和async/await promise1  promise2,  promise3区别





## vue

### 1、v-for循环展示列表，为什么要加上key？可以用index当作key吗？

### 2、vue的diff中，key的作用是什么

### 3、vue的响应式是怎么实现的

### 4、vue-router两种模式的区别

### 5、history模式下需要服务端怎么配合

### 6、vuex有哪些属性

### 7、vue中diff怎么实现的

### 8、vue的diff是广度优先还是深度优先

### 9、v-if和v-show的区别，v-show会触发回流吗

### 10、display: none、visibility: hidden的区别

### 11、v-if或者v-show之后，给原本不展示后来新展示的元素聚焦，需要加上nextTick处理吗

### 12、下标的形式直接修改数组的元素，可以实现响应式吗

### 13、vue组件的生命周期，详细说说

### 14、v-if和v-for的优先级

### 15、vue-router的导航守卫有哪些？切换路由时导航守卫触发的顺序是什么？

### 16、项目中用到的导航钩子有哪些？

### 17、vue-router如何传递数据

### 18、说一下keep-alive组件？它的原理是什么？

### 19、vue中虚拟DOM生成的过程

### 20、vue2中，data为什么是一个函数，返回一个对象的形式

### 21、vue中的组件通信的方式

### 22、vue2和vue3有什么区别

### 23、vue3的双向绑定的API为什么要换

### 24、vue中this.$children取到的是什么？顺序？

### 25、Vue中如何定义全局变量

### 26、为什么vue中mixin里面定义的data全局可用

### 27、使用vuex，在页面离dispatch，提交了一个mutation改变了state，state改变了之后是如何实现页面的更新的

### 28、为什么要定义actions去处理异步的操作

### 29、为什么mutation中不能做异步操作

### 30、vue中常用的指令

### 31、v-model是什么的语法糖

### 32、如何定义一个自定义指令

### 33、vue中如何实现事件的定义、触发

### 34、vue的事件和原生事件绑定有什么不同？（绑定的时候加不加括号的区别）

### 35、vue项目中proxy代理的实现原理

### 36、Vue中计算属性和watch的区别

### 37、Vue生命周期这样设计有什么好处

### 38、vue3中diff算法的改进有哪些

### 39、Vue的单向数据流和双向数据流

### 40、vue路由懒加载的原理

### 41、vuex默认是存储在哪里的

### 42、vue2中哪些情况下会导致数据不是响应式的

### 43、vue的单文件组件中，在style标签上加scoped会发生什么？此时如何去修改子组件的样式

### 44、vue的$nectTick的作用和场景

### 45、动态路由import的时候，会传一个注释`/wenpackChunName: xxx/`是做什么的

### 46、基于已有组件进行封装的时候，原组件可能有很多的props、emits、slots，这种怎么处理（怎么处理属性、时间、插槽的透传？）

### 47、怎么把一些没有定义的属性，透传到$attrs里面

### 48、SPA和MPA的区别

### 49、this.$refs是响应式的吗？在computed中使用了this.$refs获取子组件数据，子组件数据变化，可以响应式的改变计算属性吗

### 50、vue2中，更新数组中的某一项，如何实现页面也可以更新

### 51、vue组件的created里面，用原生JS的方式把模板清空（找到这个dom把它清空掉），那么这个清空操作会一直生效吗？**不会**

### 52、vuex的实现原理

我们在页面或者组件中都是通过`this.$store.xxx`的方式来调用的，那么其实，我们只要把你常见的`store对象`赋值给页面或者组件中的`$store变量`即可。

Vuex的原理：**通俗的说就是，利用了全局混入mixin，将你所常见的store对象，混入到每一个vue实例中。**

举个栗子：

```js
import Vue from 'vue';

// 全局mixin，
Vue.mixin({
    created() {
        console.log('滴滴滴~~~'); // 在这里把store赋值给$store属性，就可以实现了
    }
})

const a = new Vue({
    // 什么都没有，但是会输出：滴滴滴~~~
})

const b = new Vue({
    // 什么都没有，但是会输出：滴滴滴~~~
})
```

代码实现：

```js
// vuex.js

let Vue;

const install = (app) => {
    Vue = app;
    // 全局混入
    Vue.mixin({
        beforeCreated() {
            if (this.$options && this.$options.store) {
                // 跟页面，直接将身上的store赋值给自己的$store，这也解释了为什么要把vuex在mian.js入口文件中引入，放到根Vue实例中
                this.$store = this.$opitons.store;
            } else {
                // 除了根页面以外，将上级的$store赋值给自己的$store
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
}

class Store {
    constructor(options) {
        // options接收传入的store对象
        this.vm = new Vue({
            // 确保state是响应式的
            data: {
                state: options.state
            }
        })
        
        // getters
        
        // mutations
        
        // actions
    }
    
    // 获取state时，直接返回
    get state() {
        return this.vm.state;
    }
    
    // commit方法，执行mutations的`name`方法
    commit(name, paylod) {
        this.mutations[name](paylod);
    }
    
    // dispatch方法，执行actions的`name`方法
    dispatch(name, payload) {
        this.actions[name](payload);
    }
}

// 把install方法和类Store暴露出去
export default {
    install,
    Store
}
```

使用：

```js
// store/index.js
import Vue from 'vue';
import vuex from './vuex';
Vue.use(vuex); // 执行install方法，全局混入

export default new vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {}
})
```

```js
// main.js
import store from './store/index'
```









## 网络和浏览器

### 1、浏览器中输入一个URL到页面渲染发生了什么，详细说说。

### 2、浏览器缓存机制。强缓存、协商缓存的标识

### 3、浏览器调试工具的performance

### 4、get和post的区别？有本质上的区别吗？

### 5、cookie、sessionStorage、localStorage有什么区别

### 6、http-only属性是做什么的

### 7、浏览器的同源策略是什么？解决跨域的方法有哪些？

### 8、https和http有什么区别；http1和http2有什么区别

### 9、websocket

### 10、http报文的组成

### 11、常见的安全漏洞有哪些

### 12、http1中的keep-alive是什么

### 13、tcp/ip协议族

###  14、进程、线程、协程是什么？

### 15、URL长链接变为短链接

### 16、开发中针对一个请求，想要修改这个请求的参数，快速的重新发送，如何处理





## 算法和数据结构

### 1、子序列的最大和（leetcode有原题）

### 2、一维数组转树形结构

### 3、实现一个深拷贝，需要考虑循环引用

### 4、实现一个map

### 5、实现一个reduce

### 6、顺时针输出一个二维数组





## 前端工程化

### 1、webpack的sourcemap

### 2、webpack的loader的执行顺序是怎么样的

### 3、webpack怎么处理循环引用的

### 4、什么是前端工程化

**总的来说，前端工程化就是处理代码的一系列工具链，他们并不关心代码的内容，只是把代码作为字符串来进行一些处理。编译构建、CI/CD、代码托管、静态分析、格式化等等都是。**

eg：工程化并不是运行代码，只会处理代码，类似组件库并不属于前端过程化，前端框架还有组件都是运行时才会有的，工程化并不会运行代码，只会处理代码，所以组件库属于前端基建，但不属于前端过程化。



**CI/CD：**

CI/CD是指**持续集成，持续交付与持续部署**的简称。指在开发过程中自动执行一系列脚本来降低开发引入bug的概率，在新代码从开发到部署的过程中，尽量减少人工的介入。



## 其他

### 1、一个新的项目，如何进行技术选型、技术调研

### 2、git rebase和git merge有什么异同

### 前端的包管理器

### npm 

#### npm 1 & 2

初版npm使用了简单的**嵌套结构**来进行版本管理。

这样带来的问题就是：

- 项目里会反复的安装相同的依赖

- 会带来依赖地狱，一直往深处延申

- 不同项目之间会有重复安装的包



#### npm 3

采用**扁平化**的方式，将主依赖项和子依赖项都装到node_modules以及目录下

- 没有完全解决重复依赖的问题，比如，A依赖了B的另一个版本B2，此时B2还是会被嵌套的安装
- 不确定性
- 隐式依赖，因为都平铺的安装到node_modules里面，所有的包，都可以使用require去引入
  - 阅读困难：为什么package.json中没有定义却可以用
  - 引入版本的不确定性，嵌套依赖的包，如果在不知情的情况下版本升级了，可能会有问题



#### npm 5

引入了yarn的lock和缓存机制



### yarn

- 一致性、安全性：增加了lockfiles：记录所有被安装依赖的版本号，安装时优先参考lock文件提供的版本号

- 离线安装：每次从网络下载一个依赖包的时候，yarn会将其放在本地的全局缓存中，下次下载会优先在全局缓存中查找并copy过来
- 性能问题：npm是按照队列执行的，一个package完了之后再去下载另一个。yarn是同步执行所有的任务

### pnpm：可以更小更快的安装我们的依赖

解决多项目之间的复用和隐式依赖的问题

- 多项目之间的复用：
  - 采用**硬链接**的方式。硬链接与平时使用的软连接不同的是，他会直接指向磁盘中原始文件所在的地址。这样的话，多个项目如果有相同的依赖，最终只会有一份依赖文件，减小了占用的空间
- 隐式依赖：
  - 对于同一个依赖包，仅有不同版本之间不同的文件会被存储起来，而不会因为一个文件的改动保存依赖包的所有文件
- pnpm采用的是非扁平的node_modules目录
  - 默认情况下，pnpm的node_modules一级目录下只会存在package.json文件中显式声明的依赖，其他的依赖都放到了.pnpm目录下。内部依赖使用的是软链接的方式。既可以杜绝隐式依赖，又方便查看当前依赖的目录结构，也不会增加额外的存储空间。
- pnpm天然支持monorepo项目，除了可以指定workspace，它还提供了很多指令能够方便的对workspace下的目录做依赖管理
- pnpm的缺点：
  - 自身的锁文件：pnpm-lock，给项目迁移带来了成本
  - 软链接的兼容性，存在一些不能使用的场景
  - 不同应用的依赖是硬链接到同一份文件上的，如果在调试时修改了某个依赖的文件，可能会影响到其他的项目



### monorepo

即：把多个项目放到一个仓库里面，相对立的是传统的multiRepo模式，每个项目对应一个单独的仓库来分散管理。



### 深度优先和广度优先

针对树形DOM结构、树形控件、级联选择器等等场景

- DFS-深度优先

  - 访问跟节点

  - 对根节点的children挨个（递归）进行深度优先遍历

  - ```js
    const dfs = (node) => {
        console.log(node.value);
        node.children.forEach(dfs);
    }
    
    dfs(tree);
    ```

- BFS-广度优先

  - 先访问离根最近的节点

  - 先把同层的节点给遍历完，再去遍历子节点

  - 新建一个队列，把根节点入队，把对头出队并访问

  - 把对头的children挨个入队

  - 重复（循环）2、3步骤，直到队列为空

  - ```js
    const bfs = (node) => {
        let stack = [node];
        
        while(stack.length) {
            let node = stack.shift();
            node.children.forEach(item => {
                stack.push(item);
            })
            console.log(node.value);
        }
    }
    ```


vue组件的生命周期

vue中nextTick

vue中key有什么左右

vuex的作用

用JS实现一个防抖函数


hash：改变hash值，hashchange事件监听变化

history：pushState()   replaceState()   这两个API可以在不刷新浏览器的情况下，操作浏览器的历史记录，实现URL的变化，使用popstate事件来监听url的变化从而对页面进行进行跳转


observer对象：

compiler：负责编译模板，将变量替换为数据，给每一个指令对应的节点绑定更新函数，添加监听数据的watcher，在数据变动的时候，接收通知调用更新函数进行数据更新

Dep对象-订阅器：事件调度中心

Watcher：订阅者



JS分为同步任务和异步任务

同步任务都在主线程上执行，形成一个执行栈

主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件

一旦执行栈中所有同步任务执行完毕，系统就会读取任务队列，将可运行的异步任务添加到可执行栈，开始执行



async/await中，await之前的代码，也是立即执行的。

await等待的是一个表达式，这个表达式的返回值可以是一个promise对象，也可以是其他值

await后面的表达式会先执行一遍，然后将await后面的代码加入到微任务队列中，然后就会跳出整个async函数来执行后面的代码


JS异步：

1、回调函数：回调地狱

2、Promise：链式调用，无法取消promise，错误需要通过回调函数来捕获

3、Generator：可以控制函数的执行

4、async/await：异步的终极解决方案，代码清晰，看起来像同步的代码



HTTP2的多路复用：

多路复用代替了HTTP1.X的序列和阻塞机制，所有的相同域名请求都通过同一个TCP连接并发完成。在HTTP1.X中，发多个请求需要多个TCP链接，浏览器为了控制资源，回6-8个TCP链接的限制



执行npm install时，发生了什么

发出npm install命令

npm向registry查询模块压缩包的位置

下载压缩包，存放在.npm目录

解压压缩包到当前项目的node_modules目录



观察者模式和发布订阅模式：

观察者模式：主体和观察者之间是互相感知的

发布订阅模式：借助第三方来实现调度的，发布者和订阅者之间不是互相感知的
