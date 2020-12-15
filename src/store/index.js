import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser, validId, signUp } from '@/api/auth.js';
import { saveAuthToCookie, saveUserToCookie } from '@/utils/cookies';

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
      saveAuthToCookie(data.data.token);
      saveUserToCookie(data.data.userName);
    },
    async VALIDID({ commit }, userId) {
      const { data } = await validId(userId);
      console.log(data);
    },
    async SIGNUP({ commit }, userData) {
      await signUp(userData);
    },
  },
});
