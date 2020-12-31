import { card } from '@/api';

const cardApi = {
  createCard(payload) {
    return card.post('/', payload);
  },

  readCard(id) {
    return card.get(`/${id}`);
  },

  updateCard(id, payload) {
    return card.put(`/${id}`, payload);
  },

  deleteCard(id) {
    return card.delete(`/${id}`);
  },
};

export default cardApi;
