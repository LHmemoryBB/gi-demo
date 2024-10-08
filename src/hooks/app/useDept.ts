import { ref } from 'vue'
import { getSystemDeptList } from '@/api/index'
import type { DeptItem } from '@/api/index'

/** 部门模块 */
export function useDept() {
  const loading = ref(false)
  const deptList = ref<DeptItem[]>([])

  const getDeptList = async () => {
    try {
      loading.value = true
      const res = await getSystemDeptList()
      deptList.value = res.data.list
    } catch (error) {
    } finally {
      loading.value = false
    }
  }
  return { deptList, getDeptList, loading }
}
