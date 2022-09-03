import Layout from '@/views/layout/Layout'

export default [
  {
    path: '',
    name: 'home',
    redirect: '/solution-list',
    component: Layout,
    meta: {
      title: 'Home | ROS WEB DEVTOOLS'
    },
    children: [
      // 解决方案列表
      {
        path: '/solution-list',
        name: 'solutionList',
        component: () => import('@/views/layout/solution-list/SolutionList'),
        meta: {
          title: 'Solution List | ROS WEB DEVTOOLS',
          keepAlive: true
        }
      },

      // 开发者页面
      {
        path: '/dev-panel/:solutionID',
        name: 'devPanel',
        component: () => import('@/views/layout/dev-panel/DevPanel'),
        meta: {
          title: 'Development Panel | ROS WEB DEVTOOLS'
        }
      },

      // 观察者（非登录人员）页面
      {
        path: '/viewer-panel/:uuid',
        name: 'viewerPanel',
        component: () => import('@/views/layout/dev-panel/ViewerPanel'),
        meta: {
          title: 'Viewer Panel | ROS WEB DEVTOOLS'
        }
      },

      // ssh页面
      {
        path: '/command-panel',
        name: 'commandPanel',
        component: () => import('@/views/layout/command-panel/CommandPanel'),
        meta: {
          title: 'Command Panel | ROS WEB DEVTOOLS'
        }
      }
    ]
  },

  // 全局 404 页面
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404')
  },

  // 全局未匹配跳转 404 页面
  {
    path: '*',
    redirect: '/404'
  }
]
