import Player from 'views/Player/index'
import Lower from 'views/Lower/index'

const routes = [
  {
    path: '/',
    component: Lower
  },
  {
    path: '/player',
    component: Player
  }
]

export default routes