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
        </div>
      </div>
    </div>
    <div class="space"></div>
  </section>
</template>

<script>
import BoardItem from '@/components/board/BoardItem';
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';

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
  watch: {
    searchHashValue: _.debounce(function() {
      console.log('실행?');
      this.READ_BOARD_BY_HASHTAG(this.searchHashValue);
    }, 750),
  },
  methods: {
    ...mapActions(['READ_BOARD_BY_HASHTAG']),
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
      }
    }
  }
  .space {
    padding: 10px 0;
  }
}
</style>
