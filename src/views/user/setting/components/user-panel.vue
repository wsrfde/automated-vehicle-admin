<template>
  <a-card :bordered="false">
    <a-space :size="54">
      <a-upload
        :action="baseUrl + '/api/users/updateAvatar'"
        list-type="picture-card"
        :headers="headers"
        :file-list="fileList"
        name="avatar"
        :show-upload-button="true"
        :show-file-list="false"
        :on-before-upload="uploadBefore"
        @change="uploadChange"
      >
        <template #upload-button>
          <a-avatar :size="100" class="info-avatar">
            <template #trigger-icon>
              <icon-camera />
            </template>
            <img v-if="userStore.avatarName" :src="fileList[0].url" />
          </a-avatar>
        </template>
      </a-upload>
      <a-descriptions
        :data="renderData"
        :column="2"
        align="right"
        layout="inline-horizontal"
        :label-style="{
          width: '140px',
          fontWeight: 'normal',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '200px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
      >
        <template #label="{ label }">{{ label }} :</template>
      </a-descriptions>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FileItem } from '@arco-design/web-vue/es/upload/interfaces';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { Message } from '@arco-design/web-vue';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const baseUrl = process.env.BASE_API;
    const headers = {
      Authorization: getToken(),
    };
    const file = {
      uid: '-2',
      name: 'avatar.png',
      url: `${process.env.BASE_API}/avatar/${userStore.avatarName}`,
    };
    const renderData = [
      {
        label: '登入账号',
        value: userStore.username,
      },
      {
        label: '账号ID',
        value: userStore.id,
      },
      // {
      //   label: '手机号码',
      //   value: userStore.phone,
      // },
      // {
      //   label: '用户邮箱',
      //   value: userStore.email,
      // },
      {
        label: '注册时间',
        value: userStore.createTime,
      },
    ];
    const fileList = ref<FileItem[]>([file]);
    const uploadChange = (fileItemList: FileItem[], fileItem: FileItem) => {
      fileList.value = [fileItem];
    };
    const uploadBefore = (currentFile) => {
      const isLt2M = currentFile.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        Message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    };
    return {
      userStore,
      headers,
      fileList,
      renderData,
      baseUrl,
      uploadChange,
      uploadBefore,
    };
  },
});
</script>

<style scoped lang="less">
.arco-card {
  padding: 14px 0 4px 4px;
  border-radius: 4px;
}

:deep(.arco-avatar-trigger-icon-button) {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background-color: #e8f3ff;

  .arco-icon-camera {
    margin-top: 8px;
    color: rgb(var(--arcoblue-6));
    font-size: 14px;
  }
}
</style>
