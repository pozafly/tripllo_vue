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
  width: 225px;
  height: 100px;
  border-radius: 3px;
  /* background-color: #026aa7; */
  a {
    display: block;
    width: 100%;
    height: 100%;
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
  }
}
</style>
