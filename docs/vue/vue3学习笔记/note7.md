# Vue Devtools - 调试工具

## 浏览器自带的调试工具

### console

* [console的讲解-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Console)
* 在main.js中加入以下代码，可以直接在控制台中打印出stackoverflow搜索的地址

```js
window.onerror = function(e) {
    console.log(['https://stackoverflow.com/search?q=[js]+' + e])
}
```

* console.log
* console.info
* console.error
* console.table
* ...

**tips**

一道面试题：统计一个网页一共有多少种标签

```js
new Set([...document.querySelectorAll('*')].map(n => n.nodeName)).size
```

统计出现次数最多的三种标签

```js
Object.entries([...document.querySelectorAll("*")].map(n => n.tagName).reduce((pre, cur) => {
    pre[cur] = (pre[cur] || 0) + 1;
    return pre;
}, {})).sort((a, b) => b[1] - a[1]).slice(0, 3)
```

## Vue Devtools

* [安装](https://devtools.vuejs.org/guide/installation.html)

## 断点调试

* debugger

## 性能相关的调试
* `performace` tab页面
* [chorme官方文档](https://developer.chrome.com/docs/devtools/evaluate-performance)
* lighthouse 生成性能报告。根据性能报告中的相关建议。可以对网页进行性能的提升

# JSX

## h函数

* [官网教程](https://v3.cn.vuejs.org/api/global-api.html#createapp)
    - 返回一个”虚拟节点“，通常缩写为`VNode`：一个普通对象，其中包含向Vue描述它应在页面上渲染哪种节点的信息，包括所有子节点的描述，用于手动编写的`渲染函数`
    - 内部调用了`createVnode`来返回虚拟DOM。
    - 参数：`type`，`props`，`children`
        - **type**: HTML标签名、组件、异步组件或函数式组件 - `必须的参数` - `String | Object | Function`
        - **props**: 一个对象，与将在模板中使用的attribute、prop和事件对应 - `可选参数` - `Object`
        - **children**: 子代VNode，使用`h()`生成，或者使用字符串来获取`文本VNode`，或者带有插槽的对象 - `可选` - `String | Array | Object`
    - 栗子

```
<script>
render() {
    return h('h1', {}, 'Some title')
}

h('div', {}, [
    'Some text comes first.',
    h('h1', 'A headline'),
    h(MyComponent, {
        someProp: 'foobar'
    })
])

function addCount() {
    count.value++;
} 
</script>
```

* template是vue3的默认写法，Vue会把`<template>`解析为`render`函数，之后，组件运行的时候，通过render函数去返回虚拟DOM。`除了写template，在某些场景下，我们可以直接写render函数来实现组件。`
* 栗子

```js
import {
    defineComponent,
    h
} from 'vue';

export default defineComponent({
    props: {
        level: {
            type: Number,
            required: true
        }
    },
    setup(props, {
        slots
    }) {
        return () => h(
            'h' + props.level, // 标签名
            {}, // 标签的prop 或者 attribute
            slots.default() // 子节点
        )
    }
})
```

* 手写h函数，可以处理动态性更高的场景，如果是复杂的场景，h函数处理起来就会很复杂，需要把所有属性都转为对象 --> 替代方案 `JSX`

## JSX

* **在JavaScript里面写HTML的语法，就叫JSX。**是对JavaScript语法的一个扩展。 - 是h函数的一个语法糖，本质上就是JavaScript
* [官方教程](https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md)
* JSX的语法：

```
    const element = <h1 id="app">Hello, World</h1>; 
```

* JSX的本质：

```
    // h 函数内部也是调用这个函数返回虚拟DOM
    const element = createVnode('h1', { id: 'app' }, 'hello, world'); 
 
```

* JSX到createVnode的转换
  + 安装插件
        

```
        npm install @vitejs/plugin-vue-jsx -D
        function addCount() {
            count.value++; 
        }
```

  + 配置
        

```js
    // vite.config.js
    import vueJsx from 'vue-jsx'

    export default defineConfig({
        plugins: [vueJsx()]
    })

    function addCount() {
        count.value++;
    }
```

  + 定义    

```jsx
import {
    defineComponent,
    h
} from 'vue';

export default defineComponent({
    props: {
        level: {
            type: Number,
            required: true
        }
    },
    // 标签名都需要动态处理的需求
    setup(props, {
        slots
    }) {
        // return () => h(
        //     'h' + props.level, // 标签名
        //     {}, // 标签的prop 或者 attribute
        //     slots.default() // 子节点
        // )

        // 引入JSX之后的写法
        const tag = 'h' + props.level;
        return () => < tag > {
            slots.default()
        } </tag>
    }
})

function addCount() {
    count.value++;
}
```

  + 使用：与组件使用方式一致
* Tips:
  + vModel取代v-model： `vModel={title.value}`
  + onClick取到@click
  + .map取到v-for
  + 三元表达式取到v-if

## JSX 和 Template

* JSX的优势
    - JSX可以支持更动态的需求，而template则因为语法限制的原因，不能够像JSX那样可以支持更动态的需求
    - JSX：可以正在一个文件返回多个组件
* Template的优势
    - 静态标签直接越过Diff过程
    - 高效利用缓存

# Vue3 中使用 TypeScript

提高代码可维护性和调试效率的强类型语言-TypeScript

## 什么是TypeScript

相当于在JavaScript外面包裹了一层类型系统。

[演示连接](https://www.typescriptlang.org/play?#code/FAGwpgLgBAxg9gVwE4GcwDkCGBbMAuFCJASwDsBzKAXigHJBK50Bt4gNQTAGZALRUDbtQNwtbQkKAAcSMfKQTYARmCTUoARgBMATkHRiKAPKkQZfNLhxwmUgqJtgwUcXELaACzAgQcKAHc4SEABMBQA)

## TypeScript进阶用法 - 泛型

* 泛型就是指有些函数的参数，你在定义的时候是不确定的类型，而是返回值类型需要根据参数来确定。
* 我们再函数名后面的用尖括号包裹一个类型占位符

```
    function test<某种类型> (args: 某种类型): 某种类型 {
        return args
    }

    // 调用
    test(1)
    test<number>(1)
 
```

* 栗子：实现一个函数getProperty，动态的返回对象的属性

```
    function getProperty<某种类型， 某种属性 extends keyof 某种类型>(o: 某种类型， name: 某种属性)： 某种类型[某种属性] {
        return o[name]
    }

    function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
        return o[name]; 
    }
 
```

## Vue3中的TypeScript

* 使用：lang="ts" 标记当前组件使用TypeScript

```js
    import { computed, reactive, ref, defineProps, defineEmits } from '@vue/runtime-core';

    interface 极客时间课程 {
        name: string,
        price: number

    }

    const msg = ref('') // 根据输入参数推导字符串类型
    const msg1 = ref<string>('') // 可以通过泛型显示约束

    const obj = reactive({})
    const obj2 = reactive<极客时间课程>({ name: '玩转Vue3全家桶', price: 129 })

    const msg2 = computed(() => '') // 默认推导参数
    const course2 = computed<极客时间课程>(() => {
        return { name: '玩转Vue3全家桶', price: 129 }
    })

    const props = defineProps<{
        title: string,
        value?: number
    }>()

    const emit = defineEmits<{
        (e: 'update', value: number): void
    }>()
 
```

* vue-router
    - vue-router提供了`Router`，`RouteRecordRaw`两个路由的类型。
    - 路由的配置：RouteRecordRaw
    - 返回的router实例：Router

```
    import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

    const routes: Array<RouteRecordRaw> = [
        ...
    ]

    const router: Router = createRouter({
        history: createWebHashHistory(),
        routes
    })

    export default router
 
```

# Vue项目规范和基础库

 - Vite + Vue3 + Vue Router + Vuex + Element3 + Axios + Sass

## 组件库

 `npm install element3 --save`

```
import Element3 from 'element3'; 
import 'element3/lib/theme-chalk/index.css'; 
app.use(ELement3)

```

## 工具库

### axios

 `npm install axios --save`

### sass

 `npm install -D sass`

```

<style lang="scss>
$padding: 10px    // 变量
</style>

```

## 代码规范和提交规范

## ESLint - 代码规范

* 安装：`npm install eslint -D`
* 配置：根目录下执行`npx eslint --init`
* eslintric.json配置额外的校验规则
* `npx eslint src`：检测src目录下哪些代码不合规范
* 执行git commit命令的时候，同时执行ESLint：使用`husky`管理git的钩子函数，在每次代码提交至git之前去执行ESLint，校验通过才可以提交代码

## git - 提交规范

* Vue3的代码提交日志格式：【类别：信息】
    - fix - 修复
    - feat = 功能开发
* git提交规范：描述信息精准的git提交日志，会让我们在后期的维护和处理bug是有据可查

# 项目开发中的权限系统

* 栗子项目 Vite-Course

## 登录权限

### mock模拟数据

* 安装mockjs

```
    npm install mockjs vite-plugin-mock cross-env -D
 
```

* 在vite.config.js中添加mockjs插件

```

    import { viteMockServe } from 'vite-plugin-mock'

    plugins: [vue(), vueJsx(), viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: true,
    })]
 
```

### token

* 通常把用户名、过期日期等重要信心进行加密，生成一个token返回前端，前端后续的请求都需要带上token才可以认证通过

## 页面权限

### 路由导航守卫

* [路由导航守卫官网地址](https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html)

### 角色权限

* 控制一类角色的页面权限：动态路由.
* 一部分页面是写在代码的src/router/index.js中，另外一部分是我们通过axios获取数据之后，通过调用vue-router的addRoute方法到动态的添加进项目整体的路由配置的。
* 静态路由与动态路由之分

### 动态路由

* [动态路由](https://next.router.vuejs.org/zh/guide/advanced/dynamic-routing.html)

----- 还没有代码开放出来 -----
1、登录页面还没写
2、mock模拟数据不清楚
3、模拟请求不清楚

流程：
1、mock数据
2、jwt生成token
3、拦截器Token夹头
4、路由守卫权限验证
5、登录逻辑
