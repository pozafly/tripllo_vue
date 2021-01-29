<template>
  <div>
    <div class="board-item" ref="boardItem">
      <router-link :to="`/board/${board.id}`">
        <div class="board-item-title">{{ board.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['board'],
  watch: {
    board() {
      this.setboardItemTheme();
    },
  },
  mounted() {
    this.setboardItemTheme();
  },
  methods: {
    setboardItemTheme() {
      this.$refs.boardItem.style.backgroundColor = this.board.bgColor;
    },
  },
};
</script>

<style scoped lang="scss">
.board-item {
  width: 180px;
  height: 100px;
  border-radius: 3px;
  a {
    display: block;
    width: 100%;
    height: 100%;
    transition: 0.4s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #666;
    }
  }
  .board-item-title {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 10px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.2em;
    height: 3em;
  }
}
</style>
