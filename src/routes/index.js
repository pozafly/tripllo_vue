import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  const loginPath = `/user`;
  if (store.getters.isAuth) {
    next();
  } else {
    alert('로그인 되어있지 않습니다.');
    next(loginPath);
  }
};

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/main' },
    {
      path: '/main',
      component: () => import('@/views/MainPage'),
      beforeEnter: requireAuth,
    },
    {
      // 중첩된 라우트 : 한 페이지에 url에 따라서 다른 컴포넌트를 보여야 할 때 사용.
      path: '/user',
      redirect: '/user/login',
      component: () => import('@/views/UserPage'),
      children: [
        {
          path: 'login',
          component: () => import('@/components/user/LoginForm'),
        },
        {
          path: 'signup',
          component: () => import('@/components/user/SignupForm'),
        },
      ],
    },
    {
      path: '/board/:boardId',
      component: () => import('@/views/BoardPage'),
      beforeEnter: requireAuth,
      children: [
        {
          path: 'card/:cardId',
          component: () => import('@/components/cardDetail/CardModal'),
          beforeEnter: requireAuth,
        },
      ],
    },
  ],
});

export default router;
