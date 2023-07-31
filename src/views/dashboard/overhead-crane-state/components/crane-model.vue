<template>
  <a-card class="general-card three-card" title="天车预览">
    <object class="three-box" data="http://three.iojun.com/"></object>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped lang="less">
.three-card {
  width: fit-content;
  .three-box {
    width: 66vw;
    height: 60vh;
    border: none;
  }
}
</style>
