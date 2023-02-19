# Vue3 中如何集成第三方框架

## 独立的第三方库

* 栗子 - NProgress 进度条工具
     - 安装： `npm install nprogress -D`

     - 使用：在需要使用的地方，import `import NProgress from 'nprogress'` 。router.beforeEach来开始进度条；router.afterEach来结束进度条。

## 组件的封装

* 栗子 - 可视化组件的封装（echart   G2）
* 在vue3中继承ECharts的最简单的方式，就是封装一个Chart组件，吧option配置以参数的形式的形式传递给Chart组件
* PS：记个坑 - 

```
    <div ref="chartRef" class="chart" style="height: 300px; width: 200px"></div>
    // 通过ref获取DOM - PS --- 这里的名称必须和 ref="chartRef"名称一致
    let chartRef = ref(); 
```

## 指令的封装

* 栗子 - 图片懒加载，在img标签之上加上v-lazy的属性；聚焦指令

```
    app.directive('focus', {
        // 当被绑定的元素挂载到DOM中时
        moumted(el) {
            // 聚焦
            el.foucs()
        }
    })
 
```

* 指令的生命周期和组件的类似。指令要支持vue的插件机制，所以需要install方法

```
    const lazyPlugin = {
        install(app, options) {
            app.directive('lazy', {
                mounted: ..., 
                updated: ..., 
                unmounted: ...
            })
        }
    }
```

* v-loading指令的实现

```
    const loadingDirective = {
        mounted: function (el, binding, vnode) {
            const mask = createComponent(Loading, {
                ...options,
                onAfterLeave() {
                    el.domVisible = false
                    const target =
                    binding.modifiers.fullscreen || binding.modifiers.body
                        ? document.body
                        : el
                    removeClass(target, 'el-loading-parent--relative')
                    removeClass(target, 'el-loading-parent--hidden')
                }
            })
            el.options = options
            el.instance = mask.proxy
            el.mask = mask.proxy.$el
            el.maskStyle = {}

            binding.value && toggleLoading(el, binding)
        },

        updated: function (el, binding) {
            el.instance.setText(el.getAttribute('element-loading-text'))
            if (binding.oldValue !== binding.value) {
                toggleLoading(el, binding)
            }
        },

        unmounted: function () {
            el.instance && el.instance.close()
        }

    }

    export default {
        install(app) {
            // if (Vue.prototype.$isServer) return
            app.directive('loading', loadingDirective)
        }

    }
 
```

```
    createComponent - 是Element3的工具函数，其实就是使用h包裹了一下组件
    https://github.com/hug-sun/element3/blob/master/packages/element3/src/composables/component.js#L11
 
```

## Vue3 中的全局变量

* `app.config.globalPropertoes.xxx` 注册全局变量

# Vue3中的性能优化

## 项目整体执行流程

### 用户输入URL到页面显示的过程

* 输入URL
* DNS域名解析获取IP地址
* 向服务器发起HTTP请求（基于TCP）
* 后端返回内容
* 浏览器解析HTML
* 加载HTML代码中的需要加载的CSS和JavaScript
* 执行JavaScript代码（执行VUE）
* vue-router解析路由

## 网络请求优化

* 首页的标签中，使用标签去通知浏览器对页面中出现的其他域名去做DNS的预解析。比如页面中的图片通常都是防止在独立的CDN域名下，这样页面首页的时候就能预先解析域名并把结果缓存起来。
* 获取网络文件的优化。http请求底层的TCP协议每次都需要进行三次握手，获取的文件较多时，三次握手的消耗也会比较大。
    - 让文件尽可能的减少。 - 文件打包之后再上线；CSS雪碧图进行图片打包。（HTTP2之前，文件打包还是有效的，HTTP2全面普及之后，多路复用可以降低三次握手的消耗）
    - 让文件尽可能的小一些。文件的压缩
* 图片懒加载
* 路由懒加载
* 文件大小方面，使用可视化的插件来查看包大小的分布。

