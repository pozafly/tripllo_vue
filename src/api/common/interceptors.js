// axios의 interceptor 설정
import store from '@/store';

export const setInterceptors = instance => {
  // request
  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = store.state.token;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // response
  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const errorCode = error.response.status;
      if (errorCode === 401 || errorCode === 403) {
        alert('권한이 없습니다.');
      } else if (errorCode === 400) {
        alert('잘못된 요청입니다.');
      }
      return Promise.reject('cancel');
    },
  );

  return instance;
};
