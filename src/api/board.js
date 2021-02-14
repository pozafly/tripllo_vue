import { board } from '@/api';

const boardApi = {
  readBoardOne({ boardId }) {
    return board.get(`/${boardId}`);
  },

  readPersonalBoard({ lastCreatedAt }) {
    return board.get(`/personal/${lastCreatedAt}`);
  },

  readSearchUserBoard({ searchUser, lastCreatedAt }) {
    return board.get(`/${searchUser}/${lastCreatedAt}`);
  },

  rerenderBoard({ count }) {
    return board.get(`/rerender/${count}`);
  },

  readRecentBoard({ recentLists }) {
    return board.get(`/recent/${recentLists}`);
  },

  readInvitedBoard({ invitedLists }) {
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
