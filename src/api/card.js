import { card } from '@/api';

const cardApi = {
  createCard(payload) {
    return card.post('/', payload);
  },

  readCard(id) {
    return card.get(`/${id}`);
  },

  deleteCard(id) {
    return card.delete(`/${id}`);
  },
};

export default cardApi;
