import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import type { RouteRecordRaw, RouteRecordName } from 'vue-router'
import { usePermissionStore } from '@/store'
import _XEUtils_ from 'xe-utils'

const storeSetup = () => {
  const tagList = ref<RouteRecordRaw[]>([]) // 保存页签tab的数组
  const cacheList = ref<RouteRecordName[]>([]) // keep-alive缓存的数组, 元素是组件名

  // 添加一个页签, 如果当前路由已经打开, 则不再重复添加
  const addTagItem = (item: RouteRecordRaw) => {
    if (tagList.value.some((i) => i.path === item.path)) return
    if (item.meta?.affix ?? true) {
      tagList.value.push(item)
    }
  }

  // 删除一个页签
  const deleteTagItem = (path: string) => {
    const index = tagList.value.findIndex((item) => item.path === path)
    if (index >= 0) {
      const isActive = router.currentRoute.value.path === tagList.value[index]['path']
      tagList.value.splice(index, 1)
      if (isActive) {
        router.push({ path: tagList.value[tagList.value.length - 1]['path'] })
      }
    }
  }

  // 清空页签
  const clearTagList = () => {
    const permissionStore = usePermissionStore()
    const arr = _XEUtils_.filterTree(permissionStore.routes, (item) => item.meta?.affix ?? false)
    tagList.value = [...arr]
  }

  // 添加缓存页
  const addCacheItem = (item: RouteRecordRaw) => {
    if (item.name) {
      if (cacheList.value.includes(item.name)) return
      if (item.meta?.keepAlive) {
        cacheList.value.push(item.name)
      }
    }
  }

  // 删除一个缓存页
  const deleteCacheItem = (name: RouteRecordName) => {
    const index = cacheList.value.findIndex((item) => item === name)
    if (index >= 0) {
      cacheList.value.splice(index, 1)
    }
  }

  // 清空缓存页
  const clearCacheList = () => {
    cacheList.value = []
  }

  // 关闭当前
  const closeCurrent = (path: string) => {
    deleteTagItem(path)
    const item = tagList.value.find((i) => i.path === path)
    if (item?.name) {
      deleteCacheItem(item.name)
    }
  }

  // 关闭其他
  const closeOther = (path: string) => {
    const arr = tagList.value.filter((i) => i.path !== path)
    arr.forEach((item) => {
      deleteTagItem(item.path)
      if (item?.name) {
        deleteCacheItem(item.name)
      }
    })
  }

  // 关闭全部
  const closeAll = () => {
    clearTagList()
  }

  // 重置
  const reset = () => {
    clearTagList()
    clearCacheList()
  }

  return {
    tagList,
    cacheList,
    addTagItem,
    deleteTagItem,
    clearTagList,
    addCacheItem,
    deleteCacheItem,
    clearCacheList,
    closeCurrent,
    closeOther,
    closeAll,
    reset
  }
}

export const useTabsStore = defineStore('tabs', storeSetup, { persist: false })
