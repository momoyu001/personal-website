# 数据结构和算法

[toc]

# 一、数据结构

**线性表结构**：数组、链表、队列、栈

**非线性表**：二叉树、堆、图

### 线性表结构

- **一、数组**：用一组连续的空间来存储的，所以数组支持随机访问。数组为了保持内存的连续性，会导致插入、删除这两个操作比较低效，因为底层要进行大量的数据迁移来保持数据的连续性。

- **二、栈**：后进先出。新添加的或者待删除的都在`栈顶`，即栈的末尾，另一端就叫栈底。

  - push
  - pop
  - peek
  - isEmpty
  - size
  - clear

  ```js
          // 实现一个栈
          function Stack() {
              this.items = [];
  
              // push
              this.push = function(item) {
                  this.items.push(item);
              }
  
              // pop
              this.pop = function() {
                  return this.items.pop();
              }
  
              // peek  返回栈顶的元素
              this.peek = function() {
                  return this.items[this.items.length - 1];
              }
  
              // isEmpty
              this.isEmpty = function() {
                  return this.items.length === 0;
              }
  
              // clear
              this.clear = function() {
                  this.items = [];
              }
  
              // size
              this.size = function() {
                  return this.items.length;
              }
          }
  ```

  - 常见的应用：浏览器历史记录就是一个栈。两个栈来实现。

- **三、队列**：先进先出

  - enqueue
  - dequeue
  - front
  - isEmpty
  - size
  - print
  - clear

- **四、优先队列**：优先队列中元素的添加和移除是依赖`优先级`的。

  - 应用：

    - 机场登机的顺序：头等舱和商务仓的乘客的优先级要高于经济舱乘客。
    - 火车：老人、孕妇、和带小孩的乘客是享有优先检票权的。

  - 最大优先队列：把优先级的值最大的元素放置到队列的最前面。

  - 最小优先队列：把优先级的值最小的元素放置到队列的最前面（代表最高的优先级）。

    - 重写`enqueue`方法和`print`方法

    - ```js
      function enqueue(element, priority) {
      	let queueElemnt = {
      		element: element,
      		priority: priority
      	}
      	
      	if (this.isEmpty()) {
      		this.items.push(queueElemnt);
      	} else {
      		// 队列不为空
      		let addFlag = false;
      		
      		for (let i = 0; i < this.size(); i++) {
      			if (queueElement.priority < this.items[i].priority) {
      				this.items.splice(i, 0, queueElement);
                      added = true;
                      break ;
      			}
      		}
      		
      		if (!added) {
               	this.items.push(queueElement);
          	}
      	}
      }
      
      function print () {
          var strArr = [];
      js
          strArr = this.items.map(function (item) {
          	return `${item.element}->${item.priority}`;
          });
      
          console.log(strArr.toString());
      }
      ```

- **五、循环队列**：关键是确定好`队空`和`队满`的判断条件

- 例子：击鼓传花游戏。在这个游戏中，孩子们围城一个圆圈，击鼓的时候把花尽快的传递给旁边的人。某一时刻击鼓停止，这时花在谁的手里，谁就退出圆圈直到游戏结束。重复这个过程，直到只剩一个孩子（胜者）。（花在谁的手上，谁就是队首）

- **六、链表**：链表存储的有序的元素集合，但元素在内存中并不是连续放置的，它是通过指针将零散的内存块串起来的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成

  - 链表是通过指针将零散的内存块串起来的，不支持随机访问，要找特定的项，只能从特定的头开始遍历，直到找到某一项。O(n)
  - 高效的插入和删除。O(1)

- **七、单链表**

  - Node类用来表示节点

    - ```js
      function Node(element) {
      	// 当前节点的元素
      	this.element = element;
      	// 下一个节点指针
      	this.next = null;
      }
      ```

  - LinkedList类提供插入节点，删除节点等一些操作

  - 在JavaScript中，单链表的真实数据有点类似于对象，实际上是Node类生成的实例。

  - 单向链表的八种操作

    - append(element) 尾部添加元素
    - insert(position, element)：特定位置插入一个新的项
    - removeAt(position)：移除特定位置的某一项
    - remove(element)：移除一项
    - indexOf(element)：返回元素在链表中的索引，如果链表中没有该元素则返回-1
    - isEmpty()：链表为空，返回true；链表长度大于0，返回false
    - size()：返回链表包含的元素个数
    - getHead()：返回链表的第一个元素
    - toString()：
    - print()：打印所有的元素

