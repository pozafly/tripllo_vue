import { card } from '@/api';

const cardApi = {
  createCard(payload) {
    return card.post('/', payload);
  },

  deleteCard(id) {
    return card.delete(`/${id}`);
  },
};

export default cardApi;
