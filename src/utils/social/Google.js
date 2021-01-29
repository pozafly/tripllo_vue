import { socialLogin, socialSignup } from '@/utils/social';

const Google = {
  async login(googleUser) {
    console.log(googleUser);
    const req = await {
      name: googleUser.Nt.Ed,
      id: googleUser.Nt.uu,
      email: googleUser.Nt.uu,
      profileImg: googleUser.Nt.fL,
      source: 'Google',
    };
    await socialLogin(req);
  },

  async signup(googleUser) {
    console.log(googleUser);
    const req = await {
      name: googleUser.Nt.Ed,
      id: googleUser.Nt.uu,
      email: googleUser.Nt.uu,
      profileImg: googleUser.Nt.fL,
      source: 'Google',
    };
    await socialSignup(req);
  },
};

export default Google;
