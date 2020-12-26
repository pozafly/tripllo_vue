<template>
  <div class="container">
    <div class="push_container" v-if="push.pushYn">
      <div class="push_box">
        <span>{{ push.message }}</span>
      </div>
    </div>
    <span class="login_text"><b>Login to Tripllo</b></span>
    <form @submit.prevent="submitForm">
      <div class="submit_items">
        <input
          class="submit_item"
          type="text"
          placeholder="Enter id"
          v-model="userData.id"
        />
        <input
          class="submit_item"
          type="password"
          placeholder="Enter password"
          v-model="userData.password"
        />
        <button class="submit_item btn" type="submit" :disabled="btnDisabled">
          <b>Log in</b>
        </button>
      </div>
    </form>
    <div class="text">OR</div>
    <div class="external_login_container" v-if="anotherFormYn">
      <GoogleLogin
        class="external_item"
        :params="googleParams"
        :onSuccess="googleSuccess"
      >
        <img src="@/assets/user/logo/google.png" />
        <b> Continue with Google</b>
      </GoogleLogin>
      <button class="external_item" @click="githubLogin">
        <img src="@/assets/user/logo/github.png" />
        <b> Continue with Github</b>
      </button>
      <div id="naverIdLogin"></div>
      <button class="external_item" @click="kakaoLogin">
        <img src="@/assets/user/logo/kakao.png" />
        <b> Continue with KakaoTalk</b>
      </button>
    </div>
    <div class="sign_up">
      <router-link to="/user/signup" class="go_to_signup">
        Do you want to Sign up?
      </router-link>
    </div>
  </div>
</template>

<script>
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
      googleParams: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
      anotherFormYn: true,
    };
  },
  watch: {
    userData: {
      handler(e) {
        e.id === '' && e.password === ''
          ? (this.anotherFormYn = true)
          : (this.anotherFormYn = false);

        e.id !== '' && e.password !== ''
          ? (this.btnDisabled = false)
          : (this.btnDisabled = true);
      },
      deep: true,
    },
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('LOGIN', this.userData);
        this.$router.push('/main');
      } catch ({ response }) {
        this.push.pushYn = true;
        this.push.message = response.data.message;
      }
    },
    googleSuccess(googleUser) {
      alreadyLoginCheck();
      this.$Google.login(googleUser);
    },
    githubLogin: async function() {
      alreadyLoginCheck();
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.VUE_APP_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:8080/user/login&scope=user`;
    },
    kakaoLogin() {
      alreadyLoginCheck();
      this.$Kakao.login();
    },
    alreadyLoginCheck() {
      if (localStorage.getItem('token')) {
        alert('이미 로그인 되어 있습니다.');
        this.$router.push('/main');
      }
    },
  },
  mounted() {
    if (this.$route.query.code) {
      this.$Github.signup(this.$route.query.code);
    }
  },
};
</script>

<style scoped>
/* * {
  border: 1px solid black;
} */
button {
  border: 0;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
}
.btn {
  background: #5aac44;
  color: white;
}
.btn:hover {
  background: #60bd4e;
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
}
.container .login_text {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  color: #5e6c84;
}
.container .submit_items {
  display: flex;
  flex-direction: column;
  height: 11rem;
  justify-content: space-around;
}
.container .submit_items .submit_item {
  height: 2.3rem;
}
.container .submit_items .submit_item:disabled {
  background: #ccc;
  cursor: default;
}
.container .text {
  text-align: center;
  font-size: 0.8rem;
  margin-top: 1rem;
}
img {
  width: 1.3rem;
  padding-right: 0.3rem;
}
.container .external_login_container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10rem;
  margin-top: 1rem;
}
.container .external_login_container .external_item {
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
}
.container .external_login_container .external_item:hover {
  background-color: #f9fafc;
}
.container .sign_up {
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
  font-size: 0.92rem;
  color: #0282ce;
}
.container .sign_up:hover {
  cursor: pointer;
  color: #3fc1c9;
}
.push_container {
  display: flex;
  height: 2rem;
  padding-bottom: 1.2rem;
}
.push_box {
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  border-radius: 4px;
  background-color: #eb5a46;
  color: #fff;
  font-size: 0.875rem;
  justify-content: center;
}
</style>
