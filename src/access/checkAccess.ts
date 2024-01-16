import ACCESS_ENUM from "@/access/accessEnum";
import AccessEnum from "@/access/accessEnum";

/**
 *检查权限，判断用户是否具有某个权限
 * @param loginuser 当前登录用户
 * @param needAccess 需要有的权限 默认值是不需要权限
 * @return boolean 有无权限
 */
const checkAccess = (loginuser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前登陆用户的权限，假设loginUser或userRole为空，说明现在没有用户，给他一个默认值NOT_LOGIN；
  const LoginUserAccess = loginuser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  //假设需要的权限是NOT_LOGIN,因为默认值已经是这个，直接返回true
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  //如果需要用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    //如果用户没登录，说明没有权限
    if (LoginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  //如果需要的权限是管理员
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (LoginUserAccess !== AccessEnum.ADMIN) {
      return false;
    }
  }

  //return true写在这里，不用全部在剩下的两个if语句中再写一遍。
  return true;
};

export default checkAccess;
