<template>
  <a-button size="mini" class="gi_hover_btn" @click="handleToggleTheme">
    <!-- <template #icon> -->
      <!-- <icon-sun-fill :size="18" v-if="appStore.theme === 'light'"></icon-sun-fill>
      <icon-moon-fill :size="18" v-else></icon-moon-fill> -->
      <GiSvgIcon name="theme-sun" :size="18" v-if="appStore.theme === 'light'"></GiSvgIcon>
      <GiSvgIcon name="theme-moon" :size="18" v-else></GiSvgIcon>
    <!-- </template> -->
  </a-button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useAppStore } from '@/store'
defineOptions({ name: 'GiThemeBtn' })
const appStore = useAppStore()

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    appStore.toggleTheme(dark)
  }
})

const toggleTheme = useToggle(isDark)

const handleToggleTheme = () => {
  toggleTheme()
}
</script>
