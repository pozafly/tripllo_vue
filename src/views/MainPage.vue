<template>
  <div>
    Main
    <router-link to="/user/login">
      login
    </router-link>
    <router-link to="/user/signup">
      회원가입
    </router-link>
    <a href="javascript:;" @click="logoutUser">
      Logout
    </a>
  </div>
</template>

<script>
import { deleteLocalStorage } from '@/utils/localStorage';
import { mapMutations } from 'vuex';

export default {
  created() {},
  methods: {
    ...mapMutations(['logout']),
    logoutUser() {
      this.logout();
      this.$router.push('/user/login');
    },
  },
};
</script>

<style></style>
