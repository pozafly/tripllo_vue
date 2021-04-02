import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { install } from '@/plugin';
import '@/utils/fontAwesomeIcon.js';
import { normalFormatDate, timeForToday } from '@/utils/dateFilter';

Vue.config.productionTip = false;
Vue.use(install);

Vue.filter('normalFormatDate', normalFormatDate);
Vue.filter('timeForToday', timeForToday);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
