<template>
  <div class="container">
    <div class="push-container" v-if="push.pushYn">
      <div class="push-box">
        <span>{{ push.message }}</span>
      </div>
    </div>
    <span class="login-text"><b>Login to Tripllo</b></span>
    <form @submit.prevent="submitForm">
      <div class="submit-items">
        <input
          class="submit-item"
          type="text"
          placeholder="Enter id"
          v-model="userData.id"
        />
        <input
          class="submit-item"
          type="password"
          placeholder="Enter password"
          v-model="userData.password"
        />
        <button class="submit-item btn" type="submit" :disabled="btnDisabled">
          <b>Log in</b>
        </button>
      </div>
    </form>
    <template v-if="isSocialForm">
      <div class="text">OR</div>
      <div class="external-items">
        <GoogleLogin
          class="external_item"
          :params="googleParams"
          :onSuccess="googleSuccess"
        >
          <img src="@/assets/user/logo/google.png" />
          <b> Continue with Google</b>
        </GoogleLogin>
        <button class="external_item" @click="facebookLogin">
          <img src="@/assets/user/logo/facebook.png" />
          <b> Continue with Facebook</b>
        </button>
        <button class="external_item" @click="kakaoLogin">
          <img src="@/assets/user/logo/kakao.png" />
          <b> Continue with KakaoTalk</b>
        </button>
      </div>
    </template>
    <div class="sign_up">
      <router-link to="/auth/signup" class="go_to_signup">
        Do you want to Sign up?
      </router-link>
      <span class="middle-text"> | </span>
      <router-link to="/auth/findPassword" class="go_to_signup">
        Lost your password?
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      userData: {
        id: '',
        password: '',
      },
      push: {
        pushYn: false,
        message: '',
      },
      btnDisabled: true,
      googleParams: { client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID },
      isSocialForm: true,
    };
  },
  watch: {
    userData: {
      handler(e) {
        e.id === '' && e.password === ''
          ? (this.isSocialForm = true)
          : (this.isSocialForm = false);

        e.id !== '' && e.password !== ''
          ? (this.btnDisabled = false)
          : (this.btnDisabled = true);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(['LOGIN']),
    async submitForm() {
      try {
        await this.LOGIN(this.userData);
        this.$router.push('/main');
      } catch ({ response }) {
        this.push.pushYn = true;
        this.push.message = response.data.message;
      }
    },
    async googleSuccess(googleUser) {
      if (localStorage.getItem('user_token')) {
        alert('이미 로그인 되어 있습니다.');
        this.$router.push('/main');
      } else {
        this.$Google.login(googleUser);
      }
    },
    facebookLogin: async function() {
      if (localStorage.getItem('user_token')) {
        alert('이미 로그인 되어 있습니다.');
        this.$router.push('/main');
      } else {
        this.$Facebook.login();
      }
    },
    kakaoLogin() {
      if (localStorage.getItem('user_token')) {
        alert('이미 로그인 되어 있습니다.');
        this.$router.push('/main');
      } else {
        this.$Kakao.login();
      }
    },
  },
  mounted() {
    // if (this.$route.query.code) {
    //   this.$Github.signup(this.$route.query.code);
    // }
  },
};
</script>

<style scoped lang="scss">
.container {
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 19px;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 23rem;
  padding: 2rem;
  .push-container {
    display: flex;
    height: 2rem;
    padding-bottom: 1.2rem;
    .push-box {
      display: flex;
      flex-direction: column;
      padding: 0 16px;
      border-radius: 4px;
      background-color: #eb5a46;
      color: #fff;
      font-size: 0.875rem;
      justify-content: center;
    }
  }
  .login-text {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    color: #5e6c84;
  }
  .submit-items {
    display: flex;
    flex-direction: column;
    height: 11rem;
    justify-content: space-around;
    .submit-item {
      height: 2.3rem;
      &.btn {
        background: #5aac44;
        color: white;
        &:hover {
          background: #60bd4e;
        }
        &:disabled {
          background: #ccc;
          cursor: default;
        }
      }
    }
  }
  .text {
    text-align: center;
    font-size: 0.8rem;
    margin-top: 1rem;
  }
  .external-items {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 10rem;
    margin-top: 1rem;
    .external_item {
      background: #fff;
      color: rgba(0, 0, 0, 0.54);
      box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
      border-color: transparent;
      border-radius: 3px;
      width: 99%;
      height: 39px;
      padding-top: 0;
      margin-bottom: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #f9fafc;
      }
      img {
        width: 1.3rem;
        padding-right: 0.3rem;
      }
    }
  }
  .sign_up {
    margin-top: 1.2rem;
    padding-top: 1.2rem;
    border-top: 1px solid #e6e6e6;
    display: flex;
    justify-content: center;
    font-size: 0.92rem;
    .middle-text {
      margin: 0 13px;
      color: #5e6c84;
    }
  }
}
</style>
