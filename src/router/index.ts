import { createRouter, createWebHashHistory } from 'vue-router'
// import ConstantRoutes from './constant-routes'
// import AsyncRoutes from './async-routes'

import routers_beforeEach from '@/router/routers_beforeEach'
const Layout = () => import('@/layout/index.vue')

/** 常驻路由 */
// export const constantRoutes = ConstantRoutes

/** 动态路由/异步路由 */
// export const asyncRoutes = AsyncRoutes

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '壹壹中控后台', icon: 'HomeFilled',  },
    redirect:'noRedirect',
    component: Layout,
    children: [{ path: '/', name: 'case', component: () => import('@/views/config/index.vue') }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  { path: '/:catchAll(.*)', meta: { title: '404' }, component: () => import('@/views/error/404.vue') }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}
router.beforeEach(routers_beforeEach)
export default router
