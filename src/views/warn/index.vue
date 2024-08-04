<template>
  <div class="table-page">
    warning
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/hooks'
import { getPersonList } from '@/apis'
import type { PersonItem } from '@/apis'

defineOptions({ name: 'TableMain' })

const form = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: ''
})

const loading = ref(false)
const tableData = ref<PersonItem[]>([])
const collapsed = ref(false)

const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getPersonList({
      current: current.value,
      pageSize: pageSize.value
    })
    tableData.value = res.data.list
    setTotal(res.data.total)
  } catch (error) {
  } finally {
    loading.value = false
  }
}

getTableData()
</script>

<style lang="scss" scoped>
:deep(.arco-grid) {
  flex-wrap: wrap;
}
:deep(.arco-grid-item) {
  min-width: 250px;
}
:deep(.arco-alert-success) {
  padding: 14px 16px;
  border-color: rgb(var(--success-6));
  background-color: rgba(var(--success-6), 0.08);
  .arco-alert-content {
    color: rgb(var(--success-6));
    font-size: 12px;
  }
}
.collapsed-btn {
  &:hover,
  &:active {
    background: none;
  }
}
.table-page {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-1);
  padding: $padding;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .form {
    margin-top: 12px;
    :deep(.arco-form-item) {
      margin-bottom: 10px;
    }
  }
}
</style>
