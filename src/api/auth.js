// 로그인 API
import { instance } from '@/api';

const loginUser = userData => instance.post('login', userData);
const apiSocialLogin = userId => instance.get(`login/social/${userId}`);
const logoutUser = () => instance.get('logout');
const signup = userData => instance.post('user', userData);
const validId = userId => instance.get(`user/valid/${userId}`);

export { loginUser, apiSocialLogin, logoutUser, signup, validId };
