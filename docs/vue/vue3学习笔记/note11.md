
# 编译原理 - compiler

Vue中，组件都是以虚拟DOM的形式存在，加载完毕之后注册effect函数。

组件内部数据变化之后，用vue的响应式机制做到了通知组件更新。

内部使用patch函数实现了虚拟DOM的更新（中间包括了位运算、最长递增子序列等）

[vue编译在线演示](https://vue-next-template-explorer.netlify.app/#eyJzcmMiOiI8ZGl2IGlkPVwiYXBwXCI+XG4gICAgPGRpdiBAY2xpY2s9XCIoKT0+Y29uc29sZS5sb2coeHgpXCIgOmlkPVwibmFtZVwiPnt7bmFtZX19PC9kaXY+XG4gICAgPGgxIDpuYW1lPVwidGl0bGVcIj7njqnovax2dWUzPC9oMT5cbiAgICA8cCA+57yW6K+R5Y6f55CGPC9wPlxuPC9kaXY+XG4iLCJzc3IiOmZhbHNlLCJvcHRpb25zIjp7ImhvaXN0U3RhdGljIjp0cnVlLCJjYWNoZUhhbmRsZXJzIjp0cnVlLCJvcHRpbWl6ZUJpbmRpbmdzIjpmYWxzZX19)

Vue的compiler实现了template到render函数的转变

## 整体流程

* 代码会被解析成一个对象（类似于虚拟DOM的对象，描述template的代码关系） -- 抽象语法树（简称ATS）
* transform模块对代码进行优化
* generate模块最终生成render函数
* 即：**template -- 词法分析 -- 语法分析（tokenziner函数） -- AST（parse函数） -- transform模块（transform函数 -- travese函数，标记静态节点） -- generate模块（generate函数 -- 遍历AST，拼接最后要执行的函数字符串） -- render函数**

```js
function compiler(templte) {
    const ast = parse(template);
    transform(ast);
    const code = generate(ast);
    return code;
}

let template = `<div id="app">
        <div @click="()=>console.log(xx)" :id="name">{{name}}</div>
        <h1 :name="title">玩转vue3</h1>
        <p >编译原理</p>
    </div>`

const renderFunction = compiler(template);
console.log(renderFunction);
```

## 具体实现

### tokenizer

* 词法分析，将 `<div>` `@click` `{{}}`等语法识别出来，转换成一个个的token。可以理解为把template的语法进行了分类，这一步就叫tokenizer
* tokens数组存储解析的结果，对模板字符串进行循环 -- `< > / 空格` -- 字符串中的关键分隔符
* push方法将分割后的token存储在数组tokens中

### 生成抽象语法树 AST

根据tokenziner函数的返回值数组，按照标签的嵌套关系转换成树形结构 -- parse函数

```
[
  { type: 'tagstart', val: 'div' },
  { type: 'props', val: 'id="app"' },
  { type: 'tagstart', val: 'div' },
  { type: 'props', val: '@click="()=console.log(xx)"' },
  { type: 'props', val: ':id="name"' },
  { type: 'text', val: '{{name}}' },
  { type: 'tagend', val: 'div' },
  { type: 'tagstart', val: 'h1' },
  { type: 'props', val: ':name="title"' },
  { type: 'text', val: '玩转vue3' },
  { type: 'tagend', val: 'h1' },
  { type: 'tagstart', val: 'p' },
  { type: 'text', val: '编译原理' },
  { type: 'tagend', val: 'p' },
  { type: 'tagend', val: 'div' }
```

* 首先使用一个ast对象作为根节点

```
    let ast = {
        type: 'root',
        props: [],
        children: []
    }
```

* walk函数遍历整个tokens数组，根据token的类型不同，生成不同的node对象
* 根据tagend的状态来决定walk的递归逻辑

```json
{
  "type": "root",
  "props": [],
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": [
        {
          "key": "id",
          "val": "\"app\""
        }
      ],
      "children": [
        {
          "type": "element",
          "tag": "div",
          "props": [
            {
              "key": "@click",
              "val": "\"()"
            },
            {
              "key": ":id",
              "val": "\"name\""
            }
          ],
          "children": [
            {
              "type": "text",
              "val": "{{name}}"
            }
          ]
        },
        {
          "type": "element",
          "tag": "h1",
          "props": [
            {
              "key": ":name",
              "val": "\"title\""
            }
          ],
          "children": [
            {
              "type": "text",
              "val": "玩转vue3"
            }
          ]
        },
        {
          "type": "element",
          "tag": "p",
          "props": [],
          "children": [
            {
              "type": "text",
              "val": "编译原理"
            }
          ]
        }
      ]
    }
  ]
}
```

### 语义分析和优化

**transform函数**

transform函数实现语义的分析和优化。理解Vue中的语法，并为最后的生成代码做准备。

traverse函数递归整个AST，并且在这一步实现简单的静态标记。

当节点标记为 `element` ，默认使用 `ast.flag` 标记节点的动态状态。

如果属性是 `@` 开头的，就认为它是Vue中的事件绑定，使用 `arg.flag |= PatchFlags.EVENT` 标记当前节点的事件是动态的。

`冒号` 开头的就是动态的属性，并且把class和style标记了不同的flag。

如果都没有命中的话，就使用 `static:true` ，标记当前节点是静态节点

**generate函数**
walk函数遍历整个AST，拼接成最后要执行的函数字符串。

遍历过程中，会收集依赖

最后在createVNode函数的最后 一个参数带上ast.flag进行状态的标记。

最终生成了目标代码render函数，这个函数最终会和组件的setup函数一起组成运行时的组件对象。

**vue的compiler输出的代码会有几个hoisted开头的变量，这些变量是用于静态节点提升，就是在整个生命周期中只需要进行一次创建，有效节省不必要的性能开销**

## vue compiler入口

* 四个和compiler相关的包
  + compiler-core：浏览器端的编译（需深入研究）。实际使用的方法是core提供的
  + compiler-dom：浏览器端的编译（需深入研究）。负责传入浏览器DOM相关的API
  + compiler-ssr：服务端渲染
  + compiler-sfc：编译.vue单文件的
  

```js
export function compiler(template: string, options: CompilerOptions = {}): CodegenResult {
    return baseCompiler(
        template,
        extend({}, parseOptions, options, {
            nodeTransforms: [
                ignoreSideEffectTags,
                ...DOMNodeTransforms,
                ...(options.nodeTransforms || {})
            ],
            directiveTransforms: extend({},
                DOMDirectiveTransforms,
                options.directiveTransforms || {}
            ),
            transformHoist: __BROWSER__ ? null : stringifyStatic
        })
    )
}
```

### compiler-dom

负责传入浏览器Dom相关的配置。

* baseCompiler:
    - parseOptions中的isNativeTag区分了element和component。内部把所有的html标签存储在一个对象中，用于对比是不是浏览器自带的element。

## Vue浏览器端编译的核心流程

* baseCompiler函数，是vue浏览器端编译的核心流程
    - baseParse -- **createPaseContext**
      - parseInterpolation负责标识变量的分隔符
      - parseTextData获取变量的值，并且通过innerStart和innerEnd去记录插值的位置
      - parseText处理模板中的普通文本，主要是把文本包裹成AST对象。
      - parseElement
        - 首先判断pre和v-pre标签，
        - 然后通过isVoidtag判断 标签是否是自闭和
        - 递归调用parseChidlren，再解析开始标签、子节点，最终解析结束标签
        - parseTag解析节点
          - parseAttribute处理属性，对pre和v-pre标签进行检查
          - isComponent判断是否为组件
            - 通过isNativeTag辅助判断，最终返回一个描述节点的对象，包含当前节点所有解析之后的信息，tag - 标签名，children - 子节点的数组

## AST的语义化分析

transform函数的核心逻辑就是识别一个个的Vue语法，并且进行编译器的优化，我们常提到的静态标记就是这一步完成的。

**createTransformContext**

* transform
  + traverseNode函数，可编译AST所有的节点。内部通过nodetype来具体执行不同的函数
  + tranformElement函数，转换节点，用来处理props和children的静态标记
  + transformText函数转换文本
  + transformIf：v-if的语法转换
  + transformFor：v-for的语法转换
  + transformOn：v-on的语法转换
  + transformModel：v-model的语法转换

## template到render函数的转化

generate函数，首先通过 createCodegenContext 创建上下文对象，然后通过 genModulePreamble 生成预先定义好的代码模板，然后生成 render 函数，最后生成创建虚拟 DOM 的表达式

**createCodegenContext**

* generate函数
  + genModulePreamble：生成预先定义好的代码模板，生成import风格的代码
  + genNode：生成创建虚拟DOM的代码，针对变量、标签、v-if等等有不同的代码生成逻辑

## 编译原理带来的好处

### vite插件

利用编译原理的思想，通过正则匹配的方式，完全可以分析出来当前组件依赖的API有哪些，这样就可以在组件执行之前自动导入这些API。

[auto-import](https://github.com/antfu/unplugin-auto-import)

[vite插件开发文档](https://cn.vitejs.dev/guide/api-plugin.html)

### Babel

编译原理思想，代码转换自动处理 `async`  `await` ，以及 `try...catch`

* babel提供了完整的代码解析的能力，包括AST的解析，语义分析，代码生成等。
  + @babel/parse：提供了代码解析的能力，能够把js代码解析成AST，代码就从字符串变成树形结构
  + @babel/traverse：提供了遍历AST的能力，可以从traverse中获取每一个节点的信息去修改它
  + @babel/types：提供了类型判断的函数，方便的判断每一个节点的类型
  + @babel/core：提供了代码转换的能力

# vite原理

## webpack

webpack的核心原理就是通过分析JavaScript中的require语句，分析出当前JavaScript文件所有的依赖文件，然后递归分析之后，就得到了整个项目的一个依赖图。对依赖图中不同的文件执行不同loader，比如会把css文件解析成加载CSS标签的JavaScript，最后基于这个依赖图获取所有的文件。

进行打包处理之后，放在内存中提供给浏览器使用，然后dev-server会启动一个测试服务器打开页面，并且在代码文件修改之后，可以通过 `WebSocket` 的方式通知前端自动更新页面，也就是我们熟悉的热更新功能。

webpack项目调试之前，要把所有的文件依赖关系收集完，打包处理后才能启动测试，对开发效率方面就会产生一定的影响。针对webpack这种bundle的思路，社区就诞生了bundless的框架，vite就是其中之一。

前端项目之所以需要打包，是因为浏览器里的JavaScript没有很好的方式去引入其他文件，webpack 提供的打包功能可以帮助我们更好地组织开发代码，但是现在大部分浏览器都支持了 ES6 的 module 功能，我们在浏览器内使用 type="module"标记一个 script 后，在 src/main.js 中就可以直接使用 import 语法去引入一个新的 JavaScript 文件。这样我们其实可以不依赖 webpack 的打包功能，利用浏览器的 module 功能就可以重新组织我们的代码。

```
// 目前浏览器可以支持这样的写法
<script type="module" src="/src/main.js"></script>
```

## vite原理

* 浏览器的module功能：浏览器识别出JavaScript中的import语句之后，会发起一个新的网络请求去获取新的文件，所以只支持`/`,                                                                                                                                                                                `./`,                                                                                                                                                                                `../`开头的路径
* 对CSS的解析，如果url是.css结尾的，就返回一段JavaScript代码，这段JavaScript会再浏览器内创建一个style标签，标签内部放入我们读取的CSS文件代码

```js
        if (url.endsWith('.css')) {
            const p = path.resolve(__dirname, url.slice(1))
            const file = fs.readFileSync(p, 'utf-8')
            const content = `
            const css = "${file.replace(/\n/g,'')}"
            let link = document.createElement('style')
            link.setAttribute('type', 'text/css')
            document.head.appendChild(link)
            link.innerHTML = css
            export default css
            `
            ctx.type = 'application/javascript'
            ctx.body = content
        }
```

* 热更新实现：在客户端注入一个额外的JavaScript文件，这个文件用来和后端实现`websocket`通信

* webpack启动服务器之前需要进行项目的打包，vite则是直接启动服务，通过浏览器运行时的请求拦截，实现首页文件的按需加载，实现开发服务器启动的时间和整个项目的复杂度解耦。
* vite的主要目的是提供一个调试服务器，vite也可以和Vue解耦，实现对任何框架的支持，只需要使用对应框架的vite插件就可以支持任意框架。
* vite能够这么快，还有一个原因就是使用了esbuild去解析JavaScript文件

```
01.  请求 首页http://xxx.xxx.xxx/ 
02.  返回 index.html
03.  请求 /src/main.js
04. 发现请求js文件，替换路径为相对路径后，返回修改后的js文件
05.  请求 @module/vue
06.  发现请求@module内的文件，替换文件内为相对路径后，返回package.json中module定义的入口文件
07.  请求 ./App.vue
08.  判断 .vue 的请求后，通过 compilerSFC.parse解析 Vue 组件，通过返回的 descriptor.script 获取 js 代码
09.  请求 ./App.vue?type=template
10.  调用 compilerDom.compile 解析 template 内容，直接返回 render 函数
```

[mini-vite源码](https://github.com/shengxinjing/geektime-vue-course/tree/main/vite-mini)

# 数据流原理 Vuex & Pinia

## vuex5

* 支持compositionAPI和OptionAPI
* 去掉了namespace模式
* 使用组合store的方式更好的支持了ts的类型推导
* 去掉了容易混淆的`mutation``action`概念，只保留了`action`
* 支持自动的代码切割

## pinia - 未来的vuex

* [pinia地址](https://pinia.vuejs.org/)
* 安装： `npm install pinia@next`

* 导入： `import { createPinia } from pinia`

* 使用： `const pinia = createPinia(); app.use(pinia)`

    

```js
    // 定义count
    import {
        defineStore
    } from 'pinia';
    export const useCounterStore = defineStore('count', {
        id: 'count',
        state: () => {
            return {
                count: 1
            }
        },
        actions: {
            add() {
                this.count++;
            }
        }
    })

    // 使用
    import {
        useCounterStore
    } from '../store/count';

    const count = useCounterStore();

    function add() {
        count.add(); // 触发actions，实现数据的修改
        // count.$patch({ count: count + 1 }) // 还可以通过调用内部方法的方式来更新store数据

    }
```

```js
// composition方式定义count
import {
    defineStore
} from 'pinia';

export const useCounterStore = defineStore('count', () => {
    const count = ref(0);

    function increment() {
        count.value++;
    }

    return {
        count,
        increment
    };
})
```

## pinia源码

* [pinia的github](https://github.com/vuejs/pinia)
* createPinia函数
  + ref创建响应式数据对象`state`
  + `install`方法支持`app.use`的注册
  + 内部通过`provide`的语法和全局`$pinia`配置pinia对象
  + use方法和toBeInstalled数组实现了Pinia的插件机制
  + pinia.use(devtoolsPlugin)实现了对VueDevtools的支持 
  + pinia实例就是ref({})包裹的响应式对象，项目中用到的state都会挂载到Pinia这个响应式对象内部
* defineStore函数
  + useStore方法定义每一个store，每个store都会标记`唯一的id`
    - getCurrentInstance获取当前组件的实例，如果useStore参数没有Pinia的话，就会`inject`去获取Pinia的实例，`这里的inject就是createPinia方法中install方法提供的`
    - setActivePinia函数
    - 根据创建实例时使用composition还是option，使用`createSetupStore`或者`createOptionsStore`

# 前端路由原理

## 入口分析

createRouter方法创建路由，app.use加载vur-router插件，并且注册内置组件router-view、router-link

## 路由安装 - install方法

install方法内部注册了RouterLink和RouterView两个全局组件。

app.provide给全局注册了route和reactive包裹之后的reactiveRoute对象（provide提供的数据没有做响应式封装，需要响应式的时候需要自己使用ref或者reactive封装为响应式对象）

* router-view
  + setup函数返回了routerview组件的render函数
  + 直接使用`<router-view/>`，没有slot的情况下，返回的就是component变量。component变量使用h函数返回ViewComponent的虚拟DOM
  + ViewComponent根据matchedRoute.components[props.name]计算来的
  + matchedRoute最终来源于Router的install方法中注入的currentRoute对象

## 路由更新

**router-view渲染的组件是根据当前匹配的路由变量matchedRoute决定的**

* matcher的由来：
  + createRouterMatcher方法，传入routes配置的路由数组，返回创建的RouterMatcher对象，内部遍历routes数组，通过addRoute挨个处理路由配置。

`createWebHashHistory和createWebHistory` 方法内部，都是通过 `useHistoryListener` 实现路由的监听，通过 `useHistoryStateNavigation` 实现路由的切换。 `useHistoryStateNavigation` 会返回push和replace方法来更新路由。

# 服务端渲染原理

SSR- Server Side Rendering

## SSR

### 为什么有SSR？

MVVM盛行，Vue和React的全家桶都有框架的身影，所有页面的渲染流程也全部都是浏览器加载完JavaScript文件后，由JavaScript获取当前的路由地址，再决定渲染哪个页面。

* CSR - 客户端渲染：
  + 首页白屏时间可能过长。
  + 搜索引擎爬虫抓取到页面数据，body还为空，不利于SEO

在用户访问页面的时候，能够把首页渲染的HTML内容写入到body内部，也就是说我们需要再服务端实现组件的渲染。

### 如何实现SSR？

* 库：`@vue/server-renderer`
* 创建文件夹vue-ssr
* 安装`server-renderer`,                                                                                                                                                                               `vue`,                                                                                                                                                                               `express`
* 新建server.js
  

```js
       /**
        * 实现在服务端解析Vue的组件，直接把渲染结果返回给浏览器
        * **/

       const express = require('express');
       const app = express();
       const Vue = require('vue');
       const renderer3 = require('@vue/server-renderer');
       const vue3Compile = require('@vue/compiler-ssr');

       // vue组件
       const vueapp = {
           template: `<div>
                <h1 @click="add">{{ num }}</h1>
                <ul>
                    <li v-for="(todo, n) in todos">{{ n + 1 }}--{{ todo }}</li>
                </ul>
            </div>`,
           data() {
               return {
                   num: 1,
                   todos: ['吃饭', '睡觉', '打豆豆'],
               };
           },
           methods: {
               add() {
                   this.num++;
               },
           },
       };

       // 使用@vue/compiler-ssr解析template
       vueapp.ssrRender = new Function('require', vue3Compile.compile(vueapp.template).code)(require);

       // 路由首页返回结果
       app.get('/', async function(req, res) {
           let vapp = Vue.createSSRApp(vueapp);
           let html = await renderer3.renderToString(vapp);
           const title = 'Vue SSR';
           let ret = `<!DOCTYPE html>
                            <html lang="en">
                                <head>
                                    <meta charset="UTF-8" />
                                    <link rel="icon" href="/favicon.ico" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <title>${title}</title>
                                </head>
                                <body>
                                    <div id="app">${html}</div>
                                </body>
                            </html>`;
           res.send(ret);
       });

       app.listen(9093, () => {
           console.log('listen 9093');
       })
```
