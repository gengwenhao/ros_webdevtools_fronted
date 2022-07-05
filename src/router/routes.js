import DevPanel from "@/views/layout/dev-panel/DevPanel"
import SolutionList from "@/views/layout/solution-list/SolutionList"
import CommandPanel from "@/views/layout/command-panel/CommandPanel"
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
        component: SolutionList,
        meta: {
          title: 'Solution List | ROS WEB DEVTOOLS'
        }
      },
      {
        path: '/dev-panel',
        name: 'devPanel',
        component: DevPanel,
        meta: {
          title: 'Development Panel | ROS WEB DEVTOOLS'
        }
      },
      {
        path: '/command-panel',
        name: 'commandPanel',
        component: CommandPanel,
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
