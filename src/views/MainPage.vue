<template>
  <div class="page">
    <Header />
    <section class="wrap">
      <div class="page-title">
        <i class="far fa-user"></i>
        Personal Boards
      </div>
      <div class="list-wrap">
        <div
          class="board-list"
          ref="boardList"
          v-for="board in boardList"
          :key="board.id"
        >
          <BoardItem :board="board" />
        </div>
        <a class="add-board" href="" @click.prevent="showAddBoard">
          <span class="add-board-title">Create new board...</span>
        </a>
        <AddBoardModal v-if="isShowAddBoard" @close="showAddBoard" />
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import BoardItem from '@/components/board/BoardItem';
import AddBoardModal from '@/components/board/AddBoardModal';
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
    ...mapState(['boardList', 'user']),
  },
  methods: {
    ...mapActions(['READ_BOARD_LIST']),
    showAddBoard() {
      this.isShowAddBoard = !this.isShowAddBoard;
    },
  },
  created() {
    this.READ_BOARD_LIST(this.user.id);
  },
};
</script>

<style scoped lang="scss">
.page {
  height: 100%;
  .wrap {
    max-width: 1000px;
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
        min-width: 200px;
        padding: 10px;
      }
      .add-board {
        margin: 10px;
        width: 225px;
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
