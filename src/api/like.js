import { boardHasLike } from '@/api';

/**
 * @typedef {object} LikeInfo
 * @property {number} boardId - Board ID
 * @property {number} likeCount - 좋아요 갯수
 */

/**
 * 좋아요 count + 1
 * @param {LikeInfo} likeInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const createLike = likeInfo => boardHasLike.post('/', likeInfo);

/**
 * 좋아요 count - 1
 * @param {LikeInfo} likeInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const deleteLike = ({ boardId, likeCount }) =>
  boardHasLike.delete(`/${boardId}/${likeCount}`);

export { createLike, deleteLike };
