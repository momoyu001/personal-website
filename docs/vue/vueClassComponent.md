# vue-class-component

以类样式的语法创建Vue组件。

通过使用@Component装饰器对类进行注解，可以用直观和标准的类语法定义组件数据和方法。

组件数据：data选项中的变量会作为类成员变量

组件方法：methods选项中的方法会作为类成员方法

通过类样式定义组件，不仅可以更改语法，还可以利用一些ECMAScript语言特性，如类继承和装饰器。Vue类组件还为mixin继承提供了一个mixin助手，并提供了一个createDecrator函数来轻松创建自己的decrator。

`@Component` 装饰器使你的类成为一个Vue组件。

```js
import Vue from 'vue';
import Component from 'vue-class-component';

// HelloWorld这个类将成为一个Vue组件
@Component
export default class HelloWorld extends Vue {}
```

## 安装

```js
npm install vue - class - component - S
```

## 使用

### Data

data选项中的变量，作为类的 `成员变量` 。

成员变量不同初始值的情况：

* 1、初始值为`undefined`

  此时，该数据不是响应式的

* 2、初始值为`null`

  此时，该数据是响应式的

**data hook**

可以在class中使用data hook来代替声明变量。这种方式声明的变量，初始值为undefined也可以实现响应式。

```js
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Counter extends Vue {
    message = 'init-message';
    data() {
        return {
            hello: undefined
        }
    }
}
```

### Methods

methods选项中的方法，作为类的 `成员方法` 。

```js
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Counter extends Vue {
    counter = 0;
    // 作为类的原型方法
    incresement() {
        this.counter++;
    }
}
```

### Computed属性

计算属性可以声明为类属性getter/setter

计算属性的getter和setter：

getter：根据get中变量的变化而变动

setter：根据计算属性的值的直接变动而变动

最基础的计算属性，默认只有getter。

```js
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Counter extends Vue {
    firstName = 'John';
    lastName = 'Doe';

    // Name这一个计算属性的get和set
    get Name() {
        return this.firstName + ' ' + this.lastName;
    }

    set Name(value) {
        const splitted = value.split(' ');
        this.firstName = splitted[0];
        this.lastName = splitted[1] || '';
    }
}
```

### Hooks

`data` ， `render` ，和所有Vue声明周期钩子也可以直接声明为类原型方法，但是不能在实例本省上调用他们。在声明自定义方法时，应该避免使用这些保留名称。

```js
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Todo extends Vue {
    // mounted声明周期
    mounted() {

    }

    // render方法
    render() {

    }
}
```

### 其他

对于所有其他选项，将它们传递给装饰器函数

```js
import Vue from 'vue';
import Component from 'vue-class-component';
import MyCom from './myCom.vue';

@Component({
    components: {
        MyCom: MyCom
    }
})
export default class Todo extends Vue {

}
```

### 额外的hooks

当额外使用一些Vue插件比如Vue-Router，则可能需要类组件来解析它们提供的钩子，使用 `registerHooks` 来注册这样的钩子。

建议在一个专门的js文件里面注册类似的钩子： `class-component-hooks.js` 。需要在任何组件定义之前注册它们，可以在入口文件顶部来引入这个注册文件。

```js
import Component from 'vue-class-component';

Component.registerHooks([
    'beforeEach',
    'afterEach',
    'beforeRouterEnter'
])
```

注册之后，类组件将它们实现为类原型方法。

```js
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Todo extends Vue {
    beforeRouterEnter(to, from, next) {
        next();
    }
}
```

### 自定义构造器

通过创建自己的装饰器来扩展这个库的功能。 `createDecorator` 来创建定制的装饰器。

`createDecorator` 第一个参数是一个回调函数，回调函数将接收以下参数：

* `options`：Vue组件选项对象。此对象的更改将影响所提供的组件。

* `key`：应用装饰器的属性或方法的键。

* `parameterIndex`：如果自定义装饰器用于参数，则为已装饰参数的索引。

举个栗子：日志装饰器，当被装饰的方法被调用时，它打印带有方法名和传递参数的日志消息。

