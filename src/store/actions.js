import authApi from '@/api/auth';
import boardApi from '@/api/board';
import listApi from '@/api/list';
import cardApi from '@/api/card';
import checklistApi from '@/api/checklist';
import checklistItemApi from '@/api/checklistItem';
import commentApi from '@/api/comment';
import pushMessageApi from '@/api/pushMessage';

const actions = {
  // 로그인
  async LOGIN({ commit }, userData) {
    const { data } = await authApi.loginUser(userData);
    commit('setUserToken', data.data.token);
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
  READ_INVITE_USER(_, userId) {
    return authApi.readInviteUser(userId);
  },
  async SIGNUP(_, userData) {
    return await authApi.signup(userData);
  },
  SIGNOUT({ commit }, password) {
    return authApi.signout(password).then(() => {
      commit('logout');
    });
  },
  READ_USER({ commit }, userId) {
    return authApi.readUser(userId).then(({ data }) => {
      commit('setUser', data.data);
    });
  },
  READ_CREATED_USER(_, createdUser) {
    return authApi.readUser(createdUser);
  },
  async UPDATE_USER(
    { dispatch, state },
    { id, email, name, bio, picture, recent, favorite },
  ) {
    await authApi.updateUser({
      id,
      email,
      name,
      bio,
      picture,
      recent,
      favorite,
    });
    await dispatch('READ_USER', state.user.id);
  },

  // board
  READ_BOARD_LIST({ commit }, { userId, lists }) {
    return boardApi.readBoardList({ userId, lists }).then(({ data }) => {
      commit('setBoardList', data.data.boardList);
      commit('setRecentBoard', data.data.recentBoard);
    });
  },
  READ_BOARD_DETAIL({ commit }, boardId) {
    return boardApi.readBoardDetail(boardId).then(({ data }) => {
      commit('setBoardDetail', data.data);
    });
  },
  ADD_BOARD(_, title) {
    return boardApi.addBoard(title);
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
  async READ_CARD({ commit }, { id }) {
    const { data } = await cardApi.readCard(id);
    await commit('setCard', data.data);
    return data.data;
  },
  async UPDATE_CARD(
    { dispatch, state },
    { id, title, pos, description, labelColor, location, dueDate, listId },
  ) {
    await cardApi.updateCard(id, {
      title,
      pos,
      description,
      labelColor,
      location,
      dueDate,
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
    checklistApi.createChecklist({ title, cardId }).then(() => {
      dispatch('READ_CHECKLIST', { id: state.card.id });
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
  async READ_CHECKLIST({ commit }, { id }) {
    const { data } = await checklistApi.readChecklist(id);
    if (data.status === 'NOT_FOUND') {
      commit('deleteChecklists');
      return;
    }
    await commit('setChecklists', data.data);
  },
  async UPDATE_CHECKLIST({ dispatch, state }, { id, title }) {
    await checklistApi.updateChecklist(id, { title });
    await dispatch('READ_CHECKLIST', { id: state.card.id });
  },
  DELETE_CHECKLIST({ dispatch, state }, { checklistId, cardId }) {
    return checklistApi.deleteChecklist({ checklistId, cardId }).then(() => {
      dispatch('READ_CHECKLIST', { id: state.card.id });
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },

  // checklist item
  CREATE_CHECKLIST_ITEM({ dispatch, state }, { checklistId, item }) {
    return checklistItemApi
      .createChecklistItem({ checklistId, item })
      .then(() => {
        dispatch('READ_CHECKLIST', { id: state.card.id });
      });
  },
  UPDATE_CHECKLIST_ITEM(
    { dispatch, state },
    { checklistItemId, isChecked, item },
  ) {
    return checklistItemApi
      .updateChecklistItem(checklistItemId, { isChecked, item })
      .then(() => {
        dispatch('READ_CHECKLIST', { id: state.card.id });
      });
  },
  DELETE_CHECKLIST_ITEM({ dispatch, state }, { checklistItemId }) {
    return checklistItemApi
      .deleteChecklistItem({ checklistItemId })
      .then(() => {
        dispatch('READ_CHECKLIST', { id: state.card.id });
      });
  },

  // comment
  CREATE_COMMENT({ dispatch, state }, { cardId, userId, comment }) {
    return commentApi.createComment({ cardId, userId, comment }).then(() => {
      dispatch('READ_COMMENT', state.card.id);
    });
  },
  READ_COMMENT({ commit }, cardId) {
    return commentApi.readComment(cardId).then(({ data }) => {
      commit('setComment', data.data);
    });
  },
  UPDATE_COMMENT({ dispatch, state }, { id, userId, comment }) {
    return commentApi.updateComment({ id, userId, comment }).then(() => {
      dispatch('READ_COMMENT', state.card.id);
    });
  },
  DELETE_COMMENT({ dispatch, state }, id) {
    return commentApi.deleteComment(id).then(() => {
      dispatch('READ_COMMENT', state.card.id);
    });
  },

  // pushMessage
  READ_PUSH_MESSAGE({ commit }, targetId) {
    return pushMessageApi.readPushMessage(targetId).then(({ data }) => {
      commit('setPushMessage', data.data);
    });
  },
};

export default actions;
