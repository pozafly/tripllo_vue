import { checklistItem } from '@/api';

/**
 * @typedef {Object} CreateChecklistItemInfo
 * @property {number} checklistId - ChecklistItem이 어느 Checklist에 속해있는지 구분
 * @property {string} item - ChecklistItem 하나의 item 명
 */

/**
 * @typedef {Object} UpdateChecklistItemInfo
 * @property {string} isChecked - 체크 여부
 * @property {string} item - ChecklistItem 하나의 item 명
 */

/**
 * 체크리스트 아이템 생성
 * @param {CreateChecklistItemInfo} createChecklistItemInfo
 * @returns {Promise<string>} statusCode - 상태코드 (조회는 checklist에서 한번에 함)
 */
const createChecklistItemAPI = createChecklistItemInfo =>
  checklistItem.post('/', createChecklistItemInfo);

/**
 * 체크리스트 아이템 수정
 * @param {UpdateChecklistItemInfo} updateChecklistItemInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const updateChecklistItemAPI = (checklistItemId, updateChecklistItemInfo) =>
  checklistItem.put(`/${checklistItemId}`, updateChecklistItemInfo);

/**
 * 체크리스트 아이템 삭제
 * @param {number} checklistItemId - 체크리스트 아이템 ID
 * @returns {Promise<string>} statusCode - 상태코드
 */
const deleteChecklistItemAPI = checklistItemId =>
  checklistItem.delete(`/${checklistItemId}`);

export {
  createChecklistItemAPI,
  updateChecklistItemAPI,
  deleteChecklistItemAPI,
};
