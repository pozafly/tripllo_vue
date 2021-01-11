// axios의 interceptor 설정
import store from '@/store';

export function setInterceptors(instance) {
  // request
  instance.interceptors.request.use(
    function(config) {
      config.headers.Authorization = store.state.token;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );

  // response
  instance.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      return Promise.reject(error);
    },
  );

  return instance;
}
