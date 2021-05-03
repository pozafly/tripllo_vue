<template>
  <div class="invite-wrap" @click="inviteMember">
    <div class="profile-wrap">
      <img
        v-if="memberPicture !== null && memberPicture !== 'null'"
        ref="img"
        class="invite-img"
      />
      <div v-else class="invite-icon">
        <awesome icon="user" class="fas fa-user svg"></awesome>
      </div>
    </div>
    <span>@{{ memberId }}</span>
  </div>
</template>

<script>
import { socketSend } from '@/utils/socket';
import { mapState } from 'vuex';

export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
      default: '',
      validator(value) {
        return typeof value === 'string' || typeof value === 'number';
      },
    },
    picture: {
      type: String,
      required: true,
      default: '',
      validator(value) {
        return typeof value === 'string';
      },
    },
  },

  computed: {
    ...mapState(['board', 'user']),
    memberId() {
      return this.id;
    },
    memberPicture() {
      return this.picture;
    },
  },

  mounted() {
    this.setImage();
  },

  methods: {
    setImage() {
      if (this.$refs.img) {
        this.$refs.img.src = this.memberPicture;
      }
    },

    inviteMember() {
      let push = confirm(
        `@${this.memberId} 님에게 ${this.board.title} 보드로 초대하시겠습니까?`,
      );
      if (push) {
        // 소켓으로 초대 메세지 보내기.
        socketSend(
          JSON.stringify({
            userId: this.user.id,
            target: this.memberId,
            content: `@${this.user.id}님이 '${this.board.title}' 보드에 초대합니다.`,
            boardId: this.board.id,
          }),
        );
        console.log(this.memberId + '초대완료');
        this.$emit('close', {
          memberId: this.memberId,
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
