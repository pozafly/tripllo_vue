import { board } from '@/api';

const readBoardOne = ({ boardId }) => board.get(`/${boardId}`);

const readPersonalBoard = ({ lastCreatedAt }) =>
  board.get(`/personal/${lastCreatedAt}`);

const readSearchUserBoard = ({ searchUser, lastCreatedAt }) =>
  board.get(`/${searchUser}/${lastCreatedAt}`);

const rerenderBoard = ({ count }) => board.get(`/rerender/${count}`);

const readRecentBoard = ({ recentLists }) =>
  board.get(`/recent/${recentLists}`);

const readInvitedBoard = ({ invitedLists }) =>
  board.get(`/invited/${invitedLists}`);

const readBoardDetail = boardId => board.get(`detail/${boardId}`);

const createBoard = ({ title, publicYn, hashtag, bgColor }) =>
  board.post('/', { title, publicYn, hashtag, bgColor });

const updateBoard = (id, { title, bgColor, invitedUser, hashtag, publicYn }) =>
  board.put(`/${id}`, {
    title,
    bgColor,
    invitedUser,
    hashtag,
    publicYn,
  });
const deleteBoard = id => board.delete(`/${id}`);

export {
  readBoardOne,
  readPersonalBoard,
  readSearchUserBoard,
  rerenderBoard,
  readRecentBoard,
  readInvitedBoard,
  readBoardDetail,
  createBoard,
  updateBoard,
  deleteBoard,
};
