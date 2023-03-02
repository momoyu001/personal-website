# JS手写题

------

## **实现一个call函数**

```js
/**
 * 实现一个call函数：
 * call方法是函数调用的
 * 改变this的指向
 * 第一个参数 ，this要指向的对象
 * 后续的参数 ，传参
 * **/

Function.prototype.myCall = function() {
    // 调用这个方法的应该是一个函数
    if (typeof this !== 'function') return;

    // 第一个参数，this要指向的对象，没有传则指向window
    let context = [...arguments].shift() || window;

    // 临时给this指向的对象新增一个属性 -- 函数，调用完了就删除
    context.fn = this;
    let result = context.fn(...arguments);
    delete context.fn;
    return result;
}

var name = 'window---name';

let obj = {
    name: 'obj---name'
}

function printName() {
    console.log(this.name);
}

printName();
printName.call(obj);
printName.myCall(obj);
```

------

## **实现一个apply函数**

```js
// 与call不同的是参数，参数为数组
Function.prototype.myApply = function() {
    if (typeof this !== 'function') return

    let context = [...arguments].shift() || window;
    let arg = [];

    if ([...arguments].length > 1) {
        arg = [...arguments][1];
    }

    context.fn = this;
    let result = context.fn(...arg);
    delete context.fn;
    return result;
}

var name = 'window---name';

let obj = {
    name: 'obj---name'
}

function printName(name, age, grade) {
    console.log(this.name, name, age, grade);
}

let name1 = '123';
let age = 12;
let grade = 4;

printName(name1, age, grade);
printName.call(obj, name1, age, grade);
printName.myCall(obj, name1, age, grade);
printName.myApply(obj, [name1, age, grade]);
```

------

## **实现一个bind函数**

```js
/**
 * myBind函数
 * 传参和call一样
 * 不一样的是：返回的是一个函数
 * **/
Function.prototype.myBind = function() {
    if (typeof this !== 'function') return;

    let context = [...arguments].shift() || window;

    let arg = [...arguments].slice(1) || [];

    context.fn = this;
    let _this = this;

    return function F() {
        if (this instanceof F) {
            // new 运算符
            return new _this(...arg, ...arguments);
        } else {
            context.fn(...arg);
        }
    }
}
```

------

**instanceof**

```js
// 思路：右边变量的原型存在于左边变量的原型链上
function instanceOf(left, right) {
    let leftValue = left.__proto__
    let rightValue = right.prototype
    while (true) {
        if (leftValue === null) {
            return false
        }
        if (leftValue === rightValue) {
            return true
        }
        leftValue = leftValue.__proto__
    }
}

function myInstanceOf(left, right) {
    while (Object.getPrototypeOf(left)) {
        if (Object.getPrototypeOf(left) == right.prototype) {
            return true;
        }

        left = Object.getPrototypeOf(left);
    }

    return false;
}
```

------

**Object.create**

返回一个新的对象，该对象的原型指向函数的第一个参数

```js
Object.prototype.myCreate = function() {
    let context = [...arguments].shift();
    let obj = new Object();

    if (context) {
        obj.__proto__ = context;
    }

    return obj;
};

Object.prototype.myCreate1 = function(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}
```

------

## **实现new**

```js
/**
 * 实现一个new
 * 生成一个新的对象，对象的原型指向构造函数的原型
 * 改变this的指向，指向新的对象
 * 返回一个对象
 * **/

function myNew() {
    let constructor = [...arguments].shift();

    let obj = new Object();

    obj.__proto__ = constructor.prototype;
    let ret = constructor.apply(obj, [...arguments].slice(1));

    return typeof ret === 'object' ? ret : obj;
}

function Parent(name) {
    this.name = name;
    return {
        name: '零零零零'
    }
}

let obj1 = myNew(Parent, 'aaa');

console.log(obj1);
console.log(obj1.name);
```

------

## **实现一个基本的promise**

