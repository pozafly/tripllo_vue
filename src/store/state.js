import { getUserFromLocalStorage } from '@/utils/webStorage';

const state = {
  user: {
    token: getUserFromLocalStorage('user_token') || '',
    id: getUserFromLocalStorage('user_id') || '',
    email: getUserFromLocalStorage('user_email') || '',
    name: getUserFromLocalStorage('user_name') || '',
    picture: getUserFromLocalStorage('user_picture') || '',
  },
  boardList: [],
  board: {},
  card: {},
};

export default state;
