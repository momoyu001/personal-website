import{_ as s,c as n,o as a,d as e}from"./app.fc8d6d98.js";const D=JSON.parse('{"title":"Proxy&Reflect&装饰器","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/Proxy&Reflect&装饰器.md"}'),l={name:"javascript/Proxy&Reflect&装饰器.md"},p=e(`<h1 id="proxy-reflect-装饰器" tabindex="-1">Proxy&amp;Reflect&amp;装饰器 <a class="header-anchor" href="#proxy-reflect-装饰器" aria-hidden="true">#</a></h1><h1 id="proxy" tabindex="-1">Proxy <a class="header-anchor" href="#proxy" aria-hidden="true">#</a></h1><p><strong>代理</strong></p><p>Vue3使用proxy实现了真正的代理。</p><p>Vue2中，data中定义的变量，如果属性还是一个对象，初始化的时候就会递归的处理属性，收集依赖。</p><p>vue3中，当一个对象的属性还是一个对象时，只有在使用到它的时候，才会用proxy代理。</p><p><strong>Proxy是对对象的包装，将代理上的操作转发到对象，并可以选择捕获其中的一些操作。它可以包装任何类型的对象，包括类和函数。</strong></p><table><thead><tr><th>内部方法</th><th>Handler方法</th><th>何时触发</th></tr></thead><tbody><tr><td><code>[[Get]]</code></td><td>get</td><td>读取属性</td></tr><tr><td><code>[[Set]]</code></td><td>set</td><td>写入属性</td></tr><tr><td><code>[[HasProperty]]</code></td><td>has</td><td><code>in</code> 运算符</td></tr><tr><td><code>[[Delete]]</code></td><td>deleteProperty</td><td><code>delete</code> 操作</td></tr><tr><td><code>[[call]]</code></td><td>apply</td><td>proxy对象多为函数被调用</td></tr><tr><td><code>[[Construct]]</code></td><td>construct</td><td>new 操作</td></tr><tr><td><code>[[GetPrototypeOf]]</code></td><td>getPrototypeOf</td><td>Object.getPrototypeOf</td></tr><tr><td><code>[[SetPrototypeOf]]</code></td><td>setPrototypeOf</td><td>Object.setPrototypeOf</td></tr><tr><td><code>[[IsExtendsible]]</code></td><td>isExtendsible</td><td>Object.isExtendsible</td></tr><tr><td><code>[[PrebentExtensions]]</code></td><td>preventExtensions</td><td>Object.preventExtensions</td></tr><tr><td><code>[[DefineProperty]]</code></td><td>defineProperty</td><td>Object.defineProperty, Object.defineProperties</td></tr><tr><td><code>[[GetOwnProperty]]</code></td><td>getOwnPropertyDescriptor</td><td>Object.getOwnPropertyDescriptor, for...in, Object.keys/values/entries</td></tr><tr><td><code>[[OwnPropertyKeys]]</code></td><td>ownKeys</td><td>Object.getOwnPropertyName, Object.getOwnPropertySymbols, for...in, Object.keys/values/enteries</td></tr></tbody></table><p><strong>proxy的handler中没有钩子函数时，proxy就是target的一个透明代理。</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">let target = {};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">let handler = {};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">let proxy = new Proxy(target, handler);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>一般我们用代理覆盖了变量。代理应该在所有地方完全替代了目标对象，目标对象被代理之后，任何人都不应该再引用目标对象。</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">let numbers = [1, 2, 3];</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 代理覆盖了变量。代理应该在所有地方都完全替代了目标对象，目标对象被代理之后，任何人都不应该再引用目标对象。</span></span>
<span class="line"><span style="color:#A6ACCD;">numbers = new Proxy(numbers, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    get(target, key, receiver) {</span></span>
<span class="line"><span style="color:#A6ACCD;">         if (key in target) {</span></span>
<span class="line"><span style="color:#A6ACCD;">             return target[key];</span></span>
<span class="line"><span style="color:#A6ACCD;">         } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">             return 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">         }</span></span>
<span class="line"><span style="color:#A6ACCD;">     }</span></span>
<span class="line"><span style="color:#A6ACCD;"> })</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>set钩子中，成功写入属性要返回true，否则返回false，什么都返回会出现TypeError</strong></p><p><strong>Object.keys() for...in等方法，都使用了内部的 [[OwnPropertyKyes]]方法，这个内部方法，使用 <code>ownKeys</code> 钩子来拦截</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * Object.keys()/Object.values() 返回带有enumerrable标记的非Symbol键值对</span></span>
<span class="line"><span style="color:#A6ACCD;"> * for...in 循环遍历所有带有 enumerable 标记的非 Symbol 键，以及原型对象的键</span></span>
<span class="line"><span style="color:#A6ACCD;"> * Object.getOwnPropertyNames(obj) 返回非 Symbol 键</span></span>
<span class="line"><span style="color:#A6ACCD;"> * Object.getOwnPropertySymbols(obj) 返回 symbol 键</span></span>
<span class="line"><span style="color:#A6ACCD;"> * **/</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">let user = {</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &#39;John&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    age: 30,</span></span>
<span class="line"><span style="color:#A6ACCD;">    _password: &#39;***&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">user = new Proxy(user, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    ownKeys(target) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return Object.keys(target).filter(key =&gt; !key.startsWith(&#39;_&#39;));</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">for (let key in user) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(key);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(Object.keys(user));</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(Object.values(user));</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * Object.keys() 仅返回带有enumerable标记的属性，为了检查它，该方法会对每个属性调用[[GetOwnProperty]]  即 Object.getOwnPropertyDescriptor()</span></span>
<span class="line"><span style="color:#A6ACCD;"> * **/</span></span>
<span class="line"><span style="color:#A6ACCD;">let user = {};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">user = new Proxy(user, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 拦截内置方法 [[OwnPropertyKeys]]</span></span>
<span class="line"><span style="color:#A6ACCD;">    ownKeys(target) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 拦截内置方法 [[GetOwnProperty]]</span></span>
<span class="line"><span style="color:#A6ACCD;">    // getOwnPropertyDescriptor(target, prop) {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">// 当user为空的时候，检测不到 enumerable 标记，这里返回的就是空</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(Object.keys(user)); // []</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 如果该属性不存在，我们只需要拦截 [[GetOwnProperty]] 即 getOwnPropertyDescriptor(target, prop)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">let user = {};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">user = new Proxy(user, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 拦截内置方法 [[OwnPropertyKeys]]</span></span>
<span class="line"><span style="color:#A6ACCD;">    ownKeys(target) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 拦截内置方法 [[GetOwnProperty]]</span></span>
<span class="line"><span style="color:#A6ACCD;">    getOwnPropertyDescriptor(target, prop) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 为了实现 [[GetOwnProperty]] 方法调用时，返回enumerrable标记</span></span>
<span class="line"><span style="color:#A6ACCD;">        return {</span></span>
<span class="line"><span style="color:#A6ACCD;">            enumerable: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">            configurable: true</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(Object.keys(user));</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>可撤销的代理</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">let user = {};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">let { proxy, revoke } = Proxy.revocable(user, {});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 调用revoke会从代理中删除对目标对象的所有内部引用</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h1 id="reflect" tabindex="-1">Reflect <a class="header-anchor" href="#reflect" aria-hidden="true">#</a></h1><p><strong>Reflect是一个内置对象，可简化的创建Proxy。</strong></p><p><strong>以前的内部方法 <code>[[Get]]</code> ， <code>[[Set]]</code> 都是规范，不能直接调用。Reflect使得调用这些方法称为可能，它的方法是内部方法的最小包装。</strong></p><p><strong>对于每一个可以被Proxy捕获到的内部方法。Reflect都有一个对应的方法，其名称和参数，和Proxy钩子相同，因此我们可以用Reflect将操作转发到原始对象。</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">let user = {</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &#39;John&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">user = new Proxy(user, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    get(target, key, receiver) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;get&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 使用Reflect将调用转发给对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        return Reflect.get(target, key, receiver);</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    set(target, key, value, receiver) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(&#39;set&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return Reflect.set(target, key, value, receiver);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(user.name);</span></span>
<span class="line"><span style="color:#A6ACCD;">user.name = &#39;test&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h1 id="装饰器" tabindex="-1">装饰器 <a class="header-anchor" href="#装饰器" aria-hidden="true">#</a></h1><p>装饰器是一种函数，用于注释或修改类、类方法。写法是 <code>@+函数名</code> 。</p><p>除了注释，装饰器还可以用来类型检查。</p><p><strong>装饰器对类行为的改变，是代码编译时发生的，而不是在运行时，本质是在编译时执行的函数。</strong></p><p><strong>如果同一个方法有多个装饰器，就会像剥洋葱一样，先从外到内进入，然后由内到外执行。</strong></p><p>装饰器也可以传参进去的。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@testProps(&#39;name&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>装饰器主要用于：</p><ul><li><p>装饰类</p><ul><li></li></ul></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">    @annotation</span></span>
<span class="line"><span style="color:#A6ACCD;">    class MyClass {}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    function annotation(target) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    	// 相当于给类加上了一个静态属性</span></span>
<span class="line"><span style="color:#A6ACCD;">    	target.annotation = true;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    // 等同于</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    class A {}</span></span>
<span class="line"><span style="color:#A6ACCD;">    A = decorator(A) || A</span></span>
<span class="line"><span style="color:#A6ACCD;">    \`\`\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">* 装饰方法或属性</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  + \`target\`：类的原型对象</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  + \`name\`：所要装饰的属性名</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  + \`descriptor\`：该属性的描述对象</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  - </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><pre><code>class MyClass {
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
\`\`\`
</code></pre><p><strong>为什么装饰器不能用于函数？</strong></p><p>--因为存在函数提升。类不存在提升，所以装饰器可以用于类和类的方法</p><p><strong>装饰器的优点：</strong></p><ul><li><p>不需要通过创建子类的方式去扩展功能，避免代码的臃肿。</p></li><li><p>装饰类的方法复用性高。</p></li><li><p>不会影响原对象的代码结构。</p></li></ul><p><strong>装饰器在Vue中的应用：</strong></p><p>实际业务中，常常会把功能性代码和业务性代码耦合在一起，可以将功能性代码抽离出去，作为装饰器来装饰业务功能。</p><ul><li>**@Validate：**表单校验的逻辑抽离</li><li>**@catchError：**try...catch逻辑的抽离</li></ul>`,42),t=[p];function o(r,c,i,C,A,y){return a(),n("div",null,t)}const g=s(l,[["render",o]]);export{D as __pageData,g as default};
