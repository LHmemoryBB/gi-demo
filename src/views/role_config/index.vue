<script setup>
import { reactive, ref } from 'vue'
import { roleList, roleMenuDel, rolecanLogin } from '@/api/index'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { defineAsyncComponent } from 'vue'
import { useAxios, openDel, switch_beforeChange } from '@/hooks'
import { Modal } from 'ant-design-vue'
const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))
const ComDelMenu = defineAsyncComponent(() => import('./components/delMenu.vue'))
const ComeditBtns = defineAsyncComponent(() => import('./components/editBtns.vue'))

const headers = [
  {
    title: '角色名',
    dataIndex: 'description',
    align: 'center'
  },
  {
    title: '角色标识',
    dataIndex: 'name',
    align: 'center'
  },
  {
    type: 'slot',
    dataIndex: 'canLogin',
    align: 'center'
  },
  {
    type: 'slot',
    dataIndex: 'operation',
    align: 'center'
  }
]

const { loading, data, send, pages, onSuccess } = useAxios(roleList, {
  immediate: true,
  data_deconstruction: (res) => res.data.list,
  total_deconstruction: (res) => res.data.total,
  isPages: true
})
const submit = (type) => {
  send()
}

const switch_enabled_beforeChange = (row) => {
  return switch_beforeChange(rolecanLogin,row, row, 'enabled_loading')
}

const ComEditRef = ref()
const onComEdit = (row) => {
  ComEditRef.value?.on_init(row)
}
const ComAddRef = ref()
const onComAdd = (row) => {
  ComAddRef.value?.on_init(row)
}
const ComeditBtnsRef = ref()
const onEditBtns = (row) => {
  ComeditBtnsRef.value?.on_init(row)
}
const ComDelMenuRef = ref()
const onComDel = (row) => {
  ComDelMenuRef.value?.on_init(row)
  // openDel(roleMenuDel, { id: row.id }).then(() => {
  //   submit('form')
  // })
}

</script>

<template>
  <div class="page-container">
    <div class="table-container">
      <a-button type="primary" ghost @click="onComAdd()">新增</a-button>
      <Ttable :loading="loading" :headers="headers" :tableData="data">
        <template #canLogin="{ record }">
          <a-switch v-model:checked="record.canLogin" checked-children="是" un-checked-children="否" @change="switch_enabled_beforeChange(record)"/>
        </template>
        <template #operation="{ record }">
          <div class="_btn"></div>
          <a-button type="primary" ghost text @click="onEditBtns(record)" size="small" class="m_l_10" v-hasPerm="['role_config:button_config']"
            >按钮配置</a-button
          >
          <a-button danger ghost text @click="onComDel(record)" size="small" class="m_l_10">删除</a-button>
        </template>
      </Ttable>
    </div>
    <ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
    <ComDelMenu ref="ComDelMenuRef" @onSuccess="submit()" />
    <ComeditBtns ref="ComeditBtnsRef" @onSuccess="submit()" />
  </div>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
</style>