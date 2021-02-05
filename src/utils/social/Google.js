import { socialLogin, socialSignup } from '@/utils/social';

const Google = {
  makeReq(googleUser) {
    return new Promise((resolve, reject) => {
      const req = {
        name: googleUser.Fs.sd,
        id: googleUser.Fs.lt,
        email: googleUser.Fs.lt,
        picture: googleUser.Fs.wI,
        social: 'Google',
      };
      resolve(req);
    });
  },

  login(googleUser) {
    this.makeReq(googleUser).then(req => {
      socialLogin(req);
    });
  },

  signup(googleUser) {
    this.makeReq(googleUser).then(req => {
      socialSignup(req);
    });
  },
};

export default Google;
