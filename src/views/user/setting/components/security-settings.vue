<template>
  <a-list :bordered="false">
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph> 登录密码</a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              初始密码123456，请及时修改密码 (如已修改请忽略)
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link @click="changePasswordBtn"> 修改</a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph> 安全手机</a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              <a-input v-if="isChangePhone" v-model="phone"></a-input>
              <p v-else style="margin: 0">{{ userInfo.phone }}</p>
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link v-if="isChangePhone" @click="savePhone"> 保存 </a-link>
            <a-link v-else @click="changePhoneBtn"> 修改 </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph> 安全邮箱</a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              {{ userInfo.email }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <!--            后台API未配置发送邮箱        -->
            <!--            <a-link @click="changeEmailBtn"> 修改</a-link>-->
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
  <change-password-modal ref="changePasswordModalRef" />
  <change-email-modal ref="changeEmailModalRef" :email="userInfo.email" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '@/store';
import { storeToRefs } from 'pinia';
import { isvalidPhone } from '@/utils/validate';
import { Notification } from '@arco-design/web-vue';
import { editUser } from '@/api/user';
import ChangeEmailModal from './changeEmailModal.vue';
import changePasswordModal from './changePasswordModal.vue';

export default defineComponent({
  components: {
    ChangeEmailModal,
    changePasswordModal,
  },
  setup() {
    const changePasswordModalRef =
      ref<InstanceType<typeof changePasswordModal>>();
    const changeEmailModalRef = ref<InstanceType<typeof ChangeEmailModal>>();
    const userStore = useUserStore();
    const { userInfo } = storeToRefs(userStore);
    const isChangePhone = ref(false);
    const phone = ref(userInfo.value.phone);

    const validPhone = (value): boolean => {
      if (!value) {
        Notification.error('请输入电话号码');
        return false;
      }
      if (!isvalidPhone(value)) {
        Notification.error('请输入正确的11位手机号码');
        return false;
      }
      return true;
    };

    const changePasswordBtn = () => {
      changePasswordModalRef.value?.show();
    };
    const changePhoneBtn = () => {
      isChangePhone.value = true;
    };
    const changeEmailBtn = () => {
      changeEmailModalRef.value?.show();
    };
    const savePhone = () => {
      if (validPhone(phone.value)) {
        const formData = {
          phone: phone.value, // 只更改手机号，其他不变
          id: userInfo.value.id,
          gender: userInfo.value.gender,
          nickName: userInfo.value.nickName,
        };
        editUser(formData).then(() => {
          Notification.success('修改成功');
          isChangePhone.value = false;
          userStore.info();
        });
      }
    };

    return {
      changePasswordModalRef,
      changeEmailModalRef,
      isChangePhone,
      phone,
      userInfo,
      changePasswordBtn,
      changePhoneBtn,
      savePhone,
      changeEmailBtn,
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
