/**
 * @description action 管理
 * @author Uni
 */

// 引入 action 类型
import { User } from 'utils/request/user';
import ActionTypes from './types';

// 更改名字 --- test
export function changeNameAction(name: string) {
  return {
    type: ActionTypes.changeName,
    value: name,
  };
}

// 用户信息
export function setUserInfo(user: Partial<User>) {
  return {
    type: ActionTypes.setUserInfo,
    value: user,
  };
}

// 设置token
export function setToken(token: string) {
  return {
    type: ActionTypes.setToken,
    value: token,
  };
}

// 登录
export function logIn() {
  return {
    type: ActionTypes.logIn,
    value: null,
  };
}

// 退出登录
export function logOut() {
  return {
    type: ActionTypes.logOut,
    value: null,
  };
}
