import{_ as s,c as a,o as l,d as n}from"./app.fc8d6d98.js";const u=JSON.parse('{"title":"CSS","description":"","frontmatter":{},"headers":[{"level":2,"title":"CSS3 新增特性","slug":"css3-新增特性","link":"#css3-新增特性","children":[]},{"level":2,"title":"vw 和 vh","slug":"vw-和-vh","link":"#vw-和-vh","children":[]},{"level":2,"title":"特效","slug":"特效","link":"#特效","children":[{"level":3,"title":"text-shadow","slug":"text-shadow","link":"#text-shadow","children":[]},{"level":3,"title":"box-shadow","slug":"box-shadow","link":"#box-shadow","children":[]}]},{"level":2,"title":"线性渐变","slug":"线性渐变","link":"#线性渐变","children":[]},{"level":2,"title":"旋转过渡","slug":"旋转过渡","link":"#旋转过渡","children":[{"level":3,"title":"transform","slug":"transform","link":"#transform","children":[]},{"level":3,"title":"transition","slug":"transition","link":"#transition","children":[]}]},{"level":2,"title":"动画","slug":"动画","link":"#动画","children":[]},{"level":2,"title":"圆角","slug":"圆角","link":"#圆角","children":[]},{"level":2,"title":"Flex 布局","slug":"flex-布局","link":"#flex-布局","children":[]},{"level":2,"title":"Grid 布局","slug":"grid-布局","link":"#grid-布局","children":[]},{"level":2,"title":"盒模型","slug":"盒模型","link":"#盒模型","children":[]},{"level":2,"title":"Sass 和 Less","slug":"sass-和-less","link":"#sass-和-less","children":[{"level":3,"title":"相同点","slug":"相同点","link":"#相同点","children":[]},{"level":3,"title":"区别","slug":"区别","link":"#区别","children":[]}]},{"level":2,"title":"link 和 import","slug":"link-和-import","link":"#link-和-import","children":[]},{"level":2,"title":"BFC","slug":"bfc","link":"#bfc","children":[{"level":3,"title":"作用：","slug":"作用","link":"#作用","children":[]},{"level":3,"title":"如何创建 BFC","slug":"如何创建-bfc","link":"#如何创建-bfc","children":[]}]}],"relativePath":"interview/2024interview/css.md"}'),e={name:"interview/2024interview/css.md"},p=n(`<h1 id="css" tabindex="-1">CSS <a class="header-anchor" href="#css" aria-hidden="true">#</a></h1><p><a href="https://juejin.cn/post/7098689890933538853" target="_blank" rel="noreferrer">参考文档 1</a></p><p><a href="https://juejin.cn/post/7269794410573512758" target="_blank" rel="noreferrer">参考文档 2</a></p><h2 id="css3-新增特性" tabindex="-1">CSS3 新增特性 <a class="header-anchor" href="#css3-新增特性" aria-hidden="true">#</a></h2><h2 id="vw-和-vh" tabindex="-1">vw 和 vh <a class="header-anchor" href="#vw-和-vh" aria-hidden="true">#</a></h2><p>vw 和 vh，CSS3 的新单位，即 <code>view width</code> 可视窗口宽度和 <code>view height</code> 可视窗口高度。1 vh 相当于可视窗口高度的百分之一</p><h2 id="特效" tabindex="-1">特效 <a class="header-anchor" href="#特效" aria-hidden="true">#</a></h2><h3 id="text-shadow" tabindex="-1"><code>text-shadow</code> <a class="header-anchor" href="#text-shadow" aria-hidden="true">#</a></h3><p>文字阴影效果</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">text-shadow: h-shadow v-shadow blur color;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>h-shadow：设置水平阴影的位置（x 轴方向），必需要设置的参数；允许负值。</li><li>v-shadow：设置垂直阴影的位置（y 轴方向），必需要设置的参数，允许负值。</li><li>blur：阴影模糊的距离（半径大小），可选择设置的参数。</li><li>color：阴影的颜色，可选择设置的参数。</li></ul><p>text-shadow 属性可以向文本添加一个或多个阴影。该属性是逗号分隔的阴影列表，每个阴影有两个或三个长度值和一个可选的颜色值进行规定。省略的长度是 0。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.text-shadow {</span></span>
<span class="line"><span style="color:#A6ACCD;">  text-shadow: 10px 10px 1px #ff0000, -3px -3px 2px #ff00ff;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="box-shadow" tabindex="-1"><code>box-shadow</code> <a class="header-anchor" href="#box-shadow" aria-hidden="true">#</a></h3><p>可在元素周围创建阴影效果</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">box-shadow: [inset] x-offset y-offset blur-radius spread-radius color;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>inset：</li><li>x-offset：必填 阴影水平偏移量，它可以是正负值。如为正值，则阴影在元素的右边；如其值为负值，则阴影在元素的左边</li><li>y-offset：必填 阴影垂直偏移量，它可以是正负值。如为正值，则阴影在元素的底部；如其值为负值时，则阴影在元素的顶部</li><li>blur-radius：可选 阴影模糊半径，它只能是正值。如值为 0，则阴影不具有模糊效果；它的值越大，阴影的边缘就越模糊</li><li>spread-radius：可选 阴影扩展半径，它可以是正负值。如为正值，则扩大阴影的尺寸；如为负值，则缩小阴影的尺寸</li><li>color：可选 阴影颜色。如不设定颜色，浏览器会取默认色，但各浏览器默认取色不一致。（经测试，在 Safari 上是半透明的，在 chrome、firefox、ie 上都是黑色的）。不推荐省略颜色值</li></ul><h4 id="举个栗子" tabindex="-1">举个栗子： <a class="header-anchor" href="#举个栗子" aria-hidden="true">#</a></h4><ul><li>单侧阴影：扩展半径抵消模糊半径，单侧不偏移</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">box-shadow: 0px 10px 3px -3px #ff0000;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>多彩云朵：多个阴影叠加形成，写在最前面的阴影会覆盖后面写的阴影</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;div class=&quot;box&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;cloud&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// css</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.box {</span></span>
<span class="line"><span style="color:#A6ACCD;">  width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  height: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  margin: 60px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">  color: white;</span></span>
<span class="line"><span style="color:#A6ACCD;">  background-color: #655;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">.cloud {</span></span>
<span class="line"><span style="color:#A6ACCD;">  width: 60px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  height: 50px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  margin: 40px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  background-color: currentColor;</span></span>
<span class="line"><span style="color:#A6ACCD;">  border-radius: 50%;</span></span>
<span class="line"><span style="color:#A6ACCD;">  box-shadow:</span></span>
<span class="line"><span style="color:#A6ACCD;">    100px 0px 0px -10px lightcoral,</span></span>
<span class="line"><span style="color:#A6ACCD;">    40px 0px lightcyan,</span></span>
<span class="line"><span style="color:#A6ACCD;">    70px 15px lightsalmon,</span></span>
<span class="line"><span style="color:#A6ACCD;">    30px 20px 0px -10px lightseagreen,</span></span>
<span class="line"><span style="color:#A6ACCD;">    70px -15px lightskyblue,</span></span>
<span class="line"><span style="color:#A6ACCD;">    30px -30px lightgoldenrodyellow;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>多边框：阴影重叠</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;div class=&quot;box multi-border&quot;&gt;多边框&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.box {</span></span>
<span class="line"><span style="color:#A6ACCD;">  width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  height: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  margin: 60px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  float: left;</span></span>
<span class="line"><span style="color:#A6ACCD;">  color: white;</span></span>
<span class="line"><span style="color:#A6ACCD;">  background-color: #655;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">.multi-border {</span></span>
<span class="line"><span style="color:#A6ACCD;">  box-shadow:</span></span>
<span class="line"><span style="color:#A6ACCD;">    0px 0px 0px 4px lightsalmon,</span></span>
<span class="line"><span style="color:#A6ACCD;">    0px 0px 0px 8px lightblue,</span></span>
<span class="line"><span style="color:#A6ACCD;">    0px 0px 0px 12px lightseagreen,</span></span>
<span class="line"><span style="color:#A6ACCD;">    0px 0px 0px 16px lightcoral,</span></span>
<span class="line"><span style="color:#A6ACCD;">    0px 0px 0px 20px lightskyblue;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>新拟物设计</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;div class=&quot;parent&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;object&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// css</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.parent {</span></span>
<span class="line"><span style="color:#A6ACCD;">  width: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  height: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  padding: 100px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  background: #e0e0e0;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">.object {</span></span>
<span class="line"><span style="color:#A6ACCD;">  width: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  height: 200px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  border-radius: 50px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  background: #e0e0e0;</span></span>
<span class="line"><span style="color:#A6ACCD;">  box-shadow:</span></span>
<span class="line"><span style="color:#A6ACCD;">    20px 20px 60px #bebebe,</span></span>
<span class="line"><span style="color:#A6ACCD;">    -20px -20px 60px #ffffff;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="线性渐变" tabindex="-1">线性渐变 <a class="header-anchor" href="#线性渐变" aria-hidden="true">#</a></h2><p>gradient</p><h2 id="旋转过渡" tabindex="-1">旋转过渡 <a class="header-anchor" href="#旋转过渡" aria-hidden="true">#</a></h2><h3 id="transform" tabindex="-1">transform <a class="header-anchor" href="#transform" aria-hidden="true">#</a></h3><h3 id="transition" tabindex="-1">transition <a class="header-anchor" href="#transition" aria-hidden="true">#</a></h3><h2 id="动画" tabindex="-1">动画 <a class="header-anchor" href="#动画" aria-hidden="true">#</a></h2><p>animation</p><h2 id="圆角" tabindex="-1">圆角 <a class="header-anchor" href="#圆角" aria-hidden="true">#</a></h2><p>border-radius</p><h2 id="flex-布局" tabindex="-1">Flex 布局 <a class="header-anchor" href="#flex-布局" aria-hidden="true">#</a></h2><p><a href="https://ruanyifeng.com/blog/2015/07/flex-grammar.html" target="_blank" rel="noreferrer">阮一峰 FLEX 布局</a></p><h2 id="grid-布局" tabindex="-1">Grid 布局 <a class="header-anchor" href="#grid-布局" aria-hidden="true">#</a></h2><p><a href="https://blog.csdn.net/weixin_43334673/article/details/108879115" target="_blank" rel="noreferrer">阮一峰 Grid 布局</a></p><h2 id="盒模型" tabindex="-1">盒模型 <a class="header-anchor" href="#盒模型" aria-hidden="true">#</a></h2><ul><li>IE 盒模型：<code>box-sizing: border-box</code>;</li><li>标准盒模型：<code>box-sizeing: content-box</code>;</li></ul><h2 id="sass-和-less" tabindex="-1">Sass 和 Less <a class="header-anchor" href="#sass-和-less" aria-hidden="true">#</a></h2><h3 id="相同点" tabindex="-1">相同点 <a class="header-anchor" href="#相同点" aria-hidden="true">#</a></h3><p>都是 css 预处理器，是 CSS 上的一种抽象层。通过一种特殊的语法编译成了 CSS。增加了 CSS 代码的复用性。</p><ul><li>层级</li><li>mixin</li><li>变量</li><li>循环</li><li>函数</li></ul><h3 id="区别" tabindex="-1">区别 <a class="header-anchor" href="#区别" aria-hidden="true">#</a></h3><ul><li>编译环境不一样 <ul><li>Sass 在服务端处理，以前是 Ruby，现在是 Dart-Sass 或 Node-Sass</li><li>Less 是需要引入 less.js 来处理 Less 代码输出 CSS 到浏览器，也可以在开发服务器将 Less 语法编译成 css 文件，输出 CSS 文件到生产包目录</li></ul></li><li>变量符不一样 <ul><li>Less 是 <code>@</code></li><li>Sass 是 <code>$</code></li></ul></li><li>对条件语句的支持 <ul><li>Sass 支持条件语句，可以使用 <code>if {} else {}, for {}</code></li><li>Less 不支持</li></ul></li></ul><h2 id="link-和-import" tabindex="-1">link 和 import <a class="header-anchor" href="#link-和-import" aria-hidden="true">#</a></h2><h2 id="bfc" tabindex="-1">BFC <a class="header-anchor" href="#bfc" aria-hidden="true">#</a></h2><p><a href="https://juejin.cn/post/7296297545969139723?searchId=2024072022595706FCA9CE7D9616187F13" target="_blank" rel="noreferrer">参考文档</a></p><p>块级格式化上下文，一个独立的区域，在 BFC 布局里面的元素不受外部影响。</p><p>如何创建 BFC：</p><ul><li>设置浮动：float 有值且不为 auto</li></ul><h3 id="作用" tabindex="-1">作用： <a class="header-anchor" href="#作用" aria-hidden="true">#</a></h3><ul><li>清除浮动：BFC 容器可以用来清除浮动元素的影响，确保父元素包含浮动子元素的高度，从而避免出现高度塌陷问题。这是 BFC 最常见的应用之一，特别是在创建多列布局或类似网格的布局时非常有用。</li><li>防止外边距坍塌：在同一个 BFC 容器内的相邻块级元素的外边距不会发生重叠，这有助于更精确地控制元素之间的间距。这对于垂直外边距塌陷问题的解决非常有帮助。</li></ul><h3 id="如何创建-bfc" tabindex="-1">如何创建 BFC <a class="header-anchor" href="#如何创建-bfc" aria-hidden="true">#</a></h3><ul><li>设置浮动：float 有值且不为 auto</li><li>设置绝对定位：但不为 relative</li><li>设置 overflow：hidden || auto || overly || scroll</li><li>设置 display：inline-block、table-cell、table-caption、flex 等</li></ul>`,57),i=[p];function t(o,r,c,d,h,C){return l(),a("div",null,i)}const x=s(e,[["render",t]]);export{u as __pageData,x as default};
