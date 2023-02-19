# 如果设计自己的通用组件库？

**项目名称：vue-ts-ailemente**

基础组件 + 数据组件 + 表单组件+ 通知组件

## 技术栈

vite + TypeScript + Sass + ESLint

## 环境搭建

**Tips : 安装第三方包的时候，用npm，但是到了初始化的时候，用npx，？**

**npm 是把包安装到本地的node_modules里，比如我们安装了husky，但是并没有全局安装，直接执行husky会提示找不到，npx就是可以直接使用mode_moudulesn内部安装命令的工具**

* npm init vite@latest
* project-name: ailemente
* cd ailemente
* npm install
* npm run dev
* npm install -D husky `配置Git的钩子函数 - 安装husky`
* npx husky install `初始化husky - 根目录下生成 .husky 文件夹`
* npx husky add .husky/commit-msg "node scripts/verifyCommit.js" `npx husky add 命令 新增 commit msg 钩子`
    - windows系统中，执行上面的命令，可能会识别不了，需要分开执行
    - 第一步：`npx husky sdd .husky/commit-msg`
    - 第二部：`在.husky文件下的commit-msg文件中，写入 node scripts/verifyCommit.js`
* **package.json中，配置githooks**

```

    "scripts": {
        "gitHooks": {
            "commit-msg": "node scripts/verifyCommit.js"
        }

    }
 
```

* `.git/COMMIT_EDITMSG`保存git提交时的描述信息的文件
* verifyCommit.js

```

    1、读取.git/COMMIT_EDITMSG文件中的commit提交的信息
    2、正则校验提交信息的格式等
    3、校验不通过，终止代码的提交
 
```

* git钩子
    - commit-msg：提交代码的时候执行的 -- 校验提交的信息
    - pre-commit：提交代码之前执行的 -- ESLint检测代码格式
* 添加代码格式校验
    - `npx husky add .husky/pre-commit "npm run lint"`
    - 以上命令同样可以拆解
    - package.json文件中配置命令`lint: eslint --fix --ext .ts, .vue src`
    - Vue3不要求只有一个根元素，在eslint的rules中配置`"vue/no-multiple-template-root": "off"`，关闭一个根元素的校验
    - vue3.2中不需要显式的引入`definProps`等，需要在eslint配置中加入：
        

```

        "env": {
            "vue/setup-compiler-macros": true
        }, 
        function addCount() {
            count.value++; 
        }
```

## 布局组件

### 样式的处理

scss 的mixin：

```

$namespace: 'el'; 
@mixin b($block) {

    $B: $namespace + '-' + $block !global; // 通过传进来的block生成新的变量$B，拼接上了 饿了
    .#{$B} {
        @content;

    }

}

// 添加后缀啥的
@mixin when($state) {

    @at-root {
        &.#{$state-prefix + $state} {
            @content;
        }

    }

}

```

```

@import '../styles/mixin.scss'; 
@include b(container) {

    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
    @include when(vertical) {
        flex-direction: column;

    }

}

```

### 组件注册

使用插件机制对外暴露安装的接口

```js
import {
    App
} from 'vue'
import ElContainer from './Container.vue'
import ElHeader from './Header.vue'
import ElFooter from './Footer.vue'
import ElAside from './Aside.vue'
import ElMain from './Main.vue'

export default {
    install(app: App) {

        app.component(ElContainer.name, ElContainer)
        app.component(ElHeader.name, ElHeader)
        app.component(ElFooter.name, ElFooter)
        app.component(ElAside.name, ElAside)
        app.component(ElMain.name, ElMain)

    }
}
```

# 单元测试

写好测试的函数，可以 `node` 命令运行函数来测试；在提交代码之前，执行测试函数。

-- TDD开发 -  测试驱动开发

## Jest

### 安装

```
npm install -D jest@26 vue-jest@next @vue/test-utils@next
npm install -D babel-jest@26 @babel/core @babel/preset-env
npm install -D ts-jest@26 @babel/preset-typescript @types/jest

```

* vue-jest 和 @vue/test-utils 是测试 Vue 组件必备的库
* babel转码的库
* Jest 适配 TypeScript 的库

### 配置

* .babel.config.js文件配置 -- 为了让babel解析到node和typescipt环境中

    

```

    module.exports = {
        presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }], 
            '@babel/preset-typescript', 
        ], 

    }
 
```

* 新建`jest.config.js`文件 -- 配置jest的测试行为。
* 不同格式的文件需要使用不同的命令来配置。
    - .vue：vue-test
    - .js .jsx: babel-test
    - .ts: ts-test
* 匹配文件名是`xx.spec.js`。Jest 只会执行.spec.js 结尾的文件
* package.json文件中：scripts中 增加 `"test": "jest"`

### button组件

* 配置vue全局变量

```

    const app = createApp(App);

    app.config.globalProperties.$AILEMENT = {
        size: 'large'

    }
 
```

* vue3获取当前的实例

