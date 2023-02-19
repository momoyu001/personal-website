# TypeScript

**语言类型**

* 静态类型语言：在`编译阶段`确定所有变量的类型

* 动态类型语言：在`执行阶段`确定所有变量的类型

------

**类型注解**

作用：相当于强类型语言中的类型声明

语法： `(变量/函数)：type`

------

**基本数据类型**

* 对象：

  - 

```js
    let obj: object // 表示非原始类型
    let obj: Object // TS定义的标准JavaScript Object接口
    let obj: {} // 表示一个空对象类型
```

* 元组：限制了元素的类型和个数
  
* 可以使用`push`方法添加元素，但是尝试访问时就会报错。不建议这样使用
  
* 函数：

  + 没有显式的定义返回值时，返回的时`void`类型

  + 函数定义：
    - 

```js
      let add = (x: number, y: number): number => number
```

  + 函数类型：没有具体的实现
    - 

```
      let computed: (x: number, y: number) => number
      ```

* undefined、null：是任何类型的子类型，可以被赋值给其他类型
* never：永远不会有返回值的类型，如：一个函数报异常

```js
// 原始类型
let bool: Boolean = true;
let num: Number = 123;
let str: string = 'abc';

// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array < number > = [1, 2, 3]; // 泛型接口的声明方式
let arr3: Array < string > = ['1', '2', '3'];
let arr4: string[] = ['1', '2', '3'];
let arr5: Array < number | string > = [12, 13, '14']; // 联合类型

// 元组 -- 限制了元素的类型和个数
let tuple: [number, string] = [10, 'abc'];
tuple.push(2)
console.log(tuple)

// 函数
let add = (x: number, y: number): number => x + y;
let computed: (x: number, y: number) => number;
computed = (a, b) => a + b;

console.log(computed(20, 30));

// 对象
let obj: {
    x: number,
    y: number
} = {
    x: 1,
    y: 2
}

// symbol
let s1: Symbol = Symbol('1');
let s2: Symbol = Symbol('1');
console.log(s1 == s2);

// undefined null    声明了 undefined  null 类型之后，不能被赋值为其他类型
let un1: undefined = undefined;
let un2: null = null;

// void
let noReturn = () => {}

// any:不执行类型时，就是any类型，可以被任意类型的变量赋值
let x

// never : 永远不会有返回值的类型，如函数返回了异常，死循环
let error = () => {
    throw new Error('error');
}

let endless = () => {
    while (true) {}
}
```

------

**枚举类型**

* 枚举成员的值是只读类型，定义了之后是不可以修改的

* 数字枚举

  + 可以反向映射：编译之后，枚举值，枚举名称都可以作为key，就是反向映射

  + 枚举值默认从0开始

  + 某一项赋值修改了之后，后续的也会改变，依次递增

  - 

```
    enum Role {
        Reporter,
        Devloper,
        Maintainer = 4,
        Owner,
        Guest
    }
    ```

* 字符串枚举

  + 没有反向映射：只有枚举名称可以作为key

* 异构枚举（不建议使用）

  + 数字枚举 + 字符串枚举 混用

* 常量枚举：用`const`声明的枚举变量

  - 

```js
    const enum Month {
        Jan,
        Feb,
        Mar
    }
```

  + 会在编译阶段被移除

  + 当我们不需要一个对象，而需要对象的值的时候，就可以使用常量枚举，减少在编译环境的代码

* 枚举成员的分类：

  + const number：会在编译的时候计算出结果，以常量的结果出现在运行时环境
    - 没有初始值
    - 对已有枚举成员的引用
    - 常量的表示
  + computed number：需要被计算的枚举成员，非常量的表达式，不会再编译阶段进行计算，而是会保留到程序的执行阶段
    - 出现在computed之后的枚举值，一定要赋值初始化，会有报错提示

------

**接口类型**

* **对象类型接口**

* interface关键字定义

* 类型断言，明确某一个变量是某种类型的，使用`as`关键字，或者`<>`，建议第一种

* 接口变量的属性

  + 可选属性：`?`
    - 

```
      interface list {
      	name?: string
      }
      ```

  + 只读属性：`readonly`

  + 当不确定接口中属性的类型时，使用索引签名，例如：`[x: string]: any`

    - 数字索引

    - 字符串索引
    - 

