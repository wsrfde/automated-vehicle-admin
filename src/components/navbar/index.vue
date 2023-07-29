<template>
  <div class="navbar">
    <div class="left-side"></div>
    <ul class="right-side">
      <li>
        <a-tooltip :content="$t('settings.navbar.alerts')">
          <div class="message-box-trigger">
            <a-badge :count="9" dot>
              <a-button
                class="nav-btn"
                type="outline"
                :shape="'circle'"
                @click="setPopoverVisible"
              >
                <icon-notification />
              </a-button>
            </a-badge>
          </div>
        </a-tooltip>
        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, minWidth: '400px' }"
          content-class="message-popover"
        >
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <message-box />
          </template>
        </a-popover>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar :size="32" :style="{ marginRight: '8px' }">
            <img alt="avatar" :src="avatar" />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="$router.push({ name: 'info' })">
                <icon-user />
                <span>
                  {{ $t('messageBox.userCenter') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'setting' })">
                <icon-settings />
                <span>
                  {{ $t('messageBox.userSettings') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  {{ $t('messageBox.logout') }}
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useDark, useToggle } from '@vueuse/core';
import { useAppStore, useUserStore } from '@/store';
import { LOCALE_OPTIONS } from '@/locale';
import useLocale from '@/hooks/locale';
import useUser from '@/hooks/user';
import MessageBox from '../message-box/index.vue';

export default defineComponent({
  components: {
    MessageBox,
  },
  setup() {
    const appStore = useAppStore();
    const userStore = useUserStore();
    const { logout } = useUser();
    const { changeLocale } = useLocale();
    const locales = [...LOCALE_OPTIONS];
    const avatar = computed(() => {
      return userStore.avatar;
    });
    const theme = computed(() => {
      return appStore.theme;
    });
    const isDark = useDark({
      selector: 'body',
      attribute: 'arco-theme',
      valueDark: 'dark',
      valueLight: 'light',
      storageKey: 'arco-theme',
      onChanged(dark: boolean) {
        // overridded default behavior
        appStore.toggleTheme(dark);
      },
    });
    const toggleTheme = useToggle(isDark);

    const refBtn = ref();
    const triggerBtn = ref();
    const setPopoverVisible = () => {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      refBtn.value.dispatchEvent(event);
    };
    const handleLogout = () => {
      logout();
    };
    const setDropDownVisible = () => {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      triggerBtn.value.dispatchEvent(event);
    };
    const switchRoles = async () => {
      const res = await userStore.switchRoles();
      Message.success(res as string);
    };
    const switchGit = () => {
      window.open('https://github.com/chuzhixin');
    };
    const open = (val: string) => {
      window.open(`https://vue-admin-beautiful.com/${val}`);
    };
    return {
      locales,
      theme,
      avatar,
      changeLocale,
      toggleTheme,
      setPopoverVisible,
      refBtn,
      triggerBtn,
      handleLogout,
      setDropDownVisible,
      switchRoles,
      switchGit,
      open,
    };
  },
});
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
  width: calc(100% - 250px);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
  :deep(.locale-select) {
    border-radius: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
.arco-dropdown-list-wrapper {
  max-height: 100vh !important;
}
</style>
