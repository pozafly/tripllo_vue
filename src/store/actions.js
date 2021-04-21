import { loginUserAPI, logoutUserAPI } from '@/api/auth';
import {
  readPersonalBoardLimitCountAPI,
  readRecentBoardAPI,
  readBoardDetailAPI,
} from '@/api/board';
import { readCardAPI } from '@/api/card';
import { readPushMessageAPI } from '@/api/pushMessage';
import { readFileAPI } from '@/api/upload';
import { signoutAPI, readUserAPI } from '@/api/user';

const actions = {
  // auth
  async LOGIN({ commit }, loginData) {
    const { data } = await loginUserAPI(loginData);
    commit('setUserToken', data.data.token);
    commit('setUser', data.data);
  },
  LOGOUT({ commit }) {
    logoutUserAPI();
    commit('logout');
  },

  // user
  SIGNOUT({ commit }, password) {
    signoutAPI(password);
    commit('logout');
  },
  async READ_USER({ commit }, userId) {
    const { data } = await readUserAPI(userId);
    commit('setUser', data.data);
  },

  // board
  /* personal 탭에서 Recently Viewed와 My Boards의
     좋아요 표시 연동 때문에 READ_PERSONAL_BOARD_LIMIT_COUNT 액션이 필요함. */
  async READ_PERSONAL_BOARD_LIMIT_COUNT({ commit }, count) {
    const { data } = await readPersonalBoardLimitCountAPI(count);
    commit('readPersonalBoardLimitCount', data.data);
  },
  async READ_RECENT_BOARD({ commit }, recentLists) {
    const { data } = await readRecentBoardAPI(recentLists);
    commit('setRecentBoard', data.data);
  },
  async READ_BOARD_DETAIL({ commit }, boardId) {
    const { data } = await readBoardDetailAPI(boardId);
    commit('setBoardDetail', data.data);
  },

  // card
  async READ_CARD({ commit }, id) {
    const { data } = await readCardAPI(id);
    await commit('setCard', data.data);
    return data.data;
  },

  // pushMessage
  async READ_PUSH_MESSAGE({ commit }, targetId) {
    const { data } = await readPushMessageAPI(targetId);
    commit('setPushMessage', data.data);
  },

  // upload
  async READ_FILE({ commit }, cardId) {
    const { data } = await readFileAPI(cardId);
    commit('setFile', data.data);
  },
  DELETE_FILE_FROM_STATE({ commit }) {
    commit('deleteFile');
  },
};

export default actions;
