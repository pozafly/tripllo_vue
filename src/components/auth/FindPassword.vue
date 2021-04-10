<template>
  <div class="container">
    <div class="icon-wrap">
      <awesome :icon="['far', 'meh']" class="find-icon"></awesome>
    </div>
    <span class="login-text"><b>로그인에 문제가 있나요?</b></span>
    <span class="sub-text">
      걱정하지 마세요! 가입한 ID와 Email을 입력하면<br />
      다시 로그인 할 수 있는 임시 비밀번호를 보내드립니다.
    </span>
    <form @submit.prevent="submitForm">
      <div class="submit-items">
        <input
          v-model="userData.id"
          v-focus
          class="submit-item"
          type="text"
          placeholder="등록 되어있는 ID를 입력해주세요"
        />
        <input
          v-model="userData.email"
          class="submit-item"
          type="text"
          placeholder="등록 되어있는 Email을 입력해주세요"
        />
        <button class="submit-item btn" type="submit" :disabled="btnDisabled">
          <b>임시 비밀번호 이메일 보내기</b>
        </button>
      </div>
    </form>
    <div class="sign_up">
      <router-link to="/auth/login"> Back to Log In? </router-link>
      <span class="middle-text"> | </span>
      <router-link to="/auth/signup" class="go_to_signup">
        Do you want to Sign up?
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import bus from '@/utils/bus';

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
      bus.$emit('start:spinner');
      const { id, email } = this.userData;
      this.SEND_EMAIL({
        userId: id,
        userEmail: email,
      })
        .then(data => {
          bus.$emit('end:spinner');
          alert(data.data.message);
          this.$router.push({ name: 'login', params: { id } });
        })
        .catch(({ response }) => {
          bus.$emit('end:spinner');
          alert(response.data.message);
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
  .icon-wrap {
    display: flex;
    justify-content: center;
    font-size: 90px;
    color: #5e6c84;
  }
  .login-text {
    text-align: center;
    font-size: 1.2rem;
    margin: 3rem 0 0.6rem;
    color: #5e6c84;
  }
  .sub-text {
    color: #5e6c84;
    margin: 0 0 3rem;
    text-align: center;
    word-break: keep-all;
    font-size: 13px;
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
