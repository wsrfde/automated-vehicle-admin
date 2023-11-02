<template>
  <a-card class="alarm-alert" title="总控开关">
    <p>
      <span class="ml10 mr20">
        {{ craneNo === 1 ? '一' : '二' }}车电源开关
      </span>
      <a-switch
        :model-value="craneData.power"
        :disabled="oneCarStartup"
        @change="carStartup($event, craneNo - 1)"
      />
    </p>
    <a-divider direction="vertical" class="custom-divider"></a-divider>
    <p>
      <span class="ml10 mr20">
        {{ craneNo === 1 ? '一' : '二' }}车防摇开关
      </span>
      <a-switch
        :model-value="craneData.fanyao"
        @change="carShake($event, craneNo - 1)"
      />
    </p>
    <a-divider direction="vertical" class="custom-divider"></a-divider>
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
  </a-card>
  <StopModal ref="stopModalRef" @change-state="changeState" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import StopModal from './stop-modal.vue';

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
    const oneCarStartup = ref(false);
    const twoCarStartup = ref(false);

    // 电源
    const carStartup = (val: any, id: number) => {
      const sedMsg = `craneid:${id};power:${val};`;
      props.sendCustomDirectiveFun(
        'jtgx/overhead-crane-handle/power-on',
        sedMsg,
      );
      if (id === 0) {
        oneCarStartup.value = true;
      } else {
        twoCarStartup.value = true;
      }
      setTimeout(() => {
        if (id === 0) {
          oneCarStartup.value = false;
        } else {
          twoCarStartup.value = false;
        }
      }, 10000);
    };

    // 防摇
    const carShake = (val: any, id: number) => {
      const sedMsg = `craneid:${id};faultresset:${val};`;
      props.sendCustomDirectiveFun(
        'jtgx/overhead-crane-handle/kinema-argvs',
        sedMsg,
      );
    };

    // stop 1:停止 0:复位
    const stopFun = async (stop: number) => {
      // 停止时防止急停失败
      // if (stop === 1) {
      //   const sendMsg = `craneid:${props.craneNo};onetask:carstop;`;
      //   props.sendCustomDirectiveFun('gtai/movingctrl', sendMsg);
      // }

      setTimeout(() => {
        const sendMsg = `101\n+OCCH_ALL:${stop};`;
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
      oneCarStartup,
      twoCarStartup,
      openCloseFun,
      changeState,
      resetFun,
      carStartup,
      carShake,
    };
  },
});
</script>

<style scoped lang="less">
.ml10 {
  margin: 0 10px;
}
.mr20 {
  margin-right: 20px;
}
.alarm-alert {
  margin-bottom: 20px;
  border-width: 0 0 1px 0;
  p {
    margin: 0;
  }
  .custom-divider {
    min-height: 4em;
  }
  .custom-btn {
    width: 200px;
    height: 60px;
  }
  .stop-handle {
    width: 35%;
    text-align: right;
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
