# Vuex

## vuex基础

* 集中式存储管理应用的所有组件的状态
* 安装：`npm install vux@next`
* 创建：

```js
import {
    createStore
} from 'vuex';

const store = createStore({
    state() {
        return {
            count: 666
        }
    },
    mutations: {
        add(state) {
            state.count++;
        }
    }
})
```

* 注册：

```js
import store from './store/index.js';
app.use(store);
```

* 使用：

```js
import {
    useStore
} from 'vuex';
let store = useStore();
let count = computed(() => store.state.count)

function add() {
    store.commit('add');

}
```

## 手写迷你Vuex

* 创建一个变量store用来存储数据
* 将这个store包装成响应式数据，并提供给vue组价使用
* [`provide/inject`来做数据共享](https://v3.cn.vuejs.org/guide/component-provide-inject.html#%E5%A4%84%E7%90%86%E5%93%8D%E5%BA%94%E6%80%A7)
* 实现: **vue的插件机制 + reactive响应式功能**

```js
import {
    inject,
    reactive
} from 'vue';

const STORE_KEY = '__store__';

function useStore() {
    return inject(STORE_KEY)

}

function createStore(options) {
    return new Store(options);

}

// Store 类来管理数据，内部使用 _state 来存储数据；mutations来存储 数据修改 的函数
class Store {
    constructor(options) {
        // 用reactive包装成响应式对象
        this._state = reactive({
            data: options.state()
        })
        this._mutations = options.mutations
    }

    get state() {
        return this._state.data;
    }

    commit = (type, payload) => {
        const entry = this._mutations[type];
        entry && entry(this.state, payload);
    }

    // 为了让useStore能够正常工作，我们需要给给store增加一个install方法，这个方法会在app.use函数内部执行
    install(app) {
        app.provide(STORE_KEY, this);
    }

}

export {
    createStore,
    useStore
}
```

* 使用：为了让useStore能够正常工作，我们需要给给store增加一个install方法，这个方法会在app.use函数内部执行。 `app.provide` 函数注册给全局的组件

```js
class Store {
    //....
    install(app) {
        app.provide(STORE_KEY, this)
    }

}

import store from './gvuex';
app.use(store);
```

## Vuex实战

**vuex就是一个公用版本的ref**
* 使用getters来实现computed的功能
* 实际项目中，有很多数据我们都是从网络请求中获取到的。在Vuex中，mutation的设计就是用来实现`同步`的修改数据。如果数据`异步`修改的，我们需要一个新的配置`action`
    - 同步：mutation
    - 异步：action - 并不是直接修改数据，而是通过提交mutation的方式去修改数据。调用方式是 `store.dispatch`
* Vuex的整体逻辑：
    - Vue的组件负责渲染页面
    - 组件中的跨页面数据，用state存储
    - Vue通过actions / mutations 去做数据的修改
    - `view -> actions -> state -> view`
* Vuex中所有数据修改都是通过mutations来完成的。

### 下一代Vuex

* Vuex对TypeScript的类型推导的支持很复杂
* `Pinia` - 天然对类型推导非常友好。API设计非常接近Vuex5
