<template>
  <a-card class="alarm-alert" title="">
    <p class="alert-box">
      <b>声光报警：</b>
      <a-tag :color="stateData.color" size="large" class="custom-tag">
        {{ stateData.text }}
      </a-tag>
    </p>
    <p class="stop-handle">
      <a-button
        v-if="!isStop"
        type="primary"
        status="danger"
        class="custom-btn"
        @click="openCloseFun"
      >
        <icon-record-stop size="20" style="margin-right: 10px" />
        紧急停止
      </a-button>
      <a-button
        v-else
        type="primary"
        status="success"
        class="custom-btn"
        @click="resetFun"
      >
        <icon-play-circle size="20" style="margin-right: 10px" />
        紧急复位
      </a-button>
    </p>
  </a-card>
  <StopModal ref="stopModalRef" @change-state="changeState" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { emergencyStop } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';
import StopModal from './stop-modal.vue';

export default defineComponent({
  components: { StopModal },
  props: {
    carTips: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const isStop = ref(false);
    const stopModalRef = ref<InstanceType<typeof StopModal>>();

    const stateFormat = (state: string) => {
      switch (state) {
        case 'success':
          return {
            color: '#5ebb3a',
            text: '正常',
          };
        case 'warn':
          return {
            color: '#ff7d00',
            text: '警告',
          };
        case 'error':
          return {
            color: '#f53f3f',
            text: '异常',
          };
        default:
          return {
            color: '#ccc',
            text: '-',
          };
      }
    };

    const stateData = computed(() => stateFormat(props.carTips.alarmState));

    const stopFun = (stop: number) => {
      const query = {
        stop, // 1:停止 0:复位
      };
      emergencyStop(query).then(() => {
        Notification.success(stop === 1 ? '紧急停止成功' : '紧急复位成功');
      });
    };
    const openCloseFun = () => {
      stopModalRef.value?.show();
    };
    const resetFun = () => {
      stopFun(0);
      isStop.value = false;
    };
    const changeState = (e) => {
      stopFun(1);
      stopModalRef.value?.hide();
      isStop.value = e;
    };

    return {
      isStop,
      stopModalRef,
      stateData,
      stateFormat,
      openCloseFun,
      changeState,
      resetFun,
    };
  },
});
</script>

<style scoped lang="less">
.alarm-alert {
  margin-top: 20px;

  :deep(.arco-card-body) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .alert-box {
      b {
        //margin-right: 20px;
      }
      .custom-tag {
        display: inline-block;
        width: 150px;
        text-align: center;
      }
    }
  }
}
</style>
