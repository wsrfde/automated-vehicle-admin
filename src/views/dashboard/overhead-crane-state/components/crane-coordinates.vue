<template>
  <a-row :gutter="24">
    <a-col :span="12">
      <a-card class="general-card" title="天车坐标">
        <a-descriptions :data="oneCarData" bordered :column="2">
          <template #title>
            <p class="desc-title">天车 #01</p>
          </template>
        </a-descriptions>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card class="general-card" title="天车坐标">
        <a-descriptions :data="twoCarData" bordered :column="2">
          <template #title>
            <p class="desc-title">天车 #02</p>
          </template>
        </a-descriptions>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue';
import StompClient from '@/utils/stompServer';

const initData = (data = {}) => [
  {
    label: '大车X坐标',
    value: data.crane_x,
  },
  {
    label: '小车Y坐标',
    value: data.crane_y,
  },
  {
    label: '抓斗高度Z坐标',
    value: data.crane_z,
  },
  {
    label: '称重',
    value: data.grab_w,
  },
];

export default defineComponent({
  setup() {
    const oneCarData = ref(initData());
    const twoCarData = ref(initData());
    const stompClient = new StompClient([
      {
        topicUrl: 'jtgx/crane/position/1',
        callback: (e) => {
          oneCarData.value = initData(e);
        },
      },
      {
        topicUrl: 'jtgx/crane/position/2',
        callback: (e) => {
          twoCarData.value = initData(e);
        },
      },
    ]);
    stompClient.connect();
    onUnmounted(() => {
      stompClient.destroy();
    });
    return {
      oneCarData,
      twoCarData,
    };
  },
});
</script>

<style scoped lang="less">
.desc-title {
  margin-bottom: -12px;
  padding: 5px 20px;
  text-align: center;
  font-weight: normal;
  background-color: var(--color-fill-1);
  border: solid var(--color-neutral-3);
  border-width: 1px 1px 0 1px;
}
</style>
