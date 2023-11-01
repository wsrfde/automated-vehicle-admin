<template>
  <a-card class="general-card" title="开关切换">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="12">
          <a-switch
            :model-value="switchData[0].power"
            :disabled="oneCarStartup"
            @change="carStartup($event, 0)"
          />
          <span class="ml10"> 一车电源开关</span>
        </a-col>
        <a-col :span="12">
          <a-switch
            :model-value="switchData[1].power"
            :disabled="twoCarStartup"
            @change="carStartup($event, 1)"
          />
          <span class="ml10"> 二车电源开关</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-switch
            :model-value="switchData[0].Preparing === 1"
            @change="carPour($event, 0)"
          />
          <span class="ml10"> 一车倒料开关</span>
        </a-col>
        <a-col :span="12">
          <a-switch
            :model-value="switchData[1].Preparing === 1"
            @change="carPour($event, 1)"
          />
          <span class="ml10"> 二车倒料开关</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-switch
            :model-value="switchData[0].fanyao"
            @change="carShake($event, 0)"
          />
          <span class="ml10"> 一车防摇开关</span>
        </a-col>
        <a-col :span="12">
          <a-switch
            :model-value="switchData[1].fanyao"
            @change="carShake($event, 1)"
          />
          <span class="ml10"> 二车防摇开关</span>
        </a-col>
      </a-row>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  name: 'SwitchChild',
  props: {
    switchData: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    sendCustomDirectiveFun: {
      type: Function,
      default: () => ({}),
    },
  },
  setup({ sendCustomDirectiveFun }) {
    const oneCarStartup = ref(false);
    const twoCarStartup = ref(false);

    // 电源
    const carStartup = (val: any, id: number) => {
      const sedMsg = `craneid:${id};power:${val};`;
      sendCustomDirectiveFun('jtgx/overhead-crane-handle/power-on', sedMsg);
      if (id === 0) {
        oneCarStartup.value = true;
      } else {
        twoCarStartup.value = true;
      }
      setTimeout(() => {
        if (id === 0) {
          oneCarStartup.value = false;
        } else {
          twoCarStartup.value = false;
        }
      }, 10000);
    };
    // 倒料
    const carPour = (val: any, id: number) => {
      const sedMsg = val
        ? `craneid:${id};step:3;auto:${val};`
        : `craneid:${id};step:1;auto:${val};`;
      sendCustomDirectiveFun('jtgx/overhead-crane-handle/1', sedMsg);
    };

    // 防摇
    const carShake = (val: any, id: number) => {
      const sedMsg = `craneid:${id};faultresset:${val};`;
      sendCustomDirectiveFun('jtgx/overhead-crane-handle/kinema-argvs', sedMsg);
    };

    return {
      oneCarStartup,
      twoCarStartup,
      carStartup,
      carPour,
      carShake,
    };
  },
});
</script>

<style scoped lang="less"></style>
