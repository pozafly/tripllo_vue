<template>
  <div class="wrap">
    <Header />
    <div class="content">
      <div class="user-header">
        <div class="auth-items">
          <span
            href=""
            class="auth-item img"
            @click.prevent="menuShow"
            v-if="this.user.picture !== null && this.user.picture !== 'null'"
          ></span>
          <i class="fas fa-user auth-item" v-else></i>
          <span class="auth-item name">{{ user.name }}</span>
          <span class="auth-item id">@{{ user.id }}</span>
        </div>
      </div>
      <div class="user-info">
        <div class="info-wrap">
          <div class="info-inside">
            <UserAbout />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import UserAbout from '@/components/user/UserAbout';
import { mapActions, mapState } from 'vuex';

export default {
  components: { Header, UserAbout },
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    const imgList = this.$el.querySelectorAll('.img');
    Array.from(imgList).forEach(e => {
      e.style.backgroundImage = `url(${this.user.picture})`;
    });
  },
};
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
  background-color: #fff;
  .content {
    height: 100%;
    min-height: 100%;
    position: relative;
    overflow-y: auto;
    margin: -40px auto;
    padding: 40px 0 0 0;
    box-sizing: border-box;
    .user-header {
      height: 15%;
      background-color: #f4f5f7;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      padding: 32px;
      position: relative;
      .auth-items {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 20px 0;
        .auth-item {
          background-color: transparent;
          display: inline-block;
          padding: 8px 8px;
          text-align: center;
          text-decoration: none;
          border-radius: 100px;
          &.fa-user {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #339af0;
            color: #fff;
            height: 40px;
            width: 40px;
            font-size: 28px;
            margin-right: 16px;
          }
          &.img {
            width: 40px;
            height: 40px;
            border-radius: 90px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin-right: 16px;
          }
          &.name {
            font-size: 24px;
            font-weight: 500;
            line-height: 28px;
            color: #0c3953;
          }
          &.id {
            font-size: 12px;
            line-height: 20px;
            color: #5e6c84;
          }
        }
      }
    }
    .user-info {
      position: relative;
      width: 100%;
      margin: 0px auto;
      height: 77.7%;
      .info-wrap {
        position: relative;
        margin: 0 auto;
        max-width: 850px;
        height: 100%;
        .info-inside {
          height: 100%;
          width: 100%;
          max-width: 530px;
          display: flex;
          flex-direction: column;
          margin: auto;
        }
      }
    }
  }
}
</style>
