<template>
  <div class="m-wangEditor">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" :mode="mode"/>
    <Editor
        v-model="valueHtml"
        class="editor-content"
        :default-config="editorConfig"
        :mode="mode"
        @on-created="handleCreated"
    />
  </div>
</template>
<script lang="ts" setup>
// 引入 wangEditor
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, onMounted, watch, shallowRef, ref, computed, reactive} from 'vue'
import {getToken} from '@/utils/auth';
import request from "@/utils/request"

let editors = null
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {
  excludeKeys:['uploadVideo']
}

const uploadAttr = reactive({
  fieldName: 'file',
  server: '/api/upload/editorFile',
  maxFileSize: 10 * 1024 * 1024,
  maxNumberOfFiles: 9,
  allowedFileTypes: ['image/*'],
  headers: {
    'Authorization': getToken('_token'),
    'X-CSRF-TOKEN': getToken('XSRF-TOKEN'),
    'X-XSRF-TOKEN': getToken('XSRF-TOKEN')
    },
  // onBeforeUpload(file) {
  // 	console.log(file);
  // 	setHeaders();
  // 	return file
  // },
  customInsert(res, insertFn) {
    insertFn(res[0]);
  }

});

const uploadAttrs = (file, insertFn)=>{
  let form = new FormData();
  form.append("file", file);
  request({
    method: 'post',
    url:'/api/upload/editorFile',
    headers: {
      'Authorization': getToken('_token'),
      'X-CSRF-TOKEN': getToken('XSRF-TOKEN'),
      'X-XSRF-TOKEN': getToken('XSRF-TOKEN'),
      'Content-Type': 'multipart/form-data'
    },
    data:form
  }).then(res=>{
    insertFn(res.data[0]);
  }).catch(err=>{
    insertFn(err.data[0]);
  })

}


const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      customUpload:uploadAttrs
    }
  }
}

// 内容 HTML
const mode = ref('default')
let emit = defineEmits(['update:modelValue'])
let props = defineProps({
  modelValue: String,
})

const getEditorData = () => {
  // 通过代码获取编辑器内容
  let data = editors.txt.html()
  alert(data)
}

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const valueHtml = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    // 防止富文本内容为空时，校验失败
    if (editorRef.value.isEmpty()) val = ''
    emit('update:modelValue', val)
  },
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  // 调用销毁 API 对当前编辑器实例进行销毁
  const editor = editorRef.value
  if (editor == null) {
    return
  }
  editor.destroy()
})
</script>
<style lang="scss" scoped>
.m-wangEditor {
  z-index: 99;
  width: 100%;
  border: 1px solid #cccccc;

  .editor-toolbar {
    border-bottom: 1px solid #cccccc;
  }
  
  .editor-content {
    height: 500px !important;
    overflow-y: hidden;
  }
}
</style>
