import DevPanel from "@/views/dev-panel/DevPanel"
import SolutionList from "@/views/solution-list/SolutionList"

export default [
  {
    path: '/',
    redirect: '/solution-list',
    meta: {
      title: 'Home | ROS WEB DEVTOOLS'
    }
  },
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
    path: '*',
    redirect: '/dev-panel'
  }
]