import router from '@/router'
import { useUserStore } from '@/store'
import { getUserRoutes } from '@/api/index'
import { useAxios } from '@/hooks'
let modules = import.meta.glob('../**/*.vue')

export default function routers_add() {
  return new Promise((resolve) => {
    const userStore = useUserStore()
    const { onSuccess, onError } = useAxios(getUserRoutes, {
      immediate: true
    })
    onSuccess((res: any) => {
      userStore.SetNavList(filterRoutes(res.data.routesMap))      
      userStore.SetUserInfo(res.data.userInfo)
      resolve(true)
    })
    onError((error: any) => {    
      console.log(error, '添加路由报错');
      userStore.logout()
    })
  })
}

function filterRoutes(routeJson: any, _path = '') {
  const Rdate: any = []
  routeJson.forEach((route: any) => {
    let tmp: any = {}
    tmp = RouterCom(route, _path)
    if (route.hasOwnProperty('children') && route.children?.length > 0) {      
      const tmpC = filterRoutes(route['children'], route?.path)
      tmpC.length > 0 && (tmp.children = tmpC)
    }
    if (tmp.hasOwnProperty('children') && !tmp.component) tmp.redirect = tmp.children[0].path
    router.addRoute(route.where || 'home', tmp)
    Rdate.push(tmp)
  })
  return Rdate
}

function RouterCom(item: any, _path: any) {  
  return {
    path: (_path ? '/' + _path : '') + '/' + item.path,
    name: item.path,
    meta: {
      title: item.name,
      icon: item.icon,
      NotKeepAlive: item.NotKeepAlive || false,
      buttons: item.buttons,
    },
    component: modules[`../views/${(_path ? _path + '/' : '') + item.path}/index.vue`]
  }
}
