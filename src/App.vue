<template>
  <a-config-provider :theme="setThemeColor">
    <router-view></router-view>
    <template #loading>
      <img src="/static/images/loading.gif" class="loading-icon" />
    </template>
  </a-config-provider>
</template>

<script setup lang="ts">
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
console.log();

</script>

<style lang="scss" scoped>
.loading-icon {
  width: 30px;
}
</style>
