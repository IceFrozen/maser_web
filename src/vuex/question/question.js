import Vue from 'vue'
export default {
  state: {
    listLoading: false,
    questions: [],      //用户数据
    total:1,
    page:1,
    pageShow:1000

  },
  mutations: {
    GET_QUESTION_LIST_SUCCESS (state, items) {
      state.listLoading = false
      state.questions = items
      // state.total = items.total
    },
    GET_QUESTION_LIST_FAILD (state) {
      state.listLoading = false
      state.questions = []
    },
    REQUEST_QUESTION_LIST (state) {
      state.listLoading = true
    }
  },
  actions: {
    async getQuestion (store) {
      if (store.state.listLoading) {
        return
      }
      store.commit("REQUEST_QUESTION_LIST")
      try {
        let res = await Vue.api.get('/Questions', {
           // params: {filter:{include:["wxInfo","sellerInfo"]}}
         })
        console.log(res,"res")
        store.commit("GET_QUESTION_LIST_SUCCESS", res.data)
      } catch (e) {
        store.commit("GET_QUESTION_LIST_FAILD")
        throw e
      }
    },
    async findQuestionById (store,id) {
      if (store.state.listLoading) {
        return
      }
      if(!id) {
        store.dispatch('getPlayerList')
        return 
      } 
      store.commit('REQUEST_QUESTION_LIST')
      try {
        let res = await Vue.api.get('/Questions/'+id, {
            // params: {filter:{include:["wxInfo"]}}
         })
        // console.log("this is find ",res)
        store.commit("GET_QUESTION_LIST_SUCCESS", [res.data])
      } catch (e) {
        store.commit("GET_QUESTION_LIST_FAILD")
        throw e
      }
    }
  },
  modules: {  }
}
