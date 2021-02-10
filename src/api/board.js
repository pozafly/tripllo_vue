import { board } from '@/api';

const boardApi = {
  readBoardOne({ boardId }) {
    return board.get(`/${boardId}`);
  },

  readPersonalBoardList({ lastCreatedAt }) {
    return board.get(`/personal/${lastCreatedAt}`);
  },

  readRecentBoardList({ recentLists }) {
    return board.get(`/recent/${recentLists}`);
  },

  readInvitedBoardList({ invitedLists }) {
    return board.get(`/invited/${invitedLists}`);
  },

  readBoardDetail(boardId) {
    return board.get(`detail/${boardId}`);
  },

  createBoard({ title, publicYn, hashtag, bgColor }) {
    return board.post('/', { title, publicYn, hashtag, bgColor });
  },

  updateBoard(id, { title, bgColor, invitedUser, hashtag, publicYn }) {
    return board.put(`/${id}`, {
      title,
      bgColor,
      invitedUser,
      hashtag,
      publicYn,
    });
  },

  deleteBoard(id) {
    return board.delete(`/${id}`);
  },
};

export default boardApi;
