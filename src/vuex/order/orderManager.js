import Vue from 'vue'
import {REQUEST_ORDER_LIST, GET_ORDER_LIST_FAIL, GET_ORDER_LIST_SUCCESS} from '../consts'

export default {
  state: {
    listLoading: false,
    orders:[],
    total:1,
    page:1,
    pageShow:1000

  },
  mutations: {
    [GET_ORDER_LIST_SUCCESS] (state, items) {
      state.listLoading = false
      state.orders = items.data.reverse()
      state.total = items.total
    },
    [GET_ORDER_LIST_FAIL] (state) {
      state.listLoading = false
      state.orders = []
      state.total = 1
      state.page = 1
    },
    [REQUEST_ORDER_LIST] (state) {
      state.listLoading = true
    }
  },
  actions: {
    async getOrderList (store) {
      if (store.state.listLoading) {
        return
      }
      store.commit(REQUEST_ORDER_LIST)
      try {
        let res = await Vue.api.get('/Orders',{
            params: {filter:{include:"playerInfo"}}
        })
        store.commit(GET_ORDER_LIST_SUCCESS, res)
      } catch (e) {
        store.commit(GET_ORDER_LIST_FAIL)
        throw e
      }

    },
    async findOrderById (store,id) {
      if (store.state.listLoading) {
        return
      }
      store.commit(REQUEST_ORDER_LIST)
      try {
        let res = await Vue.api.get('/Orders/'+id,{
          params: {filter:{include:"playerInfo"}}
        })

        if(!res.data) {
          return store.commit(GET_ORDER_LIST_FAIL)
        }
        let ret = {
          data:[res.data],
          total:1
        }
        store.commit(GET_ORDER_LIST_SUCCESS, ret)
      } catch (e) {
        store.commit(GET_ORDER_LIST_FAIL)
        throw e
      }
    }
  }
  //modules: { playerDetail }
}
