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
    },
    // 登录页
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/loginPage/loginPage.vue")
    },
    // 搜索页
    {
      path: "/search",
      name: "Search",
      component: () => import("@/views/searchPage/searchPage.vue"),
      meta: {
        searchButton: "true"
      }
    },
    // 列表页
    {
      path: "/list",
      name: "List",
      component: () => import("@/views/listPage/listPage.vue"),
      meta: {
        home: "true",
        list: "true"
      }
    },
    // 详情页
    {
      path: "/detail",
      name: "Detail",
      component: () => import("@/views/detailPage/detailPage.vue"),
      meta: {
        detail: true
      }
    }
  ]
})

export default router
