function saveAuthToLocalStorage(value) {
  localStorage.setItem('user_token', value);
}

function saveUserToLocalStorage(value) {
  localStorage.setItem('user_username', value);
}

function getAuthFromLocalStorage() {
  return localStorage.getItem('user_token');
}

function getUserFromLocalStorage() {
  return localStorage.getItem('user_username');
}

function deleteLocalStorage(value) {
  localStorage.removeItem(value);
}

export {
  saveAuthToLocalStorage,
  saveUserToLocalStorage,
  getAuthFromLocalStorage,
  getUserFromLocalStorage,
  deleteLocalStorage,
};
