<template>
  <a-card class="general-card" title="天车车辆装车">
    <a-form
      :model="form"
      style="width: 35vw"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="info1" label="天车信息" required>
        <a-textarea
          v-model="form.info1"
          placeholder="请输入"
          allow-clear
          :auto-size="{
            minRows: 2,
            maxRows: 5,
          }"
        />
      </a-form-item>
      <a-form-item field="info2" label="车辆信息" required>
        <a-textarea
          v-model="form.info2"
          placeholder="请输入"
          allow-clear
          :auto-size="{
            minRows: 2,
            maxRows: 5,
          }"
        />
      </a-form-item>
      <a-form-item field="info3" label="装车信息" required>
        <a-textarea
          v-model="form.info3"
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
  name: 'CarLoaderForm',
  props: {
    sendCustomDirectiveFun: {
      type: Function,
      default: () => ({}),
    },
  },
  setup({ sendCustomDirectiveFun }) {
    const form = reactive({
      info1: 'craneid:1;pickingzz:8.5;pickingoz:3;placeoz:2.5;speed:100;',
      info2: 'length:10.2;width:2.5;bottomHeight:1.2;loadInTon:40;',
      info3: 'layerNum:2;placeOrder:front;avgWeightPerBucket:8.5; ',
    });

    const unwrapFun = (str: string) => {
      return str.replace('\n', '');
    };
    const handleSubmit = (data) => {
      const { info1, info2, info3 } = data.values;
      const sendMsg = info1 + info2 + info3;
      if (sendMsg) {
        sendCustomDirectiveFun('gtai/loadingOutctrl', unwrapFun(sendMsg));
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
