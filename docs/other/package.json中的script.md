# Package.json 配置

[官方英文文档链接](https://docs.npmjs.com/cli/v9/using-npm/scripts)

## Scripts 属性

### 描述
`package.json` 文件的 `scripts` 属性支持许多内置脚本以及其预设的生命周期事件和任意脚本。这些都可以通过运行 `npm run-script <stage>` 或者简写的 `npm run <stage>` 命令来执行。名称匹配的前置命令和后置命令也会运行（例如 `premyscript`, `myscript`, `postmyscript`）。来自依赖项的脚本可以通过 `npm explore <pkg> -- npm run <stage>` 来运行。

### Pre & Post Scripts
要为 `package.json` 的 `scripts` 中定义的任何脚本创建 `pre`，`post` 脚本，只需创建另一个匹配名称的脚本，并将 `pre` 或 `post` 添加到它们的开头。

```json
{
  "scripts": {
    "precompress": "{{ executes BEFORE the `compress` script }}",
    "compress": "{{ run command to compress files }}",
    "postcompress": "{{ executes AFTER `compress` script }}"
  }
}
```

在这个示例中，`npm run compress` 将按照所述执行这些脚本。

### Life Cycle Scripts 生命周期脚本
有一些特殊的生命周期脚本只发生在某些情况下。这些脚本是在 `pre <event>`，`post <event>`，`<event>` 脚本之外发生的。

`prepare`,`prepublish`,`prepublishOnly`,`prepack`,`postpack`,`dependencies`。

**补充知识 - tarball**
npm 文档中提到的 tarball 是指一个已经压缩成 tar 格式的文件，其中包含了一个软件包的所有文件和目录。通常情况下，tarball 文件的扩展名为 .tgz 或 .tar.gz。

在 npm 中，每一个注册的软件包都有一个对应的 tarball 文件。当用户在命令行中使用 npm install 命令安装软件包时，npm 会首先下载该软件包的 tarball 文件，然后解压该文件并将其安装到本地文件系统中。

tarball 文件是 npm 包分发的标准方式之一，同时也可以在其它场景中使用，比如在不同计算机之间传递软件包或者备份软件包。

**prepare**（npm@4.0.0 引入）
- 在打包之前运行，即在 `npm publish` 和 `npm pack` 期间
- 在没有任何参数的本地 `npm install` 时运行
- 在 `republish` 之后，`prepublishOnly` 之前运行
- 注意：如果通过 git 安装的包包含一个 `prepare` 脚本，那么在打包和安装该包之前，将安装其`dependencies`和`devDependencies`,并运行其 `prepare` 脚本
- 从 npm@7 开始，这些脚本将在后台运行

**prepublish**（被废弃的）
- 不在 `npm publish`期间运行，但在 `npm ci` 和 `npm install` 期间运行。更多信息见下文。

**prepublishOnly**
- 只有进行`npm publish`的时候才会执行

即在打包并准备将模块发布到 registry 之前。

简单来说，`prepublishOnly` 可以用于在模块被打包之前执行一些必要的操作，例如运行单元测试、构建资源、生成文档等等，以确保最终发布的模块是可靠且高质量的。注意，该钩子只会在执行 `npm publish` 命令时触发，而不会在运行 `npm install` 时执行。

因此，如果你需要在发布模块之前进行一些操作或准备工作，你可以通过在 `package.json` 文件中定义 `prepublishOnly` 脚本来实现。

**prepack**
- 在打包 tarball 之前运行（在 `npm pack` ，`npm publish`，或安装 git 依赖时）
- 注意：`npm run pack` 和 `npm pack` 不同，`npm run pack` 是一个任意用户定义的脚本名，`npm pack` 是一个 CLI 定义的命令

在 npm 中，prepack 是一个钩子，它是在打包 tarball 之前执行的脚本。当使用 `npm pack` 命令打包模块时，prepack 脚本将被自动调用，此外，在使用 `npm publish` 命令发布模块以及安装git依赖项时，prepack 也会被自动调用。

prepack 可以用来执行一些需要在打包之前进行的操作，例如构建你的源代码、清除不必要的文件、运行测试等等。通过使用 prepack 脚本，你可以确保在打包 tarball 之前，你的模块已经准备就绪，并且没有遗漏的问题。

需要注意的是，`npm run pack` 和 `npm pack` 是两个不同的命令，npm run pack 是你在 package.json 中自定义的脚本命令，而 npm pack 是 npm CLI 提供的命令。因此，当你在使用 npm pack 命令打包你的模块时，prepack 脚本会被自动调用，但是当你运行 npm run pack 时，prepack 不会被自动调用，除非你在这个脚本中手动调用它。

**postpack**
- 在 tarball 生成之后但在移动到其最终目的地之前运行（如果有的话，发布并不会在本地保存 tarball）。

在使用 npm pack 命令将包打包成 tarball 后执行，但是在包被发布到 npm 注册表之前执行，即在 tarball 生成之后执行。

postpack 的目的是在包发布之前执行任何附加任务任务或自改，这可能包括修改包的元数据、运行测试或生成应包含在包中的其他文件等任务。

需要注意的是，只有在使用 npm publish 命令发布包时，postpack 脚本才会执行。如果本地安装包使用 npm install 命令，则不会执行 postpack 脚本。另外，由于 npm publish 命令不会在本地保存 tarball，因此 postpack 脚本在生成 tarball 后执行，但在 tarball 最终目的地移动之前执行（如果有的话）。

**dependencies**
- 它会在对 node_modules 目录进行修改操作之后（如果有更改发生）运行
- 不会在全局模式下运行

该脚本用于执行需要依赖于 node_modules 目录中安装的依赖项的任务，例如编译、构建或测试等。需要注意的是，dependencies 脚本不会在全局模式下运行，因为在全局模式下，依赖项不会被安装在 node_modules 目录中，而是安装在全局位置。此外，该脚本仅在 node_modules 目录发生更改时才会执行，如果没有更改发生，它将不会运行。

#### Prepare and Prepublish

在 npm 4.0.0 及以上的版本中，一个新的脚本事件 prepare 被引入来代替原来的 prepublish 脚本事件。prepare 事件会在执行 npm install 和 npm publish 命令时都被触发，而 prepublish 事件则仅在 npm publish 命令执行时触发。

在 package.json 文件中，可以使用 "scripts" 字段来定义 prepare 和 prepublish 脚本。prepare 脚本会在执行 npm install 和 npm publish 命令之前运行，而 prepublish 脚本仅在执行 npm publish 命令之前运行。

prepare 脚本可以用于执行一些准备工作，例如构建或编译代码，或运行一些必要的测试。而 prepublish 脚本则通常用于执行一些构建和打包操作，以便为发布做好准备。

需要注意的是，从 npm 4.0.0 开始，npm 不再支持 prepublish 脚本，而是推荐使用 prepare 脚本来代替。同时，为了保持向后兼容性，npm 引入了一个新的脚本事件 prepublishOnly，用于仅在执行 npm publish 命令时运行脚本。

**废弃说明：prepublish**

自从 npm@1.1.71 版本以来，npm CLI 已经在 npm publish 和 npm install 命令中同时运行 prepublish 脚本，因为这是一种方便的方式来准备一个包供使用。但是在实践中，这种行为经常会让人感到困惑。因此，在 npm@4.0.0 版本中引入了一个新事件 prepare，以保留这种行为，同时添加了一个名为 prepublishOnly 的新事件作为过渡策略，使用户可以避免现有的 npm 版本中令人困惑的行为，并且仅在 npm publish 时运行。

请参考 https://github.com/npm/npm/issues/10074，了解更详细的理由和更多阅读材料，以了解此更改的背景。

**示例**
如果您需要在包被使用之前执行一些操作，以一种不依赖目标系统的操作系统或架构的方式，可以使用 prepublish 脚本。这些任务包括：

- 将 CoffeeScript 源代码编译为 JavaScript。
- 创建 JavaScript 源代码的缩小版本。
- 获取您的包将使用的远程资源。
  
在 prepublish 时执行这些操作的优点在于，它们可以在一个地方完成一次，从而降低了复杂性和变异性。此外，这意味着：

- 您可以将 coffee-script 作为 devDependency 依赖项，从而用户不需要安装它。
- 您不需要在您的包中包含缩小器，为用户减少包大小。
- 您不需要依赖于用户在目标机器上拥有 curl 或 wget 或其他系统工具。

#### Dependencies
每当 npm 命令导致更改 node_modules目录时，都会运行 dependencies 脚本。它在应用已更改并更新 package.json 和 package-lock.json 文件之后运行。

### Life Cycle Operation Order 生命周期操作顺序
npm 脚本的生命周期事件分为三类：安装、预处理、后处理。

安装事件发生在模块安装时，预处理事件发生在模块构建前，后处理事件发生在模块构建之后。

[npm cache add](https://docs.npmjs.com/cli/v9/commands/npm-cache)

- prepare


[npm ci](https://docs.npmjs.com/cli/v9/commands/npm-ci)

- preinstall
- install
- postinstall
- prepublish
- preprepare
- prepare
- postprepare

这些都是在模块安装到 node_modules 之后按顺序运行的，中间没有发生任何内部操作。