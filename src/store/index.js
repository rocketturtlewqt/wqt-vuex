import Vue from 'vue'
import Vuex from './vuex'

//默认会去调用插件的install方法
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: 'hello world'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