```
    npm install rollup-plugin-visualizer

    // viet.config.js文件中
        
    import { visualizer } from 'rollup-plugin-visualizer'
    export default defineConfig({
        plugins: [vue(), vueJsx(), visualizer()], 
    })

    npm run build 打包，根目录下的stat.html文件，打开后可以看到分析报告
 
```

    

```

    webpack项目中；
    npm install webpack-bundle-analyzer
 
```

* 浏览器的缓存机制：高效利用文件缓存。 Expires  Cache-control   last-modify  etag

## 代码效率优化

* 栗子

```
    function fib(n){
        if(n<=1) return 1
        return fib(n-1)+fib(n-2)
    }

    let count = ref(fib(38))
 
```

    

```
    function fib(n){
        let arr = [1, 1]
        let i = 2
        while(i<=n){
            arr[i] = arr[i-1]+arr[i-2]
            i++
        }
        return arr[n]
    }
 
```

## 性能检测报告

* lighthouse性能报告
    - FCP：First Content Paint - 页面上呈现第一个DOM元素的时间。在此之前，页面都是白屏状态
    - TTI：Time To Interactive - 页面可以开始交互的时间。
    - LCP：Largest Contentful Paint - 页面视口上最大的图片或者文本块渲染的时间
* 可以通过代码中的performance对象去动态获取性能指标数据，并且统一发送给后端，实现网页性能的监控 [!performance](./img/performance.png)

```
    let timing = window.performance && window.performance.timing
    let navigation = window.performance && window.performance.navigation

    DNS 解析：
    let dns = timing.domainLookupEnd - timing.domainLookupStart

    总体网络交互耗时：
    let network = timing.responseEnd - timing.navigationStart

    渲染处理：
    let processing = (timing.domComplete || timing.domLoading) - timing.domLoading

    可交互：
    let active = timing.domInteractive - timing.navigationStart
 
```

# 加餐

## 项目中的亮点 - 文件上传

### 文件断点续传

