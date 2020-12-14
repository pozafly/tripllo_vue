// axios의 interceptor 설정
import store from '@/store/index';

// 요청 인터셉터 추가
export function setInterceptors(instance) {
  // request
  instance.interceptors.request.use(
    function(config) {
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
