<template>
  <MiniModal @close="$emit('noInviteClose')">
    <div slot="header" class="header-text">Invite</div>
    <div slot="content">
      <div class="content-text">Search Member</div>
      <input
        v-model="inputId"
        v-focus
        type="text"
        class="form-control invite-title"
        spellcheck="false"
        placeholder="Write you want Member Id..."
      />
      <div v-for="member in memberList" :key="member.id">
        <ul>
          <InviteModalList
            v-if="invitedUserFiler(member)"
            v-bind="member"
            @close="
              ({ memberId, boardTitle }) => inviteUser({ memberId, boardTitle })
            "
          />
          <!-- 위의 v-if는 자신의 id, 또 이미 이 보드에 초대 된 사람의 id가 조회되지 못하게 막은 것임 -->
        </ul>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </MiniModal>
</template>

<script>
import InviteModalList from '@/components/board/boardHeader/boardInvite/InviteModalList.vue';
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    InviteModalList,
  },

  data() {
    return {
      inputId: '',
      memberList: [],
      errorMessage: '',
    };
  },

  computed: {
    ...mapState(['card', 'user', 'board']),
  },

  watch: {
    inputId: _.debounce(function(id) {
      this.errorMessage = '';
      if (id === '') {
        this.memberList = [];
      } else {
        this.READ_IS_INVITE_USER_FOR_INVITE_MODAL(id)
          .catch(({ response }) => {
            if (response.status === 404) {
              this.errorMessage = '해당 유저가 없습니다.';
              this.memberList = [];
            } else {
              alert('알 수 없는 오류 발생');
            }
          })
          .then(({ data }) => {
            this.memberList = data.data;
          });
      }
    }, 750),
  },

  methods: {
    ...mapActions(['READ_IS_INVITE_USER_FOR_INVITE_MODAL']),

    invitedUserFiler(member) {
      if (this.board.invitedUser) {
        return (
          !this.board.invitedUser.includes(member.id) &&
          this.user.id !== member.id &&
          this.board.createdBy !== member.id
        );
      } else {
        return this.user.id !== member.id;
      }
    },

    inviteUser({ memberId, boardTitle }) {
      this.$emit('close');
      this.$notify({
        group: 'custom-template',
        duration: 5000,
        title: '초대 완료!',
        closeOnClick: true,
        text: `${memberId}님에게 ${boardTitle} 보드를 초대했습니다.`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.invite-title {
  border: 1px solid black;
  margin-top: 11px;
}
.checklist-btn {
  width: 50px;
  height: 30px;
  &:hover {
    filter: brightness(90%);
  }
}
.error-message {
  color: red;
}
</style>
