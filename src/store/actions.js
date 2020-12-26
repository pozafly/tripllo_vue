import { loginUser, validId, signup, apiSocialLogin } from '@/api/auth';
import { readBoardList } from '@/api/board';

const actions = {
  // user
  LOGIN({ commit }, userData) {
    const { data } = loginUser(userData);
    console.log(data);
    commit('setToken', data.data.token);
    commit('setUsername', data.data.userName);
  },
  VALID_ID(_, userId) {
    console.log(userId);
    return validId(userId);
  },
  SIGNUP(_, userData) {
    return signup(userData);
  },
  SOCIAL_LOGIN(_, userId) {
    return apiSocialLogin(userId);
  },

  //board
  READ_BOARD_LIST({ commit }, userId) {
    return readBoardList(userId).then(({ data }) =>
      commit('readBoardList', data),
    );
  },
};

export default actions;
