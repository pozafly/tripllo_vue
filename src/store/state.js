import {
  getAuthFromLocalStorage,
  getUserFromLocalStorage,
} from '@/utils/localStorage';

const state = {
  user_token: getAuthFromLocalStorage() || '',
  user_name: getUserFromLocalStorage() || '',
  boardList: {},
};

export default state;
