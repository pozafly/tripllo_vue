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
  makeIncodeValue('TRIPLLO-V1-U', user);
};

const getUserFromLocalStorage = () => {
  if (localStorage.getItem('TRIPLLO-V1-U')) {
    return returnDecodeValue(localStorage.getItem('TRIPLLO-V1-U'));
  }
};

// 로컬스토리지 관련 함수(token)
const saveTokenToLocalStorage = token => {
  makeIncodeValue('TRIPLLO-V1-T', token);
};

const getTokenFromLocalStorage = () => {
  if (localStorage.getItem('TRIPLLO-V1-T')) {
    return returnDecodeValue(localStorage.getItem('TRIPLLO-V1-T'));
  }
};

const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

const clearSessionStorage = () => {
  sessionStorage.clear();
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
  clearStorage,
  saveSessionStorage,
  getSessionStorage,
  deleteSessionStorage,
  clearSessionStorage,
};
