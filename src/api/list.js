import { list } from '@/api';

function createList(payload) {
  return list.post('/', payload);
}

function updateList(id, payload) {
  return list.put(`/${id}`, payload);
}

function deleteList(id) {
  return list.delete(`/${id}`);
}

export { createList, updateList, deleteList };
