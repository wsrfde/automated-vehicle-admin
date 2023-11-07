<template>
  <a-card class="crane-control" title="任务分解（DEV）">
    <a-form :model="form" @submit="handleSubmit">
      <a-form-item field="selectRadio">
        <a-radio-group v-model="form.selectRadio">
          <a-space :size="30" direction="vertical">
            <a-radio value="1">完整扫描</a-radio>
            <a-radio value="2">扫描车辆存档</a-radio>
            <a-radio value="3">单次抓料(当前位置)</a-radio>
            <a-radio value="4"> 单次放料(当前位置) </a-radio>
            <a-radio value="5">单次装车</a-radio>
            <a-radio value="6">停止任务</a-radio>
          </a-space>
        </a-radio-group>
      </a-form-item>
      <a-form-item class="mt20">
        <a-button html-type="submit" size="large" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  props: {
    craneNo: {
      type: Number,
      default: 1,
    },
    sendCustomDirectiveFun: {
      type: Function,
      default: () => ({}),
    },
  },
  setup(props) {
    const form = reactive({
      selectRadio: '1',
    });

    const handleSubmit = () => {
      console.log(form.selectRadio);
      let sendTopic = '';
      let sendMsg = '';
      switch (form.selectRadio) {
        case '1':
          sendTopic = 'gtai/movingctrl';
          sendMsg = `craneid:${
            props.craneNo - 1
          };onetask:scanfull;zz:8.6;speed:100;`;
          break;
        case '2':
          sendTopic = 'gtai/movingctrl';
          sendMsg = `craneid:${
            props.craneNo - 1
          };onetask:carscan;zz:8.6;speed:100;`;
          break;
        case '3':
          sendTopic = 'gtai/movingctrl';
          sendMsg = `craneid:${props.craneNo - 1};pick:8.0;`;
          break;
        case '4':
          sendTopic = 'gtai/movingctrl';
          sendMsg = `craneid:${props.craneNo - 1};place:8.0;placeoz:2.2;`;
          break;
        case '5':
          sendTopic = 'gtai/loadingOutctrl';
          sendMsg = `craneid:${
            props.craneNo - 1
          };pickingzz:8.5;pickingoz:3;placeoz:2;speed:100;length:7.5;width:2.5;bottomHeight:1.1;loadInTon:34;layerNum:1;placeOrder:0;avgWeightPerBucket:8.0;back_y:10;xplace_n:2,1,2,1;`;
          break;
        case '6':
          sendTopic = 'gtai/movingctrl';
          sendMsg = `craneid:${props.craneNo - 1};onetask:carstop;`;
          break;
        default:
          return;
      }
      props.sendCustomDirectiveFun(sendTopic, sendMsg);
    };

    return {
      form,
      handleSubmit,
    };
  },
});
</script>

<style scoped lang="less">
p {
  margin: 0 0 15px;
}
.m10 {
  display: block;
  margin: 15px auto;
}
.mt20 {
  margin-top: 20px;
}
.crane-control {
  height: 430px;
}
.custom-radio {
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
}
</style>
