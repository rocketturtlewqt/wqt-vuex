import ModuleCollection from './MuduleCollection';
import installModule from './initModule';

let Vue;

class Store{
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state
      }
    });
    
    this.getters = {};
    this.mutations = {};
    this.actions = {};

    this.modules = new ModuleCollection(options);

    console.log(this.modules);

    installModule(Vue, this, this.state, [], this.modules.root);
    
  }

  commit = (mutationName, payload) => {
    this.mutations[mutationName].forEach(fn => {
      fn(payload);
    });
  }

  dispatch = (actionName, payload) => {
    this.actions[actionName].forEach(fn => {
      fn(payload);
    });
  }

  get state() {
    return this.vm.state;
  }

  // register(moduleName, module) {
  //   if (!Array.isArray(moduleName)) {
  //     moduleName = [moduleName];
  //   }

  //   this.modules.register(moduleName, module);

  //   installModule(Vue, this, this.state, [], this.modules.root);
  // }
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