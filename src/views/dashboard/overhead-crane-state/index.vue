<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '天车状态']" />
    <div class="content"> 我是内容 </div>
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
</style>
