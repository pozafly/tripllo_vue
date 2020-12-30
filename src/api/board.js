import { board } from '@/api';

function readBoardList(userId) {
  return board.get(userId);
}

function addBoard(title) {
  return board.post('/', { title });
}

function readBoardDetail(boardId) {
  return board.get(`detail/${boardId}`);
}

function updateBoard(id, payload) {
  return board.put(`/${id}`, payload);
}

export { readBoardList, addBoard, readBoardDetail, updateBoard };
