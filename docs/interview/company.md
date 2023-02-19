# 面试整理 - 按照公司划分的

**字节跳动**

- 自我介绍

- 介绍项目

- 浏览器输入一个URL到页面渲染发生了什么，详细说说

- 页面中的JS需要提前加载，不阻塞页面渲染，怎么做

- 浏览器缓存机制。强缓存、协商缓存的标识。

  - 强缓存：Expires、Cache-control。缓存数据库中有数据，且没有过期，就直接从缓存数据库中取，不请求服务器，有数据但是缓存失效，就请求服务器，服务器返回数据和缓存规则，将数据和缓存规则存入缓存数据库中
  - 协商缓存：Etag/If-None-Match；If-Modify-Since/Last-Modified。从缓存数据库中获取缓存规则，请求服务器验证是否失效，没有失效则返回304，直接从缓存中读取数据，失效的话就会返回新的数据和缓存规则， 并存入缓存数据库中。
  - network中的size这个选项，可以看到来源信息

- CSS盒模型由几种。怎么去设置盒模型

- 如何实现一个元素的水平垂直方向上的居中

- 对象和数组，如何区分哪个是对象哪个是数组

- 改变this指向的方法

- v-for循环展示列表，要加上key。可以用index当作key吗

  - 需要增、删的场景不可以使用key

- vue的diff中，key的作用是什么

  - 在vue中，判断节点是否可复用，都是以key值作为判断的前提条件，如果不使用key值，就会默认更新所有节点。
  - key是Vue中虚拟dom的唯一标记，通过这个key，我们的diff操作可以更加的准确和快速
    - 更准确：用了key之后，就不是简单的就地复用。key会作为比较前后两个节点是不是一个节点的依据
    - 利用key的唯一性生成map对象来获取对应节点，比遍历的方式更快

- vue的响应式是怎么实现的

  - **observer对象**：用来对象数据对象进行遍历，使用了Object.defineProperty这个API，给对象的属性都加上getter和setter的拦截
  - **compiler解析器**：用来编译模板、解析vue里面的指令，会将模板里面的变量都替换成数据，然后渲染页面，并且会给每一个指令对应的节点绑定一个更新函数，并添加监听数据的订阅者，一旦数据发生变化，就会收到通知调用更新函数进行数据更新
  - **Dep订阅器**：采用发布订阅模式，用来收集Watcher，对Observer和Watcher进行统一管理
  - **Watcher订阅者**：是Observer和Compiler之间通信的桥梁，主要的任务是订阅observer中属性值变化的消息，当收到属性值变化的消息，触发compiler解析器中对应的更新函数

- vue-router两种模式的区别

- history模式，需要服务端怎么配合

  - 之所以刷新页面白屏，其实是因为路由找不到对应的资源，就会404，为了避免这种情况的发生，可以让所有的路由都指向index.html

  - **前端方面的配置**：

    - 首先要设置路由的mode和base两个值

      - ```js
        const routes = [];
        const router = new VueRouter({
            mode: 'history',
            base: process.env.BASE_URL,
            routes
        })
        ```

    - 其次要设置vue.config.js里面的publicPath

      - ```js
        module.exports = {
            /**
            publicPath默认值是 '/'，即你的应用是被部署在一个域名的跟路径上，
            设置为 ./  可以避免打包后的静态页面空白
            当在非本地环境时，这里以项目test-daily为例，即打包后的后h5项目部署在服务器的test-daily目录下，那么这里就要把publicPath设置为  /test-daily/，表示所有的静态资源都在 /test-daily/里
            打包部署后，会发现index.html引用的静态资源都添加了路径 /test-daily/
            **/
            
          	publicPath: process.env.NODE_ENV == 'development' ? './' : '/test-daily/',
        }
        ```

- 页面性能，performance会关注吗

- 看输出

- 算法题







**汤臣倍健**

- 自我介绍

- 介绍项目

- 一个新的项目，如何进行技术选型、技术调研

- CSS选择器

  - 基础选择器
    - id
    - class
    - 标签
    - 通配符
  - 属性选择器
  - 伪类选择器
  - 伪元素选择器
  - 组合选择器

- CSS选择器的优先级

  - id > class 、属性、伪类> 标签、伪元素 > 通配符

- 基本数据类型和引用数据类型的区别

- get和post的区别，本质上由区别吗
  
  - 本质上没有区别。
  
- vuex有哪些属性

- 如何实现一个水平垂直方向上的居中

- rem是什么

  - rem的值是px的倍数

- vue中的diff是怎么做的

- vue的diff是深度优先还是广度优先
  
  - 深度优先
  
- vue-router的两种路由模式有什么区别

- 箭头函数和普通函数区别

- call、apply、bind的区别

- 浏览器发送一个http请求的过程中发生了什么

- 简单说一下原型链
  - 当访问一个对象的属性时，如果这个对象本身不存在这个属性，就会去它的构造函数的`prototype`属性中寻找上查找，依次类推
  - 对象都有一个`__proto__`属性
  - 函数都有一个`prototype`属性
  
- cookie、sessionStorage、localStorage有什么区别

- http-only属性是做什么的

- 闭包

- 浏览器的同源策略。解决跨域的方法有哪些

- 如何实现深拷贝

- HTTPS和HTTP有什么区别
  - HTTPS：以安全为目标，是具有安全性的SSL加密传输协议，端口是443
  - HTTP：超文本传输协议，信息是明文传输，端口是80
  
- 多端自适应-媒体查询：CSS3的 @media

  - ```css
    @media mediaType and|not|only (media feature) {
        /* CSS-Code */
    }
    ```

  - mediaType：

    - all：所有屏幕
    - screen：电脑屏幕，平板电脑，智能手机
    - print：打印机，打印预览
    - speech：屏幕阅读器等发声设备

  - media feature：媒体功能

    - min-width：页面最大宽度
    - max-width：页面最小宽度

  - ```css
    
    @media (max-width: 1280px) {
      body {
        background: pink;
      }
    }
     
    @media (min-width: 1281px) and (max-width: 1366px) {
      body {
        background: red;
      }
    ```

    





**树维信息**

- forEach和map的区别
  - map：会创建一个新的数组，其结果是在调用数组中的每个元素上调用提供的函数。不改变原数组。
  - forEach：针对每个元素执行提供的函数。不会返回新数组，不会改变原数组（当数组中的元素是值类型，不会改变数组，当 数组中的元素是引用类型，可以改变数组）
