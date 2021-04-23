import store from '@/store';
import { getUserFromLocalStorage } from '@/utils/webStorage';
import { isEmpty } from '@/utils/libs';

const firstAccess = (to, from, next) => {
  if (isEmpty(getUserFromLocalStorage())) {
    next('/intro');
    return;
  } else {
    next('/main');
    return;
  }
};

const requireAuth = (to, from, next) => {
  const loginPath = '/auth';
  if (store.getters.isAuth) {
    next();
    return;
  } else {
    alert('로그인 되어있지 않습니다.');
    next(loginPath);
    return;
  }
};

const intoBoard = async (to, from, next) => {
  try {
    await store.dispatch('READ_BOARD_DETAIL', to.params.boardId);
    // 인증 부분으로 매개변수 넘겨줌.
    requireAuth(to, from, next);
  } catch (error) {
    console.log(error);
    if (error.response.status === 404) {
      alert('해당 Board의 정보가 없습니다.');
    }
    next('/main');
    return;
  }
};

export { firstAccess, requireAuth, intoBoard };
