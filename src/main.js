import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { install } from '@/plugin/plugin';
import { formatDate } from '@/utils/dateFilter';

Vue.config.productionTip = false;
Vue.use(install);
Vue.filter('formatDate', formatDate);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
