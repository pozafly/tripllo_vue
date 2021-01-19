import { getUserFromLocalStorage, getSessionStorage } from '@/utils/webStorage';

const state = {
  token: getUserFromLocalStorage('user_token') || '',
  user: {
    id: getUserFromLocalStorage('user_id') || '',
    email: getUserFromLocalStorage('user_email') || '',
    name: getUserFromLocalStorage('user_name') || '',
    bio: getUserFromLocalStorage('user_bio') || '',
    picture: getUserFromLocalStorage('user_picture') || '',
    recent: getUserFromLocalStorage('user_recent') || '',
    favorite: getUserFromLocalStorage('user_favorite') || '',
    createdAt: getUserFromLocalStorage('user_created_at') || '',
  },
  boardList: [],
  recentBoard: [],
  invitedBoard: [],
  board: getSessionStorage('board') || {},
  card: getSessionStorage('card') || {},
  checklists: getSessionStorage('checklists') || [],
  bgColor: getSessionStorage('bgColor') || '',
  comment: [],
  socket: null,
  pushMessage: getSessionStorage('pushMessage') || [],
};

export default state;
