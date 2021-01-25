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
  setBoardList(state, boardList) {
    saveSessionStorage('boardList', boardList);
    state.boardList = boardList;
  },
  setRecentBoard(state, recentBoard) {
    state.recentBoard = recentBoard;
  },
  setInvitedBoard(state, invitedBoard) {
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
};

export default mutations;
