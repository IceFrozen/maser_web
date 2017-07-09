import Vue from 'vue'
import playerList from './user/player.list'
import { requestLogin } from '../api/api';
import {USER_SIGNIN, USER_SIGNOUT, UPDATE_USER_COIN} from './consts'
import Promise from 'bluebird'
export default {
  state: {
    user: null,
    accessToken: null,
  },
  mutations: {
    [USER_SIGNIN] (state, user) {
      state.accessToken = user.id
      state.user = user.userId
    },
    [USER_SIGNOUT] (state) {
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  actions: {
    async login ({commit, rootStore,dispatch}, user) {
      let ret = await Vue.api.post("/users/login",user)
      if(!ret.data.userId){
        return 
      }
      commit(USER_SIGNIN, ret.data)
      window.sessionStorage.setItem("account",JSON.stringify({id:ret.data.userId,accessToken:ret.data.id}))
      return ret.data
    
    },
    reconnect: (store,accessToken) => {
        
    },
    logout ({commit}) {
       window.sessionStorage.removeItem("account")
       commit(USER_SIGNOUT)
    }
  },
  modules: { playerList }
}
