<template>
  <div>
    <div class="board-item" ref="boardItem">
      <router-link :to="`/board/${board.id}`">
        <div class="board-item-title">{{ board.title }}</div>
        <div class="side-wrap" v-if="board.publicYn === 'Y'">
          <span class="heart">
            <awesome :icon="['far', 'heart']" />
            <span class="heart-num">210</span>
          </span>
          <div v-if="board.hashtag" class="hash-wrap">
            <span v-for="hash in hashtag" :key="hash" class="hashtag">
              {{ hash }}
            </span>
          </div>
        </div>
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
  computed: {
    hashtag() {
      return JSON.parse(this.board.hashtag);
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
  width: 210px;
  height: 120px;
  border-radius: 3px;
  position: relative;
  a {
    display: block;
    width: 100%;
    height: 100%;
    transition: 0.4s;
    color: #fff;
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
  .side-wrap {
    background: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 30px;
    position: relative;
    top: 16px;
    .hash-wrap {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 165px;
      padding: 0 0 10px 4px;
      position: relative;
      bottom: -4.3px;
      .hashtag {
        font-size: 6px;
        display: inline-block;
        margin: 1px 2px;
        padding: 0px 3px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 30px;
        color: #fff;
        line-height: 20px;
        font-size: 13px;
        text-align: right;
      }
    }
    .heart {
      position: absolute;
      right: 6px;
      /* background: red; */
      color: #fff;
      .heart-num {
        font-size: 10px;
        margin-left: 3px;
      }
    }
  }
}
</style>
