import Vue from 'vue'
import Vuex from './vuex'

//默认会去调用插件的install方法
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: 10
  },
  getters: {
    add(state) {
      return state.msg + 20;
    }
  },
  mutations: {
    syncAddTen(state, payload) {
      console.log('最外层');
      state.msg += payload;
    }
  },
  actions: {
    asyncAddTen({ commit }, payload) {
      commit('syncAddTen', payload);
    }
  },
  modules: {
    a: {
      state: {
        msg_a: 10
      },
      mutations: {
        syncAddTen() {
          console.log('hello a');
        }
      }
    },
    b: {
      modules: {
        c: {
          state: {
            x: 12
          },
          mutations: {
            syncAddTen() {
              console.log('hello c');
            }
          }
        },
        d: {
          mutations: {
            syncAddTen() {
              console.log('hello d');
            }
          }
        }
      }
    },
    f: {
      mutations: {
        syncAddTen() {
          console.log('hello f');
        }
      }
    }
  }
})
