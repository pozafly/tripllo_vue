<template>
  <MiniModal @close="$emit('noInviteClose')">
    <div slot="header" class="header-text">Invite</div>
    <div slot="content">
      <div class="content-text">Search Member</div>
      <input
        ref="inputId"
        v-model="inputId"
        type="text"
        class="form-control invite-title"
        spellcheck="false"
        placeholder="Write you want Member Id..."
      />
      <div v-for="member in memberList" :key="member.id">
        <ul>
          <InviteModalList
            v-if="invitedUserFiler(member)"
            :member="member"
            @close="
              ({ memberId, boardTitle }) =>
                $emit('close', { memberId, boardTitle })
            "
          />
          <!-- 위의 v-if는 자신의 id, 또 이미 이 보드에 초대 된 사람의 id가 조회되지 못하게 막은 것임 -->
        </ul>
      </div>
    </div>
  </MiniModal>
</template>

<script>
import InviteModalList from '@/components/board/invite/InviteModalList.vue';
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
    };
  },

  computed: {
    ...mapState(['card', 'user', 'board']),
  },

  watch: {
    inputId: _.debounce(function(id) {
      if (id === '') {
        this.memberList = [];
      }
      this.READ_IS_INVITE_USER(id)
        .then(({ data }) => {
          this.memberList = data.data;
        })
        .catch(e => {
          this.memberList = [];
        });
    }, 750),
  },

  mounted() {
    this.inputFocus();
  },

  methods: {
    ...mapActions(['READ_IS_INVITE_USER']),
    inputFocus() {
      this.$refs.inputId.focus();
    },
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
</style>
