# Proxy&Reflect&装饰器

# Proxy

**代理**

Vue3使用proxy实现了真正的代理。

Vue2中，data中定义的变量，如果属性还是一个对象，初始化的时候就会递归的处理属性，收集依赖。

vue3中，当一个对象的属性还是一个对象时，只有在使用到它的时候，才会用proxy代理。

**Proxy是对对象的包装，将代理上的操作转发到对象，并可以选择捕获其中的一些操作。它可以包装任何类型的对象，包括类和函数。**

| 内部方法                | Handler方法              | 何时触发                                                     |
| ----------------------- | ------------------------ | ------------------------------------------------------------ |
| `[[Get]]` | get                      | 读取属性                                                     |
| `[[Set]]` | set                      | 写入属性                                                     |
| `[[HasProperty]]` | has                      | `in` 运算符                                                  |
| `[[Delete]]` | deleteProperty           | `delete` 操作                                                 |
| `[[call]]` | apply                    | proxy对象多为函数被调用                                      |
| `[[Construct]]` | construct                | new 操作                                                     |
| `[[GetPrototypeOf]]` | getPrototypeOf           | Object.getPrototypeOf                                        |
| `[[SetPrototypeOf]]` | setPrototypeOf           | Object.setPrototypeOf                                        |
| `[[IsExtendsible]]` | isExtendsible            | Object.isExtendsible                                         |
| `[[PrebentExtensions]]` | preventExtensions        | Object.preventExtensions                                     |
| `[[DefineProperty]]` | defineProperty           | Object.defineProperty, Object.defineProperties               |
| `[[GetOwnProperty]]` | getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor, for...in, Object.keys/values/entries |
| `[[OwnPropertyKeys]]` | ownKeys                  | Object.getOwnPropertyName, Object.getOwnPropertySymbols, for...in, Object.keys/values/enteries |

**proxy的handler中没有钩子函数时，proxy就是target的一个透明代理。**

```
let target = {};

let handler = {};

let proxy = new Proxy(target, handler);
```

**一般我们用代理覆盖了变量。代理应该在所有地方完全替代了目标对象，目标对象被代理之后，任何人都不应该再引用目标对象。**

```

let numbers = [1, 2, 3];

// 代理覆盖了变量。代理应该在所有地方都完全替代了目标对象，目标对象被代理之后，任何人都不应该再引用目标对象。
numbers = new Proxy(numbers, {
    get(target, key, receiver) {
         if (key in target) {
             return target[key];
         } else {
             return 0;
         }
     }
 })
```

**set钩子中，成功写入属性要返回true，否则返回false，什么都返回会出现TypeError**

**Object.keys() for...in等方法，都使用了内部的  [[OwnPropertyKyes]]方法，这个内部方法，使用 `ownKeys` 钩子来拦截**

```
/**
 * Object.keys()/Object.values() 返回带有enumerrable标记的非Symbol键值对
 * for...in 循环遍历所有带有 enumerable 标记的非 Symbol 键，以及原型对象的键
 * Object.getOwnPropertyNames(obj) 返回非 Symbol 键
 * Object.getOwnPropertySymbols(obj) 返回 symbol 键
 * **/
 
let user = {
    name: 'John',
    age: 30,
    _password: '***'
}

user = new Proxy(user, {
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
})

for (let key in user) {
    console.log(key);
}

console.log(Object.keys(user));
console.log(Object.values(user));
```

```
/**
 * Object.keys() 仅返回带有enumerable标记的属性，为了检查它，该方法会对每个属性调用[[GetOwnProperty]]  即 Object.getOwnPropertyDescriptor()
 * **/
let user = {};

user = new Proxy(user, {
    // 拦截内置方法 [[OwnPropertyKeys]]
    ownKeys(target) {
        return ['a', 'b', 'c']
    },
    // 拦截内置方法 [[GetOwnProperty]]
    // getOwnPropertyDescriptor(target, prop) {

    // }
})
// 当user为空的时候，检测不到 enumerable 标记，这里返回的就是空
console.log(Object.keys(user)); // []
```

