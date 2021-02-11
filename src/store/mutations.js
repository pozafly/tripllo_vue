import {
  saveUserToLocalStorage,
  saveUserToken,
  clearStorage,
  saveSessionStorage,
  deleteSessionStorage,
} from '@/utils/webStorage';

const mutations = {
  // user
  setUser(state, user) {
    saveUserToLocalStorage(user);
    state.user = user;
  },
  setUserToken(state, token) {
    saveUserToken(token);
    state.token = token;
  },
  logout(state) {
    state.user = {};
    clearStorage();
  },

  // board
  setIsInfinity(state, value) {
    state.isInfinity = value;
  },
  pushPersonalBoard(state, data) {
    state.personalBoard = state.personalBoard.concat(data);
  },
  resetPersonalBoard(state) {
    state.personalBoard = [];
    state.isInfinity = 'Y';
  },
  rerenderBoard(state, data) {
    state.personalBoard = data;
  },
  setRecentBoard(state, recentBoard) {
    saveSessionStorage('recentBoard', recentBoard);
    state.recentBoard = recentBoard;
  },
  setInvitedBoard(state, invitedBoard) {
    saveSessionStorage('invitedBoard', invitedBoard);
    state.invitedBoard = invitedBoard;
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

  // checklist
  setChecklists(state, checklists) {
    saveSessionStorage('checklists', checklists);
    state.checklists = checklists;
  },
  deleteChecklists(state) {
    deleteSessionStorage('checklists');
    state.checklists = {};
  },

  // comment
  setComment(state, comment) {
    state.comment = comment;
  },
  deleteComment(state) {
    state.comment = {};
  },

  // socket
  setSocket(state, socket) {
    state.socket = socket;
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

  // main tap
  setMainTabId(state, value) {
    state.mainTabId = value;
  },

  // hashtagByBoard
  setHashtagBoards(state, boards) {
    state.hashtagBoards = boards;
  },
  deleteHashtagBoards(state) {
    state.hashtagBoards = [];
  },
};

export default mutations;
