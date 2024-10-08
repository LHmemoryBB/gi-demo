<script setup>
import { ref, reactive, toRaw, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { up_image, setUserEdit } from '@/api/index'
import TuploadImg from '@/components/Templates/TuploadImg.vue'
import { notification } from 'ant-design-vue'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'

const emit = defineEmits()
let Update = reactive({
  title: '修改',
  width: '580px',
  isShow: false,
  modal: true,
  draggable: true
})

const _state = () => ({
  id: '',
  apiKey: '',
  roleType: '',
  account: '',
  userName: '',
  phone: '',
  avatar: '',
  whiteIps: [],
  enabled: false
})
const validatorPhone = (rule, value, callback) => {
  const reg = /^1[3456789]\d{9}$/
  if (!reg.test(value)) {
    return Promise.reject('请输入正确的手机号')
  } else {
    return Promise.resolve();
  }
}
const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'input',
    label: '用户接口秘钥',
    prop: 'apiKey',
    placeholder: ' ',
    disabled: true
  },
  {
    type: 'input',
    label: '登录名',
    prop: 'account',
    rules: { required: true, message: '请输入登录名' }
  },
  {
    type: 'select',
    label: '角色类别',
    prop: 'roleType',
    _url: '/userInfo/roleType',
    rules: { required: true, message: '请选择用户角色' }
  },
  {
    type: 'input',
    label: '用户名',
    prop: 'userName',
    rules: { required: true, message: '请输入用户名' }
  },
  {
    type: 'input',
    label: '联系方式',
    prop: 'phone',
    rules: [
      { required: true, message: '请输入联系方式' },
      { validator: validatorPhone, trigger: 'blur' }
    ]
  },
  {
    type: 'custom',
    label: '用户头像',
    prop: 'avatar'
  },
  {
    type: 'custom',
    prop: 'enabled'
  },
  {
    type: 'custom',
    prop: 'whiteIps'
  }
]
//open初始
const on_init = (row) => {
  row = toRaw(row)
  Update.isShow = true
  for (let keys in ruleForm) {
    ruleForm[keys] = row[keys] ?? ''
  }
  ruleForm.avatar = [
    {
      name: row.avatar,
      uid: row.avatar,
      url: row.avatar,
      response: [row.avatar]
    }
  ]
  ruleForm.whiteIps = row.whiteIps.split(',').map((item) => {
    return { website: item }
  })
}
//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}

const { loading, data, onSuccess, onError, send } = useAxios(setUserEdit, {
  immediate: false
})
onSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '修改成功!',
    duration: 3
  })
  emit('onSuccess')
  Update.isShow = false
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '修改失败！',
    duration: 3
  })
})

//提交
const submit = (type) => {
  let data = {
    ...ruleForm,
    avatar: ruleForm.avatar.map((item) => item.response[0])[0],
    whiteIps: ruleForm.whiteIps.map((obj) => obj.website).join(',')
  }
  send(data)
}
//确认
const confirm = () => {
  RefTform.value?.submitForm()
}

//类型2  删除
const invTransitCodesRemove = (i) => {
  if (ruleForm.whiteIps.length <= 1) return
  ruleForm.whiteIps.splice(i, 1)
}
//类型2  新增
const invTransitCodesAdd = (i) => {
  ruleForm.whiteIps.push({ website: '' })
}

//图片上传
const pathSuccess = (response, file, fileList) => {
  ruleForm.avatar = fileList
}
//图片删除
const pathRemove = (file, fileList) => {
  ruleForm.avatar = fileList
}

defineExpose({
  on_init
})
</script>

<template>
  <Tdialog :Update="Update" :loading="loading" @confirm="confirm" @close="close">
    <Tform
      ref="RefTform"
      :loading="loading"
      :ruleForm="ruleForm"
      :listInput="listInput"
      @submit="submit"
      label_width="120px"
      btn_hide
    >
      <template #avatar="scope">
        <a-form-item
          label="用户头像"
          :name="'avatar'"
          :rules="{ required: true, message: '请添加图片' }"
          label-width="120px"
        >
          <TuploadImg
            :up_img_api="up_image"
            :fileList="ruleForm.avatar"
            :size="200 * 1024"
            sizeName="200KB"
            :limit="1"
            multiple
            @pathSuccess="pathSuccess"
            @pathRemove="pathRemove"
          ></TuploadImg>
        </a-form-item>
      </template>
      <template #enabled="scope">
        <a-form-item label="是否启用" name="enabled" label-width="120px">
          <a-switch v-model:checked="ruleForm.enabled" checked-children="是" un-checked-children="否"/>
        </a-form-item>
      </template>
      <template #whiteIps="scope">
        <TransitionGroup tag="ul" name="fade">
          <div class="fixed_width_box" v-for="(item, index) in ruleForm.whiteIps" :key="item">
            <div class="fixed_width">
              <a-form-item
                label="ip白名单"
                :name="'whiteIps.' + index + '.website'"
                :rules="{ required: false, message: '请输入ip白名单' }"
              >
                <a-input v-model:value="item.website" placeholder="请输入ip白名单" clearable />
              </a-form-item>
            </div>
            <a-button
              class="m_l_10"
              danger
              v-if="ruleForm.whiteIps.length > 1"
              @click="invTransitCodesRemove(index)"
            >
            <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
            <a-button class="m_l_10" type="primary" ghost @click="invTransitCodesAdd(index)">
              <template #icon>
                <PlusOutlined />
              </template>
            </a-button>
          </div>
        </TransitionGroup>
      </template>
    </Tform>
  </Tdialog>
</template>


<style scoped>
.fixed_width_box {
  display: flex;
  border-bottom: 1px solid #eee;
  padding-top: 10px;
}
.fixed_width {
  display: flex;
  flex-direction: column;
}
</style>
