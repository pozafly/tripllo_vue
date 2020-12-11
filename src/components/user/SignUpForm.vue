<template>
  <main>
    <div class="container">
      <div class="push_container" v-if="push.pushYn">
        <div class="push_box">
          <span>이미 존재하는 ID입니다..</span>
        </div>
      </div>
      <span class="sign_up_text"><b>Sign up to Tripllo</b></span>
      <form @submit.prevent="submitForm">
        <div class="submit_items">
          <input
            class="submit_item"
            type="text"
            placeholder="Enter id"
            v-model="id"
          />
          <input
            class="submit_item"
            type="text"
            placeholder="Enter password"
            v-model="password"
          />
          <input
            class="submit_item"
            type="text"
            placeholder="Enter email"
            v-model="email"
          />
          <input
            class="submit_item"
            type="text"
            placeholder="Enter name"
            v-model="name"
          />
          <button class="submit_item btn" type="submit">
            <b>Sign Up</b>
          </button>
        </div>
      </form>
      <div class="sign_up">
        <span @click="goToLogin" class="go_to_login">Go to Login</span>
      </div>
    </div>
  </main>
</template>

<script>
import { createUser } from '@/api/index';

export default {
  data() {
    return {
      id: '',
      password: '',
      email: '',
      name: '',
      response: '',
      push: {
        pushYn: false,
        pushText: '',
      },
    };
  },
  methods: {
    async submitForm() {
      const userData = {
        id: this.id,
        password: this.password,
        email: this.email,
        name: this.name,
      };
      try {
        const response = await createUser(userData);
        console.log(response);
        // $route();
      } catch ({ response }) {
        console.log(response);
        this.push.pushYn = true;
        this.push.pushText = response.data.message;
      }
    },
    goToLogin() {
      this.$emit('changeForm');
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
