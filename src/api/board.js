import { board } from '@/api';

function readBoardList(userId) {
  return board.get(userId);
}

export { readBoardList };
