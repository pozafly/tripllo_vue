// 로그인, 회원가입, 회원탈퇴
import { instance } from '@/api';
import store from '@/store';

// 로그인 API
const authApi = {
  loginUser(userData) {
    return instance.post('login', userData);
  },
  apiSocialLogin(userId) {
    return instance.get(`login/social/${userId}`);
  },
  logoutUser() {
    return instance.get('logout');
  },

  // user
  validId(userId) {
    return instance.get(`user/valid/${userId}`);
  },
  signup(userData) {
    return instance.post('user', userData);
  },
  readUser(userId) {
    return instance.get(`user/${userId}`, {
      headers: {
        Authorization: store.state.user.token,
      },
    });
  },
};

export default authApi;
