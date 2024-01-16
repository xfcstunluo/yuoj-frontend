<template>
  <div class="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      label-align="left"
      style="max-width: 480px; margin: 0 auto"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不小于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"
          >登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  // JSON.stringify(data) 将data里面的内容转化成JSON类型的字符串并打印出来。
  // alert(JSON.stringify(form));
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    //获取登录信息成功后再跳转到主页
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      //replace表示这个页面不占用堆栈，页面后退也不会再回来登录页，因为用户已经登录，没必要再给他看后退的登录页
      replace: true,
    });
  } else {
    message.error("登录失败，" + res.message);
  }
};
</script>

<!--<style scoped>-->
<!--#userLoginView .login {-->
<!--  justify-content: center;-->
<!--}-->
<!--</style>-->
