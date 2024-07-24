import { createRouter, createWebHistory } from 'vue-router'

import MainPage from "@/pages/MainPage.vue"
import PostPage from "@/pages/PostPage.vue"

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      component: MainPage,
      alias: '/social'
    },
    {
      path: '/social/post/:id',
      component: PostPage
    }
  ]
})

export default router