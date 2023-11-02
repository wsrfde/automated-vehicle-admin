<template>
  <a-card class="general-card" title="运动状态">
    <a-steps :current="currentStep">
      <a-step
        v-for="(item, index) in stepOption"
        :key="index"
        :title="item.title"
      ></a-step>
    </a-steps>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { CRANE_OPTION } from '@/utils/dictionary';

export default defineComponent({
  props: {
    movingStatus: {
      type: Object,
      default: () => ({}),
    },
    stepOption: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  setup(props) {
    const timelineConfig = ref({
      direction: 'horizontal',
    });
    const currentStep = ref(0);

    const findStepIndex = (val: number) => {
      return props.stepOption.findIndex((item: any) => item.value === val) + 1;
    };

    watch(
      () => props.movingStatus,
      (newVal) => {
        const currentIndex = CRANE_OPTION.findIndex((item) => {
          return newVal[item.value] === 1;
        });
        // 没有一个状态为1，则赋值当前步骤为1，有则判定其位置
        currentStep.value = currentIndex === -1 ? 1 : currentIndex + 1;
      },
    );

    return {
      timelineConfig,
      currentStep,
      findStepIndex,
    };
  },
});
</script>

<style scoped></style>
