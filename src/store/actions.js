import authApi from '@/api/auth';
import boardApi from '@/api/board';
import listApi from '@/api/list';
import cardApi from '@/api/card';
import checklistApi from '@/api/checklist';
import checklistItemApi from '@/api/checklistItem';
import commentApi from '@/api/comment';
import pushMessageApi from '@/api/pushMessage';
import uploadApi from '@/api/upload';
import emailApi from '@/api/email';
import boardHasLikeApi from '@/api/boardHasLike';
import router from '@/routes';
import bus from '@/utils/bus';
import hashtagApi from '../api/hashtag';
import { board } from '../api';

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
  READ_IS_INVITE_USER(_, userId) {
    return authApi.readIsInviteUser(userId);
  },
  READ_INVITED_USER(_, userList) {
    return authApi.readInvitedUser(userList);
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
  async UPDATE_USER(
    { dispatch, state },
    { id, email, name, password, bio, picture, recentBoard, invitedBoard },
  ) {
    await authApi.updateUser({
      id,
      email,
      name,
      password,
      bio,
      picture,
      recentBoard,
      invitedBoard,
    });
    await dispatch('READ_USER', state.user.id);
  },
  CHANGE_PASSWORD({ dispatch, state }, { currentPw, newPw }) {
    return authApi.changePassword({ currentPw, newPw }).then(() => {
      dispatch('READ_USER', state.user.id);
      bus.$emit('end:spinner');
    });
  },

  // board
  READ_BOARD_ONE(_, { boardId }) {
    return boardApi.readBoardOne({ boardId });
  },
  READ_PERSONAL_BOARD_LIST({ commit }, { lastCreatedAt }) {
    return boardApi
      .readPersonalBoardList({ lastCreatedAt })
      .then(({ data }) => {
        if (data.data === null) {
          commit('setIsInfinity', 'N');
          return;
        }
        commit('setPersonalBoardList', data.data);
      });
  },
  READ_RECENT_BOARD_LIST({ commit }, { recentLists }) {
    return boardApi.readRecentBoardList({ recentLists }).then(({ data }) => {
      commit('setRecentBoard', data.data);
    });
  },
  READ_INVITED_BOARD_LIST({ commit }, { invitedLists }) {
    return boardApi.readInvitedBoardList({ invitedLists }).then(({ data }) => {
      commit('setInvitedBoard', data.data);
    });
  },

  READ_BOARD_DETAIL({ commit }, boardId) {
    return boardApi
      .readBoardDetail(boardId)
      .then(({ data }) => {
        commit('setBoardDetail', data.data);
      })
      .catch(({ response }) => {
        if (response.data.status === 'BAD_REQUEST') {
          alert('해당 보드가 없습니다.');
          router.push('/main');
        }
      });
  },
  CREATE_BOARD(_, { title, publicYn, hashtag, bgColor }) {
    return boardApi.createBoard({ title, publicYn, hashtag, bgColor });
  },
  UPDATE_BOARD(
    { dispatch, state },
    { id, title, bgColor, invitedUser, hashtag, publicYn },
  ) {
    return boardApi
      .updateBoard(id, { title, bgColor, invitedUser, hashtag, publicYn })
      .then(({ data }) => {
        if (data.data.invitedUser) return;
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
  CREATE_COMMENT(
    { dispatch, state },
    { cardId, userId, comment, dept, groupNum },
  ) {
    return commentApi
      .createComment({ cardId, userId, comment, dept, groupNum })
      .then(() => {
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
  UPDATE_PUSH_MESSAGE({ dispatch, state }, { id, isRead }) {
    return pushMessageApi.updatePushMessage({ id, isRead }).then(() => {
      dispatch('READ_PUSH_MESSAGE', state.user.id);
    });
  },
  DELETE_PUSH_MESSAGE({ dispatch, state }, { id }) {
    return pushMessageApi.deletePushMessage(id).then(() => {
      dispatch('READ_PUSH_MESSAGE', state.user.id);
    });
  },

  // upload
  READ_FILE({ commit, state, dispatch }, cardId) {
    return uploadApi.readFile(cardId).then(({ data }) => {
      commit('setFile', data.data);
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },
  UPLOAD({ dispatch, state }, formData) {
    return uploadApi.upload(formData).then(({ data }) => {
      if (data !== 'FAIL') {
        setTimeout(() => {
          bus.$emit('end:spinner');
          dispatch('READ_FILE', state.card.id);
        }, 1500);
      } else {
        bus.$emit('end:spinner');
        alert('파일 업로드가 실패했습니다.');
      }
    });
  },
  UPLOAD_IMAGE({ dispatch, state }, imageData) {
    return uploadApi.uploadImage(imageData).then(({ data }) => {
      if (data !== 'FAIL') {
        setTimeout(() => {
          bus.$emit('end:spinner');
          dispatch('READ_USER', state.user.id);
        }, 1500);
      } else {
        bus.$emit('end:spinner');
        alert('사진 업로드가 실패했습니다.');
      }
    });
  },
  DELETE_FILE({ dispatch, state }, fileId) {
    return uploadApi.deleteFile(fileId).then(() => {
      dispatch('READ_FILE', state.card.id);
      dispatch('READ_BOARD_DETAIL', state.board.id);
    });
  },

  // email
  SEND_EMAIL(_, { userId, userEmail }) {
    return emailApi
      .sendEmail({ userId, userEmail })
      .then(data => {
        bus.$emit('end:spinner');
        alert(data.data.message);
      })
      .catch(({ response }) => {
        bus.$emit('end:spinner');
        alert(response.data.message);
      });
  },

  // like
  CREATE_LIKE({ dispatch, state }, { boardId, likeCount }) {
    return boardHasLikeApi
      .createBoardHasLike({ boardId, likeCount })
      .then(() => {
        dispatch('READ_PERSONAL_BOARD_LIST', {
          // recentLists: JSON.parse(state.user.recentBoard),
          // invitedLists: JSON.parse(state.user.invitedBoard),
        });
      });
  },
  DELETE_LIKE({ dispatch, state }, { boardId, likeCount }) {
    return boardHasLikeApi
      .deleteBoardHasLike({ boardId, likeCount })
      .then(() => {
        dispatch('READ_PERSONAL_BOARD_LIST', {
          // recentLists: JSON.parse(state.user.recentBoard),
          // invitedLists: JSON.parse(state.user.invitedBoard),
        });
      });
  },

  // hashtag
  READ_BOARD_BY_HASHTAG({ commit }, hashtagName) {
    return hashtagApi.readBoardByHashtag(hashtagName).then(({ data }) => {
      commit('setHashtagBoards', data.data);
    });
  },
};

export default actions;
