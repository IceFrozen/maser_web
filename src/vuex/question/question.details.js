import Vue from 'vue'
import _ from 'lodash'
export default {
  state: {
    AskId:"",
    askInfo:{},
    isFetching: false
  },
  mutations: {
    GET_ASK_DETAILS_SUCCESS (state,askInfo) {
      state.isFetching = false
      state.askInfo = askInfo.instance
    },
    GET_ASK (state) {
      state.isFetching = true
    },
    SUB (state) {
      state.isFetching = true
    },
    SUB_SUCCESS (state) {
      state.isFetching = false
    },
    SUB_FAILD(state) {
       state.isFetching = false
    },
    GET_ASK_FAILD (state) {
      state.isFetching = false
    },
    SET_ASK_ID (state,id) {
      state.AskId = id
    }
  },
  actions: {
    async  subAskToServer(store,sendData) {
      try {
        if (store.state.isFetching) {
          return
        }
        store.commit('SUB')
        let save_Data = _.cloneDeep(store.state.askInfo)
        save_Data = _.defaults(save_Data,sendData)
        let res = await Vue.api.post('/Asks/subAsk',{
          group:save_Data})
        store.commit('SUB_SUCCESS')
        console.log("this is res in inner",res)
        return res.data
      } catch (e) {
        store.commit('SUB_FAILD')
        return {
          isSucc:-1,
          msg:"error"
        }
      }
    },
    async setASKID (store, id) {
      if (store.state.isFetching) {
        return
      }
      if(store.state.AskId && store.state.AskId == id){
        return
      }
      store.commit('SET_ASK_ID',id)
      store.commit('GET_ASK')
      try{
         let res = await Vue.api.get('/Asks/getQuestion?questionId='+store.state.AskId)
        store.commit('GET_ASK_DETAILS_SUCCESS',res.data)
        return res.data
      }
      catch(e){
        store.commit('GET_ASK_FAILD')
        return {
          isSucc:-1,
          msg:"error"
        }
      }
    }
  }
}
