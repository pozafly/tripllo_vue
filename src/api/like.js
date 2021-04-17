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
const createLikeAPI = likeInfo => boardHasLike.post('/', likeInfo);

/**
 * 좋아요 count - 1
 * @param {LikeInfo} likeInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const deleteLikeAPI = ({ boardId, likeCount }) =>
  // SpringBoot의 DeleteMapping에서 @PathVariable 때문에 payload(객체 전달) 불가
  boardHasLike.delete(`/${boardId}/${likeCount}`);

export { createLikeAPI, deleteLikeAPI };
