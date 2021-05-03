import { list } from '@/api';

/**
 * @typedef {Object} CreateListInfo
 * @property {number} boardId - list가 어느 board에 속해있는지 구분
 * @property {number} pos - Dragula 포지션 값
 * @property {string} title - 제목
 */

/**
 * @typedef {Object} UpdateListInfo
 * @property {number} id - list ID
 * @property {number} pos - Dragula 포지션 값
 * @property {string} title - 제목
 */

/**
 * 리스트 생성
 * @param {CreateListInfo} createListInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const createListAPI = createListInfo => list.post('/', createListInfo);

/**
 * 리스트 수정
 * @param {CreateListInfo} updateListInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const updateListAPI = (id, updateListInfo) =>
  list.put(`/${id}`, updateListInfo);

/**
 * 리스트 삭제
 * @param {number} id - 리스트 ID
 * @returns {Promise<string>} statusCode - 상태코드
 */
const deleteListAPI = id => list.delete(`/${id}`);

export { createListAPI, updateListAPI, deleteListAPI };
