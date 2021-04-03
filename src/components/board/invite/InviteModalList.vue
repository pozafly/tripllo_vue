<template>
  <div class="invite-wrap" @click="inviteMember">
    <div class="profile-wrap">
      <img
        v-if="member.picture !== null && member.picture !== 'null'"
        ref="img"
        class="invite-img"
      />
      <div v-else class="invite-icon">
        <awesome icon="user" class="fas fa-user svg"></awesome>
      </div>
    </div>
    <span>@{{ member.id }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    member: {
      type: Object,
      require: true,
      default: () => ({
        id: '',
        picture: '',
      }),
    },
  },

  computed: {
    ...mapState(['socket', 'board', 'user']),
  },

  mounted() {
    this.setImage();
  },

  methods: {
    setImage() {
      this.$nextTick(() => {
        if (this.$refs.img) {
          this.$refs.img.src = this.member.picture;
        }
      });
    },
    inviteMember() {
      let push = confirm(
        `@${this.member.id} 님에게 ${this.board.title} 보드로 초대하시겠습니까?`,
      );
      if (push) {
        // 소켓으로 초대 메세지 보내기.
        console.log(this.member.id + '초대완료');
        this.socket.send(
          JSON.stringify({
            userId: this.user.id,
            target: this.member.id,
            content: `@${this.user.id}님이 '${this.board.title}' 보드에 초대합니다.`,
            boardId: this.board.id,
          }),
        );
        this.$emit('close', {
          memberId: this.member.id,
          boardTitle: this.board.title,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.invite-wrap {
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  .profile-wrap {
    display: flex;
    width: 40px;
    height: 40px;
    background: cornsilk;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-right: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .invite-img {
      width: 40px;
      height: 40px;
      display: inline;
      border-radius: 50%;
      cursor: auto;
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
