<template class="container">
  <div class="page">
    <Header />
    <div class="wrap" @click="menuOutsideClose">
      <div class="board-wrapper">
        <div class="board">
          <div class="board-header">
            <input
              class="form-control"
              v-if="isEditTitle"
              type="text"
              v-model="inputTitle"
              ref="inputTitle"
              @keypress.enter="onKeyupEnter"
              @blur="onSubmitTitle"
            />
            <span v-else class="board-item" @click="onClickTitle">
              {{ board.title }}
            </span>

            <span class="board-item owner-user">
              <ProfileImage :board="board" />
            </span>

            <span class="board-item" @click="changePublic">
              {{ publicYn }}
            </span>

            <span
              class="board-item"
              @click="openInviteModal"
              v-if="board.publicYn === 'Y'"
            >
              Invite
              <Invite
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
                <span v-for="item in invitedUser" :key="item.id">
                  <ProfileImage :item="item" />
                </span>
              </span>
            </span>

            <div class="hash-wrap">
              <HashtagDisplay />
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
                class="list-wrapper"
                v-for="list in board.lists"
                :key="list.id"
                :data-list-id="list.id"
              >
                <List :list="list" />
              </div>
              <div class="addList-wrapper">
                <AddList />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BoardMenu
        v-if="isBoardMenu"
        @close="isBoardMenu = false"
        ref="boardMenu"
      />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import List from '@/components/list/List';
import AddList from '@/components/list/AddList';
import BoardMenu from '@/components/board/boardMenu/BoardMenu';
import dragger from '@/utils/dragger/dragger';
import Invite from '@/components/board/Invite';
import ProfileImage from '@/components/board/ProfileImage';
import HashtagDisplay from '@/components/board/HashtagDisplay';
import { mapActions, mapMutations, mapState } from 'vuex';
import state from '../store/state';

export default {
  components: {
    Header,
    List,
    BoardMenu,
    AddList,
    Invite,
    ProfileImage,
    HashtagDisplay,
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
    };
  },
  watch: {
    inputTitle() {
      if (this.inputTitle.length > 44)
        alert('title은 45자를 넘을 수 없습니다.');
    },
  },
  computed: {
    ...mapState(['board', 'user']),
    publicYn() {
      if (this.board.publicYn === 'Y') {
        return 'Public';
      } else return 'Private';
    },
  },
  created() {
    this.READ_BOARD_DETAIL(this.$route.params.boardId).then(() => {
      this.setTheme(this.board.bgColor);
      this.setInvitedUser();
    });
  },
  beforeDestroy() {
    this.makeRecent();
  },
  updated() {
    dragger.listDragger();
    dragger.cardDragger();
  },
  methods: {
    ...mapActions([
      'READ_BOARD_DETAIL',
      'UPDATE_BOARD',
      'UPDATE_USER',
      'READ_INVITED_USER',
    ]),
    ...mapMutations(['setTheme']),
    onClickTitle() {
      this.isEditTitle = true;
      //$nextTick : 시간 지연 // https://backback.tistory.com/382
      this.$nextTick(() => {
        this.$refs.inputTitle.value = this.board.title;
        this.$refs.inputTitle.focus();
      });
    },
    onKeyupEnter() {
      // 이벤트 트리거. onSubmitTitle이 두번 실행되는 것을 방지. https://velog.io/@kyh196201/1025
      event.target.blur();
    },
    onSubmitTitle() {
      this.isEditTitle = false;

      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return;

      const id = this.board.id;
      const title = this.inputTitle;
      if (title === this.board.title) return;

      this.UPDATE_BOARD({ id, title });
    },
    onShowSettings() {
      this.isBoardMenu = true;
    },
    // 4개의 recent board만 허락함.
    makeRecent() {
      let recentArray = [];
      if (this.user.recent !== 'null' && this.user.recent !== null) {
        recentArray = JSON.parse(this.user.recent);
      }
      recentArray.forEach((el, idx) => {
        if (el === this.board.id) recentArray.splice(idx, 1);
      });

      if (recentArray.length >= 4) recentArray.pop();
      recentArray.unshift(this.board.id);

      const recent = JSON.stringify(recentArray);
      this.UPDATE_USER({ id: this.user.id, recent });
    },
    setInvitedUser() {
      if (!this.board.invitedUser) return;
      this.READ_INVITED_USER(JSON.parse(this.board.invitedUser)).then(
        ({ data }) => {
          this.invitedUser = data.data;
        },
      );
    },
    openInviteModal(e) {
      if (e.target.nodeName === 'SPAN') this.isInvite = true;
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
      if (e.target.className === 'board-header-btn show-menu') return;
      if (!this.$refs.boardMenu) return;
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
      if (change) this.UPDATE_BOARD({ id: this.board.id, publicYn: status });
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  position: relative;
  height: 100%;
  .wrap {
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
          .hash-wrap {
            display: inline-block;
            position: absolute;
            top: 13px;
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
              top: 8px;
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
