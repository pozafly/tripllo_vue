import $_Google from '@/utils/social/Google';
import $_Kakao from '@/utils/social/Kakao';
// import $_Github from '@/utils/social/Github';
import $_Facebook from '@/utils/social/Facebook';

import $_KProgress from 'k-progress';
import $_DatePicker from 'v-calendar/lib/components/date-picker.umd';
import $_MiniModal from '@/components/common/MiniModal';
import $_Notifications from 'vue-notification';
import $_vClickOutside from 'v-click-outside';
import $_InfiniteLoading from 'vue-infinite-loading';
import $_LoadScript from 'vue-plugin-load-script';

const install = Vue => {
  Vue.prototype.$_Kakao = $_Kakao;
  // Vue.prototype.$_Github = $_Github;
  Vue.prototype.$_Google = $_Google;
  Vue.prototype.$_Facebook = $_Facebook;
  Vue.component('KProgress', $_KProgress);
  Vue.component('DatePicker', $_DatePicker);
  Vue.component('MiniModal', $_MiniModal);
  Vue.use($_LoadScript);
  Vue.use($_Notifications);
  Vue.use($_vClickOutside);
  Vue.use($_InfiniteLoading);
};

export { install };
