<template>
  <a-card class="crane-coordinates" title="天车坐标">
    <a-descriptions :data="oneCarData" bordered :column="2" />
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue';

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

export default defineComponent({
  setup() {
    const oneCarData = ref(initData());
    const twoCarData = ref(initData());

    return {
      oneCarData,
      twoCarData,
    };
  },
});
</script>

<style scoped lang="less">
.crane-coordinates {
  height: 100%;
}
</style>
