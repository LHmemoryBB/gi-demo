<template>
  <a-layout-header>
    <a-row align="middle" class="h-100">
      <a-col :xs="0" :md="10" :lg="10" :xl="12" :xxl="12">
        <Breadcrumb></Breadcrumb>
      </a-col>
      <a-col :xs="24" :md="14" :lg="14" :xl="12" :xxl="12">
        <a-row justify="end" align="center">
          <a-space size="medium">
            <!-- 项目配置 -->
            <a-tooltip>
              <template #title>项目配置</template>
              <a-button size="mini" class="gi_hover_btn" @click="SettingDrawerRef?.open">
                <template #icon>
                  <SettingOutlined  :size="18"/>
                </template>
              </a-button>
            </a-tooltip>

            <!-- 消息通知 -->
            <a-popover position="br" trigger="click">
              <a-badge :count="9" dot>
                <a-button size="mini" class="gi_hover_btn">
                  <template #icon>
                    <BellOutlined  :size="18" />
                  </template>
                </a-button>
              </a-badge>
              <template #content>
                <Message></Message>
              </template>
            </a-popover>

            <!-- 全屏切换组件 -->
            <a-tooltip v-if="!_XEUtils_.browse().isMobile">
              <template #title>全屏切换</template>
              <a-button size="mini" class="gi_hover_btn" @click="onToggleFullScreen">
                <template #icon>
                  <FullscreenOutlined :size="18" v-if="!isFullScreen" />
                  <FullscreenExitOutlined :size="18" v-else />
                </template>
              </a-button>
            </a-tooltip>

            <!-- 暗黑模式切换 -->
            <a-tooltip content="主题切换" position="bottom">
              <template #title>主题切换</template>
              <GiThemeBtn></GiThemeBtn>
            </a-tooltip>

            <!-- 管理员账户 -->
            <a-dropdown trigger="hover">
              <a-row align="center" :wrap="false" class="user">
                <!-- 管理员头像 -->
                <a-avatar :size="32">
                  <img :src="userStore.userInfo.avatar" />
                </a-avatar>
                <span class="username">{{ userStore.userName }}</span>
                <DownOutlined />
              </a-row>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="toUser">
                    <template #icon>
                      <span class="doption-icon primary"><UserOutlined /></span>
                    </template>
                    <span>个人中心</span>
                  </a-menu-item>
                  <a-divider style="margin: 0" />
                  <a-menu-item @click="logout">
                    <template #icon>
                      <span class="doption-icon warning"><LogoutOutlined /></span>
                    </template>
                    <span>退出登录</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-space>
        </a-row>
      </a-col>
    </a-row>

    <SettingDrawer ref="SettingDrawerRef"></SettingDrawer>
  </a-layout-header>
</template>

<script setup lang="ts" name="Header">
import { Modal } from 'ant-design-vue'
import { useUserStore } from '@/store'
import { useFullScreen } from '@/hooks'
import SettingDrawer from './SettingDrawer.vue'
import Message from './Message.vue'
import _XEUtils_ from 'xe-utils'
import {SettingOutlined, BellOutlined, FullscreenOutlined, FullscreenExitOutlined, LogoutOutlined, UserOutlined, DownOutlined } from '@ant-design/icons-vue'
const router = useRouter()
const userStore = useUserStore()
const { isFullScreen, onToggleFullScreen } = useFullScreen()
const SettingDrawerRef = ref<InstanceType<typeof SettingDrawer>>()

// 跳转个人中心
const toUser = () => {
  router.push('/user')
}

// 退出登录
const logout = () => {
  Modal.warning({
    title: '提示',
    content: '确认退出登录？',
    hideCancel: false,
    closable: true,
    onOk: () => {
      userStore.logout()
      router.replace('/login')
    }
  })
}
</script>

<style lang="scss" scoped>
.ant-dropdown-open .ant-icon-down {
  transform: rotate(180deg);
}

.doption-icon {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  // color: #fff;
  border-radius: 4px;
  &.primary {
    background-color: rgba(var(--primary-6));
  }
  &.success {
    background-color: rgba(var(--success-6));
  }
  &.warning {
    background-color: rgba(var(--warning-6));
  }
}

.ant-layout-header {
  // padding: 0 $padding;
  height: 56px;
  background: var(--color-bg-1);
  border-bottom: 1px solid var(--color-neutral-3);
  .user {
    cursor: pointer;
    .username {
      margin-left: 10px;
      white-space: nowrap;
    }
    .ant-icon-down {
      transition: all 0.3s;
      margin-left: 2px;
    }
  }
}
</style>
