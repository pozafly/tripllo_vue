// 로그인, 회원가입, 회원탈퇴
import { instance } from './index';

// 로그인 API
function loginUser(userData) {
  return instance.post('login', userData);
}

function validId(userId) {
  return instance.get(`user/valid/${userId}`);
}

function signup(userData) {
  return instance.post('user', userData);
}

export { loginUser, validId, signup };
