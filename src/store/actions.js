import { loginUserAPI, logoutUserAPI } from '@/api/auth';
import {
  readPersonalBoardLimitCountAPI,
  readRecentBoardAPI,
  readBoardDetailAPI,
  createBoardAPI,
  updateBoardAPI,
} from '@/api/board';
import { createListAPI, updateListAPI, deleteListAPI } from '@/api/list';
import {
  createCardAPI,
  readCardAPI,
  updateCardAPI,
  deleteCardAPI,
} from '@/api/card';
import {
  readPushMessageAPI,
  updatePushMessageAPI,
  deletePushMessageAPI,
} from '@/api/pushMessage';
import { readFileAPI } from '@/api/upload';
import { signoutAPI, readUserAPI } from '@/api/user';

import router from '@/routes';

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
  async READ_PERSONAL_BOARD_LIMIT_COUNT({ commit, dispatch, state }, count) {
    try {
      const { data } = await readPersonalBoardLimitCountAPI(count);
      commit('readPersonalBoardLimitCount', data.data);
      if (state.user.recentBoard !== null) {
        dispatch('READ_RECENT_BOARD', JSON.parse(state.user.recentBoard));
      }
    } catch (error) {
      console.log(error);
      alert('Board 리렌더링 실패');
    }
  },
  async READ_RECENT_BOARD({ commit }, recentLists) {
    try {
      const { data } = await readRecentBoardAPI(recentLists);
      commit('setRecentBoard', data.data);
    } catch (error) {
      console.log(error);
      alert('최근 보드 정보를 가져오지 못했습니다.');
    }
  },
  async READ_BOARD_DETAIL({ commit }, boardId) {
    try {
      const { data } = await readBoardDetailAPI(boardId);
      commit('setBoardDetail', data.data);
    } catch (error) {
      console.log(error);
      alert('해당 보드 정보를 가져오지 못했습니다.');
      router.push('/main');
    }
  },
  async CREATE_BOARD(_, createBoardInfo) {
    try {
      const { data } = await createBoardAPI(createBoardInfo);
      return data;
    } catch (error) {
      console.log(error);
      alert('보드 생성 실패');
    }
  },
  async UPDATE_BOARD(
    { dispatch, state },
    { id, title, bgColor, invitedUser, hashtag, publicYn },
  ) {
    try {
      const { data } = await updateBoardAPI(id, {
        title,
        bgColor,
        invitedUser,
        hashtag,
        publicYn,
      });
      if (data.data.invitedUser) {
        return;
      }
      dispatch('READ_BOARD_DETAIL', state.board.id);
      return data;
    } catch (error) {
      console.log(error);
      alert('보드 정보를 업데이트 하지 못했습니다.');
    }
  },

  // list
  async CREATE_LIST({ dispatch, state }, createListInfo) {
    try {
      await createListAPI(createListInfo);
      dispatch('READ_BOARD_DETAIL', state.board.id);
    } catch (error) {
      console.log(error);
      alert('리스트를 생성하지 못했습니다.');
    }
  },
  async UPDATE_LIST({ dispatch, state }, { id, pos, title }) {
    try {
      await updateListAPI(id, { pos, title });
      dispatch('READ_BOARD_DETAIL', state.board.id);
    } catch (error) {
      console.log(error);
      alert('리스트를 수정하지 못했습니다.');
    }
  },
  async DELETE_LIST({ dispatch, state }, { id }) {
    try {
      await deleteListAPI(id);
      dispatch('READ_BOARD_DETAIL', state.board.id);
    } catch (error) {
      console.log(error);
      alert('리스트를 삭제하지 못했습니다.');
    }
  },

  // card
  async CREATE_CARD({ dispatch, state }, createCardInfo) {
    try {
      await createCardAPI(createCardInfo);
      dispatch('READ_BOARD_DETAIL', state.board.id);
    } catch (error) {
      console.log(error);
      alert('카드를 생성하지 못했습니다.');
    }
  },
  async READ_CARD({ commit }, { id }) {
    try {
      const { data } = await readCardAPI(id);
      await commit('setCard', data.data);
      return data.data;
    } catch (error) {
      console.log(error);
      alert('카드 정보를 가져오지 못했습니다.');
    }
  },
  async UPDATE_CARD(
    { dispatch, state },
    { id, title, pos, description, labelColor, location, dueDate, listId },
  ) {
    try {
      await updateCardAPI(id, {
        title,
        pos,
        description,
        labelColor,
        location,
        dueDate,
        listId,
      });
      await dispatch('READ_BOARD_DETAIL', state.board.id);
      await dispatch('READ_CARD', { id });
    } catch (error) {
      console.log(error);
      alert('카드 정보를 수정하지 못했습니다.');
    }
  },
  async DELETE_CARD({ dispatch, state }, { id }) {
    try {
      await deleteCardAPI(id);
      dispatch('READ_BOARD_DETAIL', state.board.id);
    } catch (error) {
      console.log(error);
      alert('카드를 삭제하지 못했습니다.');
    }
  },

  // pushMessage
  async READ_PUSH_MESSAGE({ commit }, targetId) {
    try {
      const { data } = await readPushMessageAPI(targetId);
      commit('setPushMessage', data.data);
    } catch (error) {
      console.log(error);
      alert('푸시 메세지를 읽어오지 못했습니다.');
    }
  },
  async UPDATE_PUSH_MESSAGE({ dispatch, state }, updateMessageInfo) {
    try {
      await updatePushMessageAPI(updateMessageInfo);
      dispatch('READ_PUSH_MESSAGE', state.user.id);
    } catch (error) {
      console.log(error);
      alert('푸시 메세지를 수정하지 못했습니다.');
    }
  },
  async DELETE_PUSH_MESSAGE({ dispatch, state }, { id }) {
    try {
      await deletePushMessageAPI(id);
      dispatch('READ_PUSH_MESSAGE', state.user.id);
    } catch (error) {
      console.log(error);
      alert('푸시 메세지를 삭제하지 못했습니다.');
    }
  },

  // upload
  async READ_FILE({ commit }, cardId) {
    const { data } = await readFileAPI(cardId);
    commit('setFile', data.data);
  },
};

export default actions;
