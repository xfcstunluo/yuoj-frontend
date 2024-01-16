<template>
  <a-row
    id="globalHeader"
    style="margin-bottom: 16px"
    align="center"
    :wrap="false"
  >
    <!--  :wrap="false" 强制内容不要换行  -->
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/avatar.jpg" />
            <div class="title">吞罗OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const loginUser = store.state.user.loginUser;

//显示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //todo 根据权限校验菜单,此时没有管理员权限，管理员页面会被过滤掉
    //item?.meta?.access 会出现报错：Argument of type unknown is not assignable to parameter of type string(未知类型无法赋值给string参数)，所以加一个强制转换。
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

//路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

setTimeout(() => {
  //dispathch函数用于触发actions，type用于选择actions中的函数，payload用于传递给actions的载荷
  store.dispatch("user/getLoginUser", {
    userName: "管理员吞罗",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
