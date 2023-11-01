<template>
  <div class="success-wrap">
    <a-result status="success" title="提交成功" subtitle="表单提交成功！" />
    <a-space :size="16">
      <a-button key="view" type="primary"> 查看详情 </a-button>
      <a-button key="again" type="secondary" @click="oneMore">
        再次创建
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['changeStep'],
  setup(props, ctx) {
    const oneMore = () => {
      ctx.emit('changeStep', 1);
    };
    return {
      oneMore,
    };
  },
});
</script>

<style scoped lang="less">
.success-wrap {
  text-align: center;
}
:deep(.arco-result) {
  padding-top: 0;
}
</style>
