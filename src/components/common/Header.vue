<template>
  <nav class="header">
    <div class="header-logo">
      <router-link to="/main">
        <i class="fas fa-suitcase"></i>&nbsp;
        <span>Tripllo</span>
      </router-link>
    </div>

    <div class="header-auth">
      <ul class="auth-wrap">
        <li class="auth-items">
          <a href="" class="auth-item"><i class="fas fa-info-circle"></i></a>
        </li>
        <li class="auth-items">
          <a href="" class="auth-item profile"></a>
        </li>
        <li><a href="" v-if="isAuth" @click.prevent="logoutUser">Logout</a></li>
        <li><router-link to="/user/login">Login</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.header {
  background-color: #026aa7;
  height: 32px;
  padding: 4px;
  position: relative;
  a {
    display: block;
    height: 30px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
  }
  .header-logo {
    font-family: 'Pacifico', cursive;
    position: absolute;
    left: 50%;
    top: 7px;
    margin-left: -30px;
    text-align: center;
    font-size: 21px;
    line-height: 22px;
    a:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  .header-auth {
    position: absolute;
    right: 2px;
    top: 5px;
    line-height: 33px;
    display: flex;
    .auth-wrap {
      display: flex;
      margin: 0;
      padding: 0;
      .auth-items {
        margin-right: 5px;
        .auth-item {
          border-radius: 2px;
          padding: 0 10px;
          background-color: rgba(255, 255, 255, 0.5);
          color: white;
          transition: all 0.3s;
          &:hover,
          &:focus {
            background-color: rgba(255, 255, 255, 0.3);
          }
          &.profile {
            border-radius: 100px;
            padding: 0 15px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['user_picture']),
  },
  methods: {
    ...mapMutations(['logout']),
    logoutUser() {
      this.logout();
      this.$router.push('/user/login');
    },
  },
  mounted() {
    // 프로필에 이미지 넣기
    this.$el.querySelector(
      '.profile',
    ).style.backgroundImage = `url(${this.user_picture})`;
  },
};
</script>
