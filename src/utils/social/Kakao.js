import { socialLogin, socialSignup } from '@/utils/social';

const Kakao = {
  init() {
    window.Kakao.init(process.env.VUE_APP_KAKAO_APP_KEY);
    return true;
  },

  getMe(authObj) {
    console.log(authObj);
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: async res => {
        console.log(res);
        const kakao_account = res.kakao_account;
        const req = {
          id: res.id,
          name: kakao_account.profile.nickname,
          email: kakao_account.email,
          profileImg: kakao_account.profile.profile_image_url,
          source: 'Kakao',
        };
        socialLogin(req);
      },
      fail: error => {
        console.log(error);
      },
    });
  },

  setMe(authObj) {
    console.log(authObj);
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: async res => {
        console.log(res);
        const kakao_account = res.kakao_account;
        const req = {
          id: res.id,
          name: kakao_account.profile.nickname,
          email: kakao_account.email,
          profileImg: kakao_account.profile.profile_image_url,
          source: 'Kakao',
        };
        socialSignup(req);
      },
      fail: error => {
        console.log(error);
      },
    });
  },

  login() {
    window.Kakao.Auth.login({
      scope: 'profile, account_email',
      success: this.getMe,
      fail: error => console.log(error),
    });
  },

  signup() {
    window.Kakao.Auth.login({
      scope: 'profile, account_email',
      success: this.setMe,
      fail: error => console.log(error),
    });
  },

  logout() {
    window.Kakao.Auth.logout(res => {
      if (!res) return console.log(error);
      social_logout();
    });
  },
};

export default Kakao;
