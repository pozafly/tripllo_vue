<template>
  <section class="wrap">
    <div class="boards">
      <div class="page-title">
        <awesome icon="hashtag"></awesome>
        Search
        <input
          type="text"
          class="form-control"
          ref="input"
          spellcheck="false"
          placeholder="Write you want Searching Hashtag"
        />
      </div>
    </div>

    <div class="boards">
      <div class="page-title">
        <awesome icon="layer-group" class="far fa-user"></awesome>
        Public Boards
      </div>
      <div class="list-wrap">
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
import { mapActions, mapState } from 'vuex';

export default {
  components: { BoardItem },
  data() {
    return {
      // isShowAddBoard: false,
    };
  },
  computed: {
    ...mapState(['boardList']),
  },
  methods: {
    ...mapActions(['READ_BOARD_LIST']),
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
    /* background: #fff; */
    margin: 21px 0;
    padding: 20px;
    /* box-shadow: rgba(0, 0, 0, 0.1) 0 0 19px; */
    /* border-radius: 16px; */
    .page-title {
      padding-bottom: 13px;
      padding-left: 7px;
      font-size: 18px;
      font-weight: bold;
    }
    .form-control {
      margin-top: 20px;
      width: 50%;
    }
    .list-wrap {
      display: flex;
      flex-wrap: wrap;
      .board-list {
        display: table-cell;
        min-width: 180px;
        padding: 5px;
      }
    }
  }
  .space {
    padding: 10px 0;
  }
}
</style>
