# 面试笔记（二）

## 皓兴信息

- TS相比JS增加了什么
  - TypeScript给JavaScript添加了可选的静态类型和基于类的面向对象编程，扩展了JavaScript的语法，编译之后，产生的都是JavaScript代码
  - typescript引入了很多面向对象的东西：
    - interface接口
    - class类
    - 泛型
    - 枚举
    - module模块
  - TS在开发时就能给出编译错误，而JS错误需要在运行时才能暴露
  - TS作为强类型语言，可以明确的知道数据的类型，代码的可读性增强
  
- TS中的interface和type有什么区别

  - interface：TS中用于定义接口的关键字。

  - type：类型别名，用来给类型起一个新的名字。让TS看起来会更加的简洁

  - 相同点：

    - 都可以定义一个对象或者函数

      - ```ts
        interface Person {
            name: string;
            age: number
        }
        
        type Person = {
            name: string;
            age: number
        }
        
        interface Func {
            (x: number, y: number): number
        }
        
        type Func = (x: number, y: number) => number
        ```

    - 都允许继承

      - interface使用`extends`继承
      - type使用`交叉类型-&`继承

  - 不同点：

    - type：给一个类型起一个别名，可以作用于原始值、联合类型、元组以及任何其他需要你手写的类型
    - interface：用于定义接口，可以合并重复的声明。类型别名不会合并

- 箭头函数和普通函数的区别

  - this的不同：
    - 普通函数的this是可变的 ，动态的，谁调用的就指向谁，可以通过call、apply、bind改变this的指向
    - 箭头函数没有自己的this，它的this来自父级，是不可改的
  - 箭头函数不能用作构造函数、普通函数可以用作构造函数。构造函数通过new关键字来生成对象的实例，生成对象实例的过程也是通过构造函数给实例绑定this的过程，而箭头函数没有自己的this。
  - 箭头函数不能通过new操作符来调用
  - 箭头函数没有prototype
  - 箭头函数没有arguments（如果有用到，那就是作用域链的原因，用的父级的），普通函数有arguments

- promise如何实现链式调用：**then方法会返回一个promise实例，这是链式调用的根本**

  - Promise/A+的相关规定：
    - then方法必须返回一个promise对象
    - 如果then方法返回的是一个普通值，如Number、String，那么就用此值包装成一个新的promise对象返回
    - 如果then方法没有return语句，就用undefined包装成一个新的promise对象返回
    - 如果then方法中出现异常，则调用失败方法（reject）跳转到下一个then的onRejected
    - 如果 then方法中没有传入任何回调，则继续向下传递
    - 如果then方法中返回了一个promise对象，那就以这个对象为准，返回它的结果

- vue2中，data为什么是一个函数，返回一个对象的形式
  
  - js里面有全局作用域、函数作用域。以函数的形式返回data的数据，保证了在组件复用时，组件间的数据不会互相影响
  
- vue中的组件传值、通信

  - prop/$emit：父子组件间通信

  - ref和$parent和$children：父子组件间通信

    - ref在普通标签上就是指向dom元素，在组件上就是指向组件实例
    - $children返回的是一个组件集合，是当前实例的直接子组件，它并不保证顺序，也不是响应式的。它是根据页面加载组件的顺序去确定子组件在$children中的顺序

  - EventBus：兄弟组件

    - ```js
      class EventBus {
          constructor() {
              this.eventMap = new Map();
          }
          // 注册事件
          addEvent(type, fn) {
              if (!this.eventMap.get(type)) {
                  this.eventMap.set(type, fn);
              }
          }
          // 触发事件
          emit(type) {
              let  handler = this.eventMap.get(type);
              if (handler) {
                  handler.apply(this, [...arguments].slice(1));
              }
          }
      }
      
      import Vue from 'vue';
      Vue.prototype.$bus = new Vue();
      
      // 发消息的组件
      this.$bus.$emit('sendMsg', 'ddd');
      
      // 监听消息的组件
      this.$bus.$on('sendMsg', (data) => {
          console.log(data);
      })
      ```

  - provide/inject：跨层级通信。provide/inject并不是响应式的，需要实现响应式，可以provide祖先组件的this

    - provide对象式写法

      - ```js
          provide: {
              // 不可以访问到this
            message: 'message'
          }
        ```

    - provide函数式写法

      - ```js
          provide() {
            return {
                // 可以访问到this
              message: this.name
            }
          }
        ```

  - $attr和$listener：如果只是传递数据，不做任何其他的处理，可以使用这个。

    - $attr包含父作用域中除了class和style之外的非props属性集合，通过`this.$attr`获取父作用域中所有符合条件的属性集合
    - $listener包含父作用域中除了.native外的监听事件集合，如果还要继续传递，可以使用v-on="$listener"

  - vuex：各种关系中都可以实现数据传递、通信