```js
      // 两种索引签名可以混用，
      // 但是，数字索引的返回值，必须是字符串索引返回值的子集，因为JS会进行类型转换
      interface Names {
          [x: string]: string;
          [Z: number]: string;
      }
```

* **函数类型接口**

  + **用接口定义函数，必须有一个匿名函数，这个匿名函数就是接口定义的函数**

  - 

```js
    // 函数类型声明，返回的number类型，用变量定义函数类型
    let addFunc1: (x: number, y: number) => number;

    interface AddFunc2 {
        (x: number, y: number): number
    }

    // 实现具体的函数
    let addFuncTest: AddFunc2 = (x, y) => x + y
```

  - 

* **混合接口**

  + 一般写第三方类库的时候会用到，很多类库名称可以直接当函数调用，也可以有属性和方法

  - 

```js
    /**
     * 混合接口：既有对象类型的，也有函数类型的
     * **/

    interface Lib {
        (): void;
        version: string;
        doSomething(): void
    }

    let lib: Lib = (() => {}) as Lib;
    lib.version = '1.0';
    lib.doSomething = () => {}
```

-----

**函数的总结**

* 函数的定义：

  - 

```js
    /**
     * 函数定义
     * **/

    // function关键字声明定义
    function test1(x: number, y: number): number {
        return x + y
    }

    // 函数表达式声明定义
    let test2 = (x: number, y: number): number => x + y;

    // 通过变量定义函数类型
    let test3: (x: number, y: number) => number;
    test3 = (a, b) => a + b;

    // 接口定义函数类型
    interface Test4Add {
        (x: number, y: number): number
    }
    let test4: Test4Add = (a, b) => a + b;

    // 类型别名，定义函数类型
    type test5 = (x: number, y: number) => number;

    /**
     * 通过变量、接口、type定义是函数类型，并没有具体的实现
     * **/
```

  + 可选参数：必须位于必选参数之后
    - 

```js
      function add6(a: number, b ? : number): number {
          return a + b;
      }
```

  + 参数的默认值：在必选参数前，默认参数是不能省略的，必须明确的传入`undefined`来获得默认值。必选参数之后的默认值参数是可以不传的。
    - 

```js
      function add7(x: number, y = 0, z: number, g = 1) {
          return x + y + z + g;
      }
```

  + 剩余参数：参数不确定的时候：剩余参数，剩余参数的类型是数组
    - 

```js
      function add8(x: number, ...rest: number[]) {
          return x + rest.reduce((pre, next) => pre + next)
      }
```

* 函数重载：

  + C++中两个函数名称相同，但是参数个数、类型不同，那么这就是函数重载。

  + TS中的函数重载，要求先定义一系列的函数声明。然后在一个类型最宽泛的声明中实现重载

  - 

```js
    function add9(...rest: number[]): number;

    function add9(...rest: string[]): string;

    function add9(...rest: any[]): any {
        let first = rest[0];

        if (typeof first === 'string') {
            return rest.join('');
        } else if (typeof first === 'number') {
            return rest.reduce((prev, cur) => prev + cur);
        }
    }

    console.log(add9(1, 2, 3))
    console.log(add9('12', '34'))
```

  + 函数声明列表，匹配可能性最高的定义，写在上面，TS是从上往下一个尝试匹配查找的
    - 

```js
      // 函数声明列表
      function add9(...rest: number[]): number;

      function add9(...rest: string[]): string;

      function add9(...rest: any[]): any
```

----

**TS中的类**

**一、类与继承**

* 类的定义
  + 无论在ES还是TS中，类成员的属性，都是实例属性，而不是原型属性；类成员的方法，都是原型方法。

  + 实例的属性必须具有初始值：要么在构造函数中赋值，要么声明的时候就初始化（与ES中的不同，ES中不要求初始化）

  + 属性可以声明为可选属性

  - 

```js
    class Dog {
        constructor(x: string) {
            // 构造函数中给类成员属性赋值了
            this.name = x;
        }
        name: string;
        run() {};
        private pri() {}
        protected pro() {}
        // 只读属性一定要被初始化，与属性实例一样
        readonly legs: number = 4
        // 静态成员  只能通过类名来访问
        static food: string = 'bones';
    }
```

* 类的继承

  - 

```js
    class Husky extends Dog {
        constructor(name: string, color: string) {
            super(name);
            // 子类的this要在super调用之后再调用
            this.color = color
        }
        color: string
    }
```

