import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions';
import getters from '@/store/getters';
import state from '@/store/state';
import mutations from '@/store/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state,
  getters,
  mutations,
  actions,
});
