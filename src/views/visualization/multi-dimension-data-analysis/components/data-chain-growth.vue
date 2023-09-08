<template>
  <div>
    <a-row :gutter="16">
      <a-col v-for="item in loadData" :key="item.craneNo" :span="6">
        <ChainItem
          :title="item.craneNo + '号天车抓料趋势'"
          :render-data="item.value"
        />
      </a-col>
      <a-col :span="6">
        <UserActions :load-data="loadData" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ChainItem from './chain-item.vue';
import UserActions from './user-actions.vue';

export default defineComponent({
  components: {
    ChainItem,
    UserActions,
  },
  props: {
    loadData: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
});
</script>