- v-for循环中为什么加上key

  - Vue在更新使用v-for渲染元素列表时，它默认使用“就地更新”的策略，如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是就地的跟新每个元素，并且确保他们在每个索引位置正确渲染。

  - 判断两个节点是否为同一个节点**（也就是是否可以复用）**，其中一个判断依据就是`key`

    - ```js
      function sameVnode(a, b) {
          return (a.key === b.key && a.tag === b.tag);
      }
      ```

- vue-router的两种模式

  - hash模式：
    - 地址栏中有`#`
    - `location.hash`的值就是URL中`#和#后面的内容`
    - URL中hash值只是客户端的一种状态，也就是说当向服务器发出请求时，hash部分不会被发送
    - hash值的改变，都会在浏览器的访问历史中增加一个记录。因此我们可以通过浏览器的回退、前进按钮控制hash的切换
    - 可以通过a标签，并设置`href`属性，当用户点击这个标签后，URL中的hash值就会发生改变，或者使用相应的JavaScript代码来对location.hash进行赋值，改变URL的hash值
    - 通过对hashchange事件来监听hash值的改变，从而对页面进行渲染跳转
  - history模式：
    - pushState()、replaceState()，可以在不刷新页面的情况下，操作浏览器的历史记录，实现URL的变化
    - 通过对popstate事件来监听url的变化，从而对页面进行跳转
    - 需要后端配合的：因为我们的应用是个单页应用，如果后台没有正确的配置，当用户访问`http://oursite.com/user/id`就会返回404，所以要在服务端增加一个覆盖所有情况的候选资源，即：如果匹配不到任何静态资源，则应该返回同一个index.html页面
  - router-link标签：本质是一个a标签，href属性改变路由
  - router-view标签：内部 使用了`component`动态组件

