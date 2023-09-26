<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '功能测试']" />
    <SwitchChild :send-instructions-fun="sendInstructionsFun" />
    <ButtonChild :send-instructions-fun="sendInstructionsFun" />
    <a-row class="grid-demo" :gutter="20">
      <a-col :span="12">
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
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { sendInstructions } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';

import ButtonChild from '@/views/dashboard/functional-tests/components/button-child.vue';
import SwitchChild from './components/switch-child.vue';

export default defineComponent({
  name: 'Index',
  components: {
    ButtonChild,
    SwitchChild,
  },
  setup() {
    const btnVal = ref('');
    const form = reactive({
      topic: '',
      message: '',
    });

    const sendInstructionsFun = (topic: string, message: string) => {
      const query = {
        qos: '1',
        retained: false,
        topic,
        message,
      };
      const formData = new FormData();
      Object.entries(query).forEach(([key, value]: any[]) => {
        formData.append(key, value);
      });

      sendInstructions(formData).then((res: any) => {
        Notification.info(res.msg);
      });
    };

    const handleSubmit = (data) => {
      const { topic, message } = data.values;
      if (topic && message) {
        sendInstructionsFun(topic, message);
      }
    };

    return {
      form,
      btnVal,
      handleSubmit,
      sendInstructionsFun,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
  .general-card {
    margin-top: 20px;
  }
}

.ml10 {
  margin-left: 10px;
}
</style>
