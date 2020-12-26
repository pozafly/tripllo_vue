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
