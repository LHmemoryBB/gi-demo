import type { DirectiveBinding, Directive } from 'vue'
import { useUserStore } from '@/store'
// import { useRouter } from 'vue-router';
const router = useRouter()
/**
 * @desc v-hasPerm 操作权限处理
 * @desc 使用 v-hasPerm="['home:btn:add']"
 */
function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const userStore = useUserStore()
  const { value } = binding
  const all_permission = '*:*:*'

  if (value && Array.isArray(value) && value.length) {
    const permissionList: Object[] = userStore.getBtnList()    
    const permissionValues: string[] = value
    const hasPermission = permissionList.some((perm:any) => {      
      return all_permission === perm || permissionValues.includes(perm.buttonFlag)
    })
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need permission! Like v-hasPerm="['home:btn:edit','home:btn:delete']"`)
  }
}

const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  }
}

export default directive
