<script setup>
import { ref, computed } from 'vue'
import { getToken } from '@/utils/auth'

const props = defineProps({
  action: {
    type: [Function],
    default: () => {}
  },
  fileList: {
    type: [Array, String],
    default: []
  },
  uploadLimit: {
    type: Number,
    default: 1
  },
  size: {
    type: Number,
    default: 10 * 2014 * 2014
  },
  fileType: {
    type: String,
    default: 'application/pdf'
  },
  sizeName: {
    type: String,
    default: '10MB'
  },
  multiple: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits()
const showProgress = ref(false)
const uploadProgress = ref(0)
const uploadedCount = ref(0)
const uploadLimitReached = computed(() => uploadedCount.value >= props.uploadLimit)
var regex = /[!@#$%^&*()_|<>{}]/g

// const setHeaders = () => {
// 	return {
// 			'Authorization': getToken('_token'),
// 			'X-CSRF-TOKEN':getToken('XSRF-TOKEN'),
// 			'X-XSRF-TOKEN':getToken('XSRF-TOKEN')
// 			}
// }

const getFileList = () => {
  return props.fileList.map((item) => {
    return {
      name: item.name,
      response: item.response
    }
  })
}

const beforeUpload = (file) => {
  if (regex.test(file.name)) {
    ElMessage.error('文件名称包含非法字符( !@#$%^&*()_|<>{} )，请修改后重新提交!')
    return false
  }
  if (!props.fileType.includes(file.type)) {
    ElMessage.error(`只能上传${props.fileType}文件!`)
    return false
  }
  if (file.size > props.size) {
    ElMessage.error(`文件大小不能超过 ${props.sizeName}!`)
    return false
  }
  showProgress.value = true
  return true
}

const onProgress = (event, file, fileList) => {
  uploadProgress.value = event.percent
}

const pathSuccess = (response, file, fileList) => {
  console.log('pathSuccess', response)
  showProgress.value = false
  emit('pathSuccess', response, file, fileList)
  uploadedCount.value++
  ElMessage.success('上传成功!')
}

const onError = (error, file, fileList) => {
  showProgress.value = false
  ElMessage.error('上传失败!')
}

const onExceed = (error, file, fileList) => {
  ElMessage.error(`限制上传最大数量为${props.uploadLimit} !`)
}

const pathRemove = (response, file, fileList) => {
  emit('pathRemove', response, file, fileList)
}
const pathPreview = (response, file, fileList) => {
  emit('pathPreview', response, file, fileList)
}
</script>

<template>
  <a-upload
    class="upload-demo"
    :action="props.action()"
    :file-list="getFileList()"
    :headers="{ Authorization: getToken('_token'), 'X-XSRF-TOKEN': getToken('XSRF-TOKEN') }"
    :before-upload="beforeUpload"
    :on-progress="onProgress"
    :on-success="pathSuccess"
    :on-error="onError"
    :limit="props.uploadLimit"
    :on-preview="pathPreview"
    :on-remove="pathRemove"
    :on-exceed="onExceed"
    draggable
    :multiple="props.multiple"
    accept=".pdf"
    image-preview
  >
  </a-upload>
</template>

<style >
.upload-demo {
  width: 250px;
}
.upload-demo .a-upload-dragger {
  padding: 10px;
}
.upload-demo .a-upload__tip {
  line-height: 20px;
}
.upload-demo .a-upload-dragger .a-icon--upload {
  font-size: 50px;
  line-height: 50px;
  margin-bottom: 0;
}
</style>