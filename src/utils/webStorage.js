const USER_INFO = 'TRIPLLO-V1-U';
const TOKEN = 'TRIPLLO-V1-T';

// 인코딩, 디코딩 함수
const makeIncodeValue = (key, value) => {
  const data = encodeURIComponent(JSON.stringify(value));
  localStorage.setItem(key, btoa(data));
};

const returnDecodeValue = value => {
  const decode = atob(value);
  const data = JSON.parse(decodeURIComponent(decode));
  return data;
};

// 로컬스토리지 관련 함수(user)
const saveUserToLocalStorage = user => {
  makeIncodeValue(USER_INFO, user);
};

const getUserFromLocalStorage = () => {
  if (localStorage.getItem(USER_INFO)) {
    return returnDecodeValue(localStorage.getItem(USER_INFO));
  }
};

// 로컬스토리지 관련 함수(token)
const saveTokenToLocalStorage = token => {
  makeIncodeValue(TOKEN, token);
};

const getTokenFromLocalStorage = () => {
  if (localStorage.getItem(TOKEN)) {
    return returnDecodeValue(localStorage.getItem(TOKEN));
  }
};

const saveSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorage = key => {
  return JSON.parse(sessionStorage.getItem(key));
};

const deleteSessionStorage = key => {
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
