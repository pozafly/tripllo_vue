<template>
  <SideBase @close="$emit('noInviteClose')">
    <div slot="header" class="header-text">Invite</div>
    <div slot="content">
      <div class="content-text">Search Member</div>
      <input
        type="text"
        class="form-control invite-title"
        v-model="inputId"
        ref="inputId"
        spellcheck="false"
        placeholder="Write you want Member Id..."
      />
      <div v-for="member in memberList" :key="member.id">
        <ul>
          <InviteDetail
            :member="member"
            @close="
              ({ memberId, boardTitle }) =>
                $emit('close', { memberId, boardTitle })
            "
            v-if="member.id !== user.id"
          />
        </ul>
      </div>
    </div>
  </SideBase>
</template>

<script>
import SideBase from '@/components/card/cardDetail/side/SideBase';
import InviteDetail from './InviteDetail';
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    SideBase,
    InviteDetail,
  },
  data() {
    return {
      inputId: '',
      memberList: [],
    };
  },
  watch: {
    inputId: _.debounce(function(id) {
      if (id === '') this.memberList = [];
      this.READ_INVITE_USER(id)
        .then(({ data }) => {
          this.memberList = data.data;
        })
        .catch(e => {
          this.memberList = [];
        });
    }, 750),
  },
  computed: {
    ...mapState(['card', 'user']),
  },
  mounted() {
    this.$refs.inputId.focus();
  },
  methods: {
    ...mapActions(['READ_INVITE_USER']),
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
