import { pushMessage } from '@/api';

const readPushMessage = targetId => pushMessage.get(`/${targetId}`);
const updatePushMessage = ({ id, isRead }) =>
  pushMessage.put('/', { id, isRead });
const deletePushMessage = id => pushMessage.delete(`/${id}`);

export { readPushMessage, updatePushMessage, deletePushMessage };
