/**
 * @description 公共Reducer
 *
 */

import { User } from 'utils/request/user';
import ActionTypes from '../action/types';
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from 'utils/const';

export interface CommonDefaultState {
  userInfo: Partial<User>;
  token: string;
  isLogin: boolean;
}

interface Action {
  type: string;
  value: any;
}

const commonDefaultState: CommonDefaultState = {
  userInfo: {},
  token: '',
  isLogin: false,
};

// 初始化state
const token = localStorage.getItem(ACCESS_TOKEN_NAME);
const userInfo = localStorage.getItem(USER_INFO_NAME);
if (!token || !userInfo) {
  localStorage.removeItem(ACCESS_TOKEN_NAME);
  localStorage.removeItem(USER_INFO_NAME);
} else {
  commonDefaultState.userInfo = JSON.parse(userInfo || 'null');
  commonDefaultState.token = token;
  commonDefaultState.isLogin = true;
}

function reducer(
  state: CommonDefaultState = commonDefaultState,
  action: Action,
): CommonDefaultState {
  if (action.type === ActionTypes.setUserInfo) {
    if (action.value)
      localStorage.setItem(USER_INFO_NAME, JSON.stringify(action.value));
    return {
      ...state,
      userInfo: action.value,
    };
  }
  if (action.type === ActionTypes.setToken) {
    if (action.value)
      localStorage.setItem(ACCESS_TOKEN_NAME, JSON.stringify(action.value));
    return {
      ...state,
      token: action.value,
    };
  }
  if (action.type === ActionTypes.logIn) {
    return {
      ...state,
      isLogin: true,
    };
  }
  if (action.type === ActionTypes.logOut) {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem(USER_INFO_NAME);
    return {
      ...state,
      userInfo: {},
      token: '',
      isLogin: false,
    };
  }

  return state;
}

export default reducer;
