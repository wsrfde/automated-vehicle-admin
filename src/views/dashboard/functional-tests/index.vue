<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '功能测试']" />
    <SwitchState :switch-data="switchData" />
    <SwitchChild
      :switch-data="switchData"
      :send-instructions-fun="sendInstructionsFun"
    />
    <ButtonChild
      :car-stop-state="carStopState"
      :send-instructions-fun="sendInstructionsFun"
    />
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

    <NearlySevenDaysList :seven-days-data="sevenDaysData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, reactive } from 'vue';
import { sendInstructions } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';

import StompClient from '@/utils/stompServer';
import { stringToObjectFun } from '@/utils/validate';
import SwitchState from '@/views/dashboard/functional-tests/components/switch-state.vue';
import NearlySevenDaysList from './components/nearly-seven-days-list.vue';
import LoadAndReverseCarForm from './components/load-and-reverse-car-form.vue';
import ButtonChild from './components/button-child.vue';
import MoveCarForm from './components/move-car-form.vue';
import MoveCarMaintainForm from './components/move-car-maintain-form.vue';
import CustomInstruct from './components/custom-instruct.vue';
import SwitchChild from './components/switch-child.vue';

export default defineComponent({
  name: 'Index',
  components: {
    SwitchState,
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
    const switchData = reactive<any[]>([{}, {}]);
    const carStopState = reactive<any[]>([{}, {}]);
    const sevenDaysData = ref({});

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
        console.log('-----');
      });
    };

    const stomp = new StompClient([
      {
        topicUrl: 'gtai/movingstatus',
        callback: (e) => {
          console.log(e);
          console.log(stringToObjectFun(e));
          sevenDaysData.value = stringToObjectFun(e);
        },
      },
      {
        topicUrl: 'jtgx/power-and-fanyao/1', // 开关/防摇
        callback: (e) => {
          Object.assign(switchData[0], stringToObjectFun(e));
        },
      },
      {
        topicUrl: 'jtgx/power-and-fanyao/1',
        callback: (e) => {
          Object.assign(switchData[0], stringToObjectFun(e));
        },
      },
      {
        topicUrl: 'jtgx/power-and-fanyao/2',
        callback: (e) => {
          Object.assign(switchData[1], stringToObjectFun(e));
        },
      },
      {
        topicUrl: 'jtgx/power-and-fanyao/2',
        callback: (e) => {
          Object.assign(switchData[1], stringToObjectFun(e));
        },
      },
      {
        topicUrl: 'jtgx/emergency/reslut/1', // 急停声光报警
        callback: (e) => {
          Object.assign(carStopState[0], stringToObjectFun(e));
        },
      },
      {
        topicUrl: 'jtgx/emergency/reslut/2',
        callback: (e) => {
          Object.assign(carStopState[1], stringToObjectFun(e));
        },
      },
    ]);

    onMounted(() => {
      stomp.connect();
    });
    onUnmounted(() => {
      stomp.destroy();
    });

    return {
      btnVal,
      sevenDaysData,
      switchData,
      carStopState,
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
