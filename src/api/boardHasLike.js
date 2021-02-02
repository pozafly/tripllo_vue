import { boardHasLike } from '@/api';

const boardHasLikeApi = {
  createBoardHasLike({ boardId, likeCount }) {
    return boardHasLike.post('/', { boardId, likeCount });
  },

  deleteBoardHasLike({ boardId, likeCount }) {
    console.log({ boardId, likeCount });
    return boardHasLike.delete(`/${boardId}/${likeCount}`);
  },
};

export default boardHasLikeApi;
