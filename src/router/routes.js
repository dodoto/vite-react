import Player from 'views/Player/index'
import NotFound from 'views/NotFound/index'
import JikanSearch from 'views/JikanSearch'

const routes = [
  {
    path: '/player',
    name: 'Player',
    component: Player,
    exact: true,
    title: '音乐'
  },
  {
    path: '/jikan-search',
    name: 'JikanSearch',
    component: JikanSearch,
    exact: true,
    title: 'Jikan 搜索'
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    exact: false,
    title: '404'
  }
]

export default routes