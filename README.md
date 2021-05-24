---
title: "Vuex原理及源码"
draft: true
---

### vuex原理图

- state：单一状态树，类似于全局的一个容器
- getters：相对于state的计算属性
- mutations：定义同步方法
- actions：定义异步逻辑，请求过后再去调用mutations里的方法

![vuex原理图](https://rocketturtlewqt.github.io/20210523123441aft.png)

### 实现vuex中的state

- src目录下的store下的vuex中的index.js

1. Vue.use默认会去调用插件的install方法
2. 在install方法里，全局混入beforeCreate钩子函数，为之后所有使用new的Vue实例挂载Store类的实例
3. 实现Store类

```js
class Store{
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state
      }
    });
  }

  get state() {
    return this.vm.state;
  }
}
```

### 实现高阶版vuex（包含modules）

文档及讲解请看：[高阶版vuex](https://rocketturtlewqt.github.io/vue源码/vuex/vuex原理及源码/)

- 源码在src/store/vuex