```
// 如果该属性不存在，我们只需要拦截 [[GetOwnProperty]] 即 getOwnPropertyDescriptor(target, prop)

let user = {};

user = new Proxy(user, {
    // 拦截内置方法 [[OwnPropertyKeys]]
    ownKeys(target) {
        return ['a', 'b', 'c']
    },
    // 拦截内置方法 [[GetOwnProperty]]
    getOwnPropertyDescriptor(target, prop) {
        // 为了实现 [[GetOwnProperty]] 方法调用时，返回enumerrable标记
        return {
            enumerable: true,
            configurable: true
        }
    }
})

console.log(Object.keys(user));
```

**可撤销的代理**

```
let user = {};

let { proxy, revoke } = Proxy.revocable(user, {});

// 调用revoke会从代理中删除对目标对象的所有内部引用
```

# Reflect

**Reflect是一个内置对象，可简化的创建Proxy。**

**以前的内部方法 `[[Get]]` ， `[[Set]]` 都是规范，不能直接调用。Reflect使得调用这些方法称为可能，它的方法是内部方法的最小包装。**

**对于每一个可以被Proxy捕获到的内部方法。Reflect都有一个对应的方法，其名称和参数，和Proxy钩子相同，因此我们可以用Reflect将操作转发到原始对象。**

```
let user = {
    name: 'John'
}

user = new Proxy(user, {
    get(target, key, receiver) {
        console.log('get');
        // 使用Reflect将调用转发给对象
        return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
        console.log('set');
        return Reflect.set(target, key, value, receiver);
    }
})

console.log(user.name);
user.name = 'test';
```

# 装饰器

装饰器是一种函数，用于注释或修改类、类方法。写法是 `@+函数名` 。

除了注释，装饰器还可以用来类型检查。

**装饰器对类行为的改变，是代码编译时发生的，而不是在运行时，本质是在编译时执行的函数。**

**如果同一个方法有多个装饰器，就会像剥洋葱一样，先从外到内进入，然后由内到外执行。**

装饰器也可以传参进去的。

```
@testProps('name')
```

装饰器主要用于：

* 装饰类

  - 

```
    @annotation
    class MyClass {}
    
    function annotation(target) {
    	// 相当于给类加上了一个静态属性
    	target.annotation = true;
    }
    
    // 等同于
    
    class A {}
    A = decorator(A) || A
    ```

* 装饰方法或属性

  + `target`：类的原型对象

  + `name`：所要装饰的属性名

  + `descriptor`：该属性的描述对象

  - 

```
    class MyClass {
    	@readonly
    	method() {
    	
    	}
    }
    
    function readonly(target, name, descriptor) {
    
    	// descriptor对象原来的值如下，我们 可以改动里面的内容，再返回
        // {
        //     value: specifiedFunction,
        //     enumerable: false,
        //     configurable: true,
        //     writeable: true,
        // }
    
    	descriptor.writable = false;
    	return descriptor;
    }
    
    function log(target, name, descriptor) {
        const oldValue = descriptor.value;
        descriptor.value = function() {
            return oldValue.apply(this, arguments); // olaValue.apply(this, arguments)  在这里调用被装饰的方法。
        }
    }
    ```

**为什么装饰器不能用于函数？**

--因为存在函数提升。类不存在提升，所以装饰器可以用于类和类的方法

**装饰器的优点：**

* 不需要通过创建子类的方式去扩展功能，避免代码的臃肿。

* 装饰类的方法复用性高。

* 不会影响原对象的代码结构。

**装饰器在Vue中的应用：**

实际业务中，常常会把功能性代码和业务性代码耦合在一起，可以将功能性代码抽离出去，作为装饰器来装饰业务功能。

* **@Validate：**表单校验的逻辑抽离
* **@catchError：**try...catch逻辑的抽离
