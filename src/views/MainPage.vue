<template>
  <div class="page">
    <Header />
    <section class="wrap">
      <div class="recent-board" v-if="recentBoard">
        <div class="page-title">
          <awesome :icon="['far', 'clock']"></awesome>
          Recently Viewed
        </div>
        <div class="list-wrap">
          <div
            class="board-list"
            v-for="recent in recentBoard"
            :key="recent.id"
          >
            <BoardItem :board="recent" />
          </div>
        </div>
      </div>

      <div class="personal-board">
        <div class="page-title">
          <awesome :icon="['far', 'user']" class="far fa-user"></awesome>
          Personal Boards
        </div>
        <div class="list-wrap">
          <div class="board-list" v-for="board in boardList" :key="board.id">
            <BoardItem :board="board" />
          </div>
          <a class="add-board" href="" @click.prevent="showAddBoard">
            <span class="add-board-title">Create new board...</span>
          </a>
          <AddBoardModal v-if="isShowAddBoard" @close="showAddBoard" />
        </div>
      </div>

      <div class="invited-board" v-if="invitedBoard.length !== 0">
        <div class="page-title">
          <awesome icon="user-friends" class="far fa-user"></awesome>
          Invited Boards
        </div>
        <div class="list-wrap">
          <div class="board-list" v-for="board in invitedBoard" :key="board.id">
            <BoardItem :board="board" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import BoardItem from '@/components/board/BoardItem';
import AddBoardModal from '@/components/board/AddBoardModal';
import { clearSessionStorage } from '@/utils/webStorage';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      isShowAddBoard: false,
    };
  },
  components: {
    Header,
    BoardItem,
    AddBoardModal,
  },
  computed: {
    ...mapState(['boardList', 'recentBoard', 'invitedBoard', 'user']),
  },
  watch: {
    user() {
      this.displayRecent();
    },
  },
  methods: {
    ...mapActions(['READ_BOARD_LIST', 'READ_BOARDS']),
    showAddBoard() {
      this.isShowAddBoard = !this.isShowAddBoard;
    },
    async displayRecent() {
      let recentLists = null;
      if (this.user.recent) {
        recentLists = JSON.parse(this.user.recent);
      }
      await this.READ_BOARD_LIST({ userId: this.user.id, recentLists });
    },
  },
  created() {
    clearSessionStorage();
  },
  mounted() {
    this.displayRecent();
  },
};
</script>

<style scoped lang="scss">
.page {
  height: 100%;
  .wrap {
    max-width: 800px;
    margin: 0 auto;
    min-height: 80%;
    .page-title {
      margin: 30px 12px;
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
    }
    .list-wrap {
      display: flex;
      flex-wrap: wrap;
      .board-list {
        display: table-cell;
        min-width: 180px;
        padding: 5px;
      }
      .add-board {
        margin: 5px;
        width: 180px;
        height: 100px;
        border-radius: 3px;
        background: rgba(9, 30, 66, 0.04);
        text-align: center;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
          color: #666;
        }
        .add-board-title {
          display: inline-block;
          color: #888;
          font-size: 15px;
          font-weight: 700;
          padding: 10px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