- **八、双向链表**

  - 单链表有`next`指针指向下一个 节点。

  - 双向链表有`next`和`pre`两个指针。

  - 存储同样多的数据，双向链表要比单向链表占用更多的空间。但也会更加灵活，可以从两个方向遍历。

  - ```js
    function Node(element) {
    	this.element = element; // 当前节点的元素
    	this.next = null; // 上一个节点指针
    	this.previous = null; // 下一个节点指针
    }
    ```

  - 

- **九、循环链表**

  - 循环链表的节点和单链表的节点类型是一样的
  - 创建循环链表的时候，要让头节点的next属性指向它本身。`head.next = head`
  - 链表的尾节点指向了头节点，形成了一个循环链表



- 实现一个单向链表

  ```js
  function SingleLinkedList() {
      function Node(element) {
          this.element = element; // 元素内容
          this.next = null; // 指向的下一个节点
      }
  
      var length = 0; // 链表长度
      var head = null; // 头指针
  
      // append，尾部添加一个元素
      this.append = function(element) {
          let node = new Node(element);
          let currentNode = head;
  
          if (head == null) {
              // 头指针为空，还没有添加过元素
              head = node;
          } else {
              // 头指针不为空，从头开始查找到最后一个，然后添加
              while(currentNode.next) {
                  currentNode = currentNode.next;
              }
  
              currentNode.next = node;
          }
  
          length++;
      }
  
      // insert (position, element)，特定位置添加一个元素
      this.insert = function(position, element) {
          if (position < 0 || position > length) {
              // 越界了
              return false;
          } else {
              let node = new Node(element);
              let currentNode = head;
              let index = 0;
              let previous = null;
  
              if (position == 0) {
                  node.next = currentNode;
                  head = node;
              } else {
                  while(index < position) {
                      index++;
                      previous = currentNode;
                      currentNode = currentNode.next;
                  }
  
                  previous.next = node;
                  node.next = currentNode;
              }
  
              length++;
  
              return true;
          }
      }
  
      // removeAt(position) 移除特定位置的元素
      this.removeAt = function(position) {
          if (position < 0 || position > length) {
              return false;
          } else {
              let currentNode = head;
              let previousNode = null;
              let index = 0;
  
              if (position == 0) {
                  head = currentNode.next;
              } else {
                  while(index < position) {
                      index++;
                      previousNode = currentNode;
                      currentNode = currentNode.next;
                  }
  
                  previousNode.next = currentNode.next;
              }
  
              length--;
  
              return true;
          }
      }
  
      // indexOf(element) 返回某一元素的下标
      this.indexOf = function(element) {
          if (length == 0) {
              return -1;
          } else {
              let currentNode = head;
              let index = 0;
  
              while(currentNode) {
                  console.log(currentNode)
                  if (currentNode.element == element) {
                      return index;
                  }
  
                  index++;
                  currentNode = currentNode.next;
              }
          }
      }
  
      // remove(element) 移除某一个元素
      this.remove = function(element) {
          let index = this.indexOf(element);
          return this.removeAt(index);
      }
  
      // isEmpty() 
      this.isEmpty = function() {
          return length === 0;
      }
  
      // getHead()
      this.getHead = function() {
          if (length == 0) {
              return false;
          } else {
              return head.element;
          }
      }
  
      // size
      this.size = function() {
          return length;
      }
  
      // toString()
      this.toString = function() {
          let currentNode = head;
          let str = '';
  
          while(currentNode.next) {
              str += `${currentNode.element}, `;
              currentNode = currentNode.next;
          }
  
          str += `${currentNode.element}`;
  
          return str;
      }
  
      // print()
      this.print = function() {
          console.log(this.toString());
      }
  }
  
  
  let linklist = new SingleLinkedList();
  
  linklist.append(10);
  linklist.append(20);
  linklist.append(30);
  linklist.append(40);
  ```

  

