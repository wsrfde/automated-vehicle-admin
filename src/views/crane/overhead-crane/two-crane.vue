<template>
  <CraneTemplate :crane-config="craneConfig" />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import CraneTemplate from './crane-template.vue';

export default defineComponent({
  name: 'TwoCrane',
  components: {
    CraneTemplate,
  },
  setup() {
    const craneConfig = reactive({
      title: '二号天车',
      crane_no: 2,
    });

    return {
      craneConfig,
    };
  },
});
</script>

<style scoped lang="less"></style>
