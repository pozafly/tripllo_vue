<template>
  <div>
    <div ref="boardItem" class="board-item" @click="goBoardPage">
      <div class="board-item-title">{{ board.title }}</div>
      <div v-if="board.publicYn === 'Y'" class="side-wrap">
        <span class="heart" @click="countHeart">
          <transition name="slide-fade">
            <template v-if="board.ownLike === 0">
              <awesome :icon="['far', 'heart']" />
            </template>
          </transition>
          <template v-if="board.ownLike === 1">
            <awesome icon="heart" class="fill-heart" />
          </template>
          <span v-if="board.likeCount != 0" class="heart-num">
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
  props: {
    board: {
      type: Object,
      require: true,
      default: () => ({
        bgColor: '',
        hashtag: '[]',
        likeCount: 0,
        ownLike: 0,
        publicYn: 'N',
        title: '',
        userId: '',
      }),
    },
  },

  computed: {
    hashtag() {
      return JSON.parse(this.board.hashtag);
    },
  },

  watch: {
    board() {
      this.setboardItemTheme();
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
        this.board.ownLike = this.board.ownLike + 1;
        this.board.likeCount = this.board.likeCount + 1;
        this.CREATE_LIKE({ boardId, likeCount: likeCount + 1 });
      } else {
        this.board.ownLike = this.board.ownLike - 1;
        this.board.likeCount = this.board.likeCount - 1;
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
      ) {
        return;
      }
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
        display: inline-block;
        margin: 1px 2px;
        padding: 0px 3px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 30px;
        color: #fff;
        line-height: 20px;
        font-size: 13px;
        font-weight: 350;
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
/* 애니메이션 진입 및 진출은 다른 지속 시간 및  */
/* 타이밍 기능을 사용할 수 있습니다. */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
