import {
  saveAuthToLocalStorage,
  saveUserToLocalStorage,
  savePictureToLocalStorage,
  deleteLocalStorage,
} from '@/utils/webStorage';

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
  setUserPicture(state, user_picture) {
    savePictureToLocalStorage(user_picture);
    state.user_picture = user_picture;
  },
  logout(state) {
    state.user_name = '';
    state.user_token = '';
    state.user_picture = '';
    deleteLocalStorage('user_token');
    deleteLocalStorage('user_name');
    deleteLocalStorage('user_picture');
  },

  // board
  readBoardList(state, boardList) {
    state.boardList = boardList;
  },
};

export default mutations;
