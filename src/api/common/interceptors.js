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
      console.log(error.response);
      if (error.response.status === 401) {
        alert('권한이 없습니다.');
        return;
        // return Promise.reject(error);
      } else if (error.response.status === 400) {
        alert('잘못된 요청입니다.');
        return;
      }
      //  else {
      //   alert(response.data.message);
      // }
      return Promise.reject(error);
    },
  );

  return instance;
};