* 类的修饰符：

  + public：
  + private：当给构造函数加上`private`修饰符时，表示这个类既不能被实例化，也不能被继承
  + protected：只能再类或者子类中访问，不能在实例中访问。当构造函数被`protected`修饰时，表示这个类不能被实例化，只能被继承。
  + readonly：与实例属性一样，必须要被初始化
  + static：静态成员，只能通过类名来访问。子类也可以访问
  + 构造函数的参数也可以添加修饰符：被修饰的参数，变成了实例的属性，免去了定义

**二、抽象类与多态**

**抽象类**

* 抽象类：只能被继承，不能被实例化的类，用`abstract`关键字定义

* 抽象类中可以实现具体的方法，实现复用

* 抽象类中也可以不实现具体的方法，定义一个抽象方法：**明确知道子类可以有其他的实现，没必要在父类中实现**，然后再子类中具体的实现。

- 

```js
  abstract class Animal {
      eat() {
          console.log('吃东西~~~');
      }

      // 明确知道子类可以有其他的实现，没必要在父类中实现
      abstract sleep(): void
  }
```

  

**多态**

* 父类的一个抽象方法，再子类中有不同的实现

**抽象类和接口 **

* 抽象类中可以包含接口的实现，也可以只声明；接口中只能声明，不能定义
* 抽象类侧重类别的抽象；接口侧重功能的抽象

**三、类和接口的关系**

* 类继承接口：`implement`关键字
  + 接口只能约束类的公有成员，也不能约束构造函数
* 接口继承接口：`extends`关键字
* 接口继承类：接口将类的结构抽离了出来，只有类的结构，没有实现。
  + 接口在抽离的时候，把公共成员、私有成员、受保护成员都抽离了。**这么做的目的是限定接口的使用范围，并不会真正为这个接口添加类的私有和受保护属性（实际上接口也没有这种类型的属性），而这个限定范围就是：只能由子类来实现这个接口。**
  + **接口 IButton 继承了类 Button（含私有成员），那么 IButton 只能被 Button 或 Button 的子类实现。**假设 IconButton、TextButton 都是 Button 的子类，那么它们都可以实现 IButton 的结构。 但如果有另一个类 Text，它与 Button 毫不相干，就不能随意实现 IButton。

------

**泛型**

定义：不预先确定数据类型，具体的类型在使用的时候才确定。

把泛型理解为代表类型的参数

**泛型使用时必须得到具体的类型，泛型是在运行时明确的类型。**

* 泛型的好处
  + 函数和类可以轻松的支持多种类型，增强程序的扩展性
  + 不必写多条函数重载，冗余的联合类型声明，增强代码可读性
  + 灵活的控制类型之间的约束

​	

**一、泛型函数**

```js
function log < T > (value: T): T {
    console.log(value);
    return value;
}

// 调用
// 明确指出T的类型
log < string[] > (['a', 'b', 'c']);
// TS 的类型推断自动推断出类型
log('21212');
```

```js
type Log = < T > (value: T) => T;
let mylog: Log;
mylog = (a) => {
    return a
}

let log1: Log = (a) => a;
```

**二、泛型接口**

```js
// 泛型约束了接口的某个成员
interface Log {
    // 去掉函数名称，（参数）：返回值类型
    <
    T > (value: T): T
}

// 泛型约束整个接口
// 当泛型约束了整个接口时，在实现时必须指定一种类型
interface Log1 < T > {
    (value: T): T
}

let lyLog1: Log1 < string[] > = log;
```

```js
type Log = < T > (value: T): T;
// 等价的
interface Log {
    <
    T > (value: T): T
}

使用的时候， 可以不具体指定类型
```

```js
type Log < T > = (value: T): T;
// 等价的
interface Log < T > {
    (value: T): T
}

使用的时候， 需要指定具体的类型
```

**三、泛型类**

泛型不能约束类的静态成员

```js
class Log2 < T > {
    run(value: T) {
        console.log(value);
        return value;
    }
}
let log2 = new Log2 < number > ();
log2.run(1);
let log21 = new Log2 < string > ();
log21.run('1');
```

**四、泛型约束**

