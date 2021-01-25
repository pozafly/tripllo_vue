<template>
  <div class="container">
    <span class="login-text"><b>Find Password</b></span>
    <form @submit.prevent="submitForm">
      <div class="submit-items">
        <input
          class="submit-item"
          type="text"
          placeholder="등록 되어있는 ID를 입력해주세요"
          v-model="userData.id"
        />
        <input
          class="submit-item"
          type="text"
          placeholder="등록 되어있는 Email을 입력해주세요"
          v-model="userData.email"
        />
        <button class="submit-item btn" type="submit" :disabled="btnDisabled">
          <b>비밀번호 재설정 이메일 보내기</b>
        </button>
      </div>
      <span class="refer-text">
        입력한 정보가 맞다면 해당 Email로 임시 비밀번호가 발송됩니다.
      </span>
    </form>
    <div class="sign_up">
      <router-link to="/auth/login">
        Back to Log In?
      </router-link>
      <span class="middle-text"> | </span>
      <router-link to="/auth/signup" class="go_to_signup">
        Do you want to Sign up?
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
        email: '',
      },
      btnDisabled: true,
    };
  },
  watch: {
    userData: {
      handler(e) {
        e.id !== '' && e.email !== ''
          ? (this.btnDisabled = false)
          : (this.btnDisabled = true);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(['SEND_EMAIL']),
    async submitForm() {
      console.log(this.userData);
      this.SEND_EMAIL({
        userId: this.userData.id,
        userEmail: this.userData.email,
      });
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
  .refer-text {
    position: relative;
    top: 4px;
    font-size: 13px;
    color: #5e6c84;
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
