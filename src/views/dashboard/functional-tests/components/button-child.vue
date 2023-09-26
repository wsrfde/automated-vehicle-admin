<template>
  <a-card class="general-card" title="按钮测试">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="12">
          <a-button @click="carScan($event, 0)">一车全局扫描 </a-button>
        </a-col>
        <a-col :span="12">
          <a-button @click="carScan($event, 1)">二车全局扫描 </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-button @click="singleDischarge($event, 0)"
            >一车单次卸料点动
          </a-button>
        </a-col>
        <a-col :span="12">
          <a-button @click="singleDischarge($event, 1)"
            >二车单次卸料点动
          </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-button @click="singlePour($event, 0)">一车单次倒料点动 </a-button>
        </a-col>
        <a-col :span="12">
          <a-button @click="singlePour($event, 1)">二车单次倒料点动 </a-button>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-button @click="onceGrasp($event, 0)">一车一键抓料 </a-button>
        </a-col>
        <a-col :span="12">
          <a-button @click="onceGrasp($event, 1)">二车一键抓料 </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-button @click="oncePut($event, 0)">一车一键放料 </a-button>
        </a-col>
        <a-col :span="12">
          <a-button @click="oncePut($event, 1)">二车一键放料 </a-button>
        </a-col>
      </a-row>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'animate.css';
import animateCSS from '@/utils/animate';

export default defineComponent({
  name: 'ButtonChild',
  props: {
    sendInstructionsFun: {
      type: Function,
      default: () => ({}),
    },
  },
  setup({ sendInstructionsFun }) {
    // 扫描
    const carScan = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:scanfull;zz:8.6;speed:100;`;
      sendInstructionsFun('gtai/movingctrl', sedMsg);
    };
    // 单次卸料
    const singleDischarge = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:loadingIn;entrance:1;pickingzz:9;placeoz:8.0;`;
      sendInstructionsFun('gtai/movingctrl', sedMsg);
    };

    // 单次倒料
    const singlePour = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:preparing;pickingzz:9;placeoz:8.0;`;
      sendInstructionsFun('gtai/movingctrl', sedMsg);
    };

    // 一键抓料
    const onceGrasp = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};pick:8.0;`;
      sendInstructionsFun('gtai/movingctrl', sedMsg);
    };
    // 一键放料
    const oncePut = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};place:8.0;`;
      sendInstructionsFun('gtai/movingctrl', sedMsg);
    };

    return {
      carScan,
      singleDischarge,
      singlePour,
      onceGrasp,
      oncePut,
    };
  },
});
</script>

<style scoped lang="less"></style>
