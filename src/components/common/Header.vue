<template>
  <nav class="header">
    <div class="header-home">
      <ul class="home-wrap">
        <li class="home-items">
          <a href="" class="home-item" @click.prevent="$router.push('/main')">
            <i class="fas fa-home"></i>
          </a>
        </li>
      </ul>
    </div>

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
          <a
            href=""
            class="auth-item img"
            @click.prevent="menuShow"
            v-if="this.user.picture !== null && this.user.picture !== 'null'"
          ></a>
          <i class="fas fa-user auth-item" @click.prevent="menuShow" v-else></i>
        </li>
      </ul>
    </div>

    <div class="menu" v-show="isMenuShow">
      <div
        class="menu-item img"
        v-if="this.user.picture !== null && this.user.picture !== 'null'"
      ></div>
      <i class="fas fa-user menu-item icon" v-else></i>
      <div class="menu-profile">
        <div class="profile-item name">{{ user.name }}</div>
        <div class="profile-item email">{{ user.email }}</div>
      </div>
      <a class="menu-close" @click.prevent="menuShow">&times;</a>
      <a class="menu-item" @click="$router.push('/user')">
        <i class="fas fa-user-edit"></i>
        <span>Edit profile</span>
      </a>
      <a class="menu-item" href="" v-if="isAuth" @click.prevent="logoutUser">
        <i class="fas fa-running"></i>
        <span>Logout</span>
      </a>
      <router-link class="menu-item" v-else to="/user/login">
        <span>Login</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      isMenuShow: false,
    };
  },
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['user', 'bgColor']),
  },
  watch: {
    bgColor() {
      this.updateTheme();
    },
  },
  methods: {
    ...mapActions(['LOGOUT']),
    logoutUser() {
      this.LOGOUT();
      this.$router.push('/auth/login');
    },
    menuShow() {
      this.isMenuShow = !this.isMenuShow;
    },
    updateTheme() {
      if (this.$route.path.includes('main')) return;
      if (this.$route.path.includes('user')) return;

      const board = document.querySelector('.board');
      const header = document.querySelector('.header');
      const icon = document.querySelectorAll('.icon');

      if (board) board.style.backgroundColor = this.bgColor;
      if (header) header.style.backgroundColor = this.bgColor;
      if (icon) {
        Array.from(icon).map(icon => {
          icon.style.backgroundColor = this.bgColor;
        });
      }
    },
  },
  mounted() {
    this.updateTheme();
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
  background-color: #339af0;
  z-index: 3;
  height: 32px;
  padding: 4px;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    background: rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
  a {
    z-index: 999;
    display: block;
    height: 30px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
  }
  .header-home {
    position: absolute;
    left: 2px;
    top: 5px;
    line-height: 33px;
    display: flex;
    .home-wrap {
      display: flex;
      margin: 0;
      padding: 0;
      .home-items {
        margin-left: 5px;
        .home-item {
          cursor: pointer;
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
      color: white;
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
          cursor: pointer;
          border-radius: 2px;
          padding: 0 10px;
          background-color: rgba(255, 255, 255, 0.5);
          color: white;
          transition: all 0.3s;
          &:hover,
          &:focus {
            background-color: rgba(255, 255, 255, 0.3);
          }
          &.fa-user {
            padding: 7px 8px 11px;
            border-radius: 100px;
            height: 13px;
            width: 14px;
          }
          &.img {
            width: 11px;
            height: 30px;
            border-radius: 90px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            cursor: pointer;
          }
        }
      }
    }
  }
  .menu {
    /* filter: Grayscale(150%); */
    position: fixed;
    right: 3px;
    width: 304px;
    top: 44px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    background: white;
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
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      &.fa-user {
        background: #339af0;
        color: #fff;
        display: inline-block;
        margin: 0.6rem;
        min-height: 40px;
        max-width: 40px;
        &::before {
          position: absolute;
          left: 11.5px;
          top: 9px;
          font-size: 20px;
        }
      }
      &.img,
      &.icon {
        display: inline-block;
        position: relative;
        padding: 0;
        margin: 0.6rem;
        min-height: 40px;
        max-width: 40px;
        border-radius: 90px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        cursor: auto;
      }
      i {
        margin-right: 9px;
      }
      .fa-running {
        font-size: 19px;
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
      &:hover {
        font-weight: 700;
      }
    }
  }
}
</style>
