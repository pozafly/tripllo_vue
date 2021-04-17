import {
  getUserFromLocalStorage,
  getSessionStorage,
  getTokenFromLocalStorage,
} from '@/utils/webStorage';

const state = {
  token: getTokenFromLocalStorage() || '',
  user: getUserFromLocalStorage() || '',
  board: getSessionStorage('board') || {},
  card: getSessionStorage('card') || {},
  bgColor: getSessionStorage('bgColor') || '',
  // personalBoard, recentBoard는 서로 sync가 맞아야 하기때문에
  // store에 있어야한다고 판단.
  personalBoard: [],
  recentBoard: [],
  pushMessage: '', // pushMessage는 3depths & socket.js까지 사용하므로 store에 있는게 좋겠다.
  file: [], // 4depths
};

export default state;
