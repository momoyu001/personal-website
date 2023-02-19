# 运行时

**首次渲染 + 更新后的渲染** -- 前端框架需要处理的两个最核心的流程。

## 首次渲染

createApp - 项目初始化渲染的入口。

app.mount() - mount的参数：Element、ShadowRoot、string --> normalizeContainer --> 将传递的参数统一变为浏览器的DOM元素。

ensureRender函数，内部通过createRenderer函数，创建了一个浏览器的渲染器，并且缓存了渲染器的renderer。（使用闭包做缓存）

createRenderer函数的参数：rendererOptions -- 浏览器里面标签的增删改查API。通过调用baseCreateRenderer创建的。

baseCreateRenderer 是学习Vue源码最复杂的一个函数。

nodeOps传递进来的 -- 平台上所有的insert、remove函数；vue更新、渲染的函数。

* createApp -- 就是createAppAPI(render, hudrate)
    - createAppAPI方法：
        - 内部创建了app对象
        - app上注册了use、component、mount等方法
        - mount内部执行的是传递进来的render函数
        - container就是我们app.mount中传递的DOM元素，对DOM元素进行处理之后，执行patch函数实现整个应用的加载

    

    - render方法：内部判断了container容器上有没有_vnode属性，有则执行unmount方法，卸载掉老的虚拟dom，没有的话就执行patch方法，然后把vnode信息存储在contianer._vnode上。

## patch函数

patch函数传递的是container._vnode，也就是上一次渲染缓存的vnode、本次渲染组件的vnode以及container。

```

// n1 上次渲染的虚拟DOM
// n2 下次要渲染的虚拟DOM
const patch: patchFn = (n1, n2, container) {}

```

* patch的规则：
    - n1 n2 节点类型不同，直接unmount之前的节点
    - n1 n2 节点类型相同，根据具体的类型执行不同的patch函数
      - processText
      - processFragment
      - processElement
      - processComponent --> 首次渲染时的App是一个组件，走的是processComponent方法
      - 。。。等等

## processComponent方法

* mountComponent
  + 对组件的类型进行一系列的判断
  + setupComponent函数
    - createComponentInstance --- 创建组件实例
    - setupComponent --- 执行setup函数（就是我们写的script setup）
      - 在这个函数内部从component中获取了setup属性
    - setupRenderEffect --- 监听副作用（reactivity -- 响应式effect）
  + setupRenderEffect函数 -- 为了后续数据修改注册的函数
    - 组件首次加载会调用patch函数去初始化子组件，setupRenderEffect函数本身就是在patch函数内部执行的，所以这里就会递归整个虚拟DOM树，然后触发生命周期mounted，完成这个组件的初始化。。首次更新结束之后，setupRenderEffect函数不仅实现了组件的递归渲染，还注册了组件的更新机制。
* updateComponent

Vue通过createApp创建应用，并且执行返回的mount方法实现在浏览器的中的挂在，在createApp中，通过传递浏览器平台的操作方法nodeOps创建了浏览器的渲染器renderer。

首次执行Vue项目，通过patch实现组件的渲染，最终通过setupComponent执行组件的setup函数，setupRenderEffect中使用响应式的effect函数监听函数数据变化。

