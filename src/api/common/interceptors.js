// axios의 interceptor 설정
import store from '@/store';
import router from '@/routes';

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
    ({ response }) => {
      console.log('error interceptor');
      console.log(response);
      if (response.status === 401) {
        alert('권한이 없습니다.');
        return;
        // if (router.history.current.fullPath.includes('card')) return;
        // router.push('/main');
      } else if (response.state === 400) {
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
