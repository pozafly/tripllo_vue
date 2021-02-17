import $Google from '@/utils/social/Google';
import $Kakao from '@/utils/social/Kakao';
import $Github from '@/utils/social/Github';
import $Facebook from '@/utils/social/Facebook';

import KProgress from 'k-progress';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import MiniModal from '@/components/common/MiniModal';
import Notifications from 'vue-notification';
import vClickOutside from 'v-click-outside';
import InfiniteLoading from 'vue-infinite-loading';
import { normalFormatDate, timeForToday } from '@/utils/dateFilter';
import LoadScript from 'vue-plugin-load-script';

const install = Vue => {
  Vue.prototype.$Kakao = $Kakao;
  Vue.prototype.$Github = $Github;
  Vue.prototype.$Google = $Google;
  Vue.prototype.$Facebook = $Facebook;
  Vue.component('KProgress', KProgress);
  Vue.component('DatePicker', DatePicker);
  Vue.component('MiniModal', MiniModal);
  Vue.use(LoadScript);
  Vue.use(Notifications);
  Vue.use(vClickOutside);
  Vue.use(InfiniteLoading);
  Vue.filter('normalFormatDate', normalFormatDate);
  Vue.filter('timeForToday', timeForToday);
};

export { install };
