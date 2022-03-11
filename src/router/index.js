import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Cookies from 'js-cookie'
import Home from '../views/Home.vue'
import store from '../store'

import myMusicRoutes from "@/router/modules/myMusic"
import recommendRoutes from "@/router/modules/recommend"
import SongListPage from "@/views/right-content/SongListPage"
import TracksPage from "@/views/right-content/songList/TracksPage"
import CommentPage from "@/views/right-content/songList/CommentPage"
import SubscriberPage from "@/views/right-content/songList/SubscriberPage"
import SongPage from "@/views/right-content/SongPage"

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: Home,
    children: [
        // 推荐
      ...recommendRoutes,
        // 我的音乐
      ...myMusicRoutes,

      {
        path: '/songList',
        component: SongListPage
      },
      {
        path: '/songList/:id',
        component: SongListPage,
        children: [
          {
            path: '/songList/:id/tracks',
            component: TracksPage
          },
          {
            path: '/songList/:id/comment',
            component: CommentPage
          },
          {
            path: '/songList/:id/subscriber',
            component: SubscriberPage
          }
        ]
      },
      {
        path: '/song',
        component: SongPage
      },

      {
        // 匹配所有路径  vue2使用*   vue3使用 /:pathMatch(.*)*  或/:pathMatch(.*)  或/:catchAll(.*)
        path: "/:pathMatch(.*)*",
        component: ()=>import('@/views/right-content/NotFoundPage'),
        props: route=>({
          id: route.query.id
        }),
        meta: {
          title: '此页面不存在'
        }
      }

    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // {
  //   path: '/dance',
  //   name: 'dance',
  //   component: Dance
  // },

  {
    // 匹配所有路径
    // vue2使用 *
    // vue3使用:
      // /:pathMatch(.*)*
      // /:pathMatch(.*)
      // /:catchAll(.*)
    path: "/:pathMatch(.*)*",
    component: ()=>import('@/views/right-content/NotFoundPage'),
    meta: {
      title: '此页面不存在'
    }
  },

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if ( to.meta && to.meta['auth'] ){
    const userId = Cookies.get('userId')
    if ( userId ){
      next()
    }else {
      // 没有登录，就直接把 登录框显示
      store.commit('setIsShowLoginWindow',true)
    }
  }else {
    // 不需要验证 就直接放行
    next()
  }
})

router.afterEach((to)=>{
  if ( to.meta && to.meta['title'] ){
    document.title = to.meta['title']
  }
})


export default router
