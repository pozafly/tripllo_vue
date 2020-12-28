import {
  getAuthFromLocalStorage,
  getUserFromLocalStorage,
  getPictureFromLocalStorage,
} from '@/utils/webStorage';

const state = {
  user_token: getAuthFromLocalStorage() || '',
  user_name: getUserFromLocalStorage() || '',
  user_picture: getPictureFromLocalStorage() || '',
  boardList: {},
};

export default state;
