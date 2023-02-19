# 深入理解Vue3的响应式机制

## 什么是响应式？

变量A由变量B计算之后得到，当修改变量B，变量A的值可以实时的改变，这就是响应式的雏形。

## 响应式的原理

vue中一共有三种响应式的解决方案： `defineProperty` ， `Proxy` ， `value setter`

### defineProperty

vue2中，实现响应式的原理 - defineProperty()。

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineproperty)

* 定义：Object.defineProperty()方法会直接在一个在对象上定义一个新属性，或者修改一个新对象的现有属性，并返回此对象。

* 语法：`Object.defineProperty(obj, prop, descriptor)`
* 参数：
    - obj: 要定义属性的对象
    - prop: 要定义或修改的属性的名称或`Symbol`
    - descriptor: 要定义或修改的属性描述符，是一个对象
* 返回值：被传递给函数的对象
* 通过一般的赋值操作添加的普通属性是可枚举的、可修改的、可删除的。默认情况下，使用该API添加的属性是不可修改(`immutable`)的。
* 描述符：（参数中的第三个参数）
    - 数据描述符：具有值的属性
        - `configurablle`: `true` - 属性的描述符可以改变，属性可以从对象上删除；`false` - 默认值
        - `enumerable`: `true` - 该属性出现在对象的枚举属性中；`false` - 默认值
        - `value`: 该属性对应的值，可以是任何有效的JavaScript值
        - `writable`：`true` - 属性的value可以被赋值运算符改变；`false` - 默认值
    - 存取描述符：getter和setter描述的属性
        - `configurablle`: `true` - 属性的描述符可以改变，属性可以从对象上删除；`false` - 默认值
        - `enumerable`: `true` - 该属性出现在对象的枚举属性中；`false` - 默认值
        - `get`: 属性的getter函数，访问改函数时会调用此函数
        - `set`: 属性的setter函数，当属性的值被改变时，会调用此函数，该方法接收一个参数
    - 两种描述符只能存在一种
* **栗子**

```js
// 实现响应式：Object.definProperty
let obj = {};
let count = 2;
let double = getDouble(count);

function getDouble(count) {
    return count * 2;
}

Object.defineProperty(obj, 'count', {
    get() {
        return count;
    },
    set(value) {
        count = value;
        double = getDouble(value);
    }
})

console.log(double); // 4
obj.count = 10;
console.log(double); // 20
```

* Object.defineProperty的缺点
    - 不能响应一个属性的删除，只能通过 `$delete` 来实现响应。

### Proxy

vue3实现响应式的原理 - Proxy

* Proxy是针对对象的监听，而不是针对某一个属性的监听，所以不仅可以代理哪些定义时不存在的属性，还可以代理更丰富的数据结构，比如Map、Set。

* **栗子**

```js
let obj = {};
let count = 2;
let double = getDouble(count);

function getDouble(count) {
    return count * 2;
}

let handler = {
    get: function(target, prop) {
        return target[prop];
    },
    set: function(target, prop, value) {
        target[prop] = value;
        if (prop === 'count') {
            double = getDouble(value);
        }
    },
    deleteProperty(target, prop) {
        delete target[prop];
        if (prop === 'count') {
            double = NaN;
        }
    }
}
let proxy = new Proxy(obj, handler);

console.log(obj.count, double); // undefined 4
proxy.count = 2;
console.log(obj.count, double); // 2 4
proxy.count = 10;
delete proxy.count;
console.log(obj.count, double); // undefined NaN
```

* Vue3中`reactive`函数可以把一个对象变成响应式数据，而reactive函数就是通过Proxy实现的

```js
import {
    reactive,
    computed,
    watchEffect
} from 'vue';

let obj = reactive({
    count: 1
})

let double = computed(() => {
    return count * 2;
})

obj.count = 10;

watchEffect(() => {
    console.log('数据被修改了', obj.count, double);
})
```

### value setter

Vue3 响应式实现的原理：利用 `对象的get和set函数` 来进行监听

* 这中响应式的实现方式，只能拦截某一个属性的修改，这也就是Vue3中`ref`这个API的实现。

* **栗子**

```js
let getDouble = n => n * 2;
let _value = 1;
let double = getDouble(_value);

let count = {
    get value() {
        return _value;
    },
    set value(val) {
        _value = val;
        double = getDouble(val);
    }

}

console.log(count.value, double);
count.value = 2;
console.log(count.value, double);
```

### 响应式实现原理的总结

![总结]("./img/响应式.png")

## 定制响应式数据

任意拆分出独立的函数。把一切项目中的状态和 数据都封装成响应式的接口，屏蔽了浏览器的API，对外暴露的就是普通的数据。

* **栗子**

```js
// 数据实时同步到localStorage，封装成一个独立的函数 useStorage
import {
    watchEffect,
    ref
} from 'vue';

export function useStorage(name, value = []) {
    let data = ref(JSON.parse(localStorage.getItem(name) || '[]') || value);

    watchEffect(() => {
        localStorage.setItem(name, JSON.stringify(data.value));
    })

    return data;

}

// 使用时
import {
    useStorage
} from "../utils/useStorage";

let todos = useStorage('todos', []);
```

*  **栗子**

```js
// 在loading状态下，修改浏览器的小图标favicon
import {
    ref,
    watch
} from 'vue';
export function useFavicon(newIcon) {
    const favicon = ref(newIcon);

    const updateIcon = (icon) => {
        document.head.querySelectorAll(`link[ref="icon"]`).forEach(el => el.href = `${icon}`);
    }

    const reset = () => favicon.value = './favicon.ico';

    watch(favicon, (i) => {
        updateIcon(i);
    })

    return {
        favicon,
        reset
    };
}
```
