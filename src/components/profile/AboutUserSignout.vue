<template>
  <section>
    <header>
      <h3 class="title">Signout</h3>
    </header>
    <div class="about-wrap">
      <button
        class="signout-btn"
        type="button"
        @click="() => (isDelete = true)"
      >
        Signout
      </button>
      <div v-if="isDelete" class="delete-modal">
        <template v-if="!isSocial">
          <MiniModal @close="modalClose">
            <div slot="header" class="header-text">SIGNOUT</div>
            <div slot="content">
              <span>
                정말 탈퇴 하시겠습니까? <br />
                탈퇴를 원하시면 비밀번호를 입력 후 <b>Enter</b>를 눌러주세요.
              </span>
              <input
                v-model="password"
                v-focus
                type="password"
                class="form-control input"
                @keypress.enter="deleteUser"
              />
              <button
                class="delete-moal-btn remove-btn-nomal"
                type="button"
                @click="modalClose"
              >
                탈퇴취소
              </button>
            </div>
          </MiniModal>
        </template>
        <template v-else>
          <MiniModal @close="modalClose">
            <div slot="header" class="header-text">SIGNOUT</div>
            <div slot="content">
              <span>
                정말 탈퇴 하시겠습니까? <br />
                탈퇴를 원하시면 자신의 ID를 입력 후 <b>탈퇴</b>를 눌러주세요.
              </span>
              <input
                ref="input"
                v-model="password"
                v-focus
                type="password"
                class="form-control input"
                @input="validId"
              />
              <button
                class="delete-moal-btn remove-btn"
                :disabled="btnDisabled"
                type="button"
                @click="deleteUser"
              >
                탈퇴
              </button>
              <button
                class="delete-moal-btn remove-cancel-btn"
                type="button"
                @click="modalClose"
              >
                탈퇴취소
              </button>
            </div>
          </MiniModal>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      isDelete: false,
      password: '',
      btnDisabled: true,
    };
  },

  computed: {
    ...mapState(['user']),

    isSocial() {
      if (this.user.social !== null) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    ...mapActions(['SIGNOUT']),

    modalClose() {
      this.password = '';
      this.isDelete = false;
    },

    async deleteUser() {
      if (this.password === '') {
        return;
      }

      try {
        await this.SIGNOUT(this.password);
        this.password = '';
        this.isDelete = false;
        alert('회원 탈퇴 완료');
        this.$router.push(`/auth`);
      } catch (error) {
        alert('회원이 탈퇴되지 않았습니다.');
        console.log(error);
      }
    },

    validId({ target }) {
      if (target.value === this.user.id) {
        this.btnDisabled = false;
      } else {
        this.btnDisabled = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  color: #172b4d;
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  margin-top: 50px;
}
.about-wrap {
  margin-top: 15px;
  .signout-btn {
    display: block;
    margin-top: -4px;
    width: 353px;
    height: 30px;
    background: #cf513d;
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
    &:hover {
      background: #eb5a46;
    }
  }
  .delete-modal {
    position: relative;
    left: 360px;
    top: -210px;
    .input {
      margin-top: 9px;
      width: 100%;
    }
    .delete-moal-btn {
      width: 80px;
      height: 37px;
      &.remove-btn {
        position: relative;
        right: -110px;
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
      &.remove-btn-nomal {
        position: relative;
        right: -195px;
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
      &.remove-cancel-btn {
        position: relative;
        right: -115px;
        background: #cf513d;
        &:hover {
          background: #eb5a46;
        }
      }
    }
  }
}
</style>
