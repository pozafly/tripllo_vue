<template class="container">
  <div class="board-page">
    <Header />
    <div class="board-section" @click="menuOutsideClose">
      <div class="board-wrapper">
        <div class="board">
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

            <span
              class="board-item owner-user"
              @click="$router.push(`/user/${board.createdBy}`)"
            >
              <ProfileImage :board="board" />
            </span>

            <span v-if="isOwner" class="board-item" @click="changePublic">
              {{ publicYn }}
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
                @close="
                  ({ memberId, boardTitle }) =>
                    inviteModalClose({ memberId, boardTitle })
                "
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

            <div
              v-if="board.publicYn === 'Y' && isOwner"
              class="board-hash-wrap"
            >
              <HashtagModal />
            </div>

            <a
              class="board-header-btn show-menu"
              href=""
              @click.prevent="onShowSettings"
            >
              ... Show Menu
            </a>
          </div>
          <div class="list-section-wrapper">
            <div class="list-section">
              <div
                v-for="list in board.lists"
                :key="list.id"
                class="list-wrapper"
                :listId="list.id"
              >
                <ListItem :list="list" />
              </div>
              <div class="addList-wrapper">
                <AddList @listFocus="listFocus" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BoardMenu
        v-if="isBoardMenu"
        ref="boardMenu"
        @close="isBoardMenu = false"
      />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import ListItem from '@/components/list/ListItem.vue';
import AddList from '@/components/list/AddList.vue';
import BoardMenu from '@/components/board/boardMenu/BoardMenu.vue';
import dragger from '@/utils/dragger';
import InviteModal from '@/components/board/invite/InviteModal.vue';
import ProfileImage from '@/components/board/ProfileImage.vue';
import HashtagModal from '@/components/board/HashtagModal.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    Header,
    ListItem,
    BoardMenu,
    AddList,
    InviteModal,
    ProfileImage,
    HashtagModal,
  },

  data() {
    return {
      isEditTitle: false,
      inputTitle: '',
      isBoardMenu: '',
      cDragger: '',
      lDragger: '',
      isInvite: false,
      invitedUser: [],
      isOwner: true,
    };
  },

  computed: {
    ...mapState(['board', 'user']),
    publicYn() {
      if (this.board.publicYn === 'Y') {
        return 'Public';
      } else {
        return 'Private';
      }
    },
  },

  created() {
    this.readBoardDetail();
  },

  mounted() {
    this.setOverflowStyle('hidden');
    this.makeRecent();
  },

  updated() {
    this.updateDragger();
  },

  beforeDestroy() {
    this.setOverflowStyle('scroll');
  },

  methods: {
    ...mapActions([
      'READ_BOARD_DETAIL',
      'UPDATE_BOARD',
      'UPDATE_USER',
      'READ_INVITED_USER_FOR_BOARD_PAGE',
    ]),
    ...mapMutations(['setTheme']),
    setOverflowStyle(type) {
      window.document.body.style.overflowY = type;
    },
    readBoardDetail() {
      this.READ_BOARD_DETAIL(this.$route.params.boardId).then(() => {
        this.setTheme(this.board.bgColor);
        this.setInvitedUser();
        if (this.board.createdBy !== this.user.id) {
          this.isOwner = false;
        }
      });
    },
    updateDragger() {
      dragger.listDragger();
      dragger.cardDragger();
    },
    onClickTitle() {
      this.isEditTitle = true;
      this.inputTitle = this.board.title;
    },
    onKeyupEnter(event) {
      // 이벤트 트리거. onSubmitTitle이 두번 실행되는 것을 방지. https://velog.io/@kyh196201/1025
      event.target.blur();
    },
    onSubmitTitle() {
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

      this.UPDATE_BOARD({ id, title });
    },
    onShowSettings() {
      this.isBoardMenu = true;
    },
    // 3개의 recent board만 허락함.
    makeRecent() {
      let recentArray = [];
      const boardId = this.$route.params.boardId;

      if (!!this.user.recentBoard) {
        recentArray = JSON.parse(this.user.recentBoard);
      }
      recentArray.filter((el, idx) => {
        if (el === boardId) {
          recentArray.splice(idx, 1);
        }
      });

      if (recentArray.length >= 3) {
        recentArray.pop();
      }
      recentArray.unshift(boardId);

      const recentBoard = JSON.stringify(recentArray);
      this.UPDATE_USER({ id: this.user.id, recentBoard });
    },
    setInvitedUser() {
      if (!this.board.invitedUser) {
        return;
      }
      this.READ_INVITED_USER_FOR_BOARD_PAGE(JSON.parse(this.board.invitedUser))
        .catch(({ response }) => {
          console.log(response);
          alert('초대된 유저 정보를 가져오는데 오류가 발생했습니다.');
        })
        .then(({ data }) => {
          this.invitedUser = data.data;
        });
    },
    openInviteModal(e) {
      if (e.target.nodeName === 'SPAN') {
        this.isInvite = true;
      }
    },
    inviteModalClose({ memberId, boardTitle }) {
      this.isInvite = false;
      this.$notify({
        group: 'custom-template',
        duration: 5000,
        title: '초대 완료!',
        closeOnClick: true,
        text: `${memberId}님에게 ${boardTitle} 보드를 초대했습니다.`,
      });
    },
    menuOutsideClose(e) {
      if (e.target.className === 'board-header-btn show-menu') {
        return;
      }
      if (!this.$refs.boardMenu) {
        return;
      }
      if (!this.$refs.boardMenu.$el.contains(e.target)) {
        this.isBoardMenu = false;
      }
    },
    changePublic() {
      let status;
      let sentense;

      if (this.board.publicYn === 'Y') {
        status = 'N';
        sentense =
          '공개여부를 Private으로 바꾸시면 초대된 사람은 유지되지만 \n해시태그를 통한 노출이 불가능 합니다. 그래도 바꾸시겠습니까?';
      } else {
        status = 'Y';
        sentense =
          '공개여부를 Public으로 바꾸시면 해시태그를 통해 노출이 가능합니다.';
      }

      let change = window.confirm(sentense);
      if (change) {
        this.UPDATE_BOARD({ id: this.board.id, publicYn: status });
      }
    },
    listFocus() {
      setTimeout(() => {
        this.$el.querySelector('.list-section').lastChild.scrollIntoView();
      }, 100);
    },
  },
};
</script>

<style scoped lang="scss">
.board-page {
  position: relative;
  height: 100%;
  .board-section {
    position: relative;
    margin: -40px auto;
    padding-top: 40px;
    min-height: 100%;
    box-sizing: border-box;
    .board-wrapper {
      position: absolute;
      top: 40px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      .board {
        display: flex;
        flex-direction: column;
        height: 100%;
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
        .list-section-wrapper {
          flex-grow: 1;
          position: relative;
          .list-section {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            padding: 0 10px;
            &::-webkit-scrollbar {
              width: 10px;
              height: 13px;
              background: #ffffff;
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 3.5px;
              background-color: #bfc4ce;
              &:hover {
                background-color: #adb5bd;
              }
            }
            .list-wrapper {
              display: inline-block;
              height: 100%;
              width: 272px;
              vertical-align: top;
              margin-right: 5px;
              pointer-events: none;
            }
            .addList-wrapper {
              display: inline-block;
              height: 100%;
              width: 272px;
              vertical-align: top;
              margin-right: 5px;
              pointer-events: none;
            }
          }
        }
      }
    }
  }
}
</style>