```js
/**
 * promise是一个构造函数，实例化时，传入一个函数作为处理器
 * 处理器函数有两个参数(resolve, reject)分别将结果变为成功态和失败态
 * promise对象有了执行结果之后，通过resolve传递出去，失败的话通过reject传递出去
 * promise原型上定义着.then方法
 * 
 * 创建一个promise实例时，处理器函数时会立即执行的
 * 
 * promise/A+中规定，promise对象已经由pending状态改变为resolved或者rejected之后，不可再次更改状态。
 * 因此更新状态时，要判断当前是pending才可以更新。
 * 
 * then方法有两个回调，当Promise的状态发生改变时，成功或失败的回调会分别调用then方法的两个回调
 * 
 *  --- Promise实现异步需求：
 * 为了满足异步需要而做的处理：当执行then方法时，如果还是pending状态，就把回调函数临时寄存到一个（队列）数组里面，当状态发生改变时，一次从数组里面取出执行
 * 
 *  --- Promise的链式调用：
 * Promise/A+的相关定义：
 * 1、then方法必须返回一个promise对象
 * 2、如果then方法返回的是一个普通值，如Number、String等，就用此值包装成一个新的Promise对象返回
 * 3、如果then方法中没有return语句，就返回一个用Undefined包装的Promise对象
 * 4、如果then方法中出现异常，则调用失败方法(reject)跳转到下一个then的onRejected
 * 5、如果then方法没有传入任何回调，则继续向下传递（值穿透）-变成回调函数返回普通值即可
 * 6、如果then方法返回了一个Promise对象，那就以这个对象为准，返回它的结果
 * **/
```

```js
function Promise(excutor) {
    let _this = this;
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    // 为了满足异步而需要做的处理
    this.resolveCallBacks = [];
    this.rejectCallBacks = [];

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.state = 'resolve';
            _this.value = value;

            _this.resolveCallBacks.forEach(cb => cb(value));
        }
    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.state = 'reject';
            _this.reason = reason;

            _this.onRejectedCallbacks.forEach(callback => callback(reason));
        }
    }

    try {
        excutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => e;

    if (this.state === 'pending') {
        this.rejectCallBacks.push(onRejected);
        this.resolveCallBacks.push(onFulfilled);
    }

    if (this.state === 'resolve') {
        // 执行成功的回调
        onFulfilled(this.value);
    }

    if (this.state === 'reject') {
        // 执行失败的回调
        onRejected(this.reason);
    }
}

let p = new Promise((resolve) => {
    console.log('promise...///');
    setTimeout(() => {
        resolve();
    }, 2000);
})

p.then(() => {
    console.log('then执行了。。。');
})
```

------

## **实现浅拷贝**

浅拷贝的实现方法：

* ES6对象解构
* Object.assin方法

```js
/**
 * 浅拷贝：只拷贝第一层
 * **/

function shallowCopy(obj) {
    return {
        ...obj
    };
}

function shallowCopy(obj) {
    return Object.assign(obj);
}

let obj1 = {
    name: '12',
    age: 12,
    grade: 12,
    hobby: {
        book: '222',
        paint: '232'
    }
}

let obj2 = shallowCopy(obj1);
console.log('修改name之前', obj1, obj2);
obj2.name = '新的name';
console.log('修改name之后', obj1, obj2);

obj2.hobby.book = 'new123';
console.log('修改类型为对象的属性之后', obj1, obj2);
```

------

## **实现一个基本的深拷贝**

```js
/**
 * 实现深拷贝
 * **/

function deepCopy(obj) {
    let newObj = {};
    for (let key in obj) {
        if (typeof obj[key] != 'object') {
            newObj[key] = obj[key];
        } else {
            newObj[key] = deepCopy(obj[key]);
        }
    }

    return newObj;
}
```

```
// 1. JOSN.stringify()/JSON.parse()
let obj = {a: 1, b: {x: 3}}
JSON.parse(JSON.stringify(obj))

// 2. 递归拷贝
function deepClone(obj) {
  let copy = obj instanceof Array ? [] : {}
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      copy[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return copy
}
```

------

**使用setTimeout实现setInterval**

```js
/**
 * 使用setTimeout实现setInterval
 * setInterval: 定时执行
 * **/
function mySetInterval(fn, time) {
    let clear = true;

    function next() {
        if (!clear) {
            clearTimeout(clear);
            return;
        }
        clear = setTimeout(() => {
            fn();
            next();
        }, time);
    }

    next();
    return () => {
        clear = false;
    }
}

let interval = mySetInterval(() => {
    console.log('1')
}, 2000);

setTimeout(() => {
    interval();
}, 10000)
```

------

**js实现一个继承方法，借用构造函数继承实例属性**

```js
// 组合式继承 = 原型继承 + 构造函数继承
/**
 * js实现一个继承方法：借用构造函数继承实例属性
 * **/

function Parent(name) {
    this.name = name;
}

Parent.prototype.getName = function() {
    return this.name;
}

function Child(name) {
    Parent.call(this, name);
}

Child.prototype = Parent.prototype;

let c1 = new Child('test,,,,,');

console.log(c1.name);
console.log(c1.getName());
```

