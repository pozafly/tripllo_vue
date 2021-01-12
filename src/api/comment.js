import { comments } from '@/api';

const commentApi = {
  createComment({ cardId, userId, comment }) {
    return comments.post(`/`, { cardId, userId, comment });
  },

  readComment(cardId) {
    return comments.get(`/${cardId}`);
  },

  updateComment({ id, userId, comment }) {
    return comments.put(`/`, { id, userId, comment });
  },

  deleteComment(id) {
    return comments.delete(`/${id}`);
  },
};

export default commentApi;
