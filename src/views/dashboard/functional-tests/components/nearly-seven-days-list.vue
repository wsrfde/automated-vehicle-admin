<template>
  <a-card class="general-card" title="操作日志">
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
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import StompClient from '@/utils/stompServer';
import { Pagination } from '@/types/global';
import { stringToObjectFun } from '@/utils/validate';

export default defineComponent({
  name: 'NearlySevenDaysList',
  setup() {
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
    const requestData = ref<{ craneid?: string }>({});

    const formatData = computed(() => {
      return Object.entries(requestData.value).map(([key, val]) => ({
        id: requestData.value.craneid,
        english: key,
        value: val,
        chinese: chineseAnnotation[key],
      }));
    });

    const stomp = new StompClient([
      {
        topicUrl: 'gtai/movingstatus', // 车辆1进入通知
        callback: (e) => {
          requestData.value = stringToObjectFun(e);
        },
      },
    ]);

    onMounted(() => {
      stomp.connect();
    });
    onUnmounted(() => {
      stomp.destroy();
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
