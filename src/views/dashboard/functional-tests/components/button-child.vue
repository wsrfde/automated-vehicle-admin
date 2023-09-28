<template>
  <a-card class="general-card" title="按钮测试">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="12">
          <a-button
            status="danger"
            type="primary"
            style="width: 200px; height: 70px"
            @click="carUrgencyStop($event, 0)"
            >一车紧急停止
          </a-button>
        </a-col>
        <a-col :span="12">
          <a-button
            status="danger"
            type="primary"
            style="width: 200px; height: 70px"
            @click="carUrgencyStop($event, 1)"
            >二车紧急停止
          </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-button @click="carStop($event, 0)">一车停止 </a-button>
        </a-col>
        <a-col :span="12">
          <a-button @click="carStop($event, 1)">二车停止 </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-button @click="carScan($event, 0, 'carscan')"
            >一车车辆扫描
          </a-button>
        </a-col>
        <a-col :span="12">
          <a-button @click="carScan($event, 1, 'carscan')"
            >二车车辆扫描
          </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-button @click="carScan($event, 0, 'scanfull')"
            >一车全局扫描
          </a-button>
        </a-col>
        <a-col :span="12">
          <a-button @click="carScan($event, 1, 'scanfull')"
            >二车全局扫描
          </a-button>
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
    // 紧急停止
    const carUrgencyStop = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:carstop;`;
      sendInstructionsFun('gtai/movingctrl', sedMsg);

      setTimeout(() => {
        const setMsg1 = `craneid:${id};power:false;`;
        sendInstructionsFun('jtgx/overhead-crane-handle/power-on', setMsg1);
      }, 50);
    };
    // 车辆停止
    const carStop = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:carstop;`;
      sendInstructionsFun('gtai/movingctrl', sedMsg);
    };
    // 扫描
    const carScan = (event: any, id: number, onetask: string) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:${onetask};zz:8.6;speed:100;`;
      sendInstructionsFun('gtai/movingctrl', sedMsg);
    };
    // 单次卸料
    const singleDischarge = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:loadingIn;entrance:1;pickingzz:9;placeoz:2.0;`;
      sendInstructionsFun('gtai/movingctrl', sedMsg);
    };

    // 单次倒料
    const singlePour = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:preparing;pickingzz:9;placeoz:2.0;`;
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
      carStop,
      carScan,
      singleDischarge,
      singlePour,
      onceGrasp,
      oncePut,
      carUrgencyStop,
    };
  },
});
</script>

<style scoped lang="less"></style>
