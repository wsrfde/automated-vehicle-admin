<template>
  <a-card class="alarm-alert" title="">
    <p class="alert-box">
      <b>声光报警：</b>
      <a-tag :color="stateColorFun('正常')" size="large" class="custom-tag">
        正常
      </a-tag>
    </p>
    <p class="stop-handle">
      <!--      <b>紧急停止：</b>-->
      <!--      shape="circle"-->
      <!--      size="large"-->
      <a-button
        type="primary"
        status="danger"
        class="custom-btn"
        @click="openCloseFun"
      >
        <icon-record-stop size="20" />紧急停止
      </a-button>
    </p>
  </a-card>
  <StopModal ref="stopModalRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import StopModal from './stop-modal.vue';

export default defineComponent({
  components: { StopModal },
  setup() {
    const stopModalRef = ref<InstanceType<typeof StopModal>>();

    const stateColorFun = (state: string) => {
      switch (state) {
        case '正常':
          return '#5ebb3a';
        case '警告':
          return '#ff7d00';
        case '异常':
          return '#f53f3f';
        default:
          return 'red';
      }
    };

    const openCloseFun = () => {
      console.log('---');
      stopModalRef.value?.show();
    };

    return {
      stopModalRef,
      stateColorFun,
      openCloseFun,
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

    //.stop-handle {
    //  display: flex;
    //  align-items: center;
    //  b {
    //    margin-right: 20px;
    //  }
    //  .custom-btn {
    //    //margin-left: 65px;
    //    //width: 45px;
    //    //height: 45px;
    //  }
    //}
  }
}
</style>
