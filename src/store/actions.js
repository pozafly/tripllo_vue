import {
  loginUser,
  validId,
  signup,
  apiSocialLogin,
  logoutUser,
} from '@/api/auth';
import { readBoardList, addBoard } from '@/api/board';

const actions = {
  // 로그인
  async LOGIN({ commit }, userData) {
    const { data } = await loginUser(userData);
    commit('setUser', data.data);
  },
  SOCIAL_LOGIN(_, userId) {
    return apiSocialLogin(userId);
  },
  async LOGOUT({ commit }) {
    await logoutUser();
    commit('logout');
  },

  // user
  async VALID_ID(_, userId) {
    console.log(userId);
    return await validId(userId);
  },
  async SIGNUP(_, userData) {
    return await signup(userData);
  },

  //board
  READ_BOARD_LIST({ commit }, userId) {
    return readBoardList(userId).then(({ data }) => {
      console.log(data.data);
      commit('readBoardList', data.data);
    });
  },
  ADD_BOARD(ctx, title) {
    return addBoard(title);
  },
};

export default actions;
