import { email } from '@/api';

const sendEmail = ({ userId, userEmail }) =>
  email.post(`/`, { userId, userEmail });

export { sendEmail };
