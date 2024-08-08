<script lang="ts" setup>
import { ref, defineEmits, defineExpose, nextTick, shallowRef, toValue } from 'vue'
import { Table } from 'ant-design-vue'
import { useElementSize } from '@vueuse/core'

import { typeOf } from '@/hooks'
const emit = defineEmits()
const props = defineProps({
  headers: {
    type: Array,
    required: true,
    default: () => []
  },
  tableData: {
    type: Array,
    required: true,
    default: () => []
  },
  pages: {
    type: [Object, Boolean],
    default: false
  },
  pagination: {
    type: [Object, Boolean],
    default: () => {}
  },

  tableHeight: {
    type: Number,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const TableRef = shallowRef<InstanceType<typeof ElTable>>()
const currentCell = ref(null)

//分页
const changePageSize = (current, pageSize) => {
  props.pages.pageSize = pageSize
}
//分页
const changePage = (page, pageSize) => {
  props.pages.page = page
}

//header添加name
const leftheaderStyle = ({ row, column, rowIndex, columnIndex }: { row: User; rowIndex: number }) => {
  if (columnIndex === 0) {
    return 'seltAllbtnDis'
  }
  return ''
}

const pagination = computed(() => {
  if (props.pages) {
    return {
      showSizeChanger: true,
      showQuickJumper: false,
      showTotal: () => `共${props.pages.total}条`,
      pageSize: props.pages.pageSize,
      current: props.pages.page,
      total: props.pages.total,
      pageSizeOptions: ['10', '20', '50', '100'],
      onShowSizeChange: (current, pageSize) => changePageSize(current, pageSize),
      onChange: (page, pageSize) => changePage(page, pageSize)
    }
  } else {
    return false
  }
})

//多选
const onSelectChange = (selection) => {
  if (!props.selection_all_show) return
  emit('onSelectAll', selection)
}
//单选
const onSelect = (selection, row) => {
  if (!props.selection_show) return
  if (selection.length > 1) {
    let del_row = selection.shift()
    TableRef!.toggleRowSelection(del_row, false) // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
  }
  emit('onSelectSingle', selection)
}

//返回选中列表
const getSelectionRows = () => {
  return TableRef!.getSelectionRows()
}

//清空选中
const clearSelection = () => {
  TableRef!.clearSelection()
}
// 行编辑,
const editableData: any = ref({})
const editInputRef = ref()
const dblclick = (index, row) => {
  editableData.value = JSON.parse(JSON.stringify(row))
  editableData.value.tableInputIndex = index
  nextTick(() => {
    editInputRef.value.focus()
  })
}

// 关闭编辑状态
const hideInput = (row) => {
  editableData.value = {}
  emit('change_edit', row)
}

let lodRow = null
//点击行切换选中状态
const rowSelection = (row) => {
  if (props.selection_show) {
    TableRef!.toggleRowSelection(lodRow, false)
    TableRef!.toggleRowSelection(row, true)
    lodRow = row
  } else if (props.selection_all_show) {
    TableRef!.toggleRowSelection(row, !getSelectionRows().includes(row))
  }
}

const parseDefaultValue = (record: Record<string, any>, dataIndex: string) => {
  const dataIndexs = dataIndex.split('.')
  let result = record
  dataIndexs.forEach((element) => {
    if (result) {
      result = result[element]
    }
  })
  return result
}

const TableContainerRef = shallowRef()
const { height: wrapperElHeight } = useElementSize(TableContainerRef)

const scrollConfig = computed(() => {
  return {
    y: props.tableHeight ? props.tableHeight : wrapperElHeight.value - 152,
    x: toValue(702)
  }
})

defineExpose({
  clearSelection,
  getSelectionRows
})
</script>

<template>
  <div class="Table-container" ref="TableContainerRef">
    <div class="table_head">
      <slot></slot>
    </div>
    <div>
      <Table
        ref="TableRef"
        :data-source="props.tableData"
        bordered
        :columns="headers"
        :loading="loading"
        :pagination="pagination"
        style="width: 100%"
        @row-click="rowSelection"
        @selection-change="onSelectChange"
        @select="onSelect"
        size="small"
        :scroll="scrollConfig"
      >
        <!-- <template v-slot:headerCell="{ column }">
        <span class="title2" :style="{ whiteSpace: 'nowrap', fontWeight: 'normal' }">{{ column.title }}</span>
      </template> -->
        <template v-slot:bodyCell="{ column, text, record, index }">
          <template v-if="column.type === 'slot'">
            <slot :name="column.dataIndex" :column="column" :record="record"></slot>
          </template>
          <template v-else-if="column.type === 'edit'">
            <!-- {{column}}-{{text}}-{{record}}-{{index}} -->
            <div class="editable-cell">
              <div v-if="editableData.tableInputIndex === index" class="editable-cell-input-wrapper">
                <a-input v-model:value="record[column.dataIndex]" ref="editInputRef" @blur="hideInput(record)" />
              </div>
              <div v-else class="editable-cell-text-wrapper" @dblclick="dblclick(index, record)">
                {{ record[column.dataIndex] || ' ' }}
              </div>
            </div>
          </template>
          <template v-else>
            {{ record[column.dataIndex] }}
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
<style scoped>
.table_head {
  margin: 7px 10px 10px 0;
}

::v-deep .seltAllbtnDis .cell {
  visibility: hidden;
}

/* >>>.cell.a-tooltip {
		cursor: pointer;
	} */
</style>
<style lang="less">
.not_margan .table_head {
  margin: 0;
}
.Table-container {
  height: 100%;
  .ant-table {
    max-height: 100%;
  }
}
.editable-cell-text-wrapper {
  cursor: pointer;
}
</style>