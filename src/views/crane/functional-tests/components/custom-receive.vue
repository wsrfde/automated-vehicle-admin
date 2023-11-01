<template>
  <a-card class="general-card" title="接收自定义指令">
    <a-form
      :model="form"
      style="width: 30vw"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item
        field="topic"
        label="topic"
        required
        extra="输入示例：jtgx/overhead-crane-handle/1"
      >
        <a-input v-model="form.topic" placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 保存 </a-button>
      </a-form-item>
    </a-form>
    <div>
      <h4>接收结果</h4>
      <p>{{ customReceiveData }}</p>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'CustomReceive',
  props: {
    customReceiveData: {
      type: Object,
      default: () => ({}),
    },
    changeReceiveTopicFun: {
      type: Function,
      default: () => ({}),
    },
  },
  setup({ changeReceiveTopicFun }) {
    const form = reactive({
      topic: '',
    });

    const handleSubmit = (data) => {
      const { topic } = data.values;
      if (topic) {
        changeReceiveTopicFun(topic);
      }
    };

    return {
      form,
      handleSubmit,
    };
  },
});
</script>

<style scoped lang="less"></style>
