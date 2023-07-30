<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">
        <ChainItem title="分料趋势" quota="retentionTrends" chart-type="line" />
      </a-col>
      <a-col :span="6">
        <ChainItem title="分料量" quota="userRetention" chart-type="bar" />
      </a-col>
      <a-col :span="6">
        <ChainItem
          title="剩余存量趋势"
          quota="contentConsumptionTrends"
          chart-type="line"
        />
      </a-col>
      <a-col :span="6">
        <ChainItem
          title="剩余存量"
          quota="contentConsumption"
          chart-type="bar"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChainItem from './chain-item.vue';

export default defineComponent({
  components: {
    ChainItem,
  },
});
</script>