- Vue中虚拟DOM解析的过程
  - 虚拟DOM：
    - 用对象属性来描述节点，实际上它是一层对真实DOM封装。定义了真实DOM的一些关键性的信息，将原本需要在真实DOM上进行的创建节点、添加节点等一系列复杂的DOM操作，全部放到虚拟DOM中执行。将vnode更新的地方用diff算法来更新只修改了的地方，可以避开很多无谓的修改。
  - render函数之后，生成了vnode。
- Vue中key的作用:
  - key会作为diff算法中，比较两个节点是否为同一个节点依据之一。
  - key重复、复用，会造成dom复用的错误

- 一维数组转树形结构

  - ```js
    // 递归方式
    const arrayToTree = function (nums, pId) {
        // 找到有相同父元素的元素（找子元素）
        let flag = nums.filter(item => item.pId === pId) || [];
    
        return flag.length === 0
            ? []
            : flag.map(item => {
                  let obj = { id: item.id, pId: pId, children: arrayToTree(nums, item.id) };
                  return obj.children.length === 0 ? { id: item.id, pId: pId } : obj;
              });
    };
    
    let arr = [
        {
            id: 1,
            pId: null,
            name: '1',
            children: [],
        },
        {
            id: 2,
            pId: 1,
            name: '2',
            children: [],
        },
        {
            id: 3,
            pId: 4,
            name: '3',
            children: [],
        },
        {
            id: 4,
            pId: 1,
            name: '4',
            children: [],
        },
        {
            id: 5,
            pId: 8,
            name: '5',
            children: [],
        },
    ];
    
    console.log(arrayToTree(arr, null));
    ```

  - for循环嵌套，查找外层循环的子元素





**东方财富**

- **v-if、v-show和display:none**

  - v-if：DOM节点直接消失，视觉上看不到，也没有位置，dom节点也不在
  
    - v-show：调用display: none来控制元素是否展示
  
    - display：none：物理空间消失，但是dom还在（视觉上看不到了，也没有位置，但是dom还在）


  - visibility: hidden：物理空间和dom都在，只是视觉上看不到了


  - v-if或者v-show之后，要给某个新展示的元素聚焦，需要将focus用nextTick包裹

- computed和watch

  - computed是计算属性，依赖其他属性值，computed的值是有缓存的，只有它依赖的属性值发生改变，下一次获取computed的值时，才会重新计算computed的值。 ---  需要进行计算，并且依赖于其他数据时，使用computed，利用了computed缓存的特性，避免每次都重新计算
  - watch更多的是观察的作用，类似于某些数据的监听回调，每当监听的数据变化时，都会执行回调。 ---  需要在数据变化时执行异步或者开销较大的操作时，使用watch

- 下标的方式修改数组

  - 通过下标的方式修改数组，不能实现响应式，可以使用`this.$set`、`splice方法`

