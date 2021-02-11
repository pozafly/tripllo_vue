<template>
  <section class="wrap">
    <div class="boards">
      <div class="page-title">
        <awesome icon="search" class="icon" />
        <span class="title-text">Search</span>
        <span class="side-text"> - Search you want..</span>
        <input
          type="text"
          class="form-control"
          ref="input"
          spellcheck="false"
          placeholder="Write you want Searching Hashtag"
          v-model="searchHashValue"
          @keydown="reset"
        />
      </div>
    </div>

    <div class="boards">
      <div class="page-title">
        <awesome icon="crown" class="icon" />
        <span class="title-text">Rank Hash tags</span>
        <span class="side-text"> - Top 5</span>
        <div class="hashtag">
          <span
            v-for="item in hashtags"
            :key="item.name"
            class="hashtag-item"
            @click="selectHash(item.name)"
          >
            <span class="hashtag-text"># {{ item.name }}</span>
            <span class="hashtag-count">({{ item.count }})</span>
          </span>
        </div>
      </div>
    </div>

    <div class="boards">
      <div class="page-title">
        <awesome icon="globe-americas" class="icon" />
        <span class="title-text">Public Boards</span>
        <span class="side-text"> - order by like</span>
      </div>
      <div class="list-wrap" ref="boardItem">
        <div
          class="board-list"
          v-for="board in hashtagBoards"
          :key="board.id"
          :data-last-created-at="board.createdAt"
          :data-last-like-count="board.likeCount"
        >
          <BoardItem :board="board" />
          <div class="created-info">
            <span class="created-by">Made by @{{ board.createdBy }}</span>
            <span>
              <a
                href=""
                class="created-img"
                @click.prevent="menuShow"
                v-if="
                  board.createdUserPicture !== null &&
                    board.createdUserPicture !== 'null'
                "
                :style="{ backgroundImage: `url(${board.createdUserPicture})` }"
              ></a>
              <awesome icon="user" class="created-icon" v-else></awesome>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="space">
      <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
        <div
          slot="no-more"
          style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;"
        >
          목록의 끝입니다 :)
        </div>
      </infinite-loading>
    </div>
  </section>
</template>

<script>
import BoardItem from '@/components/board/BoardItem';
import _ from 'lodash';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: { BoardItem },
  watch: {
    searchHashValue() {
      this.searchHash({ target: { value: this.searchHashValue } });
    },
  },
  data() {
    return {
      searchHashValue: '',
      lastLikeCount: '',
      lastCreatedAt: '',
      state: '',
    };
  },
  computed: {
    ...mapState(['hashtagBoards', 'isInfinity', 'hashtags']),
  },
  methods: {
    ...mapActions(['READ_BOARD_BY_HASHTAG', 'READ_HASH_ORDER_BY_COUNT']),
    ...mapMutations(['resetHashtagBoards', 'setIsInfinity']),
    searchHash: _.debounce(function({ target }) {
      console.log('두번오니?');
      this.searchHashValue = target.value;
      this.infiniteHandler(this.state);
    }, 750),
    async infiniteHandler($state) {
      this.state = $state;
      const hashtagName = this.searchHashValue;
      const lastLikeCount = this.lastLikeCount;
      const lastCreatedAt = this.lastCreatedAt;
      console.log(hashtagName);
      this.READ_BOARD_BY_HASHTAG({ hashtagName, lastLikeCount, lastCreatedAt });

      await setTimeout(() => {
        // isInfinity는 state에 올라가 있다. 초기 값은 Y
        console.log(this.isInfinity);
        if (this.isInfinity === 'Y') {
          // 마지막 DOM의 dataset에서 createdAt을 가져와, data에 등록된 lastCreateAt에 집어넣는다.
          if (this.$refs.boardItem.lastChild) {
            this.lastLikeCount = this.$refs.boardItem.lastChild.dataset.lastLikeCount;
            this.lastCreatedAt = this.$refs.boardItem.lastChild.dataset.lastCreatedAt;
          }
          console.log('계속된다.');
          $state.loaded(); // 계속 데이터가 남아있다는 것을 infinity에게 알려준다.
        } else {
          console.log('막힌다');
          $state.complete(); // 데이터는 모두 소진되고 다시 가져올 필요가 없다는 것을 알려준다.
        }
      }, 1000);
    },
    reset() {
      this.lastLikeCount = '';
      this.lastCreatedAt = '';
      this.resetHashtagBoards();
      this.setIsInfinity('Y');
    },
    selectHash(value) {
      if (value === this.searchHashValue) return;
      console.log(value);
      this.reset();
      this.searchHashValue = value;
    },
  },
  beforeDestroy() {
    this.searchHashValue = '';
    this.resetHashtagBoards();
    this.setIsInfinity('Y');
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
  },
  created() {
    this.READ_HASH_ORDER_BY_COUNT();
  },
};
</script>

<style scoped lang="scss">
.wrap {
  width: 700px;
  .boards {
    margin: 21px 0;
    padding: 2px 20px;
    &:first-child {
      padding: 20px 20px 8px;
    }
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
      .side-text {
        font-size: 13px;
        color: gray;
      }
      .hashtag {
        margin-top: 5px;
        padding: 9px;
        .hashtag-item {
          font-size: 15px;
          background: rgba(0, 0, 0, 0.1);
          margin-right: 10px;
          border-radius: 20px;
          padding: 5px 8px;
          color: #212732;
          cursor: pointer;
          &:hover {
            background: rgba(0, 0, 0, 0.17);
          }
          .hashtag-text {
            padding-right: 3px;
          }
          .hashtag-count {
            font-size: 11px;
          }
        }
      }
    }
    .form-control {
      margin-top: 20px;
      width: 50%;
    }
    .list-wrap {
      display: flex;
      flex-wrap: wrap;
      .board-list {
        display: table-cell;
        min-width: 180px;
        padding: 5px;
        .created-info {
          background: rgba(0, 0, 0, 0.1);
          height: 30px;
          padding: 0 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .created-by {
            font-size: 11px;
            padding-left: 4px;
          }
          .created-img {
            padding: 3px 12px;
            background-color: rgba(255, 255, 255, 0.5);
            color: white;
            width: 11px;
            height: 30px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          .created-icon {
            background: rgba(0, 0, 0, 0.1);
            padding: 5px 6px;
            width: 13px;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .space {
    padding: 10px 0;
  }
}
</style>
