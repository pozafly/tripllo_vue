import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginForm from '@/components/user/LoginForm';
import SignupForm from '@/components/user/SignupForm';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      // 중첩된 라우트 : 한 페이지에 url에 따라서 다른 컴포넌트를 보여야 할 때 사용.
      path: '/user',
      redirect: '/user/login',
      component: () => import('@/views/UserPage.vue'),
      children: [
        { path: 'login', component: LoginForm },
        { path: 'signup', component: SignupForm },
      ],
    },
  ],
});

export default router;
