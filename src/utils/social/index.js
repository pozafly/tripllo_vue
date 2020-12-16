import store from '@/store';
import router from '@/routes/index';

function setVuex(userData) {
  store.commit('setToken', userData.accessToken);
  store.commit('setUsername', userData.name);
}

function setUserData(req) {
  const userData = {
    id: req.id,
    name: req.name,
    email: req.email,
    picture: req.profileImg,
    accessToken: req.accessToken,
    socialYn: req.source,
  };
  return userData;
}

async function socialLogin(req) {
  console.log('index.js의 req를 보자');
  console.log(req);
  const userData = setUserData(req);
  setVuex(userData);
  router.push('/main');
}

async function socialSignup(req) {
  try {
    await store.dispatch('VALIDID', req.id);
    const userData = setUserData(req);
    await store.dispatch('SIGNUP', userData);
    setVuex(userData);
  } catch ({ response }) {
    console.log(response.data.message);
    const confirm = confirm(
      '이미 가입된 카카오톡 회원입니다. \n카카오톡으로 로그인 하기를 눌러주세요.',
    );
    if (confirm) router.push('/user/login');
  }
}

export { socialLogin, socialSignup };

// email: 'paina103@daum.net';
// id: 1563754176;
// kakaoAccessToken: '_k_XPiuccrre-5L-9Tg4_D4o7oNE6DLG-TQ0kQorDSAAAAF2aQgJbw';
// name: '선태황';
// profileIMG: 'http://k.kakaocdn.net/dn/5vqfh/btqNMhfyibS/uKqYwFMOII66Tyaeumgbi0/img_640x640.jpg';
// source: 'k';
