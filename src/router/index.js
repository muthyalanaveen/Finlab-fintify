import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/pages/Home.vue'
import PageNotFound from '@/components/pages/PageNotFound.vue'
import Landing from '@/components/pages/Landing.vue'
import { PAGE_TITLES } from 'branding/strings.json'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: {
      title: 'Landing'
    }
  },
  {
    path: '*',
    component: PageNotFound,
    meta: {
      title: PAGE_TITLES.PAGE_NOT_FOUND
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const meta = document.createElement('meta')

  meta.name = 'description'
  meta.content = 'description'
  document.getElementsByTagName('head')[0].appendChild(meta)
  document.title = to.meta.title

  next()
})

export default router
