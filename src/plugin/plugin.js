import $Google from '@/utils/social/Google';
import $Kakao from '@/utils/social/Kakao';
import $Github from '@/utils/social/Github';
import $Facebook from '@/utils/social/Facebook';
import KProgress from 'k-progress';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

const install = Vue => {
  Vue.prototype.$Kakao = $Kakao;
  Vue.prototype.$Github = $Github;
  Vue.prototype.$Google = $Google;
  Vue.prototype.$Facebook = $Facebook;
  Vue.component('KProgress', KProgress);
  Vue.component('DatePicker', DatePicker);
};

export { install };
