<template>
  <a-list :bordered="false">
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph> 监控地址</a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              <p v-if="!isChangeAddress" style="margin: 0">
                {{ currentAddress }}
              </p>
              <a-input v-else v-model="currentAddress" style="width: 300px" />
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link v-if="!isChangeAddress" @click="changeAddressBtn">
              修改
            </a-link>
            <a-link v-else @click="saveAddressBtn"> 保存</a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useAppStore from '@/store/modules/app';

export default defineComponent({
  setup() {
    const appStore = useAppStore();
    const currentAddress = ref(appStore.monitorAddress);
    const isChangeAddress = ref(false);

    const changeAddressBtn = () => {
      isChangeAddress.value = true;
    };
    const saveAddressBtn = () => {
      appStore.changeMonitorAddress(currentAddress);
      isChangeAddress.value = false;
      window.location.reload();
    };

    return {
      isChangeAddress,
      currentAddress,
      changeAddressBtn,
      saveAddressBtn,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.arco-list-item) {
  border-bottom: none !important;

  .arco-typography {
    margin-bottom: 20px;
  }

  .arco-list-item-meta-avatar {
    margin-bottom: 1px;
  }

  .arco-list-item-meta {
    padding: 0;
  }
}

:deep(.arco-list-item-meta-content) {
  flex: 1;
  border-bottom: 1px solid var(--color-neutral-3);

  .arco-list-item-meta-description {
    display: flex;
    flex-flow: row;
    justify-content: space-between;

    .operation {
      margin-right: 6px;
    }
  }
}
</style>
