import Vue from 'vue'
import Vuex from 'vuex'
import form from './form'
import valentine from './valentine'


Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    form,
    valentine
  }
})