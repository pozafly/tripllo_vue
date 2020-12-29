import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// header 붙이지 않음. login시 사용됨.
function createInstance() {
  return axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}/api/`,
    withCredentials: true,
  });
}

// axios interceptor를 통해 header에 token 넣어주고 return
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}/api/${url}`,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const board = createInstanceWithAuth('board');