### 非线性表

- **一、树**

  - 术语定义

    - 节点的高度：节点到叶子节点的最长路径所包含的边数，从0开始计数
    - 节点的深度：跟节点到节点的路径所包含的边数，从0开始计数
    - 节点层树：节点的深度+1

  - 分类：

    - 二叉树：每个节点最多只有两个节点的树
    - 满二叉树：除了叶子节点，每个节点都有两个子节点
    - 完全二叉树：左上角开始的节点都是满，没有满的节点只能右下角的

  - 存储：

    - 完全二叉树的存储

      - 链式存储：每个节点有3个字段，其中一个存储数据，另外两个是指向左右节点的指针。比较常用。

        - ```js
          function Node = function(key) {
          	this.key = key; // 节点的键值
          	this.left = null; // 指向左节点的指针
          	this.right = null; // 指向右节点的指针
          }
          ```

      - 顺序存储：对于完全二叉树来说，如果节点X存储在数组中的下标为`i`，那么它左节点的存储下标为`2*i`，右节点的存储下标为`2*i + 1`。**注意：根节点存储在下标为1的位置**。最省内存的。

  - 二叉树的遍历：一个递归的过程，每个节点最多会被访问2次，时间复杂度O(n)

    - 前序遍历：根 左 右

      - 递归实现：

      - ```js
        function preOrder(node, ret = []) {
            if (node) {
                ret.push(node.data);
            }
            
            if (node.left) {
                midOrder(node.left, ret);
            }
            
            if (node.right) {
                midOrder(node.right, ret);
            }
        }
        ```

      - 迭代实现：

      - ```js
        /** 
        	以根节点为目标开始遍历。
        	1、访问根节点
        	2、左子树入栈，直至左子树为空的节点
        	3、节点出栈，以右孩子为目标，再次执行1，2，3
         **/
        
        function preOrder(root, ret = []) {
            let stack = [];
            let current = root;
            
            while(current || stack.length > 0) {
                while(current) {
                    stack.push(current);
                    ret.push(current.data);
                    current = current.left;
                }
                
                current = stack.pop();
                current = current.right;
            }
            
            return ret;
        }
        ```

    - 中序遍历：左 根 右

      - 迭代版本：

      - ``` js
        function midOrder(root, ret = []) {
            let stack = [];
            let current = root;
            
            while(current || stack.length) {
                // 左子树入栈
                while(current) {
                    stack.push(current);
                    current = current.left;
                }
                
                // 出栈，第一个出栈的，是左子树中最后入栈的
                current = stack.pop();
                ret.push(current.data);
                current = current.right;
            }
            
            return ret;
        }
        ```

    - 后序遍历：左 右 根

      - ```js
        function postOrder(root, ret = []) {
            let stack = [];
            let current = root;
            // 上一次访问的节点
            let last = null;
            
            while(current || stack.length) {
                while(current) {
                    stack.push(current);
                    current = current.left;
                }
                
                let current = stack[stack.length - 1];
                if (!current.right || current.right == last) {
                    // 没有右节点或者右节点被访问过了，取出访问
                    current = stack.pop();
                    ret.push(current.data);
                    last = current;
                    current = null;
                } else {
                    // 有右节点或者右节点还没有被访问过。以右节点为目标，再次执行
                    current = current.right;
                }
            }
            
            return ret;
        }
        ```

    - 层序遍历：

      - ```js
        function levelOrder(root) {
            let res = [];
        
            function _levelOrder(node, level) {
                if (!node) return null;
        
                res[level] = res[level] || [];
                res[level].push(node.val);
        
                _levelOrder(node.left, level + 1);
                _levelOrder(node.right, level + 1);
            }
        
            _levelOrder(root, 0);
        
            return res;
        }
        ```

      - 得到一个二维数组，每一个子元素数组就是一层的树节点

  - 二叉树的重建

    - 给一个二叉树的前序遍历和中序遍历结果，根据这两个结果重建出一个二叉树

    - 前序遍历的第一个元素就是根节点。根据根节点在中序遍历中位置，可以得到左子树和右子树的元素个数

    - 左子树的中序遍历+右子树的中序遍历

    - 左子树的前序遍历+右子树的前序遍历

    - 根据以上的规律：递归的生成树

    - ```js
      function TreeNode(data) {
          this.data = data;
          this.left = null;
          this.right = null;
      }
      
      function reConstructBinaryTree(preList, inList) {
          if (!preList.length) return null;
          if (preList.length === 1) return new TreeNode(preList[0]);
          
          const value = preList[0]; // 根节点
          const index = inList.indexOf(value); // 根节点在中序遍历列表中的位置
          
          const inLeftChild = inList.slice(0, index);
          const inRightChild = inList.slice(index + 1);
          
          const preLeftChild = preList.slice(1, inLeftChild.length + 1);
          const preRightChild = preList.slice(inLeftChild.length + 1);
          
          const node = new TreeNode(value);
          node.left = reConstructBinaryTree(preLeftChild, inLeftChild);
          node.right = reConstructBinaryTree(preRightChild, inRightChild);
          
          return node;
      }
      ```

  - 根据二叉树的前序遍历和中序遍历，输出后续遍历

    - ```js
      function getHRD(pre, vin) {
          if (!pre) {
              return '';
          }
          if (pre.length === 1) {
              return pre;
          }
          const head = pre[0];
          const splitIndex = vin.indexOf(head);
          const vinLeft = vin.substring(0, splitIndex);
          const vinRight = vin.substring(splitIndex + 1);
          const preLeft = pre.substring(1, splitIndex + 1);
          const preRight = pre.substring(splitIndex + 1);
          // 后序遍历： 左 右 根
          return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight) + head;
      }
      
      let str1 = '12473568';
      let str2 = '47215386';
      let ret2 = getHRD(str1, str2);
      console.log(ret2);
      ```

  - 二叉树搜索树：

    - 二叉搜索树的中序遍历，就是排序后的节点。
    - 查找二叉搜索树中的第K个位置的数：中序遍历得到一个排序后的数组，在数组中查找第K个元素
    - 二叉搜索树的后续遍历：
      - 最后一个元素为根节点
      - 前面的元素中，小玉根节点的元素是左子树，大于根节点的是右子树

