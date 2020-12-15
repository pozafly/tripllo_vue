const Kakao = {
  init() {
    console.log('kakao init');
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
          birthday: kakao_account.birthday,
          kakaoAccessToken: authObj.access_token,
          profileIMG: kakao_account.profile.profile_image_url,
          source: 'k',
        };
        social_login(req_body);
      },
      fail: error => {
        LoginFailure();
        console.log(error);
      },
    });
  },

  login() {
    console.log(window.Kakao.Auth);
    window.Kakao.Auth.login({
      scope: 'account_email, gender',
      success: this.getMe,
      fail: LogoutFailure,
    });
  },

  logout() {
    window.Kakao.Auth.logout(res => {
      if (!res) return LogoutFailure();
      social_logout();
    });
  },
};

export default Kakao;
