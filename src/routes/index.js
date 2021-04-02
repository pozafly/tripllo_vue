import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { getUserFromLocalStorage } from '@/utils/webStorage';

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  const loginPath = `/auth`;
  if (store.getters.isAuth) {
    next();
  } else {
    alert('로그인 되어있지 않습니다.');
    next(loginPath);
  }
};

const firstAccess = (to, from, next) => {
  const mainPath = '/main';
  const introPath = '/intro';
  if (getUserFromLocalStorage('user_id')) {
    next(mainPath);
  } else {
    next(introPath);
  }
};

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', beforeEnter: firstAccess },
    {
      path: '/intro',
      component: () => import('@/views/IntroPage.vue'),
    },
    {
      path: '/privacy',
      component: () => import('@/views/PrivacyPage.vue'),
    },
    {
      path: '/manual',
      component: () => import('@/views/ManualPage.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      beforeEnter: requireAuth,
    },
    {
      // 중첩된 라우트 : 한 페이지에 url에 따라서 다른 컴포넌트를 보여야 할 때 사용.
      path: '/auth',
      redirect: '/auth/login',
      component: () => import('@/views/AuthPage.vue'),
      children: [
        {
          path: 'login',
          component: () => import('@/components/auth/LoginForm.vue'),
        },
        {
          path: 'signup',
          component: () => import('@/components/auth/SignupForm.vue'),
        },
        {
          path: 'findPassword',
          component: () => import('@/components/auth/FindPassword.vue'),
        },
      ],
    },
    {
      path: '/board/:boardId',
      component: () => import('@/views/BoardPage.vue'),
      beforeEnter: requireAuth,
      children: [
        {
          path: 'card/:cardId',
          component: () => import('@/components/card/cardModal/CardModal.vue'),
          beforeEnter: requireAuth,
        },
      ],
    },
    {
      path: '/profile',
      component: () => import('@/views/ProfilePage.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/user/:userId',
      component: () => import('@/views/UserBoardPage.vue'),
      beforeEnter: requireAuth,
    },
    { path: '*', component: () => import('@/views/NotFoundPage.vue') },
  ],
});

export default router;
