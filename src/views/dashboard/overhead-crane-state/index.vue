<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '天车状态']" />
    <div class="layout">
      <div class="layout-content">
        <a-space :size="16" direction="vertical">
          <CraneModel />
        </a-space>
      </div>
      <div class="layout-right-side">
        <a-space :size="16" direction="vertical" fill>
          <CraneStateSet />
        </a-space>
      </div>
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
    padding: 0 16px;
  }

  .layout-right-side {
    flex-basis: 280px;
  }
}
.layout-bottom {
  margin-top: 20px;
  padding-left: 16px;
}
</style>
