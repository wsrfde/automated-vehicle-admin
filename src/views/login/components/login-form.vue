<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ title }}</div>
    <div class="login-form-sub-title">智能化管理平台 </div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginFormRef"
      :model="loginForm"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="loginForm.password"
          placeholder="请输入密码"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="code"
        :rules="[{ required: true, message: '验证码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-space>
          <a-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
          >
            <template #prefix>
              <icon-safe />
            </template>
          </a-input>
          <div class="login-code">
            <img :src="codeUrl" alt="验证码" @click="getCode" />
          </div>
        </a-space>
      </a-form-item>
      <a-form-item field="rememberMe" class="custom-item">
        <a-checkbox v-model="loginForm.rememberMe"> 记住密码 </a-checkbox>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          登录
        </a-button>
        <!--        <a-button type="text" long class="login-form-register-btn">-->
        <!--          注册账号-->
        <!--        </a-button>-->
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useUserStore, useAppStore } from '@/store';
import useLoading from '@/hooks/loading';
import { LoginData, getCodeImg } from '@/api/user';
import encrypt from '@/utils/rsaEncrypt';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const router = useRouter();
    const errorMessage = ref('');
    const { loading, setLoading } = useLoading();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const codeUrl = ref('');
    const localPassword = ref('');

    const loginForm = reactive({
      username: '',
      password: '',
      code: '',
      uuid: '',
      rememberMe: false,
    });

    const getLocalData = () => {
      const localData = localStorage.getItem('loginForm');
      if (localData) {
        const { username, password, rememberMe } = JSON.parse(localData);
        loginForm.username = username;
        loginForm.password = rememberMe ? password : '';
        localPassword.value = password || ''; // 如果为undefined，就赋值为空
        loginForm.rememberMe = rememberMe;
      }
    };

    const routerJump = async () => {
      const { redirect, ...othersQuery } = router.currentRoute.value.query;
      console.log(redirect, othersQuery);
      await router.push({
        name: (redirect as string) || appStore.defaultRouter,
        query: {
          ...othersQuery,
        },
      });
      Message.success('欢迎使用');
    };

    const getCode = () => {
      getCodeImg().then((res: any) => {
        codeUrl.value = res.img;
        loginForm.uuid = res.uuid;
      });
    };

    const handleSubmit = async ({
      values,
      errors,
    }: {
      values: Record<string, any>;
      errors: Record<string, ValidatedError> | undefined;
    }) => {
      const { password } = values;
      const user = {
        ...values,
        password:
          localPassword.value === password ? password : await encrypt(password),
      } as LoginData;
      if (!errors) {
        setLoading(true);
        try {
          if (loginForm.rememberMe) {
            localStorage.setItem('loginForm', JSON.stringify(user));
          } else {
            localStorage.removeItem('loginForm');
          }
          await userStore.login(user);
          await routerJump();
        } catch (err: any) {
          console.log(err);
          errorMessage.value = err.response.data.message;
          if (err.response.data.message === '验证码不存在或已过期') {
            getCode();
          }
        } finally {
          setLoading(false);
        }
      }
    };

    onMounted(() => {
      if (userStore.role) routerJump();
      // 获取验证码
      getCode();
      // 获取本地数据
      getLocalData();
    });

    return {
      loading,
      loginForm,
      errorMessage,
      codeUrl,
      handleSubmit,
      getCode,
    };
  },
});
</script>

<style lang="less" scoped>
.login-form {
  .custom-item {
    //margin: 0;
    margin-top: -10px;
    margin-bottom: 10px;
    :deep(.arco-form-item-label-col) {
      margin-bottom: 0;
    }
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }

  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
