import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { install } from '@/plugin/plugin';
import '@/utils/fontAwesomeIcon.js';

Vue.config.productionTip = false;
Vue.use(install);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
