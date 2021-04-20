import {
  loginUserAPI,
  socialLoginAPI,
  logoutUserAPI,
  signupAPI,
  validIdAPI,
} from '@/api/auth';
import {
  readPersonalBoardAPI,
  readPersonalBoardLimitCountAPI,
  readRecentBoardAPI,
  readBoardDetailAPI,
  createBoardAPI,
  updateBoardAPI,
  readBoardForAcceptMessageAPI,
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
import {
  readFileAPI,
  uploadFileAPI,
  uploadImageAPI,
  deleteFileAPI,
} from '@/api/upload';
import { createLikeAPI, deleteLikeAPI } from '@/api/like';
import {
  readIsInviteUserForModalAPI,
  readInvitedUserForBoardPageAPI,
  signoutAPI,
  readUserAPI,
  updateUserAPI,
} from '@/api/user';

import router from '@/routes';
import bus from '@/utils/bus';
import { getSessionStorage } from '@/utils/webStorage';

const actions = {
  // auth
  async LOGIN({ commit }, loginData) {
    // 에러처리 : LoginForm.vue, SignupForm.vue
    const { data } = await loginUserAPI(loginData);
    commit('setUserToken', data.data.token);
    commit('setUser', data.data);
  },
  SOCIAL_LOGIN(_, userId) {
    // 에러처리 : utils/social/index.js
    return socialLoginAPI(userId);
  },
  async LOGOUT({ commit }) {
    try {
      await logoutUserAPI();
      commit('logout');
    } catch (error) {
      console.log(error);
      alert('로그아웃 실패');
    }
  },
  SIGNUP(_, userData) {
    // 에러처리 SignupForm.vue
    return signupAPI(userData);
  },
  VALID_ID(_, userId) {
    // 에러처리 : SignupForm.vue
    return validIdAPI(userId);
  },

  // user
  READ_IS_INVITE_USER_FOR_INVITE_MODAL(_, userId) {
    // 에러처리 :InviteModal.vue
    return readIsInviteUserForModalAPI(userId);
  },
  READ_INVITED_USER_FOR_BOARD_PAGE(_, userList) {
    // 에러처리 BoardHeader.vue
    return readInvitedUserForBoardPageAPI(userList);
  },
  async SIGNOUT({ commit }, password) {
    try {
      await signoutAPI(password);
      commit('logout');
    } catch (error) {
      alert('회원이 탈퇴되지 않았습니다.');
      console.log(error);
    }
  },
  async READ_USER({ commit }, userId) {
    try {
      const { data } = await readUserAPI(userId);
      commit('setUser', data.data);
    } catch (error) {
      console.log(error);
      alert('유저 정보를 읽어오지 못했습니다.');
    }
  },
  async UPDATE_USER({ dispatch, state }, updateUserInfo) {
    try {
      await updateUserAPI(updateUserInfo);
      dispatch('READ_USER', state.user.id);
    } catch (error) {
      console.log(error);
      alert('유저정보 수정 실패');
    }
  },

  // board
  READ_PERSONAL_BOARD(_, lastCreatedAt) {
    // 에러처리 : PersonalSection.vue
    return readPersonalBoardAPI(lastCreatedAt);
  },
  // personal 탭에서 Recently Viewed와 My Boards의
  // 좋아요 표시 연동 때문에 READ_PERSONAL_BOARD_LIMIT_COUNT 액션이 필요함.
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
      console.log(1);
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
  async READ_BOARD_FOR_ACCEPT_MESSAGE(_, boardId) {
    try {
      const { data } = await readBoardForAcceptMessageAPI(boardId);
      return data;
    } catch (error) {
      console.log(error);
      alert('보드 정보를 가져오지 못했습니다.');
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
  async READ_FILE({ commit, state, dispatch }, cardId) {
    try {
      const { data } = await readFileAPI(cardId);
      commit('setFile', data.data);
      dispatch('READ_BOARD_DETAIL', state.board.id);
    } catch (error) {
      console.log(error);
      alert('파일을 읽어오지 못했습니다.');
    }
  },
  async UPLOAD({ dispatch, state }, formData) {
    try {
      const { data } = await uploadFileAPI(formData);
      if (data !== 'FAIL') {
        setTimeout(() => {
          bus.$emit('end:spinner');
          dispatch('READ_FILE', state.card.id);
        }, 1500);
      } else {
        bus.$emit('end:spinner');
        alert('파일 업로드가 실패했습니다.');
      }
    } catch (error) {
      console.log(error);
      bus.$emit('end:spinner');
      alert('알 수 없는 오류가 발생했습니다.');
    }
  },
  async UPLOAD_IMAGE({ dispatch, state }, imageData) {
    try {
      const { data } = await uploadImageAPI(imageData);
      if (data !== 'FAIL') {
        setTimeout(() => {
          bus.$emit('end:spinner');
          dispatch('READ_USER', state.user.id);
        }, 1500);
      } else {
        bus.$emit('end:spinner');
        alert('사진 업로드가 실패했습니다.');
      }
    } catch (error) {
      console.log(error);
      bus.$emit('end:spinner');
      alert('알 수 없는 오류가 발생했습니다.');
    }
  },
  async DELETE_FILE({ dispatch, state }, fileId) {
    try {
      await deleteFileAPI(fileId);
      dispatch('READ_FILE', state.card.id);
      dispatch('READ_BOARD_DETAIL', state.board.id);
    } catch (error) {
      console.log(error);
      alert('파일을 삭제하는데 실패했습니다.');
    }
  },

  // like
  async CREATE_LIKE({ dispatch, state }, likeInfo) {
    try {
      await createLikeAPI(likeInfo);
      if (getSessionStorage('mainTabId') === 0) {
        dispatch('READ_PERSONAL_BOARD_LIMIT_COUNT', state.personalBoard.length);
      }
    } catch (error) {
      console.log(error);
      alert('좋아요를 추가하는데 실패했습니다.');
    }
  },
  async DELETE_LIKE({ dispatch, state }, { boardId, likeCount }) {
    try {
      await deleteLikeAPI({ boardId, likeCount });
      if (getSessionStorage('mainTabId') === 0) {
        dispatch('READ_PERSONAL_BOARD_LIMIT_COUNT', state.personalBoard.length);
      }
    } catch (error) {
      console.log(error);
      alert('좋아요를 삭제하는데 실패했습니다.');
    }
  },
};

export default actions;
