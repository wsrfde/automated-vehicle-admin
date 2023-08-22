<template>
  <a-card class="crane-coordinates" title="天车坐标">
    <a-descriptions :data="initData(carData)" bordered :column="2" />
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    carData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const initData = (data = {}) => [
      {
        label: '大车X坐标',
        value: data.crane_x || '-',
      },
      {
        label: '小车Y坐标',
        value: data.crane_y || '-',
      },
      {
        label: '抓斗高度Z坐标',
        value: data.crane_z || '-',
      },
      {
        label: '称重',
        value: data.grab_w || '-',
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
