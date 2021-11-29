import Home from "@/views/home/Home"
import DevPanel from "@/views/dev-panel/DevPanel"

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home | ROS WEB DEVTOOLS'
    }
  },
  {
    path: '/dev-panel',
    name: 'DevPanel',
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