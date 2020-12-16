import GoogleLogin from 'vue-google-login';
import $Google from '@/utils/social/Google';
import $Kakao from '@/utils/social/Kakao';

const install = Vue => {
  Vue.prototype.$Kakao = $Kakao;
  Vue.component('GoogleLogin', GoogleLogin);
  Vue.prototype.$Google = $Google;
};

export { install };
