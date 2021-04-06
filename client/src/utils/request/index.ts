import axios, { AxiosRequestConfig } from 'axios';
// import { store } from '@/store';
import { ACCESS_TOKEN_NAME, ROUTER_WHITE_LIST } from '../const';
import { Restful } from './type';
import * as user from './user';

const isWhiteUrl = (url: string) => {
  return !ROUTER_WHITE_LIST.every((reg) => !reg.test(url));
};
export const request = async <T>(config: AxiosRequestConfig) => {
  // const { dispatch } = store;
  const isWhiteUrlFlag = isWhiteUrl(config.url as string);
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME);
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
      // dispatch.common.SET_DIALOG({
      //   status: true,
      //   title: '警告',
      //   content: `请求失败，状态码：${String(res.status)}`,
      // });
    } else if (
      (isWhiteUrlFlag && res.data.code !== 200) ||
      (!isWhiteUrlFlag && res.data.code !== 0)
    ) {
      // dispatch.common.SET_DIALOG({
      //   status: true,
      //   title: '警告',
      //   content: res.data.message,
      // });
    }
    return (res.data as unknown) as T;
  } catch (err) {
    console.log(err.response);
    console.error('网络错误', err);
    if (err?.response?.status === 401 && !isWhiteUrlFlag) {
      // dispatch.common.SET_SNACKSTATUS(true);
      // dispatch.common.SET_SNACKCONTENT('登陆失效，请重新登陆');
      // dispatch.common.LOGOUT();
      return;
    }
    if (err?.response?.status === 403) {
      // dispatch.common.SET_DIALOG({
      //   content: '无权进行此操作',
      //   title: '警告',
      //   status: true,
      // });
    }
  }
};

export { user };
