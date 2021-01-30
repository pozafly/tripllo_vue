import { board } from '@/api';

const boardApi = {
  readBoardOne({ boardId }) {
    return board.get(`/${boardId}`);
  },

  readBoardList({ userId, recentLists }) {
    return board.get(`${userId}/${recentLists}`);
  },

  readBoardDetail(boardId) {
    return board.get(`detail/${boardId}`);
  },

  createBoard(title) {
    return board.post('/', { title });
  },

  updateBoard(id, { title, bgColor, invitedUser }) {
    return board.put(`/${id}`, { title, bgColor, invitedUser });
  },

  deleteBoard(id) {
    return board.delete(`/${id}`);
  },
};

export default boardApi;