* 文件上传的实现：axios.post
* 把文件切成数据块一次上传，若上传的过程中出现了网络错误，那么再次上传的时候，就会把已经存在的切片列表过滤掉，只上传其他的切片
* 文件上传之前，需要在前端计算出一个文件的Hash值作为唯一标识，用来向后端询问切片的列表。采用MD5算法求hash值，也会造成浏览器的卡顿，通过web-worker可以解决主这一问题；或者借鉴react时间切片来解决计算hash卡顿的问题。
* [文件上传的演示代码](https://github.com/shengxinjing/file-upload)

## 项目中的亮点 - 列表渲染

### 虚拟列表

* 只渲染可视区域内的DOM元素，避免因为页面中DOM元素过多，而引起的卡顿问题。



# 加餐 - TypeScript

## TypeScript入门

* TypeScript可以在JavaScript的基础上，对变量的数据类型加以限制。最基本的数据类型包括：`布尔`、`数字`、`字符串`、`null`、`undefined`
* 当不确定一个变量应该使用哪种类型的变量时，使用`any`来声明变量
* `enum`定义枚举类型，可以把类型限制在指定的场景之内
* 通过`|`组合出新的类型
* 通过`interface`接口可以定义对象的类型限制，
    - readonly可限制某个属性是否可编辑
    - `?`可设置 为可选属性
* 函数的类型限制

    

```
    // 大致语法
    function 函数名(参数: 参数类型): 返回值类型 {}
 
```

* 使用变量的方式去定义函数 - （可读性稍微差点）

```
    // 大致语法
    (参数类型) => 返回值类型
    let add1: (a: number, b: number) => number = function(x: number, y: number) {
        return x + y;

    }

    // 使用type关键字去定义函数的类型
    type addType = (a: number, b: number) => number
    let add2:addType = function(x: number, y:number) {
        return x+ y

    }

    // 使用interface关键字去定义函数类型
    interface addType1 {
        (a: number, b: number): number

    }

    let add3:addType2 = function(x: number, y: number) {
        return x + y;

    }
 
```

* 函数重载 - 函数支持多个类型的参数  --  [vue3源码](https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/ref.ts#L72)

    

```

    // 要求。参数是数字，返回的是数字；参数是字符串，返回的是字符串
    function reverse(x: number): number
    function reverse(x: string): string
    function reverse(x: number | string): number | string | viod {
        if (tyoeof x === 'string') {
            return x.split('').reverse().join(); 
        } else if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join()); 
        }

    }
 
```

* **浏览器变量和属性** [typeScript源码](https://github.com/Microsoft/TypeScript/tree/main/src/lib)
    - Window : window类型
    - HTMLElement ：dom元素类型
    - NodeList ：节点列表类型
    - MouseEvent ：鼠标点击事件类型

    

```

    // window对象
    let w: Window = window; 
    // dom元素
    let ele: HTMLElement = document.createElement('div'); 
    // 节点列表
    let allDiv: NodeList = document.querySelectorAll('class-name'); 
    // 鼠标事件
    ele.addEventListener('click', function(e: MouseEvent) {
        const args: IAguments = arguments; 
        w.alert(1)
        console.log(args); 
    }, false)
 
```

* 一些第三方框架的数据类型

    

```

    import { ref, Ref } from 'vue';

    interface Todo {
        title: string,
        done: boolean

    }

    let todos: Ref = ref([{ title: '学习Vue', done: false }])
 
```

## 泛型

TypeScript可以进行类型编程，极大提高TypeScript在复杂场景下的应用场景

* 栗子：返回值的类型和参数的类型一致。

    
```
    // T 相当于给函数定义了一个类型变量， 【type T = arg的类型】
    function identity<T>(arg: T): T {
        return arg

    }

    // 此时的T是string，返回值的类型也是string
    identity<string>('玩转Vue3全家桶')
    identity<number>(1)
 
```

* 利用泛型，把函数参数定义成类型

```

    interface VueCourse5 {
        name: string,
        price: number

    }

    // 只能是name和price中选一个 --- 使用了 keyof 语法，获得已知类型VueCourse5的属性列表
    type courseProps = keyof VueCourse5
    let k: CourseProps = 'name'
    let k1: CourseProps = 'price'
 
```

* `keyof`：可以用来拆解已有类型
* `extends`：实现类型系统中的条件判定 -- `T extends U ? X : Y` -- 类型三元表达式

    

```

    // 定义ExtendsType函数，接收泛型参数T，通过判断T是不是布尔值，来返回不同类型的字符串。实现通过传入不同的参数来返回不同的类型
    type ExtendsType<T> = T extends boolean ? '重学前端' : '玩转Vue3全家桶'
    type ExtendsType1 = ExtendsType<boolean> // type ExtendsType1 = '重学前端'
    type ExtendsType2 = ExtendsType<string> // type ExtendsType2 = '玩转Vue3全家桶'
 
```

* `in`：实现遍历

```

    type Course = '玩转Vue3全家桶' | '重学前端'
    type CourseObj = {
        [k in Course]: number // 遍历Course类型作为key

    }

    // 等同于
    type Course = {
        '玩转Vue3全家桶': number, 
        '重学前端': number

    }
 
```

* 栗子

```
    // K extends keyof T  // 限制K的类型必须是T的属性之一
    functiongetProperty<T, K extends keyof T>(o: T, name: K): T[K] {
        return o[name]

    }

    const coursePrice:CourseObj = {
        '玩转Vue3': 129,
        '重学前端': 129

    }

    getProperty(coursePrice, '玩转Vue3')；
    getProperty(coursePrice, '重学前端'); 
    getProperty(coursePrice, '重学'); 
 
```

* `infer`：**<T>**可以给函数参数定义类型变量，**infer**则可以在**extends**关键字之后的变量设置类型变量，更加细致的控制类型。**不是很理解？？？**

    

```

    type Foo = () => CourseObj

    // 如果T是一个函数，并且函数返回类型是P就返回P - infer P
    type ReturnType1<T> = T extends () => infer P ? P: never
    type Foo1 = ReturnType1<Foo>
 
```

## 实战练习

[TypeScript练习题](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)
