**JS的垃圾回收机制**

* 标记清除法：目前最常用的。分为`标记`，`清除`两个阶段。标记清除算法需要每隔一段时间就执行一次，需要遍历对象。
  + 标记：为所有活动对象做上标记
  + 清除：把没有标记的（非活动对象）销毁
  + 优点：实现简单，打标记就用一位二进制位就可以标记
  + 缺点：清除之后，剩余对象的内存位置是不变的，会导致空闲内存空间不连续 --> `内存碎片化、分配速度慢`
* 引用计数法：最早先的 一种垃圾回收算法。它把`对象是否不再需要`，简化定义为`对象有没有其他对象引用它`。没有引用指向该对象，则会被回收。
  + 优点：比标记清除更加清晰
  + 缺点：循环引用 ---> 会造成内存不能及时释放。需要一个计数器，计数器可能会很大

------

**Vue收集依赖**

* 我们如何知道哪里用了data里面的数据？

* 数据变更了，如何通知render更新视图？

在视图依赖的过程中，被使用的数据需要被记录下来，并且只针对这些数据的变化触发视图更新，这就需要做依赖收集，需要为属性创建 `dep` 用来收集渲染 `watcher` 。

------

**预编译**

作用域的创建阶段，就是预编译的阶段。

JS的变量对象，在函数作用域的创建阶段，也叫做AO对象，我们是访问不到的，是JS引擎自己去访问的。

AO对象做了哪些事情？

* 创建ao对象
* 找形参和变量的声明，作为ao对象的属性名，值是undefined
* 实参和形参相统一
* 找函数声明，函数声明与变量声明一致时，会覆盖变量声明（函数声明会覆盖变量声明，但是不会覆盖变量赋值（注意a的值，赋值的操作没有被覆盖，还是123））

```
function fn(a, c) {
	var a = 123;
	function a() {};
	if (false) {
		var d = 678;
	}
	var b = function () {}; // 函数表达式，不是函数声明
	function c() {};
}

fn(1, 2)

ao: {
	a: undefined,
	b: undefined,
	c: undefined，
	d: undefined
}

ao: {
	a: 123,
	b: undefined,
	c: 2,
	d: undefined
}

ao: {
	a: 123,
	b: function() {},
	c: function() {},
	d: undefined
}
```

------

**程序的输出结果**

```
var out = 25,
   inner = {
        out: 20,
        func: function () {
            var out = 30;
            return this.out;
        }
    };
console.log((inner.func, inner.func)()); // 25
console.log(inner.func());
console.log((inner.func)());
console.log((inner.func = inner.func)());
```

* `console.log((inner.func, inner.func)())`

  + 逗号运算符：逗号前面的都会运算，但是指挥返回最后一个，这里会返回最后一个inner.func

  + 即返回了`
    

```
    function () {
        var out = 30;
        return this.out;
    }
    ```

    `

  + 返回的是一个是一个匿名函数，this指向window，输出25

* `console.log(inner.func())`

  + this指向inner，输出 20

* `console.log((inner.func)())`

  + this指向inner，输出20

* `console.log((inner.func = inner.func)())`

  + 等号运算，返回的是运算的结果
    - 

```
      let a = 2;
      let b = 3;
      console.log(a = b); // 输出3
      ```

  + inner.func = inner.func 也返回了一个匿名函数，this指向window

------

**三个概念**

```
if (!("a" in window)) {
    var a = 1;
}
alert(a); // undefined, a 一直 在window上
```

* **1、ES6之前，所有的全局变量都是window属性，`"变量 in window"`来检测全局变量是否声明**

* **2、所有的变量声明都在范围作用域顶部**

  alert("b" in window); // 弹出 true

  var b; 

* **3、变量声明提前（预编译），变量赋值没有提前。**

**`函数声明也是提前的，所有的函数声明在执行代码之前都完成了声明。函数表达式不会提前`**

```
// 函数声明
function funcName() {}

// 函数表达式
var b = function() {}
```

------

**程序的输出结果**

结果为 10。

活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。

```
function b(x, y, a) {
     arguments[2] = 10;
     alert(a); // 10
}
b(1, 2, 3);
```

------

**程序输出结果**

输出 3

