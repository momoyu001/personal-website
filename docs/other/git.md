# git基础

## git 使用大致流程

- git add files  工作目录 -> 暂存区
- git commit 暂存区 -> 版本历史

## git命令

- git add -u: 将文件的修改 文件的删除,添加到暂存区 (即 操作追踪过的文件)
- git add . : 将文件的修改 文件的新建,添加到暂存区
- git add -A : 将文件的修改 文件的删除 文件的新建,添加到暂存区
- git reset --hard : 将暂存区 \ 工作目录下的内容都清空掉. 使得工作目录还原到最后一次commit的状态,也就是说.在最后一次commit之后`git add git rm`的操作以及在工作目录的修改都撤销了
- git diff <commit的hash值> <commit的hash值> : 比较两个commit的差异

## 文件重命名

- 直接修改文件名,git会提示,原文件被删除,有一个新的还没有跟踪过的文件
- 将新的文件git add添加到暂存区
- 原来的文件`git rm <filename>`删除

终极解决方式:

`git mv <原文件名> <新的文件名>`

## git log命令

- `git log --all`  查看所有分支的历史
- `git log --all  --graph` 查看图形化的log地址
- `git log --oneline` 查看单行的简洁历史
- `git log --oneline -n4` 查看最近的四条简洁历史
- `git log --oneline --al -n4 --graph` 查看所有分支,最近4条单行的图形化历史
- `git hepl --web log` 跳转到git log的帮助文档页面

## git分支

- `git branch` 查看分支
- `git branch -v` 查看本地分支信息
- `git checkout -b <分支名> <已有分支的某个commit号,依据此时的分支来创建新的分支>` 创建新分支，并切换到新的分支
- `git branch -r` 查看远程分支
- `git branch <分支名>` 创建新的分支
- `git checkout <分支名>` 切换分支
- `git diff <分支名> <分支名>` 对比分支之间的差异
- `git merge <master1 - 分支名>` 将master1分支合并到当前分支
- `git branch -d <分支名>` 删除分支

## gitk

图形界面工具 - 查看版本历史

## .git文件夹

- HEAD: 存储当前分支信息,当前仓库正在工作在哪个分支上，HEAD里面是个引用
  - refs/heads/temp  temp分支
  - refs/heads/master master分支
- config: 存储当前本地仓库配置的信息，比如用户名邮箱
- refs:  引用，存放各个分支或tag的信息
- objects：对象，有 `commit` ,` tree`  ,` blob`等对象

## commit tree blob三个对象之间的关系

- commit

  - 一个commit对应一棵树，树里面存储了很多详细信息

- tree

  - 树里面也有可能有树，一层层嵌套，最后到叶子节点，叶子节点就是blob - 文件

- blob

  - git的文件，跟文件名没有关系，是根据文件的内容的生成的blob

  - 就算文件名不同，只要文件内容相同，在git里面就是同一个blob -- 节省了存储空间

    ```
    // 看commit的内容
    输入： git cat-file -p e3146ef80824
    输出：
        tree 74df5a60ef8b3ce7542e24e216ac53d3dbbd90d4
        parent 0f04ce8bd6b08fa51c87781f19edafa37274c09e
        author momoyu001 <lixia1220x@163.com> 1655963464 +0800
        committer momoyu001 <lixia1220x@163.com> 1655963464 +0800
    
        修改readme
    ```

    ```
    // 看tree的内容
    输入：git cat-file -p 74df5a60e
    输出：
        100644 blob ac060a6ee0a290981d83072597ce97594caaf2e5    README.md
        040000 tree d920f9932cd1d84256cbf604fccf54e3f5a2a822    images
        100644 blob 049bff1d5f07d1fe2a71c851561be81ef284019e    index.html
        040000 tree 7d35ef1b137d107abbe907c637c72f7fe79e97b7    js
        040000 tree f627fc3a5190ffe116ecb147dd99f19db1a15faa    styles
    
    ```

练习：新建的git仓库，有且仅有一个commit，仅仅包含/doc/readme，请问内含多少个tree，多少个blob?

