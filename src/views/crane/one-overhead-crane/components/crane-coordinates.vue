<template>
  <a-card class="crane-coordinates" title="天车坐标">
    <a-descriptions :data="initData(craneData)" bordered :column="1" />
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    craneData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const initData = (data: any = {}) => [
      {
        label: 'X轴大车坐标',
        value: data.crane_x ? (data.crane_x / 1000).toFixed(3) : '-',
      },
      {
        label: 'Y轴小车坐标',
        value: data.crane_y ? (data.crane_y / 1000).toFixed(3) : '-',
      },
      {
        label: 'Z轴抓斗高度',
        value: data.crane_z ? (data.crane_z / 1000).toFixed(3) : '-',
      },
    ];

    return {
      initData,
    };
  },
});
</script>

<style scoped lang="less">
.crane-coordinates {
  height: 100%;
}
</style>
