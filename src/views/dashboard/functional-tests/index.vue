<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '功能测试']" />
    <a-card class="general-card" title="按钮测试">
      <a-button status="danger" @click="oneCarTest">一车装车测试</a-button>
      <a-divider direction="vertical"></a-divider>
      <a-button status="danger" @click="twoCarTest">二车装车测试</a-button>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { sendInstructions } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const sendInstructionsFun = (topic, message) => {
      const query = {
        qos: '1',
        retained: false,
        topic,
        message,
      };
      const formData = new FormData();
      Object.entries(query).forEach(([key, value]) => {
        formData.append(key, value);
      });

      sendInstructions(formData).then((res) => {
        Notification.info(res.msg);
      });
    };

    const oneCarTest = () => {
      const sedMsg = {
        craneid: 1,
        step: 3,
        auto: true,
      };
      sendInstructionsFun('jtgx/overhead-crane-handle/1', sedMsg);
    };
    const twoCarTest = () => {
      const sedMsg = {
        craneid: 2,
        step: 3,
        auto: true,
      };
      sendInstructionsFun('jtgx/overhead-crane-handle/2', sedMsg);
    };

    return {
      oneCarTest,
      twoCarTest,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
