import GoogleLogin from 'vue-google-login';
import $Google from '@/utils/social/Google';
import $Kakao from '@/utils/social/Kakao';
import $Github from '@/utils/social/Github';
import KProgress from 'k-progress';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

const install = Vue => {
  Vue.prototype.$Kakao = $Kakao;
  Vue.prototype.$Github = $Github;
  Vue.prototype.$Google = $Google;
  Vue.component('GoogleLogin', GoogleLogin);
  Vue.component('KProgress', KProgress);
  Vue.component('Calendar', Calendar);
  Vue.component('DatePicker', DatePicker);
};

export { install };
