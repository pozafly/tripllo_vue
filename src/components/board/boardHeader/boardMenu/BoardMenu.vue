<template>
  <aside class="board-menu">
    <div class="board-menu-wrap">
      <div class="board-menu-header">
        <div class="header-title">Menu</div>
        <a class="header-close-btn" href="" @click.prevent="onClose">
          &times;
        </a>
      </div>
      <ul class="menu-list">
        <li class="menu-item">
          <div><awesome icon="user" class="fas fa-user"></awesome>Made by</div>
          <div
            v-if="
              board.createdByPicture !== null &&
                board.createdByPicture !== 'null'
            "
            class="img"
          ></div>
          <div v-else class="icon">
            <awesome icon="user" class="fas fa-user svg"></awesome>
          </div>

          <div class="menu-profile">
            <div class="profile-item title">{{ board.title }}</div>
            <div class="profile-item name">@{{ board.createdBy }}</div>
            <div class="profile-item email">
              {{ board.createdAt | normalFormatDate }} 생성됨
            </div>
          </div>
        </li>
        <li class="menu-item">
          <awesome icon="exchange-alt" class="fas fa-exchange-alt"></awesome>
          Change Background
        </li>
        <div class="color-picker">
          <a
            v-for="color in colors"
            :key="color"
            class="color"
            :style="{ backgroundColor: color }"
            @click.prevent="onChangeTheme(color)"
          ></a>
          <a class="new-pick" @click="isPicker = true">
            <div class="color new-pick-text">
              색상선택기
            </div>
          </a>
          <BoardMenuColorPicker v-if="isPicker" @cancel="isPicker = false" />
        </div>
        <li class="menu-item delete-board" @click.prevent="onDeleteBoard">
          <awesome icon="trash-alt" class="fas fa-trash-alt"></awesome>
          <a href="">
            Delete Board
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import BoardMenuColorPicker from '@/components/board/boardHeader/boardMenu/BoardMenuColorPicker.vue';
import { deleteBoardAPI, updateBoardAPI } from '@/api/board';
import { mapMutations, mapState } from 'vuex';

export default {
  components: {
    BoardMenuColorPicker,
  },

  data() {
    return {
      colors: {
        red: '#fa5252',
        coral: '#ff7f50',
        yellow: '#ffa500',
        green: '#4AC06A',
        blue: '#339af0',
        indigo: '#5c7cfa',
        violet: '#7950f2',
        black: '#3a4142',
      },
      isPicker: false,
    };
  },

  computed: {
    ...mapState(['board', 'user']),
  },

  mounted() {
    this.setStyle();
  },

  methods: {
    ...mapMutations(['setTheme']),

    onClose() {
      this.$emit('close');
    },

    async onDeleteBoard() {
      if (!window.confirm(`Delete ${this.board.title} Board?`)) {
        return;
      }

      try {
        await deleteBoardAPI(this.board.id);
        this.$notify({
          group: 'custom-template',
          duration: 5000,
          closeOnClick: true,
          title: '보드 삭제 완료',
          text: `'${this.board.title}' 보드가 삭제되었습니다.`,
        });
        this.$router.push('/main');
      } catch (error) {
        console.log(error);
        alert('해당 Board를 삭제하지 못했습니다.');
      }
    },

    async onChangeTheme(color) {
      const id = this.board.id;
      const bgColor = color;

      try {
        const { data } = await updateBoardAPI(id, { bgColor });
        this.setTheme(data.data.bgColor);
      } catch (error) {
        console.log(error);
        alert('배경 색상을 변경하지 못했습니다.');
      }
    },

    setStyle() {
      // icon image setting
      if (
        this.board.createdByPicture === null ||
        this.board.createdByPicture === 'null'
      ) {
        const icon = this.$el.querySelectorAll('.icon');
        Array.from(icon)[0].style.backgroundColor = this.board.bgColor;
      } else {
        const imgList = this.$el.querySelectorAll('.img');
        Array.from(imgList).forEach(e => {
          e.style.backgroundImage = `url(${this.board.createdByPicture})`;
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.board-menu {
  position: absolute;
  right: 0;
  top: -35px;
  height: 97%;
  border-radius: 9px;
  background-color: #edeff0;
  width: 350px;
  transition: all 0.3s;
  margin: 40px auto;
  padding: -40px 0;
  box-sizing: border-box;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
  .board-menu-wrap {
    margin: 0 15px;
    height: 100%;
    .board-menu-header {
      height: 46px;
      padding: 0 6px 0 12px;
      border-bottom: #bbb solid 1px;
      .header-title {
        font-size: 18px;
        text-align: center;
        line-height: 46px;
        font-weight: 700;
      }
      .header-close-btn {
        position: absolute;
        top: 10px;
        right: 15px;
        text-decoration: none;
        font-size: 24px;
        color: #999;
        &:hover {
          font-weight: 700;
          color: black;
        }
      }
    }
    .menu-list {
      .fas {
        margin-right: 5px;
      }
      .color-picker {
        margin: -5px 15px;
        & a {
          display: inline-block;
          width: 48%;
          height: 60px;
          border-radius: 8px;
          margin-right: 5.2px;
          cursor: pointer;
          &:hover {
            filter: brightness(90%) !important;
          }
        }
        .new-pick {
          width: 98%;
          background: #40e0d0;
          background: -webkit-linear-gradient(
            to right,
            #ff0080,
            #ff8c00,
            #40e0d0
          );
          background: linear-gradient(to right, #ff0080, #ff8c00, #40e0d0);
          text-align: center;
          color: white;
          .new-pick-text {
            font-size: 14px;
            padding-top: 15px;
          }
        }
      }
      .menu-profile {
        display: inline-block;
        position: relative;
        margin-left: 13px;
        top: 25px;
        display: inline-block;
        .profile-item {
          font-size: 13px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    & li {
      height: 18px;
      line-height: 18px;
      padding: 19px;
      margin: 5px;
      border-radius: 3px;
      font-size: 16px;
      font-weight: 400;
      color: #111;
      margin-bottom: 5px;
    }
    .menu-item {
      display: inline-block;
      &:nth-child(2) {
        margin-top: 60px;
      }
      &.delete-board {
        position: absolute;
        bottom: 30px;
        left: 15px;
        right: 15px;
        padding: 13px 19px;
        cursor: pointer;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
      .img {
        display: inline;
        padding: 15px 24px;
        width: 30px;
        margin-top: 15px;
        border-radius: 90px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        cursor: auto;
      }
      .icon {
        font-size: 20px;
        display: inline-block;
        position: relative;
        padding: 14px 12px;
        color: white;
        border-radius: 50%;
        .svg {
          position: relative;
          top: -1px;
          left: 2px;
        }
      }
    }
    & li a {
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>