**没有文件的文件夹，git是不进行版本管理的。因为git要对文件进行版本管理，所以没有必要对空目录生成对象。基于这一点，readme文件的全路径是这样的```[仓库跟目录]/doc/readme```。那么tree的数量与全路径中`/`的数量一致**



**演示一下：**

​	这里演示的时候，readme文件中没有写入任何内容，git创建了一个内容为空的blob对象。

```
git init test_git_objects
cd test_git_objects
新建doc文件夹
git status
	nothing to commit
新家readme文件
git status
	doc/需要跟踪
git add doc
git commit -m "新的文件"
find ./.git/objects/ -type f // 查看objects下面有没有东西
	./.git/objects/55/8e9aacb7eee6b66f8247b58527ec69e182b382 // 经测试： tree doc
    ./.git/objects/5a/45cb108aacdb65fae9b6b32cc2c367c694775c // 经测试： commit
    ./.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391 // 经测试： blob 内容为空
    ./.git/objects/e8/0ad49ace82167de62e498622d70377d913c79e // 经测试： tree 100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391    readme
// 可以依次查看下各个对象，是什么对象，有什么内容
git cat-file -t 558e9aacb7 // 查看类型
git cat-file -p 558e9aacb7 // 查看内容
```

- commit对象
  - tree
    - tree对象
      - tree:  doc
        - tree对象
          - blob: readme
            - blob对象
              - hello, world
  - parent
  - author
  - ...


## HEAD

查看的命令：`cat .git/HEAD` ---> `refs/head/分支名称`

​	```

​	输入：cat .git/HEAD

​	输出：ref: refs/heads/fix_readme

​	```

- 指代新分支的最后一次提交

- 可以不跟分支挂钩，处于分离头指针的状态下，没有挂钩分支，指代到某一个具体的commit

- 切换分支时，HEAD会跟着变，指向新的分支

- 比较两次commit的差异时，可以使用HEAD指代

  - ```
    git diff <hash值> <hash值>
    
    git diff HEAD HEAD^1 // 比较HEAD指向的commi 和 它的父级commit之间的差异
    
    ^ 表示父commit，两个箭头表示父级的父级。后面的数字表示第几个父亲。当一个commit有多个父commit时，可以通过在^后面跟上一个数字来表示第几个父commit。连续的^符号，依次沿着父commit进行定位，直到某个祖先commit。
    ~<n>	相当于	连续n个^
    ^1		相当于		~1
    ^^1		相当于		~2
    ^2		表示 第二个父节点
    ~2		表示 父节点的父节点
    ```

- 指向分支，分支里面的内容是什么？**最终还是指向了一个commit**

  - ```
    cat .git/refs/heads/fix_readme
    	7508aaa54ce504f4ac05779f5c4479b2c26e0e6a
    git cat-file -t 7508aa
    	commit
    git cat-file -p 7508aa
    	tree fcc5c104ad481bfc2ae29301c9b502ab5cac7c24
        parent 0f04ce8bd6b08fa51c87781f19edafa37274c09e
        author momoyu001 <lixia1220x@163.com> 1655975881 +0800
        committer momoyu001 <lixia1220x@163.com> 1655975881 +0800
    
        BackgoundColor modified
    ```

## git底层的运行流程

​	当我们添加或者修改了文件并且add到stage area之后，首先会根据文件内容创建不同的blob，当进行提交之后，马上创建一个tree组件，把需要的blob组件添加进去，之后再封装到一个commit组件中完成本次的提交。

​	在将来进行reset的时候，可以直接使用使用`git reset --hard <XXXXX>`可以恢复到某个特定的版本，在reset之后，git会根据这个commit组件的id快速找到tree组件，然后根据tree组件找到blob组件，之后对仓库进行还原，整个过程都是以哈希和二进制的方式进行的，所以git执行效率非常高。

## cat命令

cat命令主要用于查看文件的内容，创建文件，文件合并，追加文件内容等功能。

.git目录下：

​	cat HEAD: 查看HEAD文件的内容

- git-cat-file: 显示版本库对象的内容、类型及大小信息
- git-cat-file -t <hash值> ： 显示版本库对象的类型 
- git-cat-file -p  <hash值>： 显示对象的内容
  

