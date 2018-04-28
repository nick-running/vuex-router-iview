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
      title: '攻略管理'
    },
    component: (resolve) => require(['./views/skills/skill_list'], resolve)
  },
  {
    path: '/skills',
    component: main_layout,
    meta: { title: '攻略|技巧管理' },
    children: [
      {
        path: 'skill-list',
        meta: {
          title: '攻略|技巧列表'
        },
        component: (resolve) => require(['./views/skills/skill_list'], resolve)
      },
      {
        path: 'sill-add',
        meta: {
          title: '新增攻略|技巧'
        },
        component: (resolve) => require(['./views/skills/skill-editor'], resolve)
      },
      {
        path: 'classify',
        component: (resolve) => require(['./views/classify/classify_list'], resolve),
        meta: { title: '分类管理' }
      },
      {
        path: 'classify/add',
        component: (resolve) => require(['./views/classify/classify_editor'], resolve),
        meta: { title: '新增分类' }
      }
    ]
  }
];
export default routers;