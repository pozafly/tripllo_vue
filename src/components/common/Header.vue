<template>
  <nav class="header">
    <div class="header-logo">
      <router-link to="/">Home</router-link>
    </div>
    <div class="header-auth">
      <a href="" v-if="isAuth" @click.prevent="logoutUser">Logout</a>
      <router-link to="/user/login" v-else>Login</router-link>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.header {
  flex: none;
  background-color: #026aa7;
  height: 32px;
  padding: 4px;
  a {
    display: block;
    height: 30px;
    line-height: 30px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
  }
  .header-logo {
    position: absolute;
    left: 50%;
    top: 7px;
    margin-left: -30px;
    text-align: center;
    font-weight: bolder;
    font-size: 24px;
    a:hover,
    a:focus {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  .header-auth {
    position: absolute;
    right: 15px;
    top: 5px;
    a {
      border-radius: 2px;
      padding: 0 10px;
      background-color: rgba(255, 255, 255, 0.5);
      color: white;
      transition: all 0.3s;
      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>

<script>
import { deleteLocalStorage } from '@/utils/localStorage';
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuth']),
  },
  methods: {
    ...mapMutations(['logout']),
    logoutUser() {
      this.logout();
      this.$router.push('/user/login');
    },
  },
};
</script>
