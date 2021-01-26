<template>
  <div>
    <h3 class="title">Signout</h3>
    <div class="about-wrap">
      <button class="signout-btn" @click="openDeleteModal">Signout</button>
      <div class="delete-modal" v-if="isDelete">
        <SideBase @close="modalClose">
          <div slot="header" class="header-text">SIGNOUT</div>
          <div slot="content">
            <span>
              정말 탈퇴 하시겠습니까? <br />
              탈퇴를 원하시면 비밀번호를 입력 후 Enter를 눌러주세요.
            </span>
            <input
              type="password"
              class="form-control input"
              ref="input"
              v-model="password"
              @keypress.enter="deleteUser"
            />
            <button class="delete-moal-btn remove-btn" @click="modalClose">
              탈퇴취소
            </button>
          </div>
        </SideBase>
      </div>
    </div>
  </div>
</template>

<script>
import SideBase from '@/components/card/cardDetail/side/SideBase';
import { mapActions, mapState } from 'vuex';

export default {
  components: { SideBase },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      isDelete: false,
      password: '',
    };
  },
  mounted() {},
  methods: {
    ...mapActions(['SIGNOUT']),
    modalClose() {
      this.password = '';
      this.isDelete = false;
    },
    deleteUser() {
      if (this.password === '') return;

      this.SIGNOUT(this.password)
        .then(() => {
          this.password = '';
          this.isDelete = false;
          alert('회원 탈퇴 완료');
          this.$router.push(`/auth`);
        })
        .catch(({ response }) => {
          if (response.data.status === 'BAD_REQUEST')
            alert(response.data.message);
        });
    },
    openDeleteModal() {
      this.isDelete = true;
      this.$nextTick(() => this.$refs.input.focus());
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
        right: -195px;
        background: #cf513d;
        &:hover {
          background: #eb5a46;
        }
      }
    }
  }
}
</style>
