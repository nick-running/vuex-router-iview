// const PREFIX = 'http://127.0.0.1:8899/'
// const PREFIX_PUSH = '/api_push/'
// const PREFIX_MOCK = '/api_mock'
// const PREFIX = 'http://www.love-jocks.com/'
// const PREFIX = '/api_merchants/'
// const PREFIX = '/api-jock/'
// const PREFIX = '/api/'
// const PREFIX = '/api_mock/' // 模拟数据
const PREFIX = '/api/'
export default {
  // Socket发送数据自定义地址
  WS_RTFWHTTN: 'RTFWHTTN',
  // SOCKET_URL: PREFIX + '',
  // 商家登录
  // USER_LOGIN: PREFIX + 'merchant_user/login',

  PRODUCT_LIST: PREFIX + 'product/list',
  PRODUCT_ADD: PREFIX + 'product/add',
  PRODUCT_DELETE: PREFIX + 'product/delete',

  // // 桌号管理
  // TABLE_LIST: PREFIX + 'table_no/index',
  // TABLE_ADD: PREFIX + 'table_no/add',
  // TABLE_DELETE: PREFIX + 'table_no/delete',
  //
  // 分类管理
  CLASSIFY_LIST: PREFIX + 'classify/list',
  CLASSIFY_ADD: PREFIX + 'classify/add',
  CLASSIFY_DELETE: PREFIX + 'classify/delete',
  //
  // // 订单管理
  // // ORDER_PUSH: PREFIX_PUSH + 'publish', // 通知订单
  // ORDER_LIST: PREFIX + 'order/list', // 订单列表，传入状态参数
  // ORDER_ADD: PREFIX + 'merchant_user/add', // 订单列表，传入状态参数
  // ORDER_UPDATE: PREFIX + 'merchant_user/superadditionOrder', // 追加订单
  // LISTEN_ORDER: PREFIX + 'order/listenOrder', // 订单列表，传入状态参数
  //
  // // 订单详情管理
  // ORDER_UPDATE_STATUS: PREFIX + 'order/updateStatus', // 订单数据更新状态
  // ORDER_DETAIL_UPDATE_STATUS: PREFIX + 'order_detail/updateStatus' // 详细数据更新状态
}
