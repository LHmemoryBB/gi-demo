import { defineStore } from 'pinia'
import { reactive, computed, toRefs } from 'vue'
import defaultSettings from '@/config/setting.json'
import type { TabModeType, animateModeType } from '@/config/option'

interface IAppSetting {
  theme: 'light' | 'dark' // 主题
  themeColor: string // 主题色
  tab: boolean // 是否显示页签
  tabMode: TabModeType // 页签风格
  animate: boolean // 是否显示动画
  animateMode: animateModeType // 动画类名
}

const storeSetup = () => {
  // App配置
  const settingConfig = reactive({ ...defaultSettings }) as IAppSetting

  // 页面切换动画类名
  const transitionName = computed(() => (settingConfig.animate ? settingConfig.animateMode : ''))

  // 切换主题  暗黑模式|简白模式
  const toggleTheme = (dark: boolean) => {
    // if (dark) {
    //   settingConfig.theme = 'dark'
    //   document.body.setAttribute('arco-theme', 'dark')
    // } else {
    //   settingConfig.theme = 'light'
    //   document.body.removeAttribute('arco-theme')
    // }
    // setThemeColor(settingConfig.themeColor)
  }

  // 设置主题色
  const setThemeColor = (color: string) => {    
    if (!color) return
    settingConfig.themeColor = color
  }
  const getThemeColor = () => {
    return settingConfig.themeColor
  }
  
  // 设置页签可见
  const setTabVisible = (visible: boolean) => {
    settingConfig.tab = visible
  }

  // 设置页签的样式类型
  const setTabMode = (mode: TabModeType) => {
    settingConfig.tabMode = mode
  }

  // 设置是否使用过渡动画
  const setAnimateVisible = (visible: boolean) => {
    settingConfig.animate = visible
  }

  // 设置页面过渡动画类型
  const setAnimateMode = (mode: animateModeType) => {
    settingConfig.animateMode = mode
  }

  return {
    ...toRefs(settingConfig),
    transitionName,
    toggleTheme,
    setThemeColor,
    setTabVisible,
    setTabMode,
    setAnimateVisible,
    setAnimateMode,
    getThemeColor
  }
}

export const useAppStore = defineStore('app', storeSetup, { persist: true })
