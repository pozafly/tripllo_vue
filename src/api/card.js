import { card } from '@/api';

const createCard = payload => card.post('/', payload);

const readCard = id => card.get(`/${id}`);

const updateCard = (id, payload) => card.put(`/${id}`, payload);

const deleteCard = id => card.delete(`/${id}`);

export { createCard, readCard, updateCard, deleteCard };
