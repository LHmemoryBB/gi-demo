<template>
  <section class="system-logo" :class="{ collapse: collapse }" @click="toHome">
    <img class="logo" src="@/assets/images/logo.gif" />
    <span class="system-name">Admin Pro</span>
  </section>
</template>

<script setup lang="ts">
interface Props {
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapse: false
})

const router = useRouter()

// 跳转首页
const toHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.system-logo {
  height: 56px;
  padding: 0 12px;
  font-size: 20px;
  line-height: 1;
  color: var(--color-text-1);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  background-color: var(--color-bg-1);
  &.collapse {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    // .logo {
    //   width: 24px;
    //   height: 24px;
    // }
    .system-name {
      display: none;
    }
  }
  .logo {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    transition: all 0.2s;
    overflow: hidden;
    flex-shrink: 0;
  }
  .system-name {
    padding-left: 10px;
    white-space: nowrap;
    transition: color 0.3s;
    &:hover {
      // color: $color-theme !important;
      cursor: pointer;
    }
  }
}
</style>
