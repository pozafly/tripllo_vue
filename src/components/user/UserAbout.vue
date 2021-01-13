<template>
  <div>
    <h3 class="title">About</h3>
    <hr />
    <div class="about-wrap">
      <div class="profile-avatar">
        <h3>Avatar</h3>
        <div class="avatar-wrap">
          <div
            class="img"
            v-if="this.user.picture !== null && this.user.picture !== 'null'"
          ></div>
          <awesome icon="user" class="fas fa-user" v-else></awesome>
          <span class="change">Change</span>
        </div>
      </div>
      <form class="form">
        <div class="form-item">
          <span>Name</span>
          <input
            type="text"
            class="form-control input"
            v-model="userData.name"
          />
        </div>
        <div class="form-item">
          <span>Email</span>
          <input
            type="text"
            class="form-control input"
            v-model="userData.email"
          />
        </div>
        <div class="form-item">
          <span>Bio</span>
          <textarea
            type="text"
            class="form-control textarea"
            v-model="userData.bio"
          />
        </div>
        <button class="form-save" @click.prevent="updateUser">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      userData: {
        name: '',
        email: '',
        bio: '',
        picture: '',
      },
    };
  },
  mounted() {
    this.userData.name = this.user.name !== 'null' ? this.user.name : '';
    this.userData.email = this.user.email !== 'null' ? this.user.email : '';
    this.userData.bio = this.user.bio !== 'null' ? this.user.bio : '';
    this.userData.picture = this.user.picture;
  },
  methods: {
    ...mapActions(['UPDATE_USER']),
    updateUser() {
      this.UPDATE_USER(this.userData).then(() => {
        alert('회원정보 수정 완료');
      });
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  color: #172b4d;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-top: 28px;
  font-weight: 500;
  line-height: 26px;
  margin-top: 40px;
}
.about-wrap {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  .profile-avatar {
    color: #172b4d;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-right: 4px;
    margin-top: 16px;
    .avatar-wrap {
      width: 110px;
      height: 110px;
      position: relative;
      line-height: 10px;
      overflow: hidden;
      white-space: nowrap;
      border-radius: 50%;
      background: #339af0;
      cursor: pointer;
      &:hover {
        .change {
          display: inline-block;
        }
      }
      .img {
        width: 110px;
        height: 110px;
        position: relative;
      }
      .fa-user {
        background: #339af0;
        position: relative;
        top: 22px;
        left: 25px;
        color: #fff;
        height: 60px;
        width: 60px;
      }
      .change {
        position: absolute;
        display: none;
        padding: 6px 30px 30px 30px;
        bottom: 0%;
        left: 0;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        text-decoration: underline;
      }
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    flex: 0 0 355px;
    .form-item {
      margin-bottom: 20px;
      span {
        color: #172b4d;
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        margin-left: 5px;
        margin-bottom: 10px;
      }
      .input {
        outline: none;
        border: none;
        box-sizing: border-box;
        color: #172b4d;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        border-radius: 3px;
        padding: 8px 12px;
        box-shadow: inset 0 0 0 2px #dfe1e6;
        background-color: #fafbfc;
        margin-bottom: 10px;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }
      .textarea {
        border-radius: 3px;
        padding: 8px 12px;
        box-shadow: inset 0 0 0 2px #dfe1e6;
        background-color: #fafbfc;
        resize: none;
        height: 100px;
        color: #172b4d;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
        margin-bottom: 10px;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
    .form-save {
      height: 30px;
      &:hover {
        background: #60bd4e;
      }
    }
  }
}
</style>
