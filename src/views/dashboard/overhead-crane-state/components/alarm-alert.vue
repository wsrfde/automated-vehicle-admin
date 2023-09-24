<template>
  <a-card class="alarm-alert" title="">
    <p class="stop-handle">
      <a-button
        v-if="btnStatus"
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
    <p class="alert-box">
      <b>声光报警：</b>
      <a-tag :color="stateData.color" size="large" class="custom-tag">
        {{ stateData.text }}
      </a-tag>
    </p>
  </a-card>
  <StopModal ref="stopModalRef" @change-state="changeState" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { emergencyStop } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';
import StopModal from './stop-modal.vue';

const stateFormat = (state: string) => {
  switch (state) {
    case '0':
      return {
        color: '#5ebb3a',
        text: '正常',
      };
    case '1':
      return {
        color: '#f53f3f',
        text: '错误',
      };
    default:
      return {
        color: '#ccc',
        text: '-',
      };
  }
};

export default defineComponent({
  components: { StopModal },
  props: {
    craneNo: {
      type: Number,
      default: 1,
    },
    craneData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const stopModalRef = ref<InstanceType<typeof StopModal>>();
    const btnStatus = computed(() => props.craneData.stop === 0);
    const stateData = computed(() => stateFormat(props.craneData.stop));

    const stopFun = async (stop: number) => {
      const query = {
        message: {
          crane_no: props.craneNo,
          stop, // 1:停止 0:复位
        },
      };
      await emergencyStop(JSON.stringify(query)).then(() => {
        Notification.success(stop === 1 ? '紧急停止成功' : '紧急复位成功');
      });
    };
    const openCloseFun = () => {
      stopModalRef.value?.show();
    };
    const resetFun = () => {
      stopFun(0);
    };
    const changeState = async (e) => {
      await stopFun(e);
      stopModalRef.value?.hide();
    };

    return {
      btnStatus,
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
  margin-bottom: 20px;
  border-width: 0 0 1px 0;
  p {
    margin: 0;
  }

  :deep(.arco-card-body) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .alert-box {
      .custom-tag {
        display: inline-block;
        width: 150px;
        text-align: center;
      }
    }
  }
}
</style>
