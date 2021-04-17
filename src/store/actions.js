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
  readInvitedBoardAPI,
  readBoardDetailAPI,
  createBoardAPI,
  updateBoardAPI,
  deleteBoardAPI,
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
import { readBoardByHashtagAPI } from '@/api/hashtag';
import {
  readIsInviteUserForModalAPI,
  readInvitedUserForBoardPageAPI,
  signoutAPI,
  readUserAPI,
  updateUserAPI,
  changePasswordAPI,
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
    // 에러처리 BoardPage.vue
    return readInvitedUserForBoardPageAPI(userList);
  },
  SIGNOUT({ commit }, password) {
    // 에러처리 : SignoutUser.vue
    return signoutAPI(password).then(() => {
      commit('logout');
    });
  },
  READ_USER({ commit }, userId) {
    return readUserAPI(userId)
      .then(({ data }) => {
        commit('setUser', data.data);
      })
      .catch(error => {
        console.log(error);
        alert('유저 정보를 읽어오지 못했습니다.');
      });
  },
  async UPDATE_USER({ dispatch, state }, updateUserInfo) {
    try {
      await updateUserAPI(updateUserInfo);
      await dispatch('READ_USER', state.user.id);
    } catch (error) {
      console.log(error);
      alert('유저정보 수정 실패');
    }
  },
  CHANGE_PASSWORD({ dispatch, state }, changePasswordInfo) {
    // 에러처리 : PasswordChange.vue
    return changePasswordAPI(changePasswordInfo).then(() => {
      dispatch('READ_USER', state.user.id);
    });
  },

  // board
  READ_PERSONAL_BOARD(_, lastCreatedAt) {
    // 에러처리 : PersonalSection.vue
    return readPersonalBoardAPI(lastCreatedAt);
  },
  // personal 탭에서 Recently Viewed와 My Boards의
  // 좋아요 표시 연동 때문에 READ_PERSONAL_BOARD_LIMIT_COUNT 액션이 필요함.
  READ_PERSONAL_BOARD_LIMIT_COUNT({ commit, dispatch, state }, count) {
    readPersonalBoardLimitCountAPI(count)
      .then(({ data }) => {
        commit('readPersonalBoardLimitCount', data.data);
        if (state.user.recentBoard !== null) {
          dispatch('READ_RECENT_BOARD', JSON.parse(state.user.recentBoard));
        }
      })
      .catch(error => {
        console.log(error);
        alert('Board 리렌더링 실패');
      });
  },
  READ_RECENT_BOARD({ commit }, recentLists) {
    return readRecentBoardAPI(recentLists)
      .then(({ data }) => {
        commit('setRecentBoard', data.data);
      })
      .catch(error => {
        console.log(error);
        alert('최근 Board 정보를 가져오지 못했습니다.');
      });
  },
  READ_INVITED_BOARD({ commit }, invitedLists) {
    return readInvitedBoardAPI(invitedLists)
      .then(({ data }) => {
        commit('setInvitedBoard', data.data);
      })
      .catch(error => {
        console.log(error);
        alert('초대된 Board 목록을 가져오지 못했습니다.');
      });
  },
  READ_BOARD_DETAIL({ commit }, boardId) {
    return readBoardDetailAPI(boardId)
      .then(({ data }) => {
        commit('setBoardDetail', data.data);
      })
      .catch(error => {
        console.log(error);
        alert('해당 보드 정보를 가져오지 못했습니다.');
        router.push('/main');
      });
  },
  CREATE_BOARD(_, createBoardInfo) {
    return createBoardAPI(createBoardInfo).catch(error => {
      console.log(error);
      alert('보드 생성 실패');
    });
  },
  UPDATE_BOARD(
    { dispatch, state },
    { id, title, bgColor, invitedUser, hashtag, publicYn },
  ) {
    return updateBoardAPI(id, {
      title,
      bgColor,
      invitedUser,
      hashtag,
      publicYn,
    })
      .then(({ data }) => {
        if (data.data.invitedUser) {
          return;
        }
        dispatch('READ_BOARD_DETAIL', state.board.id);
      })
      .catch(error => {
        console.log(error);
        alert('보드 정보를 업데이트 하지 못했습니다.');
      });
  },
  DELETE_BOARD(_, { id }) {
    return deleteBoardAPI(id).catch(error => {
      console.log(error);
      alert('해당 Board를 삭제하지 못했습니다.');
    });
  },
  READ_BOARD_FOR_ACCEPT_MESSAGE(_, boardId) {
    return readBoardForAcceptMessageAPI(boardId).catch(error => {
      console.log(error);
      alert('보드 정보를 가져오지 못했습니다.');
    });
  },

  // list
  CREATE_LIST({ dispatch, state }, createListInfo) {
    return createListAPI(createListInfo)
      .then(() => {
        dispatch('READ_BOARD_DETAIL', state.board.id);
      })
      .catch(error => {
        console.log(error);
        alert('리스트를 생성하지 못했습니다.');
      });
  },
  UPDATE_LIST({ dispatch, state }, { id, pos, title }) {
    return updateListAPI(id, { pos, title })
      .then(() => {
        dispatch('READ_BOARD_DETAIL', state.board.id);
      })
      .catch(error => {
        console.log(error);
        alert('리스트를 수정하지 못했습니다.');
      });
  },
  DELETE_LIST({ dispatch, state }, { id }) {
    return deleteListAPI(id)
      .then(() => {
        dispatch('READ_BOARD_DETAIL', state.board.id);
      })
      .catch(error => {
        console.log(error);
        alert('리스트를 삭제하지 못했습니다.');
      });
  },

  // card
  CREATE_CARD({ dispatch, state }, createCardInfo) {
    return createCardAPI(createCardInfo)
      .then(() => {
        dispatch('READ_BOARD_DETAIL', state.board.id);
      })
      .catch(error => {
        console.log(error);
        alert('카드를 생성하지 못했습니다.');
      });
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
  DELETE_CARD({ dispatch, state }, { id }) {
    return deleteCardAPI(id)
      .then(() => {
        dispatch('READ_BOARD_DETAIL', state.board.id);
      })
      .catch(error => {
        console.log(error);
        alert('카드를 삭제하지 못했습니다.');
      });
  },

  // pushMessage
  READ_PUSH_MESSAGE({ commit }, targetId) {
    return readPushMessageAPI(targetId)
      .then(({ data }) => {
        commit('setPushMessage', data.data);
      })
      .catch(error => {
        console.log(error);
        alert('푸시 메세지를 읽어오지 못했습니다.');
      });
  },
  UPDATE_PUSH_MESSAGE({ dispatch, state }, updateMessageInfo) {
    return updatePushMessageAPI(updateMessageInfo)
      .then(() => {
        dispatch('READ_PUSH_MESSAGE', state.user.id);
      })
      .catch(error => {
        console.log(error);
        alert('푸시 메세지를 수정하지 못했습니다.');
      });
  },
  DELETE_PUSH_MESSAGE({ dispatch, state }, { id }) {
    return deletePushMessageAPI(id)
      .then(() => {
        dispatch('READ_PUSH_MESSAGE', state.user.id);
      })
      .catch(error => {
        console.log(error);
        alert('푸시 메세지를 삭제하지 못했습니다.');
      });
  },

  // upload
  READ_FILE({ commit, state, dispatch }, cardId) {
    return readFileAPI(cardId)
      .then(({ data }) => {
        commit('setFile', data.data);
        dispatch('READ_BOARD_DETAIL', state.board.id);
      })
      .catch(error => {
        console.log(error);
        alert('파일을 읽어오지 못했습니다.');
      });
  },
  UPLOAD({ dispatch, state }, formData) {
    return uploadFileAPI(formData)
      .then(({ data }) => {
        if (data !== 'FAIL') {
          setTimeout(() => {
            bus.$emit('end:spinner');
            dispatch('READ_FILE', state.card.id);
          }, 1500);
        } else {
          bus.$emit('end:spinner');
          alert('파일 업로드가 실패했습니다.');
        }
      })
      .catch(error => {
        console.log(error);
        bus.$emit('end:spinner');
        alert('알 수 없는 오류가 발생했습니다.');
      });
  },
  UPLOAD_IMAGE({ dispatch, state }, imageData) {
    return uploadImageAPI(imageData)
      .then(({ data }) => {
        if (data !== 'FAIL') {
          setTimeout(() => {
            bus.$emit('end:spinner');
            dispatch('READ_USER', state.user.id);
          }, 1500);
        } else {
          bus.$emit('end:spinner');
          alert('사진 업로드가 실패했습니다.');
        }
      })
      .catch(error => {
        console.log(error);
        bus.$emit('end:spinner');
        alert('알 수 없는 오류가 발생했습니다.');
      });
  },
  DELETE_FILE({ dispatch, state }, fileId) {
    return deleteFileAPI(fileId)
      .then(() => {
        dispatch('READ_FILE', state.card.id);
        dispatch('READ_BOARD_DETAIL', state.board.id);
      })
      .catch(error => {
        console.log(error);
        alert('파일을 삭제하는데 실패했습니다.');
      });
  },

  // like
  CREATE_LIKE({ dispatch, state }, likeInfo) {
    return createLikeAPI(likeInfo)
      .then(() => {
        if (getSessionStorage('mainTabId') === 0) {
          dispatch(
            'READ_PERSONAL_BOARD_LIMIT_COUNT',
            state.personalBoard.length,
          );
        }
      })
      .catch(error => {
        console.log(error);
        alert('좋아요를 추가하는데 실패했습니다.');
      });
  },
  DELETE_LIKE({ dispatch, state }, { boardId, likeCount }) {
    return deleteLikeAPI({ boardId, likeCount })
      .then(() => {
        if (getSessionStorage('mainTabId') === 0) {
          dispatch(
            'READ_PERSONAL_BOARD_LIMIT_COUNT',
            state.personalBoard.length,
          );
        }
      })
      .catch(error => {
        console.log(error);
        alert('좋아요를 삭제하는데 실패했습니다.');
      });
  },

  // hashtag
  READ_BOARD_BY_HASHTAG(_, hashtagBoardInfo) {
    // 에러처리 : PublicSection.vue
    return readBoardByHashtagAPI(hashtagBoardInfo);
  },
};

export default actions;
