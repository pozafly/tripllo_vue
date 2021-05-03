import Vue from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import { plugins } from '@/features/plugin';
import { directives } from '@/features/directive';
import { filters } from '@/features/filter';
import '@/utils/fontAwesomeIcon.js';
import '@/utils/sentry';

Vue.config.productionTip = false;

Vue.use(plugins);
Vue.use(directives);
Vue.use(filters);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
