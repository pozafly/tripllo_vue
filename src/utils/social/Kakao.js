import { socialLogin, socialSignup } from '@/utils/social/index';

const Kakao = {
  init() {
    console.log('kakao init!!');
    window.Kakao.init(process.env.VUE_APP_KAKAO_APP_KEY);
  },

  getMe(authObj) {
    console.log(authObj);
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: async res => {
        console.log(res);
        const kakao_account = res.kakao_account;
        const req_body = {
          id: res.id,
          name: kakao_account.profile.nickname,
          email: kakao_account.email,
          kakaoAccessToken: authObj.access_token,
          profileImg: kakao_account.profile.profile_image_url,
          source: 'k',
        };
        socialLogin(req_body);
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
        const req_body = {
          id: res.id,
          name: kakao_account.profile.nickname,
          email: kakao_account.email,
          kakaoAccessToken: authObj.access_token,
          profileImg: kakao_account.profile.profile_image_url,
          source: 'k',
        };
        socialSignup(req_body);
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
