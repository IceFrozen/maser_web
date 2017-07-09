import Vue from 'vue'
import playerDetail from './player.details.js'
import {GET_PLAYER_LIST_SUCCESS, GET_PLAYER_LIST_FAILD, REQUEST_PLAYER_LIST} from '../consts'

export default {
  state: {
    listLoading: false,
    players: [],      //用户数据
    selectDelete: [],  //选中行
    editUserInfo:{},   //编辑用户
    total:1,
    page:1,
    pageShow:1000

  },
  mutations: {
    [GET_PLAYER_LIST_SUCCESS] (state, items) {
      state.listLoading = false
      state.players = items
      // state.total = items.total
    },
    [GET_PLAYER_LIST_FAILD] (state) {
      state.listLoading = false
      state.players = []
    },
    [REQUEST_PLAYER_LIST] (state) {
      state.listLoading = true
    }
  },
  actions: {
    async getPlayerList (store) {
      if (store.state.listLoading) {
        return
      }
      store.commit(REQUEST_PLAYER_LIST)
      try {
        let res = await Vue.api.get('/users', {
           params: {filter:{include:["wxInfo","sellerInfo"]}}
         })
        // console.log(res,"res")
        store.commit(GET_PLAYER_LIST_SUCCESS, res.data)
      } catch (e) {
        store.commit(GET_PLAYER_LIST_FAILD)
        throw e
      }
    },
    async findById (store,id) {
      if (store.state.listLoading) {
        return
      }
      if(!id) {
        store.dispatch('getPlayerList')
        return 
      } 
      store.commit(REQUEST_PLAYER_LIST)
      try {
        let res = await Vue.api.get('/users/'+id, {
            params: {filter:{include:["wxInfo","sellerInfo"]}}
         })
        store.commit(GET_PLAYER_LIST_SUCCESS, [res.data])
      } catch (e) {
        store.commit(GET_PLAYER_LIST_FAILD)
        throw e
      }
    },
    formatSex: function (row, column) {
      return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
    },
  },
  modules: { playerDetail }
}
