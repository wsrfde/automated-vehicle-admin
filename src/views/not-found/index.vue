<template>
  <div class="content">
    <a-result class="result" status="404" subtitle="抱歉，没有找到该页面">
    </a-result>
    <div class="operation-row">
      <a-button key="again" style="margin-right: 16px" @click="reload">
        重试
      </a-button>
      <a-button key="back" type="primary" @click="back"> 返回 </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const back = () => {
      router.back();
    };
    const reload = () => {
      window.location.reload();
    };
    return {
      back,
      reload,
    };
  },
});
</script>

<style scoped lang="less">
.content {
  // padding-top: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -95px;
  margin-top: -121px;
  text-align: center;
}
</style>
