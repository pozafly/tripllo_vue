import {
  saveAuthToLocalStorage,
  saveUserToLocalStorage,
} from '@/utils/localStorage';

const mutations = {
  setToken(state, user_token) {
    saveAuthToLocalStorage(user_token);
    state.user_token = user_token;
  },
  setUsername(state, user_name) {
    saveUserToLocalStorage(user_name);
    state.user_name = user_name;
  },
  clearUsername(state) {
    state.user_name = '';
  },
  clearToken(state) {
    state.user_token = '';
  },
  readBoardList(state, boardList) {
    state.boardList = boardList;
  },
};

export default mutations;
