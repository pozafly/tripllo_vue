import {
  getUserFromLocalStorage,
  getSessionStorage,
  getTokenFromLocalStorage,
} from '@/utils/webStorage';

const state = {
  token: getTokenFromLocalStorage() || '',
  user: getUserFromLocalStorage() || '',
  personalBoard: [],
  recentBoard: [],
  invitedBoard: [],
  hashtagBoards: [],
  board: getSessionStorage('board') || {},
  card: getSessionStorage('card') || {},
  bgColor: getSessionStorage('bgColor') || '',
  socket: null, // socket은 socket.js와 InviteModalList.vue 2곳에서 사용하고 있다.
  pushMessage: '', // pushMessage는 3depths & socket까지 사용하므로 store에 있어야 함.
  file: [], // 4depths
};

export default state;
