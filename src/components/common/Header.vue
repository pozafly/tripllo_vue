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
          <a href="" class="auth-item img" @click.prevent="menuShow"></a>
        </li>
      </ul>
    </div>

    <section class="menu" v-show="isMenuShow">
      <div class="menu-item img"></div>
      <div class="menu-profile">
        <div class="profile-item name">{{ user.name }}</div>
        <div class="profile-item email">{{ user.email }}</div>
      </div>
      <a class="menu-close" @click.prevent="menuShow">&times;</a>
      <a class="menu-item" @click="$router.push('/user')">
        <span>Edit profile</span>
      </a>
      <a class="menu-item" href="" v-if="isAuth" @click.prevent="logoutUser">
        <span>Logout</span>
      </a>
      <router-link class="menu-item" v-else to="/user/login">
        <span>Login</span>
      </router-link>
    </section>
  </nav>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      isMenuShow: false,
    };
  },
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['user']),
  },
  methods: {
    ...mapMutations(['logout']),
    logoutUser() {
      this.logout();
      this.$router.push('/user/login');
    },
    menuShow() {
      this.isMenuShow = !this.isMenuShow;
    },
  },
  mounted() {
    // 프로필에 이미지 넣기
    const imgList = this.$el.querySelectorAll('.img');
    Array.from(imgList).forEach(e => {
      e.style.backgroundImage = `url(${this.user.picture})`;
    });
  },
};
</script>

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
          &.img {
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
  .menu {
    position: fixed;
    right: 3px;
    width: 304px;
    top: 44px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
      0 0 0 1px rgba(9, 30, 66, 0.08);
    box-sizing: border-box;
    overflow: hidden;
    .menu-item {
      background-color: transparent;
      color: #172b4d;
      display: block;
      height: 100%;
      padding: 10px 12px;
      text-align: left;
      text-decoration: none;
      width: 100%;
      transition: none;
      cursor: pointer;
      &.img {
        display: inline-block;
        position: relative;
        padding: 0;
        margin: 0.6rem;
        min-height: 40px;
        max-width: 40px;
        border-radius: 40px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
    .menu-profile {
      position: absolute;
      left: 63px;
      top: 0px;
      width: 200px;
    }
    .profile-item {
      padding: 6px 4px;
      &.name {
        color: #172b4d;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        margin-top: 3px;
      }
      &.email {
        font-size: 9pt;
        color: #b3bac5;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 230px;
      }
    }
    .menu-close {
      position: absolute;
      top: 5px;
      right: 10px;
      color: #172b4d;
      font-size: 17px;
      margin-top: 4px;
      max-width: 230px;
      cursor: pointer;
    }
  }
}
</style>