```js
interface Length {
    length: number
}
// T 受到了一定的约束，不管T是什么类型，都必须要有length这个属性
function logFunc < T extends Length > (value: T): T {
    console.log(value, value.length);
    return value;
}

logFunc([12]);
logFunc('1221');
logFunc({
    length: 10
})
```

-----

**类型推断**

不需要指定变量的类型，TS可以根据某些规则自动为其生成一个类型

* 从右往左的推断，根据值的类型，推断出变量的类型。

* 根据上下文进行推断

* 类型断言`as`，允许你自己去覆盖TS的类型推断。（从使用效果上来看，更像是强制类型转换，功能就是通过语法检查）

```js
const string1 = 'abc'; //  const string1: 'abc'
const obj1 = {
    string1: 'abc' //  string1: string
};

// 报错：不能将’string‘类型分配给’abc‘
const needAbc: typeof string1 = obj1.string1;
```

以上问题的原因：

const定义的，是一个字符串字面量类型，，不可修改，如果是用let声明的变量，类型就是 `let string1: string`

obj1中的string1是string类型，是因为obj1是const定义的，地址不可变，但是属性的值是可以改变的

解决报错的语句，可以使用类型断言 `const obj1 { string1: 'abc' } as const` 。 `as const` 会将对象的每个属性（支持深层）都定义为只读。

------

**类型兼容 **

当一个类型Y可以被赋值给另一个类型X的时候，我们就说类型X兼容类型Y

 `X 兼容 Y：X（目标类型） = Y（源类型）`

* 接口兼容：成员少的兼容成员多的

  - 

```js
    interface X {
        a: any,
            b: any
    }

    interface Y {
        a: any,
            b: any,
            c: any
    }

    let x: X = {
        a: 1,
        b: 2
    };
    let y: Y = {
        a: 1,
        b: 2,
        c: 3
    };
    x = y; // Y 接口具备 X 的所有属性
    // y = x; // X 接口不具备 X 的所有属性
```

* 函数兼容：有三个条件

  - 

```js
    type Handler = (a: number, b: number) => void;

    function hof(handler: Handler) {
        return handler;
    }
```

  + 参数兼容

  - 

```js
    let handler1 = (a: number) => {};
    hof(handler1);
    let handler2 = (a: number, b: number, c: number) => {};
    // hof(handler2); // 三个参数就不可以了，目标函数只有两个参数

    // 看可选参数和剩余参数的情况
    let a = (p1: number, p2: number) => {};
    let b = (p1: number, p2 ? : number) => {};
    let c = (...args: number[]) => {};

    // 固定参数兼容可选参数和剩余参数
    a = b;
    a = c;
    // 可选参数不兼容固定参数和剩余参数，可以改配置，不报错
    b = a;
    b = c;
    // 剩余参数兼容固定参数和可选参数
    c = a;
    c = b;
```

  + 参数类型兼容

  - 

```js
    let handler3 = (a: string, b: number) => {};
    hof(handler3); // 参数类型不匹配
```

  - 

```js
    interface Point3D {
        x: number,
            y: number,
            z: number
    }

    interface Point2D {
        x: number,
            y: number
    }

    let p3d = (point: Point3D) => {};
    let p2d = (point: Point2D) => {};

    // 与接口兼容中结论相反，接口兼容中，参数少的兼容参数多的，这里是参数多的兼容参数少的，可以把这里的接口的属性理解成参数，参数多的兼容参数少的
    p3d = p2d; // p3d 兼容 p2d
    // p2d = p3d; // p2d 不兼容 p3d   。。。可以通过配置，不报错
```

  + 返回值类型兼容

  - 

```js
    // 3）返回值类型    - -   成员少的兼容成员多的
    let ff = () => ({
        name: 'Alice'
    });
    let gg = () => ({
        name: 'Alice',
        location: 'Beijing'
    });

    ff = gg;
    // gg = ff;  // 报错
```

* 枚举兼容

  + 枚举类型和数值类型是互相兼容的

  + 枚举类型之间是不互相兼容

  - 

```js
    // 枚举和number兼容
    let fruit: Fruit.Apple = 1;
    let no: number = Fruit.Apple;

    // 枚举之间是不兼容的
    // let color: Color.Red = Fruit.Apple;
```

* 类兼容

  + 与接口一样，比较的结构

  + 类中的静态成员和构造函数不参与兼容比较

  + 当两个类中私有成员时，就不兼容了

  + 有私有成员时，父类和子类间可以兼容

  - 

