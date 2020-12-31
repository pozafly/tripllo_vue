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

  // card
  setCard(state, card) {
    state.card = card;
  },
};

export default mutations;
