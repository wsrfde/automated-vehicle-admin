<template>
  <a-card class="crane-coordinates" title="天车坐标">
    <a-descriptions :data="initData(craneData)" bordered :column="2" />
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
    const initData = (data = {}) => [
      {
        label: '大车X坐标',
        value: data.crane_x ? data.crane_x.toFixed() : '-',
      },
      {
        label: '小车Y坐标',
        value: data.crane_y ? data.crane_y.toFixed() : '-',
      },
      {
        label: '抓斗高度Z坐标',
        value: data.crane_z ? data.crane_z.toFixed() : '-',
      },
      {
        label: '称重（吨）',
        value: data.grab_w ? data.grab_w.toFixed(1) : '-',
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
