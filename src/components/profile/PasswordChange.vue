<template>
  <div>
    <h3 class="title">Change Password</h3>
    <hr />
    <div class="change-wrap">
      <form class="form">
        <div class="form-item">
          <span>현재 비밀번호</span>
          <input
            type="password"
            class="form-control input"
            v-model="currentPw"
          />
        </div>
        <div class="form-item">
          <span>새로운 비밀번호</span>
          <input type="password" class="form-control input" v-model="newPw" />
        </div>
        <div class="form-item">
          <span>비밀번호 재입력</span>
          <input type="password" class="form-control input" v-model="againPw" />
        </div>
        <button class="form-save" @click.prevent="change">
          비밀번호 변경하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus.js';
import { validatePw } from '@/utils/validation';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      currentPw: '',
      newPw: '',
      againPw: '',
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['CHANGE_PASSWORD']),
    change() {
      bus.$emit('start:spinner');
      if (this.user.id === 'test') {
        alert('test 아이디는 비밀변호 변경이 불가능 합니다.');
        bus.$emit('end:spinner');
        return;
      }
      if (this.newPw !== this.againPw) {
        alert(
          '입력하신 새로운 비밀번호와 재입력 비밀번호가 일치하지 않습니다.',
        );
        bus.$emit('end:spinner');
        return;
      }

      this.validatePw(this.newPw);
      if (this.currentPw === this.newPw) {
        alert(
          '현재 비밀번호와 새로운 비밀번호가 일치합니다. 다른 비밀번호를 입력해주세요.',
        );
        bus.$emit('end:spinner');
        return;
      }

      this.CHANGE_PASSWORD({
        currentPw: this.currentPw,
        newPw: this.newPw,
      }).then(() => {
        alert('비밀번호 변경 완료');
      });
    },
    validatePw(pw) {
      let pwValid = validatePw(pw);
      if (!pwValid[0]) {
        alert(pwValid[1]);
        this.newPw = '';
        this.againPw = '';
        bus.$emit('end:spinner');
      }
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
  text-align: center;
}
.change-wrap {
  display: flex;
  justify-content: center;
  .form {
    display: flex;
    flex-direction: column;
    flex: 0 0 355px;
    margin-top: 30px;
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
