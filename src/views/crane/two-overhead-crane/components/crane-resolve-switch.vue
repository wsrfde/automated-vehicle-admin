<template>
  <a-card class="crane-control" title="任务分解（DEV）">
    <p class="switch-box">
      <span>持续倒料卸料</span>
      <a-switch v-model="switchState"> </a-switch>
    </p>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const form = reactive({
      move: [],
    });

    const switchState = ref(false);
    const handleSubmit = (data) => {
      console.log(data.values);
    };

    return {
      form,
      switchState,
      handleSubmit,
    };
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
.mt20 {
  margin-top: 20px;
}
.crane-control {
  height: 150px;
  .switch-box {
    margin: 20px 60px;
    span {
      margin-right: 40px;
    }
  }
}
.custom-radio {
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
}
</style>
