import Vue from 'vue'
export default {
  state: {
    listLoading: false,
    question: {
    	id:"",
			name: '',
			delivery: false,
			desc: '',
			Groups:[]
		},
    total:1,
    page:1,
    questionId:null,
    pageShow:1000

  },
  mutations: {
    GET_NEW_QUESTION_LIST_SUCCESS (state, items) {
      state.listLoading = false
      state.question = items
      state.questionId = items.id
    },
    GET_NEW_QUESTION_LIST_FAILD (state) {
      state.listLoading = false
      state.question.id = null
			state.question.name = '',
			state.question.delivery = false,
			state.question.desc = '',
			state.question.Groups =[]
			
    },
    REQUEST_NEW_QUESTION_LIST (state) {
      state.listLoading = true
    },
    SET_QUESTION_ID(state, questionid){
        state.questionId = questionid
    },
    ADD_ASK (state, {index,question}){
    	let id = state.question.Groups[index].questions.length + 1
    	question.index = id
    	state.question.Groups[index].questions.push(question)
    },
    ADD_GROUP (state, group) {
    	// console.log(group)
    	state.question.Groups.push(group)
    },
    DEL_ASK(state, {group,askIndex}){
      let _qusetions = state.question.Groups[group].questions
      let tmp = []
      _qusetions.map(askItem => {
        if(askItem.index == askIndex) return 
          tmp.push(askItem)
      })
      // console.log(_qusetions)
      state.question.Groups[group].questions = tmp
    },
    DEL_GROUP(state,index) {
    	let tmp = []	
    	state.question.Groups.map(item => {
    		if(item.index == index) return 
    			tmp.push(item)
    	})
    	state.question.Groups = tmp
    }
  },
  actions: {
    async getQuestionInfo (store) {
      if (store.state.listLoading) {
        return
      }
      if(!store.state.questionId) {
      	return 
      }
      let questionsid = store.state.questionId || ""
      store.commit("REQUEST_NEW_QUESTION_LIST")
      try {
        let res = await Vue.api.get('/Questions/'+questionsid, {
          
         })
        // console.log(res,"this is resut")
        store.commit("GET_NEW_QUESTION_LIST_SUCCESS", res.data)
      } catch (e) {
        store.commit("GET_NEW_QUESTION_LIST_FAILD")
        throw e
      }
    },
    async setQuestionId (store,id) {
      store.commit("SET_QUESTION_ID", id)
    },
    async deleteGourp (store,index) {
			store.commit("DEL_GROUP",index)

    },
    async addAsk (store,{name,select,index}) {
    	if(!store.state.question.Groups[index - 1]) {
    		return 
    	}
    	 store.commit("ADD_ASK",{
					index:index - 1,
					question:{name,select}
				})
    },
    async CommmitQuestion (store) {
      try{
        let url = "/Questions/createQuestion"
        let questionsid = store.state.questionId
        let quetsion = store.state.question
        quetsion.id = questionsid || null
        let res = await Vue.api.post(url, {
          params: quetsion
        })
        console.log("createQuestion",res)
        await store.dispatch('getQuestionInfo')
        return res.data
      }
      catch(e) {
        store.commit('SET_QUESTION_ID',null)
        return {isSucc:-1,msg:e.data.error.message}
      }
    },
    async deleteAsk (store,{groups,index}) {
      if(!store.state.question.Groups[groups-1]) {
        return 
      }
      let group = groups - 1
      let askIndex = index 
      store.commit("DEL_ASK",{group,askIndex})
    },
    async addGroup (store,{name,select}) {
    	let index = store.state.question.Groups.length + 1 
    	 store.commit("ADD_GROUP",{
    	 		title:name,
					index:index,
					select:select,
					questions:[]
				})
    }
 },
  modules: {  }
}
