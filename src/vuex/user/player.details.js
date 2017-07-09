import Vue from 'vue'
import {GET_PLAYER_DETAILS_SUCCESS, GET_PLAYER_DETAILS_FAILD, REQUEST_PLAYER_DETAILS, REQUEST_APPLY} from '../consts'
import { SET_PLAYER_ID } from '../consts'
import {GET_PLAYER_DETAILS_ORDER_SUCCESS, GET_PLAYER_DETAILS_ORDER_FAIL } from '../consts'
import {GET_PLAYER_FAILD, GET_PLAYER_SUCCESS, FINSH_REQUEST } from '../consts'

export default {
  state: {
    isFetching: false,
    historyIsFetcing:false,
    userId:null,
    OrderHistory:[],
    players:[],
    playerInfo:{},
    tableShowName: "cost",
    pageShow:1000
  },
  mutations: {
    [GET_PLAYER_DETAILS_SUCCESS] (state,playerInfo) {
      state.isFetching = false
      state.playerInfo = playerInfo
    },
    [GET_PLAYER_SUCCESS] (state,players) {
      state.isFetching = false
      state.players = players
      players.map(player=>{
        let total = 0
        player.total = 0
        let orders = player.orders || []
        orders.map(order => {
          if(order.status === 1)
            total += order.amount
          })
        player.total = total
      })
    },
    [GET_PLAYER_FAILD] (state) {
      state.isFetching = false
      state.players = []
    },
    [SET_PLAYER_ID] (state,id) {
      state.userId = id
    },
    [GET_PLAYER_DETAILS_FAILD] (state) {
      state.isFetching = false
      state.playerInfo = null
    },
    [REQUEST_PLAYER_DETAILS] (state) {
      state.isFetching = true
      state.playerInfo = null
    },
    [REQUEST_APPLY] (state) {
      state.isFetching = true
    },
    [FINSH_REQUEST] (state) {
      state.isFetching = false
    },
    [GET_PLAYER_DETAILS_ORDER_FAIL] (state) {
      state.isFetching = false
      state.OrderHistory = []
    },
    [GET_PLAYER_DETAILS_ORDER_SUCCESS] (state,orders) {
      state.isFetching = false
      state.OrderHistory = orders.reverse()
    }
  },
  actions: {
    async getPlayerDetails (store,id) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_PLAYER_DETAILS)
      try {
        let res = await Vue.api.get('/users/'+id,{
          params: {filter:{include:[{"wxInfo":{"seller":{"uplevel":"wxInfo"}}}]}}
        })
        store.commit(GET_PLAYER_DETAILS_SUCCESS,res.data)
      } catch (e) {
        store.commit(GET_PLAYER_DETAILS_FAILD)
        throw e
      }
    },
    setPlayerDetails (store,id) {
      if (store.state.isFetching) {
        return
      }
      if(!id) {
        return 
      }
      store.commit(SET_PLAYER_ID,id)
    },
    async changePlayer (store, sendData) {
      if (store.state.isFetching) {
        return
      }
      if(!store.state.userId){
        return
      }
      if(!store.state.userId){
          return false
      }
      if(!store.state.playerInfo){
        return false
      }
      if(!store.state.playerInfo.wxInfo || !store.state.playerInfo.wxInfo.seller){
        return false
      }
      sendData.fromSellerId = store.state.playerInfo.wxInfo.seller.id
      if(sendData.fromSellerId === sendData.sellerId){
        return {isSucc:-1, msg:"已经是你推广的玩家了"}
      }
      store.commit(REQUEST_APPLY)
      try{
        let res = await Vue.api.post(`/AdminInfos/${store.rootState.user.user}/changePlayer/`,{
         sendData
        })
        console.log(res)
        store.commit(FINSH_REQUEST)
        return res.data
      }
      catch(e){
        store.commit(FINSH_REQUEST)
        return {
          isSucc:-1,
          msg:"error"
        }
      }
    },
    async getSellerDownPlayerInfo (store,number) {
        // 获得该推官员下的所有玩家
      try{
        if (store.state.isFetching) {
          return false
        }
        if(!store.state.userId){
          return false
        }
        if(!store.state.playerInfo){
          return false
        }
        if(!store.state.playerInfo.wxInfo || !store.state.playerInfo.wxInfo.seller){
          return false
        }
        let sellerId = store.state.playerInfo.wxInfo.seller.id
        let ret = await Vue.api.get('/SellerInfos/' + sellerId +"/players", {
          params: {filter:{include:"orders"}}
        })
        store.commit(GET_PLAYER_SUCCESS,ret.data)
      }catch(e) {
          store.commit(GET_PLAYER_FAILD)
      }
      return true
    },
    async getPlayerOrderHistory (store) {
      if (store.state.isFetching) {
        return
      }
      if(!store.state.userId){
        return
      }
     store.commit(REQUEST_APPLY)
      try{
        let ret = await Vue.api.get('/Orders', {
           params: {filter:{where:{"userId":store.state.playerInfo.wxInfo.wxUnionid}}}
         })
        store.commit(GET_PLAYER_DETAILS_ORDER_SUCCESS,ret.data)
      }
      catch(e){
        console.error(e)
        store.commit(GET_PLAYER_DETAILS_ORDER_FAIL)
      }
    }
  }
}
