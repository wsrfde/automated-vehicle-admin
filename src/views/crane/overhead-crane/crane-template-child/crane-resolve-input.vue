<template>
  <a-card class="crane-control" title="任务分解（DEV）">
    <a-form :model="form" @submit="handleSubmit">
      <a-form-item label="移动天车位置" field="move">
        <a-input-group>
          <a-input
            v-model="form.move[0]"
            :style="{ width: '100px' }"
            placeholder="X坐标"
          />
          <a-input
            v-model="form.move[1]"
            :style="{ width: '100px' }"
            placeholder="Y坐标"
          />
          <a-input
            v-model="form.move[2]"
            :style="{ width: '100px' }"
            placeholder="Z坐标"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item label="速度" field="speed">
        <a-input v-model="form.speed" style="width: 300px" />
      </a-form-item>

      <a-form-item class="mt20">
        <a-button html-type="submit" size="large" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';

export default defineComponent({
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
    const form = reactive<{ move: any[]; speed: string }>({
      move: [],
      speed: '100',
    });
    const switchState = ref(false);

    watch(
      () => props.craneData,
      (newVal) => {
        form.move = [newVal.crane_x, newVal.crane_y, newVal.crane_z].map(
          (item) => `${item}`,
        );
      },
      {
        deep: true,
      },
    );
    const handleSubmit = () => {
      const sedMsg = `craneid:${
        props.craneNo - 1
      };moveto:${form.move.join()};speed:${form.speed};`;
      props.sendCustomDirectiveFun('gtai/movingctrl', sedMsg);
    };

    return {
      form,
      switchState,
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
  height: 260px;
}
.custom-radio {
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
}
</style>
