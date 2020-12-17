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
  console.log('userData');
  console.log(userData);
  return userData;
}

async function socialLogin(req) {
  try {
    const { data } = await store.dispatch('VALIDID', req.id);
    console.log(data);
    if (data.status === 'OK') {
      const confirmYn = confirm(
        '아직 가입되지 않은 회원입니다. \n회원가입 화면으로 이동하시겠습니까?',
      );
      if (confirmYn) router.push('/user/signup');
    }
  } catch (error) {
    console.log(error);
    const userData = setUserData(req);
    setVuex(userData);
    router.push('/main');
  }
}

async function socialSignup(req) {
  try {
    await store.dispatch('VALIDID', req.id);
    const userData = setUserData(req);
    await store.dispatch('SIGNUP', userData);
    setVuex(userData);
    alert('회원가입 완료! 메인 페이지로 이동합니다.');
    router.push('/main');
  } catch (error) {
    console.log(error);
    if (req.source === 'Github') {
      router.push('/main');
    } else {
      const confirmYn = confirm(
        '이미 가입된 소셜 회원입니다. \n로그인 화면으로 이동하시겠습니까?',
      );
      if (confirmYn) router.push('/user/login');
    }
  }
}

export { socialLogin, socialSignup };
