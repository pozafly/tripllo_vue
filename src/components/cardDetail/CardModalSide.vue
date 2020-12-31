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
      cardmodalside
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['board']),
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
