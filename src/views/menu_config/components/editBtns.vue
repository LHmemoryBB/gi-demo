<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { useAxios, openDel } from '@/hooks'
import { roleMenuInsertButton, roleMenuDelButton } from '@/api/index'
import { notification } from 'ant-design-vue'
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons-vue'
import { tupleNum } from 'ant-design-vue/es/_util/type'
const emit = defineEmits()
let Update = reactive({
  title: '修改',
  width: '1080px',
  isShow: false,
  modal: true,
  draggable: true
})

const _state = () => ({
  id: '',
  buttonFlag: '',
  buttonName: ''
})

const ruleForm = reactive(_state())
let buttons = ref([])
const headers = [
  {
    title: '按钮名称',
    dataIndex: 'buttonName',
    align: 'center',
    width: '100px'
  },
  {
    title: '按钮标识',
    dataIndex: 'buttonFlag',
    align: 'center',
    width: '100px'
  },
  {
    type: 'slot',
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: '50px'
  }
]
//open初始
const on_init = (row) => {  
  Update.isShow = true
  ruleForm.menuId = row.id;
  buttons.value = row.buttons;
  ruleForm.buttonFlag = '';
  ruleForm.buttonName = '';

}
const onComDel = (row, index) => {
  openDel(roleMenuDelButton, { id: row.id }).then(() => {
    buttons.value.splice(index, 1)
  })
}

const saveBtn = (item) => {
  send(ruleForm)
}
const { loading, data, onSuccess, onError, send } = useAxios(roleMenuInsertButton, {
  immediate: false
})
onSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '新增成功!'
  })
  // emit('onSuccess')
  buttons.value.push(JSON.parse(JSON.stringify(ruleForm)))
  ruleForm.buttonFlag = '';
  ruleForm.buttonName = '';
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '修改成功!'
  })
})

//提交
const submit = (type) => {
  send(ruleForm)
}
const confirm = (type) => {
  emit('onSuccess');
  Update.isShow = false
}

defineExpose({
  on_init
})
</script>

<template>
  <Tdialog :Update="Update" :loading="loading" @confirm="confirm">
    <Ttable :tableData="buttons" :headers="headers" :tableHeight="600">
      <template #operation="{ record, index }">
        <a-button danger shape="circle" size="small" class="m_l_10" @click="onComDel(record, index)" v-if="record.id">
          <template #icon>
            <MinusOutlined />
          </template>
        </a-button>
      </template>
    </Ttable>
    <a-alert message="按钮标识编写规则：当前菜单地址:需要配置的按钮的功能名称； 例：menu_config:addChildMenu" type="info" style="margin: 10px 0"/>
    <div class="btn_item">
      <a-input v-model:value="ruleForm.buttonName" placeholder="按钮名称" allow-clear></a-input>
      <a-input v-model:value="ruleForm.buttonFlag" placeholder="按钮标识" allow-clear></a-input>
      <a-button type="primary" shape="circle" size="small" class="m_l_10" @click="saveBtn()">
        <template #icon>
          <CheckOutlined />
        </template>
      </a-button>
    </div>
  </Tdialog>
</template>


<style lang="less" scoped>
.fixed_width_box {
  display: flex;
  border-bottom: 1px solid #eee;
  padding-top: 10px;
}
.fixed_width {
  display: flex;
  flex-direction: column;
}
.btn_item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  :deep(.ant-input-affix-wrapper) {
    // width: 130px;
    margin-right: 10px;
  }
}
</style>