------

## **实现一个基本的Event Bus**

```js
/**
 * 实现一个基本的Event Bus
 * 组件通信，一个触发与监听的过程
 * **/

class EventEmitter {
    constructor() {
        // 数组存储事件
        this.events = new Map();
    }

    // 监听事件
    addListener(type, fn) {
        if (!this.events.get(type)) {
            this.events.set(type, fn);
        }
    }

    // 触发事件
    emit(type) {
        let handler = this.events.get(type);
        if (handler) {
            handler.apply(this, [...arguments].slice(1));
        }
    }
}

let emit = new EventEmitter();
// 监听事件
emit.addListener('testEvent', () => {
    console.log('监听事件。。。');
})

emit.addListener('age', () => {
    console.log('滴滴滴~~~');
})

// 触发事件
emit.emit('testEvent');
emit.emit('age');
```

------

## **实现一个双向数据绑定**

```js
< div id = "app" >
    <
    input type = "text"
id = "input" / >
    <
    button id = "button" > 按钮， 点一下 < /button> <
    /div>

let dom = document.getElementById('input');
let data = {};
dom.addEventListener('input', function(e) {
    console.log(e);
    data.value = e.target.value;
});

data = new Proxy(data, {
    get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
    },

    set(target, key, value, receiver) {
        console.log(dom);
        dom.value = value;
        Reflect.set(target, key, value, receiver);
        return true;
    },
});

// 交互逻辑
document.getElementById('button').addEventListener('click', function(e) {
    data.value = Math.random() * 10;
});
```

------

## **实现一个简单路由**

Vue的路由有两种模式： `hash模式` 和 `history模式`

* hash模式：
  + url中有`#`号
  + 不需要后端额外配合
  + `hashChange`事件
* history模式：
  + url中没有`#`号
  + 需要后端额外配合，该模式下，刷新页面之后，页面会出现404，需要后端将404的页面重定向到index.html页面
  + `pushState`，`replaceState`事件

```js
/**
 * 实现一个简单的路由
 * 实现hash版本的
 * **/

class Route {
    constructor() {
        // 路由存储对象
        this.routes = {};
        // 当前hash
        this.currentHash = '';
        // 绑定this 避免监听的时候，this指向的改变
        this.freshRoute = this.freshRoute.bind(this);
        // 监听
        window.addEventListener('load', this.freshRoute, false);
        window.addEventListener('hashchange', this.freshRoute, false);
    }

    // 存储
    storeRoute(path, cb) {
        this.routes[path] = cb || function() {};
    }

    // 更新
    freshRoute() {
        this.currentHash = location.hash.slice(1) || '/';
        this.routes[this.currentHash]();
    }
}
```

------

## **实现图片懒加载**

可视区域的高度： `window.innerHeight    document.documentElement.clientHeight    document.body.clientHeight`

**document.documentElement：返回的是文档对象（document）的根元素的只读属性**

```js
/**
 * 实现图片的懒加载
 * 给img标签增加一个data数据属性，存储真实的图片地址，src属性先置空
 * 监听滚动事件，图片进入可视区域的时候，将真实的图片地址赋值给src属性
 * **/

let app = document.getElementById('app');
let imgs = [...document.getElementsByTagName('img')];
// 视口高度
let screenHeight = document.documentElement.clientHeight;

let eventFunc = function(e) {
    console.log(e.target.scrollTop);

    for (let i = 0; i < imgs.length; i++) {
        let item = imgs[i];
        console.log('offsetTop.....', item.offsetTop);
        if (item.offsetTop < e.target.scrollTop + screenHeight) {
            console.log('src属性', item.getAttribute('src'), item.getAttribute('data-src'));
            if (!item.getAttribute('src')) {
                item.setAttribute('src', item.getAttribute('data-src'));
            }
        }
    }
};

app.addEventListener('scroll', eventFunc, false);
```

------

## **实现rem**

相对于html跟元素，实现的倍数放大或缩小

```js
/**
 * 动态的改变根元素的fontSize属性的值
 **/
function setRem() {
    let doc = document.documentElement;
    let width = doc.getBoundingClientRect().width;
    let rem = width / 75;
    doc.style.fontSize = rem + 'px';
}

addEventListener('resize', setRem);
```

------

## **实现AJAX**

