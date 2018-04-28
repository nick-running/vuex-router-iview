import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import conditions from './modules/conditions'
import webSocket from './modules/websocket'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    conditions: conditions,
    webSocket: webSocket
  },
  state: {
    breadcrumbList: [],
    notification: {
      order: 0
    },
    tableNoList: [],
    navIndex: 'orderList', // 导航索引
  },
  getters: {
    // getToken: () =>{
    //   return localStorage.getItem('token')
    // }
    getStatNumList: state => (params)=> { // 根据传入参数获取下拉选择数
      let startNum = 5, maxNum = 10, stepNum = 5, unit = '个', dropDownList = []
      if(params) {
        startNum = params.startNum || 5
        stepNum = params.stepNum || 5
        maxNum = params.maxNum || 10
        unit = params.unit || '个'
      }
      for(let i=startNum;i<=maxNum;i+=stepNum){
        dropDownList.push({label: i+unit, value: i})
      }
      return dropDownList
    }
  },
  mutations: {
    breadcrumbUpdate(state, breadcrumbList){
      state.breadcrumbList = breadcrumbList
    },
    initTableNoList(state, tableNoList){ // 桌号初始化
      state.tableNoList = tableNoList
    },
    notifyOrder(state, type){
      state.notification.order = type // 0为默认不处理，1为新订单，2为新外卖订单，3为通知更新
    },
    navUpdate(state, index) {
      state.navIndex = index
    },
    setClassifyCond(state, classifyList){
      state.conditions.classifyList = classifyList
    }
  },
  actions: {
    setClassifyCond(context, params) {
      const vueInstance = params.vueInstance
      vueInstance.$axios({
        method: 'post',
        url: vueInstance.$url.CLASSIFY_LIST,
      }).then((resp)=>{
        if(!resp.data.errno) {
          if(resp.data.data.length>0) {
            context.commit('setClassifyCond', resp.data.data.map(item=>{return {label: item.name, value: item.id}}))
          }
        }else{
          vueInstance.$Message.info(resp.data.msg);
          console.log(resp.data.msg)
        }
      }).catch(function (err) {
        vueInstance.$Message.error(err.message)
        console.log('err.message is:')
        console.log(err.message)
      });
    },
    fetchStat(context, params) {
      if(params.preData&&params.preData.dateTimeRange&&params.preData.dateTimeRange[0]) {
        params.data.startTime = params.vueInstance.$moment(params.preData.dateTimeRange[0]).format('YYYY-MM-DD HH:mm:ss')
        params.data.endTime = params.vueInstance.$moment(params.preData.dateTimeRange[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      const loadStartTime = new Date()
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          data: params.data,
          url: params.url,
        }).then((resp)=>{
          if(!resp.data.errno) {
            resolve(resp.data)
          }else{
            resolve(resp.data)
            params.vueInstance.$Message.info(resp.data.msg);
            console.log(resp.data.msg)
          }
        }).catch(function (err) {
          if (err.response) {
            console.log('response err status: '+err.response.status)
            console.log(err.response.data);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log('err.request: ')
            console.log(err.request);
          } else {
            console.log('Error', err.message);
          }
          if(err.message.indexOf('exceeded')!==-1){
            // params.vueInstance.$Message.error('请求超时')
          // }else{
            params.vueInstance.$Message.error(err.message)
          }
          console.log('err.message is:')
          console.log(err.message)
          reject(err)
          // console.log('src/store.js:76 catch exception')
          // console.log(err)
        });
      })
    }
  }
})