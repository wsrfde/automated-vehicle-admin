<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '功能测试']" />
    <SwitchChild :send-instructions-fun="sendInstructionsFun" />
    <ButtonChild :send-instructions-fun="sendInstructionsFun" />
    <a-row :gutter="20">
      <a-col :span="12">
        <MoveCarForm :send-instructions-fun="sendInstructionsFun" />
      </a-col>
      <a-col :span="12">
        <MoveCarMaintainForm :send-instructions-fun="sendInstructionsFun" />
      </a-col>
    </a-row>
    <a-row class="grid-demo" :gutter="20">
      <a-col :span="12">
        <LoadAndReverseCarForm :send-instructions-fun="sendInstructionsFun" />
      </a-col>
      <a-col :span="12">
        <CustomInstruct :send-instructions-fun="sendInstructionsFun" />
      </a-col>
    </a-row>
    <NearlySevenDaysList />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { sendInstructions } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';

import NearlySevenDaysList from '@/views/dashboard/functional-tests/components/nearly-seven-days-list.vue';
import LoadAndReverseCarForm from './components/load-and-reverse-car-form.vue';
import ButtonChild from './components/button-child.vue';
import MoveCarForm from './components/move-car-form.vue';
import MoveCarMaintainForm from './components/move-car-maintain-form.vue';
import CustomInstruct from './components/custom-instruct.vue';
import SwitchChild from './components/switch-child.vue';

export default defineComponent({
  name: 'Index',
  components: {
    NearlySevenDaysList,
    LoadAndReverseCarForm,
    CustomInstruct,
    MoveCarMaintainForm,
    MoveCarForm,
    ButtonChild,
    SwitchChild,
  },
  setup() {
    const btnVal = ref('');

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

    return {
      btnVal,
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
