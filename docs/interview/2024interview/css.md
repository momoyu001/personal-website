# CSS

[参考文档 1](https://juejin.cn/post/7098689890933538853)

[参考文档 2](https://juejin.cn/post/7269794410573512758)

## CSS3 新增特性

## vw 和 vh

vw 和 vh，CSS3 的新单位，即 `view width` 可视窗口宽度和 `view height` 可视窗口高度。1 vh 相当于可视窗口高度的百分之一

## 特效

### `text-shadow`

文字阴影效果

```
text-shadow: h-shadow v-shadow blur color;
```

- h-shadow：设置水平阴影的位置（x 轴方向），必需要设置的参数；允许负值。
- v-shadow：设置垂直阴影的位置（y 轴方向），必需要设置的参数，允许负值。
- blur：阴影模糊的距离（半径大小），可选择设置的参数。
- color：阴影的颜色，可选择设置的参数。

text-shadow 属性可以向文本添加一个或多个阴影。该属性是逗号分隔的阴影列表，每个阴影有两个或三个长度值和一个可选的颜色值进行规定。省略的长度是 0。

```
.text-shadow {
  text-shadow: 10px 10px 1px #ff0000, -3px -3px 2px #ff00ff;
}
```

### `box-shadow`

可在元素周围创建阴影效果

```
box-shadow: [inset] x-offset y-offset blur-radius spread-radius color;
```

- inset：
- x-offset：必填 阴影水平偏移量，它可以是正负值。如为正值，则阴影在元素的右边；如其值为负值，则阴影在元素的左边
- y-offset：必填 阴影垂直偏移量，它可以是正负值。如为正值，则阴影在元素的底部；如其值为负值时，则阴影在元素的顶部
- blur-radius：可选 阴影模糊半径，它只能是正值。如值为 0，则阴影不具有模糊效果；它的值越大，阴影的边缘就越模糊
- spread-radius：可选 阴影扩展半径，它可以是正负值。如为正值，则扩大阴影的尺寸；如为负值，则缩小阴影的尺寸
- color：可选 阴影颜色。如不设定颜色，浏览器会取默认色，但各浏览器默认取色不一致。（经测试，在 Safari 上是半透明的，在 chrome、firefox、ie 上都是黑色的）。不推荐省略颜色值

#### 举个栗子：

- 单侧阴影：扩展半径抵消模糊半径，单侧不偏移

```
box-shadow: 0px 10px 3px -3px #ff0000;
```

- 多彩云朵：多个阴影叠加形成，写在最前面的阴影会覆盖后面写的阴影

```
<div class="box">
    <div class="cloud"></div>
</div>

// css
<style>
.box {
  width: 200px;
  height: 200px;
  margin: 60px;
  float: left;
  color: white;
  background-color: #655;
}
.cloud {
  width: 60px;
  height: 50px;
  margin: 40px;
  background-color: currentColor;
  border-radius: 50%;
  box-shadow:
    100px 0px 0px -10px lightcoral,
    40px 0px lightcyan,
    70px 15px lightsalmon,
    30px 20px 0px -10px lightseagreen,
    70px -15px lightskyblue,
    30px -30px lightgoldenrodyellow;
}
</style>

```

- 多边框：阴影重叠

```
<div class="box multi-border">多边框</div>

<style>
.box {
  width: 200px;
  height: 200px;
  margin: 60px;
  float: left;
  color: white;
  background-color: #655;
}
.multi-border {
  box-shadow:
    0px 0px 0px 4px lightsalmon,
    0px 0px 0px 8px lightblue,
    0px 0px 0px 12px lightseagreen,
    0px 0px 0px 16px lightcoral,
    0px 0px 0px 20px lightskyblue;
}
</style>
```

- 新拟物设计

```
<div class="parent">
    <div class="object"></div>
</div>

// css
<style>
.parent {
  width: 300px;
  height: 300px;
  padding: 100px;
  background: #e0e0e0;
}
.object {
  width: 200px;
  height: 200px;
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow:
    20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
}
</style>

```

## 线性渐变

gradient

## 旋转过渡

### transform

### transition

## 动画

animation

## 圆角

border-radius

## Flex 布局

[阮一峰 FLEX 布局](https://ruanyifeng.com/blog/2015/07/flex-grammar.html)

## Grid 布局

[阮一峰 Grid 布局](https://blog.csdn.net/weixin_43334673/article/details/108879115)

## 盒模型

- IE 盒模型：`box-sizing: border-box`;
- 标准盒模型：`box-sizeing: content-box`;

## Sass 和 Less

### 相同点

都是 css 预处理器，是 CSS 上的一种抽象层。通过一种特殊的语法编译成了 CSS。增加了 CSS 代码的复用性。

- 层级
- mixin
- 变量
- 循环
- 函数

### 区别

- 编译环境不一样
  - Sass 在服务端处理，以前是 Ruby，现在是 Dart-Sass 或 Node-Sass
  - Less 是需要引入 less.js 来处理 Less 代码输出 CSS 到浏览器，也可以在开发服务器将 Less 语法编译成 css 文件，输出 CSS 文件到生产包目录
- 变量符不一样
  - Less 是 `@`
  - Sass 是 `$`
- 对条件语句的支持
  - Sass 支持条件语句，可以使用 `if {} else {}, for {}`
  - Less 不支持

## link 和 import

## BFC

[参考文档](https://juejin.cn/post/7296297545969139723?searchId=2024072022595706FCA9CE7D9616187F13)

块级格式化上下文，一个独立的区域，在 BFC 布局里面的元素不受外部影响。

如何创建 BFC：

- 设置浮动：float 有值且不为 auto

### 作用：

- 清除浮动：BFC 容器可以用来清除浮动元素的影响，确保父元素包含浮动子元素的高度，从而避免出现高度塌陷问题。这是 BFC 最常见的应用之一，特别是在创建多列布局或类似网格的布局时非常有用。
- 防止外边距坍塌：在同一个 BFC 容器内的相邻块级元素的外边距不会发生重叠，这有助于更精确地控制元素之间的间距。这对于垂直外边距塌陷问题的解决非常有帮助。

### 如何创建 BFC

- 设置浮动：float 有值且不为 auto
- 设置绝对定位：但不为 relative
- 设置 overflow：hidden || auto || overly || scroll
- 设置 display：inline-block、table-cell、table-caption、flex 等
