import {
  saveUserToLocalStorage,
  deleteUserLocalStorage,
} from '@/utils/webStorage';

const mutations = {
  // user
  setUser(state, user) {
    saveUserToLocalStorage(user);
    state.user = user;
  },
  logout(state) {
    state.user = {};
    deleteUserLocalStorage();
  },

  // board
  setBoardList(state, boardList) {
    state.boardList = boardList;
  },
  setBoardDetail(state, board) {
    state.board = board;
  },
  setTheme(state, bgColor) {
    state.bgColor = bgColor ? bgColor : 'rgb(0, 121, 191);';
  },

  // card
  setCard(state, card) {
    state.card = card;
  },

  // checklist
  setChecklists(state, checklists) {
    state.checklists = checklists;
  },
};

export default mutations;
