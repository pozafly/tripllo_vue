<template>
  <section class="wrap">
    <div class="inside-wrap">
      <div class="boards">
        <div class="page-title main-title">
          <awesome icon="search" class="icon" />
          <span class="title-text">Search</span>
          <span class="side-text search-side"> - Search you want..</span>
          <input
            ref="input"
            v-model="searchHashValue"
            type="text"
            class="form-control"
            spellcheck="false"
            placeholder="Write you want Searching Hashtag"
            maxlength="14"
            @keydown="reset"
          />
        </div>
      </div>

      <div class="boards">
        <div class="page-title">
          <awesome icon="crown" class="icon" />
          <span class="title-text">Hash tags Ranking</span>
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
        <div ref="boardItem" class="list-wrap">
          <div
            v-for="board in hashtagBoards"
            :key="board.id"
            class="board-list"
            :lastCreatedAt="board.createdAt"
            :lastLikeCount="board.likeCount"
          >
            <BoardItem :board="board" />
            <div
              class="created-info"
              @click="$router.push(`/user/${board.createdBy}`)"
            >
              <span>
                <a
                  v-if="
                    board.createdUserPicture !== null &&
                      board.createdUserPicture !== 'null'
                  "
                  href=""
                  class="created-img"
                  :style="{
                    backgroundImage: `url(${board.createdUserPicture})`,
                  }"
                  @click.prevent="menuShow"
                ></a>
                <awesome v-else icon="user" class="created-icon"></awesome>
              </span>
              <span class="created-by">@{{ board.createdBy }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="infinity">
        <infinite-loading
          spinner="waveDots"
          :identifier="infiniteId"
          @infinite="infiniteHandler"
        >
          <div
            slot="no-more"
            style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;"
          >
            목록의 끝입니다 :)
          </div>
        </infinite-loading>
      </div>
    </div>
  </section>
</template>

<script>
import BoardItem from '@/components/board/BoardItem.vue';
import _ from 'lodash';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    BoardItem,
  },

  data() {
    return {
      searchHashValue: '',
      lastLikeCount: '',
      lastCreatedAt: '',
      state: '',
      infiniteId: +new Date(),
    };
  },

  computed: {
    ...mapState(['hashtagBoards', 'isInfinity', 'hashtags']),
  },

  watch: {
    searchHashValue() {
      this.searchHash({ target: { value: this.searchHashValue } });
    },
  },

  created() {
    this.readHash();
  },

  mounted() {
    this.inputFocus();
  },

  beforeDestroy() {
    this.reset();
  },

  methods: {
    ...mapActions(['READ_BOARD_BY_HASHTAG', 'READ_HASH_ORDER_BY_COUNT']),
    ...mapMutations(['resetHashtagBoards', 'setIsInfinity']),
    inputFocus() {
      this.$refs.input.focus();
    },
    readHash() {
      this.READ_HASH_ORDER_BY_COUNT();
    },
    searchHash: _.debounce(function({ target }) {
      this.infiniteId += 1;
      this.searchHashValue = target.value;
    }, 750),
    infiniteHandler($state) {
      this.state = $state;
      const hashtagName = this.searchHashValue;
      const lastLikeCount = this.lastLikeCount;
      const lastCreatedAt = this.lastCreatedAt;
      this.READ_BOARD_BY_HASHTAG({ hashtagName, lastLikeCount, lastCreatedAt });

      setTimeout(() => {
        // isInfinity는 state에 올라가 있다. 초기 값은 Y
        if (this.isInfinity === 'Y') {
          if (this.$refs.boardItem) {
            this.lastLikeCount = this.$refs.boardItem.lastChild.getAttribute(
              'lastLikeCount',
            );
            this.lastCreatedAt = this.$refs.boardItem.lastChild.getAttribute(
              'lastCreatedAt',
            );
          }
          $state.loaded(); // 계속 데이터가 남아있다는 것을 infinity에게 알려준다.
        } else {
          this.setIsInfinity('N');
          $state.complete(); // 데이터는 모두 소진되고 다시 가져올 필요가 없다는 것을 알려준다.
        }
      }, 1200);
    },
    reset() {
      this.searchHashValue = '';
      this.lastLikeCount = '';
      this.lastCreatedAt = '';
      this.resetHashtagBoards();
      this.setIsInfinity('Y');
    },
    selectHash(value) {
      if (value === this.searchHashValue) {
        return;
      }
      this.searchHashValue = value;
      this.reset();
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  width: 700px;
  .inside-wrap {
    background: #fff;
    margin: 21px 0;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 19px;
    border-radius: 16px;
    .boards {
      margin: 30px 0;
      &:first-child {
        margin: 40px;
        text-align: center;
      }
      .page-title {
        padding-bottom: 13px;
        padding-left: 7px;
        font-size: 18px;
        font-weight: 540;
        &.main-title {
          font-size: 25px;
          font-weight: 700;
        }
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
          &.search-side {
            font-weight: 540;
          }
        }
        .hashtag {
          margin-top: 5px;
          padding: 9px;
          font-weight: 420;
          .hashtag-item {
            font-size: 13px;
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
        margin: 30px auto 20px;
        width: 50%;
        height: 30px;
        font-size: 14px;
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
            cursor: pointer;
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
    .infinity {
      padding: 10px 0;
    }
  }
}
</style>
