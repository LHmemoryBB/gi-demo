<template>
  <ConfigProvider :theme="setThemeColor" :locale="zhCN">
    <router-view></router-view>
    <template #loading>
      <img src="/static/images/loading.gif" class="loading-icon" />
    </template>
  </ConfigProvider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { ConfigProvider } from 'ant-design-vue';
defineOptions({ name: 'App' })
import { useAppStore } from '@/store'
import {computed, reactive} from 'vue'
const appStore = useAppStore()
const setThemeColor = reactive({
  token: {
      colorPrimary: '#DB00FF',
      colorSuccess: '#52c41a'
    }
})
setThemeColor.token.colorPrimary = computed(() => appStore.getThemeColor())

</script>

<style lang="scss" scoped>
.loading-icon {
  width: 30px;
}
</style>