## Git的术语

### 分离头指针 - dettach head

场景：

git checkout <直接跟上某一个commit的hash值>。执行之后，会提示

```you are in 'detached head' state。```

git log之后，commit后面的`（HEAD）`没有指向任何一个分支，着就处于分离头指针的状态


本质上：

就是说我们工作在一个没有分支的状态下。我们的修改没有跟任何一个分支相关联。

这种状态下，我们所作的修改，在切换分支之后，可能都会被git当作垃圾丢掉。


适用场景：

当要做出的某些修改，最后可能也不需要保留，使用分离头指针，可以很方便就将这部分代码清除掉。


## tips

命令中,什么时候用 `--` 什么时候用 `-` 呢?

详情参数使用`--`, 简化参数(如单字母)使用`-`

## Git常见场景

### 删除不需要的分支

```
git branch -d <分支名称>
```



若git提示：该分支还没有被完全merge，可控的情况下可以使用下面的命令

```
git branch -D <分支名称>
```



-d必须时已经将分支完全合并到其上游分支或者HEAD中，否则不能成功。HEAD的场景

```
// 1、从master分支，创建一个test分支
git checkout -b test master

// 2、在test分支上修改东西并提交
git add .
git commit -m "修改test分支的内容"

// 3、切换到master分支，此时的HEAD指向的是master分支
git checkout master

// 4、此时test分支比master多了一个commit,尝试删除test分支， 控制台提示 The branch 'test' is not fully merge
git branch -d test

// 5、使用分离头指针, test分支的那个commit id； 结果可以看到HEAD 和 test 在同一个commit上
git checkout bfc138f8d16

// 6、此时在执行删除的命令，成功删除分支
git branch -d test

// 或者第4步之后，直接使用 git branch -D test 强制删除
```

### 恢复删除掉的分支

```
git reflog <subcommond> <potions>
```

reflog是一个本地结构，它记录了HEAD和分支引用在过去指向的位置。reflog信息没法与其他人共享 ，每个人都有自己特有的reflog。重要的一点是，它不是永久有效的，有个可配置的过期时间，过期信息自动删除。



恢复被删除的分支：

```
// 展示所有的reflog，找到被删掉的分支最后一次commit的id
git  reflog show
// 根据id重新生成分支
git checkout -b test bfc138f
```

### 修改最新commit的message

对最近一次commit的message做出修改。

--amend命令不止是修改message信息，而是替代了上一次commit

```
git commit --amend
```

执行命令之后，会进入vim编辑器，修改内容之后，按`ESC`退出编辑状态，`:wq!`保存并退出界面

### 修改老旧commit的message

当代码还没有推到远程分支的时候，可以使用rebase（变基）来修改，有远程分支之后，就不能轻易的使用rebase了。

团队中公用的分支，🈲用rebase，因为会破坏历史commit信息。

```
git rebase --- 变基
git rebase -i <commit 的 id>
```

变基的基，选择要被变的这个commit的父亲

```
// 找到我们要修改的commit的父亲的commit id
git rebase -i <commit id>

// 进入到了一个交互式的界面，界面上有说明各个关键字的含义，我们要修改message的话，要选用reword use commit, but edit the commit messsage。不需要修改的commit保持不动
// 这个策略编写完成之后，保存并退出
reword <commit id> <原来的message>

// 退出之后会进入另一个界面我们在这个界面修改message信息

// 保存并退出之后，控制太提示 successfully rebases and updated refs/heads/master
```



如果要修改第一次提交的message，使用 :root 来作为父亲

```
git rebase -i --root
```

`git rebase -i` 操作会分离头指针。是因为：

```
git rebase工作的过程中就是使用了分离头指针。rebase意味着基于新base的commit来变更部分commit。（新的base的commit没有基于任何一个分支）。它处理的时候，把HEAD指向base的commit，此时如果该commit没有对应的branch，就处于分离头指针的状态，然后重新一个个生成新的commit，当rebase创建完最后一个commit之后，结束头指针分离状态，Git让变完基的分支名指向HEAD。
```

