import { getUserFromLocalStorage, getSessionStorage } from '@/utils/webStorage';

const state = {
  user: {
    token: getUserFromLocalStorage('user_token') || '',
    id: getUserFromLocalStorage('user_id') || '',
    email: getUserFromLocalStorage('user_email') || '',
    name: getUserFromLocalStorage('user_name') || '',
    bio: getUserFromLocalStorage('user_bio') || '',
    picture: getUserFromLocalStorage('user_picture') || '',
  },
  boardList: [],
  board: getSessionStorage('board') || {},
  card: getSessionStorage('card') || {},
  checklists: getSessionStorage('checklists') || [],
  bgColor: getSessionStorage('bgColor') || '',
};

export default state;
