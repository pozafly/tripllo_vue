function saveAuthToLocalStorage(value) {
  localStorage.setItem('user_token', value);
}

function saveUserToLocalStorage(value) {
  localStorage.setItem('user_name', value);
}

function savePictureToLocalStorage(value) {
  localStorage.setItem('user_picture', value);
}

function getAuthFromLocalStorage() {
  return localStorage.getItem('user_token');
}

function getUserFromLocalStorage() {
  return localStorage.getItem('user_name');
}

function getPictureFromLocalStorage() {
  return localStorage.getItem('user_picture');
}

function deleteLocalStorage(value) {
  localStorage.removeItem(value);
}

export {
  saveAuthToLocalStorage,
  saveUserToLocalStorage,
  savePictureToLocalStorage,
  getAuthFromLocalStorage,
  getUserFromLocalStorage,
  getPictureFromLocalStorage,
  deleteLocalStorage,
};
