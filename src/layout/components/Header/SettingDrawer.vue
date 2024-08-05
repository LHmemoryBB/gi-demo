<template>
  <a-drawer v-model:open="visible" title="项目配置" width="300px" :footer="false">
    <a-space :size="15" direction="vertical" fill>
      <a-divider orientation="center">系统主题</a-divider>
      <a-row justify="center">
        <ColorPicker
          theme="dark"
          :color="appStore.themeColor"
          :sucker-hide="true"
          :colors-default="defaultColorList"
          @changeColor="changeColor"
        ></ColorPicker>
      </a-row>

      <a-divider orientation="center">界面显示</a-divider>

      <a-row justify="space-between" align="middle">
        <a-typography-text>页签显示</a-typography-text>
        <a-switch size="small" :model-value="appStore.tab" @change="appStore.setTabVisible(Boolean($event))" />
      </a-row>

      <a-row justify="space-between" align="middle">
        <a-typography-text>页签风格</a-typography-text>
        <a-select
          placeholder="请选择"
          :model-value="appStore.tabMode"
          :disabled="!appStore.tab"
          :style="{ width: '120px' }"
          :trigger-props="{ autoFitPopupMinWidth: true }"
        >
          <a-select-option
            v-for="item in tabModeList"
            :key="item.value"
            :value="item.value"
            @click="appStore.setTabMode(item.value)"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </a-row>

      <a-row justify="space-between" align="middle">
        <a-typography-text>动画显示</a-typography-text>
        <a-switch size="small" :model-value="appStore.animate" @change="appStore.setAnimateVisible(Boolean($event))" />
      </a-row>

      <a-row justify="space-between" align="middle">
        <a-typography-text>动画切换类型</a-typography-text>
        <a-select
          placeholder="请选择"
          :model-value="appStore.animateMode"
          :disabled="!appStore.animate"
          :style="{ width: '120px' }"
        >
          <a-select-option
            v-for="item in animateModeList"
            :key="item.value"
            :value="item.value"
            @click="appStore.setAnimateMode(item.value)"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </a-row>
    </a-space>
  </a-drawer>
</template>

<script setup lang="ts" name="SettingDrawer">
import {defineExpose} from 'vue'
import { useAppStore } from '@/store'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import { tabModeList, animateModeList } from '@/config/option'

const appStore = useAppStore()
const visible = ref(false)

if (appStore.themeColor) {
  appStore.setThemeColor(appStore.themeColor)
}

const open = () => {
  visible.value = true
}

defineExpose({ open })

// 默认显示的主题色列表
const defaultColorList = [
  '#165DFF',
  '#409EFF',
  '#2d8cf0',
  '#007AFF',
  '#5ac8fa',
  '#5856D6',
  '#536dfe',
  '#9c27b0',
  '#AF52DE',
  '#0096c7',
  '#00C1D4',
  '#34C759',
  '#43a047',
  '#7cb342',
  '#c0ca33',
  '#78DEC7',
  '#e53935',
  '#d81b60',
  '#f4511e',
  '#fb8c00',
  '#ffb300',
  '#fdd835',
  '#6d4c41',
  '#546e7a'
]

type ColorObj = {
  hex: string
  hsv: { h: number; s: number; v: number }
  rgba: { r: number; g: number; b: number; a: number }
}

// 改变主题色
const changeColor = debounce((colorObj: ColorObj) => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(colorObj.hex)) return
  appStore.setThemeColor(colorObj.hex)
}, 1000)

// 防抖函数
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (...args: any[]) {
    const context = this

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}
</script>

<style lang="scss" scoped>
:deep(.hu-color-picker){
  width: auto !important;
}

</style>
