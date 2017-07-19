import axios from 'axios'
import store from '../vuex'
import Vue from 'vue'
//let instance = axios
var appConfig = require('../appConfig.js')
let instance = axios.create({
  baseURL: appConfig.baseURL,
  //baseURL: 'http://wx.mahjong.haowan98.com/api',
  timeout: 10000
 })

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (store.state.user.accessToken) {
    config.headers.common['Authorization'] = store.state.user.accessToken
  }
  return config
}, function (error) {
  // Do something with request error

  return Promise.reject(error)
})
instance.interceptors.response.use(response=>{
    return response
},error => {
  if(error.response.data.error.statusCode == 401) {
     store.dispatch('logout') 
  }
  return Promise.reject(error.response)   // 返回接口返回的错误信息
})

export default {
  install (Vue) {
    Vue.prototype.$api = instance
    Vue.api = instance
  },
  instance
}
