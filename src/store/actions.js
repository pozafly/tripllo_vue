import {
  loginUser,
  validId,
  signup,
  apiSocialLogin,
  logoutUser,
} from '@/api/auth';
import {
  readBoardList,
  addBoard,
  readBoardDetail,
  updateBoard,
} from '@/api/board';
import { createList, updateList, deleteList } from '@/api/list';
import { createCard, deleteCard } from '@/api/card';

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
      commit('readBoardList', data.data);
    });
  },
  ADD_BOARD(ctx, title) {
    return addBoard(title);
  },
  READ_BOARD_DETAIL({ commit }, boardId) {
    return readBoardDetail(boardId).then(({ data }) => {
      commit('readBoardDetail', data.data);
    });
  },
  UPDATE_BOARD({ dispatch, state }, { id, title, bgColor }) {
    return updateBoard(id, { title, bgColor }).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },

  //list
  CREATE_LIST({ dispatch, state }, { title, boardId }) {
    return createList({ title, boardId }).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
  UPDATE_LIST({ dispatch, state }, { id, pos, title }) {
    return updateList(id, { pos, title }).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
  DELETE_LIST({ dispatch, state }, { id }) {
    return deleteList(id).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },

  //card
  CREATE_CARD({ dispatch, state }, { title, listId, pos }) {
    return createCard({ title, listId, pos }).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
  DELETE_CARD({ dispatch, state }, { id }) {
    return deleteCard(id).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
};

export default actions;
