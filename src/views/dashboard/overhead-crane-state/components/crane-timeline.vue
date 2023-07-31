<template>
  <a-card class="general-card" title="装车落料">
    <a-timeline v-bind="timelineConfig">
      <a-timeline-item label="2023-05-10"> 任务扫描 </a-timeline-item>
      <a-timeline-item label="2023-05-12"> 库区抓料 </a-timeline-item>
      <a-timeline-item label="2023-05-30" dot-color="var(--color-fill-4)">
        行车避让
      </a-timeline-item>
      <a-timeline-item label="2023-05-30" dot-color="var(--color-fill-4)">
        作业结束
      </a-timeline-item>
    </a-timeline>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const timelineConfig = ref({
      direction: 'horizontal',
    });

    return {
      timelineConfig,
    };
  },
});
</script>

<style scoped></style>
