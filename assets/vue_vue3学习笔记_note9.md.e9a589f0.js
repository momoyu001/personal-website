import{_ as s,c as n,o as a,d as l}from"./app.759d40dd.js";const F=JSON.parse('{"title":"如果设计自己的通用组件库？","description":"","frontmatter":{},"headers":[{"level":2,"title":"技术栈","slug":"技术栈","link":"#技术栈","children":[]},{"level":2,"title":"环境搭建","slug":"环境搭建","link":"#环境搭建","children":[]},{"level":2,"title":"布局组件","slug":"布局组件","link":"#布局组件","children":[{"level":3,"title":"样式的处理","slug":"样式的处理","link":"#样式的处理","children":[]},{"level":3,"title":"组件注册","slug":"组件注册","link":"#组件注册","children":[]}]},{"level":2,"title":"Jest","slug":"jest","link":"#jest","children":[{"level":3,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":3,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":3,"title":"button组件","slug":"button组件","link":"#button组件","children":[]}]},{"level":2,"title":"渲染器的创建","slug":"渲染器的创建","link":"#渲染器的创建","children":[]},{"level":2,"title":"渲染器的实现","slug":"渲染器的实现","link":"#渲染器的实现","children":[]},{"level":2,"title":"track","slug":"track","link":"#track","children":[]},{"level":2,"title":"trigger","slug":"trigger","link":"#trigger","children":[]},{"level":2,"title":"effect","slug":"effect","link":"#effect","children":[]},{"level":2,"title":"ref","slug":"ref","link":"#ref","children":[]},{"level":2,"title":"computed","slug":"computed","link":"#computed","children":[]}],"relativePath":"vue/vue3学习笔记/note9.md"}'),p={name:"vue/vue3学习笔记/note9.md"},e=l(`<h1 id="如果设计自己的通用组件库" tabindex="-1">如果设计自己的通用组件库？ <a class="header-anchor" href="#如果设计自己的通用组件库" aria-hidden="true">#</a></h1><p><strong>项目名称：vue-ts-ailemente</strong></p><p>基础组件 + 数据组件 + 表单组件+ 通知组件</p><h2 id="技术栈" tabindex="-1">技术栈 <a class="header-anchor" href="#技术栈" aria-hidden="true">#</a></h2><p>vite + TypeScript + Sass + ESLint</p><h2 id="环境搭建" tabindex="-1">环境搭建 <a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a></h2><p><strong>Tips : 安装第三方包的时候，用npm，但是到了初始化的时候，用npx，？</strong></p><p><strong>npm 是把包安装到本地的node_modules里，比如我们安装了husky，但是并没有全局安装，直接执行husky会提示找不到，npx就是可以直接使用mode_moudulesn内部安装命令的工具</strong></p><ul><li>npm init vite@latest</li><li>project-name: ailemente</li><li>cd ailemente</li><li>npm install</li><li>npm run dev</li><li>npm install -D husky <code>配置Git的钩子函数 - 安装husky</code></li><li>npx husky install <code>初始化husky - 根目录下生成 .husky 文件夹</code></li><li>npx husky add .husky/commit-msg &quot;node scripts/verifyCommit.js&quot; <code>npx husky add 命令 新增 commit msg 钩子</code><ul><li>windows系统中，执行上面的命令，可能会识别不了，需要分开执行</li><li>第一步：<code>npx husky sdd .husky/commit-msg</code></li><li>第二部：<code>在.husky文件下的commit-msg文件中，写入 node scripts/verifyCommit.js</code></li></ul></li><li><strong>package.json中，配置githooks</strong></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;gitHooks&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;commit-msg&quot;: &quot;node scripts/verifyCommit.js&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li><code>.git/COMMIT_EDITMSG</code>保存git提交时的描述信息的文件</li><li>verifyCommit.js</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    1、读取.git/COMMIT_EDITMSG文件中的commit提交的信息</span></span>
<span class="line"><span style="color:#A6ACCD;">    2、正则校验提交信息的格式等</span></span>
<span class="line"><span style="color:#A6ACCD;">    3、校验不通过，终止代码的提交</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>git钩子 <ul><li>commit-msg：提交代码的时候执行的 -- 校验提交的信息</li><li>pre-commit：提交代码之前执行的 -- ESLint检测代码格式</li></ul></li><li>添加代码格式校验 <ul><li><code>npx husky add .husky/pre-commit &quot;npm run lint&quot;</code></li><li>以上命令同样可以拆解</li><li>package.json文件中配置命令<code>lint: eslint --fix --ext .ts, .vue src</code></li><li>Vue3不要求只有一个根元素，在eslint的rules中配置<code>&quot;vue/no-multiple-template-root&quot;: &quot;off&quot;</code>，关闭一个根元素的校验</li><li>vue3.2中不需要显式的引入<code>definProps</code>等，需要在eslint配置中加入：</li></ul></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;env&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;vue/setup-compiler-macros&quot;: true</span></span>
<span class="line"><span style="color:#A6ACCD;">        }, </span></span>
<span class="line"><span style="color:#A6ACCD;">        function addCount() {</span></span>
<span class="line"><span style="color:#A6ACCD;">            count.value++; </span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="布局组件" tabindex="-1">布局组件 <a class="header-anchor" href="#布局组件" aria-hidden="true">#</a></h2><h3 id="样式的处理" tabindex="-1">样式的处理 <a class="header-anchor" href="#样式的处理" aria-hidden="true">#</a></h3><p>scss 的mixin：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">$namespace: &#39;el&#39;; </span></span>
<span class="line"><span style="color:#A6ACCD;">@mixin b($block) {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    $B: $namespace + &#39;-&#39; + $block !global; // 通过传进来的block生成新的变量$B，拼接上了 饿了</span></span>
<span class="line"><span style="color:#A6ACCD;">    .#{$B} {</span></span>
<span class="line"><span style="color:#A6ACCD;">        @content;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 添加后缀啥的</span></span>
<span class="line"><span style="color:#A6ACCD;">@mixin when($state) {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @at-root {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &amp;.#{$state-prefix + $state} {</span></span>
<span class="line"><span style="color:#A6ACCD;">            @content;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@import &#39;../styles/mixin.scss&#39;; </span></span>
<span class="line"><span style="color:#A6ACCD;">@include b(container) {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">    flex-direction: row;</span></span>
<span class="line"><span style="color:#A6ACCD;">    flex: 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    flex-basis: auto;</span></span>
<span class="line"><span style="color:#A6ACCD;">    box-sizing: border-box;</span></span>
<span class="line"><span style="color:#A6ACCD;">    min-width: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @include when(vertical) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex-direction: column;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="组件注册" tabindex="-1">组件注册 <a class="header-anchor" href="#组件注册" aria-hidden="true">#</a></h3><p>使用插件机制对外暴露安装的接口</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">App</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ElContainer </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./Container.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ElHeader </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./Header.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ElFooter </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./Footer.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ElAside </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./Aside.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ElMain </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./Main.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">install</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ElContainer</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ElContainer</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ElHeader</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ElHeader</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ElFooter</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ElFooter</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ElAside</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ElAside</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ElMain</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ElMain</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h1 id="单元测试" tabindex="-1">单元测试 <a class="header-anchor" href="#单元测试" aria-hidden="true">#</a></h1><p>写好测试的函数，可以 <code>node</code> 命令运行函数来测试；在提交代码之前，执行测试函数。</p><p>-- TDD开发 - 测试驱动开发</p><h2 id="jest" tabindex="-1">Jest <a class="header-anchor" href="#jest" aria-hidden="true">#</a></h2><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install -D jest@26 vue-jest@next @vue/test-utils@next</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install -D babel-jest@26 @babel/core @babel/preset-env</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install -D ts-jest@26 @babel/preset-typescript @types/jest</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>vue-jest 和 @vue/test-utils 是测试 Vue 组件必备的库</li><li>babel转码的库</li><li>Jest 适配 TypeScript 的库</li></ul><h3 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-hidden="true">#</a></h3><ul><li>.babel.config.js文件配置 -- 为了让babel解析到node和typescipt环境中</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;">        presets: [</span></span>
<span class="line"><span style="color:#A6ACCD;">            [&#39;@babel/preset-env&#39;, { targets: { node: &#39;current&#39; } }], </span></span>
<span class="line"><span style="color:#A6ACCD;">            &#39;@babel/preset-typescript&#39;, </span></span>
<span class="line"><span style="color:#A6ACCD;">        ], </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>新建<code>jest.config.js</code>文件 -- 配置jest的测试行为。</li><li>不同格式的文件需要使用不同的命令来配置。 <ul><li>.vue：vue-test</li><li>.js .jsx: babel-test</li><li>.ts: ts-test</li></ul></li><li>匹配文件名是<code>xx.spec.js</code>。Jest 只会执行.spec.js 结尾的文件</li><li>package.json文件中：scripts中 增加 <code>&quot;test&quot;: &quot;jest&quot;</code></li></ul><h3 id="button组件" tabindex="-1">button组件 <a class="header-anchor" href="#button组件" aria-hidden="true">#</a></h3><ul><li>配置vue全局变量</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    const app = createApp(App);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    app.config.globalProperties.$AILEMENT = {</span></span>
<span class="line"><span style="color:#A6ACCD;">        size: &#39;large&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>vue3获取当前的实例</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">    getCurrentInstance获取当前的实例 ; 对应的TS类型 - ComponnetIternalInstance</span></span>
<span class="line"><span style="color:#A6ACCD;">    import { getCurrentInstance } from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    export function useGlobalConfig() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        const instance:ComponentInternalInstance|null = getCurrentInstance();</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (!instance) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&#39;useGlobalConfig必须得在setup里面整&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">            return;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        return instance.appContext.config.globalProperties.$AILEMENTE || {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li><p>jest.config.js文件增加配置</p><ul><li>collectCoverage: true // 表示需要收集代码测试覆盖率</li><li>以上配置之后，执行npm run test，根目录下会有coverage目录，index.html文件 打开之后会有报告</li></ul></li><li><p>husky/pre-commit文件</p><ul><li>增加npm run test命令，每次提交代码之前，都会先执行测试，测试通过才可以提交代码</li></ul></li></ul><h1 id="自定义渲染器" tabindex="-1">自定义渲染器 <a class="header-anchor" href="#自定义渲染器" aria-hidden="true">#</a></h1><p>渲染器是围绕虚拟DOM存在的。</p><h2 id="渲染器的创建" tabindex="-1">渲染器的创建 <a class="header-anchor" href="#渲染器的创建" aria-hidden="true">#</a></h2><p>runtime-core模块暴露的接口：createElement　createText insert remote setText patchProps等</p><p>runtime-dom中传入以上方法的具体实现（不同平台的不同实现）</p><h2 id="渲染器的实现" tabindex="-1">渲染器的实现 <a class="header-anchor" href="#渲染器的实现" aria-hidden="true">#</a></h2><p>渲染到小程序平台：vue3-miniapp 渲染到canvas：vue3-canvas</p><p><strong>以canvas渲染器为例</strong> 将canvas维护成一个对象，每次操作的时候直接把canvas重绘一下就可以</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">createRender</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vue/runtime-core</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">createApp</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> originCa</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createRender</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">insert</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">child</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">parent</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">anchor</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">createElement</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">type</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">isSVG</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">isCustom</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">setElementText</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">node</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">text</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">patchProp</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">el</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">prev</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">next</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>每次直接更改对应的虚拟DOM，然后重绘。</p><p><strong>自定义渲染器的原理：就是把所有的增删改查操作暴露出去，使用的时候不需要知道内部的实现细节，我们只需要针对每个平台使用不同的API即可。</strong></p><p>适配器设计模式的一个实现。</p><h1 id="vue2-vs-vue3" tabindex="-1">vue2 VS vue3 <a class="header-anchor" href="#vue2-vs-vue3" aria-hidden="true">#</a></h1><p><a href="https://github.com/shengxinjing/vue3-vs-vue2.git" target="_blank" rel="noreferrer">https://github.com/shengxinjing/vue3-vs-vue2.git</a></p><h1 id="响应式" tabindex="-1">响应式 <a class="header-anchor" href="#响应式" aria-hidden="true">#</a></h1><p>把普通的JavaScript对象封装成响应式对象，拦截数据的获取和修改操作。实现依赖数据的自动化更新。</p><p>一个简单的响应式模型，我们可以通过reactive或者ref函数，把数据包构成响应式对象，并且通过effect函数注册回调函数，然后在数据修改之后，响应式的通知effect去执行回调函即可。</p><h2 id="track" tabindex="-1">track <a class="header-anchor" href="#track" aria-hidden="true">#</a></h2><p>track函数：targetMap去存储依赖关系。map的key是我们要代理的target对象呢，值还是一个depsMap。存储着每一个ky依赖的函数，每一个key都可以依赖多个effect。</p><p>依赖地图： targetMap = {</p><pre><code>target: {
    key1: [回调函数1， 回调函数2], 
    key2: [回调函数3， 回调函数4]
}, 
target1: {
    key3: [回调函数5 ]
}
</code></pre><p>}</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// track.js</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> targetMap </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">WeakMap</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">track</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">target</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">type</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// console.log( \`触发 track -&gt; target: \${target} type:\${type} key:\${key}\` )</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 1. 先基于 target 找到对应的 dep</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 如果是第一次的话，那么就需要初始化</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// {</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">//   target1: {//depsmap</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">//     key:[effect1, effect2]</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">//   }</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// }</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">depsMap</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">targetMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">depsMap</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 初始化 depsMap 的逻辑</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// depsMap = new Map()</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// targetMap.set(target, depsMap)</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 上面两行可以简写成下面的</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">targetMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">depsMap</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Map</span><span style="color:#F07178;">()))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">deps</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">depsMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">deps</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">deps</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Set</span><span style="color:#F07178;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">deps</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">has</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">activeEffect</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">activeEffect</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 防止重复注册</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">deps</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">activeEffect</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">depsMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">deps</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="trigger" tabindex="-1">trigger <a class="header-anchor" href="#trigger" aria-hidden="true">#</a></h2><p>trigger函数的实现思路就是<strong>从targetMap中，根据target和key找到对应的依赖函数集合deps，然后遍历deps执行依赖函数</strong></p><h2 id="effect" tabindex="-1">effect <a class="header-anchor" href="#effect" aria-hidden="true">#</a></h2><p>我们需要在effect函数中把依赖函数进行包装，并对依赖函数的执行时机进行控制（scheduler）。</p><p>依赖的收集：</p><pre><code>把传递进来的fn函数通过effectFn函数包裹执行，在effectFn函数内部，把函数赋值给全局变量activeEffect；然后执行fn()的时候，就会触发响应式对象的get函数，get函数内部就会把activeEffect存储到依赖地图中，完成依赖的收集。
</code></pre><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export function effect(fn, options = {}) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  // effect嵌套，通过队列管理</span></span>
<span class="line"><span style="color:#A6ACCD;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    try {</span></span>
<span class="line"><span style="color:#A6ACCD;">      activeEffect = effectFn</span></span>
<span class="line"><span style="color:#A6ACCD;">      //fn执行的时候，内部读取响应式数据的时候，就能在get配置里读取到activeEffect</span></span>
<span class="line"><span style="color:#A6ACCD;">      return fn()</span></span>
<span class="line"><span style="color:#A6ACCD;">    } finally {</span></span>
<span class="line"><span style="color:#A6ACCD;">      activeEffect = null</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!options.lazy) {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    //没有配置lazy 直接执行</span></span>
<span class="line"><span style="color:#A6ACCD;">    effectFn()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  effectFn.scheduler = options.scheduler // 调度时机 watchEffect回用到</span></span>
<span class="line"><span style="color:#A6ACCD;">  return effectFn</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>scheduler：手动控制函数执行的时机，方便应对一些性能优化的场景。比如：数据在一次交互中可能会被修改多次，我们不想每次修改都重新执行effect函数，而是合并最终的状态之后，最后统一修改一次。</p><h2 id="ref" tabindex="-1">ref <a class="header-anchor" href="#ref" aria-hidden="true">#</a></h2><p>ref也可以包裹复杂的数据结构，内部会直接调用reactive来实现。</p><h2 id="computed" tabindex="-1">computed <a class="header-anchor" href="#computed" aria-hidden="true">#</a></h2><p>是一个特殊的effect函数。computed可以传递一个函数或者对象，实现计算属性的读取和修改。</p><p>拦截computed的value属性，并且定制了effect的lazy和scheduler配置，computed注册的函数就不会直接执行，而是要通过scheduler函数中的_dirty属性决定是否执行。</p>`,75),o=[e];function t(c,r,i,y,C,A){return a(),n("div",null,o)}const d=s(p,[["render",t]]);export{F as __pageData,d as default};
