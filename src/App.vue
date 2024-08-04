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

const setThemeColor = {
  token: {
      colorPrimary: '#DB00FF',
      colorSuccess: '#52c41a'
    }
}
</script>

<style lang="scss" scoped>
.loading-icon {
  width: 30px;
}
</style>