- **二、堆**

  - 堆其实是一种特殊的树。
    - 堆是一个完全二叉树。
    - 堆中每一个节点的值都必须大于等于（或小于等于）其子树中每个节点值。跟节点是最大值的就叫最大堆，跟节点是最小值的，就叫最小堆。

### 堆内存和栈内存

- **堆与栈的比较：**
  - 堆是动态分配内存，内存大小不一，也不会自动释放。
  - 栈是自动分配相对固定大小的内存空间，并由系统自动释放。
  - 栈，线性结构 ，后进先出，便于管理。
  - 堆，混乱，杂乱无章，方便 存储和开辟内存空间。

- 栈内存：存储基本类型，引用类型的引用

- 堆内存：存储引用类型。JavaScript不允许直接访问堆内存，依次操作对象时，实际上是操作对象的引用。

- 浅拷贝与深拷贝
  - 浅拷贝的实现方式：`对引用数据仅拷贝第一层对象的属性`
    - `Object.assign()：`拷贝源对象自身的并且可枚举的属性到目标对象。
    - 扩展运算符：
    - `Array.prototype.concat()：`
    - `Array.prototype.slice()：`
  - 深拷贝的实现方式：
    - `JSON.parse`和`JSON.stringify`：会忽略属性值为`undefined`，`Symbol`，`函数`的属性。还要注意避免循环引用。
    - `lodash.cloneDeep()`：
    - 递归的方式实现拷贝：要注意避免循环引用



# 二、算法

## 贪心算法

定义：在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优方面考虑，得到的是局部的最优解，局部的最优解不一定是全局的最优解。



## 动态规划

