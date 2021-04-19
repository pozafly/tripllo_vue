import { isEmpty } from '@/utils/libs';

const USER_INFO = 'TRIPLLO-V1-U';
const TOKEN = 'TRIPLLO-V1-T';

// NOTE: 인코딩, 디코딩 함수
const makeEncode = (key, value) => {
  if (isEmpty(value)) {
    return;
  }
  const data = JSON.stringify(value);
  const encode = encodeURIComponent(data);
  localStorage.setItem(key, btoa(encode));
};

const returnDecode = value => {
  if (isEmpty(value)) {
    return;
  }
  const decode = atob(value);
  const data = JSON.parse(decodeURIComponent(decode));
  return data;
};

// 로컬스토리지 관련 함수(user)
/**
 * @typedef {object} User
 * @property {string} id - 유저 ID
 * @property {string} email - 유저 이메일
 * @property {string} name - 유저 이름
 * @property {string} social - 소셜 가입 구분코드
 * @property {string} bio - 유저 소개
 * @property {string} picture - 유저 프로필 이미지 경로
 * @property {string} recentBoard - 최근에 본 Board 리스트(string[] 아님)
 * @property {string} invitedBoard - 초대된 Board 리스트(string[] 아님)
 */

/**
 * 유저 정보를 인코딩하여 localStorage에 올려줌
 * @param {User} user
 */
const saveUserToLocalStorage = user => {
  if (isEmpty(user)) {
    return;
  }
  return makeEncode(USER_INFO, user);
};

/**
 * 로컬 스토리지에 올라가 있는 유저 정보를 디코딩하여 return
 * @returns {User} userInfo
 */
const getUserFromLocalStorage = () => {
  const userInfo = localStorage.getItem(USER_INFO);
  if (isEmpty(userInfo)) {
    return;
  }
  return returnDecode(userInfo);
};

/**
 * 로그인 토큰을 인코딩하여 localStorage에 올려줌
 * @param {string} token
 */
const saveTokenToLocalStorage = token => {
  if (isEmpty(token)) {
    return;
  }
  makeEncode(TOKEN, token);
};

/**
 * 로컬 스토리지에 올라가 있는 토큰 정보를 디코딩하여 return
 * @returns {string} tokenInfo
 */
const getTokenFromLocalStorage = () => {
  const tokenInfo = localStorage.getItem(TOKEN);
  if (isEmpty(tokenInfo)) {
    return;
  }
  return returnDecode(tokenInfo);
};

const saveSessionStorage = (key, value) => {
  if (isEmpty(value)) {
    return;
  }
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorage = key => {
  if (isEmpty(key)) {
    return;
  }
  return JSON.parse(sessionStorage.getItem(key));
};

const deleteSessionStorage = key => {
  if (isEmpty(key)) {
    return;
  }
  sessionStorage.removeItem(key);
};

export {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
  saveSessionStorage,
  getSessionStorage,
  deleteSessionStorage,
};
