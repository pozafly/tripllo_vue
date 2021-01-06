import { checklist } from '@/api';

const checklistApi = {
  createChecklist(payload) {
    return checklist.post('/', payload);
  },

  readChecklist(id) {
    return checklist.get(`/${id}`);
  },

  updateChecklist(id, payload) {
    return checklist.put(`/${id}`, payload);
  },

  deleteChecklist({ checklistId, cardId }) {
    return checklist.delete(`/${checklistId}/${cardId}`);
  },
};

export default checklistApi;
