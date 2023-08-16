<template>
  <a-card class="general-card" title="装车落料">
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
  setup() {
    const timelineConfig = ref({
      direction: 'horizontal',
    });

    return {
      timelineConfig,
    };
  },
});
</script>

<style scoped></style>
