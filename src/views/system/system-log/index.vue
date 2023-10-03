<template>
  <div class="container">
    <Breadcrumb :items="['系统监控', '操作日志']" />
    <a-card class="general-card" title="操作日志">
      <a-table
        :columns="columns"
        :data="renderData"
        :loading="loading"
        :pagination="pagination"
        :bordered="false"
        style="margin-top: 20px"
        row-key="id"
        @page-change="onPageChange"
      >
        <template #description="{ record }">
          <a-tag
            :color="record.description === '紧急停止' ? 'red' : 'arcoblue'"
          >
            {{ record.description }}
          </a-tag>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { getSystemLogs } from '@/api/system';
import useLoading from '@/hooks/loading';
import { Pagination } from '@/types/global';
import { TableColumnData } from '@arco-design/web-vue/es/table/interface.d';

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(false); // 这里应该是true

    // const ipAlias = [
    //   {
    //     ip: '192.168.8.200',
    //     title: '控制台',
    //   },
    //   {
    //     ip: '192.168.8.8',
    //     title: '后台服务器',
    //   },
    //   {
    //     ip: '192.168.8.9',
    //     title: '停车场',
    //   },
    //   {
    //     ip: '192.168.1.100',
    //     title: '边缘计算一',
    //   },
    //   {
    //     ip: '192.168.2.100',
    //     title: '边缘计算二',
    //   },
    // ];

    const columns: TableColumnData[] = [
      {
        title: '用户昵称',
        dataIndex: 'username',
        width: 90,
      },
      {
        title: '用户地址',
        dataIndex: 'address',
      },
      {
        title: 'IP地址',
        dataIndex: 'requestIp',
        width: 110,
      },
      {
        title: '浏览器',
        dataIndex: 'browser',
      },
      {
        title: '执行操作',
        dataIndex: 'description',
        slotName: 'description',
      },
      {
        title: '执行方法',
        dataIndex: 'method',
      },
      {
        title: '执行参数',
        dataIndex: 'params',
      },
      {
        title: '执行日期',
        dataIndex: 'createTime',
        width: 180,
      },
    ];

    const renderData = ref([]);
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const pagination = reactive({
      ...basePagination,
    });

    const fetchData = async (params = { current: 1, pageSize: 10 }) => {
      setLoading(true);
      try {
        const res: any = await getSystemLogs(params);
        renderData.value = res.content;
        pagination.current = params.current;
        pagination.total = res.totalElements;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };

    const onPageChange = (current: number) => {
      fetchData({ ...basePagination, current });
    };
    onMounted(() => {
      fetchData();
    });
    return {
      loading,
      columns,
      renderData,
      pagination,
      onPageChange,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
