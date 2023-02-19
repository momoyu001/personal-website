
# 项目的搭建

* 初始化项目：npm init @vitejs/app
* 路由管理、数据管理：`npm install vue-router@next`,  `npm install vuex@next` **该命令安装的都是4. X版本的vue-router、vuex**，使用`@next`安装的是vue3版本的
* 创建vue实例：

```js
import {
    createApp
} from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

* 创建路由实例
    - 栗子中使用的`hash`模式的路由
    - `history`模式的路由：createWebHistory()

```js
import {
    createRouter,
    createWebHashHistory
} from 'vue-router';

const routes = [
    // 配置具体的路由
]

const router = createRouter({
    history: createWebHashHistroy(),
    routes
})

export default router;
```

* 引入路由 

```js
import router from './router.js';

createApp(App).use(router).mount('#app');
```

# `composition API` + `<script setup>` 代码组织方式

## 响应式数据

```vue

<script setup>

    import { ref } from 'vue';
    let count = ref(1);

    function add() {
        count.value++

    }

</script>

```

ref函数函数返回的 `count` 变量就是响应式数据，针对ref返回的响应式数据，需要修改 `.value` 才能生效

## 组件的注册

在当前页面中 `import` 引入之后， `script setup` 会自动将该组件注册到当前页面，不需要我们再手动注册。

## 计算属性

在Composition API的语法中，计算属性和生命周期等功能，都可以脱离Vue的组件机制单独使用。

```js
import {
    computed
} from 'vue';

let active = computed(() => {

    // ...

})

let allDone = computed({

    get: function() {
        // ...
    },
    set: function(value) {
        // ...

    }

})
```

## compisition API 拆分代码

使用composition API的逻辑来拆分代码，把一个功能相关的数据和方法都维护在一起。把功能独立的模块，封装成一个独立的函数，真正做到按需拆分。

把清单功能的所有变量和方法，都放在函数内部定义并且返回，这样就可以放在任意的地方来维护。

```vue

<!-- Todolist.vue -->

<!-- 可以放在一个 .vue 文件中 ，哪一个script文件在上无所谓 -->
<script setup>

</script>

<script>
function useTodos() {

    // ... 具体代码逻辑

    return { title, todos, addTodo, clear, active, all, allDone };

}

</script>

```

拆分功能时，ref、computed等，都是从Vue中单独引入，而不是依赖于this上下文。

```js
// Todolist.js

import {
    ref,
    computed
} from 'Vue';

export function useTodo() {

    // ...

}
```

```js
import {
    useTodo
} from './Todolist.js';
let {
    title,
    active,
    ...
} = useTodo();
```

## script setup 好用的功能

`<script setup>` 是为了提高使用 `composition API` 的效率而存在的。

* 精简代码：
    - 举个栗子：累加器（有script setup 和 无script setup）

```vue

    <!-- 有script setup -->
<script setup>
import { ref } from 'Vue';

let count = ref(0);

function addCount() {
    count.value++; 
}
function addCount() {
    count.value++; 
}
</script>
```

```vue

    <!-- 无script setup -->
    <script >
        import { ref } from "vue";
        export default {
            setup() {
                let count = ref(1)
                function add() {
                    count.value++
                }

                return {
                    count, 
                    add
                }
            }
        }
        function addCount() {
            count.value++; 
        }
    </script>
```

* 可以使用顶层的await去请求后端的数据等等

## style样式的特性

* `scoped`属性：定义的css属性就只会应用到当前组件的元素上，避免样式上的冲突
* `:global`：在scoped中想写全局的样式的话，使用 :global 标记
* `v-bind`：直接在CSS中使用JavaScript中的变量

```
    import { ref } 'Vue';
    let color = ref('red');
    <style>
    h1 {
        color: v-bind(color); 

    }

    </style>
 
```
