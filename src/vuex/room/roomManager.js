import Vue from 'vue'
import {REQUEST_ROOM_LIST, GET_ROOM_LIST_FAIL, GET_ROOM_LIST_SUCCESS} from '../consts'

export default {
  state: {
    listLoading: false,
    rooms:[],
    total:1,
    page:1,
    pageShow:1000

  },
  mutations: {
    [GET_ROOM_LIST_SUCCESS] (state, items) {
      state.listLoading = false
      state.rooms = items.rooms
      state.total = items.total
    },
    [GET_ROOM_LIST_FAIL] (state) {
      state.listLoading = false
      state.rooms = []
      state.total = 1
      state.page = 1
    },
    [REQUEST_ROOM_LIST] (state) {
      state.listLoading = true
    }
  },
  actions: {
    async getRoomList (store) {
      if (store.state.listLoading) {
        return
      }
      store.commit(REQUEST_ROOM_LIST)
      try {
        let res = await Vue.api.get('/room/listpage', {
           params: {page:store.state.page}
         })
        console.log(res)
        store.commit(GET_ROOM_LIST_SUCCESS, res.data)
      } catch (e) {
        store.commit(GET_ROOM_LIST_FAIL)
        throw e
      }

    },
    async findRoomById (store,id) {
      if (store.state.listLoading) {
        return
      }
      store.commit(REQUEST_ROOM_LIST)
      try {
        let res = await Vue.api.get('/room/findById', {
           params: id
         })
        store.commit(GET_ROOM_LIST_SUCCESS, res.data)
      } catch (e) {
        store.commit(GET_ROOM_LIST_FAIL)
        throw e
      }
    }
  }
  //modules: { playerDetail }
}
