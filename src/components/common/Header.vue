<template>
  <nav class="header">
    <div class="header-home">
      <ul class="home-wrap">
        <li class="home-items">
          <a href="" class="home-item" @click.prevent="$router.push('/main')">
            <awesome icon="home" class="fas fa-home"></awesome>
          </a>
        </li>
      </ul>
    </div>

    <div class="header-logo">
      <router-link to="/main">
        <awesome icon="suitcase" class="fas fa-suitcase"></awesome>&nbsp;
        <span>Tripllo</span>
      </router-link>
    </div>

    <div class="header-auth">
      <ul class="auth-wrap">
        <li class="auth-items">
          <a
            href=""
            class="auth-item red"
            v-if="noReadCount !== 0"
            @click.prevent="isMessageModal = true"
          >
            <awesome icon="bell"></awesome>
            <div class="push-message-wrap">
              <span class="push-message-length">{{ noReadCount }}</span>
            </div>
          </a>
          <a
            href=""
            class="auth-item"
            v-else
            @click.prevent="isMessageModal = true"
          >
            <awesome icon="bell"></awesome>
          </a>
          <MessageModal
            class="message-modal"
            v-if="isMessageModal"
            @close="isMessageModal = false"
            v-click-outside="closeMessageModal"
          />
        </li>
        <li class="auth-items">
          <a href="" class="auth-item" @click.prevent="$router.push('/manual')">
            <awesome icon="info-circle" class="fas fa-info-circle"></awesome>
          </a>
        </li>
        <li class="auth-items">
          <a
            href=""
            class="auth-item img"
            @click.prevent="menuShow"
            v-if="this.user.picture !== null && this.user.picture !== 'null'"
            :style="{ backgroundImage: `url(${user.picture})` }"
          ></a>
          <awesome
            icon="user"
            class="fas fa-user auth-item"
            @click.prevent="menuShow"
            v-else
          ></awesome>
        </li>
      </ul>
    </div>

    <div class="menu" v-if="isMenuShow" v-click-outside="closeProfileModal">
      <div
        class="menu-item img"
        v-if="this.user.picture !== null && this.user.picture !== 'null'"
        :style="{ backgroundImage: `url(${user.picture})` }"
      ></div>
      <awesome icon="user" class="fas fa-user menu-item icon" v-else></awesome>
      <div class="menu-profile">
        <div class="profile-item name">{{ user.name }}</div>
        <div class="profile-item id">@{{ user.id }}</div>
      </div>
      <a class="menu-close" @click.prevent="menuShow">&times;</a>
      <a class="menu-item" @click="$router.push('/my')">
        <awesome icon="user-edit" class="fas fa-user-edit"></awesome>
        <span>Edit profile</span>
      </a>
      <a class="menu-item" href="" v-if="isAuth" @click.prevent="logoutUser">
        <awesome icon="running" class="fas fa-running"></awesome>
        <span>Logout</span>
      </a>
      <router-link class="menu-item" v-else to="/auth/login">
        <span>Login</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { socketConnect } from '@/utils/socket';
import bus from '@/utils/bus';
import MessageModal from '@/components/message/MessageModal.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  components: { MessageModal },
  data() {
    return {
      isMenuShow: false,
      noReadCount: 0,
      isMessageModal: false,
    };
  },
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['user', 'bgColor', 'pushMessage', 'socket']),
  },
  watch: {
    bgColor() {
      this.updateTheme();
    },
    pushMessage() {
      this.noReadCount = 0;
      if (
        this.pushMessage === null ||
        this.pushMessage === 'null' ||
        this.pushMessage === ''
      )
        return;
      this.pushMessage.forEach(el => {
        if (el.isRead === 'N') this.noReadCount += 1;
      });
    },
  },
  methods: {
    ...mapActions(['LOGOUT', 'READ_PUSH_MESSAGE']),
    logoutUser() {
      this.LOGOUT();
      this.$router.push('/auth/login');
    },
    menuShow() {
      this.isMenuShow = !this.isMenuShow;
    },
    updateTheme() {
      if (this.$route.path.includes('main')) return;
      if (this.$route.path.includes('my')) return;
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
    receive(data) {
      const message = JSON.parse(data);
      this.$notify({
        group: 'custom-template',
        duration: 5000,
        closeOnClick: true,
        title: '초대장이 도착했습니다',
        text: `${message.content}`,
      });
      this.READ_PUSH_MESSAGE(this.user.id);
    },
    closeMessageModal() {
      this.isMessageModal = false;
    },
    closeProfileModal() {
      this.isMenuShow = false;
    },
  },
  mounted() {
    this.updateTheme();
  },
  created() {
    if (this.socket === null) {
      socketConnect();
    }
    bus.$on('receive-message', data => {
      this.receive(data);
    });

    this.READ_PUSH_MESSAGE(this.user.id);
  },
  beforeDestroy() {
    bus.$off('receive-message');
  },
};
</script>

<style scoped lang="scss">
.header {
  background-color: #339af0;
  z-index: 3;
  height: 32px;
  padding: 4px;
  position: sticky;
  top: 0;
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
          &.red {
            position: relative;
            .push-message-wrap {
              position: absolute;
              display: block;
              font-size: 10px;
              top: -3px;
              right: -1px;
              border-radius: 50%;
              background: red;
              padding: 2px;
              height: 11px;
              width: 11px;
              text-align: center;
              .push-message-length {
                position: relative;
                top: -11px;
              }
            }
          }
        }
        .message-modal {
          position: absolute;
          left: -200px;
          top: 40px;
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
        border-radius: 50%;
        display: inline-block;
        margin: 0.6rem;
        height: 25px;
        width: 20px;
      }
      &.img {
        display: inline-block;
        position: relative;
        padding: 0;
        margin: 0.6rem;
        min-height: 40px;
        max-width: 40px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        cursor: auto;
      }
      .fa-user-edit {
        margin-right: 9px;
      }
      .fa-running {
        margin-right: 13px;
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
        margin-top: 6px;
      }
      &.id {
        font-size: 9pt;
        color: #b3bac5;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 230px;
        margin-top: -6px;
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
