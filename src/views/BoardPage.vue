<template class="container">
  <div class="page">
    <Header />
    <div class="wrap">
      <div class="board-wrapper">
        <div class="board">
          <div class="board-header">
            <input
              class="form-control"
              v-if="isEditTitle"
              type="text"
              v-model="inputTitle"
              ref="inputTitle"
              @keypress.enter="onKeyupEnter"
              @blur="onSubmitTitle"
            />
            <span v-else class="board-title" @click="onClickTitle">
              {{ board.title }} <i class="fas fa-edit"></i>
            </span>
            <a
              class="board-header-btn show-menu"
              href=""
              @click.prevent="onShowSettings"
            >
              ... Show Menu
            </a>
          </div>
          <div class="list-section-wrapper">
            <div class="list-section">
              <div
                class="list-wrapper"
                v-for="list in board.lists"
                :key="list.id"
                :data-list-id="list.id"
              >
                <List :list="list" />
              </div>
              <div class="addList-wrapper">
                <AddList />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BoardSettings
        v-if="isShowBoardSettings"
        @close="isShowBoardSettings = false"
      />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import List from '@/components/list/List';
import AddList from '@/components/list/AddList';
import BoardSettings from '@/components/board/BoardSettings';
import dragger from '@/utils/dragger';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    Header,
    List,
    BoardSettings,
    AddList,
  },
  data() {
    return {
      loading: false,
      isEditTitle: false,
      inputTitle: '',
      isShowBoardSettings: '',
      cDragger: '',
      lDragger: '',
    };
  },
  computed: {
    ...mapState(['board']),
  },
  created() {
    this.READ_BOARD_DETAIL(this.$route.params.boardId).then(() => {
      this.setTheme(this.board.bgColor);
    });
  },
  updated() {
    this.setCardDragger();
    this.setListDragger();
  },
  methods: {
    ...mapActions([
      'READ_BOARD_DETAIL',
      'UPDATE_BOARD',
      'UPDATE_CARD',
      'UPDATE_LIST',
    ]),
    ...mapMutations(['setTheme']),
    onClickTitle() {
      this.isEditTitle = true;
      //$nextTick : 시간 지연 // https://backback.tistory.com/382
      this.$nextTick(() => {
        this.$refs.inputTitle.value = this.board.title;
        this.$refs.inputTitle.focus();
      });
    },
    onKeyupEnter() {
      // 이벤트 트리거. onSubmitTitle이 두번 실행되는 것을 방지. https://velog.io/@kyh196201/1025
      event.target.blur();
    },
    onSubmitTitle() {
      this.isEditTitle = false;

      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return;

      const id = this.board.id;
      const title = this.inputTitle;
      if (title === this.board.title) return;

      this.UPDATE_BOARD({ id, title });
    },
    onShowSettings() {
      this.isShowBoardSettings = true;
    },
    setCardDragger() {
      if (this.cDragger) this.cDragger.destroy();
      this.cDragger = dragger.init(
        Array.from(this.$el.querySelectorAll('.card-list')),
      );

      this.cDragger.on('drop', (el, wrapper, target, siblings) => {
        const targetCard = {
          id: el.dataset.cardId * 1,
          // list 이동과는 다르게, card 이동은 list간의 이동도 가능해야하기때문에 listId 를 줌.
          listId: wrapper.dataset.listId * 1,
          pos: 65535,
        };
        const { prev, next } = dragger.siblings({
          el,
          wrapper,
          candidates: Array.from(wrapper.querySelectorAll('.card-item')),
          type: 'card',
        });

        // 맨 앞으로 옮겼다면,
        if (!prev && next) targetCard.pos = next.pos / 2;
        // 맨 뒤로 옮겼다면,
        else if (!next && prev) targetCard.pos = prev.pos * 2;
        // 중간 어딘가로 옮겼다면,
        else if (prev && next) targetCard.pos = (prev.pos + next.pos) / 2;

        this.UPDATE_CARD(targetCard);
      });
    },
    setListDragger() {
      if (this.lDragger) this.lDragger.destroy();
      const options = {
        invalid: (el, handle) => !/^list/.test(handle.className),
        // list는 가로 방향으로만 동작하므로 options에 direction을 넣어줘야 함.
        direction: 'horizontal',
      };
      this.lDragger = dragger.init(
        Array.from(this.$el.querySelectorAll('.list-section')),
        options,
        'list',
      );
      this.lDragger.on('drop', (el, wrapper, target, siblings) => {
        const targetList = {
          id: el.dataset.listId * 1,
          pos: 65535,
        };
        const { prev, next } = dragger.siblings({
          el,
          wrapper,
          candidates: Array.from(wrapper.querySelectorAll('.list')),
          type: 'list',
        });

        if (!prev && next) targetList.pos = next.pos / 2;
        else if (!next && prev) targetList.pos = prev.pos * 2;
        else if (prev && next) targetList.pos = (prev.pos + next.pos) / 2;

        this.UPDATE_LIST(targetList);
      });
    },
  },
};
</script>

<style scoped lang="scss">
/* * {
  border: 1px solid black;
} */
.page {
  position: relative;
  height: 100%;
  .wrap {
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
        .board-header {
          flex: none;
          padding: 8px 4px 8px 8px;
          margin: 0;
          height: 36px;
          line-height: 32px;
          &input[type='text'] {
            width: 200px;
          }
          .form-control {
            width: 17rem;
          }
          .board-title {
            color: #fff;
            font-weight: 700;
            font-size: 18px;
            cursor: pointer;
            .fa-edit {
              display: none;
            }
            &:hover {
              .fa-edit {
                display: inline-block;
                font-size: 10px;
              }
            }
          }
          .board-header-btn {
            border-radius: 4px;
            padding: 2px 10px;
            height: 30px;
            margin-bottom: 15px;
            display: inline-block;
            color: #fff;
            &:hover {
              background-color: rgba(0, 0, 0, 0.15);
              cursor: pointer;
            }
            &.show-menu {
              font-size: 14px;
              position: absolute;
              right: 15px;
            }
          }
        }
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
            .list-wrapper {
              display: inline-block;
              height: auto;
              width: 272px;
              vertical-align: top;
              margin-right: 5px;
            }
            .addList-wrapper {
              display: inline-block;
              height: 100%;
              width: 272px;
              vertical-align: top;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
