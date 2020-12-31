<template>
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
            <span v-else class="board-title" @click="onClickTitle">
              {{ board.title }} <i class="fas fa-edit"></i>
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
              <div class="list-wrapper">
                <AddList />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BoardSettings v-if="isShowBoardSettings" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import List from '@/components/list/List';
import AddList from '@/components/list/AddList';
import BoardSettings from '@/components/board/BoardSettings';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    Header,
    List,
    BoardSettings,
    AddList,
  },
  data() {
    return {
      bid: 0,
      loading: false,
      isEditTitle: false,
      inputTitle: '',
    };
  },
  computed: {
    ...mapState(['board', 'isShowBoardSettings']),
  },
  methods: {
    ...mapActions(['READ_BOARD_DETAIL', 'UPDATE_BOARD']),
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
  },
  created() {
    this.READ_BOARD_DETAIL(this.$route.params.boardId);
  },
};
</script>

<style scoped lang="scss">
/* * {
  border: 1px solid black;
} */
.page {
  background: rgb(0, 121, 191);
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
          height: 36px;
          line-height: 32px;
          &input[type='text'] {
            width: 200px;
          }
          .form-control {
            width: 17rem;
          }
          .board-title {
            color: #fff;
            font-weight: 700;
            font-size: 18px;
            cursor: pointer;
            .fa-edit {
              display: none;
            }
            &:hover {
              .fa-edit {
                display: inline-block;
                font-size: 10px;
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
            .list-wrapper {
              display: inline-block;
              height: 100%;
              width: 272px;
              vertical-align: top;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
