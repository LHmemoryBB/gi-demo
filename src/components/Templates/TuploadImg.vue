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
      <div style="margin-top: 8px">Upload</div>
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
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

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
let fileList = reactive([])
fileList = computed(() => {
  const list = Array.isArray(props.fileList) ? props.fileList : []
  return list
})

const getFileList = () => {
  const list = Array.isArray(props.fileList) ? props.fileList : []
  return list
}

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

const handleSuccess = (response: any, file: any, fileList: any[]) => {
  emit('pathSuccess', response, file, fileList)
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {    
    // emit('pathSuccess', response, file, fileList)
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const handleRemove = (file: any, fileList: any[]) => {
  emit('pathRemove', file, fileList)
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
