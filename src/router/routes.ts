import { RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: HomePage,
  },
] as Array<RouteRecordRaw>

export default routes
