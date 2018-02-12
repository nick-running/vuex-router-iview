import main_layout from './components/layout/main_layout.vue';
const routers = [
  // {
  //   path: '/',
  //   meta: {
  //     title: 'NetSight dashboard'
  //   },
  //   component: (resolve) => require(['./views/index.vue'], resolve)
  // },
  {
    path: '/',
    meta: {
      title: 'gggg管理'
    },
    component: (resolve) => require(['./views/skills/list-page'], resolve)
  },
  {
    path: '/skills',
    component: main_layout,
    meta: { title: 'gggg|jjjj管理' },
    children: [
      {
        path: 'skill-list',
        meta: {
          title: 'gggg|jjjj列表'
        },
        component: (resolve) => require(['./views/skills/list-page'], resolve)
      },
      {
        path: 'sill-add',
        meta: {
          title: '新增gggg|jjjj'
        },
        component: (resolve) => require(['./views/skills/sill-add'], resolve)
      },
      // {
      //   path: 'realTimeFullWebProtocolDistribution',
      //   meta: {
      //     title: '实时全网协议分布'
      //   },
      //   component: (resolve) => require(['./views/visualization/real_time_full_web_protocol_distribution.vue'], resolve)
      // },
      // {
      //   path: 'historyFullWebHostTrafficTopN',
      //   meta: {
      //     title: '历史全网主机流量Top N'
      //   },
      //   component: (resolve) => require(['./views/visualization/history_full_web_host_traffic_topN.vue'], resolve)
      // },
      // {
      //   path: 'HistoricalProtocolDistributionTopN',
      //   meta: {
      //     title: '历史协议分布TopN'
      //   },
      //   component: (resolve) => require(['./views/visualization/historical_protocol_distribution_topN.vue'], resolve)
      // }
      // {
      //   // 当 /user/:id/posts 匹配成功
      //   // UserPosts 会被渲染在 User 的 <router-view> 中
      //   path: 'posts',
      //   component: UserPosts
      // }
    ]
  }
];
export default routers;