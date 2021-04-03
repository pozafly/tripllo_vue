<template>
  <section class="wrap">
    <div class="boards">
      <div class="page-title">
        <awesome icon="user-friends" class="icon"></awesome>
        <span class="title-text">Invited Boards</span>
      </div>
      <div v-if="invitedBoard.length !== 0" class="list-wrap">
        <div v-for="board in invitedBoard" :key="board.id" class="board-list">
          <BoardItem :board="board" />
        </div>
      </div>
      <div v-else>
        <div class="nodata-text">아직 초대된 Board가 없습니다...</div>
      </div>
    </div>
    <div class="space"></div>
  </section>
</template>

<script>
import BoardItem from '@/components/board/BoardItem.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    BoardItem,
  },

  computed: {
    ...mapState(['invitedBoard', 'user']),
  },

  mounted() {
    this.getInvitedBoard();
  },

  methods: {
    ...mapActions(['READ_INVITED_BOARD']),
    getInvitedBoard() {
      if (
        this.user.invitedBoard === null ||
        this.user.invitedBoard === 'null'
      ) {
        return;
      }

      let invitedLists = null;
      if (this.user.invitedBoard) {
        invitedLists = JSON.parse(this.user.invitedBoard);
      }
      this.READ_INVITED_BOARD({ invitedLists });
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
    }
    .nodata-text {
      color: #212732;
      padding: 40px;
      text-align: center;
    }
  }
  .space {
    padding: 10px 0;
  }
}
</style>
