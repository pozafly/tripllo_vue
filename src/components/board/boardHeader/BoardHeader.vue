<template>
  <header class="board-header">
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
    <h2 v-else class="board-item" @click="onClickTitle">
      {{ board.title }}
    </h2>

    <span class="board-item owner-user">
      <BoardHeaderProfileImage v-bind="board" />
    </span>

    <span v-if="isOwner" class="board-item">
      <BoardHeaderDisclosureStatus
        :board-id="board.id"
        :public-yn="board.publicYn"
      />
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
        <span v-for="item in invitedUser" :key="item.id">
          <BoardHeaderProfileImage v-bind="item" />
        </span>
      </span>
    </span>

    <div v-if="board.publicYn === 'Y' && isOwner" class="board-hash-wrap">
      <BoardHeaderHashtagModal />
    </div>

    <a class="board-header-btn show-menu" href="" @click.prevent="menuOpen">
      ... Show Menu
    </a>
    <BoardMenu
      v-if="isBoardMenu"
      v-click-outside="() => (isBoardMenu = false)"
      @close="isBoardMenu = false"
    />
  </header>
</template>

<script>
import InviteModal from '@/components/board/boardHeader/boardInvite/InviteModal.vue';
import BoardHeaderProfileImage from '@/components/board/boardHeader/BoardHeaderProfileImage.vue';
import BoardHeaderHashtagModal from '@/components/board/boardHeader/BoardHeaderHashtagModal.vue';
import BoardMenu from '@/components/board/boardHeader/boardMenu/BoardMenu.vue';
import BoardHeaderDisclosureStatus from '@/components/board/boardHeader/BoardHeaderDisclosureStatus.vue';

import { isEmpty } from '@/utils/libs';
import { readInvitedUserForBoardPageAPI } from '@/api/user';
import { updateBoardAPI } from '@/api/board';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    InviteModal,
    BoardHeaderProfileImage,
    BoardHeaderHashtagModal,
    BoardMenu,
    BoardHeaderDisclosureStatus,
  },

  props: {
    userId: {
      type: [String, Number],
      required: true,
      default: '',
      validator(value) {
        return typeof value === 'string' || typeof value === 'number';
      },
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
    ...mapActions(['READ_BOARD_DETAIL']),

    onClickTitle() {
      this.isEditTitle = true;
      this.inputTitle = this.board.title;
    },

    async onSubmitTitle() {
      this.isEditTitle = false;
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) {
        return;
      }

      const id = this.board.id;
      const title = this.inputTitle;
      if (title === this.board.title) {
        return;
      }

      try {
        await updateBoardAPI(id, { title });
        await this.READ_BOARD_DETAIL(this.board.id);
      } catch (error) {
        console.log(error);
        alert('보드 제목을 업데이트 하지 못했습니다.');
      }
    },

    onKeyupEnter(event) {
      event.target.blur();
    },

    menuOpen() {
      this.isBoardMenu = true;
    },

    async setInvitedUserImage() {
      if (isEmpty(this.board.invitedUser)) {
        return;
      }
      const invitedUser = JSON.parse(this.board.invitedUser);

      try {
        const { data } = await readInvitedUserForBoardPageAPI(invitedUser);
        this.invitedUser = data.data;
      } catch (error) {
        console.log(error);
        alert('초대된 유저 정보를 가져오는데 오류가 발생했습니다.');
      }
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
    display: inline;
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
