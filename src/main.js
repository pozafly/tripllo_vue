import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { install } from '@/plugin/plugin';
import { normalFormatDate, timeForToday } from '@/utils/dateFilter';
import LoadScript from 'vue-plugin-load-script';
import '@/utils/fontAwesomeIcon.js';
import Notifications from 'vue-notification';
import vClickOutside from 'v-click-outside';
import InfiniteLoading from 'vue-infinite-loading';

Vue.config.productionTip = false;
Vue.use(install);
Vue.use(LoadScript);
Vue.use(Notifications);
Vue.use(vClickOutside);
Vue.use(InfiniteLoading);
Vue.filter('normalFormatDate', normalFormatDate);
Vue.filter('timeForToday', timeForToday);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
