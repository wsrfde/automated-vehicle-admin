<template>
  <a-card title="开关状态">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="12">
          自动状态：
          <a-tag :color="craneData.operate ? 'arcoblue' : 'red'">
            {{ craneData.operate ? '自动' : '手动' }}
          </a-tag>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          电源状态：
          <a-tag :color="craneData.power ? 'arcoblue' : 'red'">
            {{ formatStr(craneData.power, '电源') }}
          </a-tag>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          防摇状态：
          <a-tag :color="craneData.fanyao ? 'arcoblue' : 'red'">
            {{ formatStr(craneData.fanyao, '防摇') }}
          </a-tag>
        </a-col>
      </a-row>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SwitchStatus',
  props: {
    craneData: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  setup() {
    // power
    const formatStr = (state: boolean, str: string) => {
      return state ? `${str}开启` : `${str}关闭`;
    };

    return {
      formatStr,
    };
  },
});
</script>

<style scoped lang="less"></style>
