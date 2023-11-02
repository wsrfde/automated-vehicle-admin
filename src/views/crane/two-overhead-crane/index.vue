<template>
  <div class="container">
    <Breadcrumb :items="['天车管理', '二号天车']" />
    <CarAlert :car-tips="carTips" />
    <div class="car-box">
      <a-card class="custom-card" :title="oneCraneConfig.title">
        <div class="mb15 flex-box">
          <SwitchStatus :crane-data="oneCraneConfig.data" />
          <CraneState :crane-data="oneCraneConfig.data" />
          <CraneCoordinates :crane-data="oneCraneConfig.data" />
        </div>
        <CraneStep
          class="mb15"
          :moving-status="oneCraneConfig.data.movingStatus"
          :step-option="stepOption"
        />
        <AlarmAlert
          :crane-no="oneCraneConfig.crane_no"
          :crane-data="oneCraneConfig.data"
          :send-custom-directive-fun="sendCustomDirectiveFun"
        />
        <a-row :gutter="20">
          <a-col :span="12">
            <CraneControl />
          </a-col>
          <a-col :span="12">
            <CraneList />
          </a-col>
        </a-row>
        <a-row :gutter="20" class="mt20">
          <a-col :span="12">
            <CraneResolveRadio
              :crane-no="oneCraneConfig.crane_no"
              :send-custom-directive-fun="sendCustomDirectiveFun"
            />
          </a-col>
          <a-col :span="12">
            <CraneResolveSwitch />
            <CraneResolveInput
              class="mt20"
              :crane-no="oneCraneConfig.crane_no"
              :send-custom-directive-fun="sendCustomDirectiveFun"
            />
          </a-col>
        </a-row>
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
import CraneResolveInput from './components/crane-resolve-input.vue';
import CraneResolveSwitch from './components/crane-resolve-switch.vue';
import CraneList from './components/crane-list.vue';
import SwitchStatus from './components/SwitchStatus.vue';
import CraneStep from './components/crane-step.vue';
import CraneControl from './components/crane-control.vue';
import CarAlert from './components/car-alert.vue';
import AlarmAlert from './components/alarm-alert.vue';
import CraneState from './components/crane-state.vue';
import CraneCoordinates from './components/crane-coordinates.vue';
import CraneResolveRadio from './components/crane-resolve-radio.vue';

export default defineComponent({
  name: 'OneOverheadCrane',
  components: {
    CraneResolveInput,
    CraneResolveSwitch,
    CraneResolveRadio,
    CraneList,
    SwitchStatus,
    AlarmAlert,
    CarAlert,
    CraneControl,
    CraneStep,
    CraneCoordinates,
    CraneState,
  },
  setup() {
    const carTips = reactive({});
    const stepOption = CRANE_OPTION;
    const oneCraneConfig = reactive<{
      title: string;
      crane_no: number;
      data: any;
    }>({
      title: '天车 #02',
      crane_no: 2,
      data: {}, // 用于存储天车数据
    });

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
        topicUrl: `jtgx/car/park/${oneCraneConfig.crane_no}`, // 车辆进入通知
        callback: (e) => {
          Object.assign(carTips, e);
        },
      },
      {
        topicUrl: `jtgx/emergency/${oneCraneConfig.crane_no}`, // 声光报警&紧急停止按钮状态
        callback: (e) => {
          Object.assign(oneCraneConfig.data, {
            stop: e['101\n+OCCH_ALL'],
          });
        },
      },
      {
        topicUrl: `jtgx/crane/position/${oneCraneConfig.crane_no}`, // 坐标信息
        callback: (e) => {
          Object.assign(oneCraneConfig.data, e);
        },
      },
      {
        topicUrl: `jtgx/backStage/${oneCraneConfig.crane_no}`, // 状态集合
        callback: (e) => {
          Object.assign(oneCraneConfig.data, e);
        },
      },
      {
        topicUrl: `jtgx/overhead-crane-handle/${oneCraneConfig.crane_no}`, // 当前状态
        callback: (e) => {
          Object.assign(oneCraneConfig.data, e);
        },
      },
      {
        topicUrl: 'gtai/movingstatus', // 倒料按钮状态
        callback: (e) => {
          // id=0就是一车，id=1是二车
          // 已做动态判断，不用更改
          if (e.craneid === oneCraneConfig.crane_no - 1) {
            Object.assign(oneCraneConfig.data, {
              movingStatus: e,
            });
          }
        },
      },
      {
        topicUrl: `jtgx/power-and-fanyao/${oneCraneConfig.crane_no}`, // 开关/防摇
        callback: (e) => {
          Object.assign(oneCraneConfig, e);
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
      oneCraneConfig,
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
  margin-top: 10px;
  .custom-card {
    border: 0;
    background: none;
    :deep(.arco-card-header) {
      border: 0;
    }
    :deep(& > .arco-card-body) {
      padding: 0;
    }
  }
}
.flex-box {
  display: flex;
  justify-content: space-between;
  div {
    flex-basis: 32.5%;
    height: auto;
  }
}
</style>
