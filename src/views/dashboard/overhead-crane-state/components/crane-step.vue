<template>
  <a-card class="general-card" title="装车落料">
    <a-steps :current="findStepIndex(currentStep)">
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
    currentStep: {
      type: Number,
      default: -1,
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

    const findStepIndex = (val: number) => {
      return props.stepOption.findIndex((item: any) => item.value === val) + 1;
    };

    return {
      timelineConfig,
      findStepIndex,
    };
  },
});
</script>

<style scoped></style>
