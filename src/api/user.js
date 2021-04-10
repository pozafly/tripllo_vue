import { user } from '@/api';

/**
 * @typedef {object} User
 * @property {string} bio - 소개
 * @property {string} email - 이메일
 * @property {string} id - 아이디
 * @property {number[]} invitedBoard - 초대된 Board
 * @property {string} name - 이름
 * @property {string} picture - 프로필 이미지 경로
 * @property {number[]} recentBoard - 최근 본 Board
 * @property {string} social - 소셜 계정 여부. 소셜 가입이 아닐 때는 null
 * @property {string} token - 로그인 token
 * @property {string} createdAt - 생성날짜
 * @property {string} createdBy - 생성자
 * @property {string} updatedAt - 수정날짜
 * @property {string} updatedBy - 수정자
 */

/**
 * @typedef {object} ChangePasswordInfo
 * @property {string} currentPw - 현재 비밀번호
 * @property {string} newPw - 변경 될 비밀번호
 */

/**
 * Board 페이지의 Invite Modal에서, 초대할 사람 목록 조회
 * @param {string} userId - 초대할 유저 ID
 * @returns {Promise<User[]>}
 */
const readIsInviteUserForModal = userId => user.get(`isInvite/${userId}`);

/**
 * Board 페이지에서, 초대된 사람
 * @param {string[]} userList - 초대된 유저 ID 리스트
 * @returns {Promise<User[]>}
 */
const readInvitedUserForBoardPage = userList => user.get(`invited/${userList}`);

/**
 * 회원 탈퇴
 * @param {string} password - 비밀번호
 * @returns {Promise<string>} statusCode - 상태코드
 */
const signout = password => user.delete(`${password}`);

/**
 * 회원 정보 수정시, 비밀번호 변경 시, 프로필 사진 변경 시 User 정보 재조회
 * @param {string} userId - 로그인 한 유저 ID
 * @returns {Promise<User>}
 */
const readUser = userId => user.get(`${userId}`);

/**
 * 유저 수정
 * @param {object} updateUserInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
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

/**
 *
 * @param {ChangePasswordInfo} changePasswordInfo
 * @returns {Promise<string>} statusCode - 상태코드
 */
const changePassword = changePasswordInfo =>
  user.post('changePw', changePasswordInfo);

export {
  readIsInviteUserForModal,
  readInvitedUserForBoardPage,
  signout,
  readUser,
  updateUser,
  changePassword,
};
