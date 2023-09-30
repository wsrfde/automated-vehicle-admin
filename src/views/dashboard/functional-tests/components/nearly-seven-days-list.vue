<template>
  <a-card class="general-card" title="行车完整运动状态">
    <a-table
      :pagination="basePagination"
      :columns="columns"
      :data="formatData"
      :bordered="false"
      style="margin-top: 20px"
      row-key="id"
    >
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { Pagination } from '@/types/global';

export default defineComponent({
  name: 'NearlySevenDaysList',
  props: {
    sevenDaysData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const columns = [
      {
        title: '行车编号',
        dataIndex: 'id',
      },
      {
        title: '英文字段',
        dataIndex: 'english',
      },
      {
        title: '中文解释',
        dataIndex: 'chinese',
      },
      {
        title: '数值',
        dataIndex: 'value',
      },
    ];
    const chineseAnnotation = {
      craneid: '行车编号',
      movingTo: 'XYZ移动状态',
      picking: '抓料',
      placing: '放料',
      loadingIn: '卸料',
      Preparing: '倒料',
      Scaning: '扫描',
      loadingOut: '装车',
      entrance1_h: '卸料口1的高度',
      entrance2_h: '卸料口2的高度',
      store1_h: '存储区高度',
      store2_h: '装车区高度',
    };

    const formatData = computed(() => {
      return Object.entries(props.sevenDaysData).map(([key, val]) => ({
        id: props.sevenDaysData.craneid,
        english: key,
        value: val,
        chinese: chineseAnnotation[key],
      }));
    });

    return {
      basePagination,
      columns,
      formatData,
    };
  },
});
</script>

<style scoped lang="less"></style>
