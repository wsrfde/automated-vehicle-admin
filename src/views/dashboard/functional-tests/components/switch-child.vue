<template>
  <a-card class="general-card" title="开关切换">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="12">
          <a-switch @change="carStartup($event, 0)" />
          <span class="ml10"> 一车电源开关</span>
        </a-col>
        <a-col :span="12">
          <a-switch @change="carStartup($event, 1)" />
          <span class="ml10"> 二车电源开关</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-switch @change="carPour($event, 0)" />
          <span class="ml10"> 一车倒料开关</span>
        </a-col>
        <a-col :span="12">
          <a-switch @change="carPour($event, 1)" />
          <span class="ml10"> 二车倒料开关</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-switch @change="carShake($event, 0)" />
          <span class="ml10"> 一车防摇开关</span>
        </a-col>
        <a-col :span="12">
          <a-switch @change="carShake($event, 1)" />
          <span class="ml10"> 二车防摇开关</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-switch @change="autoSwitch($event, 0)" />
          <span class="ml10"> 一车自动与手动切换</span>
        </a-col>
        <a-col :span="12">
          <a-switch @change="autoSwitch($event, 1)" />
          <span class="ml10"> 二车自动与手动切换</span>
        </a-col>
      </a-row>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SwitchChild',
  props: {
    sendInstructionsFun: {
      type: Function,
    },
  },
  setup({ sendInstructionsFun }) {
    // 电源
    const carStartup = (val: any, id: number) => {
      const sedMsg = `craneid:${val};power:${id};`;
      sendInstructionsFun('jtgx/overhead-crane-handle/power-on', sedMsg);
    };
    // 倒料
    const carPour = (val: any, id: number) => {
      const sedMsg = val
        ? `craneid:${id};step:3;auto:${val};`
        : `craneid:${id};step:1;auto:${val};`;
      sendInstructionsFun('jtgx/overhead-crane-handle/1', sedMsg);
    };

    // 防摇
    const carShake = (val: any, id: number) => {
      const sedMsg = `craneid:${id};faultresset:${val};`;
      sendInstructionsFun('jtgx/overhead-crane-handle/kinema-argvs', sedMsg);
    };

    // 自动/手动切换
    const autoSwitch = (val: any, id: number) => {
      const sedMsg = `craneid:${id};step:1;auto:${val};`;
      sendInstructionsFun('jtgx/overhead-crane-handle/1', sedMsg);
    };
    return {
      carStartup,
      carPour,
      carShake,
      autoSwitch,
    };
  },
});
</script>

<style scoped lang="less"></style>
