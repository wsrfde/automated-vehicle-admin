<template>
  <a-card class="general-card" title="状态集合">
    <a-descriptions
      :data="stateData"
      :column="1"
      size="large"
      :align="{ value: 'right' }"
    >
      <a-descriptions-item
        v-for="(item, index) of stateData"
        :key="index"
        :label="item.label"
      >
        <a-tag
          :color="stateColorFun(item.value)"
          size="large"
          class="custom-tag"
        >
          {{ item.value }}
        </a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const stateData = [
      {
        label: '电源状态',
        value: '正常',
      },
      {
        label: '主梁门',
        value: '正常',
      },
      {
        label: '大车状态',
        value: '警告',
      },
      {
        label: '中控有效',
        value: '正常',
      },
      {
        label: '小车状态',
        value: '警告',
      },
      {
        label: '通信状态',
        value: '异常',
      },
      {
        label: '电源状态',
        value: '正常',
      },
      {
        label: '侧梁门',
        value: '正常',
      },
      {
        label: '大车状态',
        value: '警告',
      },
      {
        label: '中控有效',
        value: '正常',
      },
      {
        label: '小车状态',
        value: '警告',
      },
      {
        label: '通信状态',
        value: '异常',
      },
    ];

    const stateColorFun = (state: string) => {
      switch (state) {
        case '正常':
          return '#5ebb3a';
        case '警告':
          return '#ff7d00';
        case '异常':
          return '#f53f3f';
        default:
          return 'red';
      }
    };

    return {
      stateData,
      stateColorFun,
    };
  },
});
</script>

<style scoped lang="less">
.custom-tag {
  width: 140px;
  text-align: center;
  display: inline-block;
}
</style>
