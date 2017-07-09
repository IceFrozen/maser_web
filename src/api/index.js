import Vue from 'vue'
import Promise from 'bluebird'

export const wxLogin = (store, wxCode) => {
  return Vue.api.post("users/loginWithWechat",{wxCode})
    .then(res => {
      const body = res.body
      const accessToken = body.id
      const userid = body.userId
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export const getLinkList = () => {

}



export const getPlayerList = (params) => {
	//export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
	return Vue.api.post("/user/list",{ params })
    .then(res => {
     		console.log(res.body)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}
