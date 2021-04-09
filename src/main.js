import Vue from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/store';
import { usePlugin } from '@/features/plugin';
import { useDirective } from '@/features/directive';
import { useFilter } from '@/features/filter';
import '@/utils/fontAwesomeIcon.js';
import '@/utils/sentry';

Vue.config.productionTip = false;

Vue.use(usePlugin);
Vue.use(useDirective);
Vue.use(useFilter);

const a = 0;
a = 1;
console.log(a);
console.log(b);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
