import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: { title: '首页',icon: 'HomeFilled' },
    component: Layout,
    children: [{ path: '/', name: 'case', component: () => import('@/views/config/index.vue') }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/views/error/404.vue'),
  //   meta: { hidden: true }
  // },
  // {"path": '/:catchAll(.*)',"meta":{"title":"404"}, component: () => import('@/views/error/404.vue')},
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/config',
  //   children: [
  //     {
  //       path: '/home',
  //       component: () => import('@/views/home/index.vue'),
  //       name: 'Index',
  //       meta: { title: '首页', icon: 'icon-dashboard', affix: true, svgIcon: 'menu-home' }
  //     }
  //   ]
  // },
  // {
  //   path: '/home',
  //   component: Layout,
  //   redirect: '/home',
  //   name: 'home',
  //   children: [
  //     {
  //       path: '/home',
  //       component: () => import('@/views/home/index.vue'),
  //       name: 'Index',
  //       meta: { title: '首页', icon: 'icon-dashboard', affix: true, svgIcon: 'menu-home' }
  //     }
  //   ]
  // },
]

export default constantRoutes
