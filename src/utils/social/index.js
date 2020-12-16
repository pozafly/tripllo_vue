import store from '@/store';
import router from '@/routes/index';
import { saveAuthToCookie, saveUserToCookie } from '@/utils/cookies';

function setCookie(userData) {
  store.commit('setToken', userData.kakaoAccessToken);
  store.commit('setUsername', userData.name);
  saveAuthToCookie(userData.kakaoAccessToken);
  saveUserToCookie(userData.name);
}

function setUserData(req) {
  const userData = {
    id: req.id,
    name: req.name,
    email: req.email,
    picture: req.profileImg,
    kakaoAccessToken: req.kakaoAccessToken,
    socialYn: 'Y',
  };
  return userData;
}

async function socialLogin(req) {
  if (req.source === 'k') {
    // 카카오일 경우
    const userData = setUserData(req);
    setCookie(userData);
  } else if (req.source === 'f') {
    // 페이스북일 경우
  } else if (req.source === 'g') {
    // 구글일 경우
  }
}

async function socialSignup(req) {
  if (req.source === 'k') {
    // 카카오일 경우
    try {
      await store.dispatch('VALIDID', req.id);
      const userData = setUserData(req);
      await store.dispatch('SIGNUP', userData);
      setCookie(userData);
    } catch ({ response }) {
      console.log(response.data.message);
      const confirm = confirm(
        '이미 가입된 카카오톡 회원입니다. \n카카오톡으로 로그인 하기를 눌러주세요.',
      );
      if (confirm) router.push('/user/login');
    }
  } else if (req.source === 'f') {
    // 페이스북일 경우
  } else if (req.source === 'g') {
    // 구글일 경우
  }
}

export { socialLogin, socialSignup };

// email: 'paina103@daum.net';
// id: 1563754176;
// kakaoAccessToken: '_k_XPiuccrre-5L-9Tg4_D4o7oNE6DLG-TQ0kQorDSAAAAF2aQgJbw';
// name: '선태황';
// profileIMG: 'http://k.kakaocdn.net/dn/5vqfh/btqNMhfyibS/uKqYwFMOII66Tyaeumgbi0/img_640x640.jpg';
// source: 'k';
