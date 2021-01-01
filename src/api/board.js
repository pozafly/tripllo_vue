import { board } from '@/api';

const boardApi = {
  readBoardList(userId) {
    return board.get(userId);
  },

  addBoard(title) {
    return board.post('/', { title });
  },

  readBoardDetail(boardId) {
    return board.get(`detail/${boardId}`);
  },

  updateBoard(id, payload) {
    return board.put(`/${id}`, payload);
  },

  deleteBoard(id) {
    return board.delete(`/${id}`);
  },
};

export default boardApi;
