import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import PlayerList from './views/nav1/PlayerList.vue'
import Form from './views/nav1/Form.vue'
import playerDetail from './views/nav1/playerDetail.vue'
import gameManager from './views/Manager/gameManager.vue'
import roomManager from './views/Manager/roomManager.vue'
import orderManager from './views/Manager/orderManager.vue'
import applyManager from './views/Manager/applyManager.vue'

import Question from './views/Question/Question.vue'
import myQuestion from './views/Question/myQuestion.vue'
import newQuestion from './views/Question/newQuestion.vue'

import questionShow from './views/Question/questionShow.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '玩家管理',
        iconCls: 'el-icon-message',//图标样式class
        hidden: false, 
        children: [
           // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: PlayerList, name: '玩家列表' },
            // { path: '/form', component: Form, name: 'Form',hidden: true },
            { path: '/playerDetail', component: playerDetail, name: '房卡消费', hidden: true},
        ]
    },
     {
        path: '/',
        component: Home,
        name: '问卷管理',
        iconCls: 'el-icon-message',//图标样式class
        hidden: false, 
        children: [
           // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/Question', component: Question, name: '问卷列表' },
            { path: '/newQuestion', component: newQuestion, name: '问卷', hidden: true},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '游戏管理',
        iconCls: 'fa fa-id-card-o',
        hidden: true,   //TODO 关闭功能
        children: [
            { path: '/gameManager', component: gameManager, name: '服务器管理' },
            { path: '/roomManager', component: roomManager, name: '房间管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '游戏服务管理',
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        hidden: true,   //TODO 关闭功能
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
     {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/applyManager', component: applyManager, name: '提现审核' },
            { path: '/orderManager', component: orderManager, name: '订单查询' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        hidden: true,
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;