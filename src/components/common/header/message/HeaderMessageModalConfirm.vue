<template>
  <li class="message-wrap">
    <span class="message-content">{{ content }}</span>
    <span class="message-time">{{ createdAt | timeForToday }}</span>
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
import { readBoardForAcceptMessageAPI, updateBoardAPI } from '@/api/board';
import { updateUserAPI } from '@/api/user';
import { updatePushMessageAPI, deletePushMessageAPI } from '@/api/pushMessage';
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    boardId: {
      type: Number,
      default: 0,
      required: true,
    },
    content: {
      type: String,
      required: true,
      default: '',
    },
    createdAt: {
      type: String,
      required: true,
      default: '',
    },
    isRead: {
      type: String,
      required: true,
      default: 'N',
      validator(value) {
        return ['Y', 'N'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    ...mapState(['user']),
  },

  mounted() {
    this.setMessage();
  },

  methods: {
    ...mapActions(['READ_USER', 'READ_PUSH_MESSAGE']),

    async setMessage() {
      if (this.isRead === 'Y') {
        return;
      }
      try {
        await updatePushMessageAPI({ id: this.id, isRead: 'Y' });
        await this.READ_PUSH_MESSAGE(this.user.id);
      } catch (error) {
        console.log(error);
        alert('푸시 메세지를 읽음으로 수정하지 못했습니다.');
      }
    },

    async acceptMessage() {
      let preInviteUser = null;
      try {
        const { data } = await readBoardForAcceptMessageAPI(this.boardId);
        preInviteUser = data.data.invitedUser;
      } catch (error) {
        console.log(error);
        alert('보드 정보를 가져오지 못해 초대 수락에 실패했습니다.');
      }

      let invitedUser = [];

      if (preInviteUser !== null) {
        invitedUser = JSON.parse(preInviteUser);
      }

      let invitedBoard = [];
      if (this.user.invitedBoard !== null) {
        invitedBoard = JSON.parse(this.user.invitedBoard);
      }
      invitedBoard.push(this.boardId);

      if (!invitedUser.includes(this.user.id)) {
        invitedUser.push(this.user.id);
        const pushInviteUser = JSON.stringify(invitedUser);
        const pushInvitedBoard = JSON.stringify(invitedBoard);

        this.updateBoardAndUser(pushInviteUser, pushInvitedBoard);
        this.$emit('close');
        this.$router.push(`/board/${this.boardId}`);
      } else {
        alert('이미 초대되어 있습니다.');
      }
    },

    async updateBoardAndUser(pushInviteUser, pushInvitedBoard) {
      try {
        await updateBoardAPI(this.boardId, { invitedUser: pushInviteUser });
        await updateUserAPI({
          id: this.user.id,
          invitedBoard: pushInvitedBoard,
        });
        await this.READ_USER(this.user.id);
        await deletePushMessageAPI(this.id);
      } catch (error) {
        console.log(error);
        alert('초대 수락에 실패했습니다.');
      }
    },

    async rejectMessage() {
      if (!window.confirm('해당 메세지를 삭제하시겠습니까?')) {
        return;
      }
      try {
        await deletePushMessageAPI(this.id);
        await this.READ_PUSH_MESSAGE(this.user.id);
      } catch (error) {
        console.log(error);
        alert('푸시 메세지를 삭제하지 못했습니다.');
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
