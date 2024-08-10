<template>
  <a-upload
    :action="up_img_api()"
    v-model:file-list="fileList"
    :headers="headers"
    list-type="picture-card"
    :maxCount="limit"
    @change="handleChange"
    @remove="handleRemove"
    :before-upload="beforeUpload"
    :multiple="multiple"
    accept="image/jpg, image/jpeg, image/png"
    @preview="handlePreview"
  >
    <div v-if="fileList.length < props.limit">
      <plus-outlined />
    </div>
  </a-upload>
  <a-modal :open="previewVisible" title="" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits, defineProps, computed } from 'vue'
import { message } from 'ant-design-vue'
import { getToken } from '@/utils/auth' // 请根据实际路径调整
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { useAxios } from '@/hooks'
import { upload_img_single } from '@/api/index'
import type { UploadChangeParam } from 'ant-design-vue';

const emit = defineEmits(['pathSuccess', 'pathRemove'])
const props = defineProps({
  fileList: {
    type: [Array, String],
    default: () => []
  },
  limit: {
    type: Number,
    default: 1
  },
  size: {
    type: Number,
    default: 2
  },
  sizeName: {
    type: String,
    default: '2MB'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  up_img_api: {
    type: Function,
    default: () => ''
  }
})
const hideUpload = ref(false)
const headers = ref({})

const internalFileList = ref([]);

// 基于 props.fileList 和 internalFileList 创建一个计算属性
let fileList = computed({
  get() {
    if (Array.isArray(props.fileList)) {
      internalFileList.value = [...props.fileList]; // 复制 props 到内部状态
    }
    return internalFileList.value;
  },
  set(newValue) {
    // 当外部尝试修改计算属性时，更新内部状态
    internalFileList.value = newValue;
  }
});

const beforeUpload = (file: File) => {
  setHeaders()
  const isValidType = ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)
  const isValidSize = file.size / 1024 / 1024 <= props.size

  if (!isValidType) {
    message.error('图片必须为JPG, PNG格式!')
    return false
  } else if (!isValidSize) {
    message.error(`图片大小不能超过 ${props.sizeName}!`)
    return false
  }
  return true
}

const handleSuccess = (info: any) => {
  emit('pathSuccess', {}, info.file, info.fileList)
}

const handleChange = (info: UploadChangeParam) => {
  fileList.value.push(info.file)
  if (info.file.status !== 'uploading') {
  }
  if (info.file.status === 'done') {
    handleSuccess(info)
    message.success(`${info.file.name} 文件上传成功`)
  } else if (info.file.status === 'error') {
    fileList.value.pop()
    message.error(`${info.file.name} 文件上传失败`)
  }
}

const handleRemove = (file: any) => {
  const fileListNew = fileList.value.filter(item => item.uid !== file.uid)
  emit('pathRemove', file, fileListNew)
}

const setHeaders = () => {
  headers.value = {
    Authorization: getToken('_token'),
    'X-CSRF-TOKEN': getToken('XSRF-TOKEN'),
    'X-XSRF-TOKEN': getToken('XSRF-TOKEN')
  }
}

const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')
const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj)
  }
  previewImage.value = file.url || file.preview
  previewVisible.value = true
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
}

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}

const getBase64 = (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
</script>
