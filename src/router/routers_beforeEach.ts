// import router from '@/router'
// import { useUserStore } from '@/store'
// import { usePermissionStore } from '@/store'
// import { Message } from '@arco-design/web-vue'
import { getToken } from '@/utils/auth'
import routers_add from '@/router/routers_add'
// import { isHttp } from '@/utils/validate'
// import type { RouteRecordRaw } from 'vue-router'

/** @desc 免登录白名单 */
const whiteList = ['/login', '/register']

let _state = false

// router.beforeEach(async (to, from, next) => {
//   // const userStore = useUserStore()
//   // const permissionStore = usePermissionStore()

//   // 判断该用户是否登录
//   if (getToken('_token')) {
//     if (to.path === '/login') {
//       // 如果已经登录，并准备进入 Login 页面，则重定向到主页
//       next({ path: '/' })
//     } else {
//       // 检查用户是否已获得其权限角色
//       // if (userStore.roles.length === 0) {
//       //   try {
//       //     // 获取用户信息
//       //     // await userStore.getInfo()

//       //     if (!hasAddRoutes) {
//       //       const accessRoutes = await permissionStore.generateRoutes()
//       //       console.log(accessRoutes, 'accessRoutes');

//       //       accessRoutes.forEach((route) => {
//       //         if (!route.path.startsWith('/')) {
//       //           route.path = `/${route.path}`
//       //         }
//       //         console.log(isHttp(route.path));

//       //         if (!isHttp(route.path)) {
//       //           router.addRoute(route) // 动态添加可访问路由表
//       //         }
//       //       })
//       //       hasAddRoutes = true // 设置标志变量
//       //     }
//       //     console.log(router.getRoutes());

//       //     next({ ...to, replace: true })
//       //   } catch (error) {
//       //     // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
//       //     userStore.resetToken()
//       //     Message.error(error.message || '路由守卫过程发生错误')
//       //     next('/login')
//       //   }
//       // } else {
//       //   next()
//       // }
//       next()
//     }
//   } else {
//     // 如果没有 Token
//     if (whiteList.indexOf(to.path) !== -1) {
//       // 如果在免登录的白名单中，则直接进入
//       next()
//     } else {
//       // 其他没有访问权限的页面将被重定向到登录页面
//       next('/login')
//     }
//   }
// })
export default (to: any, from: any, next: any) => {
  if (!getToken('_token')) {
    // 如果没有 token，且访问的页面需要权限（meta.power 为 true），则重定向到登录页
    if (to.meta.power) {
      next('/login')
    } else {
      next() // 否则放行
    }
  } else {
    // 如果有 token
    if (!_state) {
      // 如果状态未初始化，先进行初始化操作（例如加载路由）
      routers_add()
        .then((res) => {
          _state = true          
          if (to.path === '/login') {
            next() // 如果当前路径是登录页，则重定向到首页或其他适当的页面
          } else {
            next({ ...to, replace: true }) // 否则放行
          }
        })
        .catch((error) => {
          console.error('Failed to initialize state:', error)
          next('/login') // 初始化失败时，也重定向到登录页
        })
    } else {
      // 状态已初始化
      //   if (!to.meta.power) {
      //     next() // 如果访问的页面不需要权限，放行
      //   } else {
      //     next(false) // 如果访问的页面需要权限，但已经有 token，则阻止导航
      //   }
      next()
    }
  }
}
