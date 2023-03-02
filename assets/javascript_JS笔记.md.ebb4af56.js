import{_ as s,c as n,o as l,d as a}from"./app.3caf6091.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/JS笔记.md"}'),p={name:"javascript/JS笔记.md"},o=a(`<p><strong>JS的垃圾回收机制</strong></p><ul><li>标记清除法：目前最常用的。分为<code>标记</code>，<code>清除</code>两个阶段。标记清除算法需要每隔一段时间就执行一次，需要遍历对象。 <ul><li>标记：为所有活动对象做上标记</li><li>清除：把没有标记的（非活动对象）销毁</li><li>优点：实现简单，打标记就用一位二进制位就可以标记</li><li>缺点：清除之后，剩余对象的内存位置是不变的，会导致空闲内存空间不连续 --&gt; <code>内存碎片化、分配速度慢</code></li></ul></li><li>引用计数法：最早先的 一种垃圾回收算法。它把<code>对象是否不再需要</code>，简化定义为<code>对象有没有其他对象引用它</code>。没有引用指向该对象，则会被回收。 <ul><li>优点：比标记清除更加清晰</li><li>缺点：循环引用 ---&gt; 会造成内存不能及时释放。需要一个计数器，计数器可能会很大</li></ul></li></ul><hr><p><strong>Vue收集依赖</strong></p><ul><li><p>我们如何知道哪里用了data里面的数据？</p></li><li><p>数据变更了，如何通知render更新视图？</p></li></ul><p>在视图依赖的过程中，被使用的数据需要被记录下来，并且只针对这些数据的变化触发视图更新，这就需要做依赖收集，需要为属性创建 <code>dep</code> 用来收集渲染 <code>watcher</code> 。</p><hr><p><strong>预编译</strong></p><p>作用域的创建阶段，就是预编译的阶段。</p><p>JS的变量对象，在函数作用域的创建阶段，也叫做AO对象，我们是访问不到的，是JS引擎自己去访问的。</p><p>AO对象做了哪些事情？</p><ul><li>创建ao对象</li><li>找形参和变量的声明，作为ao对象的属性名，值是undefined</li><li>实参和形参相统一</li><li>找函数声明，函数声明与变量声明一致时，会覆盖变量声明（函数声明会覆盖变量声明，但是不会覆盖变量赋值（注意a的值，赋值的操作没有被覆盖，还是123））</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function fn(a, c) {</span></span>
<span class="line"><span style="color:#A6ACCD;">	var a = 123;</span></span>
<span class="line"><span style="color:#A6ACCD;">	function a() {};</span></span>
<span class="line"><span style="color:#A6ACCD;">	if (false) {</span></span>
<span class="line"><span style="color:#A6ACCD;">		var d = 678;</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"><span style="color:#A6ACCD;">	var b = function () {}; // 函数表达式，不是函数声明</span></span>
<span class="line"><span style="color:#A6ACCD;">	function c() {};</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">fn(1, 2)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">ao: {</span></span>
<span class="line"><span style="color:#A6ACCD;">	a: undefined,</span></span>
<span class="line"><span style="color:#A6ACCD;">	b: undefined,</span></span>
<span class="line"><span style="color:#A6ACCD;">	c: undefined，</span></span>
<span class="line"><span style="color:#A6ACCD;">	d: undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">ao: {</span></span>
<span class="line"><span style="color:#A6ACCD;">	a: 123,</span></span>
<span class="line"><span style="color:#A6ACCD;">	b: undefined,</span></span>
<span class="line"><span style="color:#A6ACCD;">	c: 2,</span></span>
<span class="line"><span style="color:#A6ACCD;">	d: undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">ao: {</span></span>
<span class="line"><span style="color:#A6ACCD;">	a: 123,</span></span>
<span class="line"><span style="color:#A6ACCD;">	b: function() {},</span></span>
<span class="line"><span style="color:#A6ACCD;">	c: function() {},</span></span>
<span class="line"><span style="color:#A6ACCD;">	d: undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><hr><p><strong>程序的输出结果</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">var out = 25,</span></span>
<span class="line"><span style="color:#A6ACCD;">   inner = {</span></span>
<span class="line"><span style="color:#A6ACCD;">        out: 20,</span></span>
<span class="line"><span style="color:#A6ACCD;">        func: function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">            var out = 30;</span></span>
<span class="line"><span style="color:#A6ACCD;">            return this.out;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    };</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log((inner.func, inner.func)()); // 25</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(inner.func());</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log((inner.func)());</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log((inner.func = inner.func)());</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li><p><code>console.log((inner.func, inner.func)())</code></p><ul><li><p>逗号运算符：逗号前面的都会运算，但是指挥返回最后一个，这里会返回最后一个inner.func</p></li><li><p>即返回了\`</p></li></ul></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">    function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        var out = 30;</span></span>
<span class="line"><span style="color:#A6ACCD;">        return this.out;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    \`\`\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    \`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  + 返回的是一个是一个匿名函数，this指向window，输出25</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* \`console.log(inner.func())\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  + this指向inner，输出 20</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* \`console.log((inner.func)())\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  + this指向inner，输出20</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* \`console.log((inner.func = inner.func)())\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  + 等号运算，返回的是运算的结果</span></span>
<span class="line"><span style="color:#A6ACCD;">    - </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><pre><code>  let a = 2;
  let b = 3;
  console.log(a = b); // 输出3
  \`\`\`
</code></pre><ul><li>inner.func = inner.func 也返回了一个匿名函数，this指向window</li></ul><hr><p><strong>三个概念</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">if (!(&quot;a&quot; in window)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    var a = 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">alert(a); // undefined, a 一直 在window上</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li><p><strong>1、ES6之前，所有的全局变量都是window属性，<code>&quot;变量 in window&quot;</code>来检测全局变量是否声明</strong></p></li><li><p><strong>2、所有的变量声明都在范围作用域顶部</strong></p><p>alert(&quot;b&quot; in window); // 弹出 true</p><p>var b;</p></li><li><p><strong>3、变量声明提前（预编译），变量赋值没有提前。</strong></p></li></ul><p><strong><code>函数声明也是提前的，所有的函数声明在执行代码之前都完成了声明。函数表达式不会提前</code></strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 函数声明</span></span>
<span class="line"><span style="color:#A6ACCD;">function funcName() {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 函数表达式</span></span>
<span class="line"><span style="color:#A6ACCD;">var b = function() {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><hr><p><strong>程序的输出结果</strong></p><p>结果为 10。</p><p>活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function b(x, y, a) {</span></span>
<span class="line"><span style="color:#A6ACCD;">     arguments[2] = 10;</span></span>
<span class="line"><span style="color:#A6ACCD;">     alert(a); // 10</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">b(1, 2, 3);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><hr><p><strong>程序输出结果</strong></p><p>输出 3</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">var a = 4;</span></span>
<span class="line"><span style="color:#A6ACCD;">function b() {</span></span>
<span class="line"><span style="color:#A6ACCD;">  a = 3;</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(a);</span></span>
<span class="line"><span style="color:#A6ACCD;">  function a(){};</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">b();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// this 指向</span></span>
<span class="line"><span style="color:#A6ACCD;">var baz = 3;</span></span>
<span class="line"><span style="color:#A6ACCD;">var bazz ={</span></span>
<span class="line"><span style="color:#A6ACCD;">  baz: 2,</span></span>
<span class="line"><span style="color:#A6ACCD;">  getbaz: function() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return this.baz</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(bazz.getbaz()) // 2</span></span>
<span class="line"><span style="color:#A6ACCD;">var g = bazz.getbaz;</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(g()) ; // 3</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">var arr = [1,2,3,4,5];</span></span>
<span class="line"><span style="color:#A6ACCD;">for(var i = 0; i &lt; arr.length; i++){</span></span>
<span class="line"><span style="color:#A6ACCD;">  arr[i] = function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    alert(i)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">arr[3](); // 5</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><hr><p><strong>null和undefined</strong></p><ul><li>null：用来表示尚未存在的对象，常用来表示函数返回一个不存在的对象，null表示“没有对象” <ul><li>作为函数的参数，表示该该函数的参数不是对象</li><li>作为对象原型链的终点</li><li>null是一种特殊的object <code>typeof null === object</code></li></ul></li><li>undefined：当声明的变量还未被初始化时，变量的默认值为undefined <ul><li>变量被声明了，但是没有赋值，等于undefined</li><li>调用函数了，但是没有提供应该提供的参数，参数为undefined</li><li>对象没有赋值的属性，属性值为undefined</li><li>函数没有返回值时，默认返回undefined</li></ul></li></ul><hr><p><strong>prototype</strong></p><p>prototype是函数对象上面预设的对象属性。</p><p>来源于对象，服务于对象。</p><p><a href="https://juejin.cn/post/6844903749345886216" target="_blank" rel="noreferrer">参考文章</a></p><hr><p><strong>函数柯里化</strong></p><p>定义：把接收多个参数的函数变换为接收一个单一参数的函数。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function curry(fn, ...args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(fn, args)</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(args.length, fn.length)</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(...arguments)</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&#39;第一轮结束，，，，，，，，，，，，，，，&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (args.length &lt; fn.length) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(&#39;一-----&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return (...arguments) =&gt; curry(fn, ...args, ...arguments)</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(&#39;二-----&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return fn(...args);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function sumFn(a, b, c) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return a + b + c;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">let sum = curry(sumFn);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(sum(1)(2)(3));</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><hr><p><strong>script标签中的defer和async</strong></p><p>普通script标签的加载和解析都是同步的，会阻塞DOM的渲染。</p><ul><li>defer： <ul><li>如果script标签设置了该属性，则浏览器会异步的<code>下载该文件</code>并且不会影响到后续DOM的渲染</li><li>如果有多个设置了defer的标签，会按照顺序执行所有的script</li><li>defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行</li><li><strong>适用于：如果脚本代码依赖于页面中的DOM元素，或者被其他脚本文件依赖</strong></li></ul></li><li>async： <ul><li>使得script脚本异步的加载，并不会按着script在页面中顺序来执行，而是谁先加载完谁执行。</li><li><strong>适用于：脚本并不关心页面中的DOM，并且也不会产生其他脚本需要的数据</strong></li></ul></li><li>用defer总是比async稳定，不用也行。。。</li></ul><hr><p><strong>session和cookie</strong></p><ul><li><p>session保存在服务端，客户端不知道其中的信息 ，cookie保存在客户端，服务端能够知道其中的信息，http请求中，会自动带上cookie的 信息</p></li><li><p>session保存的是对象，cookie保存的是字符串</p></li><li><p>session不能区分路径，同一个用户在访问一个网站期间，所有的session在任何一个地方都可以访问到；cookie如果设置了路径参数，那么同一个网站中不同路径下的cookie互相访问不到的</p></li></ul><hr><p><strong>浏览器输入URL到渲染完成</strong></p><p><strong>简洁版本：</strong></p><ul><li><p>DNS域名解析：根据输入的url，查找当前dns缓存中是否有目标地址</p></li><li><p>TCP链接：三次握手建立TCP连接</p></li><li><p>发送http请求</p></li><li><p>服务器返回请求的资源</p></li><li><p>浏览器获取到资源后开始解析，解析html形成DOM树，解析CSS形成CSSOM树，合成render树</p></li><li><p>根据render树计算出位置，渲染在页面上</p></li></ul><p><strong>细节版本：</strong></p><ul><li>输入地址： <ul><li>浏览器会提前解析网页中可能出现的网络连接。当我们输入网址的时候，浏览器就会开始只能的匹配可能的url，从历史记录、书签等地方找到可能对应的url。若有该域名相关的缓存，会从缓存里面直接把网页展示出来。</li></ul></li><li>查询DNS查找对应请求的IP地址 <ul><li>浏览器自己的缓存 -- 操作系统的缓存 -- 路由器的DNS缓存 -- 本地域名服务器</li><li>本地域名服务器查找到IP之后，缓存起来，发送给上一级缓存，依次类推</li></ul></li><li>建立TCP连接 <ul><li>三次握手建立连接</li></ul></li><li>服务器收到请求并响应http请求 <ul><li>http响应报文的组成：状态行 + 消息报头 + 响应正文</li></ul></li><li>浏览器接收服务器响应结果并处理 <ul><li>解析HTML构建DOM树 <ul><li>HTML解释器将HTML资源从 字节流解释成DOM树结构</li><li>字节流 -- 解码之后变成字符流 -- 词法分析、语法分析 -- 节点 -- DOM树</li></ul></li><li>解析CSS构建CSS规则树 <ul><li>解释CSS：指从CSS字符串经过CSS解释器处理后变成渲染引擎内部规则的表示过程</li></ul></li><li>合并DOM树和CSS 规则树，生成render树</li><li>布局render树，负责各元素尺寸、位置的计算 <ul><li>布局计算 是一个递归的过程，因为一个节点的大小通常需要先计算它子节点的位置、大小等信息。</li></ul></li><li>绘制render树，绘制页面像素信息</li><li>浏览器将各层的信息发送给GPU，GPU将各层合成，显示在屏幕上</li></ul></li></ul><hr><p><strong>公钥加密和私钥加密</strong></p><p>公钥用于对数据进行加密，私钥用于对数据进行解密。</p><hr><p><strong>substr、substring、slice的区别</strong></p><p>都是用于字符串的截取</p><ul><li><p>substr(start, length)：</p><ul><li>返回一个字符串中从指定位置开始到<code>指定字符数</code>的字符</li><li>start：必须的参数，起始的下标</li><li>length：可选的参数，截取的长度，不传则默认为截取到末尾</li></ul></li><li><p>substring(start, stop)：</p><ul><li>返回一个字符串，在开始索引和结束索引之间的一个子集，或者是从开始索引到字符串末尾的一个子集</li><li>start：必须的参数，起始的下标</li><li>stop：可选的参数，截至下标，截取的字符串不包括这一位</li></ul></li><li><p>slice(start, end)：</p><ul><li>提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串</li><li>start：必须的参数，起始下标</li><li>end：可选的参数，截至的下标</li><li><code>数组也有slice方法</code></li></ul></li></ul><hr><p><strong>document.write和innerHtml</strong></p><ul><li><p>innerHtml大多数情况下都优于document.write，不会导致页面重写。</p></li><li><p>document.write是重写整个document，写入内容是html。innerHtml是HTMLElement的属性，是一个元素内部html内容</p></li></ul><hr><p><strong>JS识别不同浏览器信息</strong></p><p><code>navigator.userAgent</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function myBrowser() {</span></span>
<span class="line"><span style="color:#A6ACCD;">  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  </span></span>
<span class="line"><span style="color:#A6ACCD;">  var isOpera = userAgent.indexOf(&quot;Opera&quot;) &gt; -1;</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (isOpera) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return &quot;Opera&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }; //判断是否Opera浏览器  </span></span>
<span class="line"><span style="color:#A6ACCD;">  if (userAgent.indexOf(&quot;Firefox&quot;) &gt; -1) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return &quot;Firefox&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }  //判断是否Firefox浏览器  </span></span>
<span class="line"><span style="color:#A6ACCD;">  if (userAgent.indexOf(&quot;Chrome&quot;) &gt; -1) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return &quot;Chrome&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }   //判断是否Google浏览器  </span></span>
<span class="line"><span style="color:#A6ACCD;">  if (userAgent.indexOf(&quot;Safari&quot;) &gt; -1) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return &quot;Safari&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  } //判断是否Safari浏览器  </span></span>
<span class="line"><span style="color:#A6ACCD;">  if (userAgent.indexOf(&quot;compatible&quot;) &gt; -1 &amp;&amp; userAgent.indexOf(&quot;MSIE&quot;) &gt; -1 &amp;&amp; !isOpera) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return &quot;IE&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }; //判断是否IE浏览器  </span></span>
<span class="line"><span style="color:#A6ACCD;">} </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><hr><p><strong>JS的组成</strong></p><ul><li><p>ECMAScript</p></li><li><p>文档对象模型DOM</p></li><li><p>浏览器对象模型BOM</p></li></ul><hr><p><strong>三位分隔格式化数字</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function format(str) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let arr = str.split(&#39;.&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  let data = &#39;&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  if (arr.length) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    data = arr[0]</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  let count = 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">  let ret = [];</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  for (let i = data.length - 1; i &gt;= 0; i--) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    ret.unshift(data[i]);</span></span>
<span class="line"><span style="color:#A6ACCD;">    count++;</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (count % 3 === 0 &amp;&amp; i != 0) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      ret.unshift(&#39;,&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  return arr.length &gt; 1 ? \`\${ret.join(&#39;&#39;)}.\${arr[1]}\` : ret.reverse().join(&#39;&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(format(&#39;1234856789.89&#39;));</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><hr><p><strong>JS的ready和onload</strong></p><ul><li><p>onload：等html的所有资源加载完成之后再执行onload里面的内容，所有资源包括DOM结构，图片，视频等资源</p></li><li><p>ready：当DOM结构加载完成后就可以执行了，相当于jQuery中的<code>$(function() { js代码 })</code></p></li><li><p>onload只能有一个，ready可以有多个</p></li></ul><hr><p><strong>clientX/screenX/offsetX/pageX</strong></p><p><a href="https://juejin.cn/post/6883353218319908871" target="_blank" rel="noreferrer">掘金 文章</a></p><hr><p><strong>ES5和ES6的继承</strong></p><ul><li><p>ES5的继承是通过<code>prototype</code>或<code>构造函数</code>机制来实现的</p><ul><li>原型继承 <ul><li>子类的原型对象指向父类的实例：<code>Child.prototype = new Parent()</code></li></ul></li><li>构造函数继承 <ul><li>子类的构造函数中，调用父类的构造函数：<code>Parent.call(this, ...args)</code></li></ul></li><li>组合式继承：原型继承 + 构造函数继承</li><li>寄生组合式继承：<code>Child.prototype = Parent.prototype (不再是new Parent())</code></li></ul></li><li><p>ES6的继承是通过<code>extends</code>关键字来实现的</p></li><li><p>ES5的继承实质上：是先创建了子类的实例对象，然后将父类的方法添加到this上</p></li><li><p>ES6的继承实质上：是先创建了父类的实例对象（所有要先调用<code>super()</code>），然后再用子类的构造函数修改this</p><ul><li>super关键字指代父类的 实例，即父类的this对象。调用super后，才能使用this关键字，否则报错。</li></ul></li></ul><hr><p><strong>跨域</strong></p><p>源于浏览器的同源策略：协议 + 域名 + 端口号，有一个不同，就是跨域。</p><p>同源策略限制的内容：</p><ul><li>Cookie\\LocalStorage\\IndexDB</li><li>DOM节点</li><li>AJAX请求发送之后，结果被浏览器拦截</li></ul><p>允许跨域的标签： <code>&lt;img src=xxx&gt;</code> ， <code>&lt;link href=xxx&gt;</code> ， <code>&lt;script src=xxx&gt;</code></p><p>跨域并不是请求发不出去，请求能发出去，服务端 能收到请求并正常返回结果，只是结果被拦截了。跨域是为了阻止用户读取到另一个域名下的内容，表单可以发起跨域请求，是因为表单并不会获取新的内容。</p><p>跨域的解决方案：</p><ul><li><p>jsonp</p><ul><li>利用script标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的JSON数据。JSONP请求一定要对方的服务器做支持才可以。</li><li>仅支持get方式请求，不安全可能会遭到XSS攻击</li></ul></li><li><p>CORS：需要前后端一起配合，关键是后端</p><ul><li>服务端设置<code>Access-Control-Allow-Origin</code>就可以开启CORS。</li><li>支持所有类型的http请求，是跨域的根本解决方案</li></ul></li><li><p>postMessage：为数不多的可以跨域操作的window属性之一。</p><ul><li>页面和其打开的新窗口的数据传递</li><li>多窗口之间消息传递</li><li>页面与嵌套的iframe消息传递</li><li>上面三个场景的跨域数据传递</li></ul></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">  otherWindo.postMessage(message, targetOrigin, [transfer]);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  frame.postMessage(&#39;啦啦啦&#39;, &#39;http://localhost:4000&#39;) // 发送数据</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  window.onmessage = function(e) { // 接收数据</span></span>
<span class="line"><span style="color:#A6ACCD;">  	console.log(e.data);</span></span>
<span class="line"><span style="color:#A6ACCD;">  	e.source.postMessage(&#39;滴滴滴&#39;, e.origin);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li><p>websocket：</p></li><li><p>nginx反向代理：代理服务器，同源策略对服务器不加限制</p></li></ul><hr><p><strong>web安全</strong></p><ul><li>XSS：跨站脚本攻击： <ul><li>通过存在漏洞的web网站注册用户的浏览器内运行非法的HTML标签或者JavaScript进行的一种攻击。攻击者恶意往web页面里插入可执行网页脚本代码，当用户浏览这个网页时，嵌入其中的web脚本就会自动执行</li><li>预防： <ul><li>CSP-建立白名单：开发者明确告诉浏览器哪些外部资源可以加载和执行。通过meta标签或者http的header中的content-security-policy</li><li>转义字符：用户的输入都是不可信的，对引号、尖括号、斜杆等进行转义</li><li>httponly --- cookie：预防窃取cookie信息。</li></ul></li></ul></li><li>CSRF：跨站请求伪造 <ul><li>利用用户已登录的身份，再用户毫不知情的情况下，以用户的名义完成非法操作。</li><li>预防： <ul><li>不让第三方网站访问到用户的cookie --- httponly</li><li>阻止第三方网站请求接口</li><li>请求时附带验证信息，比如token</li></ul></li></ul></li></ul><hr><p><strong>ES5和ES6的函数默认值</strong></p><p>ES5的默认值：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function test(name) {</span></span>
<span class="line"><span style="color:#A6ACCD;">	name = name || &#39;defaultName&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>ES6的默认值：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function test(name = &#39;defaultName&#39;) {};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>ES5的arguments：name更改了之后，同步到了arguments</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function test(name) {</span></span>
<span class="line"><span style="color:#A6ACCD;">	console.log(arguments);</span></span>
<span class="line"><span style="color:#A6ACCD;">	name = &#39;test&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">	console.log(arguments);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>ES6的arguments:：修改了参数之后，没有同步到arguments</p><hr><p><strong>声明变量的6种方式</strong></p><p>var function let const imort class</p><hr><p><strong>var let const的区别</strong></p><ul><li><p>var：</p><ul><li>存在变量提升 --- <strong>提升：只提升声明，不提升赋值</strong></li><li>声明的范围是<em>函数作用域</em></li><li>在函数内部用定义变量，省略<code>var</code>关键字时，可创建一个全局变量</li><li>可以用var多次声明同一个变量，后面的覆盖前面的声明</li><li>使用var在全局作用域中声明的变量会成为window的属性，let和const则不会</li></ul></li><li><p>let：</p><ul><li>不存在变量提升</li><li>在let声明之前的执行瞬间被称为<code>暂时性死区</code>，在此阶段引用任何后面才声明的变量都会报错</li><li>声明的范围是<em>块作用域</em>：一个花括号内，是函数作用域的子集</li><li>不允许在同一个作用域中出现冗余声明</li></ul></li><li><p>const：</p><ul><li>不存在变量提升</li><li>声明的范围是<em>块作用域</em>：一个花括号内，是函数作用域的子集</li><li>不允许在同一个作用域中出现冗余声明</li><li>声明的同时必须初始化变量，且后续不可以修改（可修改对象的属性）</li></ul></li></ul><hr><p><strong>promise、Generator、async --- 异步操作解决方案</strong></p><p>Generator：将函数分步骤执行，只有主动调用next（）才能进入下一步</p><p>async：简单说，async相当于自执行的Generator函数，相当于自带一个状态机，在await的部分等待返回，返回后自动执行下一步</p><hr><p><strong>箭头函数和普通函数</strong></p><ul><li><p>箭头函数</p><ul><li>没有自己的this，this来自定义它的时候的父作用域</li><li>不能改变this的指向</li><li>不能用作构造函数</li><li>不存在arguments super new.target</li><li>不能用作Generator函数</li><li>箭头函数适用于与this无关的回调</li><li>不能使用箭头函数来定义vue生命周期方法。生命周期钩子函数的this指向了调用它的Vue实例</li></ul></li><li><p>普通函数</p><ul><li>谁调用它，this就指向谁</li></ul></li></ul><hr><p><strong>class中的箭头函数和普通函数</strong></p><p>class本质上只是对象原型的语法糖</p><p>class对于 <strong>=</strong> 声明的方法、变量，都会将其作为实例的属性，而对于 <strong>非=</strong> 声明的属性，则是放在原型链上</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">sayName</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">log(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Animal类---sayName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">sayAge</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Animal类---sayAge</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Animal</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">父类的实例</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> a1)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 实例上可以看到有sayName方法</span></span>
<span class="line"><span style="color:#A6ACCD;">a1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">sayName</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 两个方法都可以调用，一个是实例的属性，一个是在构造函数原型上的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">a1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">sayAge</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Monkey</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> monkey </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Monkey</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">父类的原型</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// sayName是 用 = 声明的，会出现在实例的属性中，原型上没有</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">子类实例</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> monkey)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 子类的实例上，</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">子类实例的__proto__   </span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> monkey</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>class继承中，会先执行基类的构造函数，再执行本身的构造函数。</p><hr><p><strong>看输出</strong></p><p>先声明了Foo和getName两个函数，在执行Foo的过程中，getName被重新赋值。this都是指向window的</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Foo</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">getName</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getName</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">5</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">Foo</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getName</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出是 1 </span></span>
<span class="line"></span></code></pre></div><hr><p><strong>给一个dom元素添加点击事件的方法</strong></p><ul><li>addEventListener(&#39;click&#39;, func, false)</li><li>setAttribute(&#39;onclick&#39;, func)</li></ul><hr><p><strong>程序的输出</strong></p><ul><li><p>var声明提升，赋值不提升，输出undefined</p></li><li><p>let没有变量提升，有暂时性死区，未声明之前使用会报错</p></li><li><p>立即执行函数：形成了一个临时的独立作用域，就算全局有a变量，</p></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">var a = 3;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 立即执行函数</span></span>
<span class="line"><span style="color:#A6ACCD;">    function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(a); // undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">        var a = 4;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">)();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var a = 3;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">(function () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(a); // 报错</span></span>
<span class="line"><span style="color:#A6ACCD;">    let a = 4;</span></span>
<span class="line"><span style="color:#A6ACCD;">})();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><hr><p><strong>实现一个数组的转换</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> arr1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null</span><span style="color:#A6ACCD;">]]]]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> arr2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> []</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 递归的方法</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">transformArr</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">arr</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">arr</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">arr</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">222</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">arr2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">arr</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">transformArr</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">arr</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> index </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">arrTransform</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">arr</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">arr</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">arr</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">arr2</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">arr2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">index</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">arrTransform</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">arr</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(arr1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">arr1[</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">transformArr</span><span style="color:#A6ACCD;">(arr1)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">arrTransform</span><span style="color:#A6ACCD;">(arr1)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(arr1)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(arr2)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><hr><p><strong>sort的底层实现</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">arr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">sort</span><span style="color:#A6ACCD;">([compareFunction]) </span><span style="color:#676E95;font-style:italic;">// 参数是可选的</span></span>
<span class="line"></span></code></pre></div><p>参数省略的情况下，会按照将元素转为字符串后，各个字符的Unicode位点进行排序。</p><ul><li><p>compareFunction：</p><ul><li>第一个参数a：第一个用于比较的元素，a的取值是arr[1] ~ arr[arr.length - 1]</li><li>第二个参数b：第二个用于比较的元素，b的取值是arr[0] ~ arr[arr.length - 2]</li><li>返回排序后的数组，是原数组</li><li>a &gt; b : 升序排序</li><li>a &lt; b : 降序排序</li><li>() =&gt; -1 ：这样的参数可以实现reverse()方法的效果</li></ul></li><li><p>原理：</p><ul><li>没有参数时，按照ascci码进行排序</li><li>内部使用了<strong>二分插入排序</strong>，（有资料说，数组大小超过10万时，内部使用快速排序）</li></ul></li></ul><hr><p><strong>实现数组的扁平化</strong></p><ul><li>reduce()</li><li>JSON.stringfy转成字符串，使用正则来匹配</li><li>flat方法，数组的flat方法，传参Infinity。明确几层嵌套的话，就传几</li></ul>`,155),e=[o];function t(c,r,i,C,A,y){return l(),n("div",null,e)}const u=s(p,[["render",t]]);export{F as __pageData,u as default};