* XMLHttpRequest：

  + readystate：请求状态码，表示异步对象目前的状态，状态码从0到4
    - 0：表示请求未初始化，还没有调用send()
    - 1：服务器连接已建立，但是还没有调用send()
    - 2：请求已接收，正在处理中，通常现在可以从响应头中获取内容头
    - 3：请求处理中，通常响应头中已有部分数据可用了，没有全部完成
    - 4：请求已完成，此阶段确认全部数据都已经请求完毕，可以通过异步对象属性获取对应的数据
  + status：http状态码
  + responseText：后台返回的字符串形式的响应数据
  + rensponseXML：后台返回的XML形式的响应数据
  + onreadystatuchange（）：监听异步对象请求状态码`readystate`的改变，每当`readystate`改变时，就会触发该事件
  + open（）：设置ajax请求方式和请求地址
    - 第一个参数：请求方式
    - 第二个参数：请求地址
    - 第三个参数：是否异步请求，true为异步，false为同步，一般都传true

  + setRequestHeader（）：发送`post`请求，需要用这个方法添加HTTP请求头，并在send方法中传递要发送数据

```js
let optionData = {
    type: 'get',
    url: 'http://backend-api-01.newbee.ltd/api/v1/categories',
    timeout: 5000,
    success(data) {
        console.log('成功的回调', data);
    },
    fail(error) {
        console.log('失败的回调', error);
    },
};

function ajax(option) {
    let str = objToStr(option.data);
    let xhr = undefined;
    // 用于超时
    let timer = undefined;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (option.type.toLowerCase() == 'get') {
        xhr.open(option.type, option.url, true);
        xhr.send();
    } else {
        xhr.open(option.type, option.url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(str);
    }

    xhr.onreadystatechange = function() {
        // 如果没有超时，在这里就去掉setTimeout
        clearTimeout(timer);
        if (xhr.readyState == 4) {
            // 请求成功了
            if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
                option.success(xhr);
            } else {
                option.fail(xhr);
            }
        }
    };

    function objToStr(data) {
        if (!data) return;
        data.t = new Date().getTime();
        let res = [];
        for (let key in data) {
            res.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        }

        return res.join('&');
    }

    // 判断外界是否传入了超时时间
    if (option.timeout) {
        timer = setTimeout(() => {
            xhr.abort();
            clearTimeout(timer);
        }, option.timeout);
    }
}

ajax(optionData);
```

------

## **实现拖拽**

* 针对一个绝对定位的元素

* mousemove事件中改变绝对定位的top和left
* mousedown中开始，mouseup中结束
* 重点在left和top的取值逻辑：鼠标与可视区域的距离，被拖拽元素与边界的距离，鼠标与被拖拽元素边界的距离

```js
window.onload = function() {
    console.log(2)
    let drag = document.getElementById('box');
    drag.onmousedown = function(e) {
        console.log('mousedown')
        var e = e || window.event;
        // 鼠标与拖拽元素边界的距离 = 鼠标与可视区域的距离 - 拖拽元素与边界的距离
        let diffX = e.clientX - drag.offsetLeft;
        let diffY = e.clientY - drag.offsetTop;

        drag.onmousemove = function(e) {
            console.log('mousemove');
            // 拖拽元素移动的距离 = 鼠标与可视区域边界的距离 - 鼠标与拖拽元素边界的距离
            let left = e.clientX - diffX;
            let top = e.clientY - diffY;

            // 避免拖拽出可视区域
            if (left < 0) {
                left = 0;
            } else if (left > window.innerWidth - drag.offsetWidth) {
                left = window.innerWidth - drag.offsetWidth;
            }

            if (top < 0) {
                top = 0;
            } else if (left > window.innerHeight - drag.offsetHeight) {
                top = window.innerHeight - drag.offsetHeight;
            }

            drag.style.left = left + 'px';
            drag.style.top = top + 'px';
        }

        drag.onmouseup = function(e) {
            console.log('mouseup')
            this.onmousemove = null;
            this.onmouseup = null;
        }
    }
}
```

------

## **实现一个节流函数**

```js
/**
 * 实现一个节流函数
 * **/

function trottle(fn, time) {
    let timer = null;

    return function() {
        if (timer) return;

        timer = setTimeout(() => {
            fn();
            timer = null;
        }, time)
    }
}

let func = trottle(function() {
    console.log('2秒打印。。。')
}, 2000)

setInterval(() => {
    func();
    console.log('定时器内的打印')
}, 500)
```

------

## **实现一个防抖函数**

