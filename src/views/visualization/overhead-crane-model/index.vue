<template>
  <div class="container">
    <Breadcrumb :items="['数据可视化', '天车模型']" />
    <a-card class="general-card three-card" title="">
      <object class="three-box" data="http://three.iojun.com/"></object>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
.three-card {
  padding-top: 20px;
  .three-box {
    width: 100%;
    height: 76vh;
    border: none;
  }
}
</style>
