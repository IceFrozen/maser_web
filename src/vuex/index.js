import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import roomManager from './room/roomManager.js'
import orderManager from './order/orderManager.js'
import applyManager from './order/applyManager.js'

import question from './question/question.js'
import newQuestion from './question/newQuestion.js'
// import questionDetail from './question/question.details.js'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
      user,
      roomManager,
      orderManager,
      applyManager,
      question,
      newQuestion,
      // questionDetail
    }
})