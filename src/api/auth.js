// 로그인, 회원가입, 회원탈퇴
import { instance } from '@/api';

// 로그인 API
function loginUser(userData) {
  return instance.post('login', userData);
}
function apiSocialLogin(userId) {
  return instance.get(`login/social/${userId}`);
}
function logoutUser() {
  return instance.get('logout');
}

// user
function validId(userId) {
  return instance.get(`user/valid/${userId}`);
}

function signup(userData) {
  return instance.post('user', userData);
}

export { loginUser, validId, logoutUser, signup, apiSocialLogin };
