<template>
  <a-card class="general-card" title="开关状态">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="12">
          一车电源状态：{{ formatStr(switchData[0].power, '电源') }}
        </a-col>
        <a-col :span="12">
          二车电源状态：{{ formatStr(switchData[0].power, '电源') }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          一车防摇状态：{{ formatStr(switchData[1].fanyao, '防摇') }}
        </a-col>
        <a-col :span="12">
          二车防摇状态：{{ formatStr(switchData[1].fanyao, '防摇') }}
        </a-col>
      </a-row>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SwitchState',
  props: {
    switchData: {
      type: Array as PropType<any[]>,
      default: () => [],
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
