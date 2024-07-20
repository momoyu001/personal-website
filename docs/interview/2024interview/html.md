# HTML

## 1、src 和 href 的区别

### src 和 href 的相同点

都是 HTML 中特定元素的属性，都可以用来引入外部的资源。

### src

当浏览器解析到该元素时，会暂停其他资源的加载和处理，直到该资源加载、编译、执行完成。它会将资源内容嵌入到当前标签所在的位置，将其指向的资源下载应用到文档内。如 js 脚本等。这也是为什么需要将 script 标签放到 body 底部的原因。

有 src 属性的标签：

- img 标签
- script 标签
- iframe 标签
- video 标签
- audio 标签

### href

超链接，指向外部资源所在的位置，当浏览器识别到它指向的文件时，就会并行下载资源，不会停止对当前文档的处理

有 href 属性的标签：

- a 标签
- link 标签

## 2、script 标签

作用：引入 js 代码

引入方式：

- 内联：直接将 js 代码写在标签内部

```
<script>
  console.log('hello');
</script>
```

- 外置：即通过 src 属性引入外部的 js 文件。可以放置在 html 任意位置。无论是内联还是外置，执行顺序都是从上至下串行。浏览器首次加载 script 期间，还会阻塞 HTML 页面解析。尤其是外部引入的 js 还会经历 网络传输、解析、执行，有时候会导致浏览器页面白屏。

```
<html>
  <body>
    <script src="http://www.example.com/example.js"></script>
    <!-- 只有加载完并执行完 example.js 后，才开始加载 0.js -->
    <script src="./js/0.js"></script>
  </body>
</html>
```

- 动态引入：在 JS 代码里面动态添加 script 标签。

```
var myScript = document.createElement("script");
myScript.textContent = 'alert("✋")';
document.head.appendChild(myScript);

```

注意：通过以下代码创建的 script 标签不会运行

```
document.head.innerHTML += '<script>alert("✋")';

```

script 标签的 defer 和 async 属性：

- 没有任何属性

在 HTML 的解析过程中，遇到该标签，会暂停解析，先发起网络请求去下载 src 属性指向的 js 文件，然后执行该 js 代码，当代码执行完毕之后再恢复解析 HTML 文档。（有可能会出现白屏问题）

```
<script src="xxx"></script>
```

- defer 属性

```
<script src="xxx" defer></script>
```

在 HTML 解析的过程中，遇到该标签，会先去异步下载 js 文件，下载完成之后，若浏览器还未完成 HTML 的解析，也不会阻塞，而是等待 HTML 解析完成之后在执行 js 代码。

如果存在多个包含 defer 属性的 script 标签，浏览器会按照上下顺序，从上到下按照顺序执行各个 js 文件的代码，不会破坏 JS 脚本之间的依赖关系。

- async 属性

```
<script src="xxx" async></script>
```

在 HTML 的解析过程中，遇到该标签，会先去异步下载 js 文件，当下载完成之后，若 HTML 文档还未解析完，就会暂停解析，先执行 js 代码，执行完毕之后继续解析。

async 是不可控的，因为不确定何时会下载完成，若在该 js 代码中操作 DOM，可能会获取不到 DOM 元素。

如果存在多个包含 async 属性的 script 标签，无法保证各个标签对应的 js 文件执行的顺序。

总结：
script 标签 | 何时开始执行 JS | JS 执行顺序 | 是否阻塞解析 HTML
----------- | ----------------- | ----------- | ---------------
`<script>` | 网络请求返回时 | 在 HTML 中的顺序 | 阻塞
`<script async>` | 网络请求返回时 | 网络请求返回的顺序 | 可能阻塞，也可能不阻塞
`<script defer>` | 网络请求返回且 HTML 解析完成时 | 在 HTML 中的顺序 | 不阻塞

## 3、HTML5 新增的特性

