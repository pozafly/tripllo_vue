<template>
  <main>
    <div class="container">
      <div class="push-conatiner" v-if="push.pushYn">
        <div class="push-box">
          <span>{{ push.message }}</span>
        </div>
      </div>
      <span class="sign-up-text"><b>Sign up to Tripllo</b></span>
      <form @submit.prevent="submitForm">
        <div class="submit-items">
          <input
            class="submit-item"
            type="text"
            placeholder="Enter id"
            v-model="userData.id"
            ref="submitBtn"
          />
          <input
            class="submit-item"
            type="password"
            placeholder="Enter password"
            v-model="userData.password"
          />
          <input
            class="submit-item"
            type="password"
            placeholder="Enter password again"
            v-model="againPassword"
          />
          <input
            class="submit-item"
            type="text"
            placeholder="Enter email"
            v-model="userData.email"
          />
          <input
            class="submit-item"
            type="text"
            placeholder="Enter name"
            v-model="userData.name"
          />
          <button class="submit-item btn" type="submit" :disabled="btnDisabled">
            <b>Sign Up</b>
          </button>
        </div>
      </form>
      <template v-if="anotherFormYn">
        <div class="text">OR</div>
        <div class="external-items">
          <GoogleLogin
            class="external-item"
            :params="googleParams"
            :onSuccess="googleSuccess"
          >
            <img src="@/assets/user/logo/google.png" />
            <b> Continue with Google</b>
          </GoogleLogin>
          <button class="external-item" @click="githubSignup">
            <img src="@/assets/user/logo/github.png" />
            <b> Continue with Github</b>
          </button>
          <button class="external-item" @click="kakaoSignup">
            <img src="@/assets/user/logo/kakao.png" />
            <b> Continue with KakaoTalk</b>
          </button>
        </div>
      </template>
      <div class="login">
        <router-link to="/auth/login">
          Already have an account? Log In
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import _ from 'lodash';
import { validateId, validatePw, validateEmail } from '@/utils/validation';
import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      userData: {
        id: '',
        password: '',
        email: '',
        name: '',
      },
      againPassword: '',
      push: {
        pushYn: false,
        message: '',
      },
      btnDisabled: true,
      anotherFormYn: true,
      googleParams: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
    };
  },
  watch: {
    userData: {
      handler(e) {
        e.id === '' && e.password === '' && e.email === '' && e.name === ''
          ? (this.anotherFormYn = true)
          : (this.anotherFormYn = false);

        e.id !== '' && e.password !== '' && e.email !== '' && e.name !== ''
          ? (this.btnDisabled = false)
          : (this.btnDisabled = true);
      },
      deep: true,
    },
    'userData.id': _.debounce(function(e) {
      this.validUserId(e);
    }, 750),
    'userData.password': _.debounce(function(e) {
      this.validatePw(e);
    }, 750),
    againPassword: _.debounce(function(e) {
      this.validateAgainPw(e);
    }, 750),
    'userData.email': _.debounce(function(e) {
      this.validateEmail(e);
    }, 750),
  },
  methods: {
    ...mapActions(['SIGNUP', 'LOGIN', 'VALID_ID']),
    async submitForm() {
      try {
        await this.SIGNUP(this.userData);
        await this.LOGIN({
          id: this.userData.id,
          password: this.userData.password,
        });
        this.$router.push('/main');
      } catch ({ response }) {
        console.log(response);
        this.pushInsert(response.data.message);
      }
    },
    async validUserId(id) {
      // lodash logic
      if (!validateId(id)) {
        this.pushInsert(
          '아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다.',
        );
      } else {
        try {
          await this.VALID_ID(id);
          this.push.pushYn = false;
        } catch ({ response }) {
          this.pushInsert(response.data.message);
        }
      }
    },
    validatePw(pw) {
      let pwValid = validatePw(pw);
      if (!pwValid[0]) {
        this.pushInsert(pwValid[1]);
      } else {
        this.push.pushYn = false;
      }
    },
    validateAgainPw(pw) {
      const realPw = this.userData.password;
      const againPw = this.againPassword;
      if (realPw !== againPw) {
        this.pushInsert('다시 입력한 비밀번호가 같지 않습니다.');
      } else {
        this.push.pushYn = false;
      }
    },
    validateEmail(email) {
      if (!validateEmail(email)) {
        this.pushInsert('이메일 유형에 맞지 않습니다.');
      } else {
        this.push.pushYn = false;
      }
    },
    pushInsert(message) {
      this.push.pushYn = true;
      this.push.message = message;
    },
    googleSuccess(googleUser) {
      if (localStorage.getItem('user_token')) {
        alert('이미 로그인 되어 있습니다.');
        this.$router.push('/main');
      } else {
        this.$Google.signup(googleUser);
      }
    },
    async githubSignup() {
      if (localStorage.getItem('user_token')) {
        alert('이미 로그인 되어 있습니다.');
        this.$router.push('/main');
      } else {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.VUE_APP_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:8080/user/login&scope=user`;
      }
    },
    kakaoSignup() {
      if (localStorage.getItem('user_token')) {
        alert('이미 로그인 되어 있습니다.');
        this.$router.push('/main');
      } else {
        this.$Kakao.signup();
      }
    },
  },
};
</script>

<style scoped lang="scss">
img {
  width: 1.3rem;
  padding-right: 0.3rem;
}
.container {
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 19px;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 23rem;
  padding: 2rem;
  .push-conatiner {
    display: flex;
    height: 2rem;
    padding-bottom: 1.2rem;
    height: 4rem;
    .push-box {
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      border-radius: 4px;
      background-color: #eb5a46;
      color: #fff;
      font-size: 0.875rem;
      justify-content: center;
      height: 2.5rem;
    }
  }
  .sign-up-text {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    color: #5e6c84;
  }
  .submit-items {
    display: flex;
    flex-direction: column;
    height: 20rem;
    justify-content: space-around;
  }
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
      &:hover {
        background-color: #f9fafc;
      }
    }
  }
  .login {
    margin-top: 1.2rem;
    padding-top: 1.2rem;
    border-top: 1px solid #e6e6e6;
    display: flex;
    justify-content: center;
    font-size: 0.92rem;
  }
}
</style>