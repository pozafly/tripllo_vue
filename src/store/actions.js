import authApi from '@/api/auth';
import boardApi from '@/api/board';
import listApi from '@/api/list';
import cardApi from '@/api/card';

const actions = {
  // 로그인
  async LOGIN({ commit }, userData) {
    const { data } = await authApi.loginUser(userData);
    commit('setUser', data.data);
  },
  SOCIAL_LOGIN(_, userId) {
    return authApi.apiSocialLogin(userId);
  },
  async LOGOUT({ commit }) {
    await authApi.logoutUser();
    commit('logout');
  },

  // user
  async VALID_ID(_, userId) {
    console.log(userId);
    return await authApi.validId(userId);
  },
  async SIGNUP(_, userData) {
    return await authApi.signup(userData);
  },

  //board
  READ_BOARD_LIST({ commit }, userId) {
    return boardApi.readBoardList(userId).then(({ data }) => {
      commit('setBoardList', data.data);
    });
  },
  ADD_BOARD(_, title) {
    return boardApi.addBoard(title);
  },
  READ_BOARD_DETAIL({ commit }, boardId) {
    return boardApi.readBoardDetail(boardId).then(({ data }) => {
      commit('setBoardDetail', data.data);
    });
  },
  UPDATE_BOARD({ dispatch, state }, { id, title, bgColor }) {
    return boardApi.updateBoard(id, { title, bgColor }).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },

  //list
  CREATE_LIST({ dispatch, state }, { title, boardId }) {
    return listApi.createList({ title, boardId }).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
  UPDATE_LIST({ dispatch, state }, { id, pos, title }) {
    return listApi.updateList(id, { pos, title }).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
  DELETE_LIST({ dispatch, state }, { id }) {
    return listApi.deleteList(id).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },

  //card
  CREATE_CARD({ dispatch, state }, { title, listId, pos }) {
    return cardApi.createCard({ title, listId, pos }).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
  READ_CARD({ commit }, { id }) {
    return cardApi.readCard(id).then(({ data }) => {
      commit('setCard', data.data);
    });
  },
  DELETE_CARD({ dispatch, state }, { id }) {
    return cardApi.deleteCard(id).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
};

export default actions;
