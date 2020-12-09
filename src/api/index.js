import axios from 'axios';

function registerUser(userData) {
  const url = 'http://localhost:3000/api/getMethod';
  return axios.get(url, userData);
}

export { registerUser };
