export default {
  state: {
    sortByList: [ // 按最高还是最低排序
      {label: '最高的', value: 'DESC'},
      {label: '最低的', value: 'ASC'}
    ],
    // statNumList: [ // 统计个数
    //   {label: '10个', value: '10'},
    //   {label: '20个', value: '20'}
    // ],
    statisticalObjectList: [ // 统计对象
      {label: '数据传输率 bps', value: 'bps'},
      {label: '数据包传输率 pps', value: 'pps'},
      {label: '并发连接数', value: 'flows'}
    ],
    hostNoteList: [ // 主机节点
      {label: '主机', value: 'host'},
      {label: '节点', value: 'node'},
    ],
    protocolList: [
      {label: '网络层协议', value: '1'},
      {label: '应用层协议', value: '2'}
    ],
    statWayList: [ // 展现方式
      {label: '柱状图', value: 'bar'},
      {label: '折线图', value: 'line'},
      {label: '环形图', value: 'pie'}
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
}