```js
    class A {
        constructor(p: number, q: number) {}
        id: number = 1
        private p: number = 12
    }

    class B {
        static a = 1;
        constructor(p: number) {};
        id: number = 3;
        private p: number = 12
    }

    let aa = new A(1, 2);
    let bb = new B(1);

    // 都具有实例属性 id
    // aa = bb;
    // bb = aa;

    // 如果类中有私有成员，就不兼容了，这时只有父类和子类之间是兼容的 
    // aa = bb;
    // bb = aa;

    class CC extends A {

    }

    let cc = new CC(1, 2);

    // 父类和子类之间是兼容的（此时子类是没有自己的额外属性的，当有自己额外的属性时，子类就不兼容父类）
    aa = cc;
    cc = aa;
```

* 泛型兼容

  - 

```js
    interface Empty < T > {
        value: T
        // name: string
    }

    let obj1: Empty < number > = {};
    let obj2: Empty < string > = {};

    // 当接口是空的，两个变量是兼容的
    // obj1 = obj2;
    // obj2 = obj1;

    // 当接口增加了属性，且使用了泛型变量T
    obj1 = obj2;

    // 泛型变量 T 被使用了，才会影响泛型的兼容性
```

* 泛型函数

  - 

```js
    let log11 = < T > (x: T): T => {
        console.log('x');
        return x;
    }

    let log22 = < U > (y: U): U => {
        console.log('y');
        return y;
    }

    // 两个泛型函数的定义相同，但是还没有指定参数，是可以相互兼容的
    log11 = log22;
    log22 = log11;
```

**总结**

* 结构之间兼容，成员少的兼容成员多的（函数返回值也是结构类型的）（我要的你都有，那我 兼容你）

* 函数之间兼容，参数多的兼容参数少的（你给的太多了，我不能兼容你）

-----

**TS中的特殊类型 `{}、object、Object` **

```js
let a: {};
a = {
    p: 0
}; // OK
a = []; // OK
a = 1; // OK
a = "s"; // OK
a = false; // OK
a = null; // Error
a = undefined; // Error
```

```js
var b: object;
b = {
    p: 0
}; // OK
b = []; // OK
b = 1; // Error
b = "s"; // Error
b = false; // Error
b = null; // Error
b = undefined; // Error
```

```js
var c: Object;
c = {
    p: 0
}; // OK
c = []; // OK
c = 1; // OK
c = "s"; // OK
c = false; // OK
c = null; // Error
c = undefined; // Error
```

-----

**类型保护**

TS能够在特定的区块中保证变量属于某种确定的类型。可以在此区块中引用此类型的属性，或者调用此类型的方法。

创建这种区块的四种方法：

* 一、`instanceof`关键字：判断一个对象是不是一个类的实例
* 二、`in`关键字：判断一个对象是不是某个属性
* 三、`typeof`关键字：判断一个变量的类型

* 四、类型保护函数：复杂逻辑的判断

  + 类型保护函数的返回值，是 `类型谓词`

  - 

```js
    /**
     * 类型保护函数，这种函数的返回值时类型谓词
     * **/
    function isJava(lang: Java | JavaScript): lang is Java {
        return (lang as Java).helloJava !== undefined
    }
```

------

**交叉类型和联合类型**

* 交叉类型：**取并集**

  + 两个类型定义了同一个基本类型变量：

  - 
  

```ts
    interface A {
        a: number
    }
    interface B {
        a: string
    }
    let foo: A & B = {
        a: 
    }
        
    foo 的属性 a 的类型应该是 never，即 number & string 的类型。但 TS 规定没有任何值可以赋值给 never 类型，所以无论怎么赋值都会失败。
    ```

  + 两个类型定义了同名的函数：

  - 
  

```ts
    interface A {
        f(a: number): number
    }
    interface B {
        f(a: string, b: string): string
    }
    
    let foo: A & B = {
        f(a: never) {
            return a
        }
    }
    
    在交叉类型中，发生了函数重载，foo中的具体实现应该是一个宽泛的版本，同时兼容A和B中的定义：参数个数上，要选择最少的，参数类型和返回值类型参考前面的例子，取 number & string，即 never。这样不会报错。
    ```

