<template>
  <div class="container">
    <Breadcrumb :items="['个人中心', '用户设置']" />
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <UserPanel />
      </a-col>
    </a-row>
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" title="安全设置">
            <SecuritySettings />
          </a-tab-pane>
          <a-tab-pane key="2" title="系统设置">
            <SystemSettings />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SystemSettings from '@/views/user/setting/components/system-settings.vue';
import UserPanel from './components/user-panel.vue';
import SecuritySettings from './components/security-settings.vue';

export default defineComponent({
  components: {
    SystemSettings,
    UserPanel,
    SecuritySettings,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.wrapper {
  padding: 20px 0 0 20px;
  min-height: 580px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}

:deep(.section-title) {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 14px;
}
</style>
