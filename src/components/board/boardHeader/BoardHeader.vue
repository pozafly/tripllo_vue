<template>
  <div class="board-header">
    <input
      v-if="isEditTitle"
      ref="inputTitle"
      v-model="inputTitle"
      v-focus
      class="form-control"
      type="text"
      maxlength="44"
      @keypress.enter="onKeyupEnter"
      @blur="onSubmitTitle"
    />
    <span v-else class="board-item" @click="onClickTitle">
      {{ board.title }}
    </span>

    <span class="board-item owner-user">
      <ProfileImage :board="board" />
    </span>

    <span v-if="isOwner" class="board-item">
      <DisclosureStatus :board-id="board.id" :public-yn="board.publicYn" />
    </span>

    <span
      v-if="board.publicYn === 'Y' && isOwner"
      class="board-item"
      @click="openInviteModal"
    >
      Invite
      <InviteModal
        v-if="isInvite"
        class="invite-modal"
        @close="inviteModalClose()"
        @noInviteClose="isInvite = false"
      />
    </span>

    <span v-if="board.invitedUser">
      <span class="board-item invited-user">
        <span
          v-for="item in invitedUser"
          :key="item.id"
          @click="$router.push(`/user/${item.id}`)"
        >
          <ProfileImage :item="item" />
        </span>
      </span>
    </span>

    <div v-if="board.publicYn === 'Y' && isOwner" class="board-hash-wrap">
      <HashtagModal />
    </div>

    <a class="board-header-btn show-menu" href="" @click.prevent="menuOpen">
      ... Show Menu
    </a>
    <BoardMenu
      v-if="isBoardMenu"
      v-click-outside="() => (isBoardMenu = false)"
      @close="isBoardMenu = false"
    />
  </div>
</template>

<script>
import InviteModal from '@/components/board/boardHeader/boardInvite/InviteModal.vue';
import ProfileImage from '@/components/board/boardHeader/ProfileImage.vue';
import HashtagModal from '@/components/board/boardHeader/HashtagModal.vue';
import BoardMenu from '@/components/board/boardHeader/boardMenu/BoardMenu.vue';
import DisclosureStatus from '@/components/board/boardHeader/DisclosureStatus.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    InviteModal,
    ProfileImage,
    HashtagModal,
    BoardMenu,
    DisclosureStatus,
  },

  props: {
    userId: {
      type: String,
      require: true,
      default: '',
    },
  },

  data() {
    return {
      isEditTitle: false,
      inputTitle: '',
      isInvite: false,
      invitedUser: [],
      isOwner: true,
      isBoardMenu: false,
    };
  },

  computed: {
    ...mapState(['board']),
  },

  watch: {
    board() {
      this.setInvitedUserImage();
      if (this.board.createdBy !== this.userId) {
        this.isOwner = false;
      }
    },
  },

  methods: {
    ...mapActions(['UPDATE_BOARD', 'READ_INVITED_USER_FOR_BOARD_PAGE']),

    onClickTitle() {
      this.isEditTitle = true;
      this.inputTitle = this.board.title;
    },
    onSubmitTitle() {
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) {
        return;
      }

      const id = this.board.id;
      const title = this.inputTitle;
      if (title === this.board.title) {
        return;
      }
      this.UPDATE_BOARD({ id, title });
      this.isEditTitle = false;
    },

    onKeyupEnter(event) {
      event.target.blur();
    },

    menuOpen() {
      this.isBoardMenu = true;
    },

    setInvitedUserImage() {
      if (!this.board.invitedUser) {
        return;
      }
      this.READ_INVITED_USER_FOR_BOARD_PAGE(JSON.parse(this.board.invitedUser))
        .then(({ data }) => {
          this.invitedUser = data.data;
        })
        .catch(({ response }) => {
          console.log(response);
          alert('초대된 유저 정보를 가져오는데 오류가 발생했습니다.');
        });
    },

    openInviteModal(e) {
      if (e.target.nodeName === 'SPAN') {
        this.isInvite = true;
      }
    },

    inviteModalClose() {
      this.isInvite = false;
    },
  },
};
</script>

<style scoped lang="scss">
.board-header {
  flex: none;
  padding: 4px 4px 8px 8px;
  margin: 0;
  line-height: 32px;
  &input[type='text'] {
    width: 200px;
  }
  .form-control {
    width: 17rem;
    display: inline;
  }
  .board-item {
    position: relative;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    border-radius: 2px;
    padding: 5px 10px;
    background-color: rgba(255, 255, 255, 0.5);
    transition: all 0.3s;
    margin-left: 10px;
    &:hover,
    &:focus {
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(1) {
      margin-left: 3px;
    }
    .invite-modal {
      left: 0px;
    }
    &.invited-user,
    &.owner-user {
      background: none;
      margin-right: -7px;
      cursor: pointer;
    }
  }
  .board-hash-wrap {
    display: inline-block;
    position: absolute;
    top: 8px;
    right: 150px;
  }
  .board-header-btn {
    border-radius: 4px;
    padding: 2px 10px;
    height: 30px;
    margin-bottom: 15px;
    display: inline-block;
    color: #fff;
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
      cursor: pointer;
    }
    &.show-menu {
      font-size: 14px;
      position: absolute;
      right: 15px;
      top: 6px;
    }
  }
}
</style>
