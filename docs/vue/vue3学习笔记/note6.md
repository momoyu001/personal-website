# vue-router

## 前端路由的实现原理

### hash模式

* 通过URL中#后面的内容做区分，称之为`hash-router`
* createWenHashHistory()函数
* `hashChange`监听变化
* hash值的变化并不会导致浏览器页面的刷新，只会触发hashChange事件。通过对hasChange事件的监听，我们可以在fn函数内部进行动态的的页面切换。

```js
window.addEventListener('hashchange', fn);
```

### history模式

* 路由看起来和正常的URL完全一致
* createWebHistory()函数
* `popState`监听变化
* 2014年后，HTML5标准 发布，浏览器多了`pushState`和`replaceState`两个API。通过这两个API，我们可以改变URL的地址，并且浏览器不会向后端发送请求，同时还会触发`popState`事件。

```js
// 监听到通过pushState修改路由的变化，在fn函数中实现页面的更新
window.addEventlistener('popstate', fn);
```

## 手写vue-router - hash模式的路由

* Router类管理路由
* creatWenHsahHistory()返回hash模式相关的监听代码。返回当前URL、监听hashchange事件的方法
* install方法注册实例
* createRouter方法创建Router实例
* useRouter方法获取路由实例

```js
import {
    ref,
    inject
} from 'vue';
import RouterLink from './RouterLink.vue';
import RouterView from './RouterView.vue';

const ROUTER_KEY = '__router__';

// 创建路由
function createRouter(options) {
    return new Router(options);

}

function useRouter() {
    return inject(ROUTER_KEY);

}

// 创建 hash 模式的路由
function createWebHashHistory() {
    function bindEvents(fn) {
        window.addEventListener('hashchange', fn);
    }

    return {
        bindEvents,
        url: window.location.hash.slice(1) || ''
    }

}

// Router类管理路由
class Router {
    constructor(options) {
        this.history = options.history;
        this.routes = options.routes;
        this.current = ref(this.history.url);

        this.history.bindEvents(() => {
            this.current.value = window.location.hash.slice(1);
        })
    }

    install(app) {
        app.provide(ROUTER_KEY, this);
        app.component('router-view', RouterView);
        app.component('router-link', RouterLink);
    }

}

export {
    createRouter,
    createWebHashHistory,
    useRouter
}
```

* 注册两个内置组件`router-view`、`router-view`
  + Router实例中，返回了current，即当前路由地址，是响应式的数据
  + router-view组件：当current变化时，去匹配current地址对应的组件，然后动态的渲染router-view

```vue
<template>
    <component :is="comp"></component>
</template>

<script setup>
    import {
        computed
    } from 'vue';
    import {
        useRouter
    } from '../grouter/index.js';

    // 获取当前路由实例
    let router = useRouter();

    const comp = computed(() => {
        // 根据当前路由，在用户路由配置route中计算出匹配的组件，component动态渲染组件
        const route = router.routes.find((route) => route.path === router.current.value)

        return route ? route.component : null;
    })

    function addCount() {
        count.value++;
    }
</script>
```

  + router-link组件：组件中有一个`a`标签，只是`a`标签的href属性前面加了一个#，实现hash的修改。
  + 在Router文件中引入，并在install方法中，注册两个组件
* 路由的懒加载
* 路由的正则匹配。。。

### 路由实现的总结(HTML5标准出现后)

* API: location.hash; Event: hashchange -> `hash模式`
* API: history.pushState 、 history.replaceState; Event: popstate -> `history模式`
* API的介绍可参考红宝书第4版、12章
* 大致意思就是：hash的改变不触发页面reloads；pushState、replaceState改变history也不触发reloads。

## vue-router实战要点

### 路由匹配

* 支持动态路由: `:id` 是路由的动态部分

```js
const routes = [{
    path: '/user/:id',
    name: 'user',
    component: User
}]
```

### 路由导航守卫

* 支持做到根据用户对页面的控制

### 动态导入功能

* 路由懒加载，解决首屏渲染性能问题

## tips

* 此前hash的运用是页面中的锚点定位
* history模式需要后端配合，nginx新增配置，将所有路由都指向index.html
* history路由与html5配合更好，能充分利用html5的特性，比如html5中监听滚动条的状态等，history都可以监听，也更利于SEO
* **不管是手写实现vuex还是手写实现vue-router，都会用到provide/inject**
