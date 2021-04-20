<template>
  <section class="wrap">
    <div class="inside-wrap">
      <div class="boards">
        <div class="page-title main-title">
          <awesome icon="search" class="icon" />
          <span class="title-text">Search</span>
          <span class="side-text search-side"> - Search you want..</span>
          <input
            v-model="searchHashValue"
            v-focus
            type="text"
            class="form-control"
            spellcheck="false"
            placeholder="Write you want Searching Hashtag"
            maxlength="14"
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
              v-for="hashtag in hashtags"
              :key="hashtag.name"
              class="hashtag-item"
              @click="selectHash(hashtag.name)"
            >
              <span class="hashtag-text"># {{ hashtag.name }}</span>
              <span class="hashtag-count">({{ hashtag.count }})</span>
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
        <div class="list-wrap">
          <div
            v-for="board in hashtagBoards"
            :key="board.id"
            class="board-list"
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
import {
  readRankingByLikeCountAPI,
  readBoardByHashtagAPI,
} from '@/api/hashtag';

export default {
  components: {
    BoardItem,
  },

  data() {
    return {
      searchHashValue: '',
      lastLikeCount: '',
      lastCreatedAt: '',
      infiniteId: +new Date(),
      isInfinity: true,
      hashtags: {},
      hashtagBoards: [],
    };
  },

  watch: {
    searchHashValue() {
      this.searchHash({ target: { value: this.searchHashValue } });
    },
  },

  created() {
    this.readHashtagRanking();
  },

  beforeDestroy() {
    this.searchHashValue = '';
    this.reset();
  },

  methods: {
    async readHashtagRanking() {
      try {
        const { data } = await readRankingByLikeCountAPI();
        this.hashtags = data.data;
      } catch (error) {
        console.log(error);
        alert('해시태그 랭킹을 가져오는데 실패했습니다.');
      }
    },

    searchHash: _.debounce(function({ target }) {
      this.infiniteId += 1;
      this.searchHashValue = target.value;
      this.reset();
    }, 750),

    async infiniteHandler($state) {
      try {
        const { data } = await readBoardByHashtagAPI({
          hashtagName: this.searchHashValue,
          lastLikeCount: this.lastLikeCount,
          lastCreatedAt: this.lastCreatedAt,
        });
        const boardItem = data.data;

        if (boardItem === null) {
          this.isInfinity = false;
          $state.complete(); // 데이터는 모두 소진되고 다시 가져올 필요가 없다는 것을 알려준다.
        } else {
          this.hashtagBoards = this.hashtagBoards.concat(boardItem);
          setTimeout(() => {
            const lastEl = boardItem[boardItem.length - 1];

            this.lastLikeCount = lastEl.likeCount;
            this.lastCreatedAt = lastEl.createdAt;

            $state.loaded(); // 계속 데이터가 남아있다는 것을 infinity에게 알려준다.
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        alert('HashTag 보드를 가져오지 못했습니다.');
      }
    },

    reset() {
      this.lastLikeCount = '';
      this.lastCreatedAt = '';
      this.hashtagBoards = [];
      this.isInfinity = true;
    },

    selectHash(value) {
      if (value === this.searchHashValue) {
        return;
      }
      this.reset();
      this.searchHashValue = value;
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
