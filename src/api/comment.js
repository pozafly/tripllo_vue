import { comments } from '@/api';

const commentApi = {
  createComment({ cardId, userId, comment, dept, groupNum }) {
    return comments.post(`/`, { cardId, userId, comment, dept, groupNum });
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
