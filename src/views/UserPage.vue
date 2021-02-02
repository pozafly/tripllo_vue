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
            v-if="user.picture !== null && user.picture !== 'null'"
            :style="{ backgroundImage: `url(${user.picture})` }"
          ></span>
          <div v-else class="icon-wrap">
            <awesome icon="user" class="fas fa-user auth-item"></awesome>
          </div>
          <span class="auth-item name">{{ user.name }}</span>
          <span class="auth-item id">@{{ user.id }}</span>
        </div>
        <span class="createdAt">
          {{ user.createdAt | normalFormatDate }} 생성됨
        </span>
      </div>
      <div class="tabs">
        <TabItem
          v-for="item in tapList"
          v-bind="item"
          :key="item.id"
          v-model="currentId"
        />
      </div>
      <div class="user-info">
        <div class="info-wrap">
          <div class="info-inside">
            <section :key="currentId">
              <template v-if="current.content === 'About'">
                <About />
                <Signout />
              </template>
              <template v-else>
                <PasswordChange />
              </template>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import About from '@/components/user/About';
import Signout from '@/components/user/Signout';
import TabItem from '@/components/user/TapItem';
import PasswordChange from '@/components/user/PasswordChange';
import { mapState } from 'vuex';

export default {
  components: { Header, About, Signout, TabItem, PasswordChange },
  data() {
    return {
      currentId: 1,
      tapList: [
        { id: 1, label: 'About', content: 'About' },
        { id: 2, label: 'Change Password', content: 'ChangePassword' },
      ],
    };
  },
  computed: {
    ...mapState(['user']),
    current() {
      return this.tapList.find(el => el.id === this.currentId) || {};
    },
  },
  watch: {
    user() {
      const imgList = this.$el.querySelectorAll('.img');
      Array.from(imgList).forEach(e => {
        e.style.backgroundImage = `url(${this.user.picture})`;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  min-height: 100%;
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
      background-color: #f4f5f7;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      padding: 32px 0 70px;
      position: relative;
      .auth-items {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 20px 0;
        .icon-wrap {
          position: relative;
          background: #339af0;
          height: 60px;
          width: 60px;
          color: #fff;
          margin-right: 16px;
          border-radius: 50%;
          .fa-user {
            position: relative;
            height: 30px;
            width: 30px;
            left: 7px;
            top: 5px;
          }
        }
        .auth-item {
          background-color: transparent;
          display: inline-block;
          padding: 8px 8px;
          text-align: center;
          text-decoration: none;
          border-radius: 100px;
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
      .createdAt {
        display: block;
        text-align: center;
        font-size: 11.5px;
        color: #5e6c84;
      }
    }
    .tabs {
      position: relative;
      top: -30px;
      display: flex;
      justify-content: center;
    }
    .user-info {
      position: relative;
      width: 100%;
      margin: 0px auto;
      top: -23px;
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
