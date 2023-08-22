<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '天车状态']" />
    <CarAlert :car-tips="carTips" />
    <AlarmAlert :car-tips="carTips" />
    <div class="car-box">
      <a-card
        v-for="(item, index) in craneConfigList"
        :key="item.title"
        class="custom-card"
        :title="item.title"
      >
        <CraneStep
          class="mb15"
          :current-step="item.currentStep"
          :step-option="stepOption"
        />
        <a-layout>
          <a-layout-content>
            <CraneCoordinates />
          </a-layout-content>
          <a-layout-content class="ml15">
            <CraneState />
          </a-layout-content>
          <a-layout-sider style="width: 14vw" class="ml15">
            <CraneHandle
              :current-step="item.currentStep"
              :step-option="stepOption"
              @change-step="(e) => changeStep(e, index)"
            />
          </a-layout-sider>
        </a-layout>
        <a-divider v-if="index !== craneConfigList.length - 1" />
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref } from 'vue';
import StompClient from '@/utils/stompServer';
import CraneStep from './components/crane-step.vue';
import CraneHandle from './components/crane-handle.vue';
import CarAlert from './components/car-alert.vue';
import AlarmAlert from './components/alarm-alert.vue';
import CraneState from './components/crane-state.vue';
import CraneCoordinates from './components/crane-coordinates.vue';

export default defineComponent({
  components: {
    AlarmAlert,
    CarAlert,
    CraneHandle,
    CraneStep,
    CraneCoordinates,
    CraneState,
  },
  setup() {
    const carTips = reactive({});
    const carState = ref({});
    const oneCarData = reactive({});
    const twoCarData = reactive({});

    const stepOption = [
      {
        title: '维修',
        value: 'maintain',
      },
      {
        title: '待命',
        value: 'await',
      },
      {
        title: '预备装车',
        value: 'ready',
      },
      {
        title: '装车',
        value: 'load',
      },
      {
        title: '倒料',
        value: 'pour',
      },
    ];
    const craneConfigList = reactive([
      {
        title: '天车 #01',
        currentStep: 'maintain',
      },
      {
        title: '天车 #02',
        currentStep: 'maintain',
      },
    ]);

    const changeStep = (step: number, index) => {
      craneConfigList[index].currentStep = step;
    };

    const stomp = new StompClient([
      {
        topicUrl: 'jtgx/alarmAlert', // 车辆进入通知
        callback: (e) => {
          Object.assign(carTips, e);
        },
      },
      {
        topicUrl: 'jtgx/emergency', // 紧急停止按钮状态
        callback: (e) => {
          Object.assign(carTips, e);
        },
      },
      {
        topicUrl: 'jtgx/overhead-crane-handle', // 当前状态
        callback: (e) => {
          console.log(e);
          carState.value = e;
        },
      },
      {
        topicUrl: 'jtgx/crane/position/1', // 坐标信息
        callback: (e) => {
          console.log(e);
          Object.assign(oneCarData, e);
        },
      },
      {
        topicUrl: 'jtgx/backStage/1', // 状态集合
        callback: (e) => {
          console.log(e);
          Object.assign(oneCarData, e);
        },
      },
      {
        topicUrl: 'jtgx/crane/position/2',
        callback: (e) => {
          console.log(e);
          Object.assign(twoCarData, e);
        },
      },
      {
        topicUrl: 'jtgx/backStage/2',
        callback: (e) => {
          console.log(e);
          Object.assign(twoCarData, e);
        },
      },
    ]);
    stomp.connect();
    console.log(stomp);
    // 发送消息
    // const sendMsg = () => {
    //   stomp.stompClient.publish('jtgx/emergency', {
    //     stop: 1,
    //   });
    // };
    setTimeout(() => {
      // sendMsg();
      // console.log('发送消息');
    }, 2000);
    onUnmounted(() => {
      stomp.destroy();
    });

    return {
      carTips,
      carState,
      oneCarData,
      twoCarData,
      stepOption,
      craneConfigList,
      changeStep,
    };
  },
});
</script>

<style scoped lang="less">
.mb15 {
  margin-bottom: 15px;
}
.ml15 {
  margin-left: 15px;
}
.container {
  padding: 0 20px 20px 20px;
}
.car-box {
  margin-top: 20px;
  .custom-card {
    background: none;
    :deep(.arco-card-header) {
      background: var(--color-bg-2);
    }
    :deep(& > .arco-card-body) {
      padding: 0;
    }
    &:last-child {
      //margin-top: 20px;
    }
  }
}
</style>
