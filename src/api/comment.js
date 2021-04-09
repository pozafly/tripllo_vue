import { comments } from '@/api';

const createComment = ({ cardId, userId, comment, dept, groupNum }) =>
  comments.post(`/`, { cardId, userId, comment, dept, groupNum });

const readComment = cardId => comments.get(`/${cardId}`);

const updateComment = ({ id, userId, comment }) =>
  comments.put(`/`, { id, userId, comment });

const deleteComment = id => comments.delete(`/${id}`);

export { createComment, readComment, updateComment, deleteComment };
