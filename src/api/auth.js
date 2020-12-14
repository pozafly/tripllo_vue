// 로그인, 회원가입, 회원탈퇴
import { instance } from './index';

// 로그인 API
function loginUser(userData) {
  return instance.post('login', userData);
}

export { loginUser };
