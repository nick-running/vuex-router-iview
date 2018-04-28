import Vue from 'vue';
import Vuex from 'vuex'
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import store from './store/index';
import axios from 'axios'
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import url from './api/urls'
import dict from './api/dict'

import './libs/UE/ueditor.config.js'
import './libs/UE/ueditor.all.min.js'
import './libs/UE/lang/zh-cn/zh-cn.js'
import './libs/UE/ueditor.parse.min.js'

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Vuex)

let vueInstance
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);
Vue.prototype.$url = url
Vue.prototype.$dict = dict

axios.interceptors.request.use(function (config) {
  if (config.url.indexOf('/api/')!==-1&&localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  config.timeout = 5000;
  return config;
}, function (err) {
  console.log(err);
  return Promise.reject(err);
});
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // if(!response.data.issucess){
  //   console.log('response.data is:')
  //   console.log(response.data.msg)
  //   vueInstance.$Notice.warning({
  //     title: 'Notification title',
  //     desc: '请指定开始结束时间！'
  //   });
  // }
  // if(response.data.errno==401) {
  //   Vue.$messagebox.confirm('没有登录，是否前去登录？').then(action => {
  //     vueInstance.$router.push('/login')
  //   });
  // }
  return response;
}, function (error) {
  // vueInstance.$notify({group: 'warn', text: '数据未能正常访问'})
  // vueInstance.$messagebox('提示', '数据未能正常访问');
  // vueInstance.$indicator.close();

  if(error.message.indexOf('exceeded')===-1){
    vueInstance.$Message.error('连接出错')
  }
  console.log(error);
  return Promise.reject(error);
});
Vue.prototype.$axios = axios
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  // console.log(next)
  // console.log(`to data:`)
  router.app.$options.store.commit('breadcrumbUpdate', to.matched.map((item)=>{
    // console.log('item is:')
    // console.log(item)
    return item.meta.title
  }))
  Util.title(to.meta.title);
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  // console.log('loaded.')
  // console.log(router.app.$options.store.state.breadcrumbList)
  window.scrollTo(0, 0);
});

vueInstance = new Vue({
    el: '#app',
  store,
    router: router,
    render: h => h(App)
});
