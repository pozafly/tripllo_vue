import Vue from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import { plugins } from '@/features/plugin';
import { directives } from '@/features/directive';
import { filters } from '@/features/filter';
import '@/utils/fontAwesomeIcon.js';
import '@/utils/sentry';
import Meta from 'vue-meta';

Vue.config.productionTip = false;

Vue.use(plugins);
Vue.use(directives);
Vue.use(filters);
Vue.use(Meta);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
