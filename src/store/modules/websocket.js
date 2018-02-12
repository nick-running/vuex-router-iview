export default {
  state: {
    socket: null,
    // connectedCount: 0, // 连接数统计，被connectPool.length替代
    connectPool: [], // 连接池，如果有会被加入
    notify: {
      // status: false, // 通知有数据接受的状态
      targetsStatus: { // 通知目标状态，被通知页面监听要被通知的状态
        earlyWarning: false, // 预警
        RTFWHTTN: false // 实时全网主机流量Top N
      },
      msg: [
        // {
        //   key: '',
        //   isRead: false,
        //   content: null
        // }
      ]
    }
  },
  mutations: {
    initSocket(state, socket) {
      state.socket = socket
    }
  },
  actions: {
    initSocket({ dispatch, commit, state }) {
      console.log('init socket...')
      let socket = state.socket
      if(!socket) {
        if ('WebSocket' in window) {
          socket = new WebSocket("ws://192.168.3.28:8080/ICSinSinght/websocket/socketServer.do")
          commit('initSocket', socket)
          console.log('WebSocket connecting...')
        } else if ('MozWebSocket' in window) {
          socket = new MozWebSocket("ws://192.168.3.28:8080/ICSinSinght/websocket/socketServer.do")
          commit('initSocket', socket)
          console.log('MozWebSocket connecting...')
        } else {
          socket = new SockJS("ws://192.168.3.28:8080/ICSinSinght/sockjs/socketServer.do")
          commit('initSocket', socket)
          console.log('SockJS connecting...')
        }
        socket.onopen = function (event) {
          dispatch('socket_onOpen', event)
        }
        socket.onmessage = function (event) {
          console.log('onmessage .............')
          dispatch('socket_onMessage', event)
        }
        socket.onerror = function () {
          dispatch('socket_onError')
        }
        socket.onclose = function () {
          dispatch('socket_onClose')
        }
      }else{
        console.log('Socket 被重复初始化！！！')
      }
    },
    socket_onOpen(ctx, event){
      console.log('WebSocket on open')
      console.log(event)
    },
    socket_onMessage(ctx, event){
      console.log('socket_onMessage is:')
      console.log(event)
      const abc = event.data;
      let data = JSON.parse(abc);
      ctx.state.notify.targetsStatus.RTFWHTTN = true
      ctx.state.notify.msg.push({
        key: '',
        isRead: false,
        content: data
      })
      // ctx.state.msg.content = j
    },
    socket_onError(ctx, err) {

    },
    socket_onClose(ctx, event) {

    },
    socket_sendMsg(ctx, params) { // 发送数据
      // console.log('ctx.state.socket is:')
      // console.log(ctx.state.socket)
      const socket = ctx.state.socket
      if (socket.readyState === socket.OPEN) {
        console.log('发送数据')
        console.log(params)
        socket.send(JSON.stringify(params))
        // ctx.state.connectPool.add()
      }
    }
  },
  getters: {}
}