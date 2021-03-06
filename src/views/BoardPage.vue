<template class="container">
  <div class="board-page">
    <CommonHeader />
    <div class="board-section">
      <div class="board-wrapper">
        <div class="board">
          <BoardHeader :user-id="user.id" />
          <main class="list-section-wrapper">
            <div class="list-section">
              <div
                v-for="list in board.lists"
                :key="list.id"
                class="list-wrapper"
                :listId="list.id"
              >
                <ListItem v-bind="list" />
              </div>
              <div class="addList-wrapper">
                <AddList @listFocus="listFocus" />
              </div>
            </div>
          </main>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/header/CommonHeader.vue';
import ListItem from '@/components/list/ListItem.vue';
import AddList from '@/components/list/AddList.vue';
import BoardHeader from '@/components/board/boardHeader/BoardHeader.vue';
import dragger from '@/utils/dragger';
import { updateUserAPI } from '@/api/user';
import { mapActions, mapMutations, mapState } from 'vuex';
import { isEmpty } from '@/utils/libs';

export default {
  metaInfo() {
    return {
      title: this.board.title,
      titleTemplate: '%s | Tripllo',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.makeContent,
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.makeContent,
        },
        {
          vmid: 'author',
          name: 'author',
          content: this.user.id,
        },
        {
          vmid: 'og:title',
          property: 'og:title',
          content: this.board.title,
        },
        {
          vmid: 'og:description',
          property: 'og:description',
          content: this.makeContent,
        },
        {
          vmid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_API_URL}/board/${this.board.id}`,
        },
      ],
    };
  },

  components: {
    CommonHeader,
    ListItem,
    AddList,
    BoardHeader,
  },

  data() {
    return {
      cDragger: '',
      lDragger: '',
    };
  },

  computed: {
    ...mapState(['board', 'user']),
    makeContent() {
      if (isEmpty(this.board.hashtag)) {
        return;
      } else {
        const hashList = JSON.parse(this.board.hashtag);
        const listToString = hashList.join(',');
        return listToString;
      }
    },
  },

  created() {
    this.readBoardDetail();
  },

  mounted() {
    this.setOverflowStyle('hidden');
    this.makeRecent();
  },

  updated() {
    this.updateDragger();
  },

  beforeDestroy() {
    this.setOverflowStyle('scroll');
  },

  methods: {
    ...mapActions(['READ_BOARD_DETAIL', 'READ_USER']),
    ...mapMutations(['setTheme']),

    setOverflowStyle(type) {
      window.document.body.style.overflowY = type;
    },

    async readBoardDetail() {
      try {
        await this.READ_BOARD_DETAIL(this.$route.params.boardId);
        this.setTheme(this.board.bgColor);
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          alert('해당 Board의 정보가 없습니다.');
        }
        this.$router.push('/main');
      }
    },

    updateDragger() {
      dragger.listDragger();
      dragger.cardDragger();
    },

    // 3개의 recent board만 허락함.
    makeRecent() {
      let recentArray = [];
      const boardId = this.$route.params.boardId;

      if (!!this.user.recentBoard) {
        recentArray = JSON.parse(this.user.recentBoard);
      }
      recentArray.filter((el, idx) => {
        if (el === boardId) {
          recentArray.splice(idx, 1);
        }
      });

      if (recentArray.length >= 3) {
        recentArray.pop();
      }
      recentArray.unshift(boardId);

      this.updateUser(JSON.stringify(recentArray));
    },

    async updateUser(recentBoard) {
      try {
        await updateUserAPI({ id: this.user.id, recentBoard });
        await this.READ_USER(this.user.id);
      } catch (error) {
        console.log(error);
        alert('최근 board를 추가하지 못했습니다.');
      }
    },

    listFocus() {
      setTimeout(() => {
        this.$el.querySelector('.list-section').lastChild.scrollIntoView();
      }, 100);
    },
  },
};
</script>

<style scoped lang="scss">
.board-page {
  position: relative;
  top: 40px;
  height: 100%;
  .board-section {
    position: relative;
    margin: -40px auto;
    padding-top: 40px;
    min-height: 100%;
    box-sizing: border-box;
    .board-wrapper {
      position: absolute;
      top: 40px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      .board {
        display: flex;
        flex-direction: column;
        height: 100%;

        .list-section-wrapper {
          flex-grow: 1;
          position: relative;
          .list-section {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            padding: 0 10px;
            &::-webkit-scrollbar {
              width: 10px;
              height: 13px;
              background: #ffffff;
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 3.5px;
              background-color: #bfc4ce;
              &:hover {
                background-color: #adb5bd;
              }
            }
            .list-wrapper {
              display: inline-block;
              height: 100%;
              width: 272px;
              vertical-align: top;
              margin-right: 5px;
              pointer-events: none;
            }
            .addList-wrapper {
              display: inline-block;
              height: 100%;
              width: 272px;
              vertical-align: top;
              margin-right: 5px;
              pointer-events: none;
            }
          }
        }
      }
    }
  }
}
</style>
