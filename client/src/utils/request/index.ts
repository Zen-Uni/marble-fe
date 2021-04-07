import axios, { AxiosRequestConfig } from 'axios';
// import { store } from '@/store';
import { ROUTER_WHITE_LIST } from '../const';
import { Restful } from './type';
import * as user from './user';
import { message } from 'antd';
import store from 'store';
import { logOut } from 'store/action';

const isWhiteUrl = (url: string) => {
  return !ROUTER_WHITE_LIST.every((reg) => !reg.test(url));
};
export const request = async <T>(config: AxiosRequestConfig) => {
  const { dispatch, getState } = store;
  const isWhiteUrlFlag = isWhiteUrl(config.url as string);
  try {
    const token = getState().common.token;
    const headers = config.headers || {};
    // 如果本地有token，每个非白名单请求都附带上token
    if (token && !isWhiteUrlFlag) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await axios.request<Restful<T>>({
      ...config,
      headers,
    });
    if (res.status !== 200) {
      message.error(`请求失败，状态码：${String(res.status)}`, 6000);
    } else if (
      (isWhiteUrlFlag && res.data.code !== 200) ||
      (!isWhiteUrlFlag && res.data.code !== 0)
    ) {
      message.error(res.data.message, 6000);
    }
    return (res.data as unknown) as T;
  } catch (err) {
    console.log(err.response);
    console.error('网络错误', err);
    if (err?.response?.status === 401 && !isWhiteUrlFlag) {
      message.error('登陆失效，请重新登陆', 6000);
      dispatch(logOut());
      return;
    }
    if (err?.response?.status === 403) {
      message.error('无权进行此操作', 6000);
    }
  }
};

export { user };
