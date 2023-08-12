<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '天车状态']" />
    <div class="layout">
      <a-layout>
        <a-layout-content><CraneModel /></a-layout-content>
        <a-layout-sider style="width: 260px">
          <CraneStateSet />
        </a-layout-sider>
        <a-layout-sider style="width: 260px; margin-left: 20px">
          <CraneStateSet />
        </a-layout-sider>
      </a-layout>
    </div>
    <div class="layout-bottom">
      <a-space :size="16" direction="vertical" fill>
        <CraneCoordinates />
        <CraneTimeline />
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CraneTimeline from '@/views/dashboard/overhead-crane-state/components/crane-timeline.vue';
import CraneModel from './components/crane-model.vue';
import CraneStateSet from './components/crane-state-set.vue';
import CraneCoordinates from './components/crane-coordinates.vue';

export default defineComponent({
  components: { CraneTimeline, CraneModel, CraneCoordinates, CraneStateSet },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.layout {
  display: flex;

  .layout-content {
    flex: 1;
    padding-right: 16px;
  }

  .layout-right-side {
    flex-basis: 280px;
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}
.layout-bottom {
  margin-top: 20px;
}
</style>
