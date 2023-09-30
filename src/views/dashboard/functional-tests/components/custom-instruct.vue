<template>
  <a-card class="general-card" title="发送自定义指令">
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
      <a-form-item
        field="message"
        label="message"
        required
        extra="输入示例：craneid:0;step:3;auto:true;"
      >
        <a-textarea
          v-model="form.message"
          placeholder="请输入"
          allow-clear
          :auto-size="{
            minRows: 2,
            maxRows: 5,
          }"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 发送 </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'CustomInstruct',
  props: {
    sendCustomDirectiveFun: {
      type: Function,
      default: () => ({}),
    },
  },
  setup({ sendCustomDirectiveFun }) {
    const form = reactive({
      topic: '',
      message: '',
    });

    const handleSubmit = (data) => {
      const { topic, message } = data.values;
      if (topic && message) {
        sendCustomDirectiveFun(topic, message);
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
