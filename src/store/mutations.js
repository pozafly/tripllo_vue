import {
  saveAuthToLocalStorage,
  saveUserToLocalStorage,
  deleteLocalStorage,
} from '@/utils/localStorage';

const mutations = {
  // user
  setToken(state, user_token) {
    saveAuthToLocalStorage(user_token);
    state.user_token = user_token;
  },
  setUsername(state, user_name) {
    saveUserToLocalStorage(user_name);
    state.user_name = user_name;
  },
  logout(state) {
    state.user_name = '';
    state.user_token = '';
    deleteLocalStorage('user_token');
    deleteLocalStorage('user_name');
  },

  // board
  readBoardList(state, boardList) {
    state.boardList = boardList;
  },
};

export default mutations;