* 联合类型：声明的类型并不确定，可以为多个类型中的一个。在类型没有确定的情况下，只能访问共有的成员

  - 
  

```ts
    let a1: number | string = 'a';
    ```

------

**索引类型**

索引类型的查询操作符： `keyof T` 。表示：T的所有公共属性的字面量的联合类型。（官方没有明确的定义 ，可以理解为使用了 `keyof T` 的类型）

索引类型 的访问操作符： `T[K]` 。

```js
function getValues < T, K extends keyof T > (obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key]);
}
```

------

**映射类型**

通过映射类型 ，从一个就的类型生成一个新的类型。

TS提供了很多内置的映射类型，如 `Readonly` 、 `Partial` 、 `Pick` 、 `Record` 等。

```js
interface Obj1 {
    a: number,
        b: string,
        c: boolean
}

// 将所有属性都转换成了只读属性
type ReadonlyObj = Readonly < Obj1 > ;
let aaa1: ReadonlyObj = {
    a: 12,
    b: '23',
    c: true
}

// 可选属性
type PartialObj = Partial < Obj1 > ;
let aaa2: PartialObj = {

}

// 选取部分属性
type PickObj = Pick < Obj1, 'a' | 'b' > ;
let aaa3: PickObj = {
    a: 12,
    b: '2'
}

// 创建一些新的属性。参数：预定义的新的属性；已知的类型
type RecordObj = Record < 'x' | 'y', Obj1 > ;
let aaa4: RecordObj = {
    x: {
        a: 1,
        b: '12',
        c: false
    },
    y: {
        a: 1,
        b: '12',
        c: false
    },
}
```

------

**条件类型**

`T extends U ? X : Y` ：T可以被赋值为类型U，那么结果就是X类型，否则就是Y类型。

```ts
type TypeName<T> =
    T extends string ? 'string' :
    T extends number ? 'number' :
    T extends boolean ? 'boolean' :
    T extends undefined ? 'undefined' :
    T extends null ? 'null' :
    'object';

type T1 = TypeName<string>;
type T2 = TypeName<string[]>;
```

分布式条件类型： `(A | B) extends U ? X : Y` 。相当于 `A extends U ? X : Y | B extends U ? X : Y`

```ts
type T3 = TypeName<string | string[]>;

type Diff<T, U> = T extends U ? never : T;

type T4 = Diff<'a' | 'b' | 'c', 'a' | 'e'>; // 'b'  'c'
// Diff<'a', 'a' | 'e'>   // never
// Diff<'b', 'a' | 'e'>   // 'b'
// Diff<'c', 'a' | 'e'>   // 'c'
```

```ts
type NotNull<T> = Diff<T, undefined | null>;
type T5 = NotNull<string | number | boolean | undefined | null>;
```

以上的 `Diff` ， `NotNull` ，官方都有了内置的实现。即

```ts
Exclude<T, U>;   // Diff
NonNullable<T>;   // NotNull
```

**内置的条件类型：**

* `Exculde<T, U>`：从类型T中过滤掉可以赋值给类型U的类型

  - 

```ts
    type T4 = Exclude<'a' | 'b', 'b'>;  // 'a'
    ```

* `NonNullable<T>`：

  - 

```ts
    type T5 = NotNull<string | number | boolean | undefined | null>;     // string | number | boolean
    ```

* `Extract<T, U>`：从类型T抽取出可以赋值给类型U的类型

  - 

```ts
    type T6 = Extract<string | number | boolean, boolean>; // boolean
    ```

* `ReturnType<T>`：返回一个函数的返回值类型

  - 

```ts
    // 实现
    type ReturnType<T extends (...args:any) => any> = T extends (...args: any) => infer R ? R : any;
    ```

  + ReturnType 接受一个函数类型，并返回这个函数的返回值类型。这里关键在于 (infer R)，返回值类型 R 此时是不能确定的，只有在函数执行之后才知道，是一种延迟推断，所以用 infer 修饰。特殊情况，比如 type T1 = ReturnType<any>，T1 的类型是 any。

-----

### 工程化中的TS

------

**ES6与common JS**

* tsconfig.json配置文件

  + target：指定编译成的版本`tsc <文件名> -t <要编译成的版本>`。
    - 

```ts
      tsc a.ts -t es3
      tsc a.ts -t es5
      tsc a.ts -t es6
      ```

  + module：指定模块类型
    - 

