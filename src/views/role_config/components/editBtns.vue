<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { useAxios, openDel } from '@/hooks'
import { roleEmpowerList, roleEmpowerMenu, roleEmpowerMenuBtn } from '@/api/index'
import { notification } from 'ant-design-vue'
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons-vue'
import { tupleNum } from 'ant-design-vue/es/_util/type'
const emit = defineEmits()
let Update = reactive({
  title: '配置菜单',
  width: '650px',
  isShow: false,
  modal: true,
  draggable: true
})
let currentNode = ref({})
const _state = () => ({
  roleId: '',
})
let checkedKeys = ref([])
const ruleForm = reactive(_state())
let buttons = ref([])
let treeData = ref([])
//open初始
const on_init = (row) => {
  Update.isShow = true
  ruleForm.roleId = row.id
  send({roleId: row.id})
}
const { loading, data, onSuccess, onError, send } = useAxios(roleEmpowerList, {
  immediate: false
})
onSuccess((res) => {
  treeData.value = res.data.routes
  checkedKeys.value = res.data.checkMenus
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '修改成功!'
  })
})


//点击树节点
const selectNode = (selectKeys, node) => {
  currentNode.value = node.node.dataRef
  currentNode.value.buttons.forEach(item => {
    item.checked = currentNode.value.checkButtons.some(button => button.id === item.id)
  });
}
const { loading:EmpowerMenuLoading, onSuccess: EmpowerMenuSuccess, onError: EmpowerMenuError, send: EmpowerMenuSend } = useAxios(roleEmpowerMenu, {
  immediate: false
})
EmpowerMenuSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '修改成功!'
  })
})
EmpowerMenuError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '修改成功!'
  })
})
// 授权菜单事件
const switchMenuChange = (fn, e) => {
  const data = {
    roleId: ruleForm.roleId,
    menuId: e.node.dataRef.id,
    checked: e.checked
  };
  EmpowerMenuSend(data)
}
// 按钮绑定api
const { loading:EmpowerBtnLoading, onSuccess: EmpowerBtnSuccess, onError: EmpowerBtnError, send: EmpowerBtnSend } = useAxios(roleEmpowerMenuBtn, {
  immediate: false
})
EmpowerBtnSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '修改成功!'
  })
})
EmpowerBtnError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '修改成功!'
  })
})
// 点击按钮选框事件
const selectChange = (item) =>{
  const data = {
    roleId: ruleForm.roleId,
    menuId: currentNode.value.id,
    buttonId: item.id,
    checked: item.checked
  };
  EmpowerBtnSend(data)
}



//提交
const submit = (type) => {
  send(ruleForm)
}
const confirm = (type) => {
  emit('onSuccess')
  Update.isShow = false
}

defineExpose({
  on_init
})
</script>

<template>
  <Tdialog :Update="Update" :loading="loading" @confirm="confirm">
    <div class="menu-config">
      <a-card title="系统菜单" style="width: 300px" class="m_r_10">
        <a-tree :tree-data="treeData" checkable v-model:checkedKeys="checkedKeys" @check="switchMenuChange" :fieldNames="{ title: 'name', key: 'id' }" @select="selectNode" :defaultValue="1"> </a-tree>
      </a-card>
      <a-card :title="`当前菜单 ${currentNode.name || ''}`" style="width: 300px">
        <div v-if="currentNode.name">
          <a-checkbox v-model:checked="item.checked" v-for="item in currentNode.buttons" @change="selectChange(item)"> {{item.buttonName}} </a-checkbox>
        </div>
      </a-card>
    </div>
  </Tdialog>
</template>


<style lang="less" scoped>
.menu-config {
  display: flex;
}
</style>
