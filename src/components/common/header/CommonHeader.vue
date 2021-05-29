<template>
  <header>
    <nav class="header">
      <ul>
        <li class="header-home">
          <div class="home-wrap">
            <div class="home-items">
              <a href="" class="home-item" @click.prevent="goToMain">
                <awesome icon="home" class="fas fa-home"></awesome>
              </a>
            </div>
          </div>
        </li>

        <li class="header-logo">
          <router-link to="/main">
            <awesome icon="suitcase" class="fas fa-suitcase"></awesome>&nbsp;
            <h1 class="title">Tripllo</h1>
          </router-link>
        </li>

        <li class="header-auth">
          <ul class="auth-wrap">
            <Message />
            <li class="auth-items">
              <a
                href=""
                class="auth-item"
                @click.prevent="$router.push('/manual')"
              >
                <awesome
                  icon="info-circle"
                  class="fas fa-info-circle"
                ></awesome>
              </a>
            </li>
            <li class="auth-items">
              <a
                v-if="user.picture"
                href=""
                class="auth-item img"
                :style="{ backgroundImage: `url(${user.picture})` }"
                @click.prevent="() => (isMenuShow = true)"
              ></a>
              <awesome
                v-else
                icon="user"
                class="fas fa-user auth-item"
                @click.prevent="() => (isMenuShow = true)"
              ></awesome>
            </li>
          </ul>
        </li>
        <CommonHeaderMenu
          v-if="isMenuShow"
          v-click-outside="() => (isMenuShow = false)"
          @closeMenu="() => (isMenuShow = false)"
        />
      </ul>
    </nav>
  </header>
</template>

<script>
import Message from '@/components/common/header/message/HeaderMessage.vue';
import CommonHeaderMenu from '@/components/common/header/CommonHeaderMenu.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Message,
    CommonHeaderMenu,
  },

  data() {
    return {
      isMenuShow: false,
    };
  },

  computed: {
    ...mapState(['user', 'bgColor']),
  },

  watch: {
    bgColor() {
      this.updateTheme();
    },
  },

  mounted() {
    this.updateTheme();
  },

  methods: {
    goToMain() {
      if (this.$route.path === '/main') {
        return;
      }
      this.$router.push('/main');
    },

    updateTheme() {
      if (this.$route.path.includes('board')) {
        const board = document.querySelector('.board');
        const header = document.querySelector('.header');
        const icon = document.querySelectorAll('.icon');

        if (board) {
          board.style.backgroundColor = this.bgColor;
        }
        if (header) {
          header.style.backgroundColor = this.bgColor;
        }
        if (icon) {
          Array.from(icon).map(icon => {
            icon.style.backgroundColor = this.bgColor;
          });
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  background-color: #339af0;
  z-index: 3;
  height: 32px;
  padding: 4px;
  position: fixed;
  top: 0;
  width: 100%;

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
        margin-left: 10px;
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
    .title {
      display: inline;
      font-size: 1.34rem;
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
      margin-right: 10px;
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
}
</style>
