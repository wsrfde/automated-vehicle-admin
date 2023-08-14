<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '工作统计']" />
    <a-card class="general-card" title="工作统计">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="outlet" label="出矿口倒料统计">
                  <a-input v-model="formModel.outlet" placeholder="请输入" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="readyLoading" label="准备装车统计">
                  <a-input
                    v-model="formModel.readyLoading"
                    placeholder="请输入"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="oneCar" label="1行车装车统计">
                  <a-input v-model="formModel.oneCar" placeholder="请输入" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="twoCar" label="2行车装车统计">
                  <a-input v-model="formModel.twoCar" placeholder="请输入" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="getVehicleList()">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider />

      <!--      <a-row>-->
      <!--        <a-col :span="16">-->
      <!--          <a-space>-->
      <!--            <a-button type="primary" @click="createData">-->
      <!--              <template #icon>-->
      <!--                <icon-plus />-->
      <!--              </template>-->
      <!--              创建-->
      <!--            </a-button>-->
      <!--          </a-space>-->
      <!--        </a-col>-->
      <!--      </a-row>-->

      <a-table
        :columns="columns"
        :data="renderData"
        :loading="loading"
        :pagination="pagination"
        :bordered="false"
        style="margin-top: 20px"
        row-key="id"
        :summary="summary"
        @page-change="onPageChange"
      >
        <!--        <template #outlet="{ record, rowIndex }">-->
        <!--          <a-input v-if="rowIndex === editIndex" v-model="record.outlet" />-->
        <!--          <p v-else>{{ record.outlet }}</p>-->
        <!--        </template>-->
        <template #readyLoading="{ record, rowIndex }">
          <a-input
            v-if="rowIndex === editIndex"
            v-model="record.readyLoading"
          />
          <p v-else>{{ record.readyLoading }}</p>
        </template>
        <template #oneCar="{ record, rowIndex }">
          <a-input v-if="rowIndex === editIndex" v-model="record.oneCar" />
          <p v-else>{{ record.oneCar }}</p>
        </template>
        <template #twoCar="{ record, rowIndex }">
          <a-input v-if="rowIndex === editIndex" v-model="record.twoCar" />
          <p v-else>{{ record.twoCar }}</p>
        </template>
        <!--        <template #optional="{ record, rowIndex }">-->
        <!--          <a-space :size="5">-->
        <!--            <a-button-->
        <!--              v-if="rowIndex !== editIndex"-->
        <!--              :disabled="editIndex !== -1"-->
        <!--              type="text"-->
        <!--              @click="changeEditIndex(rowIndex)"-->
        <!--            >-->
        <!--              编辑-->
        <!--            </a-button>-->
        <!--            <a-button-->
        <!--              v-else-->
        <!--              type="text"-->
        <!--              status="success"-->
        <!--              @click="saveEdit(record, rowIndex)"-->
        <!--            >-->
        <!--              完成-->
        <!--            </a-button>-->
        <!--            <a-popconfirm-->
        <!--              content="您确定要删除吗?"-->
        <!--              @ok="deleteFun(record, rowIndex)"-->
        <!--            >-->
        <!--              <a-button type="text" status="danger"> 删除 </a-button>-->
        <!--            </a-popconfirm>-->
        <!--          </a-space>-->
        <!--        </template>-->
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import useLoading from '@/hooks/loading';
import { Pagination } from '@/types/global';
import {
  addVehicleData,
  deleteVehicleData,
  editVehicleData,
  getVehicleData,
} from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';

const generateFormModel = () => {
  return {
    outlet: '',
    readyLoading: '',
    oneCar: '',
    twoCar: '',
  };
};

export default defineComponent({
  setup() {
    const formModel = ref(generateFormModel());
    const editIndex = ref(-1);

    const reset = () => {
      formModel.value = generateFormModel();
    };

    const { loading, setLoading } = useLoading(false); // 这里应该是true

    const columns = [
      {
        title: '出矿口倒料统计(Kg)',
        dataIndex: 'outlet',
      },
      {
        title: '准备装车倒料统计(Kg)',
        dataIndex: 'readyLoading',
        slotName: 'readyLoading',
      },
      {
        title: '1行车装车统计(Kg)',
        dataIndex: 'oneCar',
        slotName: 'oneCar',
      },
      {
        title: '2号行车装车统计(Kg)',
        dataIndex: 'twoCar',
        slotName: 'twoCar',
      },
    ];

    const renderData = ref([
      {
        id: 1,
        outlet: '1111',
        readyLoading: '2222',
        oneCar: '3333',
        twoCar: '4444',
        dayStatistics: '5555',
        monthStatistics: '6666',
        expand: 'Expand Content',
      },
      {
        id: 2,
        outlet: '222',
        readyLoading: '222',
        oneCar: '222',
        twoCar: '222',
        dayStatistics: '222',
        monthStatistics: '222',
      },
      {
        id: 3,
        outlet: '333',
        readyLoading: '333',
        oneCar: '333',
        twoCar: '333',
        dayStatistics: '333',
        monthStatistics: '333',
      },
    ]);
    const basePagination: Pagination = {
      current: 1,
      pageSize: 10,
    };
    const pagination = reactive({
      ...basePagination,
    });

    const getVehicleList = (params = {}) => {
      const query = {
        page: basePagination.current,
        size: basePagination.pageSize,
        ...params,
        ...formModel.value,
      };
      setLoading(true);
      getVehicleData(query).then((res) => {
        setLoading(false);
        // renderData.value = res.content;
        pagination.current = params.page;
        pagination.total = res.totalElements;
      });
    };

    const onPageChange = (current: number) => {
      getVehicleList({ ...basePagination, current });
    };

    const createData = () => {
      editIndex.value = 0;
      renderData.value.unshift({});
    };
    const changeEditIndex = (n) => {
      editIndex.value = n;
    };
    const saveEdit = (record) => {
      if (Object.values(record).length < 4) {
        Notification.error('请填写完整信息');
        return;
      }
      const query = {
        ...record,
      };
      // 没有id为添加，有id为修改
      (!record.id ? addVehicleData(query) : editVehicleData(query)).then(() => {
        editIndex.value = -1; // 清空编辑状态
        Notification.success({
          title: '成功',
          content: !record.id ? '添加成功' : '修改成功',
        });
        getVehicleList();
      });
    };
    const deleteFun = (record, rowIndex) => {
      // 数据没有id，直接删除
      if (!record.id) {
        renderData.value.splice(rowIndex, 1);
        editIndex.value = -1;
        return;
      }
      deleteVehicleData(record.id).then(() => {
        editIndex.value = -1;
        Notification.success({
          title: '成功',
          content: '删除成功',
        });
        getVehicleList();
      });
    };

    onMounted(() => {
      getVehicleList();
    });

    const summary = ({ data }) => {
      const countData = {
        dayStatistics: 0,
        monthStatistics: 0,
      };
      data.forEach((record) => {
        countData.dayStatistics += record.dayStatistics * 1;
        countData.monthStatistics += record.monthStatistics * 1;
      });
      return [
        {
          outlet: '日运输统计',
          oneCar: countData.dayStatistics,
          twoCar: countData.dayStatistics,
        },
        {
          outlet: '月运输统计',
          oneCar: countData.monthStatistics,
          twoCar: countData.monthStatistics,
        },
      ];
    };

    return {
      loading,
      columns,
      renderData,
      pagination,
      formModel,
      editIndex,
      onPageChange,
      reset,
      createData,
      getVehicleList,
      changeEditIndex,
      saveEdit,
      deleteFun,
      summary,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
