<template>
  <li class="message-wrap">
    <span class="message-content">{{ message.content }}</span>
    <span class="message-time">{{ message.createdAt | timeForToday }}</span>
    <div>
      <button class="message-btn save-btn" type="button" @click="acceptMessage">
        수락
      </button>
      <button
        class="message-btn remove-btn"
        type="button"
        @click="rejectMessage"
      >
        거절
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    message: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ...mapState(['user']),
  },

  mounted() {
    this.setMessage();
  },

  methods: {
    ...mapActions([
      'UPDATE_PUSH_MESSAGE',
      'DELETE_PUSH_MESSAGE',
      'UPDATE_BOARD',
      'UPDATE_USER',
      'READ_BOARD_ONE',
    ]),
    setMessage() {
      if (this.message.isRead === 'Y') {
        return;
      }
      this.UPDATE_PUSH_MESSAGE({ id: this.message.id, isRead: 'Y' });
    },
    async acceptMessage() {
      const { data } = await this.READ_BOARD_ONE({
        boardId: this.message.boardId,
      });
      const preInviteUser = data.data.invitedUser;

      let invitedUser = [];
      if (preInviteUser !== 'null' && preInviteUser !== null) {
        invitedUser = JSON.parse(preInviteUser);
      }

      let invitedBoard = [];
      if (
        this.user.invitedBoard !== 'null' &&
        this.user.invitedBoard !== null
      ) {
        invitedBoard = JSON.parse(this.user.invitedBoard);
      }
      invitedBoard.push(this.message.boardId);

      if (!invitedUser.includes(this.user.id)) {
        invitedUser.push(this.user.id);
        const pushInviteUser = JSON.stringify(invitedUser);
        const pushInvitedBoard = JSON.stringify(invitedBoard);

        await this.UPDATE_BOARD({
          id: this.message.boardId,
          invitedUser: pushInviteUser,
        });
        await this.UPDATE_USER({
          id: this.user.id,
          invitedBoard: pushInvitedBoard,
        });
        await this.DELETE_PUSH_MESSAGE({ id: this.message.id });
        await this.$emit('close');
        await this.$router.push(`/board/${this.message.boardId}`);
      } else alert('이미 초대되어 있습니다.');
    },
    rejectMessage() {
      let confirm = window.confirm('해당 메세지를 삭제하시겠습니까?');
      if (confirm) {
        this.DELETE_PUSH_MESSAGE({ id: this.message.id });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.message-wrap {
  position: relative;
  padding: 4px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.08);
  margin-bottom: 4px;
  height: auto;
  .message-content {
    padding: 1px;
    display: block;
  }
  .message-time {
    position: relative;
    top: -13px;
    right: -225px;
  }
  .message-btn {
    position: relative;
    width: 65px;
    height: 25px;
    margin: 10px 5px 10px 0;
    right: -130px;
    &.save-btn {
      &:hover {
        background: #60bd4e;
      }
    }
    &.remove-btn {
      position: relative;
      /* right: -95px; */
      background: #cf513d;
      &:hover {
        background: #eb5a46;
      }
    }
  }
}
</style>
