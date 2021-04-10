import { comments } from '@/api';

/**
 * @typedef {object} Comment
 * @property {number} id - Comment ID
 * @property {number} cardId - Comment가 어느 Card에 속해있는지 구분
 * @property {string} comment - Comment(댓글)
 * @property {number} dept - 대댓글 여부(깊이) : 0|1
 * @property {number} groupNum - 댓글, 대댓글 그룹 넘버
 * @property {string} deleteYn - 삭제 여부. 만약 대댓글이 존재할 경우 실제 삭제가 아닌 삭제 표시만
 * @property {string} userId - Comment 유저 ID
 * @property {string} picture - 사용자 프로필 이미지 경로
 * @property {string} createdAt - 생성날짜
 * @property {string} createdBy - 생성자
 * @property {string} updatedAt - 수정날짜
 * @property {string} updatedBy - 수정자
 */

/**
 * @typedef {object} CreateCommentInfo
 * @property {number} cardId - Comment가 어느 Card에 속해있는지 구분
 * @property {string} comment - Comment(댓글)
 * @property {number} dept - 대댓글 여부(깊이) : 0|1
 * @property {number} groupNum - 댓글, 대댓글 그룹 넘버
 */

/**
 * 코멘트 생성
 * @param {CreateCommentInfo} createCommentInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const createComment = createCommentInfo =>
  comments.post(`/`, createCommentInfo);

/**
 * 코멘트 조회
 * @param {number} cardId - Card ID
 * @returns {Promise<Comment[]>}
 */
const readComment = cardId => comments.get(`/${cardId}`);

/**
 * 코멘트 수정
 * @param {number} id - Comment ID
 * @param {string} comment - 수정될 코멘트
 * @returns {Promise<string>} statusCode - 상태코드
 */
const updateComment = (id, comment) => comments.put(`/`, { id, comment });

/**
 * 코멘트 삭제
 * @param {number} id - Comment ID
 * @returns {Promise<string>} statusCode - 상태코드
 */
const deleteComment = id => comments.delete(`/${id}`);

export { createComment, readComment, updateComment, deleteComment };
