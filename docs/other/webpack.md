# Webpack

——最流行的前端构建工具

**webpack是一个打包模块化的工具，可以通过loader转换文件，通过plugin扩展功能**



**核心概念**

- entry: 一个可执行模块或者库的入口。
- output：编译后的代码输出位置

- chunk: 多个文件组成的一个代码块（数据块）。可以将可执行的模块和其他模块组合成一个chunk，这是打包。
- mode：指定环境`production`，`development`，`none`，默认值为`production`

- loader: 文件转换器。例如es6+转换为es5，less转换为css。最终都转换为js文件。`webpack开箱即用的，只支持JS和JSON两种文件类型`

  - \- 常见loaders：

    -   babel-loader：转换ES6、ES7等JS新特性语法

    -   css-loader：支持CSS文件的加载和解析

    -   less-loader：将less文件转换成CSS

    -   ts-loader：将TS转换成JS

    -   file-loader：进行图片、字体等的打包

    -   raw-loader：将文件以字符串的形式导入

    -   thread-loader：多线程打包JS和CSS

  - 在module选项中的rules数组中配置

- plugin：扩展了webpack的功能，在webpack构建的生命周期节点上加入扩展hook，添加功能。
  - 在plugins选项中配置
- webpack运行期间会广播很多事件，plugin可以去监听一些事件，通过webpack的api改变结果。

- bundle：捆绑好的数据块，如果说chunk是各种数据片段，那么bundle就是一堆chunk组成的”集大成者“。它经历了`加载和编译`的过程，是源文件的最终版本。`chunk是webpack处理过程中的一组模块，bundle是一个或多个chunk组成的集合`。



**构建流程**

​	当webpack处理应用程序时，它会递归的构建一个依赖关系，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或者多个bundle。



- 1、初始化参数：解析webpack配置，合并shell传入和webpack.config.js文件配置的参数，形成最后的配置结果。

- 2、开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的事件节点，做出响应的反应，执行对象的run方法开始执行编译。

- 3、确定入口：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，一直递归下去。

- 4、编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口文件依赖的文件都经过了编译的处理。

- 5、完成模块的编译并输出：递归完成之后 ，得到每一个文件结果，包含每一个模块以及它们之间的依赖关系，根据entery配置生成的代码块chunk。

- 6、输出完成：输出所有的chunk到文件系统。



**loader和plugin的区别**

- 作用：
  - loader让webpack由加载和解析js的能力。
  - plugin可以扩展webpack的功能。在webpack运行周期中会广播很多事件，plugin可以监听一些事件，通过webpack的api改变结果。

- 用法：
  - loader在module.rule中配置。类型为数组，每一项都是Object
  - plugin是单独配置的，类型为数组，每一项都是plugin实例，参数通过构造函数传入

- 实现loader和plugin:
  - loader：遵循`单一原则`，每一个loader只做一种”转义“工作。每个loader拿到的是源文件内容，可以通过返回值的方式将处理后的内容输出，也可以调用`this.callback()`方法，将内容返回给webpack。还可以通过`this.async()`生成一个callback函数，再用这个callback将处理后的内容输出出去。
  - plugin：实现上很灵活。监听webpack运行周期中广播的事件，在合适的时机通过webpack提供的API改变输出的结果。



**利用webpack优化前端性能**

指：优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。