- vue3和vue2有什么区别：[参考文章](https://juejin.cn/post/6892295955844956167)

  - 生命周期的变化：更加语义化，setup代替了beforeCreate和created
  - option API变为compositionAPI
  - 使用proxy代替Object.defineProperty，实现了真正的代理
    - proxy代理的是整个对象，默认是惰性的，就是说只会观察用于渲染应用程序最初可见的部分数据。vue2中，会在初始化的时候，递归的去处理data中的所有数据
  - diff算法的提升：比如静态节点标记，避免在每次重新渲染的时候创建这些对象，提升内存使用率
  - 对typescript的支持：vue3对TS的支持更好
  - vue3打包体积更小了：模板编译器生成了对tree shaking更加友好的代码，只有在模板中实际使用某个特性时，该代码才会导入
  - 一些API和功能的改动：[见文档-vue2迁移部分](https://link.juejin.cn/?target=https%3A%2F%2Fwww.vue3js.cn%2Fdocs%2Fzh%2Fguide%2Fmigration%2Fintroduction.html%23%25E6%25A6%2582%25E8%25A7%2588)
  - 支持多根节点

- vue3的双向绑定API为什么要换

  - 主流浏览器对新的JavaScript语言特性的普遍支持
  - vue2中，响应式的实现，是通过将data里面的数据用defineProperty进行响应式绑定的，之后加的属性不会被绑定上，也就不会触发更新渲染，vue2无法实现对数组对象深层次的监听。
  - proxy：实现了真正的代理，proxy的配置项有13种，可以更全面实现响应式

- webpack的loader，执行顺序如何

  - loader的执行顺序和他们在rule中配置的顺序、类型(pre,  normal,  post,  inline)、以及loader中的patching中返回的内容有关

- vue中的this.$children取到是什么

  - 取到的是直接子组件的集合，顺序不定，被销毁的子组件不会在这个集合中，这个集合可能会动态的改变

- JS的原型

  - JS中的对象都会有内置属性`__proto__`，这个属性指向了它的构造函数的prototype，然后prototype也是对象，他自己也有`__proto__`这个属性
  - 读取一个对象的属性时，当对象本身没有这个属性时，就会继续访问对象的原型，知道原型为空或者找到这个属性为止。
  - 访问一个对象的原型，可以用Object.getPrototypeOf

- Vue中如何定义全局变量

  - 在mian.js中使用`Vue.prototype`挂载到vue实例上面（可以在一个js文件中定义并导出，然后挂载）

  - vuex中设置全局变量

  - 模块中定义变量，在需要的地方引用

  - **注意：**vue3中声明全局变量：

    - ```js
      // 定义
      app.config.globalProperties.$systemId = 100;
      
      // 使用
      import { getCurrentInstance } from 'vue';
      const systemId = getCurrentInstance()?.appContext.config.globalProperties.$systemId;
      ```

- 为什么Vue中的mixin里面定义的data全局可用

  - ```js
    import mixin from '../mixin.js';
    // 全局注册了mixin
    Vue.mixin(mixin);
    // Vue.mixin这个方法中，mergeOptions这个方法起到了主要的作用，把当前上下文对象的options和和传入的对象做一个合并
    ```

  - 一些前置知识：

    - Vue是一个构造函数 ，通过`new Vue`创建出来的是根实例
    - 所有的单文件组件，都是通过Vue.extend扩展出来的子类
    - 每一个在父组件中的标签或者使用render函数渲染的组件，都是对应子类的实例

  - 概括起来就是：Vue这个类上面的data函数会与子类的data函数合并，得到一个新的data函数，这个新函数会在子类实例化的时候执行，且同时执行父类的data函数和子类的data函数，返回一个合并后的data对象

- websocket

  - websocket是一种在单个TCP连接上进行全双工通信的协议，浏览器和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传递。（半双工：传输过程中只能向一个方向传输，一方传输结束，另一方再回应；全双工：允许数据在两个方向上同时传输）
  - 特点：
    - 建立在TCP之上
    - 与HTTP协议有着良好的兼容性。默认端口也是80和443
    - 数据格式比较轻量，性能开销小，通信高效
    - 可以发送文本，也可以发送二进制数据
    - 没有同源限制，客户端可以与任意服务器通信
    - 协议标识符是`ws（如果加密，就是wss）`
  - websocket连接的过程是：首先，客户端发起http请求，经过3此握手之后，建立起TCP连接。http请求里存放websocket支持的版本号等信息，如: upgrade、connection、websocket-version。然后服务器收到客户端的握手请求之后，同样采用http协议返回数据，最后客户端收到连接成功的消息，开始借助于TCP传输信道进行全双工通信

- http报文的组成

  - 分类：请求报文+响应报文
  - 请求报文：
    - 请求行：`请求方法（GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE）`+`URL`+`HTTP版本协议`
    - 请求头部：一般存放了客户端和服务端之间交互的非业务信息
      - connection：连接管理
      - host：指定请求资源的主机
      - range：请求实体的字节范围
      - user-agent：包含发出请求的用户信息
      - accept：用户代理期望的MIME类型列表
      - accept-language：列出用户代理期望的页面语言
    - 请求数据
  - 响应报文
    - 状态行：`协议版本`+`状态码`+`原因短语`
    - 响应首部：
      - date：消息产生的时间
      - content-length：实体的长度
      - content-type：实体的媒体类型
      - last-modify：上一次修改的时间
      - e-tag：与此实体相关的实体标记
    - 实体（数据）

- 伪元素和伪类有什么区别

  - 伪类：表示被选择元素的某种状态，例如`:hover`
  - 伪元素：表示的是被选择元素的某个部分，这个部分看起来像一个独立的元素，但是是“假元素“，只存在于CSS中
  - 它们的核心区别在于：是否创建了新的元素

- ResizeObserver和MutationObserver

  - MutationObserver：这个接口提供了监视对DOM树所作的更改的能力。更多用于监听属性值的变化

    - `new MutationObserver()`返回了一个新的MutationObserver，他会在指定的DOM发生变化时调用
    - disconnect()：阻止实例继续接收通知，知道再次调用observe
    - observe(dom)：
    - takeRecords()：

  - ResizeObserver：这个接口可以监听到Element的内容区域或SVGElement的边界框改变。它避免了在自身回调中调整大小，从而触发的无限回调和循环依赖。如果浏览器遵循规范，只会在绘制前或者布局后触发调用。---监听一个DOM节点的变化，这种变化包括但不限于`某个节点的出现和隐藏`，`某个节点的大小变化`

    - `new ResizeObserver()`返回一个实例对象，使用构造函数时需要传入一个回调函数，这个回调用于监听实例对象某个DOM节点的变化

    - observe(dom)方法：观察

    - unobserve(dom)方法：取消监听某个DOM节点

    - disconnect()方法：取消对所有节点的监听

    - ```js
      const resizeObserver = new ResizeObserver(entries => {
          console.log('回调。。。。')
          for(let entry of entries) {
              console.log(entry.target.offsetWidth);
          }
      })
      
      resizeObserver.observe(parentNode);
      
      // 定时器，3秒后改变属性值，可以触发观察者
      setTimeout(() => {
          parentNode.style.width = '400px';
          const inputNodes = targetNode.getElementsByClassName('item');
      }, 3000);
      ```

- 为什么有对象的深浅拷贝

  - 本质上是因为JS对基本类型和引用类型的处理不同。基本类型的值就存在栈内存中，引用类型在栈中存的是指向真实数据的地址，真实的数据存在于堆内存中
  - 对象是引用类型，对象变量的值其实是一个地址，指向真正的数据存储的地址
  - 浅拷贝：仅复制对象的引用，而不是对象本身
  - 深拷贝：把复制的对象所引用的全部对象赋值一遍


## 见知数据

- TS中interface和class的概念和区别
  - interface：可以对类的一部分行为进行抽象，也可以对对象的形状的进行描述
  - class：定义了事务的抽象特点，包含它的属性和方法
  - interface是对行为的抽象，具体的行为是由类来实现。interface只负责声明成员变量类型，不做具体的实现，class既声明成员变量类型也可以具体的实现。
  - class可以充当接口使用，当他作为接口使用时，类中构造函数和static静态成员是不在其中的。

- 如何实现纯CSS的换肤

- CSS变量

  - 定义：

    - 原生的变量定义语法：`--*`，在root{}里面定义，使用的语法是`var(--*)`

    - ```css
      root {
          --color: #ff0000;
      }
      
      .box {
          background-color: var(--color);
      }
      ```

## 前程无忧

- h5项目嵌入到客户的APP中，和APP之间的通信时怎么做的？

- 在项目里面抽取了哪些公共方法？（资管系统）

- vuex由哪几个部分组成

  - state
  - getters
  - mutations
  - actions
  - module
  - 修改state：`this.$store.state.count = 1`这样的方式去修改state，数据可以被修改，但是这样的话vuex监听不到你的修改过程
  - 区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。
    事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。

- 使用vuex，在页面里dispatch，提交了一个mutation改变了state，state改变了之后vuex是如何实现页面的更新的？

  - vuex本质上是将state值绑定到了一个`vue对象`上

  - ```js
    class Store {
        constructor(options) {
            this.state = new Vue({
                data: options.state
            })
        }
    }
    ```

- 为什么要定义actions去处理异步的操作

  - mutaiton中不可以进行异步的操作，必须同步执行。

- 为什么mutaion中不能做异步操作

  - Vuex中所有状态变更的唯一途径都是mutation，异步操作通过action来提交mutation来实现，这样方便我们跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好的了解应用
  - 每个mutation执行完成后，都会对应一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现time-traval。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。

- promise的all()、race()、allsettled()的区别

  - all()：所有promise实例变为成功态，就返回成功态，只要有一个是失败态，那就返回失败态。不保证执行的顺序
  - race()：只要有一个promise状态改变，就会返回这个实例的状态
  - allsettled()：所有的结果都返回，才会有返回。不管参数实例是成功的还是失败的

- promise.then()方法的传参？

  - 第一个是成功态的回调
  - 第二个是失败态的回调

- 在then方法链最后加了一个catch，then方法里面使用了reject回调，catch会捕获到吗？

  - then方法，为promise实例添加实例状态改变时的回调函数，两个参数一个是成功态的回调、一个失败态的回调

  - catch方法，是`then(null, rejection)`或`then(undefined, rejection)`的别名，用于指定发生错误时的回调

  - ```js
    p.then((val) => console.log('222')).catch((err) => console.log('333'))
    // 等同于
    p.then((val) => console.log('444')).then(null, (err) => console.log('555'))
    ```

- vue-router的hash模式的特点、实现原理

  - locations.hash的值。`#及其后面的值`
  - 改变location.hash的值，通过`hashchange`事件进行监听，来跳转页面，进行渲染

- 原生JS，进入某一个页面的时候，地址里面带上了hash值，页面会有什么效果

  - 锚点定位的效果

- vue中常用的指令

  - v-if
  - v-show
  - v-model
  - v-bind
  - v-on
  - v-for
  - v-html

- v-model是什么的语法糖

  - value属性+input事件

  - 可以在model选项中自定义v-model

  - ```js
    model {
        prop: 'value';
        event: 'input'
    }
    ```

- vue的自定义指令，如何定义一个自定义指令

  - 全局注册：`Vue.directive(‘指令名称’, {配置项})`方法，传递一个配置项 ，配置项中是具体指令的定义

  - 局部注册：组件的directives选项：

    - ```js
      directives: {
          focus: {
              bind: function(el, binding, vnode) {}
              inserted: function(el, binding, vnode) {}
              update: function(el, binding, vnode, oldVnode) {}
              componentUpdate: function(el, binding, vnode, oldVnode) {}
              unbind: function(el, biding, vnode) {}
          }
      }
      ```

  - 自定义指令的钩子函数：

    - bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次初始化设置
    - inserted：被绑定元素插入到父节点时调用
    - update：所在组件的VNode跟新时调用，但是可能发生在其子VNode跟新之前。指令的值可能发生了改变，也可能没有
    - componentUpdated：指令所在的组件VNode及其子VNode全部跟新之后调用
    - unbind：只调用一次，指令与元素解绑时调用

  - 钩子函数的参数：

    - el：指令所绑定的元素，可以用来直接操作DOM，就是放置指令的那个元素
    - binding：一个对象，里面包含了几个属性
      - name：指令名称
      - value：指令的绑定值。v-focus="1+1"，2
      - oldValue：指令绑定的前一个值。
      - express：字符串形式的指令表达式。v-focus="1+1"，‘1+1’
      - arg：传递给指令的参数。v-focus:src，'src'
      - modifies：一个包含修饰符的对象。v-focus.obj.native，`{ obj: true, native: true }`
    - vnode：
    - oldVnode：上一个虚拟DOM节点，仅在update和componentUpdate钩子中可以调用

- vue的事件

  - Vue提供了四个事件API：`$on、$once、$off、$emit`，来定义、触发事件
    - $on：用来在vm实例上监听一个自定义事件，可以使用$emit来触发
      - $on内部采用的是发布订阅模式。定义一个事件中心，通过$on订阅事件，然后通过$emit触发事件中心里面存储的订阅事件
      - $on(eventName, callback)：第一个参数是事件名称，第二个参数是回调函数。内部会先判断传入的事件是不是一个数组，如果是一个数组，那就循环数组，给每个元素都调用this.$on方法，如果不是，那就当作单个事件处理，以该事件名作为key，尝试在当前实例的_events属性中获取对应的事件列表，如果获取不到就就给其赋值为空数组为默认值，然后将回调函数push进去
    - $emit：触发指定的自定义事件
      - 从当前实例的_events属性（即：事件中心）中获取到事件名对应的回调函数数组，然后再获取传入的附加参数，遍历执行回调函数
    - $once：监听一个只能触发一次的事件，在触发以后会自动移除该事件
    - $off：用来移除自定义事件

- vue的事件和原生JS的事件绑定有什么不同？（绑定的时候加不加括号的区别）

  - ```js
    function func(a) {
        console.log(a);
    }
    ```

  - vue：

    - 事件绑定时不加括号

      - ```js
        @click="func"
        // alert会触发，a为事件对象
        ```

    - 事件绑定时夹砂管括号

      - ```js
        @click="func()"
        // alert会触发，a为undefined
        ```

  - JS：在JS中绑定事件，是不需要加括号，除非绑定的是一个高级函数，返回了另一个函数。因为**函数的运行优先级是高于绑定的，加了括号，会先执行函数，再绑定**，加括号运行，绑定的是运行的结果

    - ```js
      // 普通函数，不应该加括号
      dom.onclick = func
      
      // 高级函数，可以加括号,绑定的是返回的那个函数
      dom.onclick = func();
      ```

  - html：再html标签中绑定的事件，触发时，是把引号内代码整体运行，如果没有加括号就不会运行

    - ```html
      <button onclick="func()"></button>
      
      // 相当于
      
      dom.onclick = function(event) {
      	return func(event)
      }
      ```

- JS中如何进行事件绑定？

  - ```js
    dom.onclick = function(event) {}
    ```

  - ```js
    dom.addEventlistener('click', function(event) {})
    ```

  - ```html
    <div onclick="func()"></div>
    ```

- `addEventListener`和`onclick=`这两种方式有什么区别？

  - `addEventListener`可以给同一个元素绑定多个事件，执行顺序从上往下依次执行。onclick同一个元素只能绑定一个事件，若绑定多个，后面的会覆盖前面的
  - 移除事件时，addEventListener对应的是removeEventListener，且addEventListener绑定的要是外部函数或者有名字的函数。onclick绑定的事件要移除，使用onclick=null
  - addEventListener函数的第三个参数`useCpture`，可以指定冒泡还是捕获

- v-if和v-show有什么区别

- v-show会触发浏览器的回流（重排）吗

- 哪些css属性的改变会引起重绘而不会引起回流

- 使用transform对某个div进行了位移，会引起回流吗

  - 不会。transform只是在视觉上做出了修改，元素本身的位置没有改变，就不会引起回流
  - **tips：**transform的执行顺序是从右往左执行的，形变的基准点是元素中心

- h5的不同屏幕分辨率怎么适配的？

- rem适配的原理是什么？

  - rem是相对单位，相对于根元素font-size计算值的倍数的一个CSS单位。常做移动端适配。
  - 核心思想：百分比布局可以实现响应式的适配，rem相当于百分比布局
  - 实现：动态的获取当前视口的宽度，除以一个固定的数n，得到rem的值。`rem = width / n`。此时rem始终为width的n等分

- CSS的盒模型是什么？

  

## 作业帮

- 给两个div分别设置`transform: translateX(400px) scale(.5)`，`transform: scale(.5) translateX(400px)`，会有什么不同吗？

- 跨域的解决方法有哪些？

  - 产生的原因：浏览器的同源策略。同源策略会影响这些行为：cookie、localStorage、IndexDB无法读取；DOM和JS对象无法获取；AJAX请求不能发送

  - jsonp：

    - 原理：利用script标签没有跨域限制的特点。通过src属性，发送带有callback参数的GET请求，服务端将接口返回的数据拼凑操callback中，返回给浏览器，从而前端拿到callback函数返回的数据。**（个人理解就是，函数定义在客户端，函数的调用放在服务端）**

    - 缺点：只能发送GET一种请求

    - ```js
      // 实现一个简单的服务端
      
      const http = require('http');
      
      let server = http.createServer();
      
      server.on('request', function(req, res) {
          let paramsStr = req.url.split('?')[1].split('&');
          let params = {};
          paramsStr.forEach(item => {
              let temp = item.split('=');
              params[temp[0]] = temp[1];
          })
          let fn = params.callback;
      
          // jsonp返回的设置
          res.writeHead(200, { 'Content-type': 'text/javascript' });
          res.write(fn + '(' + JSON.stringify(params) + ')');
      
          res.end();
      })
      
      server.listen('8081');
      console.log('server is running...')
      
      ```

    - ```html
      <script>
      	let script = document.createElement('script');
          script.type = 'text/javascript';
          
          // 回调函数作为参数传给后端，方便后端返回时执行这个在前端定义的回调函数
          script.src = 'http://www.baidu.com?user=admin&callback=handlerCallback';
          document.head.append(script);
          
          // 回调函数执行
          function handlerCallback(res) {
              alert(JSON.stringfy(res));
          }
      </script>
      
      
      服务端返回的（返回时会立即执行全局函数）
      handlerCallback({ "success": true, "user": "admin" });
      ```

  - CORS（跨域资源共享）：

    - 浏览器将CORS请求分为简单请求和非简单请求。
      - 简单请求：
        - 使用的方法：GET、POST、HEAD
        - 请求的Header：`Accept`、`Accept-language`、`Content-language`、`Content-type只限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain`
      - 非简单请求：不满足上面的条件。会在正式通信之前增加一次HTTP查询请求，称为`预检`。预检使用的方法是`option`请求方法。
    - CORS请求的响应头设置
      - **Access-Control-Allow-Origin**：必选。值是请求时的origin字段，或者 *。
      - **Access-Control-Allow-Credentials**：可选。布尔值，标识是否可以发送cookie。默认情况下，cookie不包括在CORS请求中。设置为true，即表示服务器许可，cookie可以包括在请求中发送给服务器。
      - **Access-Control-Expose-Headers**：CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定

  - nginx反向代理：

    - 实质和CORS跨域原理一样，通过配置文件设置请求响应头`Access-Control-Allow-Origin`等字段

  - postMessage：

    - ```js
      window.postMessage(data, origin);
      
      window.addEventListener('message', function(){
          
      })
      ```

- vue项目中proxy的底层原理

  - Vue项目中，通过proxy配置反向代理，使浏览器将axios发送的带有api前缀的请求发送到***\*前端代理服务器\****，再通过`前端代理服务器发送给后端服务器`，避免了跨域无法访问的问题。vue反向代理替换的只是原请求地址的域名，不是标识符之前的所有内容。

- 浏览器的存储方式：cookie，sessionStorage、localStorage、IndexDB

- ES6的解构是深拷贝还是浅拷贝

  - 浅拷贝

- 深拷贝的实现方式

  - lodash中的deepClone
  - JSON.parse(JSON.stringfy)
  - 递归实现

- JSON.parse、JSON.stringfy实现深拷贝有什么缺点？

  - 会过滤掉属性值为undefined、函数的属性

- JSON.parse()的参数是对象的话，会报错。可以使用`try...catch`去捕获错误

- 判断数据类型的方法

  - typeof
  - instanceof
  - Object.prototype.toString()

- 实现一个深拷贝，需要考虑循环引用。

  - ```js
    function deepClone(obj, hashMap = new WeakMap()) {
        if (!obj || typeof obj !== 'object') return;
        let newObj = Array.isArray(obj) ? [] : {};
    
        const hash = hashMap.get(obj);
    
        if  (hash) return hash;
    
        hashMap.set(obj, newObj);
    
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                newObj[key] = deepClone(obj[key], hashMap);
            } else {
                newObj[key] = obj[key];
            }
        }
        
        return newObj;
    }
    ```

- 判断是不是数组的方法：

  - Array.isArray(arr)：返回一个布尔值

- vue中父子组件中的通信

- 遍历数组的时候为什么要加上key

- vue2中更新数组里面的某一个值，实现页面也可以自动更新

  - Object.defineProperty？？？还不是很理解
  - 使用数组的splice方法，替换元素的方式去修改
  - this.$set去修改数组的元素
  - this.$forceUpdate()

- vue中一个三维数组，更新某一个字段之后，实现页面也自动更新了

- 微任务和宏任务

  - ```js
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

  - 微任务中，抛出了一个错误，但是只是阻断了这个微任务线程的执行，没有阻断整个进程的执行

  - 若是在setTimeout（宏任务）中抛出错误，会阻断进程


