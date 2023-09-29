<template>
  <a-card class="general-card" title="开关切换">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="12">
          <a-switch :disabled="oneCarStartup" @change="carStartup($event, 0)" />
          <span class="ml10"> 一车电源开关</span>
        </a-col>
        <a-col :span="12">
          <a-switch :disabled="twoCarStartup" @change="carStartup($event, 1)" />
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
          <a-switch v-model="shakeStatus[0]" @change="carShake($event, 0)" />
          <span class="ml10"> 一车防摇开关</span>
        </a-col>
        <a-col :span="12">
          <a-switch v-model="shakeStatus[1]" @change="carShake($event, 1)" />
          <span class="ml10"> 二车防摇开关</span>
        </a-col>
      </a-row>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'SwitchChild',
  props: {
    sendInstructionsFun: {
      type: Function,
      default: () => ({}),
    },
  },
  setup({ sendInstructionsFun }) {
    const oneCarStartup = ref(false);
    const twoCarStartup = ref(false);

    const shakeStatus = ref([false, false]);

    const statusSwitches = () => {
      shakeStatus.value = shakeStatus.value.map((status) => !status);
    };

    // 电源
    const carStartup = (val: any, id: number) => {
      const sedMsg = `craneid:${id};power:${val};`;
      sendInstructionsFun('jtgx/overhead-crane-handle/power-on', sedMsg);
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
      sendInstructionsFun('jtgx/overhead-crane-handle/1', sedMsg);
    };

    // 防摇
    const carShake = (val: any, id: number) => {
      const sedMsg = `craneid:${id};faultresset:${val};`;
      sendInstructionsFun('jtgx/overhead-crane-handle/kinema-argvs', sedMsg);
    };

    onMounted(() => {
      const intervalId = setInterval(statusSwitches, 5000); // 每隔5秒钟开关状态

      // 在组件卸载时清除定时器，避免内存泄漏
      onUnmounted(() => {
        clearInterval(intervalId);
      });
    });

    return {
      oneCarStartup,
      twoCarStartup,
      carStartup,
      carPour,
      carShake,
      shakeStatus,
    };
  },
});
</script>

<style scoped lang="less"></style>