```js
// decorators.js
import {
    createDecorator
} from 'vue-class-component';

// 声明自定义装饰器，接收一个回调函数作为参数，回调函数有三个参数
export const Log = createDecorator((options, key) => {
    const originalMethod = options.methods[key];

    options.methods[key] = function wrapperMethod(...args) {
        console.log(`Invoked: ${key}(`, ...args, ')');

        originalMethod.app(this, args);
    }
})
```

使用的时候：

```js
import Vue from 'vue';
import Component from 'vue-class-component';
import {
    Log
} from './decorators';

@Component
class MyComp extends Vue {
    @Log
    hello(value) {
        // 当用 42 作为参数调用hello方法时，将打印：Invoked: hello(42)
    }
}
```

### 继承（Extend）和混入（Mixins）

#### 继承

原生类继承语法 `extends` 来实现继承。

**每个父类都必须是类组件，换句话说，它需要继承Vue构造函数，并由 `@Component` 装饰器进行装饰。**

举个栗子：

```js
// 父类组件 super.js
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Super extends Vue {
    superValue = 'root~~~';
}
```

```js
// 子类组件
import Super from './super.js';
import Component from 'vue-class-component';

@Component
export default class Done extends Super {
    currentValue = null;
    created() {
        this.currentValue = this.superValue;
    }
}
```

#### 混入

Vue类组件提供了mixins函数，以类样式的方式使用mixins。通过使用 `mixins函数` ，TypeScript可以推断出mixin类型，并在组件上继承它们。

**和父类一样，每一个mixin都必须声明为类组件。**

举个例子：

```js
// mixins.js 专门写混入的文件
import Vue from 'vue';
import Component from 'vue-class-component';

export class Hello extends Vue {
    hello = 'hello';
}
```

```js
// 使用的组件
// 引入vue类组件中的mixins方法
import Component, {
    mixins
} from 'vue-class-component';
import Hello from './Hello';

// extends继承的对象变为mixins
export default class Done extends mixins(Hello) {
    value = null;
    created() {
        // hello 这个变量就是混入的
        this.value = this.hello
    }
}
```

### 注意

**Vue类组件通过在底层实例化原始构造函数来收集类属性作为Vue实例数据。**

#### 1、属性初始化项的this

如果定义一个箭头函数作为一个类属性并在其中访问它，它将不起作用。这是因为在初始化类属性时，这只是Vue实例的代理对象。

```js
@Component
export defualt class Todo extends Vue {
    // 箭头函数的形式定义这个属性（函数类型的属性）
    bar = () => {
        // 这里的这个this并不是真正的Vue实例对象，所以 这样的方式并不能实现响应式的修改
        this.value = 120;
    }

    // 这种简单的定义一个方法而不是类属性，Vue会自动的绑定实例，就可以实现响应式
    foo() {

    }
}
```

#### 2、使用生命周期钩子而不是构造函数（constructor）

原始的构造函数被调用来收集初始组件数据，所以建议不要自己声明构造函数。把原本打算在 `constructor` 中做的事情，放到created中来处理。写了constructor会被意外的调用两次。

## TypeScript

### props定义

属性props的定义：Vue类组件没有专门定义属性的API，可以使用 `Vue..extends` 来定义

```html
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    // 通过Vue.extends来定义props属性
    const Props = Vue.extends({
        props: {
            name: String
        }
    })

    @Component
    export default class Todo extends Props {
        get message(): string {
            return 'Hello' + this.name;
        }
    }
</script>
```

使用类组件提供的 `mixins` 方法，可以把父类组件和定义的props组合起来。

### 属性声明

```js
import Vue from 'vue';
import Component from 'vue-class-component';
import {
    mapGetters,
    mapActions
} from 'vuex';

// post的接口类型定义
import {
    Post
} from './post';

@Component({
    computed: mapGetters([
        'posts'
    ]),

    methods: mapActions([
        'fetchPosts'
    ])
})
export default class Posts extends Vue {
    posts!: Post[] // !  显式赋值断言
    fetchPosts!: () => Promise < void > // ! 显式赋值断言

        mounted() {
            this.fetchPosts().then(() => {
                console.log(this.posts);
            })
        }
}
```

**PS：**TS中的 `!` ，表示强制解析（告诉ts编译器，这里一定有值），常用于vue-decorator中的@Prop。变量吼使用 `!` ，表示类型推断排除 `null` 、 `undefined` 。
