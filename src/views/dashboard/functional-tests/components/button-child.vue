<template>
  <a-card class="general-card" title="按钮测试">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="12">
          <a-space :size="200">
            <a-button
              status="danger"
              type="primary"
              style="width: 200px; height: 70px"
              @click="carUrgencyStop($event, 0)"
              >一车紧急停止
            </a-button>
            <a-tag
              :color="carStopState[0].pushbuttonStatus ? 'arcoblue' : 'red'"
              style="
                width: 200px;
                height: 70px;
                justify-content: center;
                font-size: 18px;
              "
              >{{ formatStr(carStopState[0].pushbuttonStatus) }}</a-tag
            >
          </a-space>
        </a-col>
        <a-col :span="12">
          <a-space :size="200">
            <a-button
              status="danger"
              type="primary"
              style="width: 200px; height: 70px"
              @click="carUrgencyStop($event, 1)"
              >二车紧急停止
            </a-button>
            <a-tag
              :color="carStopState[1].pushbuttonStatus ? 'arcoblue' : 'red'"
              style="
                width: 200px;
                height: 70px;
                justify-content: center;
                font-size: 18px;
              "
              >{{ formatStr(carStopState[1].pushbuttonStatus) }}</a-tag
            >
          </a-space>
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
import { PropType } from 'vue/dist/vue';

export default defineComponent({
  name: 'ButtonChild',
  props: {
    sendCustomDirectiveFun: {
      type: Function,
      default: () => ({}),
    },
    carStopState: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  setup({ sendCustomDirectiveFun }) {
    const formatStr = (state: boolean) => {
      return state ? `按下` : `弹起`;
    };

    // 紧急停止
    const carUrgencyStop = (event: any, id: number) => {
      const sedMsg = `craneid:${id};onetask:carstop;`;
      sendCustomDirectiveFun('gtai/movingctrl', sedMsg);

      setTimeout(() => {
        const setMsg1 = `craneid:${id};power:false;`;
        sendCustomDirectiveFun('jtgx/overhead-crane-handle/power-on', setMsg1);
      }, 50);
    };
    // 车辆停止
    const carStop = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:carstop;`;
      sendCustomDirectiveFun('gtai/movingctrl', sedMsg);
    };
    // 扫描
    const carScan = (event: any, id: number, onetask: string) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};onetask:${onetask};zz:8.6;speed:100;`;
      sendCustomDirectiveFun('gtai/movingctrl', sedMsg);
    };

    // 一键抓料
    const onceGrasp = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};pick:8.0;`;
      sendCustomDirectiveFun('gtai/movingctrl', sedMsg);
    };
    // 一键放料
    const oncePut = (event: any, id: number) => {
      animateCSS(event.target, 'pulse', 0.5);
      const sedMsg = `craneid:${id};place:8.0;`;
      sendCustomDirectiveFun('gtai/movingctrl', sedMsg);
    };

    return {
      carStop,
      carScan,
      onceGrasp,
      oncePut,
      carUrgencyStop,
      formatStr,
    };
  },
});
</script>

<style scoped lang="less"></style>
