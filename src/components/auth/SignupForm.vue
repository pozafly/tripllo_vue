<template>
  <article>
    <div class="container">
      <header>
        <h2 class="sign-up-text"><strong>Sign up to Tripllo</strong></h2>
      </header>
      <form @submit.prevent="submitForm">
        <div class="submit-items">
          <input
            ref="id"
            v-model="userData.id"
            v-focus
            class="submit-item"
            type="text"
            maxlength="20"
            placeholder="Enter id"
          />
          <input
            ref="password"
            v-model="userData.password"
            class="submit-item"
            type="password"
            placeholder="Enter password"
          />
          <input
            ref="againPassword"
            v-model="againPassword"
            class="submit-item"
            type="password"
            placeholder="Enter password again"
          />
          <input
            ref="email"
            v-model="userData.email"
            class="submit-item"
            type="text"
            placeholder="Enter email"
          />
          <input
            ref="name"
            v-model="userData.name"
            class="submit-item"
            type="text"
            placeholder="Enter name"
          />
          <button class="submit-item btn" type="submit" :disabled="btnDisabled">
            <b>Sign Up</b>
          </button>
        </div>
      </form>
      <aside v-if="push.pushYn" class="push-conatiner">
        <div class="push-box">
          <span>{{ push.message }}</span>
        </div>
      </aside>
      <div v-show="isSocialForm">
        <div class="text">OR</div>
        <div class="external-items">
          <div id="google-login-btn">
            <button class="external-item" type="button">
              <img src="@/assets/user/logo/google.png" alt="google signup" />
              <b> Continue with Google</b>
            </button>
          </div>
          <button
            class="external-item"
            type="button"
            @click="socialSignup('facebook')"
          >
            <img src="@/assets/user/logo/facebook.png" alt="facebook signup" />
            <b> Continue with Facebook</b>
          </button>
          <button
            class="external-item"
            type="button"
            @click="socialSignup('kakao')"
          >
            <img src="@/assets/user/logo/kakao.png" alt="kakaotalk signup" />
            <b> Continue with KakaoTalk</b>
          </button>
        </div>
      </div>
      <div class="login">
        <router-link to="/auth/login">
          Already have an account? Log In
        </router-link>
      </div>
    </div>
  </article>
</template>

<script>
import _ from 'lodash';
import {
  idValidCheck,
  passwordValidCheck,
  emailValidCheck,
  passwordAgainCheck,
} from '@/utils/validation';
import { signupAPI } from '@/api/auth';
import { getUserFromLocalStorage } from '@/utils/webStorage';
import { validIdAPI } from '@/api/auth';
import { mapActions } from 'vuex';

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
      valid: {
        id: false,
        password: false,
        againPassword: false,
        email: false,
      },
      btnDisabled: true,
      isSocialForm: true,
      googleParams: { client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID },
    };
  },

  watch: {
    userData: {
      handler(e) {
        e.id === '' && e.password === '' && e.email === '' && e.name === ''
          ? (this.isSocialForm = true)
          : (this.isSocialForm = false);

        e.id !== '' && e.password !== '' && e.email !== '' && e.name !== ''
          ? (this.btnDisabled = false)
          : (this.btnDisabled = true);
      },
      deep: true,
    },
    'userData.id': _.debounce(function(e) {
      this.validFunction('id', e);
    }, 750),
    'userData.password': _.debounce(function(e) {
      this.validFunction('password', e);
    }, 750),
    againPassword: _.debounce(function(e) {
      this.validFunction('againPassword', e);
    }, 750),
    'userData.email': _.debounce(function(e) {
      this.validFunction('email', e);
    }, 750),
  },

  created() {
    this.googleLoad();
  },

  methods: {
    ...mapActions(['LOGIN']),

    async submitForm() {
      const { valid } = this;

      if (valid.id === false) {
        alert('ID 조건을 확인하세요');
        this.$refs.id.focus();
        return;
      } else if (valid.password === false) {
        alert('Password 조건을 확인하세요');
        this.$refs.password.focus();
        return;
      } else if (valid.againPassword === false) {
        alert('password와 다시 입력한 password가 동일하지 않습니다.');
        this.$refs.againPassword.focus();
        return;
      } else if (valid.email === false) {
        alert('email 조건을 확인하세요');
        this.$refs.email.focus();
        return;
      }

      try {
        const isSignup = await signupAPI(this.userData);
        if (isSignup) {
          await this.LOGIN({
            id: this.userData.id,
            password: this.userData.password,
          });
          this.$router.push('/main');
        } else {
          alert('회원가입 실패');
        }
      } catch ({ response }) {
        this.pushInsert(response.data.message);
      }
    },

    validFunction(type, arg) {
      let result = {};
      switch (type) {
        case 'id':
          result = idValidCheck(arg);
          if (result.flag) {
            this.idCheckApi(arg);
          }
          break;
        case 'password':
          result = passwordValidCheck(arg);
          break;
        case 'againPassword':
          const realPw = this.userData.password;
          const againPw = this.againPassword;
          result = passwordAgainCheck(realPw, againPw);
          break;
        case 'email':
          result = emailValidCheck(arg);
          break;
      }
      if (result.flag) {
        this.push.pushYn = false;
        this.valid[type] = true;
      } else {
        this.pushInsert(result.message);
      }
    },

    async idCheckApi(id) {
      try {
        await validIdAPI(id);
        this.push.pushYn = false;
        this.valid.id = true;
      } catch ({ response }) {
        this.pushInsert(response.data.message);
      }
    },

    pushInsert(message) {
      this.push.pushYn = true;
      this.push.message = message;
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

    socialSignup(social) {
      if (getUserFromLocalStorage()) {
        alert('이미 로그인 되어 있습니다.');
        this.$router.push('/main');
      } else {
        social === 'kakao' ? this.$_Kakao.signup() : this.$_Facebook.signup();
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
    padding: 0.9rem 0;
    /* height: 4rem; */
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
      cursor: pointer;
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
