let Vue;

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

const install = (_vue) => {
  Vue = _vue;
  /**
   * 每次new一个vue实例时，都会去设置它的$store属性
   */
  Vue.mixin({
    beforeCreate() {
      //根实例
      if (this.$options.store) {
        this.$store = this.$options.store;
      //子组件
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  });
}

export default {
  Store,
  install
}