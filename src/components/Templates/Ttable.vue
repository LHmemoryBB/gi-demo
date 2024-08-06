<script lang="ts" setup>
	import { ref, defineEmits, defineExpose, nextTick } from 'vue'
	import { typeOf } from '@/hooks'
	const emit = defineEmits();
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
			type: Object,
			default: () => { }
		},
		pagesHide: {
			type: Boolean,
			default: false
		},
		selection_all_show: {
			type: Boolean,
			default: false
		},
		selection_show: {
			type: Boolean,
			default: false
		},
		order_show: {
			type: Boolean,
			default: true
		},
		loading: {
			type: Boolean,
			default: false
		},
		tableRowClassName: {
			type: Number,
			default: null
		}
	})
	const TableRef = ref<InstanceType<typeof ElTable>>()
	const currentCell = ref(null)

	//分页
	const handleSizeChange = (val : number) => {
		props.pages.pageSize = val
	}
	//分页
	const handleCurrentChange = (val : number) => {
		props.pages.page = val
	}

	//header添加name
	const leftheaderStyle = ({ row, column, rowIndex, columnIndex } : {
		row : User
		rowIndex : number
	}) => {
		if (columnIndex === 0) {
			return "seltAllbtnDis";
		}
		return ''
	}
	//根据行下标添加name
	const tableRowClassName = ({ row, rowIndex, } : {
		row : User
		rowIndex : number
	}) => {
		if (rowIndex === props.tableRowClassName) { return 'warning-row' }
		return ''
	}

	//多选
	const onSelectChange = (selection) => {
		if (!props.selection_all_show) return
		emit('onSelectAll', selection)
	}
	//单选
	const onSelect = (selection, row) => {
		if (!props.selection_show) return
		if (selection.length > 1) {
			let del_row = selection.shift();
			TableRef.value!.toggleRowSelection(del_row, false); // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
		}
		emit('onSelectSingle', selection)
	}
	
	//返回选中列表
	const getSelectionRows = () => {
		return TableRef.value!.getSelectionRows()
	}
	
	//清空选中
	const clearSelection = () => {
		TableRef.value!.clearSelection()
	}

	const tableCellClassName = ({ row, column, rowIndex, columnIndex }) => {
		row.index = rowIndex
		column.index = columnIndex
	}
	// 获得当前双击的单元格的横竖index，然后拼接成一个唯一字符串用于判断，并赋给currentCell
	// 拼接后类似这样："1,0","1,1",
	const dbclick = (row, column, event) => {
		currentCell.value = row.index + ',' + column.index
		// input 自动获取焦点
		nextTick(() => {
			const listItems = document.querySelectorAll(`input[data-value="${currentCell.value}"]`);
			listItems[0]?.focus()
		})
	}
	// 关闭编辑状态
	const hideInput = (row) => {
		currentCell.value = null
		emit('change_edit', row)
	}

	let lodRow = null
	//点击行切换选中状态
	const rowSelection = (row) => {
		if (props.selection_show) {
			TableRef.value!.toggleRowSelection(lodRow, false);
			TableRef.value!.toggleRowSelection(row, true);
			lodRow = row
		} else if (props.selection_all_show) {
			TableRef.value!.toggleRowSelection(row, !getSelectionRows().includes(row));
		}
	}

	defineExpose({
		clearSelection,
		getSelectionRows
	})
</script>

<template>
	<div v-loading="loading">
		<div class="table_head">
			<slot></slot>
		</div>
		<a-table ref="TableRef" :data="props.tableData" border style="width: 100%" :row-class-name="tableRowClassName"
			:header-cell-class-name="props.selection_show?leftheaderStyle:null" @row-click="rowSelection"
			@selection-change="onSelectChange" @select="onSelect" :cell-class-name="tableCellClassName"
			@row-dblclick="dbclick">
			<a-table-column
				v-if="selection_all_show || selection_show"
			      type="selection"
			      width="55">
			</a-table-column>
			<a-table-column v-if="props.order_show" align="center" type="index" label="序号" width="60">
				<template #default="scope">
					<span>{{scope.row.index + 1}}</span>
				</template>
			</a-table-column>
			<template v-for="header in props.headers" :key="header.label">
				<a-table-column v-if="!header.type" :align="header.align ?? 'center'" :label="header.label"
					:prop="header.prop" :width="header.width ?? 'auto'" show-overflow-tooltip />
				<a-table-column v-else-if="header.type === 'edit'" :label="header.label" :prop="header.prop"
					:align="header.align ?? 'center'" :width="header.width ?? 'auto'" show-overflow-tooltip>
					<template #default="scope">
						<a-input v-if="scope.row.index + ',' + scope.column.index == currentCell"
							:data-value="scope.row.index + ',' + scope.column.index" v-model="scope.row[header.prop]"
							@blur="hideInput(scope.row)" />
						<span v-else>{{ scope.row[header.prop] }}</span>
					</template>
				</a-table-column>
				<a-table-column v-else-if="header.type === 'slot'" :label="header.label" :prop="header.prop"
					:align="header.align ?? 'center'" :width="header.width ?? 'auto'" show-overflow-tooltip>
					<template #header="scope" v-if="header.template.header">
						<slot :name="header.template.header" :scope="scope.row"></slot>
					</template>
					<template #default="scope" v-else-if="header.template.default">
						<slot :name="header.template.default" :scope="scope"></slot>
					</template>
				</a-table-column>
			</template>
		</a-table>
		<a-pagination v-if="!props.pagesHide && props.tableData.length > 0" class="m_t_10 m_l_10"
			:current-page="props.pages.page" :page-size="props.pages.pageSize"
			:page-sizes="props.pages.pageSizes ?? [10, 20, 30, 40]" :total="props.pages.total ?? 0"
			@size-change="handleSizeChange" @current-change="handleCurrentChange" :hide-on-single-page="false"
			layout="total, sizes, prev, pager, next, jumper" />
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
<style>
	.not_margan .table_head {
		margin: 0;
	}
</style>