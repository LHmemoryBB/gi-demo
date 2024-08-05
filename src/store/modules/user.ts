import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
// import { resetRouter } from '@/router'
import { getUserInfo as loginApi, logout as logoutApi } from '@/api/index'
import { setToken, removeToken, getToken } from '@/utils/auth'

const storeSetup = () => {
  const userInfo = ref({
    name: '',
    avatar: ''
  })
  let NavList = ref([])
  const userName = computed(() => userInfo.value.name)
  const avatar = computed(() => userInfo.value.avatar)
  const token = ref<string>(getToken('_token') || '')
  const roles = ref<string[]>([]) // 当前用户角色
  const permissions = ref<string[]>([]) // 当前角色权限标识集合

  // 重置token
  const resetToken = () => {
    token.value = ''
    removeToken()
  }

  // 登录
  const login = async (params: any) => {
    const res = await loginApi(params)
    setToken("_token", res.data.token)
    token.value = res.data.token
  }

  // 退出
  const logout = async () => {
    token.value = ''
    roles.value = []
    permissions.value = []
    removeToken()
    logoutApi()
  }

  // // 获取用户信息
  // const getInfo = async () => {
  //   const res = await getUserInfoApi()
  //   userInfo.name = res.data.name
  //   userInfo.avatar = res.data.avatar
  //   if (res.data.roles && res.data.roles.length) {
  //     roles.value = res.data.roles
  //     permissions.value = res.data.permissions
  //   } else {
  //     roles.value = ['ROLE_DEFAULT']
  //   }
  // }
  const SetUserInfo = (data: Object) =>{
    userInfo.value = data
  }
  const SetNavList = (obj : any)=> {
    console.log(obj);
    
    NavList.value = obj
  };
  const getNavList = () =>{
    return NavList.value
  }
  return {NavList, userInfo, userName, avatar, token, roles, permissions, login, logout, SetUserInfo, resetToken, SetNavList, getNavList }
}

export const useUserStore = defineStore('user', storeSetup, { persist: { paths: ['token'], storage: localStorage } })
