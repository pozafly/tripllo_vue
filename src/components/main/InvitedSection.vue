<template>
  <section class="wrap">
    <div class="boards" v-if="invitedBoard">
      <div class="page-title">
        <awesome icon="user-friends" class="icon"></awesome>
        <span class="title-text">Invited Boards</span>
      </div>
      <div class="list-wrap">
        <div class="board-list" v-for="board in invitedBoard" :key="board.id">
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
  computed: {
    ...mapState(['invitedBoard', 'user']),
  },
  methods: {
    ...mapActions(['READ_BOARD_LIST']),
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
  }
  .space {
    padding: 10px 0;
  }
}
</style>
