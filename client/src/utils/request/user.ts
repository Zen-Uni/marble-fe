import { request } from './index';
import { Restful } from './type';
// import { store } from '@/store';

const baseUrl = '/api/user';

export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

export enum Group {
  COMMON = 0,
  ADMIN = 1,
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
  const loggedInUser = await request<Restful<LoggedInUser>>({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: user,
  });
  return loggedInUser;
};

/**
 * 通过id查询用户
 */
export const retrieve = async (id: number) => {
  return await request<Restful<User>>({
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
  return await request<Restful<User[]>>({
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
  return await request<Restful<User>>({
    method: 'POST',
    url: `${baseUrl}/register`,
    data: user,
  });
};

/**
 * 编辑用户信息
 */
export const edit = async (user: Partial<User>) => {
  return await request<Restful<User>>({
    method: 'POST',
    url: `${baseUrl}/edit`,
    data: user,
  });
};
