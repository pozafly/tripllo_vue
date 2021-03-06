<template>
  <article class="container">
    <aside v-if="push.pushYn" class="push-container">
      <div class="push-box">
        <span>{{ push.message }}</span>
      </div>
    </aside>
    <header>
      <h2 class="login-text"><strong>Login to Tripllo</strong></h2>
    </header>
    <form @submit.prevent="submitForm">
      <div class="submit-items">
        <input
          v-model="userData.id"
          class="submit-item"
          type="text"
          placeholder="Enter id"
        />
        <input
          v-model="userData.password"
          class="submit-item"
          type="password"
          placeholder="Enter password"
        />
        <button class="submit-item btn" type="submit" :disabled="btnDisabled">
          <b>Log in</b>
        </button>
      </div>
    </form>
    <div v-show="isSocialForm">
      <div class="text">OR</div>
      <div class="external-items">
        <div id="google-login-btn">
          <button class="external-item" type="button">
            <img src="@/assets/user/logo/google.png" alt="google login" />
            <b> Continue with Google</b>
          </button>
        </div>
        <button
          class="external-item"
          type="button"
          @click="socialLogin('facebook')"
        >
          <img src="@/assets/user/logo/facebook.png" alt="facebook login" />
          <b> Continue with Facebook</b>
        </button>
        <button
          class="external-item"
          type="button"
          @click="socialLogin('kakao')"
        >
          <img src="@/assets/user/logo/kakao.png" alt="kakaotalk login" />
          <b> Continue with KakaoTalk</b>
        </button>
      </div>
    </div>
    <div class="sign_up">
      <router-link to="/auth/signup" class="go_to_signup">
        Do you want to Sign up?
      </router-link>
      <span class="middle-text"> | </span>
      <router-link to="/auth/findPassword" class="go_to_signup">
        Lost your password?
      </router-link>
    </div>
  </article>
</template>

<script>
import { isEmpty } from '@/utils/libs';
import { mapActions } from 'vuex';
import { getUserFromLocalStorage } from '@/utils/webStorage';

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
        isEmpty(e.id) && isEmpty(e.password)
          ? (this.isSocialForm = true)
          : (this.isSocialForm = false);

        e.id !== '' && e.password !== ''
          ? (this.btnDisabled = false)
          : (this.btnDisabled = true);
      },
      deep: true,
    },
  },

  created() {
    this.googleLoad();
  },

  mounted() {
    this.afterPushEmail();
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

    afterPushEmail() {
      if (this.$route.params) {
        this.userData.id = this.$route.params.id;
      }
    },

    googleLoad() {
      this.$loadScript(`https://apis.google.com/js/api:client.js`)
        .then(() => {
          this.$_Google.init();
        })
        .catch(error => {
          console.log(error);
          alert('구글 로그인 서버와의 연동에 실패했습니다.');
        });
    },

    socialLogin(social) {
      if (getUserFromLocalStorage()) {
        alert('이미 로그인 되어 있습니다.');
        this.$router.push('/main');
      } else {
        social === 'kakao' ? this.$_Kakao.login() : this.$_Facebook.login();
      }
    },
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
    .external-item {
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
      cursor: pointer;
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
