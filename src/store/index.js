import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser, validId } from '@/api/auth.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    username: '',
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data);
      commit('setToken', data.data.token);
      commit('setUsername', data.data.userName);
    },
    VALIDID({ commit }, userId) {
      const { data } = validId(userId);
      console.log(data);
    },
  },
});
