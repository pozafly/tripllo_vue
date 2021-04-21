<template>
  <div class="menu">
    <div
      v-if="user.picture !== null && user.picture !== 'null'"
      class="menu-item img"
      :style="{ backgroundImage: `url(${user.picture})` }"
    ></div>
    <awesome v-else icon="user" class="fas fa-user menu-item icon"></awesome>
    <div class="menu-profile">
      <div class="profile-item name">{{ user.name }}</div>
      <div class="profile-item id">@{{ user.id }}</div>
    </div>
    <a class="menu-close" @click.prevent="$emit('closeMenu')">&times;</a>
    <a class="menu-item" @click="$router.push('/profile')">
      <awesome icon="user-edit" class="fas fa-user-edit"></awesome>
      <span>Edit profile</span>
    </a>
    <a v-if="isAuth" class="menu-item" href="" @click.prevent="logoutUser">
      <awesome icon="running" class="fas fa-running"></awesome>
      <span>Logout</span>
    </a>
    <router-link v-else class="menu-item" to="/auth/login">
      <span>Login</span>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['user']),
  },

  methods: {
    ...mapActions(['LOGOUT']),

    async logoutUser() {
      try {
        this.LOGOUT();
        this.$router.push('/auth/login');
      } catch (error) {
        console.log(error);
        alert('로그아웃 되지 않았습니다.');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
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
</style>
