import { socialLogin, socialSignup } from '@/utils/social';

const Google = {
  async login(googleUser) {
    console.log(googleUser);
    const req = await {
      name: googleUser.Fs.sd,
      id: googleUser.Fs.lt,
      email: googleUser.Fs.lt,
      profileImg: googleUser.Fs.wI,
      source: 'Google',
    };
    await socialLogin(req);
  },

  async signup(googleUser) {
    console.log(googleUser);
    const req = await {
      name: googleUser.Fs.sd,
      id: googleUser.Fs.lt,
      email: googleUser.Fs.lt,
      profileImg: googleUser.Fs.wI,
      source: 'Google',
    };
    await socialSignup(req);
  },
};

export default Google;
