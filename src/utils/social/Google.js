import { socialLogin, socialSignup } from '@/utils/social';

const Google = {
  login(googleUser) {
    console.log('googel');
    console.log(googleUser);
    const req = {
      name: googleUser.xt.Ad,
      id: googleUser.xt.du,
      email: googleUser.xt.du,
      profileImg: googleUser.xt.iK,
      source: 'Google',
    };
    socialLogin(req);
  },

  signup(googleUser) {
    const req = {
      name: googleUser.xt.Ad,
      id: googleUser.xt.du,
      email: googleUser.xt.du,
      profileImg: googleUser.xt.iK,
      source: 'Google',
    };
    socialSignup(req);
  },
};

export default Google;
