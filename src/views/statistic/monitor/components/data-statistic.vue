<template>
  <a-card :bordered="false" :body-style="{ padding: '20px' }">
    <a-tabs default-active-tab="liveMethod">
      <a-tab-pane key="liveMethod" title="监控角度" />
      <a-tab-pane key="onlinePopulation" title="查看方式" />
    </a-tabs>
    <div class="data-statistic-content">
      <a-radio-group :default-value="1" type="button">
        <a-radio :value="1">前方监控</a-radio>
        <a-radio :value="2">车机监控</a-radio>
        <a-radio :value="3">车尾监控</a-radio>
        <a-radio :value="4">路面监控</a-radio>
      </a-radio-group>

      <div class="data-statistic-list-wrapper">
        <div class="data-statistic-list-header">
          <a-button type="text">编辑轮播</a-button>
          <a-button disabled>轮播监控</a-button>
        </div>
        <div class="data-statistic-list-content">
          <DataStatisticList />
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataStatisticList from './data-statistic-list.vue';

export default defineComponent({
  components: {
    DataStatisticList,
  },
});
</script>

<style scoped lang="less">
.data-statistic {
  &-content {
    padding: 20px 0;
  }

  &-list {
    &-header {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
    }

    &-content {
      margin-top: 16px;
    }
  }
}
</style>
