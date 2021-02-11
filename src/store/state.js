import { getUserFromLocalStorage, getSessionStorage } from '@/utils/webStorage';

const state = {
  token: getUserFromLocalStorage('user_token') || '',
  user: {
    id: getUserFromLocalStorage('user_id') || '',
    email: getUserFromLocalStorage('user_email') || '',
    name: getUserFromLocalStorage('user_name') || '',
    bio: getUserFromLocalStorage('user_bio') || '',
    picture: getUserFromLocalStorage('user_picture') || '',
    recentBoard: getUserFromLocalStorage('user_recentBoard') || '',
    invitedBoard: getUserFromLocalStorage('user_invitedBoard') || '',
    createdAt: getUserFromLocalStorage('user_created_at') || '',
  },
  isInfinity: 'Y',
  personalBoard: [],
  recentBoard: [],
  invitedBoard: [],
  board: getSessionStorage('board') || {},
  card: getSessionStorage('card') || {},
  checklists: getSessionStorage('checklists') || [],
  bgColor: getSessionStorage('bgColor') || '',
  comment: [],
  socket: null,
  pushMessage: '',
  file: [],
  mainTabId: 0,
  hashtagBoards: [],
};

export default state;
