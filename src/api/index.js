import axios from 'axios';

function createUser(userData) {
  const url = 'http://localhost:3000/user';
  return axios.post(url, userData);
}

export { createUser };
