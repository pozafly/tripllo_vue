import { user } from '@/api';

const readIsInviteUser = userId => user.get(`isInvite/${userId}`);
const readInvitedUserForBoardPage = userList => user.get(`invited/${userList}`);
const signout = password => user.delete(`${password}`);
const readUser = userId => user.get(`${userId}`);
const updateUser = ({
  id,
  email,
  name,
  password,
  bio,
  picture,
  recentBoard,
  invitedBoard,
}) =>
  user.put('', {
    id,
    email,
    name,
    password,
    bio,
    picture,
    recentBoard,
    invitedBoard,
  });
const changePassword = ({ currentPw, newPw }) =>
  user.post('changePw', { currentPw, newPw });

export {
  readIsInviteUser,
  readInvitedUserForBoardPage,
  signout,
  readUser,
  updateUser,
  changePassword,
};
