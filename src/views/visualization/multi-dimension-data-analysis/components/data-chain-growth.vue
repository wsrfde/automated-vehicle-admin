<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">
        <ChainItem
          title="1号天车抓料趋势"
          quota="retentionTrends"
          chart-type="line"
        />
      </a-col>
      <a-col :span="6">
        <ChainItem
          title="2号天车抓料趋势"
          quota="retentionTrends"
          chart-type="line"
        />
      </a-col>
      <a-col :span="6">
        <ChainItem
          title="3号天车抓料趋势"
          quota="retentionTrends"
          chart-type="line"
        />
      </a-col>
      <a-col :span="6">
        <UserActions />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChainItem from './chain-item.vue';
import UserActions from './user-actions.vue';

export default defineComponent({
  components: {
    ChainItem,
    UserActions,
  },
});
</script>