[weiyuyi -- 迷你版vue](https://github.com/shengxinjing/weiyouyi/blob/main/src/runtime-core/renderer.js)

# 虚拟DOM

## vue虚拟DOM执行流程

template会被解析成JavaScript函数，这个函数会返回虚拟DOM

```

function render() {

    return h('div', { id: 'app' }, children: [
        h('p', {}, 'hello world'),
        h(Rate, { value: 4 })
    ])

}

```

## DOM的创建

**createVNode**函数创建虚拟DOM。

* mount函数的核心逻辑：
    - setupComponent执行我们写的script setup函数
    - setupRenderEffect监听组件的数据变化

给组件注册了update方法，这个方法用effect包裹之后，当组件内的ref、reactive包裹的响应式数据变化时就会执行这个update方法，触发组件内部的更新机制。

effect函数，负责注册组件，这个函数也是Vue组件更新的入口函数。

## patch函数

数据更新之后，就会执行patch函数。在patch函数中，会针对不同的组件类型执行不同的函数。

* updateComponent
  + 由于更新之后不是首次渲染了，patch函数内部会执行updateComponent（首次渲染 执行mountComponent）
  + shouldUpdateComponent会判断组件是否需要更新
  + 实际执行的是 instance.update
  + 组件的子元素是由HTML标签和组件构成，组件内部的递归处理最终也是对HTML标签的处理，所以，最后组件的更新都会进入到processElement内部的patchElement函数中。

## patchElement

* 通过patchFlag可以做到按需更新（性能的优化）
    - 如果标记了FULL_PROPS，就直接调用patchProps
    - 如果标签了CLASS，说明节点只有class属性是动态的，其他style等属性都不需要进行判断和DOM操作

做的两件事
* 更新节点自己的属性：patchFlag按需更新
* 更新子元素：patchChildren执行子元素的更新

## 子元素的更新

由patchChildren函数负责，难度最高的一个函数。

**实现思路：**

子元素分为了数组、文本、空，三种状态

* 如果新的子元素是空，老的子元素不为空，直接卸载unmount即可
* 如果新的子元素不为空，老的子元素是空，直接加载即可
* 如果新的子元素是文本
  + 老的子元素如果是数组，就全部unmount
  + 老的子元素是文本，就执行hostSetElementText
* 如果新的子元素是数组，比如用v-for渲染出来的列表，老的子元素如果是空的或者文本，直接unmount后，渲染新的数组
* 新的子元素是数组，老的子元素也是数组
  + 需要判断出可以服用的DOM元素。如果一个虚拟DOM没有改动或者属性变了，不需要完全销毁重建，而是更新一下属性 ---> **patchKeyedChildren函数**
  + patchKeyedChildren做的就是尽可能高效的把老的子元素更新成新的子元素

## patchKeyedChildren

双端对比算法比较新老子节点的差异，尽可能少的减少更新次数。

最长递增子序列算法来实现，相比react的虚拟DOM diff，新增了双端的预先判断 + 最长递增子序列算法来实现。

## 位运算

使用位运算来实现Vue中的按需更新，让静态节点可以越过虚拟DOM的计算逻辑。

* 通过虚拟DOM节点的patchFlag属性判断是否需要更新节点。使用的就是 **&** （按位与） 操作符来判断操作的类型。
  + patchFlag & PatchFlags. CLASS 判断当前元素的class属性是否需要计算diff
  + shape & ShapeFlags. ELEMENT 判断当前虚拟DOM是HTML组件还是Component组件。
  
* 在JavaScript中，我们可以很方便的使用`toString(2)`的方式，把十进制数据转换为二进制数据

```

(12).toString(2) // 1100

1 << 2 // 1左移两位，变成 100, 转换为十进制就是 4

```

* 两个二进制的与运算`&`：只有两个位置都是1的时候，结果才为1，其余结果都是0
* 两个二进制的或运算`|`：只有两个位置都是0的时候，结果才为0，其余结果都为1
* 左移 `<<` ，右移 `>>`操作符，实现乘以2和除以2的效果
* 在二进制上的计算，性能通常会比字符串和数字的要好

```js

    var isPowerOfTwo = function(n) {
        if(n === 1) return true
        while( n > 2 ){
            n = n / 2
            if(n % 2 !== 0) return false
        }
        return n===2
    };

    var isPowerOfTwo1 = function(n) {
        return n > 0 && (n & n - 1) === 0; 
    }

    let num = 1209902300798019300;

    console.time('2的幂次方');
    isPowerOfTwo(num);
    console.timeEnd('2的幂次方');

    console.time('2的幂次方');
    isPowerOfTwo1(num);
    console.timeEnd('2的幂次方');

```

* diff算法中使用位运算
  + Vue中的动态属性：文本、class、style、props等，使用二进制中的一个位置来表示权限。下列代码，使用左移的方式在四个二进制上标记了1，代表四种不同的权限，使用按位或的方式实现权限授予。
 

```js
    const PatchFlags = {
        TEXT: 1, // 0001
        CLASS: 1 << 1, // 0010
        STYLE: 1 << 2, // 0100
        PROPS: 1 << 3 // 1000
    }

    const flag1 = PatchFlags.TEXT | PatchFlags.STYLE; // 0101

    // 权限校验
    flag1 & PatchFlags.TEXT // 有权限 0001
    flag1 & PatchFlags.CLASS // 无权限 0000
```

## 最长递增子序列

**虚拟DOM中的diff算法**

```
给你一个整数数组nums，找到其中最长严格递增子序列的长度

子序列是由数据派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序
例如：[3, 6, 2, 7]是数组[0, 3, 1, 6, 2, 2, 7]的子序列

输入：nums = [10, 9, 2, 5, 3, 7, 101, 18]; 
输出：4
解释：最长递增子序列是 [2, 3, 7, 101]，因此长度为 4 。

```

patchKeyChildren的核心逻辑就是，在进行双端对比之后，对无法预判的序列计算出最长递增子序列之后，我们通过编译数组，对其余的元素进行patch或者move的操作，完整的实现了虚拟DOM的diff。

### 动态规划

```js
/**
 * @params { number [] } nums
 * @return { number }
 **/

const lengthOfLIS = function(nums) {

    let n = nums.length;
    if (n == 0) {
        return 0;
    }

    let dp = new Array(n).fill(1);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);

}

// 双层嵌套循环： 时间复杂度n的平方
```

### 贪心 + 二分

* 贪心：寻找递增的子序列，上升的过程，要尽可能的慢。这样才有可能让后面的元素尽可能的也递增。

```js
const lengthOfLIS = (nums) => {

    let len = nums.length;

    if (len < 1) {
        return 0;
    }

    // 定义一个空数组，存放子序列数组，初始即为数组第一个元素
    let arr = [nums[0]];

    for (let i = 0; i < len; i++) {
        // 如果nums[i]大于arr尾元素，则arr新增一个元素
        if (nums[i] > arr[arr.length - 1]) {
            arr.push(nums[i]);
        } else {
            // 否则，查找递增子序列中，第一个大于nums[i]的元素，替换它
            // 二分的方法来查找
            let left = 0;
            let right = arr.length - 1;

            while (left < right) {
                // 位运算，每右移一位，相当于除2，左移一位相当于乘2
                let mid = (left + right) >> 1;
                if (arr[mid] < nums[i]) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            arr[left] = nums[i];
        }
    }

    return arr.length;
}
```

* getSquenece -- 生成最长递增子序列
  + 1. 创建一个空数组result，存储各个元素的索引，最后根据索引值可以找到最长递增的子序列的值
  + 1. 遍历nums，将当前项current和result的最后一项对应的值进行比较
    - 当前项大于最后一项，result新增一项
    - 否则针对result数组进行二分查找，找到并替换比当前项大的那项。
  + 2. 以上完成之后，因为‘贪心’导致了结果的错乱。
    - 使用**前驱节点**的概念，需要再创建一个数组p，在步骤一往result中新增或者替换新值的时候，同时p新增一项，该项为当前项对应的前一项的索引。
    - result的结果是不准确的，但是result的最后一项是正确的，最后一项最大，根据最后一项的索引，可以查询前一项的索引，依次类推可以查询出正确的result

```js
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr: number[]): number[] {
    const p = arr.slice() //赋值一份arr
    const result = [0] // result中存放的是索引值，第一个元素就是nums的第一个索引 0
    let i, j, u, v, c
    const len = arr.length
    for (i = 0; i < len; i++) {
        const arrI = arr[i]
        if (arrI !== 0) {
            j = result[result.length - 1]
            if (arr[j] < arrI) {
                p[i] = j // 存储在result最后一个索引的值
                result.push(i)
                continue
            }
            u = 0
            v = result.length - 1
            // 二分查找，查找比arrI小的节点，更新result的值
            while (u < v) {
                c = (u + v) >> 1
                if (arr[result[c]] < arrI) {
                    u = c + 1
                } else {
                    v = c
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1]
                }
                result[u] = i
            }
        }
    }
    u = result.length
    v = result[u - 1]
    // 查找数组p 找到最终的索引
    while (u-- > 0) {
        result[u] = v
        v = p[v]
    }
    return result
}
```

* 进一步讲解：
    - 首先遍历新列表，通过key去查找在原有列表中的位置，从而得到新列表在原有列表中位置所构成的数组。现在的算法就是通过位置数组判断最小化移动次数。
    - 计算最长递增子序列：在位置数组中递增就能保证在就数组中的相对位置的有序性，从而不需要移动，因此最长递增子序列的最长，可以保证移动的次数最少。
