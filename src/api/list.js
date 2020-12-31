import { list } from '@/api';

const listApi = {
  createList(payload) {
    return list.post('/', payload);
  },

  updateList(id, payload) {
    return list.put(`/${id}`, payload);
  },

  deleteList(id) {
    return list.delete(`/${id}`);
  },
};

export default listApi;
