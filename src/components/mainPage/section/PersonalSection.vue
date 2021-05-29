<template>
  <section class="wrap">
    <h1 hidden>Personal Section</h1>
    <article v-if="recentBoard" class="boards">
      <header class="page-title">
        <awesome :icon="['far', 'clock']" class="icon"></awesome>
        <h2 class="title-text">Recently Viewed</h2>
      </header>
      <div class="list-wrap">
        <div v-for="recent in recentBoard" :key="recent.id" class="board-list">
          <BoardItem :board="recent" />
        </div>
      </div>
    </article>

    <article class="boards">
      <header class="page-title">
        <awesome icon="layer-group" class="icon"></awesome>
        <h2 class="title-text">My Boards</h2>
      </header>
      <div class="list-wrap">
        <a class="add-board" href="" @click.prevent="showAddBoard">
          <span class="add-board-title">Create new board...</span>
        </a>
        <AddBoardModal v-if="isShowAddBoard" @close="showAddBoard" />
        <div v-for="board in personalBoard" :key="board.id" class="board-list">
          <BoardItem :board="board" />
        </div>
      </div>
    </article>

    <aside class="infinity">
      <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
        <div
          slot="no-more"
          style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;"
        >
          목록의 끝입니다 :)
        </div>
      </infinite-loading>
    </aside>
  </section>
</template>

<script>
import BoardItem from '@/components/board/BoardItem.vue';
import AddBoardModal from '@/components/board/addBoard/AddBoardModal.vue';
import { isEmpty } from '@/utils/libs';
import { readPersonalBoardAPI } from '@/api/board';
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
      isInfinity: true,
    };
  },

  computed: {
    ...mapState(['personalBoard', 'recentBoard', 'user']),
  },

  mounted() {
    this.getRecentBoard();
  },

  beforeDestroy() {
    this.resetPersonalBoard();
  },

  methods: {
    ...mapActions(['READ_RECENT_BOARD']),
    ...mapMutations(['resetPersonalBoard', 'pushPersonalBoard']),

    showAddBoard() {
      this.isShowAddBoard = !this.isShowAddBoard;
    },

    async getRecentBoard() {
      const recentBoard = this.user.recentBoard;
      if (isEmpty(recentBoard)) {
        return;
      }
      try {
        await this.READ_RECENT_BOARD(JSON.parse(recentBoard));
      } catch (error) {
        console.log(error);
        alert('최근 보드 정보를 가져오지 못했습니다.');
      }
    },

    async infiniteHandler($state) {
      try {
        const { data } = await readPersonalBoardAPI(this.lastCreatedAt);
        if (data.data === null) {
          this.isInfinity = false;
          $state.complete(); // 데이터는 모두 소진되고 다시 가져올 필요가 없다는 것을 알려준다.
        } else {
          this.pushPersonalBoard(data.data);

          setTimeout(() => {
            const boardItem = data.data;
            const lastCreatedAt = boardItem[boardItem.length - 1].createdAt;
            this.lastCreatedAt = lastCreatedAt;
            $state.loaded(); // 계속 데이터가 남아있다는 것을 infinity에게 알려준다.
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        alert('Personal 보드를 가져오지 못했습니다.');
      }
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
        display: inline;
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
