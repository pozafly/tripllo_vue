import Vue from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import { usePlugin } from '@/features/plugin';
import { useDirective } from '@/features/directive';
import { useFilter } from '@/features/filter';
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
