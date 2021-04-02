import store from '@/store';
import router from '@/routes';

async function socialLogin(req, isSignup) {
  try {
    const { data } = await store.dispatch('SOCIAL_LOGIN', req.id);
    store.commit('setUserToken', data.data.token);
    store.commit('setUser', data.data);

    if (isSignup === 'afterSignup') {
      alert('회원가입 완료! 메인 페이지로 이동합니다.');
    }

    router.push('/main');
  } catch (error) {
    console.log(error);

    const { data } = await store.dispatch('VALID_ID', req.id);
    if (data.status === 'OK') {
      const confirmYn = confirm(
        '아직 가입되지 않은 회원입니다. \n회원가입 화면으로 이동하시겠습니까?',
      );
      if (confirmYn) {
        router.push('/auth/signup');
      }
    }
  }
}

async function socialSignup(req) {
  try {
    await store.dispatch('VALID_ID', req.id);
    await store.dispatch('SIGNUP', req);

    socialLogin(req, 'afterSignup');
  } catch (error) {
    console.log(error);

    const confirmYn = confirm(
      '이미 가입된 소셜 회원입니다. \n로그인 화면으로 이동하시겠습니까?',
    );
    if (confirmYn) {
      router.push('/auth/login');
    }
  }
}

export { socialLogin, socialSignup };