```
var a = 4;
function b() {
  a = 3;
  console.log(a);
  function a(){};
}
b();
```

```
// this 指向
var baz = 3;
var bazz ={
  baz: 2,
  getbaz: function() {
    return this.baz
  }
}
console.log(bazz.getbaz()) // 2
var g = bazz.getbaz;
console.log(g()) ; // 3
```

```
var arr = [1,2,3,4,5];
for(var i = 0; i < arr.length; i++){
  arr[i] = function(){
    alert(i)
  }
}
arr[3](); // 5
```

------

**null和undefined**

* null：用来表示尚未存在的对象，常用来表示函数返回一个不存在的对象，null表示“没有对象”
  + 作为函数的参数，表示该该函数的参数不是对象
  + 作为对象原型链的终点
  + null是一种特殊的object  `typeof null === object`
* undefined：当声明的变量还未被初始化时，变量的默认值为undefined
  + 变量被声明了，但是没有赋值，等于undefined
  + 调用函数了，但是没有提供应该提供的参数，参数为undefined
  + 对象没有赋值的属性，属性值为undefined
  + 函数没有返回值时，默认返回undefined

------

**prototype**

prototype是函数对象上面预设的对象属性。

来源于对象，服务于对象。

[参考文章](https://juejin.cn/post/6844903749345886216)

------

**函数柯里化**

定义：把接收多个参数的函数变换为接收一个单一参数的函数。

```
function curry(fn, ...args) {
  console.log(fn, args)
  console.log(args.length, fn.length)
  console.log(...arguments)
  console.log('第一轮结束，，，，，，，，，，，，，，，')
  if (args.length < fn.length) {
    console.log('一-----')
    return (...arguments) => curry(fn, ...args, ...arguments)
  } else {
    console.log('二-----')
    return fn(...args);
  }
}

function sumFn(a, b, c) {
  return a + b + c;
}

let sum = curry(sumFn);

console.log(sum(1)(2)(3));
```

------

**script标签中的defer和async**

普通script标签的加载和解析都是同步的，会阻塞DOM的渲染。

* defer：
  + 如果script标签设置了该属性，则浏览器会异步的`下载该文件`并且不会影响到后续DOM的渲染
  + 如果有多个设置了defer的标签，会按照顺序执行所有的script
  + defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行
  + **适用于：如果脚本代码依赖于页面中的DOM元素，或者被其他脚本文件依赖**
* async：
  + 使得script脚本异步的加载，并不会按着script在页面中顺序来执行，而是谁先加载完谁执行。
  + **适用于：脚本并不关心页面中的DOM，并且也不会产生其他脚本需要的数据**
* 用defer总是比async稳定，不用也行。。。

------

**session和cookie**

* session保存在服务端，客户端不知道其中的信息 ，cookie保存在客户端，服务端能够知道其中的信息，http请求中，会自动带上cookie的 信息

* session保存的是对象，cookie保存的是字符串

* session不能区分路径，同一个用户在访问一个网站期间，所有的session在任何一个地方都可以访问到；cookie如果设置了路径参数，那么同一个网站中不同路径下的cookie互相访问不到的

------

**浏览器输入URL到渲染完成**

**简洁版本：**

* DNS域名解析：根据输入的url，查找当前dns缓存中是否有目标地址

* TCP链接：三次握手建立TCP连接
* 发送http请求
* 服务器返回请求的资源
* 浏览器获取到资源后开始解析，解析html形成DOM树，解析CSS形成CSSOM树，合成render树
* 根据render树计算出位置，渲染在页面上

**细节版本：**

* 输入地址：
  + 浏览器会提前解析网页中可能出现的网络连接。当我们输入网址的时候，浏览器就会开始只能的匹配可能的url，从历史记录、书签等地方找到可能对应的url。若有该域名相关的缓存，会从缓存里面直接把网页展示出来。
* 查询DNS查找对应请求的IP地址
  + 浏览器自己的缓存 -- 操作系统的缓存 -- 路由器的DNS缓存 -- 本地域名服务器
  + 本地域名服务器查找到IP之后，缓存起来，发送给上一级缓存，依次类推
* 建立TCP连接
  + 三次握手建立连接
* 服务器收到请求并响应http请求
  + http响应报文的组成：状态行 + 消息报头 + 响应正文
* 浏览器接收服务器响应结果并处理
  + 解析HTML构建DOM树
    - HTML解释器将HTML资源从 字节流解释成DOM树结构
    - 字节流 -- 解码之后变成字符流 -- 词法分析、语法分析 -- 节点 -- DOM树
  + 解析CSS构建CSS规则树
    - 解释CSS：指从CSS字符串经过CSS解释器处理后变成渲染引擎内部规则的表示过程
  + 合并DOM树和CSS 规则树，生成render树
  + 布局render树，负责各元素尺寸、位置的计算
    - 布局计算 是一个递归的过程，因为一个节点的大小通常需要先计算它子节点的位置、大小等信息。
  + 绘制render树，绘制页面像素信息
  + 浏览器将各层的信息发送给GPU，GPU将各层合成，显示在屏幕上

------

**公钥加密和私钥加密**

公钥用于对数据进行加密，私钥用于对数据进行解密。

------

**substr、substring、slice的区别**

都是用于字符串的截取

* substr(start, length)：
  + 返回一个字符串中从指定位置开始到`指定字符数`的字符
  + start：必须的参数，起始的下标
  + length：可选的参数，截取的长度，不传则默认为截取到末尾

* substring(start, stop)：
  + 返回一个字符串，在开始索引和结束索引之间的一个子集，或者是从开始索引到字符串末尾的一个子集
  + start：必须的参数，起始的下标
  + stop：可选的参数，截至下标，截取的字符串不包括这一位

* slice(start, end)：
  + 提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串
  + start：必须的参数，起始下标
  + end：可选的参数，截至的下标
  + `数组也有slice方法`

------

**document.write和innerHtml**

* innerHtml大多数情况下都优于document.write，不会导致页面重写。

* document.write是重写整个document，写入内容是html。innerHtml是HTMLElement的属性，是一个元素内部html内容

------

**JS识别不同浏览器信息**

 `navigator.userAgent`

```
function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera"
  }; //判断是否Opera浏览器  
  if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  }  //判断是否Firefox浏览器  
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }   //判断是否Google浏览器  
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器  
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  }; //判断是否IE浏览器  
} 
```

------

**JS的组成**

* ECMAScript

* 文档对象模型DOM

* 浏览器对象模型BOM

------

**三位分隔格式化数字**

```
function format(str) {
  let arr = str.split('.');
  let data = '';

  if (arr.length) {
    data = arr[0]
  }

  let count = 0;
  let ret = [];

  for (let i = data.length - 1; i >= 0; i--) {
    ret.unshift(data[i]);
    count++;
    if (count % 3 === 0 && i != 0) {
      ret.unshift(',');
    }
  }

  return arr.length > 1 ? `${ret.join('')}.${arr[1]}` : ret.reverse().join('');
}

console.log(format('1234856789.89'));
```

------

**JS的ready和onload**

* onload：等html的所有资源加载完成之后再执行onload里面的内容，所有资源包括DOM结构，图片，视频等资源

* ready：当DOM结构加载完成后就可以执行了，相当于jQuery中的`$(function() { js代码 })`
* onload只能有一个，ready可以有多个

------

**clientX/screenX/offsetX/pageX**

[掘金 文章](https://juejin.cn/post/6883353218319908871)

------

**ES5和ES6的继承**

* ES5的继承是通过`prototype`或`构造函数`机制来实现的
  + 原型继承
    - 子类的原型对象指向父类的实例：`Child.prototype = new Parent()`
  + 构造函数继承
    - 子类的构造函数中，调用父类的构造函数：`Parent.call(this, ...args)`
  + 组合式继承：原型继承 + 构造函数继承
  + 寄生组合式继承：`Child.prototype = Parent.prototype   (不再是new Parent())`

* ES6的继承是通过`extends`关键字来实现的
* ES5的继承实质上：是先创建了子类的实例对象，然后将父类的方法添加到this上
* ES6的继承实质上：是先创建了父类的实例对象（所有要先调用`super()`），然后再用子类的构造函数修改this
  + super关键字指代父类的 实例，即父类的this对象。调用super后，才能使用this关键字，否则报错。

------

**跨域**

源于浏览器的同源策略：协议 + 域名 + 端口号，有一个不同，就是跨域。

同源策略限制的内容：

* Cookie\LocalStorage\IndexDB
* DOM节点
* AJAX请求发送之后，结果被浏览器拦截

允许跨域的标签： `<img src=xxx>` ， `<link href=xxx>` ， `<script src=xxx>`

跨域并不是请求发不出去，请求能发出去，服务端 能收到请求并正常返回结果，只是结果被拦截了。跨域是为了阻止用户读取到另一个域名下的内容，表单可以发起跨域请求，是因为表单并不会获取新的内容。

跨域的解决方案：

* jsonp

  + 利用script标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的JSON数据。JSONP请求一定要对方的服务器做支持才可以。
  + 仅支持get方式请求，不安全可能会遭到XSS攻击

* CORS：需要前后端一起配合，关键是后端

  + 服务端设置`Access-Control-Allow-Origin`就可以开启CORS。
  + 支持所有类型的http请求，是跨域的根本解决方案

* postMessage：为数不多的可以跨域操作的window属性之一。

  + 页面和其打开的新窗口的数据传递
  + 多窗口之间消息传递
  + 页面与嵌套的iframe消息传递
  + 上面三个场景的跨域数据传递

  

```
  otherWindo.postMessage(message, targetOrigin, [transfer]);
  
  frame.postMessage('啦啦啦', 'http://localhost:4000') // 发送数据
  
  window.onmessage = function(e) { // 接收数据
  	console.log(e.data);
  	e.source.postMessage('滴滴滴', e.origin);
  }
  ```

* websocket：

* nginx反向代理：代理服务器，同源策略对服务器不加限制

------

**web安全**

* XSS：跨站脚本攻击：
  + 通过存在漏洞的web网站注册用户的浏览器内运行非法的HTML标签或者JavaScript进行的一种攻击。攻击者恶意往web页面里插入可执行网页脚本代码，当用户浏览这个网页时，嵌入其中的web脚本就会自动执行
  + 预防：
    - CSP-建立白名单：开发者明确告诉浏览器哪些外部资源可以加载和执行。通过meta标签或者http的header中的content-security-policy
    - 转义字符：用户的输入都是不可信的，对引号、尖括号、斜杆等进行转义
    - httponly --- cookie：预防窃取cookie信息。
* CSRF：跨站请求伪造
  + 利用用户已登录的身份，再用户毫不知情的情况下，以用户的名义完成非法操作。
  + 预防：
    - 不让第三方网站访问到用户的cookie --- httponly
    - 阻止第三方网站请求接口
    - 请求时附带验证信息，比如token

------

**ES5和ES6的函数默认值**

ES5的默认值：

```
function test(name) {
	name = name || 'defaultName';
}
```

ES6的默认值：

```
function test(name = 'defaultName') {};
```

ES5的arguments：name更改了之后，同步到了arguments

```
function test(name) {
	console.log(arguments);
	name = 'test';
	console.log(arguments);
}
```

ES6的arguments:：修改了参数之后，没有同步到arguments

------

**声明变量的6种方式**

var function let const imort class

------

**var let const的区别**

* var：
  + 存在变量提升 --- **提升：只提升声明，不提升赋值**
  + 声明的范围是*函数作用域*
  + 在函数内部用定义变量，省略`var`关键字时，可创建一个全局变量
  + 可以用var多次声明同一个变量，后面的覆盖前面的声明
  + 使用var在全局作用域中声明的变量会成为window的属性，let和const则不会

* let：
  + 不存在变量提升
  + 在let声明之前的执行瞬间被称为`暂时性死区`，在此阶段引用任何后面才声明的变量都会报错
  + 声明的范围是*块作用域*：一个花括号内，是函数作用域的子集
  + 不允许在同一个作用域中出现冗余声明

* const：
  + 不存在变量提升
  + 声明的范围是*块作用域*：一个花括号内，是函数作用域的子集
  + 不允许在同一个作用域中出现冗余声明
  + 声明的同时必须初始化变量，且后续不可以修改（可修改对象的属性）

------

**promise、Generator、async --- 异步操作解决方案**

Generator：将函数分步骤执行，只有主动调用next（）才能进入下一步

async：简单说，async相当于自执行的Generator函数，相当于自带一个状态机，在await的部分等待返回，返回后自动执行下一步

------

**箭头函数和普通函数**

* 箭头函数
  + 没有自己的this，this来自定义它的时候的父作用域
  + 不能改变this的指向
  + 不能用作构造函数
  + 不存在arguments    super    new.target
  + 不能用作Generator函数
  + 箭头函数适用于与this无关的回调
  + 不能使用箭头函数来定义vue生命周期方法。生命周期钩子函数的this指向了调用它的Vue实例

* 普通函数
  + 谁调用它，this就指向谁

------

**class中的箭头函数和普通函数**

class本质上只是对象原型的语法糖

class对于 **=** 声明的方法、变量，都会将其作为实例的属性，而对于 **非=** 声明的属性，则是放在原型链上

```js
class Animal {
    sayName = () => {
        console.log('Animal类---sayName');
    };
    sayAge() {
        console.log('Animal类---sayAge')
    }
}

let a1 = new Animal();
console.log('父类的实例', a1); // 实例上可以看到有sayName方法
a1.sayName() // 两个方法都可以调用，一个是实例的属性，一个是在构造函数原型上的方法
a1.sayAge()

class Monkey extends Animal {

}

const monkey = new Monkey();
console.log('父类的原型', Animal.prototype); // sayName是 用 = 声明的，会出现在实例的属性中，原型上没有
console.log('子类实例', monkey); // 子类的实例上，
console.log('子类实例的__proto__   ', monkey.__proto__);
```

class继承中，会先执行基类的构造函数，再执行本身的构造函数。

------

**看输出**

先声明了Foo和getName两个函数，在执行Foo的过程中，getName被重新赋值。this都是指向window的

```js
function Foo() {
    getName = function() {
        console.log(1);
    };
    console.log(this)
    return this;
}

function getName() {
    console.log(5);
}

Foo().getName(); // 输出是 1 
```

------

**给一个dom元素添加点击事件的方法**

* addEventListener('click', func, false)
* setAttribute('onclick', func)

------

**程序的输出**

* var声明提升，赋值不提升，输出undefined

* let没有变量提升，有暂时性死区，未声明之前使用会报错
* 立即执行函数：形成了一个临时的独立作用域，就算全局有a变量，

```
var a = 3;

(
    // 立即执行函数
    function () {
        console.log(a); // undefined
        var a = 4;
    }
)();

var a = 3;

(function () {
    console.log(a); // 报错
    let a = 4;
})();

```

------

**实现一个数组的转换**

```js
let arr1 = [1, [2, [3, [4, null]]]];
let arr2 = [];
// 递归的方法
function transformArr(arr) {
    if (arr && arr.length > 1) {
        console.log('222')
        arr2.push(arr[0]);
        transformArr(arr[1]);
    }
}
let index = 0;

function arrTransform(arr) {
    if (arr) {
        index++
        arr[0] = arr2[arr2.length - index];
        arrTransform(arr[1]);
    }
}

console.log(arr1.length);
console.log(!arr1[1]);
transformArr(arr1);
arrTransform(arr1);
console.log(arr1);
console.log(arr2);
```

------

**sort的底层实现**

```js
arr.sort([compareFunction]) // 参数是可选的
```

参数省略的情况下，会按照将元素转为字符串后，各个字符的Unicode位点进行排序。

* compareFunction：
  + 第一个参数a：第一个用于比较的元素，a的取值是arr[1] ~ arr[arr.length - 1]
  + 第二个参数b：第二个用于比较的元素，b的取值是arr[0] ~ arr[arr.length - 2]
  + 返回排序后的数组，是原数组
  + a > b : 升序排序
  + a < b : 降序排序
  + () => -1 ：这样的参数可以实现reverse()方法的效果

* 原理：
  + 没有参数时，按照ascci码进行排序
  + 内部使用了**二分插入排序**，（有资料说，数组大小超过10万时，内部使用快速排序）

------

**实现数组的扁平化**

* reduce()
* JSON.stringfy转成字符串，使用正则来匹配
* flat方法，数组的flat方法，传参Infinity。明确几层嵌套的话，就传几
