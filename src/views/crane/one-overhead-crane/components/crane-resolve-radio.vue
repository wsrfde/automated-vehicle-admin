<template>
  <a-card class="crane-control" title="任务分解（DEV）">
    <a-form :model="form" @submit="handleSubmit">
      <a-form-item field="selectRadio">
        <a-radio-group v-model="form.selectRadio">
          <a-space :size="30" direction="vertical">
            <a-radio value="1">完整扫描</a-radio>
            <a-radio value="2">扫描车辆存档</a-radio>
            <a-radio value="3">单次抓料(当前位置)</a-radio>
            <a-radio value="4"> 单次放料(当前位置) </a-radio>
            <a-radio value="5">单次装车</a-radio>
            <a-radio value="6">停止任务</a-radio>
          </a-space>
        </a-radio-group>
      </a-form-item>
      <a-form-item class="mt20">
        <a-button html-type="submit" size="large" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const form = reactive({
      selectRadio: '1',
    });

    const handleSubmit = (data) => {
      console.log(data.values);
    };

    return {
      form,
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
  height: 430px;
}
.custom-radio {
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
}
</style>
