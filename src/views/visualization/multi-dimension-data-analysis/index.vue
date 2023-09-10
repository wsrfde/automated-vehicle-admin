<template>
  <div class="container">
    <Breadcrumb :items="['数据可视化', '多维数据分析']" />
    <a-space direction="vertical" :size="16" fill>
      <a-row :gutter="16">
        <a-col :span="24">
          <DataOverview :request-data="requestData" />
        </a-col>
      </a-row>
      <DataChainGrowth :load-data="requestData[0]" />
      <ContentPublishingSource :request-data="requestData" />
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { getRecent7DaysData } from '@/api/visualization';
import DataOverview from './components/data-overview.vue';
import DataChainGrowth from './components/data-chain-growth.vue';
import ContentPublishingSource from './components/content-publishing-source.vue';

export default defineComponent({
  components: {
    DataOverview,
    DataChainGrowth,
    ContentPublishingSource,
  },
  setup() {
    const requestData = reactive<any[]>([[], []]);
    const fetchData = async () => {
      const res: any = await getRecent7DaysData();
      (res ?? []).forEach((item: any) => {
        if (item.step === '装车') {
          requestData[0].push({
            craneNo: item.craneNo,
            name: `${item.craneNo}号天车${item.step}`,
            value: item.data,
          });
        } else {
          requestData[1].push({
            name: `${item.craneNo}号天车${item.step}`,
            value: item.data,
          });
        }
      });
    };
    fetchData();
    return {
      requestData,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

:deep(.section-title) {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
}

:deep(.chart-wrap) {
  height: 264px;
}
</style>