message也是commit的一个属性，是确定commit的hash的一个因子。当修改了一个commit之后，因为commit有个parent属性，parent的内容变化了之后，本身也会变化，也就是说，被修改的commit之后的commit也会跟着改变了（hash值）。

commit中包含了message、作者、创建时间、父亲等信息，这些信息都和hash值的生成有关，改变了之后，hash值也可能会改变。

### 把多个commit整理成一个

```
git rebase -i <开始的commit id> <结束的commit id>
```

在执行这个命令时，如果没有指定结束commit id，那么结束commit id默认为当前分支最新的commit，那么rebase结束之后，会自动更新当前分支指向的commit，如果指定了结束commit，而且结束commit不是当前分支最新的commit，那么rebase结束之后，会生成一个游离的head，而且当前分支指向的commit不会更新。



进入交互界面之后 ，选择`squash <commit> = use commit, but meld into previous commit`合并到前面的commit中。

保存退出之后进入新的交互界面，写一下合并commit的原因。

```
# This is a combination of 3 commits
// 这里写一下合并commit的原因
......
# This is the 1st commit message
```

### 把间隔的commit整理成一个

```
git rebase -i <开始的commit id> <结束的commit id>
```

我们的第一个commit是 `add readme`，要将第一个commit和后面一个readme的commit合并，一个小技巧，在交互界面上自己手动加上`pick <第一个commit的id>`（或者使用`git rebase -i --root`）； 我们可以根据需要自己调整commit的位置，达到合并的效果。

修改完成保存退出。

可能出现没有及时进入下一个交互界面。

使用`git rebase --continue`,重新进入一个交互界面

写 一下合并commit的原因，保存退出，即完成了合并。

git rebase之后若产生了冲突，解决冲突之后，先`git add .`，然后在`git rebase -i --continue`。

git rebase 第一步配置了策略之后，后续不想再继续rebase了，使用`git rebase --abort`

### 怎么比较暂存区和HEAD所含文件的差异

```
// cached 和 staged都指向暂存区
git diff --cached
git diff --staged
```

HEAD指向了最近的一次commit，其实就是暂存区和最近一次commit的差异比较。

git add 之后，内容进入暂存区。

后面加上文件名，比较特定的文件。

后面不加文件名，比较所有的差异。

### 怎么比较工作区和暂存区所含文件的差异

```
// 比较工作区所有文件和暂存区的差异
git diff
// 比较工作区某一个文件和暂存区的差异
git diff -- <具体的文件名>
```

`git diff`默认情况下比较的是`暂存区`和`工作区`之间的区别

### 将暂存区恢复成和HEAD一样

```
// 将所有文件恢复成和HEAD一样
git reset HEAD
// 将某个文件恢复成和HEAD一样
git reset HEAD <文件名>
```

### 将工作区恢复成和暂存区一样（还原工作区的内容，不做修改）

tips:

```
如果想变更 工作区 的内容，使用 git checkout
如果想变更 暂存区 的内容，使用 git reset

关于命令的变更：git 2.23之后的变更

git switch替换git checkout的切换分支功能 git switch <分支名>
git restore替换git checkout的对工作区进行恢复的功能 git restore <文件名>
```

```
恢复某一个具体的文件
git checkout -- <文件名>
```


### 取消暂存区部分文件的更改

```
git  reset HEAD -- <文件名>
```

### 消除最近的几次提交

```
git reset --hard <commit id>
```

修改HEAD指向这个commit id，这个commit id之后的几次提交都会被丢弃，暂存区和工作区也恢复成了你指定的那个commit的内容


```
修改了工作区：恢复 --- git checkout <文件名>   git restore <文件名>
add后：恢复 --- git reset HEAD
commit后：恢复 --- git reset --hard <commit id>
```



```
C1<--C2<--C3<--C4, Cn全部是commit，且C1是C2的父亲，依次类推，
如果C3有问题，你想撤销C3的修改，由此生成C5，历史树变成C1<--C2<--C3<--C4--C5，执行git revert C3,就会生成C5，且C5就是清除C3的变更。
如果无需保留C3和C4，指向让分支回退到C2，那么执行git reset --hard C2,使用了 --hard ，它会把工作区和暂存区都回退到C2。
```

