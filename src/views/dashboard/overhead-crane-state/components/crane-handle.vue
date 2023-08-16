<template>
  <a-card class="crane-handle" title="天车操作">
    <p>
      <span>切换状态：</span>
      <a-select
        v-model="selectVal"
        placeholder="请选择"
        style="width: 120px"
        @change="changeSelect"
      >
        <a-option
          v-for="(item, index) of stepOption"
          :key="index"
          :value="item.value"
          :label="item.title"
        />
      </a-select>
    </p>
    <p>
      <span>操作方式：</span>
      <a-switch @change="changeSwitch">
        <template #checked> 自动 </template>
        <template #unchecked> 手动 </template>
      </a-switch>
    </p>
    <a-button type="outline" class="m10" @click="stopRun">停止倒料</a-button>
    <a-button type="primary" class="m10" @click="startRun">开始倒料</a-button>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    currentStep: {
      type: Number,
      default: 0,
    },
    stepOption: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['changeStep'],
  setup(props, { emit }) {
    const selectVal = ref(props.currentStep);
    const changeSelect = (val: number) => {
      emit('changeStep', val);
    };
    const changeSwitch = (val: boolean) => {
      console.log(val);
    };
    const stopRun = () => {
      console.log('stop');
    };
    const startRun = () => {
      console.log('start');
    };

    return { selectVal, changeSelect, changeSwitch, stopRun, startRun };
  },
});
</script>

<style scoped lang="less">
p {
  margin: 0 auto 15px;
}
.m10 {
  display: block;
  margin: 15px auto;
}
</style>
