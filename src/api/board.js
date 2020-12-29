import { board } from '@/api';

function readBoardList(userId) {
  return board.get(userId);
}

function addBoard(title) {
  return board.post('/', { title });
}

export { readBoardList, addBoard };
