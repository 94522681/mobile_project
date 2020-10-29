import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import layout from '@/views/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/',
    component: layout,
    children: [{
      path: '/',
      component: () => import('@/views/home')
    }, {
      path: '/wenda',
      component: () => import('@/views/wenda')
    }, {
      path: '/my',
      component: () => import('@/views/my')
    }, {
      path: '/video',
      component: () => import('@/views/video')
    }]
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
