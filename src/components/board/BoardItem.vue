<template>
  <div>
    <div class="board-item" ref="boardItem" @click="goBoardPage">
      <div class="board-item-title">{{ board.title }}</div>
      <div class="side-wrap" v-if="board.publicYn === 'Y'">
        <span class="heart" @click="countHeart">
          <template v-if="board.ownLike === 0">
            <awesome :icon="['far', 'heart']" />
          </template>
          <template v-if="board.ownLike === 1">
            <awesome icon="heart" class="fill-heart" />
          </template>
          <span class="heart-num" v-if="board.likeCount != 0">
            {{ board.likeCount }}
          </span>
        </span>
        <div v-if="board.hashtag" class="hash-wrap">
          <span v-for="hash in hashtag" :key="hash" class="hashtag">
            {{ hash }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    ...mapActions(['CREATE_LIKE', 'DELETE_LIKE']),
    setboardItemTheme() {
      this.$refs.boardItem.style.backgroundColor = this.board.bgColor;
    },
    countHeart() {
      const boardId = this.board.id;
      const likeCount = this.board.likeCount;

      if (this.board.ownLike === 0) {
        this.CREATE_LIKE({ boardId, likeCount: likeCount + 1 });
      } else {
        this.DELETE_LIKE({ boardId, likeCount: likeCount - 1 });
      }
    },
    goBoardPage(e) {
      if (
        e.target.nodeName === 'svg' ||
        e.target.nodeName === 'path' ||
        e.target.className === 'heart' ||
        e.target.className === 'side-wrap' ||
        e.target.className === 'heart-num'
      )
        return;
      this.$router.push(`/board/${this.board.id}`);
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
  cursor: pointer;
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
      width: 170px;
      padding: 0 0 15px 4px;
      position: relative;
      bottom: -4px;
      color: #fff;
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
      right: 2px;
      /* background: red; */
      padding: 4px;
      color: #fff;
      .heart-num {
        font-size: 11px;
        margin-left: 3px;
      }
      .fill-heart {
        color: red;
      }
    }
  }
}
</style>
