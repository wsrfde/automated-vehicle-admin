<template>
  <a-row :gutter="24">
    <a-col :span="12">
      <a-card class="general-card" title="天车坐标">
        <a-descriptions :data="coordinatesData" bordered :column="2">
          <template #title>
            <p class="desc-title">天车 #01</p>
          </template>
        </a-descriptions>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card class="general-card" title="天车坐标">
        <a-descriptions :data="coordinatesData" bordered :column="2">
          <template #title>
            <p class="desc-title">天车 #02</p>
          </template>
        </a-descriptions>
      </a-card>
    </a-col>
  </a-row>
  <a-row :gutter="24" style="margin-top: 20px">
    <a-col :span="12">
      <a-card class="general-card" title="天车坐标">
        <a-descriptions :data="coordinatesData" bordered :column="2">
          <template #title>
            <p class="desc-title">天车 #03</p>
          </template>
        </a-descriptions>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card class="general-card" title="天车坐标">
        <a-descriptions :data="coordinatesData" bordered :column="2">
          <template #title>
            <p class="desc-title">天车 #04</p>
          </template>
        </a-descriptions>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const coordinatesData = [
      {
        label: '大车X坐标',
        value: '2000',
      },
      {
        label: '小车X坐标',
        value: '25000',
      },
      {
        label: '大车Y坐标',
        value: '8000',
      },
      {
        label: '小车Y坐标',
        value: '300',
      },
      {
        label: '抓斗高度Z坐标',
        value: '120',
      },
      {
        label: '抓斗开度K坐标',
        value: '2000',
      },
    ];
    return {
      coordinatesData,
    };
  },
});
</script>

<style scoped lang="less">
.desc-title {
  margin-bottom: -12px;
  padding: 5px 20px;
  text-align: center;
  font-weight: normal;
  background-color: var(--color-fill-1);
  border: solid var(--color-neutral-3);
  border-width: 1px 1px 0 1px;
}
</style>
