import { user } from '@/api';

const userApi = {
  readIsInviteUser(userId) {
    return user.get(`isInvite/${userId}`);
  },
  readInvitedUserForBoardPage(userList) {
    return user.get(`invited/${userList}`);
  },

  signout(password) {
    return user.delete(`${password}`);
  },
  readUser(userId) {
    return user.get(`${userId}`);
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
    return user.put('', {
      id,
      email,
      name,
      password,
      bio,
      picture,
      recentBoard,
      invitedBoard,
    });
  },
  changePassword({ currentPw, newPw }) {
    return user.post('changePw', { currentPw, newPw });
  },
};

export default userApi;
