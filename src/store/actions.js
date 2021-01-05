import authApi from '@/api/auth';
import boardApi from '@/api/board';
import listApi from '@/api/list';
import cardApi from '@/api/card';
import checklistApi from '@/api/checklist';

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
  READ_USER(_, userId) {
    return authApi.readUser(userId);
  },

  // board
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
  DELETE_BOARD(_, { id }) {
    return boardApi.deleteBoard(id);
  },

  // list
  CREATE_LIST({ dispatch, state }, { title, boardId, pos }) {
    return listApi.createList({ title, boardId, pos }).then(() => {
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

  // card
  CREATE_CARD({ dispatch, state }, { title, listId, pos }) {
    return cardApi.createCard({ title, listId, pos }).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
  async READ_CARD({ dispatch, commit }, { id }) {
    const { data } = await cardApi.readCard(id);
    await commit('setCard', data.data);
  },
  async UPDATE_CARD(
    { dispatch, state },
    { id, title, pos, description, labelColor, location, listId },
  ) {
    await cardApi.updateCard(id, {
      title,
      pos,
      description,
      labelColor,
      location,
      listId,
    });
    // CardModal의 listTitle을 불러오기위해 동기 형식 택함.
    await dispatch('READ_BOARD_DETAIL', state.board.id);
    await dispatch('READ_CARD', { id });
  },
  DELETE_CARD({ dispatch, state }, { id }) {
    return cardApi.deleteCard(id).then(() => {
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },

  // checklist
  CREATE_CHECKLIST({ dispatch, state }, { title, cardId }) {
    return checklistApi.createChecklist({ title, cardId }).then(() => {
      dispatch('READ_CARD', { id: state.card.id });
    });
  },
  async READ_CHECKLIST({ dispatch, commit }, { id }) {
    const { data } = await checklistApi.readChecklist(id);
    console.log(data.data);
    await commit('setChecklists', data.data);
  },
  async UPDATE_CHECKLIST({ dispatch, state }, { id, title }) {
    await checklistApi.updateChecklist(id, { title });
    await dispatch('READ_CHECKLIST', { id: state.card.id });
  },
  DELETE_CHECKLIST({ dispatch, state }, { id }) {
    return checklistApi.deleteChecklist(id).then(() => {
      dispatch('READ_CHECKLIST', { id: state.card.id });
    });
  },
};

export default actions;
