<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '功能测试']" />
    <SwitchState :switch-data="switchData" />
    <SwitchChild
      :switch-data="switchData"
      :send-custom-directive-fun="sendCustomDirectiveFun"
    />
    <ButtonChild
      :car-stop-state="carStopState"
      :send-custom-directive-fun="sendCustomDirectiveFun"
    />
    <a-row :gutter="20">
      <a-col :span="12">
        <MoveCarForm :send-custom-directive-fun="sendCustomDirectiveFun" />
      </a-col>
      <a-col :span="12">
        <MoveCarMaintainForm
          :send-custom-directive-fun="sendCustomDirectiveFun"
        />
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="12">
        <LoadAndReverseCarForm
          :send-custom-directive-fun="sendCustomDirectiveFun"
        />
      </a-col>
      <a-col :span="12">
        <CarLoaderForm :send-custom-directive-fun="sendCustomDirectiveFun" />
      </a-col>
    </a-row>

    <a-row :gutter="20">
      <a-col :span="12">
        <CustomInstruct :send-custom-directive-fun="sendCustomDirectiveFun" />
      </a-col>
    </a-row>

    <NearlySevenDaysList :seven-days-data="sevenDaysData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, reactive } from 'vue';
import { sendCustomDirective } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';

import StompClient from '@/utils/stompServer';
import SwitchState from './components/switch-state.vue';
import CarLoaderForm from './components/car-loader-form.vue';
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
    CarLoaderForm,
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

    const sendCustomDirectiveFun = (
      topic: string,
      message: string | object,
    ) => {
      const query = {
        topic,
        message,
      };
      sendCustomDirective(JSON.stringify(query)).then((res: any) => {
        Notification.info(res.msg);
      });
    };

    const stomp = new StompClient([
      {
        topicUrl: 'gtai/movingstatus', // 完整行车状态
        callback: (e) => {
          sevenDaysData.value = e;
        },
      },
      {
        topicUrl: 'jtgx/power-and-fanyao/1', // 开关/防摇
        callback: (e) => {
          console.log(e);
          Object.assign(switchData[0], e);
        },
      },
      {
        topicUrl: 'jtgx/power-and-fanyao/1',
        callback: (e) => {
          Object.assign(switchData[0], e);
        },
      },
      {
        topicUrl: 'jtgx/power-and-fanyao/2',
        callback: (e) => {
          Object.assign(switchData[1], e);
        },
      },
      {
        topicUrl: 'jtgx/power-and-fanyao/2',
        callback: (e) => {
          Object.assign(switchData[1], e);
        },
      },
      {
        topicUrl: 'jtgx/overhead-crane-handle/1', // 二车自动状态
        callback: (e) => {
          Object.assign(switchData[0], e);
        },
      },
      {
        topicUrl: 'jtgx/overhead-crane-handle/2', // 二车自动状态
        callback: (e) => {
          Object.assign(switchData[1], e);
        },
      },
      {
        topicUrl: 'gtai/movingstatus', // 二车倒料按钮状态
        callback: (e) => {
          Object.assign(switchData[e.craneid], e); // id=0就是一车，id=1是二车
        },
      },
      {
        topicUrl: 'jtgx/emergency/reslut/1', // 急停声光报警
        callback: (e) => {
          Object.assign(carStopState[0], e);
        },
      },
      {
        topicUrl: 'jtgx/emergency/reslut/2',
        callback: (e) => {
          Object.assign(carStopState[1], e);
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
      sendCustomDirectiveFun,
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
