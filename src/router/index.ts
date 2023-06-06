import { createRouter, createWebHistory } from 'vue-router'
// 导入 首页
import Home from "@/views/homePage/homePage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    // 首页
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        home: "true"
      }
    },
    // 分类页
    {
      path: "/cate",
      name: "Cate",
      component: () => import("@/views/catePage/catePage.vue"),
      meta: {
        search: "true"
      }
    },
    // 购物车页
    {
      path: "/cart",
      name: "Cart",
      component: () => import("@/views/cartPage/cartPage.vue")
    },
    // 个人中心
    {
      path: "/center",
      name: "Center",
      component: () => import("@/views/centerPage/centerPage.vue"),
      meta: {
        homeIcon: "true"
      }
    }
  ]
})

export default router
