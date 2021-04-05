import Vue from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import { usePlugin } from '@/compositions/plugin';
import { useDirective } from '@/compositions/directive';
import { useFilter } from '@/compositions/filter';
import '@/utils/fontAwesomeIcon.js';

Vue.config.productionTip = false;

Vue.use(usePlugin);
Vue.use(useDirective);
Vue.use(useFilter);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
