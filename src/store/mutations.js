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
  readBoardList(state, boardList) {
    state.boardList = boardList;
  },
  readBoardDetail(state, board) {
    state.board = board;
  },
};

export default mutations;
