import { card } from '@/api';

/**
 * @typedef {object} CardDetail
 * @property {string} description - 메모(설명)
 * @property {string} dueDate - 날짜 체크 값
 * @property {number} id - card의 ID
 * @property {string[]} labelColor - 레이블 색상
 * @property {number} title - Card 제목
 * @property {string} listId - card가 속해있는 list의 ID
 * @property {string} location - 장소 위치 값
 * @property {number} pos - Dragula 포지션 값
 * @property {string} createdAt - 생성날짜
 * @property {string} createdBy - 생성자
 * @property {string} updatedAt - 수정날짜
 * @property {string} updatedBy - 수정자
 */

/**
 * @typedef {object} CreateCardInfo
 * @property {number} title - Card 제목
 * @property {number} listId - Card가 어느 list에 속해있는지 구분
 * @property {number} pos - Dragula 포지션 값
 */

/**
 * @typedef {object} UpdateCardInfo
 * @property {number} id - Card ID
 * @property {number} title - Card 제목
 * @property {number} pos - Dragula 포지션 값
 * @property {string} description - 메모(설명)
 * @property {string[]} labelColor - 레이블 색상
 * @property {string} location - 장소 위치 값
 * @property {string} dueDate - 날짜 체크 값
 * @property {string} listId - card가 속해있는 list의 ID
 */

/**
 * 카드 생성
 * @param {CreateCardInfo} createCardInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const createCardAPI = createCardInfo => card.post('/', createCardInfo);

/**
 * 카드 상세 조회
 * @param {number} id - 카드 ID
 * @returns {Promise<CardDetail>}
 */
const readCardAPI = id => card.get(`/${id}`);

/**
 * 카드 수정
 * @param {number} id - 카드 ID
 * @param {UpdateCardInfo} updateCardInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const updateCardAPI = (id, updateCardInfo) =>
  card.put(`/${id}`, updateCardInfo);

/**
 * 카드 삭제
 * @param {number} id - 카드 ID
 * @returns {Promise<string>} statusCode - 상태코드
 */
const deleteCardAPI = id => card.delete(`/${id}`);

export { createCardAPI, readCardAPI, updateCardAPI, deleteCardAPI };
