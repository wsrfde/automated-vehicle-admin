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
  setup(props) {
    const timelineConfig = ref({
      direction: 'horizontal',
    });

    const findStepIndex = (val: string) => {
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
