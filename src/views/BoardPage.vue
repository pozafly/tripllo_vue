<template class="container">
  <div class="page">
    <Header />
    <div class="wrap">
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
            <span class="board-item" @click="openModal">
              Invite
              <Invite
                v-if="isInvite"
                class="invite-modal"
                @close="
                  ({ memberId, boardTitle }) =>
                    modalClose({ memberId, boardTitle })
                "
                @noInviteClose="isInvite = false"
              />
            </span>

            <span v-if="board.invitedUser">
              <span class="board-item owner-user">
                <span
                  href=""
                  class="invited-picture img"
                  v-if="
                    board.createdByPicture !== null &&
                      board.createdByPicture !== 'null'
                  "
                  :style="{ backgroundImage: `url(${board.createdByPicture})` }"
                ></span>
                <awesome
                  icon="user"
                  class="invited-picture fas fa-user"
                  v-else
                ></awesome>
              </span>

              <span class="board-item invited-user">
                <span v-for="item in invitedUser" :key="item.id">
                  <span
                    href=""
                    class="invited-picture img"
                    v-if="item.picture !== null && item.picture !== 'null'"
                    :style="{ backgroundImage: `url(${item.picture})` }"
                  ></span>
                  <awesome
                    icon="user"
                    class="invited-picture fas fa-user"
                    v-else
                  ></awesome>
                </span>
              </span>
            </span>

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
        v-if="isShowBoardSettings"
        @close="isShowBoardSettings = false"
      />
      <router-view></router-view>
    </div>
    <notifications group="notifyApp" position="top right" />
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import List from '@/components/list/List';
import AddList from '@/components/list/AddList';
import BoardMenu from '@/components/board/boardMenu/BoardMenu';
import dragger from '@/utils/dragger/dragger';
import Invite from '@/components/board/Invite';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    Header,
    List,
    BoardMenu,
    AddList,
    Invite,
  },
  data() {
    return {
      isEditTitle: false,
      inputTitle: '',
      isShowBoardSettings: '',
      cDragger: '',
      lDragger: '',
      isInvite: false,
      invitedUser: [],
    };
  },
  computed: {
    ...mapState(['board', 'user']),
  },
  created() {
    console.log(this.board.invitedUser);
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
      this.isShowBoardSettings = true;
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
          console.log(data.data);
          this.invitedUser = data.data;
        },
      );
    },
    openModal(e) {
      if (e.target.nodeName === 'SPAN') this.isInvite = true;
    },
    modalClose({ memberId, boardTitle }) {
      this.isInvite = false;
      this.$notify({
        group: 'notifyApp',
        type: 'warn',
        duration: 5000,
        title: '초대 완료!',
        text: `${memberId}님에게 ${boardTitle} 보드를 초대했습니다.`,
      });
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
          padding: 8px 4px 8px 8px;
          margin: 0;
          line-height: 32px;
          &input[type='text'] {
            width: 200px;
          }
          .form-control {
            width: 17rem;
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
              cursor: auto;
            }
            .invited-picture {
              padding: 5px 14px;
              background-color: rgba(255, 255, 255, 0.5);
              color: white;
              transition: all 0.3s;
              &.fa-user {
                position: relative;
                top: 7px;
                padding: 7px 8px;
                border-radius: 50%;
              }
              &.img {
                border-radius: 50%;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
              }
            }
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
