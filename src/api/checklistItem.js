import { checklistItem } from '@/api';

const createChecklistItem = payload => checklistItem.post('/', payload);

const updateChecklistItem = (checklistItemId, payload) =>
  checklistItem.put(`/${checklistItemId}`, payload);

const deleteChecklistItem = ({ checklistItemId }) =>
  checklistItem.delete(`/${checklistItemId}`);

export { createChecklistItem, updateChecklistItem, deleteChecklistItem };
