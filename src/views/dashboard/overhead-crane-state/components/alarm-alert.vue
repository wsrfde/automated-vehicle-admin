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
        <icon-record-stop size="40" style="margin-right: 20px" />
        <h2>紧急停止</h2>
      </a-button>
      <a-button
        v-else
        type="primary"
        status="success"
        class="custom-btn"
        @click="resetFun"
      >
        <icon-play-circle size="40" style="margin-right: 20px" />
        <h2>紧急复位</h2>
      </a-button>
    </p>
    <div class="alert-box">
      <h2>声光报警：</h2>
      <a-tag :color="stateData.color" size="large" class="custom-tag">
        {{ stateData.text }}
      </a-tag>
    </div>
  </a-card>
  <StopModal ref="stopModalRef" @change-state="changeState" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import StopModal from './stop-modal.vue';

const stateFormat = (state: number) => {
  switch (state) {
    case 0:
      return {
        color: '#5ebb3a',
        text: '正常',
      };
    case 1:
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
    sendCustomDirectiveFun: {
      type: Function,
      default: () => ({}),
    },
  },
  setup(props) {
    const stopModalRef = ref<InstanceType<typeof StopModal>>();
    const btnStatus = computed(() => props.craneData.stop === 0);
    const stateData = computed(() => stateFormat(props.craneData.stop));

    // stop 1:停止 0:复位
    const stopFun = async (stop: number) => {
      // 停止时防止急停失败
      // if (stop === 1) {
      //   const sendMsg = `craneid:${props.craneNo};onetask:carstop;`;
      //   props.sendCustomDirectiveFun('gtai/movingctrl', sendMsg);
      // }

      setTimeout(() => {
        const sendMsg = `101\n+OCCH_ALL:${stop}`;
        props.sendCustomDirectiveFun(
          `jtgx/emergency/${props.craneNo}`,
          sendMsg,
        );
      }, 50);
    };
    const openCloseFun = () => {
      stopModalRef.value?.show();
    };
    const resetFun = () => {
      stopFun(0);
    };
    const changeState = (e) => {
      setTimeout(async () => {
        await stopFun(e);
        stopModalRef.value?.hide();
      }, 50);
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
  .custom-btn {
    width: 200px;
    height: 60px;
  }

  :deep(.arco-card-body) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .alert-box {
      h2 {
        display: inline-block;
      }
      .custom-tag {
        display: inline-flex;
        width: 150px;
        height: 60px;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
