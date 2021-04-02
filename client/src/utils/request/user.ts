import { request } from './index';
import { ACCESS_TOKEN_NAME } from '../const';
// import { store } from '@/store';

const baseUrl = '/api/user';

export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

export enum GenderCN {
  UNKNOWN = '未知',
  MALE = '男',
  FEMALE = '女',
}

export enum Group {
  SUBSCRIBER = 0,
  ADMIN = 1,
  SUPER_ADMIN = 2,
}

export enum GroupCN {
  SUBSCRIBER = '普通用户',
  ADMIN = '管理员',
  SUPER_ADMIN = '超级管理员',
}

export interface User {
  id: number | null;
  userAccount: string;
  userName: string;
  password?: string;
  gender: Gender;
  email: string;
  avatarUrl?: string;
  profile?: string;
  group: Group;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface LoggedInUser extends User {
  token: string;
}

/**
 * 登录
 * @param { Partial<User> } user - { userAccount, password }
 * @param { string } userAccount
 * @param { string } password
 */
export const login = async (user: Partial<User>) => {
  const loggedInUser = await request<LoggedInUser>({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: user,
  });
  if (loggedInUser) {
    // 存储token
    localStorage.setItem(ACCESS_TOKEN_NAME, loggedInUser.token);
  }
  return loggedInUser;
};

/**
 * 通过id查询用户
 */
export const retrieve = async (id: number) => {
  return await request<User>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      id,
    },
  });
};

/**
 * 遍历某一页用户
 * @param { number } page - 第几页
 * @param { number } capacity - 每页多少行数据
 */
export const retrieveAll = async (page: number, capacity: number) => {
  return await request<User[]>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      page,
      capacity,
    },
  });
};

/**
 * 用户注册
 */
export const register = async (user: Partial<User>) => {
  return await request<User>({
    method: 'POST',
    url: `${baseUrl}/register`,
    data: user,
  });
};

/**
 * 编辑用户信息
 */
export const edit = async (user: Partial<User>) => {
  const newUser = await request<User>({
    method: 'POST',
    url: `${baseUrl}/edit`,
    data: user,
  });
  if (!newUser) return; // 有可能请求失败，响应体并没有携带newUser信息
  // store.dispatch.common.SET_USERINFO(newUser); // redux更新当前帐号用户信息
  return newUser;
};
