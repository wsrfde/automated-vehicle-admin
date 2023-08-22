<template>
  <a-card class="crane-handle" title="天车操作">
    <a-space>
      <span>操作方式：</span>
      <a-switch v-model="checkVal" :before-change="changeSwitch">
        <template #checked> 自动 </template>
        <template #unchecked> 手动 </template>
      </a-switch>
    </a-space>
    <a-space direction="vertical" fill style="margin-top: 10px">
      <span>状态切换：</span>
      <a-button
        v-for="(item, index) in stepOption"
        :key="index"
        :disabled="!checkVal || item.value === currentStep"
        type="outline"
        @click="btnClick(item.value)"
      >
        {{ item.title }}
      </a-button>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    currentStep: {
      type: String,
      default: '',
    },
    stepOption: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['changeStep'],
  setup(props, { emit }) {
    const checkVal = ref(false);

    const btnClick = (val: number) => {
      emit('changeStep', val);
    };

    const changeSwitch = async (newValue) => {
      console.log(newValue);
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      return true;
    };

    return {
      checkVal,
      btnClick,
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
