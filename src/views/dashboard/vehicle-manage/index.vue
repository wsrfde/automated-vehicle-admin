<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '车辆管理']" />
    <a-card class="general-card" title="车辆管理">
      <!--      <a-row>-->
      <!--        <a-col :flex="1">-->
      <!--          <a-form-->
      <!--            :model="formModel"-->
      <!--            :label-col-props="{ span: 6 }"-->
      <!--            :wrapper-col-props="{ span: 18 }"-->
      <!--            label-align="left"-->
      <!--          >-->
      <!--            <a-row :gutter="16">-->
      <!--              <a-col :span="8">-->
      <!--                <a-form-item field="length" label="车辆长度">-->
      <!--                  <a-input v-model="formModel.length" placeholder="请输入" />-->
      <!--                </a-form-item>-->
      <!--              </a-col>-->
      <!--              <a-col :span="8">-->
      <!--                <a-form-item field="wide" label="车辆宽度">-->
      <!--                  <a-input v-model="formModel.wide" placeholder="请输入" />-->
      <!--                </a-form-item>-->
      <!--              </a-col>-->
      <!--              <a-col :span="8">-->
      <!--                <a-form-item field="height" label="车辆高度">-->
      <!--                  <a-input v-model="formModel.height" placeholder="请输入" />-->
      <!--                </a-form-item>-->
      <!--              </a-col>-->
      <!--              <a-col :span="8">-->
      <!--                <a-form-item field="license" label="车牌">-->
      <!--                  <a-input v-model="formModel.license" placeholder="请输入" />-->
      <!--                </a-form-item>-->
      <!--              </a-col>-->
      <!--            </a-row>-->
      <!--          </a-form>-->
      <!--        </a-col>-->
      <!--        <a-divider style="height: 84px" direction="vertical" />-->
      <!--        <a-col :flex="'86px'" style="text-align: right">-->
      <!--          <a-space direction="vertical" :size="18">-->
      <!--            <a-button type="primary" @click="getVehicleList()">-->
      <!--              <template #icon>-->
      <!--                <icon-search />-->
      <!--              </template>-->
      <!--              查询-->
      <!--            </a-button>-->
      <!--            <a-button @click="reset">-->
      <!--              <template #icon>-->
      <!--                <icon-refresh />-->
      <!--              </template>-->
      <!--              重置-->
      <!--            </a-button>-->
      <!--          </a-space>-->
      <!--        </a-col>-->
      <!--      </a-row>-->
      <!--      <a-divider />-->

      <a-row>
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="createData">
              <template #icon>
                <icon-plus />
              </template>
              创建
            </a-button>
          </a-space>
        </a-col>
      </a-row>

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
        <template #length="{ record, rowIndex }">
          <a-input v-if="rowIndex === editIndex" v-model="record.length" />
          <p v-else>{{ record.length }}</p>
        </template>
        <template #wide="{ record, rowIndex }">
          <a-input v-if="rowIndex === editIndex" v-model="record.wide" />
          <p v-else>{{ record.wide }}</p>
        </template>
        <template #height="{ record, rowIndex }">
          <a-input v-if="rowIndex === editIndex" v-model="record.height" />
          <p v-else>{{ record.height }}</p>
        </template>
        <template #license="{ record, rowIndex }">
          <a-input v-if="rowIndex === editIndex" v-model="record.license" />
          <a-tag v-else color="arcoblue">
            {{ record.license }}
          </a-tag>
        </template>
        <template #optional="{ record, rowIndex }">
          <a-space :size="5">
            <a-button
              v-if="rowIndex !== editIndex"
              :disabled="editIndex !== -1"
              type="text"
              @click="changeEditIndex(rowIndex)"
            >
              编辑
            </a-button>
            <a-button
              v-else
              type="text"
              status="success"
              @click="saveEdit(record, rowIndex)"
            >
              完成
            </a-button>
            <a-popconfirm
              content="您确定要删除吗?"
              @ok="deleteFun(record, rowIndex)"
            >
              <a-button type="text" status="danger"> 删除 </a-button>
            </a-popconfirm>
          </a-space>
        </template>
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
    height: '',
    length: '',
    license: '',
    wide: '',
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
        title: '车辆长度',
        dataIndex: 'length',
        slotName: 'length',
      },
      {
        title: '车辆宽度',
        dataIndex: 'wide',
        slotName: 'wide',
      },
      {
        title: '车辆高度',
        dataIndex: 'height',
        slotName: 'height',
      },
      {
        title: '车牌',
        dataIndex: 'license',
        slotName: 'license',
      },
      {
        title: '操作',
        slotName: 'optional',
      },
    ];

    const renderData = ref([]);
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
      console.log(query);
      setLoading(true);
      getVehicleData(query).then((res) => {
        setLoading(false);
        renderData.value = res.content;
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
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
