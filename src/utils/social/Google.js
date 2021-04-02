import { socialLogin, socialSignup } from '@/utils/social';
import router from '@/routes';
import { getUserFromLocalStorage } from '@/utils/webStorage';

const Google = {
  init() {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init({
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('loginBtn'), auth2);
    });
  },

  attachSignin(element, auth2) {
    auth2.attachClickHandler(
      element,
      {},
      googleUser => {
        const profile = googleUser.getBasicProfile();

        if (getUserFromLocalStorage('user_token')) {
          alert('이미 로그인 되어 있습니다.');
          router.push('/main');
          return;
        }
        const path = router.history.current.path;
        if (path.includes('login')) {
          this.login(profile);
        } else {
          this.signup(profile);
        }
      },
      function(error) {
        alert(JSON.stringify(error, undefined, 2));
        console.log(JSON.stringify(error, undefined, 2));
      },
    );
  },

  login(profile) {
    this.makeReq(profile).then(req => {
      socialLogin(req);
    });
  },

  signup(profile) {
    this.makeReq(profile).then(req => {
      socialSignup(req);
    });
  },

  makeReq(profile) {
    return new Promise((resolve, reject) => {
      const req = {
        name: profile.getName(),
        id: profile.getEmail(),
        email: profile.getEmail(),
        picture: profile.getImageUrl(),
        social: 'Google',
      };
      resolve(req);
    });
  },
};

export default Google;