```js
function debounce(fn, time) {
    let timer = null;

    return function() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            fn();
        }, time)
    }
}

let func = debounce(function() {
    console.log('5秒后打印。。。')
}, 2000)
let index = 0;
let clear = setInterval(() => {
    func()
    console.log('模拟一直触发事件。。。')
    index++;

    if (index == 10) {
        console.log('5秒，清除定时器了。。。,再过2秒会打印')
        clearInterval(clear);
    }
}, 500)
```

------

## **实现一个函数**

```js
// 需要实现的函数
function repeat(func, times, wait) {}

// 使得下面调用代码可以正常工作
const repeatFunc = repeat(console.log, 4, 3000);
repeatFunc('helloword'); // 会输出4次helloword,每次间隔3秒
```

```js
function repeat(func, times, wait) {
    let timer = null;
    let index = 0;

    return function(arg) {
        timer = setInterval(function() {
            index++;
            if (index > times) {
                console.log('结束啦？？？')
                clearInterval(timer);
                return;
            };
            func(arg);
        }, wait);
    }
}

const repeatFunc = repeat(console.log, 4, 1000);
repeatFunc('hello,world');
```

------

## **实现一个函数返回自身被调用的次数**

```js
function fn() {
    fn.times = fn.times || 0
    fn.times++
    console.log('打印一下', fn.times)
    return fn.times
}
fn.clear = function() {
    fn.times = 0
}
console.log(fn())
console.log(fn())
console.log(fn())
console.log(fn())

console.log(fn.clear())

console.log('========')
console.log(fn())
```

------

**查找一个数组中，和最大的一个子数组，返回这个最大和**

```js
function getSubMaxSUm(nums) {
    let res = nums[0];
    let sum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        nums[i] = Math.max(nums[i] + nums[i - 1], nums[i]);
        res = Math.max(nums[i], res);
    }
    return res;
}
```

------

**看输出**

每一个 `then` 都会返回一个promise对象，一直可以链式的执行下去。就算前一个then里面没有resolve，也会执行下去

```js
console.log('start');
setTimeout(() => {
    console.log('settimeout1');
    Promise.resolve().then(() => {
        console.log('promise1');
        setTimeout(() => {
            console.log('settimeout2');
        });
    }).then(() => {
        console.log('promise2');
    });
}, 0);
console.log('end');
```

------

**求两个数组的交集**

字符串的includes方法，返回true或者false，查找一个字符串里面是否存在某个子字符串。

```js
function func(arr1, arr2) {
    let str1 = arr1.join(',');
    let str2 = arr2.join(',');
    let ret = '';

    for (let i = 0; i < arr1.length - 1; i++) {
        for (let j = i + 1; j < arr1.length; j++) {
            let str = arr1.slice(i, j + 1).join(',');

            if (str2.includes(str)) {
                if (ret.length < str.length) {
                    ret = str;
                }
            }
        }
    }

    return ret.split(',');
}

let arr1 = [1, 3, 4, 2, 10, 3];
let arr2 = [1, 3, 4, 2, 10, 3];

let ret = func(arr1, arr2);
console.log(ret);
```

------

**看输出**

```js
Promise.resolve().then(() => {
    // promise-1
    console.log('Promise1');
    setTimeout(() => {
        // settimeout-1
        console.log('setTimeout2');
    }, 0);
});
setTimeout(() => {
    // setTimeout-2
    console.log('setTimeout1');
    Promise.resolve().then(() => {
        // promise-2
        console.log('Promise2');
    });
}, 0);

// promise1 setTimeout1 promise2 setTimeout2
```

------

**看输出**

```js
function fn() {
    for (let i = 0; i < 4; i++) {
        // var 声明的变量进行变量提升，提升到fn函数作用域内。即：循环体内实际只是定义了一个timer变量，
        // 每一次迭代执行，都是对这个timer进行重新赋值
        var timer = setTimeout(
            function(i) {
                // setTimeout是异步，会放入宏任务队列
                // setTimeout的第三个参数会作为setTimeout的回调函数的参数传入
                // 同步任务执行完了之后，异步任务开始执行，执行 timer0，此时会把timer3清除掉
                console.log(i);
                clearTimeout(timer);
            },
            10,
            i
        );
    }
}

function fn1() {
    for (let i = 0; i < 4; i++) {
        let timer = setTimeout(
            function(i) {
                console.log(i);
                clearTimeout(timer);
            },
            10,
            i
        );
    }
}

// fn(); // 0  1  2
// fn1(); // 0 1 2 3
```
