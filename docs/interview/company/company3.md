
# 面试笔记（三）

## 前程无忧

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


## 腾讯

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



## 小派VR

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
    - ![image-20220727215507647](./img/image-20220727215507647.png)
  - computed：不是API，但它是Watcher类的最后也是最复杂的一种实例化的使用。computed-watcher
    - ![image-20220727220322397](./img/image-20220727220322397.png)
  - 为什么计算属性会有缓存的功能：因为当计算属性结果计算之后，内部的标志位会表明已经计算过了，再次访问时会直接读取计算后的值。当计算属性内部的响应式数据发生变更时，这些响应式数据会收集computed-watcher，变更后通知计算属性要进行计算，也会通知页面重新渲染，渲染时会读取到重新计算后的值。
  - ![image-20220727221432598](./img/image-20220727221432598.png)

- vuex默认是存储在哪里的
  - vuex存储在内存中
  - 当刷新页面（F5刷新，属于清除内存了）时vuex存储的值回丢失

## 兑观信息

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

