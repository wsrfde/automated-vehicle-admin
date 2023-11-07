<template>
  <CraneTemplate :crane-config="craneConfig" />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import CraneTemplate from './crane-template.vue';

export default defineComponent({
  name: 'OneCrane',
  components: {
    CraneTemplate,
  },
  setup() {
    const craneConfig = reactive({
      title: '一号天车',
      crane_no: 1,
    });

    return {
      craneConfig,
    };
  },
});
</script>

<style scoped lang="less"></style>
