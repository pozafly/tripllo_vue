import { loginUser, validId, signup, apiSocialLogin } from '@/api/auth';
import { readBoardList } from '@/api/board';

const actions = {
  // 로그인
  async LOGIN({ commit }, userData) {
    console.log(userData);
    const { data } = await loginUser(userData);
    console.log('로그인 시도한다.');
    console.log(data);
    commit('setUser', data.data);
  },
  SOCIAL_LOGIN(_, userId) {
    return apiSocialLogin(userId);
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
      console.log(data);
      commit('readBoardList', data);
    });
  },
};

export default actions;
