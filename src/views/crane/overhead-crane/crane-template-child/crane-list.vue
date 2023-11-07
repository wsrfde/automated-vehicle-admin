<template>
  <a-card class="crane-list" title="任务列表">
    <div class="scroll-box">
      <a-list :max-height="350" :data="listData">
        <template #scroll-loading>
          <div>没有更多数据</div>
        </template>
        <template #item="{ item, index }">
          <a-list-item :key="index">
            {{ item }}
          </a-list-item>
        </template>
      </a-list>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const listData = reactive([
      11, 22, 33, 44, 55, 66, 77, 88, 11, 22, 33, 44, 55, 66, 77, 88,
    ]);
    return { listData };
  },
});
</script>

<style scoped lang="less">
p {
  margin: 0 0 15px;
}
.m10 {
  display: block;
  margin: 15px auto;
}
</style>
