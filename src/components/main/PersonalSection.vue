<template>
  <section class="wrap">
    <div class="boards" v-if="recentBoard">
      <div class="page-title">
        <awesome :icon="['far', 'clock']" class="icon"></awesome>
        <span class="title-text">Recently Viewed</span>
      </div>
      <div class="list-wrap">
        <div class="board-list" v-for="recent in recentBoard" :key="recent.id">
          <BoardItem :board="recent" />
        </div>
      </div>
    </div>

    <div class="boards">
      <div class="page-title">
        <awesome icon="layer-group" class="icon"></awesome>
        <span class="title-text">My Boards</span>
      </div>
      <div class="list-wrap">
        <a class="add-board" href="" @click.prevent="showAddBoard">
          <span class="add-board-title">Create new board...</span>
        </a>
        <AddBoardModal v-if="isShowAddBoard" @close="showAddBoard" />
        <div class="board-list" v-for="board in boardList" :key="board.id">
          <BoardItem :board="board" />
        </div>
      </div>
    </div>
    <div class="space"></div>
  </section>
</template>

<script>
import BoardItem from '@/components/board/BoardItem';
import AddBoardModal from '@/components/board/AddBoardModal';
import { mapActions, mapState } from 'vuex';

export default {
  components: { BoardItem, AddBoardModal },
  data() {
    return {
      isShowAddBoard: false,
    };
  },
  computed: {
    ...mapState(['boardList', 'recentBoard', 'user']),
  },
  watch: {
    user() {
      this.displayBoardLists();
    },
  },
  methods: {
    ...mapActions(['READ_BOARD_LIST']),
    showAddBoard() {
      this.isShowAddBoard = !this.isShowAddBoard;
    },
    async displayBoardLists() {
      let recentLists = null;

      if (this.user.recentBoard) {
        recentLists = JSON.parse(this.user.recentBoard);
      }
      let invitedLists = null;
      if (this.user.invitedBoard) {
        invitedLists = JSON.parse(this.user.invitedBoard);
      }
      await this.READ_BOARD_LIST({
        userId: this.user.id,
        recentLists,
        invitedLists,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.displayBoardLists();
    });
  },
};
</script>

<style scoped lang="scss">
.wrap {
  width: 700px;
  .boards {
    background: #fff;
    margin: 21px 0;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 19px;
    border-radius: 16px;
    .page-title {
      padding-bottom: 13px;
      padding-left: 7px;
      font-size: 18px;
      font-weight: bold;
      .icon {
        color: #444e61;
      }
      .title-text {
        color: #212732;
        margin-left: 10px;
      }
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
        width: 210px;
        height: 120px;
        border-radius: 3px;
        background: rgba(9, 30, 66, 0.04);
        text-align: center;
        transition: 0.4s;
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
  .space {
    padding: 10px 0;
  }
}
</style>
