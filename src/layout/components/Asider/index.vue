<template>
  <div class="asider">
    <Logo :collapse="collapse"></Logo>
    <a-layout-sider breakpoint="xl" :width="232" class="menu" @collapse="handleCollapse">
      <a-menu :selected-keys="[activeMenu]" mode="inline" :auto-open-selected="true" :style="{ width: '100%', height: '100%' }">
        <SidebarItem
          v-for="(route, index) in sidebarRoutes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        ></SidebarItem>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts">
import { usePermissionStore } from '@/store'
import SidebarItem from './SidebarItem.vue'
import { useUserStore } from '@/store'
import Logo from './Logo.vue'
import { getUserRoutes } from '@/api/index'
const route = useRoute()
const userStore = useUserStore()
const router = useRouter()
const permissionStore = usePermissionStore()
const sidebarRoutes = computed(() => userStore.getNavList())


const collapse = ref(false)
const handleCollapse = (isCollapse: boolean) => {
  collapse.value = isCollapse
}

// 当前页面激活菜单路径，先从路由里面找
const activeMenu = computed(() => {
  const {fullPath} = route
  return fullPath
})
</script>

<style lang="scss" scoped>
:deep(.ant-menu.ant-menu-vertical.ant-menu-collapsed) {
  // Menu菜单组件修改
  .ant-menu-icon {
    margin-right: 0;
    padding: 10px 0;
  }
  .ant-menu-has-icon {
    padding: 0;
    justify-content: center;
  }
  .ant-menu-title {
    display: none;
  }
}

.asider {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-right: 1px solid var(--color-border-2);
  .menu {
    flex: 1 !important;
    // overflow: hidden;
  }
}
</style>
