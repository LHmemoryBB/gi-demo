import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FileItem } from '@/api/index'

type TViewMode = 'grid' | 'list'

const storeSetup = () => {
  const viewMode = ref<TViewMode>('grid') // 视图: grid宫格模式 list列表模式
  const isBatchMode = ref(false) // 是否批量操作: true:批量 false:单文件
  const selectedFileList = ref<FileItem[]>([])
  const selectedFileIdList = computed(() => selectedFileList.value.map((i) => i.id))

  // 改变视图模式
  const changeViewMode = () => {
    viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
  }

  // 添加选中的文件到文件勾选列表
  const addSelectedFileItem = (item: FileItem) => {
    if (selectedFileIdList.value.includes(item.id)) {
      const index = selectedFileList.value.findIndex((i) => i.id === item.id)
      selectedFileList.value.splice(index, 1)
    } else {
      selectedFileList.value.push(item)
    }
  }

  return { viewMode, isBatchMode, selectedFileList, selectedFileIdList, changeViewMode, addSelectedFileItem }
}

export const useFileStore = defineStore('file', storeSetup, {
  persist: { storage: localStorage, paths: ['selectedFileList'] }
})
