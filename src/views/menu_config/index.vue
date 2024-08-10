<script setup>
import { reactive, ref } from 'vue'
import { roleMenuTree,roleMenuDel } from '@/api/index'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { defineAsyncComponent } from 'vue'
import { useAxios, openDel } from '@/hooks'
import { Modal } from 'ant-design-vue'
const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))
const ComAddChild = defineAsyncComponent(() => import('./components/addChild.vue'))
const ComDelMenu = defineAsyncComponent(() => import('./components/delMenu.vue'))
const ComeditBtns = defineAsyncComponent(() => import('./components/editBtns.vue'))

const headers = [
  {
    title: '菜单名',
    dataIndex: 'name',
	align: 'center'
  },
  {
    title: '地址',
    dataIndex: 'path',
	align: 'center'
  },
  {
    type: 'slot',
    dataIndex: 'operation',
	align: 'center'
  },
]

const { loading, data, send, onSuccess } = useAxios(roleMenuTree, {
  immediate: true,
  data_deconstruction: (res) => res.data,
  total_deconstruction: (res) => res.data,
  isPages: false
})
const submit = (type) => {
  send()
}
const ComEditRef = ref()
const onComEdit = (row) => {
  ComEditRef.value?.on_init(row)
}
const ComAddRef = ref()
const onComAdd = (row) => {
  ComAddRef.value?.on_init(row)
}
const ComAddChildRef = ref()
const onComAddChild = (row) => {
  ComAddChildRef.value?.on_init(row)
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
      <a-button type="primary" ghost @click="onComAdd()" v-hasPerm="['menu_config:add']">新增</a-button>
      <Ttable :loading="loading" :headers="headers" :tableData="data">
        <template #operation="{ record }">
          <div class="_btn"></div>
          <a-button type="primary" ghost text @click="onComAddChild(record)" size="small" v-hasPerm="['menu_config:addChildMenu']">新增子菜单</a-button>
          <a-button type="primary" ghost text @click="onComEdit(record)" size="small" class="m_l_10" v-hasPerm="['menu_config:edit']">编辑</a-button>
          <a-button type="primary" ghost text @click="onEditBtns(record)" size="small" class="m_l_10" v-if="!record.children" v-hasPerm="['menu_config:btn_config']">按钮配置</a-button>
          <a-button danger ghost text @click="onComDel(record)" size="small" class="m_l_10" v-hasPerm="['menu_config:del']">删除</a-button>
        </template>
      </Ttable>
    </div>
    <ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
    <ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
    <ComAddChild ref="ComAddChildRef" @onSuccess="submit('form')" />
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