```ts
      tsc a.ts -m amd
      tsc a.ts -m umd
      ```

------

**命名空间**

* 定义：`namespace`关键字定义

* 原理：编译成js之后可以看到，命名空间利用的是`闭包`的原理，创建了一个`立即执行函数`。
    

```ts
    namespace Shape {
        const PI = Math.PI;
        function circle(x: number) {
            return x ** 2 * PI;
        }
    }

    // 使用
        Shape.circle(12)
    ```

* 一个命名空间可以拆分到不同的文件中，使用`<命名空间名称>.`的方式来使用。引入其他文件时，利用`///`加相对路径

  - 

```ts
    // 在 b.ts 中引入 a.ts，加上 这句
    /// <reference path="a.ts">
    ```

* 命名空间和模块不要混用。命名空间不要在一个模块中使用，最好在**全局使用**。

* 命名空间被编译成了`立即执行函数`。

* 命名空间成员的别名：`import circle = Shape.circle`。这里的 import和模块之间的import没有任何关系。

------

**声明合并**

定义：TS会将一个 文件中，具有相同名称的声明，合并成一个声明。

* 接口声明合并：
  + 对于接口中的非函数成员，必须保证成员的唯一性，如果不唯一，也要保证成员的类型相同。

  + 对于函数成员，每一个函数都会被声明为一个函数函数重载。重载的函数，声明的顺序问题：函数内部按照书写顺序，接口之前，写在后面的函数会排在前面。。。特殊一点的是：拥有字符串字面量参数的函数声明会排在第一位
    

```ts
    interface A {
        x: number;
        foo(bar: number): number;  // 3
    }
    
    interface A {
        y: number;
        foo(bar: string): string;  // 1
        foo(bar: number[]): number[];  // 2
    }
    
    // 当参数有字符串字面量时
    
    interface A {
        x: number;
        foo(bar: number): number;  // 5
        foo(bar: 'a'): number; // 2
    }
    
    interface A {
        y: number;
        foo(bar: string): string;  // 3
        foo(bar: number[]): number[];  // 4
        foo(bar: 'b'): number; // 1
    }
    ```

* 命名空间之间的合并：

  + 命名空间中，导出的成员是不可以重复定义的

* 命名空间和函数的合并：

  + 命名空间要放在函数的后面

  - 

```ts
    function Lib() {}
    
    namespace Lib {
        export let version = '1.0';
    }
    
    console.log(Lib.version); // 1.0
    ```

* 命名空间和类的合并

  + 命名空间要放在类的后面

  - 

```ts
    class CCC {}
    
    namespace CCC {
        // 相当于给类添加静态的属性
        export let state = 1;
    }
    console.log(CCC.state) // 1
    ```

* 命名空间和枚举的合并

  + 枚举于命名空间之间的关系是没有要求的

  - 

```ts
    enum Color {
        Red,
        Yellow,
        Blue
    }
    
    namespace Color {
        // 相当于给枚举类型增加了一个方法
        export function mix() {}
    }
    ```

  + 编译之后的代码

  - 

```ts
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Yellow"] = 1] = "Yellow";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    (function (Color) {
        // 相当于给枚举类型增加了一个方法
        function mix() { }
        Color.mix = mix;
    })(Color || (Color = {}));
    console.log(Color);
    ```

  + 声明枚举类型时，会提前声明变量，这个变量会作为参数传入命名空间中。枚举类型的变量提前声明了，但是类和函数的变量没有提前声明，而且类和函数要先定义才能添加对应的成员或者属性方法，所以需要在命名空间之前定义。

------

**编写声明文件**

* 在使用非TS编写的类库的时候 ，必须为这个类库编写一个声明文件，对外暴露它的API。有的库，声明文件是包含在库里面的，有的需要单独安装，例如jquery。

* 类型声明包：`@types/<包的名字>`。安装类型声明包

* [查找一个类库有没有类型包](https://www.typescriptlang.org/dt/search?search=)

* 声明类库的写法：全局库、模块库、umd库
  + 全局库：
  + 模块库
  + umd库
  
* 插件：比如给一个插件添加一个方法

  - 

```ts
    import m from 'moment';
    // 给moment自定义方法，使用到moment
    declare module 'moment' {
        export function myFunction(): void
    }
    m.myFunction = () => {}
    ```
