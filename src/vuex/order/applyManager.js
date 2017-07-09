import Vue from 'vue'
import {REQUEST_APPLY_LIST, GET_APPLY_LIST_FAIL, GET_APPLY_LIST_SUCCESS, REQUEST_APPLY, REQUEST_APPLY_FINSH} from '../consts'

export default {
  state: {
    listLoading: false,
    applyList:[],
    total:1,
    page:1,
    pageShow:1000

  },
  mutations: {
    [GET_APPLY_LIST_SUCCESS] (state, items) {
      state.listLoading = false
      state.applyList = items.reverse()
      state.total = items.length
    },
    [GET_APPLY_LIST_FAIL] (state) {
      state.listLoading = false
      state.applyList = []
      state.total = 1
      state.page = 1
    },
    [REQUEST_APPLY_LIST] (state) {
      state.listLoading = true
    },
    [REQUEST_APPLY_FINSH] (state) {
      state.listLoading = false
    }
  },
  actions: {
    async getApplyList (store) {
      if (store.state.listLoading) {
        return
      }
      store.commit(REQUEST_APPLY_LIST)
      try {
        let res = await Vue.api.get('/ApplyCashes',{
          params: {filter:{include:[{seller:"wxInfo"},"RebateDetail"]}}
        })
        store.commit(GET_APPLY_LIST_SUCCESS, res.data)
      } catch (e) {
        store.commit(GET_APPLY_LIST_FAIL)
        throw e
      }

    },
    async applyCashById (store,obj) {
      if (store.state.listLoading) {
        return {isSucc:-1,msg:"稍后再试"}
      }
      store.commit(REQUEST_APPLY_LIST)
      try {
        let res = await Vue.api.post(`/AdminInfos/${store.rootState.user.user}/ReviewCash/`,{
          applyId:obj.id,
          des:obj.des || 'success',
          passing:obj.num
        })
        store.commit(REQUEST_APPLY_FINSH)
        return res.data
      } catch (e) {
        console.log(e)
        store.commit(REQUEST_APPLY_FINSH)
        return {isSucc:-1,msg:"失败"}
      }

    },
    async findApplyById (store,id) {
      if (store.state.listLoading) {
        return
      }
      store.commit(REQUEST_APPLY_LIST)
      try {
        let res = await Vue.api.get('/ApplyCashes/'+id)
        store.commit(GET_APPLY_LIST_SUCCESS, res.data)
      } catch (e) {
        store.commit(GET_APPLY_LIST_FAIL)
        throw e
      }
    }
  }
  //modules: { playerDetail }
}
