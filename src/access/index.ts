//前端所有权限管理
import router from "@/router";
import store from "@/store";
import AccessEnum from "@/access/accessEnum";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  const loginUser = store.state.user.loginUser;
  //如果之前没有登陆过，以下两个值都为空，自动登录
  if (!loginUser || !loginUser.userRole) {
    //加await是为了等待用户登陆成功后，再执行后续代码
    await store.dispatch("user/getLoginUser");
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //如果该页面里面存储的access即 needAccess!==ACCESS_ENUM，跳转的页面需要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果没登陆，跳转到登陆页面，之后还要给登录重定向回页面
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //如果已经登录，检查该页面访问是否有管理员权限
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }

  next();
});
