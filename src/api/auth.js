// 로그인, 회원가입, 회원탈퇴
import { instance } from '@/api';
import store from '@/store';

// 로그인 API
const authApi = {
  // login
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

  readIsInviteUser(userId) {
    return instance.get(`user/isInvite/${userId}`, {
      headers: {
        Authorization: store.state.token,
      },
    });
  },
  readInvitedUser(userList) {
    return instance.get(`user/invited/${userList}`, {
      headers: {
        Authorization: store.state.token,
      },
    });
  },
  signup(userData) {
    return instance.post('user', userData);
  },
  signout(password) {
    return instance.delete(`user/${password}`, {
      headers: {
        Authorization: store.state.token,
      },
    });
  },
  readUser(userId) {
    return instance.get(`user/${userId}`, {
      headers: {
        Authorization: store.state.token,
      },
    });
  },
  updateUser({
    id,
    email,
    name,
    password,
    bio,
    picture,
    recentBoard,
    invitedBoard,
  }) {
    return instance.put(
      'user',
      { id, email, name, password, bio, picture, recentBoard, invitedBoard },
      {
        headers: {
          Authorization: store.state.token,
        },
      },
    );
  },
  changePassword({ currentPw, newPw }) {
    return instance.post(
      'user/changePw',
      { currentPw, newPw },
      {
        headers: {
          Authorization: store.state.token,
        },
      },
    );
  },
};

export default authApi;
