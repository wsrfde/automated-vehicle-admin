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
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    craneData: {
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

    return {
      timelineConfig,
      currentStep,
      findStepIndex,
    };
  },
});
</script>

<style scoped></style>
