<template>
  <div class="container">
    <Breadcrumb :items="['天车管理', craneConfigData.title]" />
    <CarAlert :car-tips="carTips" />
    <div class="car-box">
      <a-card class="custom-card" :title="'天车 #0' + craneConfigData.crane_no">
        <div class="mb15 flex-box">
          <SwitchStatus :crane-data="craneConfigData.data" />
          <CraneState :crane-data="craneConfigData.data" />
          <CraneCoordinates :crane-data="craneConfigData.data" />
        </div>
        <CraneStep
          class="mb15"
          :moving-status="craneConfigData.data.movingStatus"
          :step-option="stepOption"
        />
        <AlarmAlert
          :crane-no="craneConfigData.crane_no"
          :crane-data="craneConfigData.data"
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
              :crane-no="craneConfigData.crane_no"
              :send-custom-directive-fun="sendCustomDirectiveFun"
            />
          </a-col>
          <a-col :span="12">
            <CraneResolveSwitch />
            <CraneResolveInput
              class="mt20"
              :crane-no="craneConfigData.crane_no"
              :crane-data="craneConfigData.data"
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
import CraneResolveInput from './crane-template-child/crane-resolve-input.vue';
import CraneResolveSwitch from './crane-template-child/crane-resolve-switch.vue';
import CraneList from './crane-template-child/crane-list.vue';
import SwitchStatus from './crane-template-child/SwitchStatus.vue';
import CraneStep from './crane-template-child/crane-step.vue';
import CraneControl from './crane-template-child/crane-control.vue';
import CarAlert from './crane-template-child/car-alert.vue';
import AlarmAlert from './crane-template-child/alarm-alert.vue';
import CraneState from './crane-template-child/crane-state.vue';
import CraneCoordinates from './crane-template-child/crane-coordinates.vue';
import CraneResolveRadio from './crane-template-child/crane-resolve-radio.vue';

export default defineComponent({
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
  props: {
    craneConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  setup({ craneConfig }) {
    const carTips = reactive({});
    const stepOption = CRANE_OPTION;
    const craneConfigData = reactive<{
      title: string;
      crane_no: number;
      data: any;
    }>({
      title: craneConfig.title,
      crane_no: craneConfig.crane_no,
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
        topicUrl: `jtgx/car/park/${craneConfigData.crane_no}`, // 车辆1进入通知
        callback: (e) => {
          Object.assign(carTips, e);
        },
      },
      {
        topicUrl: `jtgx/emergency/${craneConfigData.crane_no}`, // 声光报警&紧急停止按钮状态
        callback: (e) => {
          Object.assign(craneConfigData.data, {
            stop: e['101\n+OCCH_ALL'],
          });
        },
      },
      {
        topicUrl: `jtgx/crane/position/${craneConfigData.crane_no}`, // 坐标信息
        callback: (e) => {
          Object.assign(craneConfigData.data, e);
        },
      },
      {
        topicUrl: `jtgx/backStage/${craneConfigData.crane_no}`, // 状态集合
        callback: (e) => {
          Object.assign(craneConfigData.data, e);
        },
      },
      {
        topicUrl: `jtgx/overhead-crane-handle/${craneConfigData.crane_no}`, // 当前状态
        callback: (e) => {
          Object.assign(craneConfigData.data, e);
        },
      },
      {
        topicUrl: 'gtai/movingstatus', // 倒料按钮状态
        callback: (e) => {
          // id=0就是一车，id=1是二车
          // 已做动态判断，不用更改
          if (e.craneid === craneConfigData.crane_no - 1) {
            Object.assign(craneConfigData.data, {
              movingStatus: e,
            });
          }
        },
      },
      {
        topicUrl: `jtgx/power-and-fanyao/${craneConfigData.crane_no}`, // 开关/防摇
        callback: (e) => {
          Object.assign(craneConfigData.data, e);
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
      craneConfigData,
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
