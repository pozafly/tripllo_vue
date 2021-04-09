import { boardHasLike } from '@/api';

const createBoardHasLike = ({ boardId, likeCount }) =>
  boardHasLike.post('/', { boardId, likeCount });

const deleteBoardHasLike = ({ boardId, likeCount }) =>
  boardHasLike.delete(`/${boardId}/${likeCount}`);

export { createBoardHasLike, deleteBoardHasLike };
