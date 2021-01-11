function saveUserToLocalStorage(user) {
  localStorage.setItem('user_id', user.id);
  localStorage.setItem('user_email', user.email);
  localStorage.setItem('user_name', user.name);
  localStorage.setItem('user_bio', user.bio);
  localStorage.setItem('user_picture', user.picture);
  localStorage.setItem('user_recent', user.recent);
  localStorage.setItem('user_favorite', user.favorite);
}

function saveUserToken(token) {
  localStorage.setItem('user_token', token);
}

function getUserFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function deleteUserLocalStorage() {
  localStorage.removeItem('user_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_bio');
  localStorage.removeItem('user_picture');
  localStorage.removeItem('user_recent');
  localStorage.removeItem('user_favorite');
}

function saveSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

function deleteSessionStorage(key) {
  sessionStorage.removeItem(key);
}

export {
  saveUserToLocalStorage,
  saveUserToken,
  getUserFromLocalStorage,
  deleteUserLocalStorage,
  saveSessionStorage,
  getSessionStorage,
  deleteSessionStorage,
};
