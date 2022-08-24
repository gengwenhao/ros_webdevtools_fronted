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
      {
        path: '/solution-list',
        name: 'solutionList',
        component: () => import('@/views/layout/solution-list/SolutionList'),
        meta: {
          title: 'Solution List | ROS WEB DEVTOOLS',
          keepAlive: true
        }
      },
      {
        path: '/dev-panel',
        name: 'devPanel',
        component: () => import('@/views/layout/dev-panel/DevPanel'),
        meta: {
          title: 'Development Panel | ROS WEB DEVTOOLS'
        }
      },
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
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
]
