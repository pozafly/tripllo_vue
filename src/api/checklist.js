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

  deleteChecklist(id) {
    return checklist.delete(`/${id}`);
  },
};

export default checklistApi;
