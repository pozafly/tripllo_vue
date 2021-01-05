import { checklistItem } from '@/api';

const checklistItemApi = {
  createChecklistItem(payload) {
    return checklistItem.post('/', payload);
  },

  updateChecklistItem(checklistItemId, payload) {
    return checklistItem.put(`/${checklistItemId}`, payload);
  },

  deleteChecklistItem({ checklistItemId }) {
    return checklistItem.delete(`/${checklistItemId}`);
  },
};

export default checklistItemApi;