### 不同commit的指定文件之间的差异

```
git diff <分支名1>  <分支名2> -- <文件名>
git diff <commit-id-1> <commit-id-2> <文件名>
```

### 删除暂存区的文件

```
git rm <文件名>
```

直接再工作区和暂存区中删除某个将来不需要提交到commit的文件时，使用命令`git rm <filename>`



`rm <filename>` 删除工作区的文件

`git rm <filename>` 删除工作区的文件（可直接执行这一命令来删除）

### git stash

```
  // 将工作区的内容存起来，可以去开发其他的功能，完了之后再恢复
  git stash
  // 查看现在stash栈中的内容，相当于一个栈，可执行pop apply的方法
  git stash list
    stash@{0}: ...
    stash@{1}: ...
    stash@{2}: ...
    stash@{3}: ...
  // 恢复之前的内容，但是stash栈中，这条信息还在，不会被删除
  git stash apply
  // 恢复之前的内容，同时stash栈中的着条信息被删除
  git stash pop
```

```
git stash list
	stash@{0}: ...
	stash@{1}: ...
	stash@{2}: ...
	stash@{3}: ...

这些是序号，序号中，数字大的表示是较早的stash，git stash pop的时候，可以添加具体的序号，不加序号的情况下，默认为 stash@{0}
```

```
git stash pop stash@{2}
git stash pop === git stash pop stash@{0}
```

```
// stash 时，添加相应的说明信息
git stash save <message>
```

### Git仓库备份到本地

1、准备一个备份文件夹，原文件夹中执行`pwd`查看路径

2、在备份文件中 执行

​	`--bare : 备份时不带工作区, 克隆一个裸仓库`,

​	哑协议方式：没有进度的展示

​	`git clone --bare D:\front-space\git_learning <重命名文件夹>`   

​	智能协议方式：有进度的展示

​	`git clone --bare file:///D/front-space/git_learning <重命名文件夹>`



和远端仓库发生关联: （可以用本地备份的仓库，模拟远端仓库）**git remote**

```
git remote add <本地模拟的远端仓库的地址>
// git remote add ya D:\front-space\git_learning_bac

// 本地发生一些改动，比如新建了分支，推送远端
git push ya

// 可能会有提示
git push --set-upstream ya momoyu001
git push --set-upstrea <远端仓库名称> <分支名称>

// 查看当前仓库的远端
git remote -v
```

### 总结

删除不需要的分支`git branch -d <分支名>`,`git branch -D <分支名>`

恢复删除的分支`git reflog`获取分支的最新commitid，`git checkout -b <分支名> <commit id>`



修改最新的commit`git commit --amend`

修改老旧的commit`git rebase -i <父亲的commit id>`，`pick 改为 reword ( r )`



合并连续的commit`git rebase -i <父亲的commit id (开始的commit id)> <结束的commit id 可不写>` 保留较老的`pick`，其他要合并的使用 `squash (s)` s表示合并到上一个commit

合并不连续的commit`git rebase -i <父亲的commit id>`，保留较老的`pick`，根据需要移动其他的commit，并修改为 `squash (s)` 



比较暂存区和最新一次commit（HEAD）的差异`git diff --cached`

比较暂存区和工作区的文件差异`git diff`，`git diff -- <文件名>`

比较工作区和HEAD（最新一次commit）的差异`git diff HEAD`



将暂存区恢复成和HEAD一样`git reset HEAD`，`git reset HEAD <文件名>`

工作区恢复成和暂存区一样`git checkout -- <文件名>`，`git restore <文件名>`

取消暂存区部分的修改`git reset HEAD <文件名>`

消除最近的几次提交`git reset --hard <commit id>`


**cherry-pick**:

将一个分支上的某个commit合并到另一个分支。

例如：test 分支上有commit-id-1。

切换到master分支。

执行`git cherry-pick <commit-id-1>`。

执行`git push`推送到远端。

*master分支上的commit-id与test分支上的commit-id并不相同，即只是 将test分支上的修改拷贝一份过来。*

`cherry-pick`后可以跟上多个commit-id。



