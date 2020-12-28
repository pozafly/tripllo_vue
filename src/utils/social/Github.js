import { socialLogin, socialSignup } from '@/utils/social/index';
import axios from 'axios';

const Github = {
  async login(code) {
    const req = await this.getData(code);
    socialLogin(req);
  },

  async signup(code) {
    const req = await this.getData(code);
    console.log('req');
    console.log(req);
    socialSignup(req);
  },

  async getData(code) {
    const { data } = await axios({
      method: 'POST',
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.VUE_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.VUE_APP_GITHUB_CLIENT_SECRET}&code=${code}`,
      headers: {
        accept: 'application/json',
      },
    });
    const token = data.access_token;
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log(response.data);

    const req = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.blog,
      profileImg: response.data.avatar_url,
      accessToken: token,
      source: 'Github',
    };

    return req;
  },
};

export default Github;
