import { pushMessage } from '@/api';

/**
 * @typedef {object} PushMessage
 * @property {number} id - Push Message ID
 * @property {number} boardId - 어느 Board에 초대했는지 구분
 * @property {string} content - 초대 내용
 * @property {string} isRead - 초대장을 읽었는지 여부
 * @property {string} senderId - 초대한 유저 ID
 * @property {string} targetId - 초대 받은 유저 ID(현재 로그인 한 유저)
 * @property {string} createdAt - 생성날짜
 * @property {string} createdBy - 생성자
 * @property {string} updatedAt - 수정날짜
 * @property {string} updatedBy - 수정자
 */

/**
 * @typedef {object} UpdateMessageInfo
 * @property {string} id - 푸시 메세지 ID
 * @property {string} isRead - 초대장을 읽었는지 여부
 */

/**
 * 푸시 메세지 조회
 * @param {string} targetId - (로그인 한) 대상 유저 ID
 * @returns {Promise<PushMessage[]>}
 */
const readPushMessageAPI = targetId => pushMessage.get(`/${targetId}`);

/**
 * 푸시 메세지 수정
 * @param {UpdateMessageInfo} updateMessageInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const updatePushMessageAPI = updateMessageInfo =>
  pushMessage.put('/', updateMessageInfo);

/**
 * 푸시 메세지 삭제
 * @param {number} id - 푸시 메세지 ID
 * @returns {Promise<string>} statusCode - 상태코드
 */
const deletePushMessageAPI = id => pushMessage.delete(`/${id}`);

export { readPushMessageAPI, updatePushMessageAPI, deletePushMessageAPI };
