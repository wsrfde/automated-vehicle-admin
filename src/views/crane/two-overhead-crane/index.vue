<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '天车状态']" />
    <CarAlert :car-tips="carTips" />
    <div class="car-box">
      <a-card
        v-for="(item, index) in craneConfigList"
        :key="item.title"
        class="custom-card"
        :title="item.title"
      >
        <AlarmAlert
          :crane-no="item.crane_no"
          :crane-data="item.data"
          :send-custom-directive-fun="sendCustomDirectiveFun"
        />
        <CraneStep
          class="mb15"
          :current-step="item.data.step"
          :step-option="stepOption"
        />
        <a-layout>
          <a-layout-content>
            <CraneCoordinates :crane-data="item.data" />
          </a-layout-content>
          <a-layout-content class="ml15">
            <CraneState :crane-data="item.data" />
          </a-layout-content>
          <a-layout-sider style="width: 14vw" class="ml15">
            <CraneHandle
              :crane-no="item.crane_no"
              :current-operate="item.data.operate"
              :current-step="item.data.step"
              :step-option="stepOption"
            />
          </a-layout-sider>
        </a-layout>
        <a-divider v-if="index !== craneConfigList.length - 1" />
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive } from 'vue';
import StompClient from '@/utils/stompServer';
import { CRANE_OPTION } from '@/utils/dictionary';
import { sendCustomDirective } from '@/api/crane';
import { Notification } from '@arco-design/web-vue';
import CraneStep from './components/crane-step.vue';
import CraneHandle from './components/crane-handle.vue';
import CarAlert from './components/car-alert.vue';
import AlarmAlert from './components/alarm-alert.vue';
import CraneState from './components/crane-state.vue';
import CraneCoordinates from './components/crane-coordinates.vue';

export default defineComponent({
  name: 'TwoOverheadCrane',
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
    const stepOption = CRANE_OPTION;

    const craneConfigList = reactive<
      {
        title: string;
        crane_no: number;
        data: any;
      }[]
    >([
      {
        title: '天车 #01',
        crane_no: 1,
        data: {}, // 用于存储天车数据
      },
      {
        title: '天车 #02',
        crane_no: 2,
        data: {}, // 用于存储天车数据
      },
    ]);

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
        topicUrl: 'jtgx/car/park/1', // 车辆1进入通知
        callback: (e) => {
          Object.assign(carTips, e);
        },
      },
      {
        topicUrl: 'jtgx/car/park/2', // 车辆2进入通知
        callback: (e) => {
          Object.assign(carTips, e);
        },
      },
      {
        topicUrl: 'jtgx/emergency/1', // 声光报警&紧急停止按钮状态
        callback: (e) => {
          Object.assign(craneConfigList[0].data, {
            stop: e['101\n+OCCH_ALL'],
          });
        },
      },
      {
        topicUrl: 'jtgx/crane/position/front/1', // 坐标信息
        callback: (e) => {
          console.log(e);
          Object.assign(craneConfigList[0].data, e);
        },
      },
      {
        topicUrl: 'jtgx/backStage/1', // 状态集合
        callback: (e) => {
          Object.assign(craneConfigList[0].data, e);
        },
      },
      {
        topicUrl: 'jtgx/overhead-crane-handle/1', // 当前状态
        callback: (e) => {
          Object.assign(craneConfigList[0].data, e);
        },
      },
      {
        topicUrl: 'jtgx/emergency/2', // 声光报警&紧急停止按钮状态
        callback: (e) => {
          Object.assign(craneConfigList[1].data, {
            stop: e['101\n+OCCH_ALL'],
          });
        },
      },
      {
        topicUrl: 'jtgx/crane/position/front/2',
        callback: (e) => {
          Object.assign(craneConfigList[1].data, e);
        },
      },
      {
        topicUrl: 'jtgx/backStage/2',
        callback: (e) => {
          Object.assign(craneConfigList[1].data, e);
        },
      },
      {
        topicUrl: 'jtgx/overhead-crane-handle/2', // 当前状态
        callback: (e) => {
          Object.assign(craneConfigList[1].data, e);
        },
      },
    ]);
    stomp.connect();

    onUnmounted(() => {
      stomp.destroy();
    });

    return {
      carTips,
      stepOption,
      craneConfigList,
      sendCustomDirectiveFun,
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
    //&:last-child {
    //margin-top: 20px;
    //}
  }
}
</style>
