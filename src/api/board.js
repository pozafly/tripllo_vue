import { board } from '@/api';

const boardApi = {
  readBoardList({ userId, lists }) {
    return board.get(`${userId}/${lists}`);
  },

  readBoardDetail(boardId) {
    return board.get(`detail/${boardId}`);
  },

  addBoard(title) {
    return board.post('/', { title });
  },

  updateBoard(id, payload) {
    return board.put(`/${id}`, payload);
  },

  deleteBoard(id) {
    return board.delete(`/${id}`);
  },
};

export default boardApi;
