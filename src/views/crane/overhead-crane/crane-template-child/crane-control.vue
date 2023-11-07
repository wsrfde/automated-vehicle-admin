<template>
  <a-card class="crane-control" title="任务控制">
    <a-form :model="form" @submit="handleSubmit">
      <a-form-item field="selectRadio">
        <a-radio-group v-model="form.selectRadio">
          <a-space :size="30" direction="vertical">
            <a-radio value="1">自动作业</a-radio>
            <a-radio value="2">停止待命</a-radio>
            <a-radio value="3">单次倒料</a-radio>
            <a-radio value="4" class="custom-radio">
              <span>单次卸料</span>
              <a-select
                v-model="form.discharge"
                :style="{ width: '220px' }"
                placeholder="请选择卸料口"
              >
                <a-option>1号卸料口</a-option>
                <a-option>2号卸料口</a-option>
                <a-option>3号卸料口</a-option>
              </a-select>
            </a-radio>
            <a-radio value="5" class="custom-radio">
              <span>单次装车</span>
              <a-select
                allow-clear
                allow-search
                :style="{ width: '220px' }"
                :options="options"
                :loading="loading"
                placeholder="请选择车牌号"
                :default-value="form.license"
                @search="handleSearch"
                @change="(value) => (form.license = value)"
              >
              </a-select>
            </a-radio>
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
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const form = reactive({
      selectRadio: '1',
      discharge: '',
      license: '',
    });
    const options = ref(['Option1', 'Option2', 'Option3']);
    const loading = ref(false);

    const handleSubmit = (data) => {
      console.log(data.values);
    };

    const handleSearch = (value) => {
      if (value) {
        loading.value = true;
        window.setTimeout(() => {
          options.value = [
            `${value}-Option1`,
            `${value}-Option2`,
            `${value}-Option3`,
          ];
          loading.value = false;
        }, 2000);
      } else {
        options.value = [];
      }
    };

    return {
      form,
      options,
      loading,
      handleSubmit,
      handleSearch,
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
