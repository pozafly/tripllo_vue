<template>
  <div>
    Main
    <router-link to="/user/login" class="create-button">
      login
    </router-link>
    <router-link to="/user/signup" class="create-button">
      회원가입
    </router-link>
    <a href="javascript:;" @click="logoutUser" class="logout-button">
      Logout
    </a>
  </div>
</template>

<script>
import { deleteLocalStorage } from '@/utils/localStorage';

export default {
  created() {
    console.log('여긴 메인페이지');
    console.log(this.$store.state);
  },
  methods: {
    logoutUser() {
      this.$store.commit('clearUsername');
      this.$store.commit('clearToken');
      deleteLocalStorage('user_token');
      deleteLocalStorage('user_username');
      this.$router.push('/user/login');
    },
  },
};
</script>

<style></style>
