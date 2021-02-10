<template>
  <section class="wrap">
    <div class="boards">
      <div class="page-title">
        <awesome icon="search" class="icon"></awesome>
        <span class="title-text">Search</span>
        <span class="side-text"> - Search you want..</span>
        <input
          type="text"
          class="form-control"
          ref="input"
          spellcheck="false"
          placeholder="Write you want Searching Hashtag"
          v-model="searchHashValue"
          @input="searchHash"
        />
      </div>
    </div>

    <div class="boards">
      <div class="page-title">
        <awesome icon="layer-group" class="icon"></awesome>
        <span class="title-text">Public Boards</span>
        <span class="side-text"> - order by like</span>
      </div>
      <div class="list-wrap">
        <div class="board-list" v-for="board in hashtagBoards" :key="board.id">
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
              <!-- {{ board.createdUserPicture }} -->
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="space"></div>
  </section>
</template>

<script>
import BoardItem from '@/components/board/BoardItem';
import _ from 'lodash';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: { BoardItem },
  data() {
    return {
      searchHashValue: '',
    };
  },
  computed: {
    ...mapState(['hashtagBoards']),
  },
  methods: {
    ...mapActions(['READ_BOARD_BY_HASHTAG']),
    ...mapMutations(['deleteHashtagBoards']),
    searchHash: _.debounce(function({ target }) {
      this.READ_BOARD_BY_HASHTAG(target.value);
    }, 750),
  },

  beforeDestroy() {
    this.searchHashValue = '';
    this.deleteHashtagBoards();
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
    this.READ_BOARD_BY_HASHTAG('');
  },
};
</script>

<style scoped lang="scss">
.wrap {
  width: 700px;
  .boards {
    margin: 21px 0;
    padding: 20px;
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
