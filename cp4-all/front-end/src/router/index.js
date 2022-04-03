import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Detach from '../views/Detach.vue'
import Likes from '../views/Likes.vue'
import Bucket from '../views/Bucket.vue'
import Admin from '../views/Admin.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detach',
    name: 'Detach',
    component: Detach //component imported above
  },
  {
    path: '/likes',
    name: 'Likes',
    component: Likes
  },
  {
    path: '/bucket_list',
    name: 'Bucket_list',
    component: Bucket
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
