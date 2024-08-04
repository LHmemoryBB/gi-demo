import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
// import router, { constantRoutes, asyncRoutes as dynamicRoutes } from '@/router'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import { getUserRoutes } from '@/api/index'
import Has from '@/utils/has'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRoutes: RouteRecordRaw[], lastRouter: boolean | RouteRecordRaw = false, type = false) {
  return asyncRoutes.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component && typeof route.component === 'string') {
      // Layout ParentView 组件特殊处理
      if (route['component'] === 'Layout') {
        route['component'] = Layout as never
      } else if (route['component'] === 'ParentView') {
        route['component'] = ParentView as never
      } else {
        route['component'] = loadView(route['component']) as never
      }
    }
    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenRoutes: RouteRecordRaw[], lastRouter: boolean | RouteRecordRaw = false) {
  let children: RouteRecordRaw[] = []
  childrenRoutes.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (typeof el.component === 'string' && el['component'] === 'ParentView' && !lastRouter) {
        ;(el['children'] as RouteRecordRaw[]).forEach((c: RouteRecordRaw) => {
          c.path = el['path'] + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter && typeof lastRouter === 'object') {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: RouteRecordRaw[]) {
  const arr: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.meta?.permissions) {
      if (Has.hasPermOr(route.meta?.permissions)) {
        arr.push(route)
      }
    } else if (route.meta?.roles) {
      if (Has.hasRoleOr(route.meta?.roles)) {
        arr.push(route)
      }
    }
  })
  return arr
}

// 加载模块
export const loadView = (view: string) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

const storeSetup = () => {
  const routes = ref<RouteRecordRaw[]>([]) // 常驻路由 + 动态路由（这时候component已经从字符串转为模块）
  const topbarRoutes = ref<RouteRecordRaw[]>([]) // 页签路由
  const sidebarRoutes = ref<RouteRecordRaw[]>([]) // 侧边栏路由

  // const setRoutes = (routesArray: RouteRecordRaw[]) => {
  //   routes.value = constantRoutes.concat(routesArray)
  // }

  const setTopbarRoutes = (routes: RouteRecordRaw[]) => {
    topbarRoutes.value = routes
  }

  const setSidebarRoutes = (routes: RouteRecordRaw[]) => {
    sidebarRoutes.value = routes
  }

  /** 生成路由 */
  // const generateRoutes = (): Promise<RouteRecordRaw[]> => {
  //   console.log('没走这里吧');

  //   return new Promise((resolve) => {
  //     // 向后端请求路由数据
  //     getUserRoutes().then((res) => {
  //       console.log('走这里了吗');

  //       const sdata = JSON.parse(JSON.stringify(res.data.routesMap))
  //       const rdata = JSON.parse(JSON.stringify(res.data.routesMap))
  //       const defaultData = JSON.parse(JSON.stringify(res.data.routesMap))

  //       const sidebarRoutes = filterAsyncRouter(sdata)
  //       const rewriteRoutes = filterAsyncRouter(rdata, false, true)
  //       const defaultRoutes = filterAsyncRouter(defaultData)

  //       const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
  //       asyncRoutes.forEach((route) => {
  //         router.addRoute(route)
  //       })

  //       setRoutes(rewriteRoutes)
  //       console.log('常驻路由constantRoutes', constantRoutes)
  //       setSidebarRoutes(constantRoutes)
  //       setTopbarRoutes(defaultRoutes)
  //       resolve(rewriteRoutes)
  //     })
  //   })
  // }

  return {
    routes,
    topbarRoutes,
    sidebarRoutes
    // generateRoutes
  }
}

export const usePermissionStore = defineStore('permission', storeSetup, { persist: true })
