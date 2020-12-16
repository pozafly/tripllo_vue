import store from '@/store/index';

function socialLogin(req) {
  console.log('socialLogin');
  console.log(req);

  // 카카오일 경우
  if (req.source === 'k') {
    const userData = {
      id: req.id,
      name: req.name,
      email: req.email,
      picture: req.profileImg,
      kakaoAccessToken: req.kakaoAccessToken,
      socialYn: 'Y',
    };
    process(userData);
  }
}

async function process(userData) {
  await store.dispatch('SIGNUP', userData);

  store.commit('setToken', userData.kakaoAccessToken);
  store.commit('setUsername', userData.name);
  console.log(store.state);
}

export { socialLogin };

// email: 'paina103@daum.net';
// id: 1563754176;
// kakaoAccessToken: '_k_XPiuccrre-5L-9Tg4_D4o7oNE6DLG-TQ0kQorDSAAAAF2aQgJbw';
// name: '선태황';
// profileIMG: 'http://k.kakaocdn.net/dn/5vqfh/btqNMhfyibS/uKqYwFMOII66Tyaeumgbi0/img_640x640.jpg';
// source: 'k';
