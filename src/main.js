import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import api from './plugins/api'
import VueRouter from 'vue-router'
import store from './vuex'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
import { sync } from 'vuex-router-sync'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(api)
NProgress.configure({ showSpinner: false });

const router = new VueRouter({routes})

sync(store, router)

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path == '/login') {
    return next()
  }
  let userStatue = router.app.$store.state.user
  let user = sessionStorage.getItem('account');
  if(!user) {
    return next({ path: '/login' })
  }
  if(!userStatue.accessToken || !userStatue.user) {
    user = JSON.parse(user)
    userStatue.accessToken = user.accessToken
    userStatue.user = user.id
  }
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

