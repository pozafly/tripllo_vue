<template>
  <main>
    <div class="container">
      <div class="push_container" v-if="push.pushYn">
        <div class="push_box">
          <span>{{ push.message }}</span>
        </div>
      </div>
      <span class="sign_up_text"><b>Sign up to Tripllo</b></span>
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
            type="text"
            placeholder="Enter password"
            v-model="userData.password"
          />
          <input
            class="submit_item"
            type="text"
            placeholder="Enter password again"
            v-model="userData.againPassword"
          />
          <input
            class="submit_item"
            type="text"
            placeholder="Enter email"
            v-model="userData.email"
          />
          <input
            class="submit_item"
            type="text"
            placeholder="Enter name"
            v-model="userData.name"
          />
          <button class="submit_item btn" type="submit">
            <b>Sign Up</b>
          </button>
        </div>
      </form>
      <div class="text">OR</div>
      <div class="external_login_container">
        <button class="external_item">
          <img src="@/assets/user/logo/google.png" />
          <b> Continue with Google</b>
        </button>
        <button class="external_item">
          <img src="@/assets/user/logo/facebook.png" />
          <b> Continue with FaceBook</b>
        </button>
        <button class="external_item">
          <img src="@/assets/user/logo/kakao.png" />
          <b> Continue with KakaoTalk</b>
        </button>
      </div>
      <div class="sign_up">
        <span @click="goToLogin" class="go_to_login">Go to Login</span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        id: '',
        password: '',
        againPassword: '',
        email: '',
        name: '',
      },
      push: {
        pushYn: false,
        message: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await createUser(this.userData);
        console.log(response);
        // this.$router();
      } catch ({ response }) {
        console.log(response);
        this.push.pushYn = true;
        this.push.message = response.data.message;
      }
    },
    validUserId() {
      this.$store.dispatch('VALIDID', this.userData.id);
    },
    goToLogin() {
      this.$emit('changeForm');
    },
  },
  watch: {
    userData: {
      deep: true,
      id: function() {
        console.log(1);
        // this.validUserId();
      },
    },
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
img {
  width: 1.3rem;
  padding-right: 0.3rem;
}
.container {
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 23rem;
  padding: 2rem;
}
.container .sign_up_text {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  color: #5e6c84;
}
.container .submit_items {
  display: flex;
  flex-direction: column;
  height: 20rem;
  justify-content: space-around;
}
.container .submit_items .submit_item {
  height: 2.3rem;
}
.container .text {
  text-align: center;
  font-size: 0.8rem;
  margin-top: 1rem;
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
  font-size: 0.8rem;
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
