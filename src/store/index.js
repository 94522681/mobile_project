import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('TOUTIAO_USER'),
    activeChannel: '',
    popshow: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      setItem('TOUTIAO_USER', state.user)
    },
    changePopShow (state, val) {
      state.popshow = val
    }
  },
  actions: {
  },
  modules: {
  }
})
