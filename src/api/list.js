import { list } from '@/api';

const createList = payload => list.post('/', payload);
const updateList = (id, payload) => list.put(`/${id}`, payload);
const deleteList = id => list.delete(`/${id}`);

export { createList, updateList, deleteList };
