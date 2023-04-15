

<h1> 前端面试仓库</h1>
[![Forkers repo roster for @RobinYang11/goji](https://reporoster.com/forks/RobinYang11/goji)](https://github.com/RobinYang11/goji/network/members)


### 前言

在过去的 1000 次面试中总结出，通过短短 1 个小时的问答很难全面准确地考核面试者。这其中有各种因素 ,比如:

- 1. 有时候面试官 工作比较忙 ，来个面试者 ，草草了事.
- 2. 面试者 因为赶车或者紧张，发挥失常等等。
- 3. 算法题时间不够。
- 4. 面试题造火箭 ，有的面试官问些一些很偏的问题。

在实际开发中，我们会给开发者足够的实际解决问题，只要能按照实际解决问题，我们认为就是合格的。所以为了避免以上各种认为的因素，公平，客观地考核面试者的编程能力,我们以一下方式进行面试.我们认为只要满足以下要求即可。

### 考核的知识点

- git git 研发流程 比如 提交合并请求，如何提 issue ,如何 code review
- javascript 基础
- css 能实现高保真页面
- react/vuejs 能编写稳定可靠的组件.
- webpack 基本配置打包
- nodejs 基础知识

### 面试题指南 [vuejs /reactjs 二选一]

#### 2. 点击仓库上方的 watch-> all activity ,star 或者 fork 当前仓库，以便面试官能及时看到你状态. 或者从当前 git 项目的 dev 分支 创建自己的分支，当然点个 star 那就更完美了
<p align="center">
  <img  width="200px" src="https://i.postimg.cc/ncbcDGPd/l-QLPJwriiku-2c7-NAun-NAlqw2vh7-K4d-Ip9-AEKcka-Sg-Bk-AA-602-745.png">
</p>
#### 1.从下面的题目中任选一题 实现要求即可

#### 3. 完成之后 提交 pull request 到 dev 分支

#### 4. 我们期望你的代码 干净整洁，让我们有阅读的欲望.更希望你们的代码让我耳目一新.总之想办法来亮瞎我们吧。

#### 5. 在做题中有任何疑问可以直接在仓库提 issue.我们会第一时间查看哦.

#### 6. 你的组件放到 react->src/components, vue-> vue/components

#### 7. 作业时间 3-5 日

#### 8. 其他问题 可以提 issue 或者进微信群提问 ,或者关注抖音号学习高阶前端技术.



### 交流群
<p align="center">
  <a>
    <img width="200" src="https://i.postimg.cc/mkFfrK4b/886dee5612cfe0324a63870bf3feeaa8.png">
  </a>
   <a>
    <img width="200" src="https://i.postimg.cc/mgWB8knj/abc.png">
  </a>
</p>
### 项目启动指南

```shell
  // react
  npm run dev

  // vue
  npm run vue
```

### 面试题 [由 easy 到 hard 排序] VUE 和 REACT 都可以,组件必须具备可扩展性 ，就是满足 <b> <a href="https://zh.wikipedia.org/wiki/%E5%BC%80%E9%97%AD%E5%8E%9F%E5%88%99"> 开闭原则</a></b>.

#### 第一题 [easy]

- 题目要求

  实现一个 Table 组件,传入 data 和 col 后可以渲染出一个表格。表格中的数据可以排序,筛选

- vue demo

```vue
  <Table data={[]} col ={[]}>
```

- react demo

```typescript


  interface TabProps{
    data:Array<unknow>
    cols:Array<unknow>
    //可以添加其他参数
  }


  function Table(props:TabProps){
    ... your code
  }

```

#### 第二题 [easy] 实现弹框组件

- 题目要求
  实现一个弹框组件,弹框可以自定义页眉 页脚

- vue demo

```vue
<Modal visible="{true}">
    ....
   </Modal>
```

```typescript

- react demo
interface ModalProps{
  visible:boolean
  //参数可以自定义
}

  function Modal(props:ModalProps){

  }

```

#### 第三题 [hard]滚动加载

- 题目要求
  实现一个滚动加载图片的组件 参考 https://huaban.com/ 首页.
  要求实现揭露 页面渲染流畅

  - vue demo

  ```vue
  <LoadImage ... />
  ```

  - react demo

  ```typescript
  interface LaodProps {
    //自定义参数
  }

  function LoadImage(props: LoadProps) {}
  ```

#### 第四题 [hard] 实现气泡框

- 题目要求
  点击页面某个地方，出项浮框. 参考https://ant.design/components/popover-cn
- vue demo

```vue
  <Popover ...>
```

- react demo

```typescript
interface PopoverProps {
  //自定义参数
}

function Popover(props: PopoverProps) {}
```

#### 第五题 [hard] 表格带分页

- 题目要求
  实现一个表格表格同第一题 ,要求增加 分页功能
  ```typescript
  ///代码结构同第一题
  ```