**git rebase**:

1、合并分支

2、合并commit

**git revert**:


# Git与Github的简单同步

添加远端：`git remote add <自己的命名(例如：github)> <远端地址>`

push代码：`git push github --all`，`git push github <某一个具体的分支名>`

--all ： 所有的分支，只提交某一分支的时候，为具体的分支名

```
// 拉取远端最新的代码
git fetch <远端>

// 先拉取远端最新的代码，然后把远端和本地，关联的分支做一个merge
git pull
```

当本地仓库的远端不止一个的时候，需要在git fetch 或者 git pull 或者 git push后面加上对应的远端名称



*注意*：

`git remote add`，是在本地已经是git仓库的情况下使用，若是先创建了远程仓库，git clone到本地之后，再开始写代码，不需要手动进行本地仓库和远端的连接。



**fast forward**:

举个例子：本地分支往远端分支push的时候，如果远端分支不是本地分支的祖先，那么它们就不是`fast forward`，反之它们就是`fast forward`。

远程分支如果不是本地分支的`fast forward`，push的时候就会报错提示。

当出现了不是`fast forward`的情况，两种解决方式：`git merge`，`git rebase`

​	*git merge*:

```
可以先查看文档
git merge -h

合并远端的master分支（前面的操作，把远端命名为了github）
git merge --allow-unrelated-gistories github/master
```

​	*git rebase*:

```
先把远端的分支fetch到本地
git fetch

git pull --rebase
```



**SSH**:



# Git多人单分支集成协作的常用场景

```
git push
切换分支之前指定远端的分支，那么在提交的时候，直接git push是不会有问题的，默认是origin远端分支，可以不写后面的分支
```

```
远端新建了分支，本地还没有这个分支，需要先更新本地的分支
git fetch <自己定义的远端的名称>
```

```
git branch -av
可以看到各个分支上，commit的最新情况，比如[ahead 1, behind 1]表示，本地的分支，比远端分支多一个新的commit，少了一个其他人提交的commit，出现这种情况，可以使用 git merge合并对应的分支
```

```
git pull
先将远端的分支拉取下来，然后和本地对应的分支做一个合并。
```

```
git pull === git fetch + git merge
```

```
git merge / git rebase
git merge	不会改变两个分支的已有版本历史，只会把两个分支合并后创建出一个新的commit出来
git rebase	假设当前在 A 分支，要基于B分支做rebase，那么，先找到A和B最近的公共祖先C1，从C1到A之间所有的commit，都基于B重新生成新的commit，rebase通常会改变某个分支的历史。
```

```
一人修改了文件内容，一人修改了文件名，不会产生冲突的根本原因是，git存放blob文件时，是以文件内容来区分的，并不以文件名来区分。
```

```
两个人同时改了一个文件的名称，会有冲突。
```


*注意*：

我们本地是无法在远端分支上直接做出变更的，只能基于远端分支建立本地分支后，才能commit。



# pulll request 和 merge request

## pull request

即**PR**。

github上面，当自己想给其他的仓库贡献代码时，先 把别人的仓库`fork`一下到自己的仓库，自己用`fork`之后的仓库来修改并提交代码，开发完成之后给仓库owner提交`PR`合并请求，请求鄙人把自己的代码拉回去。

## merge request

即**MR**。

gitlab上面，一般是公司的私有库，一个团队维护一个仓库，通常大家会新建自己的分支，开发完成之后，把代码合并到主分支上面。



## 结论

pull request 和 merge request其实差不多，只是在不同平台上的叫法有差异。



# github认证

github修改了认证方式，现在不再支持用户名&密码的方式认证，改成了个人token的方式，我们在执行git add, git commit, git push等操作的时候，会弹出一个弹窗要求输入用户名和密码，密码就是我们个人token，如何生成个人token，可以查看 [Git使用个人访问令牌提交代码到仓库_落丶寞的博客-CSDN博客_git 个人令牌](https://blog.csdn.net/weixin_44341110/article/details/120510816)。

若没有弹出登录的弹窗，使用 `git credential-manager uninstall`命令，执行命令之后，再进行操作就会弹出。