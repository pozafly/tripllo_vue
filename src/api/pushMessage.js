import { pushMessage } from '@/api';

const pushMessageApi = {
  readPushMessage(targetId) {
    return pushMessage.get(`/${targetId}`);
  },

  updatePushMessage({ id, isRead }) {
    return pushMessage.put('/', { id, isRead });
  },

  deletePushMessage(id) {
    return pushMessage.delete(`/${id}`);
  },
};

export default pushMessageApi;
