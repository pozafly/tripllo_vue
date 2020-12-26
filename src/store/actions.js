import { loginUser, validId, signup } from '@/api/auth';
import { readBoardList } from '@/api/board';

const actions = {
  // user
  async LOGIN({ commit }, userData) {
    const { data } = await loginUser(userData);
    console.log(data);
    commit('setToken', data.data.token);
    commit('setUsername', data.data.userName);
  },
  async VALIDID({ commit }, userId) {
    console.log(userId);
    return await validId(userId);
  },
  async SIGNUP({ commit }, userData) {
    return await signup(userData);
  },

  //board
  async READBOARDLIST({ commit }, userId) {
    return readBoardList(userId).then(() => commit('readBoardList'));
  },
};

export default actions;
