<template>
  <a-upload
    :class="{ hide: hideUpload }"
    :action="up_img_api()"
    :fileList="getFileList()"
    :headers="headers"
    list-type="picture-card"
    :limit="limit"
    :on-success="pathSuccess"
    :on-remove="pathRemove"
    :before-upload="beforeAvatarUpload"
    :multiple="multiple"
    accept="image/jpg, image/jpeg, image/png"
    image-preview
  >
    <a-button type="primary" icon="upload">
      上传图片
    </a-button>
  </a-upload>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth'; // 请根据实际路径调整

const emit = defineEmits(['pathSuccess', 'pathRemove']);
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
			default: false
		}
});

const hideUpload = ref(false);
const headers = ref({});

const getFileList = () => {
  let list = Array.isArray(props.fileList) ? props.fileList : [];
  hideUpload.value = list.length >= props.limit;
  return list;
};

const beforeAvatarUpload = (file: File) => {
  setHeaders();
  if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
    Message.error('图片必须为JPG,PNG格式!');
    return false;
  } else if (file.size / 1024 / 1024 > props.size) { // 转换为MB
    Message.error(`图片大小不能超过 ${props.sizeName}!`);
    return false;
  }
  return true;
};

const pathSuccess = (response: any, file: any, fileList: any[]) => {
  emit('pathSuccess', response, file, fileList);
};

const pathRemove = (file: any, fileList: any[]) => {
  emit('pathRemove', file, fileList);
};

const setHeaders = () => {
  headers.value = {
    'Authorization': getToken('_token'),
    'X-CSRF-TOKEN': getToken('XSRF-TOKEN'),
    'X-XSRF-TOKEN': getToken('XSRF-TOKEN')
  };
};
</script>

<style scoped>
.avatar-uploader .a-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
:deep(.arco-upload-list-picture){
  border:  1px dashed #E5E6EB;
}
.hide .a-upload--picture-card {
  display: none;
}
</style>