```
    getCurrentInstance获取当前的实例 ; 对应的TS类型 - ComponnetIternalInstance
    import { getCurrentInstance } from 'vue';

    export function useGlobalConfig() {
        const instance:ComponentInternalInstance|null = getCurrentInstance();
        if (!instance) {
            console.log('useGlobalConfig必须得在setup里面整');
            return;
        }

        return instance.appContext.config.globalProperties.$AILEMENTE || {}

    }
 
```

* jest.config.js文件增加配置
    - collectCoverage: true // 表示需要收集代码测试覆盖率
    - 以上配置之后，执行npm run test，根目录下会有coverage目录，index.html文件 打开之后会有报告

* husky/pre-commit文件
    - 增加npm run test命令，每次提交代码之前，都会先执行测试，测试通过才可以提交代码



# 自定义渲染器

渲染器是围绕虚拟DOM存在的。

## 渲染器的创建

runtime-core模块暴露的接口：createElement　createText insert    remote  setText patchProps等

runtime-dom中传入以上方法的具体实现（不同平台的不同实现）

## 渲染器的实现

渲染到小程序平台：vue3-miniapp
渲染到canvas：vue3-canvas

**以canvas渲染器为例**
将canvas维护成一个对象，每次操作的时候直接把canvas重绘一下就可以

```js
import {
    createRender
} from '@vue/runtime-core'

const {
    createApp: originCa
} = createRender({

    insert: (child, parent, anchor) => {

    },
    createElement(type, isSVG, isCustom) {

    },
    setElementText(node, text) {

    },
    patchProp(el, key, prev, next) {

    }

})
```

每次直接更改对应的虚拟DOM，然后重绘。

**自定义渲染器的原理：就是把所有的增删改查操作暴露出去，使用的时候不需要知道内部的实现细节，我们只需要针对每个平台使用不同的API即可。**

适配器设计模式的一个实现。

# vue2 VS vue3

https://github.com/shengxinjing/vue3-vs-vue2.git

# 响应式

把普通的JavaScript对象封装成响应式对象，拦截数据的获取和修改操作。实现依赖数据的自动化更新。

一个简单的响应式模型，我们可以通过reactive或者ref函数，把数据包构成响应式对象，并且通过effect函数注册回调函数，然后在数据修改之后，响应式的通知effect去执行回调函即可。

## track

track函数：targetMap去存储依赖关系。map的key是我们要代理的target对象呢，值还是一个depsMap。存储着每一个ky依赖的函数，每一个key都可以依赖多个effect。

依赖地图：
targetMap = {

    target: {
        key1: [回调函数1， 回调函数2], 
        key2: [回调函数3， 回调函数4]
    }, 
    target1: {
        key3: [回调函数5 ]
    }

}

```js
// track.js
const targetMap = new WeakMap()

export function track(target, type, key) {

  // console.log( `触发 track -> target: ${target} type:${type} key:${key}` )

  // 1. 先基于 target 找到对应的 dep
  // 如果是第一次的话，那么就需要初始化
  // {
  //   target1: {//depsmap
  //     key:[effect1, effect2]
  //   }
  // }
  let depsMap = targetMap.get(target)
  if (!depsMap) {

    // 初始化 depsMap 的逻辑
    // depsMap = new Map()
    // targetMap.set(target, depsMap)
    // 上面两行可以简写成下面的
    targetMap.set(target, (depsMap = new Map()))

  }
  let deps = depsMap.get(key)
  if (!deps) {

    deps = new Set()

  }
  if (!deps.has(activeEffect) && activeEffect) {

    // 防止重复注册
    deps.add(activeEffect)

  }
  depsMap.set(key, deps)
}

```

## trigger

trigger函数的实现思路就是**从targetMap中，根据target和key找到对应的依赖函数集合deps，然后遍历deps执行依赖函数**

## effect

我们需要在effect函数中把依赖函数进行包装，并对依赖函数的执行时机进行控制（scheduler）。

依赖的收集：

    把传递进来的fn函数通过effectFn函数包裹执行，在effectFn函数内部，把函数赋值给全局变量activeEffect；然后执行fn()的时候，就会触发响应式对象的get函数，get函数内部就会把activeEffect存储到依赖地图中，完成依赖的收集。

```

export function effect(fn, options = {}) {
  // effect嵌套，通过队列管理
  const effectFn = () => {

    try {
      activeEffect = effectFn
      //fn执行的时候，内部读取响应式数据的时候，就能在get配置里读取到activeEffect
      return fn()
    } finally {
      activeEffect = null
    }

  }
  if (!options.lazy) {

    //没有配置lazy 直接执行
    effectFn()

  }
  effectFn.scheduler = options.scheduler // 调度时机 watchEffect回用到
  return effectFn
  
}

```

scheduler：手动控制函数执行的时机，方便应对一些性能优化的场景。比如：数据在一次交互中可能会被修改多次，我们不想每次修改都重新执行effect函数，而是合并最终的状态之后，最后统一修改一次。

## ref

ref也可以包裹复杂的数据结构，内部会直接调用reactive来实现。

## computed

是一个特殊的effect函数。computed可以传递一个函数或者对象，实现计算属性的读取和修改。

拦截computed的value属性，并且定制了effect的lazy和scheduler配置，computed注册的函数就不会直接执行，而是要通过scheduler函数中的_dirty属性决定是否执行。

