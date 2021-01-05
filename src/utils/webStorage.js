function saveUserToLocalStorage(user) {
  localStorage.setItem('user_token', user.token);
  localStorage.setItem('user_id', user.id);
  localStorage.setItem('user_email', user.email);
  localStorage.setItem('user_name', user.name);
  localStorage.setItem('user_picture', user.picture);
}

function getUserFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function deleteUserLocalStorage(key) {
  localStorage.removeItem('user_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_picture');
}

function saveSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

export {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  deleteUserLocalStorage,
  saveSessionStorage,
  getSessionStorage,
};