简称DP，将问题分解为**互相重叠的子问题**，通过反复求解子问题来解决原问题就是动态规划。

核心思想--**穷举**



## LUR缓存淘汰算法

缓存的大小有限，当缓存被用满时，哪些数据应该被清理出去？哪些数据应该被保留？这就需要缓存淘汰策略来决定。

常见的缓存淘汰策略有三种：

- 先进先出策略FIFO - first in first out
- 最少使用策略LFU - least frequently used
- 最近最少使用策略LRU - least recently used

**LRU算法的实现 -- 链表**



**LRU算法的实现--Map**

Map数据结构是有序的，对象不行，对象是无序的。

Map.keys()返回的是键迭代器，迭代器可以使用`next().value`往后遍历并获取到值。



```js
// 实现一个LRU算法
class LRUCache {
    constructor(length) {
        this.length = length; // 存储长度
        this.data = new Map(); // 存储数据。map会按照插入的顺序来保存，对象不会
    }

    // 存储数据，通过键值对的方式
    set(key, value) {
        const data = this.data;
        if (data.has(key)) {
            data.delete(key);
        }

        data.set(key, value);

        // 如果超出了容量，则需要删除最久的数据
        if (data.size > this.length) {
            // data.keys()返回的是键迭代器，.next() 一个个遍历到最后一个
            const delKey = data.keys().next().value;
            data.delete(delKey);
        }
    }

    get(key) {
        const data = this.data;

        if (!data.has(key)) {
            return null;
        }

        const value = data.get(key);
        data.delete(key);
        data.set(key, value);
    }
}

const lruCache = new LRUCache(5);
lruCache.set('name', '小猪课堂');
lruCache.set('age', 22);
lruCache.set('sex', '男');
lruCache.set('height', 176);
lruCache.set('weight', '100');
console.log(lruCache);
lruCache.set('grade', '10000');
console.log(lruCache);
```



## 排序算法

**稳定性：**

- 稳定：如果待排序的序列中存在值`相等`的元素，经过排序之后，相等元素之间原有的`先后顺序不变`。比如a原本排在b的前面，而a=b，排序之后，a仍然在b的前面。
- 不稳定：如果待排序的序列中存在值`相等`的元素，经过排序之后，相等元素之间原有的先后顺序`改变`。 比如：a 原本在 b 的前面，而 a = b，排序之后， a 在 b 的后面。

### 十大经典排序算法

#### 冒泡排序

循环数组，比较当前元素和下一个元素的大小，当前元素比下一个元素大，交换两个元素，向上冒泡

```js
function sort1(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] > nums[j]) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }

        console.log(`第${i+1}交换之后`, nums);
    }
}
```



#### 插入排序

把左侧看成是一个有序列表，每次将一个数字插入该有序列表，插入时，从最右侧开始比较，若比较的数较大，后移一位

```js
function sort2(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i - 1; j > 0; j++) {
            if (nums[i] < nums[j]) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
            } else {
                // 在一个有序数组中，找到一个符合条件的元素之后，就可以终止本次循环了
                break;
            }
        }
    }

    console.log(nums);
}
```



#### 选择排序

每次排序，取一个最大或最小的放到前面的有序序列中

```js
function sort(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[minIndex] > nums[j]) {
                minIndex = j;
            }
        }
        // 找到后面最小的，放到前面的有序序列中
        [nums[minIndex], nums[i]] = [nums[i], nums[minIndex]];
    }
    
    return nums;
}
```



#### 归并排序



#### 快速排序

选择一个目标值，比目标值小的放左边，比目标值大的放右边，目标值的位置已经排好，将左右两侧再次进行快排

```js
function sort(nums) {
    let target = nums[0];
    let left = [];
    let right = [];
    let index = 0;
    
    while(index < nums.length) {
        if (nums[index] < target) {
            left.push(nums[index]);
        } else {
            right.push(nums[index]);
        }
        index++;
    }
    
    return sort(left).concat([target], sort(right));
}
```



#### 希尔排序



#### 堆排序



#### 桶排序



#### 计数排序



#### 基数排序