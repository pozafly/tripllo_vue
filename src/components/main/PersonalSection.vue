<template>
  <section class="wrap">
    <div v-if="recentBoard" class="boards">
      <div class="page-title">
        <awesome :icon="['far', 'clock']" class="icon"></awesome>
        <span class="title-text">Recently Viewed</span>
      </div>
      <div class="list-wrap">
        <div v-for="recent in recentBoard" :key="recent.id" class="board-list">
          <BoardItem :board="recent" />
        </div>
      </div>
    </div>

    <div class="boards">
      <div class="page-title">
        <awesome icon="layer-group" class="icon"></awesome>
        <span class="title-text">My Boards</span>
      </div>
      <div ref="boardItem" class="list-wrap">
        <a class="add-board" href="" @click.prevent="showAddBoard">
          <span class="add-board-title">Create new board...</span>
        </a>
        <AddBoardModal v-if="isShowAddBoard" @close="showAddBoard" />
        <div
          v-for="board in personalBoard"
          :key="board.id"
          class="board-list"
          :lastCreatedAt="board.createdAt"
        >
          <BoardItem :board="board" />
        </div>
      </div>
    </div>
    <div class="infinity">
      <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
        <div
          slot="no-more"
          style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;"
        >
          목록의 끝입니다 :)
        </div>
      </infinite-loading>
    </div>
  </section>
</template>

<script>
import BoardItem from '@/components/board/BoardItem.vue';
import AddBoardModal from '@/components/board/addBoard/AddBoardModal.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    BoardItem,
    AddBoardModal,
  },

  data() {
    return {
      isShowAddBoard: false,
      lastCreatedAt: 'firstCall',
    };
  },

  computed: {
    ...mapState(['personalBoard', 'recentBoard', 'user', 'isInfinity']),
  },

  watch: {
    'user.recentBoard'() {
      if (this.user.recentBoard) {
        this.getRecentBoard();
      }
    },
  },

  mounted() {
    if (this.user.recentBoard) this.getRecentBoard();
  },

  beforeDestroy() {
    this.resetPersonalBoard();
  },

  methods: {
    ...mapActions(['READ_PERSONAL_BOARD', 'READ_RECENT_BOARD']),
    ...mapMutations(['resetPersonalBoard']),
    showAddBoard() {
      this.isShowAddBoard = !this.isShowAddBoard;
    },
    getRecentBoard() {
      if (this.user.recentBoard === null || this.user.recentBoard === 'null') {
        return;
      }
      let recentLists = null;
      if (this.user.recentBoard) {
        recentLists = JSON.parse(this.user.recentBoard);
      }
      this.READ_RECENT_BOARD({ recentLists });
    },
    async infiniteHandler($state) {
      this.READ_PERSONAL_BOARD({
        lastCreatedAt: this.lastCreatedAt,
      });
      await setTimeout(() => {
        // isInfinity는 state에 올라가 있다. 초기 값은 Y
        if (this.isInfinity === 'Y') {
          if (this.$refs.boardItem) {
            this.lastCreatedAt = this.$refs.boardItem.lastChild.getAttribute(
              'lastCreatedAt',
            );
          }
          $state.loaded(); // 계속 데이터가 남아있다는 것을 infinity에게 알려준다.
        } else {
          $state.complete(); // 데이터는 모두 소진되고 다시 가져올 필요가 없다는 것을 알려준다.
        }
      }, 1200);
    },
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
  .infinity {
    padding: 10px 0;
  }
}
</style>
