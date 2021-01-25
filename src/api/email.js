import { email } from '@/api';

const emailApi = {
  sendEmail({ userId, userEmail }) {
    return email.post(`/`, { userId, userEmail });
  },
};

export default emailApi;
