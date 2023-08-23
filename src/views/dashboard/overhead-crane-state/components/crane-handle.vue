<template>
  <a-card class="crane-handle" title="天车操作">
    <a-space>
      <span>操作方式：</span>
      <!--      :before-change="changeSwitch"-->
      <a-switch :model-value="currentOperate" @change="changeSwitch">
        <template #checked> 自动 </template>
        <template #unchecked> 手动 </template>
      </a-switch>
    </a-space>
    <a-space direction="vertical" fill style="margin-top: 10px">
      <span>状态切换：</span>
      <a-button
        v-for="(item, index) in stepOption"
        :key="index"
        :disabled="!currentOperate || item.value === currentStep"
        type="outline"
        @click="changeState(item.value)"
      >
        {{ item.title }}
      </a-button>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { overheadCrane } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';

export default defineComponent({
  props: {
    craneNo: {
      type: Number,
      default: 1,
    },
    currentOperate: {
      type: Boolean,
      default: false,
    },
    currentStep: {
      type: String,
      default: '',
    },
    stepOption: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const overheadCraneFun = async (step, operate) => {
      const query = { message: { crane_no: props.craneNo, step, operate } };

      await overheadCrane(JSON.stringify(query)).then((res) => {
        Notification.success('天车操作成功');
      });
    };

    const changeState = async (val: number) => {
      await overheadCraneFun(val, props.currentOperate);
    };

    const changeSwitch = async (val) => {
      await overheadCraneFun(props.currentStep, val);
    };

    return {
      changeState,
      changeSwitch,
    };
  },
});
</script>

<style scoped lang="less">
p {
  margin: 0 0 15px;
}
.m10 {
  display: block;
  margin: 15px auto;
}
</style>