- vue生命周期：开始创建、初始化数据、编译模板、挂载DOM-->渲染、更新--渲染、卸载等。

  - beforeUpdate：（发生在虚拟DOM打补丁之前）当执行到这个钩子的时候，页面中显示的数据还是旧的，此时data中的数据是新的，只是页面还没有和最新的数据保持同步
  - beforeDestory：Vue进入到了销毁阶段，此时，实例身上的所有data、methods、过滤器、指令等，都处于可用的状态
  - destoryed：实例身上的所有data、methods、过滤器、指令等，都不可用的
  - ![1.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/19/16ca74f183827f46~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
  - ssr中：beforeCreated和created之外的生命周期不能使用（服务端渲染和前端渲染的区别：服务端渲染没有实际的dom结构）

- v-for和v-if的优先级

  vue2中：v-for的优先级比v-if的优先级高

  vue3中：v-if的优先级比v-for的优先级高

- Vue-router导航守卫

  - 全局导航守卫：任何路由跳转都会调用这个钩子函数
    - 前置守卫：`beforeEach(to, from, next) => {}`
    - 解析守卫：`beforeResolve(to, from, next) => {}`，在`beforeRouteEnter`之后调用
    - 后置守卫：`afterEach(to, from) => {}`
  - 路由独享守卫：在路由对象内部的，进入该路由前被调用
    - `beforeEnter(to, from, next) => {}`，在全局前置守卫后面调用，只在进入路由时触发
  - 组件导航守卫：定义在组件内部的
    - 在该组件对应的路由被进入之前调用：`beforeRouteEnter(to, from, next) => {}`，在路由独享守卫后面调用，还不能获取到组件实例`this`，此时组件实例还没有创建
    - 在该组件被复用的时候：`beforeRouteUpdate(to, from, next) => {}`。当前路由改变，但是组件被复用了。比如带有动态参数的路径`/foo/:id`
    - 在该组件对应的路由离开之前调用：`beforeRouteLeave(to, from, next) => {}`，此时还可以访问组件的实例this
  - 导航解析的流程：
    - 导航被触发
    - 失活的组件内触发`beforeRouteLeave`钩子函数，离开当前组件
    - 触发全局导航前置守卫`beforeEach`
    - 若组件复用触发组件守卫`beforeRouteUpdate`
    - 路由配置中的`beforeEnter`
    - 根据路由配置，解析、加载异步路由组件
    - 在被激活的组件中调用`beforeRouteEnter`
    - 调用全局的解析守卫`beforeResolve`
    - 导航被确认
    - 调用全局的后置守卫`afterEach`

- 项目中用到的vue-router导航钩子

  - `beforeEach`：每一个路由切换都会触发这个钩子
    - 1、改变浏览器标签页的名称：`document.title = getPageTitle(to.meta.title)`，getPageTitle中可以做一些非空判断的处理
    - 2、根据token判断有没有登录，没有登录则跳转到登录页。跳转使用`next({ 路由 })`
    - 开始展示页面加载的进度条
  - `afterEach`：结束页面加载的进度条

- vue-router数据传递

  - 动态路由匹配：

    - ```js
      const routes = [
          { path: '/users/:id', component: User }
      ]
      
      `users/12345`会匹配到这个路由
      
      params: {
          id: 12345
      }
      
      this.$route.params.id访问到具体的值
      ```

  - 编程式导航：

    - `path和query匹配`。`name和params匹配`

    - ```js
      this.$router.push({
          path: '/dashboard',
          query: {
              id: 123
          }
      })
      ```

    - ```js
      this.$router.push({
          name: 'Dashboard',
          params: {
              id: 7809
          }
      })
      ```

    - ```js
      this.$router.push(`/dashboard`)
      ```

- vue-router路由对象：

  - fullpath
  - hash
  - matched：是一个数组，数组第一项是本身或者父级
  - name
  - params
  - query
  - path

- vue-router滚动行为：使用前端路由，当切换到新路由时，想要页面滚动到顶部，或者保持原先的滚动位置，vue-router可以自定义路由切换时页面如何滚动。

  - 创建router实例时，可以提供一个scrollBehavior方法

  - ```js
    const router = new Router({
        routes: [],
        scrollBehavior(to, from, savedPosition) {
            // return 期望滚动到哪个位置
            if (savedPosition) {
                // 返回savedPosition，在按下浏览器的后退、前进、按钮时，就会像浏览器的原生表现那样
                return savedPosition;
            } else {
            	return { x: 0, y: 0 }
            }
        }
    })
    ```

  - 返回值的数据结构，返回空对象则不会发生滚动。behavior: 'smooth' 平滑滚动

  - ```js
    { x: number, y: number }
    { selector: string, offset?: { x: number, y: number }, behavior: 'smooth' }
    ```

  - 模拟滚动到锚点的行为

  - ```js
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
    ```

    





**见知数据**

- webpack的sourcemap
  - 编译后的源文件映射，在devtool选项配置
  - 打包之后，开发环境中源代码经过压缩、去空格、babel编译转化，处理之后的代码和源代码之间差异性很大，会造成无法debug的问题
  - 构建了处理前和处理后的代码之间的桥梁，方便开发人员定位问题
  
- git rebase  和 git merge：都可以将一个分支的修改合并到另一个分支。
  - merge：安全的操作，现有的分支不会被更改。会引入一个外来的合并提交，可能会污染分支的历史
  - rebase：将另一个分支上面的新的提交并入过来，是为原分支上面的每一个提交创建了一个新的提交，重写了项目历史，并且不会带来合并提交，但是合并完了之后，你并不清楚哪些提交是被合并过来的。
  
- keep-alive：Vue内置的一个组件，可以使被包含组件保留状态，避免重新渲染
  - 一般是结合路由和动态组件一起使用，用于缓存组件
  
    - ```html
      <!--缓存动态组件-->
      <keep-alive>
          <component is="componentName"></component>
      </keep-alive>
      ```
  
    - ```html
      <!--缓存路由组件：大多数的使用场景-->
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
      ```
  
  - 提供了include、exclude属性，两者都支持字符串或正则表达式或数组，include表示只有名称匹配的组件会被缓存，exclude表示任何匹配名称的组件都不会被缓存，exclude的优先级比include高。**会首先匹配组件的name选项，name不可用时匹配局部注册名（父组件的components选项的值）**
  
  - 有两个对应的生命周期函数，被激活时-activated，组件被移除时-deactivated
  
    - activated：在组件第一次被渲染的时候就会调用，之后每次在组件激活时也会被调用，一般在mounted之后，beforeRouteEnter之前。组件被缓存了，再次进入组件时，不会触发前四个钩子函数
    - deactivated：组件被停用（离开路由）时调用。组件也没有销毁阶段的生命周期钩子，这个可以替代beforeDestory
  
  - 它自身不会渲染一个DOM元素，也不会出现在父组件链中
  
  - 使用了keep-alive之后，就不会调用`beforeDestory`，`destoryed`钩子
  
  - 用了keep-alive包裹的组件，想再刷新页面，这么做？？？
  
- keep-alive的原理：

  - 在keep-alive组件的created：初始化一个cache数组，keys数组，前者用来缓存组件的虚拟dom集合，后者用来缓存组件的key集合
  - 在keep-alive组件的mounted：实时监听include，exclude这两个的变化，并执行响应的操作
  - 在keep-alive组件的destoryed：删除掉所有缓存相关的东西

- BFC：块级格式上下文，它是一个独立容器，决定了元素如何定位、与其他元素之间的关系和相互作用。
  - 特点：
    - BFC内部的元素和外部的元素不会互相影响
    - 内部的盒子在垂直方向上从上到下排列，盒子垂直方向上的间距由margin决定
    - 同一个BFC中的盒子依然会margin重叠，不同的BFC则不会
      - 根元素body就是一个BFC，如果没有其他的BFC的情况下就会发生margin重叠，但是如果在重叠元素上触发一个BFC，那他和body就是两个不同的BFC，则不会再发生margin重叠
    - 计算BFC的高度时，浮动元素的高度也参与计算
  - 如何触发BFC：
    - float不为none
    - overflow不为none
    - display的值为inline-block，table-cell，flex，table
    - position的值为absolute、fixed
  
- 如何隐藏一个元素
  - display: none，被隐藏的元素，物理位置不在了，会导致页面的重排和重绘，元素消失后，自身绑定的事件不会触发
  - visibility: hidden，被隐藏的元素还是保持原来的位置，但是无法绑定事件，会发生重绘
  - opacity: 0，页面上还会保留完整透明的元素，并且还可以绑定事件，会发生重绘
  - 设置width，height为0，若有子元素还要设置overflow:hidden
  - position: absolute，将元素移出页面，top和left给一个很大的值
  
- 重排和重绘
  
  - 如何避免重排和重绘
    - 避免多次操作DOM，合并在一起去操作
    - 避免使用table布局，一个小修改，可能引起整个table的修改
  
- 遍历数组的方式的区别：for循环、foreach、for...in、for...of

  - for...in：遍历得到的是key，遍历对象的，不可遍历Map、Set、Generator。**用于可枚举（enumerable: true）的数据，如对象、数组、字符串**，还会遍历到原型上的key
  - for...of：遍历得到的是value，遍历数组、Map、Set、Generator。**用于可迭代（[symbol.iterator]）的数据，如数组、字符串、Map、Set**，可以配合continue、break、return使用

- for...in可以遍历set和map吗

  - 不可以。for...in用于遍历可枚举的变量类型，set和map不是可枚举的



**皓兴信息**

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

    - 

- 为什么有对象的深浅拷贝

  - 本质上是因为JS对基本类型和引用类型的处理不同。基本类型的值就存在栈内存中，引用类型在栈中存的是指向真实数据的地址，真实的数据存在于堆内存中
  - 对象是引用类型，对象变量的值其实是一个地址，指向真正的数据存储的地址
  - 浅拷贝：仅复制对象的引用，而不是对象本身
  - 深拷贝：把复制的对象所引用的全部对象赋值一遍





**见知数据**

- TS中interface和class的概念和区别
  - interface：可以对类的一部分行为进行抽象，也可以对对象的形状的进行描述
  - class：定义了事务的抽象特点，包含它的属性和方法
  - interface是对行为的抽象，具体的行为是由类来实现。interface只负责声明成员变量类型，不做具体的实现，class既声明成员变量类型也可以具体的实现。
  - class可以充当接口使用，当他作为接口使用时，类中构造函数和static静态成员是不在其中的。

- 如何实现纯CSS的换肤

  - 

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



**前程无忧**

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

  

**作业帮**

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



**前程无忧**

- Vue中计算属性和watch有什么区别？

  - 计算属性支持缓存，只有依赖数据发生改变，才会重新进行计算。不支持异步
  - 监听属性watch不支持缓存，实时监听数据的变化，支持异步。
  - 实现上的区别：

- 手写实现map方法：

  - ```js
    Array.prototype.myMap = function(fn) {
        if (!Array.isArray(this) || typeof this !== 'object') return;
        
        let newArr = [];
        this.forEach((item, index) => {
            newArr.push(fn(item, index, this));
        })
        
        return newArr;
    }
    ```

- 手写实现reduce方法：

  - ```js
    Array.prototype.myReduce = function(fn, initData) {
        let acc = initData || this[0];
        let startIndex = initData ? 0 : 1;
        
        for (let i = startIndex, i < this.length; i++) {
            acc = fn(acc, this[i], i, this);
        }
        
        return acc;
    }
    ```







**腾讯**

- 手写实现：顺时针输出数组元素

  - ```js
    function func(arr) {
        let retArr = [];
        let index = 0;
        // 标识方向：0-向下；1-向上
        let flag = 1;
    
        while (arr.length) {
            if (index == 0 && flag == 1) {
                retArr.push(...arr[index]);
                arr.splice(index, 1);
                flag = 0;
                // index++;
            } else if (index == arr.length - 1 && flag == 0) {
                let len = arr.length;
                retArr.push(...arr[len - 1].reverse());
                arr.splice(index, 1);
                index--;
                flag = 1;
            } else {
                if (flag == 0) {
                    // 向下
                    let len = arr[index].length;
                    retArr.push(arr[index][len - 1]);
                    arr[index].splice(len - 1, 1);
                    index++;
                } else {
                    // 向上
                    console.log(index, arr[index]);
                    retArr.push(arr[index][0]);
                    arr[index].splice(0, 1);
                    index--;
                }
            }
        }
    
        return retArr;
    }
    
    let arr = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20]
    ]
    
    let ret = func(arr);
    console.log(ret);
    
    [
       1,  2,  3,  4,  5, 10, 15,
      20, 19, 18, 17, 16, 11,  6,
       7,  8,  9, 14, 13, 12
    ]
    ```

  - ```js
    function func(arr) {
        let retArr = [];
        let len_i = arr.length;
        let len_j = arr[0].length;
    
        let i_init = 0; // 第一个下标序号
        let j_init = 0; // 第二个下标序号
    
        let i_end = arr.length - 1;
        let j_end = arr[0].length - 1;
    
        // left_right  top_bottom  right_left  bottom_top
        let direction = 'left_right';
        let count = 0;
        let all = len_i * len_j;
    
        while(count < all) {
            switch (direction) {
                case 'left_right':{
                    for(var i = i_init, j = j_init; j <= j_end; j++, count++) {
                        retArr.push(arr[i][j])
                    }
    
                    direction = 'top_bottom';
                    i_init++;
                    break;
                }
                case 'top_bottom':{
                    for(var i = i_init, j = j_end; i <= i_end; i++, count++) {
                        retArr.push(arr[i][j])
                    }
        
                    direction = 'right_left';
                    j_end--;
                    break;
                }
                case 'right_left':{
                    for(var i = i_end, j = j_end; j >= j_init; j--, count++) {
                        retArr.push(arr[i][j])
                    }
        
                    direction = 'bottom_top';
                    i_end--;
                    break;
                }
                case 'bottom_top':{
                    for(var j = j_init, i = i_end; i >= i_init; i--, count++) {
                        retArr.push(arr[i][j])
                    }
        
                    direction = 'left_right';
                    j_init++;
                    break;
                }
            }
    
            console.log(count);
        }
    
        return retArr;
    }
    
    let arr = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20]
    ]
    
    let ret = func(arr);
    console.log(ret);
    
    ```

- Vue使用上的一些特点

  - 轻量级
  - 数据驱动、双向绑定
  - 组件化
  - 单页面应用

- 常见的安全漏洞

  - XSS：跨站脚本攻击。是一种代码注入攻击。攻击者在目标网站上注入恶意代码，当被攻击者登陆网站时就会执行这些恶意代码，这些脚本可以读取 `cookie，session tokens`，或者其它敏感的网站信息，对用户进行钓鱼欺诈，甚至发起蠕虫攻击等。
    - 避免方式：
      - URL参数进行编码
      - 尽量不用innerHtml插入页面内容
      - 避免使用特殊字符等
  - CSRF：跨站请求伪造。攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。
    - 避免方式：
      - 添加验证码
      - 使用token
  - DDos：分布式拒绝服务。利用大量的请求造成资源过载，导致服务不可用。
    - 避免方式：
      - 限制单IP请求频率

- Vue生命周期设计有什么好处

  - 生命周期：vue实例从创建到销毁的过程，使用vue时，基本所有功能都是围绕生命周期实现的。在生命周期的不同阶段调用对应的钩子函数来实现`组件数据管理`和`DOM渲染`两大功能。





- Vue实现双向数据绑定：
  - 实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
  - 实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
  - 实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
  - 实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
- Proxy和Object.defineProperty：
  - proxy：
    - 可以直接监听对象而非属性
    - 可以直接监听数组的变化
    - 13种拦截方法：get, set, deleteProperty, has, apply, ownKeys等等
    - 返回的是一个新对象，我们可以只操作新对象而达到目的，Object.defineProperty只能遍历对象属性直接修改
    - 新标准，收到浏览器厂商的持续优化
  - Object.defineProperty：
    - 兼容性好，支持IE9
- $set的原理
  - 如果目标对象是数组，直接使用数组的splice方法触发响应式
  - 如果目标对象是对象，会先判断属性是否已经存在，对象是否是响应式，如果最终要对属性进行响应式处理，则通过调用defineReactive方法进行响应式的处理。
- Vue项目中的优化
  - 路由懒加载
  - v-for加上key，避免与v-if同时使用
  - 第三方插件按需引入



**小派VR**

- 对HTML语义化的理解：
  - 增强了可读性
  - 适合机器阅读：适合搜索引擎，有利于SEO；支持读屏软件，根据文章自动生成目录
- canvas画布有用过吗
- rem适配的原理
  - rem是相对单位，相对于根元素font-size计算值的倍数的一个CSS单位。常做移动端适配。
  - 核心思想：百分比布局可以实现响应式的适配，rem相当于百分比布局
  - 实现：动态的获取当前视口的宽度，除以一个固定的数n，得到rem的值。`rem = width / n`。此时rem始终为width的n等分
- 其它移动端兼容适配的方案
- rem、em、vh、vw、px，都是相对于谁？
  - rem：相对于根元素的font-size
  - em：相对于父元素的font-size
  - vh：相对于视口的高度
  - vw：相对于视口的宽度
- 常见的水平居中方式
- CSS计算属性：calc()
  - 支持四则运算，乘法中必须有一个是数值，除法的除数也必须是数值，不能是0
  - 使用时，运算符两侧需要加空格，否则不会生效
- CSS的动画：animation
- vue2和vue3的双向绑定的不同
  - vue2-Object.defineProperty
  - Vue3-Proxy
- vue组件的通信方式
- vue3的diff算法的改进
  - 节点的静态标记
  - 最长递增子序列算法
- node.js有接触过吗
- http：
  - http协议是无状态：http协议本身是不带任何状态存储的，但实际情况下，客户端和服务端必然需要状态的认证和交互，所以就引入了cookie
  - http协议是基于tcp的：http协议规定了客户端和服务端数据传输的格式和数据交互行为，并不负责具体的传输细节，底层是基于TCP实现的
- http1.1中的keep-alive
  - 什么是keep-alive：http协议采用请求-应答模式，有普通的非KeepAlive模式，也有KeepAlive模式。
    - 非keep-alive模式：每个请求/应答，客户端和服务器都要新建一个链接，完成之后立即断开连接（http为无连接的协议）；
    - keep-alive模式：使得客户端到服务端的连接持续有效，当出现对服务器的后续请求时，keep-alive避免了重新建立连接
  - 需要客户端和服务端都开启keep-alive才可以启动http的长连接，任何一端手动设置connection: close之后，长连接就会失效了
  - 可以在network中看`Connection ID`，不同的ID就是不同的tcp连接，同样的ID就是用的同一个TCP连接
- http和https的区别
  - http是明文传输，80端口
  - https是安全版的http，使用了SSL协议来对内容进行加密处理，需要ca证书，443端口。
    - https是为了解决HTTP明文传输出现安全问题而出现的一种解决机制，对http请求中的信息进行加密之后传输，从而**有效的防止了中间代理服务器截获或者篡改信息的问题**
    - http是基于TCP的，明文传输；https是基于SSL/TLS的，SSL/TLS又基于TCP，所有的传输内容都是经过加密的
- http2
  - http2是基于https的，内容更加安全了，速度也更快了
  - 二进制分帧，将内容分为更小的信息，进行二进制编码
  - 所有数据以帧的方式进行传输，因此同一个连接中发送多个请求不再需要按照顺序进行返回处理，可以达到并行的数据传输
  - 允许多路复用：多路复用，允许同时通过单一的http连接发送多重请求，http1.1中，浏览器客户端再同一时间，针对同一域名下的请求有一定数量的限制，超过限制会被阻塞。
  - 目前要使用http2，需要先使用https，在这基础上才可以使用http2。
- TCP/IP协议怎么理解的
  - OSI七层模型：
    - 应用层
    - 会话层
    - 表示层
    - 传输层
    - 网络层
    - 数据链路层
    - 物理层
  - TCP/IP五层模型：
    - 应用层：http、https
    - 传输层：tcp、udp
    - 网络层：ip
    - 链路层：mac，arp(将IP地址转换为物理地址)
    - 物理层：
  - TCP/IP协议（传输控制协议/互联网协议）：不是简单的一个协议，而是一组特别的协议，包括：TCP、UDP、IP、等等，这些被称为子协议。其中最重要的就是TCP、IP，因此习惯称整个协议族为TCP/IP。
    - TCP：传输控制协议。面向连接的协议，可以保证数据的稳定、有序、可靠传输
      - 相比UDP：优点在于，可靠传输，保证数据完整有序的发送
      - 相比UDP：缺点在于，较为复杂，开销较大；传输阻塞了之后，要等到前面的数据发送完了后面的数据才可以继续发送
    - UDP：用户数据报协议。无连接的协议，速度快，轻量。提供了单播、多播、广播的功能
      - 相比TCP：优点在于，轻量快速，应用于实时性要求较高的场景，比如直播、视频会议
      - 相比UDP：缺点在于，不保证数据的有序、可靠
    - IP：互联网协议。IP地址是IP协议提供的一种统一的地址格式，为互联网上的每一个网络和每一台主机分配一个IP地址，相当于这台机器的暂用名，别的机器可以通过这个地址找到他，进而建立连接进行通信和交流
- 线程、进程、协程有什么区别
  - 进程：**系统进行资源分配和调度的基本单位**。系统由一个个的进程组成。进程由三个状态：等待态（等待某个事件完成）、就绪态（等待系统分配处理器以便运行）、运行态（占有处理器正在运行）。单核CPU，同一时间只能执行一个进程的代码
  - 线程：**线程是CPU调度的最小单位**。线程属于进程。线程共享进程的内存空间。线程几乎不占用系统资源，一个进程可以有多个线程
  - 协程：协程是属于线程的。协程程序是在线程里面跑的。允许执行被挂起与被恢复。协程的调用，逻辑上是可控的，时序上是确定的。
- url长链接变为短链接
  - 短连接：
    - 太长的链接容易被限制长度
    - 短链接看着简洁
    - 安全，可以不暴露参数
    - 可以统一链接转换，也可以实现统计点击次数等操作
  - 跳转的流程：
    - 用户访问短链接，请求到达服务器
    - 服务器将短链接转换成长连接，然后给浏览器返回重定向的状态码301（永久重定向）或者302（临时重定向）
    - 浏览器拿到重定向的状态码，以真正需要访问的地址，就重定向到真正的长链接
      - 返回头里面的location字段就是要重定向的长链接
  - 根据长连接生成短连接，同时生成一个长链接和短链接的映射关系，当访问到短链接的时候，根据这个映射关系，找到对应的长链接，访问这个真实的地址
- 如何理解vue的双向数据流和react的单向数据流，这两种模式有什么优劣点，什么业务场景下优先考虑
  - vue的双向数据流：也叫双向数据绑定，Model（状态的集合）可以修改自己或其他model的状态，用户的操作也可以修改状态。Model ---> View；View ---> Model。**v-model**
    - 优点：
      - 数据模型的变化与更新，会自动同步到页面上，用户在页面的数据操作，也会自动同步到数据模型
      - 无需进行和单向数据绑定的哪些相关操作
      - 在表单交互比较多的场景下，会简化大量的无关代码
    - 缺点：
      - 无法追踪局部状态的变化
      - 组件数据来源入口可能不知一个，数据流转方向容易乱
      - 一个状态的改变，可能会触发一连串的变化，最终很难预测状态，可能会难以调试
  - 单向数据流：只能从一个方向来修改状态。在vue里面，组件之间的数据传递或者vuex有这种单向数据流的特征。**v-bind**
    - 优点：
      - 所有的状态变更都是可以记录、跟踪、追溯的
      - 所有的数据，具有唯一的出口和入口，使得数据操作更直观，易维护
      - 限制了修改的方式，让状态变得可预测，易调试
    - 缺点：
      - 代码量会上升
      - 在处理局部状态较多的场景时（如大型表单界面），会显得繁琐
- MVC模式
- 硬件：互联网生态部，去年组建。前端：类似于steam一样的游戏平台，windows软件，nodejs + electron来写的，rpc和硬件去通信，对应的有后台管理系统，接入各种产品线；面向开发者的有个开发者中心，给个人开发者或者发行商上架游戏之类的；官网，在第三方网站上维护





- 路由懒加载的原理：也叫延迟加载
  - 结合Vue的异步组件和webpack的代码分割功能，实现路由懒加载
  - 懒加载实现的前提：import -- ES6的动态加载模块
  - 将进行懒加载的*引入语句*放到一个函数内部，然后再需要懒加载的时候执行该函数，这样就可以实现懒加载
- watch和computed实现原理上的不同：
  - watch即this.$watch，是三种watcher中的一种 - **user-watcher**。
    - ![image-20220727215507647](C:\Users\lx\AppData\Roaming\Typora\typora-user-images\image-20220727215507647.png)
  - computed：不是API，但它是Watcher类的最后也是最复杂的一种实例化的使用。computed-watcher
    - ![image-20220727220322397](C:\Users\lx\AppData\Roaming\Typora\typora-user-images\image-20220727220322397.png)
  - 为什么计算属性会有缓存的功能：因为当计算属性结果计算之后，内部的标志位会表明已经计算过了，再次访问时会直接读取计算后的值。当计算属性内部的响应式数据发生变更时，这些响应式数据会收集computed-watcher，变更后通知计算属性要进行计算，也会通知页面重新渲染，渲染时会读取到重新计算后的值。
  - ![image-20220727221432598](C:\Users\lx\AppData\Roaming\Typora\typora-user-images\image-20220727221432598.png)



**小派VR**

- vuex默认是存储在哪里的
  - vuex存储在内存中
  - 当刷新页面（F5刷新，属于清除内存了）时vuex存储的值回丢失



**0801**

- webpack怎么处理循环引用的

  - 问题：项目中2个或者2个以上文件互相依赖时，可能出现`Can't read Property 'xxx' of undefined`或者`(0, xxx) is not a function`这类的错误
  - 背景原因：webpack的头部启动代码中，通过`installModuled`对象，将模块的名称或者id作为key来缓存各个模块的export的值，通过判断installModuleds上是否缓存了对应模块的key，来判断是否已经加载过了模块。 ---  **导致：当模块还处于第一次执行中的状态时，如果碰到了互相引用的情况，webpack可能会认为一个没有完全加载完成的模块已经加载完了**

- vue工程中的proxy代理的原理是什么

  - webpack的proxy：即webpack提供的代理服务，基本行为就是接收客户端发送的请求后，转发到其他服务器，便于开发者在开发模式下解决跨域问题。想要实现代理，首先需要一个中间服务器，webpack中提供服务器的工具就是webpack-dev-server。

  - 在开发环境中：webpack-dev-server会启动一个本地开发服务器，所以我们的应用在开发阶段是独立运行在localhost的一个端口上面的。当本地请求时，代理服务器响应请求，将请求转发到目标的服务器，目标服务器响应数据之后在发送给代理服务器，再由代理服务器发送给浏览器。**服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略的限制**

  - proxy工作的原理，实质上是利用了http-proxy-middleware这个代理中间件，实现请求转发给其他服务器

  - **node + webpack + webpack-dev-server**

  - 前端本地起了一个代理服务器，跟真实的服务器之间交互。在开发环境下，vue渲染服务和接口代理服务都是webpack-dev-server同一个，所以页面和代理接口之间不再跨域

  - ```js
    devServer {
        proxy: {
            // 当请求地址以/api开头，就会触发代理机制
            '/api': {
                target: 'http://localhost:3000' // 要代理的真实接口地址
            }
        }
    }
    ```

- type和interface的区别

  - type：类型别名用于给已有的类型定义一个别名，可以作用于基础类型如Number、String等，也作用于对象的类型

  - interface：TS中用于定义接口

  - 相同点：

    - 都可以用于定义对象和函数

      - ```ts
        interface Person {
            name: string;
            age: number
        }
        
        type Person = {
            name: string;
            age: number
        }
        ```

      - ```ts
        interface Func {
            (x: number, y: number): number
        }
        
        type Func = (x: number, y: number) => number
        ```

    - 都可以实现继承

      - interface使用extends关键字实现继承
      - type使用交叉路类型`&`实现继承

  - 不同点：

    - interface可以实现声明合并，相同名称的interface可以合并到一个里面
    - type不可以实现声明合并

- **module.export和exports**、**export和export default**

  - module.export和exports

    - CommonJS：node应用由模块组成，采用commonJS规范。跟据这个规范，每个文件就是一个模块，都有自己的作用域。

      - 每个模块内部，**module**变量代表当前模块。这个变量是一个对象，它的**exports**属性是对外的接口，加载某个模块，就是加载该模块的`module.exports`属性

      - 为了方便，node为每个模块提供一个**exports**变量，指向module.exports。这等同于在每个模块头部，有这样一行代码。

      - ```js
        var exports = module.exports;
        ```

      - require导出的内容是`module.exports`的指向的内存块的内容，并不是exports的。简而言之就是，exports只是module.exports的引用

      - module.exports可以导出一个匿名函数或者一个值，但是exports不可以

      - ```js
        module.exports = function() {};
        module.exports.name = 'name';
        
        // 这样的写法是不行的，这样会切断exports和module.exports的联系
        exports = function() {};
        ```

  - export和export default

    - ESM：export和export default是esm中的语法
      - export和export default都可以用于导出常量、函数、文件、模块等
      - 在一个文件中，export、import都可以有多个，export default则只能有一个
      - 通过export方式导出，在import时要加上`{}`，export default则不需要
      - export可以直接导出变量表达式，export default则不能

- 闭包：

  - MDN：一个函数和对其周围状态的引用捆绑在一起，这样的组合就是闭包。也就是说，闭包可以让你在内层函数中访问到其外层函数的作用域





**契约锁**

- JS的包装类型

  - 基本类型可以通过`.`操作去调用一些基本方法，比如`100.toFixed()`，基本类型本来是没有原型链的，可以使用这些方法，是因为JS做了一层包装，包装类型的作用
  - **红宝书：**为了方便操作原始值，ES提供了3种特殊的类型引用：Boolean、Number、String。每当用到原始值的方法或者属性时，后台都会创建一个相应的原始包装类型的对象，从而暴露出操作原始值的各种方法。

- JS中的迭代器：

  - 迭代是指，可以从一个数据集中按照一定顺序，不断的取出数据的过程。
    - 迭代强调依次取数据的过程，不保证把所有的数据都取完
    - 遍历强调的是要把所有的数据依次全部取出
  - JavaScript中，迭代器是能调用**next方法**实现迭代的一个**对象**，该方法返回一个具有两个属性的对象
    - value：可迭代对象的下一个值
    - done：表示是否已经取出所有的数据，false表示还有数据，true表示后面没数据了

- for...in、for...of的区别

  - for...in：遍历可枚举的
  - for...of：遍历可迭代的

- 实现一个深拷贝的方式：

  - lodash.deepClone
  - JSON.stringfy、JSON.parse
  - 自己实现深拷贝的方式

- 取到对象的所有的属性：

  - Object.getOwnPropertyNames(obj) - 获取属性名
  - Object.getOwnPropertyDescriptors(obj) - 获取某个对象的属性描述符
  - Object.getOwnPropertyDescriptor(obj, key) - 获取对象的某个属性的描述符

- Reflect和Proxy：

  - 在proxy里面使用Reflect。不用Reflect也可以实现，可以直接去操作源对象。**因为this指向的原因，配合Reflect一起使用**
  - proxy配合Refeclt，是因为Proxy会提供第三个参数，`receiver`，使用Reflect，将这个参数传递给Reflect，保证this指向的正常。

- vue2中哪些情况下会导致数据不是响应式的

  - 对象中新增的一个属性
  - 访问下标的方式去修改数组的某个元素

- v-model双向数据绑定的原理

  - 是input标签的value属性和input事件的语法糖

- vue的单文件组件里面，正在style里面加上`scoped`会发生什么

  - 对于所有的vue组件，只要设置了`<style scoped></style>`，Vue就会给该组件生成一个唯一的`data值`
  - Vue会将这个`data值`作为一个属性添加到组件内所有HTML的dom节点
  - 如果这个组件内部有包含子组件：有两种情况
    - 子组件没有设置scoped：则只会给子组件的最外层标签加上当前的组件data值
    - 子组件有设置scoped：则子组件也会自动生成自己的data值，然后子组件最外层标签在自己的data值后面添加上父组件的data值
  - 对于组件内写在`<style scoped></style>`里面的样式，Vue均会自动在每句css选择器的末尾添加一个当前组件的data属性选择器来私有化样式

- 在使用了scoped的情况下，如何去修改子组件的样式

  - 样式穿透：
    - **::v-deep**：Vue自己提供的，兼容性最好，有自己的loader去处理
    - **/deep/**：less、node-sass中可以使用
    - **>>>**：less中不能使用（scss中可以使用），是原生CSS中的写法

- vue中的$nextTick的作用和使用场景

  - 作用：延迟执行一段代码，会在下一次DOM更新完成之后执行回调。
    - vue中实现响应式并不是数据发生变化之后DOM立即就变化，而是按照一定的策略进行DOM更新。nextTick是在下次DOM更新完成之后执行延迟回调，在修改数据之后使用nextTick，则可以在回调中获取更新之后的DOM
  - 使用场景：
    - 在created中操作的dom的代码，需要放到nextTick里面
    - 更新数据之后，想立即使用js操作新的视图，就需要将js代码放到nextTick回调里面
  - 原理：
    - vue是异步执行dom更新的，一旦观察到数据变化，Vue就会 开启一个队列，然后把同一个事件循环当中观察到数据变化的watcher推送到这个队列中。如果这个watcher被触发多次，只会被推送进队列一次。这种缓存行为可以有效去掉重复数据造成的不必要的计算和DOM操作。
    - 而在下一次事件循环时，Vue会清空队列，并进行必要的DOM更新

- v-if和v-show的区别、使用场景

- v-for添加key的作用是什么，可以使用什么作为key

- key可以用一个函数（一个返回唯一id的函数）吗

  - 1、循环多少次，就调用多少次方法
  - 2、每次更新都是返回了不同的key值，那就是在diff里面，所有的元素节点都要去做更新，就没有可以复用的

- 路由懒加载：import动态导入

- import的时候，会传一个注释：`/webpackChunkName: xxx/`，是用来干什么的

  - 加这个注释，webpack会把同名（xxx）的打到一个chunk里面
  - 一般会针对一个页面使用一个完全不同的chunkName

- vue中数据传递（通信方式）

- 基于已有的组件进行封装的时候，原组件可能有很多的props、emits、slots，这种怎么处理（怎么处理属性、时间、插槽的透传？）

  - vue中`$attr`、`$listener`、`$slots`实现
    - $slots拿到所有的插槽

- 怎么把一些没有定义的属性，透传到$attrs里面

  - inheritedAttrs = true：属性会展示到dom元素上

  - inheritedAttrs = false：把属性全部放到$attrs里面

  - ```js
    export default {
        name: 'myCom',
        inheritAttrs: true // 设置为true，属性会展示在dom元素上。设置为false，则属性只会在$attrs上，不会出现在dom上
    }
    ```

  - 

- vue-class-component + 装饰器的写法可以了解一下





**0802**

- table合并相同数据单元格的处理

  - colspan用来在td/th标签中指定单元格横向跨越的列数

  - rowspan用来在td/th标签中指定单元格纵向跨越的列数

  - ```js
    // 先循环列，再循环行，对第一行和第二行的内容进行比较，如果内容相同，就隐藏第二行，并将计数器+1。继续比较第二行与第三行，依次类推，本列循环完毕，就给本列第一行添加rowspan=sum
    
    ```

  - 

- SPA和MPA的区别

  - SPA：所需的资源如：html、css、js等，在一次请求中就加载完成，即不需要刷新的动态的加载。页面渲染、逻辑处理、页面路由、接口请求均是在浏览器中发生。避免了由于在服务器上呈现页面而导致的中断
    - 优点：页面切换快（切换页面不需要做html请求），用户体验好
    - 缺点：首屏慢（请求html，请求js）、SEO优化差（因为搜索引擎只认识html里面的内容，不认识js的内容，而单页应用的内容都是靠js渲染生成出来的，搜索引擎无法识别，也就不会有一个好的排名）
  - MPA：有多个独立页面的应用（多个html）。每个页面必须重复加载js、css等资源。页面跳转是返回html的
    - 优点：首屏渲染快（请求html，只有一次请求），SEO友好
    - 缺点：页面切换慢，用户体验差

- this.$ref是响应式的吗

  - this.$refs是一个对象，持有当前组件中注册过ref特性的所有DOM元素和子组件实例
  - $refs只有在组件渲染完成之后才会填充，在初始渲染的时候不能访问它们，并且它们是非响应式的，因此不能用它在模板中做数据绑定

- 在computed中使用了this.$refs获取子组件数据，子组件数据变化，可以响应式的改变computed吗

  - 不会





**0804**

- 移动端适配的方案用的什么？

  - rem

- rem和em的区别

- 移动H5开发中，有没有遇到安卓苹果的兼容性问题

  - 日期格式的问题：苹果系统下不支持`yyyy-MM-dd`，`yyyy.MM.dd`的日期格式

    - ```js
      // 这样获取的时间，在安卓上是正常的，在苹果上是显示了NaN
      let newDate = new Date('2018-02-10');
      ```

    - ```js
      // 这样获取的时间，在安卓和苹果上都是显示正常的
      let newDate = new Date('2018/02/10')
      ```

- 谷歌浏览器的开发者工具的使用

- 开发中针对一个请求，想要修改这个请求的参数，快速的重新发送，如何处理

  - 在请求路径上，右键，打开console标签页，粘贴后回车，再回到network里面就可以看到刚才在console里面发送的请求了。所以我们可以在console里面修改参数
  - mock插件也可以实现请求中参数的修改，然后重新发起请求

- 交换两个变量的值，不通过第三个变量

  - 数组的解构赋值方式：`[a, b] = [b, a]`

  - 位运算的方式：

    - 0和任何数亦或都等于这个数，本身和本身亦或等于0

    - ```js
      // 亦或运算，相同为0，不同为1
      a = a^b
      b = a^b   // b = a^b^b = a
      a = a^b
      ```

  - 如果是数字，可以使用加减运算来交换

    - ```js
      let a = 10, b = 20
      a = a + b;
      b = a - b;
      a = a - b;
      ```

- null == 0，null >= 0这两个逻辑表达式的值分别是什么：`false`，`true`

  - null == 0：null在设计上，对比等于的时候不会转换类型，不转换类型的话是不会相等的
  - null >= 0：对比大小时，null会尝试转换数据类型，转换之后null为0，0 >= 0时true
  - 关系运算符和相等运算符并不是一个类别的。关系运算符在设计上总是可能需要转换数据类型，相等运算符没这方面的设计

- 箭头函数和普通函数的不同

- vue组件的created里面，用原生JS的方式把模板清空（找到这个dom把它清空掉），那么这个清空操作会一直生效吗？**不会**

  - 确实可以把模板清空掉，但是到了mounted这个生命周期时，会把之前清空掉模板重新挂载一份新的，清空操作就无效了
  - 即：会生效，只是时效性长短的问题

- vue组件的data是一个方法

- 什么是闭包？

  - 创建并返回一个函数的时候，通过这个函数可以访问到定义函数时所在作用域的变量

- js数据精度的问题，如何保证数据做了运算之后，精度不变

- 精确到小数点后6位的两个小数进行相加，如何做，如何保证精度

  - 自定义一个函数，将其转为整数进行处理，处理完成之后再转化为小数
  - 借助`Math.pow(10, len)`将小数转换处理

- 两个image标签：并排形式，上下行形式，在展示的时候会有什么区别吗

  - 默认状态下：上下行形式的，两个标签之间会有一个空格。（修改img标签的display的值，可以解决，如：`display: block`）
  - 
  - img是类似于text的元素，在结束的时候，会在末尾加上一个空白符，所以就会多出3px
  - 解决方法：`float: left`

- 浏览器的缓存：

  - 强缓存：
  - 协商缓存：





**0808**

- 数组去重的方法
- ES6的Symbol
- 定时器有用过吗
  - 在防抖、节流中有使用过
- nextTick有用过吗
  - js里面的process.nextTick
  - vue里面的nextTick：下次DOM更新完成之后的回调
- promise.all[promise1, promise2, promise3, ....]和async/await promise1  promise2,  promise3区别：
  - 执行顺序的区别：
    - promise.all内部是并行执行的
    - async/await是按照函数调用顺序执行的
  - 在传参数量大（执行量较大的情况下）promise.all的执行顺序会快一点。常规情况下差不多




**0810**

- 闭包
- 宏任务和微任务
- webpack中的loader用来做什么
- ES6和commonJS的模块化
- commonJS中怎么引入ES6写的模块
- 栈和队列的区别
- 快速排序是什么排的
- 有没有用过一些安全、加密方面的东西，比如接口、敏感数据。md5、堆成加密、非对称加密
- 图片，base64有 了解吗，用来干什么的，怎么生成的
- 例如：9.9 浮点数在内存中怎么表示的
- 浮点数精度问题，问题产生的原因是什么
- 跨域，解决方法
- 微信小程序中的openID，uniID是什么
- linux系统有玩过吗





## 前端的包管理器

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



## monorepo

即：把多个项目放到一个仓库里面，相对立的是传统的multiRepo模式，每个项目对应一个单独的仓库来分散管理。



## 深度优先和广度优先

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

  - 





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
