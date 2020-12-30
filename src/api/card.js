import { card } from '@/api';

function createCard(payload) {
  return card.post('/', payload);
}

function deleteCard(id) {
  return card.delete(`/${id}`);
}

export { createCard, deleteCard };
