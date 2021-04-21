import {
  saveUserToLocalStorage,
  saveSessionStorage,
  saveTokenToLocalStorage,
} from '@/utils/webStorage';

const mutations = {
  // user
  setUser(state, user) {
    saveUserToLocalStorage(user);
    state.user = user;
  },
  setUserToken(state, token) {
    saveSessionStorage('mainTabId', 0);
    saveTokenToLocalStorage(token);
    state.token = token;
  },
  logout(state) {
    state.user = {};
    localStorage.clear();
    sessionStorage.clear();
  },

  // board
  pushPersonalBoard(state, data) {
    state.personalBoard = state.personalBoard.concat(data);
  },
  resetPersonalBoard(state) {
    state.personalBoard = [];
  },
  readPersonalBoardLimitCount(state, data) {
    state.personalBoard = data;
  },
  setRecentBoard(state, recentBoard) {
    saveSessionStorage('recentBoard', recentBoard);
    state.recentBoard = recentBoard;
  },
  setBoardDetail(state, board) {
    saveSessionStorage('board', board);
    state.board = board;
  },
  setTheme(state, bgColor) {
    saveSessionStorage('bgColor', bgColor);
    state.bgColor = bgColor ? bgColor : 'rgb(0, 121, 191);';
  },

  // card
  setCard(state, card) {
    saveSessionStorage('card', card);
    state.card = card;
  },

  // pushMessage
  setPushMessage(state, pushMessage) {
    saveSessionStorage('pushMessage', pushMessage);
    state.pushMessage = pushMessage;
  },
  deletePushMessage(state) {
    state.pushMessage = '';
  },

  // file upload
  setFile(state, file) {
    state.file = file;
  },
  deleteFile(state) {
    state.file = [];
  },
};

export default mutations;
