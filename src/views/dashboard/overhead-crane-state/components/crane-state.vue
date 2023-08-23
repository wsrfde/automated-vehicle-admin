<template>
  <a-card class="crane-state" title="状态集合">
    <a-descriptions
      :data="stateData(craneData)"
      :column="2"
      size="large"
      :align="{ value: 'right' }"
    >
      <a-descriptions-item
        v-for="(item, index) of stateData(craneData)"
        :key="index"
        :label="item.label"
      >
        <a-tag
          :color="stateFun(item.value).color"
          size="large"
          class="custom-tag"
        >
          {{ stateFun(item.value).title }}
        </a-tag>
      </a-descriptions-item>
    </a-descriptions>
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
    const stateData = (data) => [
      {
        label: '电源状态',
        value: data.powerStatus,
      },
      {
        label: '大车状态',
        value: data.mainCarStatus,
      },
      {
        label: '小车状态',
        value: data.subCarStatus,
      },
      {
        label: '边缘计算机状态',
        value: data.edgeComputerStatus,
      },
      {
        label: '极限限位',
        value: data.limitSwitch,
      },
      {
        label: '栏杆门限位',
        value: data.railingLimitSwitch,
      },
    ];

    const stateFun = (state: string) => {
      switch (state) {
        case 0:
          return {
            color: '#5ebb3a',
            title: '正常',
          };
        case 1:
          return {
            color: '#ff7d00',
            title: '警告',
          };
        case 2:
          return {
            color: '#f53f3f',
            title: '异常',
          };
        default:
          return {
            color: 'red',
            title: '-',
          };
      }
    };

    return {
      stateData,
      stateFun,
    };
  },
});
</script>

<style scoped lang="less">
.crane-state {
  height: 100%;
  .custom-tag {
    width: 8vw;
    text-align: center;
    display: inline-block;
  }
}
</style>
