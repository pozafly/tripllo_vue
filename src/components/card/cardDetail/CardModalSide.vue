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
        <li>
          <div>
            1
          </div>
        </li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
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

<style lang="scss">
.side {
  border: 1px solid black;
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
    padding-top: 30px;
  }
}
</style>
