<template>
  <div class="side">
    <a
      class="modal-close-btn"
      href=""
      @click.prevent="$router.push(`/board/${board.id}`)"
    >
      &times;
    </a>
    <div class="side-items">
      <ul>
        <li class="side-item">
          <a href="">Labels</a>
        </li>
        <li class="side-item">
          <a href="">Checklist</a>
        </li>
        <li class="side-item">
          <a href="">Due Date</a>
        </li>
        <li class="side-item">
          <a href="">Attachment</a>
        </li>
        <li class="side-item">
          <a href="">Location</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['board']),
  },
  beforeDestroy() {
    // 모달 창을 닫을 때, board detail 화면을 갱신하기 위함.
    this.READ_BOARD_DETAIL(this.board.id);
  },
  methods: {
    ...mapActions(['READ_BOARD_DETAIL']),
  },
};
</script>

<style scoped lang="scss">
.side {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  .modal-close-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 24px;
    color: black;
  }
  .side-items {
    padding-top: 80px;
    .side-item {
      position: relative;
      margin: 12px 8px;
      padding: 8px;
      font-size: 15px;
      background: rgba(9, 30, 66, 0.04);
      border-radius: 3px;
      text-align: left;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: rgba(9, 30, 66, 0.1);
      }
      a {
        color: black;
      }
    }
  }
}
</style>
