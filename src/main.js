import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { install } from '@/plugin/plugin';
import { formatDate } from '@/utils/dateFilter';
import LoadScript from 'vue-plugin-load-script';
import '@/utils/fontAwesomeIcon.js';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;
Vue.use(install);
Vue.use(LoadScript);
Vue.use(Notifications);
Vue.filter('formatDate', formatDate);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
