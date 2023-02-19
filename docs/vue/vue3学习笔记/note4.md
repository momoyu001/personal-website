# VueUse工具包

* 提供了大量的工具包，包括全屏、网络请求、动画等。
* 插件安装

```
npm install @vueuse / core
 
```

# Vue的组件化机制

## 组件属性的定义

* 使用 `defineProps` 来规范数传递的格式，参数是一个对象，对象中就是具体的属性定义
* **栗子**

```js
import {
    defineProps,
    computed
} from 'vue';
let props = defineProps({
    value: Number
})

// 组件内部使用属性时，都是  props.  的方式
let rate = computed(() => '★★★★★☆☆☆☆☆'.slice(5 - props.value, 10 - props.value))
```

## 组件事件

* 使用`defineEmits`来传递事件。

```js
let emits = defineEmits('update-rate');

function onRate(num) {
    emits('update-rate', num);

}
```

## 组件的v-model

* 对于自定义组件来说，v-model是两个语法：`传入属性`和`接收组件传递数据`的简写
* Vue3中默认绑定的变量名变了，从`value`变成了`modelValue`; 如果要改变变量的值，要执行一个事件`this.$emit('update:modelValue', value)`
* 对于没有使用默认绑定变量modelValue变量的情况：父组件使用`v-model:xxx="prop`来传递prop，子组件使用`$emit('update:xxx', argu)`返回给父组件值。`xxx`为组件传值的属性名，`argu`为子组件返回给父组件的值。`xxx`要 一致，能够对应上。
    - 子组件：使用v-model默认绑定变量的场景

```js
let props = defineProps({
    // 声明了v-model默认绑定的变量 - modelValue
    modelValue: Number
})

// 定义事件： 'update:modelValue'
let emits = defineEmits(['update:modelValue']);

function onRate(num) {
    // 执行事件： 'update:modelValue'
    emits('update:modelValue', num);

}
```

  + 父组件：使用v-model默认绑定变量的场景

```html
 <!-- 使用时，对于默认绑定的变量，可以直接使用v-model -->
 <Rate v-model="score">
```

  + 子组件：使用其他变量的场景

```js
let props = defineProps({
    // 声明了v-model绑定的变量 - value
    value: Number
})

// 定义事件： 'update:value'
let emits = defineEmits(['update:value']);

function onRate(num) {
    // 执行事件： 'update:value'
    emits('update:value', num);

}
```

  + 父组件：使用其他变量的场景

```html
    <Rate v-model:value="score">
```

* [Element3评级组件的实现](https://github.com/hug-sun/element3/blob/master/packages/element3/packages/rate/Rate.vue)

## 插槽

* slot插槽，显示组件的子元素

# Vue中的动画

* Vue3中使用内置的`transition`组件来实现动画效果
* `transition`需设置name属性。mode属性
* 实现动画的原理
  + enter: v-enter-active

```
    opacity: 0 - v-enter-from
    opacity: 1 - v-enter-to 
 
```

  + leave: v-leave-active

```
    opacity: 1 - v-leave-from
    opacity: 0 - v-leave-to
```

* `transition-group`：
    - 在v-for渲染列表的场景下，我们使用`transition-group`组件去包裹元素，通过tag属性指定渲染一个元素。
    - 不仅可以进入和离开动画，还可以改变定位。这个功能新增了`v-move`类
* 更精准的控制动画：在transition组件上使用一下三个方法
    - `before-enter`：
    - `enter`：
    - `after-enter`：动画结束后的钩子函数