[相关文档连接](https://juejin.cn/post/7358361832460173349?searchId=2024071022592824925A195E2C353CF084#heading-34)

### 语义化标签

语义化标签可以使你的 HTML 结构更具有可读性和可维护性，同时有助于搜索引擎正确解读网络内容，提高网页的排名和可访问性。

- header 定义文档的页眉，通常包含导航链接、网站标志、搜索内容等
- nav 定义导航链接的容器，通常包含网站的主要导航菜单
- main 定义文档的主要内容，通常包含页面的主要内容部分
- article 定义独立的、完整的内容块，如文章等
- section 定义文档中的区段，通常用于组织相关的内容
- aside 定义页面的侧边栏或附加内容，通常包含与页面相关但不是必需的内容，如广告、链接等
- footer 用于定义文档或节的页脚，通常包含版权信息、联系方式、网站地图等
- figure、figcaption 用于组织和标记图片、图表、音频、视频等媒体内容
- details、sunmmary 用于创建可展开的详细信息块，其中 summary 定义了默认可见的摘要
- time 用于标记日期、时间等信息，有助于搜索引擎理解和处理时间相关的内容

### 多媒体支持

- 图片：img 标签
- 视频：video 标签
- 音频：audio 标签

### canvas 和 svg

[canvas 参考文档](https://juejin.cn/post/7031407945447374861?searchId=2024071121353664A5DEA6581269DA31E9)

#### canvas

- 允许通过 js 动态绘制图形；绘制的图形是像素基础的，一旦绘制完成，就无法单独操作其中的元素；
- canvas 通常用于需要实时渲染、动态交互的场景，如图表、游戏、图像处理等；
- 提供了一个类似绘图板的 API，可以在其中绘制 2D 图形，如线条、矩形、圆形等；
- canvas 绘图的 API
  - fillRect(x, y, width, height)。绘制一个实心矩形，默认背景颜色为黑色，没有边框
  - fillStyle = "颜色值"。填充，配合 fillRect 且在 fillRect 之前使用
  - strokeRect(x, y, width, height)。绘制一个空心矩形，默认边框颜色为黑色，边框默认宽:1px
  - strokeStyle = "颜色值"。描边(空心)配合 strokeRect()，并在 strokeRect()之前使用
  - clearRect(x,y,width,height)。以矩形方式清除指定区域（类似橡皮擦） 放置在要清除的图形位置之后，即绘制一个，清除一下
  - globalAlpha = "透明值"。全局设置透明度（0~1）在颜色后设置透明度
  - canvas 是按顺序进行画图，后面的图形会将前面的覆盖

```
<canvas id="myCanvas" width="200px" height="200px"></canvas>

    <script>
      var myCanvas = document.getElementById("myCanvas");

      if (myCanvas.getContext) {
        // d 只能是小写
        const context = myCanvas.getContext("2d");

        // 填充颜色，需要在 fillRect 之前使用
        context.fillStyle = "#ff0000";

        // fillRect(x, y, width, height) 绘制实心矩形，默认背景色为黑色，没有边框
        context.fillRect(0, 0, 20, 20);

        // 描边，需要在 strokeRect 之前使用
        context.strokeStyle = "#ff00ff";

        // strokeRect(x, y, width, height) 空心矩形，默认边框颜色为黑色，默认边框宽度是 1px
        context.strokeRect(40, 40, 20, 20);

        context.clearRect(30, 30, 20, 20);

        //  --------------- 渐变 -------------------
        var grad = context.createLinearGradient(50, 50, 120, 120);

        // 添加颜色
        grad.addColorStop(0, "yellow");
        grad.addColorStop(0.5, "red");
        grad.addColorStop(1, "blue");

        // 画矩形
        context.fillStyle = grad; // 将渐变加到矩形中
        context.fillRect(50, 50, 120, 120);
      }
    </script>

```

#### svg

[SVG 参考文档](https://juejin.cn/post/7028958154545168414?searchId=20240714203213CFDFAC143203B0880DF8)

- SVG 是一种基于 XML 的矢量图形描述语言，可以在 HTML 中以标记形式使用
- SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失
- 由于 SVG 是 XML 文件，SVG 图像可以用任何文本编辑器创建，但是复杂的图形还是需要使用图形编辑工具
- SVG 的优势
  - 可以被非常多的工具读取和修改
  - 与 JPEG、GIF 图像比起来，尺寸更小，且可压缩性更强
  - 是可伸缩的
  - 可在任何分辨率下被高质量的打印
  - 可在图像质量不下降的情况下放大
  - 图像中的文本是可搜索的（适合制作地图）
  - 是纯粹的 XML

svg 示例：

```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red" />
</svg>

```

- 第一行是 XML 的声明
- standalone 属性规定此 SVG 文件是否是独立的，或含有对外部文件的引用，`standalone="no"` 意味着 SCG 文件会引用一个外部文件
- `<svg></svg>` 是表示 SVG 的代码。相当于开始标签和结束标签，这里是根元素
- width height 属性用于设置 SVG 文档的高度和宽度
- version 定义所使用的 SVG 版本
- xmlns 定义 SVG 的命名空间
- `<circle />` 用来创建一个圆。cx 和 cy 属性定义圆中心的 x 和 y 坐标。如果忽略这两个属性，那么圆点会被设置为 (0, 0)。r 属性定义圆的半径。
- stroke 和 stroke-width 属性控制如何显示形状的轮廓。我们把圆的轮廓设置为 2px 宽，黑边框。
- fill 属性设置形状内的颜色。我们把填充颜色设置为红色。
- 关闭标签的作用是关闭 SVG 元素和文档本身。
- 所有的开启标签必须有关闭标签！

### 表单类型属性

#### input 标签

##### type 属性

- email：H5
- url：H5
- tel：H5
- number：PC & H5
- 时间：PC & H5
  - time
  - date
  - datetime
  - month
  - week
- color
- range
- search

##### 表单属性

- autocomplete
- autofocus
- multiple
- required

#### 链接属性

##### link 标签

用于建立文档与外部资源之间的关系。这些资源可以是样式表，网站图标，字体文件，或者其他网页所需的资源等等

- href：指明外部资源文件的路径，即告诉浏览器外部资源的位置
- hreflang：说明外部资源使用的语言
- media：说明外部资源用于哪种设备
- ref：必填，表明当前文档和外部资源的关系。[MDN 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel)
- sizes：主要用于 link 中的网页图标大小的控制，只对 `ref="icon"` 生效
- type：说明外部资源的 MIME 类型，如 `text/css`，`image/x-icon`

```
// 引入样式表
<link rel="stylesheet" href="styles.css" type="text/css" />


// 设定网站标题
<link rel="icon" href="favicon.ico" type="image/x-icon" />

// 引入字体文件
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto" />

```

##### base

base 标签，位于 head 标签中，base 标签的 target 属性可以控制整个网页中 a 链接打开新窗口，也可以控制 a 链接跳转的页面

```
 <head>
    <!-- 这里 target 的值表示打开新的浏览器标签页 -->
    <base href='https://www.baidu.com/' target='_blank'>
</head>
<body>
  <!-- 这里 a 标签必须要有 href 属性 -->
    <a href>aaa</a>
</body>
```

#### 其他

##### script 新属性

- defer 属性：异步下载，下载完成且 html 解析完成之后开始执行

- async 属性：异步下载，下载完成之后就会开始执行，此时 html 可能解析完了，也可能还没有解析完成

### websocket 通信

[参考文档](https://juejin.cn/post/7020964728386093093?searchId=20240716065825551B9980046A0040345D)

[阮一峰 WebSocket 教程](https://www.ruanyifeng.com/blog/2017/05/websocket.html)

websocket 是一种全双工通信协议（本质上是一种`计算机网络应用层的协议`，用来弥补 http 协议在持久通信能力上的不足），它允许在 Web 应用程序和服务器之间建立持久性连接，从而实现实时数据交换。websocket 使得客户端和服务器之间只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输。与传统的 HTTP 请求响应模式不同，websocket 允许双方同时发送和接收数据，使得在客户端和服务器之间进行实时通信变得更加高效和简单。

- 全双工通信：WebSocket 允许客户端和服务器之间的双向通信，而不像传统的 HTTP 请求-响应模式那样需要先发出请求再等待响应。
- 持久连接：一旦建立 WebSocket 连接，它将保持打开状态，允许随时发送数据，而不需要在每次通信时都重新建立连接。
- 低延迟：由于 WebSocket 建立的是长期持久的连接，因此通信过程中的延迟较低，适合需要实时性要求高的应用场景，如在线游戏、实时聊天等。
- 轻量级：WebSocket 协议相对于传统的 HTTP 请求-响应协议来说，通信时的开销较小，因为在连接建立后只需少量的额外开销。
- 跨域支持：WebSocket 支持跨域通信，但需要在服务器端进行相应的配置。
- 默认端口：80 和 443，握手阶段采用 HTTP 协议
- 可以发送文本，也可以发送二进制数据
- 协议标识符是`ws`，如果加密，则为 `wss`。例如：`ws://example.com:80/some/path`

应用场景：

- 在线游戏
- 聊天应用
- 股票市场行情

```
// 简单应用示例

    <script>
      var ws = new WebSocket("wss://echo.websocket.org");

      ws.open = function (evt) {
        console.log("connection open...");
        ws.send("Hello WebSocket!!!");
      };

      ws.onmessage = function (evt) {
        console.log("received message：", evt.data);
        ws.close();
      };

      ws.onclose = function (evt) {
        console.log("Connection closed.");
      };
    </script>
```

### 拖拽

[参考文档](https://juejin.cn/post/6844903513491767303?searchId=202407162014430F71706C5D1360BA5B96)

总体流程：选中 -> 拖动 -> 释放

#### 选中

- 给元素设置 `draggable` 属性为 `true`
- 文本、图片、链接是默认可拖放的，他们的 draggable 属性被默认设置为了 true
  - 文本只有被选中的情况下才可以拖放。如果显式的设置 draggable 属性为 true，那么按住鼠标左键之后也可以拖动
  - 图片和链接按住鼠标左键选中就可以拖放
- `draggable` 属性的值
  - true：可以拖动
  - false：禁止拖动
  - auto：跟随浏览器定义是否可以拖动

#### 拖动

拖动开始 -> 拖动过程中 -> 拖动结束

| 针对对象     | 事件名称  | 说明                                             |
| ------------ | --------- | ------------------------------------------------ |
| 被拖动的元素 | dragstart | 在元素开始被拖拽时触发                           |
| 被拖动的元素 | drag      | 在元素被拖拽过程中反复触发                       |
| 被拖动的元素 | dragend   | 在拖动操作完成时触发                             |
| 目的地对象   | dragenter | 当被拖动元素进入目的地元素所占据的屏幕空间时触发 |
| 目的地对象   | dragover  | 当被拖动元素在目标元素内时触发                   |
| 目的地对象   | dragleave | 当被拖动元素没有放下就离开目的地元素时触发       |

dragenter 和 dragover 事件的默认行为是拒绝接受任何被拖放的元素。因此，我们必须阻止浏览器这种默认行为。e.preventDefault();

#### 释放

目的地元素 - drop 事件 - 当被拖放元素在目的地元素里放下时触发，一般需要取消浏览器的默认行为

### 本地存储

两个接口：

- localStorage：域内安全，永久保存。即客户端或浏览器中来自同一域名的所有页面都可访问 localStorage 数据且数据除了删除否则永久保存，但客户端或浏览器之间的数据相互独立。
- sessionStorage：会话控制、短期保存。会话概念与服务器端的 session 概念相似，短期保存指窗口或浏览器或客户端关闭后自动消除数据。

四个方法：

- setItem：存储数据
- removeItem：删除数据
- getItem：获取数据
- clear：清空数据

## 4、对 HTML 语义化的理解

- 根据内容选择合适的标签
- 方便浏览器爬虫更好的识别内容
- 有利于代码的可读性，开发者能够清晰的看出网页的结构
- 有利于无障碍阅读
