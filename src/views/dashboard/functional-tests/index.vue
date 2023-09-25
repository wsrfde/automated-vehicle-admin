<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '功能测试']" />
    <a-card class="general-card" title="车辆测试">
      <div>
        <a-button status="danger" @click="oneCarPourTest"
          >一车倒料测试</a-button
        >
        <a-divider direction="vertical"></a-divider>
        <a-button status="danger" @click="twoCarPourTest"
          >二车倒料测试</a-button
        >
      </div>
      <div style="margin-top: 20px">
        <a-button status="warning" @click="oneCarStandbyTest"
          >一车待命测试</a-button
        >
        <a-divider direction="vertical"></a-divider>
        <a-button status="warning" @click="twoCarStandbyTest"
          >二车待命测试</a-button
        >
      </div>
      <div style="margin-top: 20px">
        <a-button status="success" @click="oneCarStartupTest"
          >一车启动电源</a-button
        >
        <a-divider direction="vertical"></a-divider>
        <a-button status="success" @click="twoCarStartupTest"
          >二车启动电源</a-button
        >
      </div>
      <div style="margin-top: 20px">
        <a-button status="normal" type="outline" @click="oneCarCloseShakeTest"
          >一车关闭防摇</a-button
        >
        <a-divider direction="vertical"></a-divider>
        <a-button status="normal" type="outline" @click="twoCarCloseShakeTest"
          >二车关闭防摇</a-button
        >
      </div>
    </a-card>
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
      <!--      <a-col :span="12">-->
      <!--        <a-card class="general-card" title="接收自定义指令">-->
      <!--          <a-form :model="form" style="width: 30vw">-->
      <!--            <a-form-item label="topic">-->
      <!--              <a-input v-model="form.topic"></a-input>-->
      <!--            </a-form-item>-->
      <!--            <a-form-item label="收到数据">-->
      <!--              <a-textarea-->
      <!--                v-model="form.message"-->
      <!--                placeholder="输入示例：{ 'crane_no': 1, 'step': 0, 'operate': true}"-->
      <!--                allow-clear-->
      <!--                :auto-size="{-->
      <!--                  minRows: 2,-->
      <!--                  maxRows: 5,-->
      <!--                }"-->
      <!--              />-->
      <!--            </a-form-item>-->
      <!--          </a-form>-->
      <!--        </a-card>-->
      <!--      </a-col>-->
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { sendInstructions } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';

export default defineComponent({
  name: 'Index',
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

    const oneCarPourTest = () => {
      const sedMsg = 'craneid:0;step:3;auto:true;';
      sendInstructionsFun('jtgx/overhead-crane-handle/1', sedMsg);
    };
    const twoCarPourTest = () => {
      const sedMsg = 'craneid:1;step:3;auto:true;';
      sendInstructionsFun('jtgx/overhead-crane-handle/1', sedMsg);
    };

    const oneCarStandbyTest = () => {
      const sedMsg = 'craneid:0;step:1;auto:false;';
      sendInstructionsFun('jtgx/overhead-crane-handle/1', sedMsg);
    };

    const twoCarStandbyTest = () => {
      const sedMsg = 'craneid:1;step:1;auto:false;';
      sendInstructionsFun('jtgx/overhead-crane-handle/1', sedMsg);
    };
    const oneCarStartupTest = () => {
      const sedMsg = 'craneid:0;power:true;';
      sendInstructionsFun('jtgx/overhead-crane-handle/power-on', sedMsg);
    };

    const twoCarStartupTest = () => {
      const sedMsg = 'craneid:1;power:true;';
      sendInstructionsFun('jtgx/overhead-crane-handle/power-on', sedMsg);
    };
    const oneCarCloseShakeTest = () => {
      const sedMsg = 'craneid:0;faultresset:false;';
      sendInstructionsFun('jtgx/overhead-crane-handle/kinema-argvs', sedMsg);
    };

    const twoCarCloseShakeTest = () => {
      const sedMsg = 'craneid:1;faultresset:false;';
      sendInstructionsFun('jtgx/overhead-crane-handle/kinema-argvs', sedMsg);
    };

    const handleSubmit = (data) => {
      const { topic, message } = data.values;
      // try {
      // const sedMsg = JSON.parse(message);
      if (topic && message) {
        sendInstructionsFun(topic, message);
      }
      // } catch (e) {
      //   Notification.error('输入格式不正确');
      // }
    };

    return {
      form,
      btnVal,
      oneCarPourTest,
      twoCarPourTest,
      oneCarStandbyTest,
      twoCarStandbyTest,
      oneCarStartupTest,
      twoCarStartupTest,
      oneCarCloseShakeTest,
      twoCarCloseShakeTest,
      handleSubmit,
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
</style>
