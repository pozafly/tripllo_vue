import { checklist } from '@/api';

/**
 * @typedef {Object} Checklist
 * @property {number} cardId - Checklist가 어느 Card에 속해있는지 구분
 * @property {number} id - Checklist ID
 * @property {ChecklistItem[]} item - Checklist 안에 있는 item 목록
 * @property {number} title - Checklist 제목
 * @property {string} createdAt - 생성날짜
 * @property {string} createdBy - 생성자
 * @property {string} updatedAt - 수정날짜
 * @property {string} updatedBy - 수정자
 */

/**
 * @typedef {Object} ChecklistItem
 * @property {number} checklistId - ChecklistItem이 어느 Checklist에 속해있는지 구분
 * @property {number} id - ChecklistItem ID
 * @property {string} isChecked - 완료 여부
 * @property {string} item - ChecklistItem 하나의 item 명
 * @property {string} createdAt - 생성날짜
 * @property {string} createdBy - 생성자
 * @property {string} updatedAt - 수정날짜
 * @property {string} updatedBy - 수정자
 */

/**
 * @typedef {Object} CreateChecklistInfo
 * @property {string} title - 제목
 * @property {number} cardId - Checklist가 어느 Card에 속해있는지 구분
 */

/**
 * 체크리스트 생성
 * @param {CreateChecklistInfo} createChecklistInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const createChecklistAPI = createChecklistInfo =>
  checklist.post('/', createChecklistInfo);

/**
 * 체크리스트 조회
 * @param {number} id - 체크리스트 ID
 * @returns {Promise<Checklist[ChecklistItem[]]>}
 */
const readChecklistAPI = id => checklist.get(`/${id}`);

/**
 * 체크리스트 수정
 * @param {number} id - 체크리스트 ID
 * @param {string} title - 체크리스트 제목
 * @returns {Promise<string>} statusCode - 상태코드
 */
const updateChecklistAPI = (id, title) => checklist.put(`/${id}`, title);

/**
 * 체크리스트 수정
 * @param {number} checklistId - 체크리스트 ID
 * @param {number} cardId - Checklist가 어느 Card에 속해있는지 구분
 * @returns {Promise<string>} statusCode - 상태코드
 */
const deleteChecklistAPI = ({ checklistId, cardId }) =>
  // SpringBoot의 DeleteMapping에서 @PathVariable 때문에 payload(객체 전달) 불가
  checklist.delete(`/${checklistId}/${cardId}`);

export {
  createChecklistAPI,
  readChecklistAPI,
  updateChecklistAPI,
  deleteChecklistAPI,
};
