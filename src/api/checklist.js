import { checklist } from '@/api';

const createChecklist = payload => checklist.post('/', payload);

const readChecklist = id => checklist.get(`/${id}`);

const updateChecklist = (id, payload) => checklist.put(`/${id}`, payload);

const deleteChecklist = ({ checklistId, cardId }) =>
  checklist.delete(`/${checklistId}/${cardId}`);

export { createChecklist, readChecklist, updateChecklist, deleteChecklist };
