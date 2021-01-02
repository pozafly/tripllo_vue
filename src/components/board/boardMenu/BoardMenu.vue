<template>
  <div class="board-menu">
    <div class="board-menu-wrap">
      <div class="board-menu-header">
        <div class="header-title">Menu</div>
        <a class="header-close-btn" href="" @click.prevent="onClose">
          &times;
        </a>
      </div>
      <ul class="menu-list">
        <li class="menu-item">
          <div><i class="fas fa-user"></i>Made by</div>
          <div
            class="img"
            v-if="user.picture !== null && user.picture !== 'null'"
          ></div>
          <i class="fas fa-user icon" v-else></i>
          <div class="menu-profile">
            <div class="profile-item title">{{ board.title }}</div>
            <div class="profile-item name">@{{ board.createdBy }}</div>
            <div class="profile-item email">{{ board.createdAt }} 생성됨</div>
          </div>
        </li>
        <li class="menu-item">
          <i class="fas fa-exchange-alt"></i>Change Background
        </li>
        <div class="color-picker">
          <a class="color" :data-value="red" @click.prevent="onChangeTheme"></a>
          <a
            class="color"
            :data-value="orange"
            @click.prevent="onChangeTheme"
          ></a>
          <a
            class="color"
            :data-value="yellow"
            @click.prevent="onChangeTheme"
          ></a>
          <a
            class="color"
            :data-value="green"
            @click.prevent="onChangeTheme"
          ></a>
          <a
            class="color"
            :data-value="blue"
            @click.prevent="onChangeTheme"
          ></a>
          <a
            class="color"
            :data-value="indigo"
            @click.prevent="onChangeTheme"
          ></a>
          <a
            class="color"
            :data-value="violet"
            @click.prevent="onChangeTheme"
          ></a>
          <a
            class="color"
            :data-value="black"
            @click.prevent="onChangeTheme"
          ></a>
          <a class="new-pick" @click.prevent="onChangeTheme">
            <div class="color new-pick-text" @click="isPicker = true">
              색상선택기
            </div>
          </a>
          <Photoshop v-if="isPicker" @cancle="isPicker = false" />
        </div>
        <li class="menu-item delete-board" @click.prevent="onDeleteBoard">
          <i class="fas fa-trash-alt"></i>
          <a href="">
            Delete Board
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import Photoshop from '@/components/board/boardMenu/Photoshop';

export default {
  components: {
    Photoshop,
  },
  data() {
    return {
      red: '#fa5252',
      orange: '#fd7e14',
      yellow: '#ffa500',
      green: '#4AC06A',
      blue: '#339af0',
      indigo: '#5c7cfa',
      violet: '#7950f2',
      black: '#3a4142',
      isPicker: false,
    };
  },
  computed: {
    ...mapState(['board', 'user']),
  },
  mounted() {
    console.log(this.user);
    Array.from(this.$el.querySelectorAll('.color-picker a')).forEach(el => {
      el.style.backgroundColor = el.dataset.value;
    });

    const imgList = this.$el.querySelectorAll('.img');
    console.log(imgList);
    Array.from(imgList).forEach(e => {
      e.style.backgroundImage = `url(${this.user.picture})`;
    });
  },
  methods: {
    ...mapMutations(['setTheme']),
    ...mapActions(['DELETE_BOARD', 'UPDATE_BOARD']),
    onClose() {
      this.$emit('close');
    },
    onDeleteBoard() {
      if (!window.confirm(`Delete ${this.board.title} Board?`)) return;
      this.DELETE_BOARD({ id: this.board.id }).then(() =>
        this.$router.push('/main'),
      );
    },
    onChangeTheme(el) {
      const id = this.board.id;
      const bgColor = el.target.dataset.value;
      this.UPDATE_BOARD({ id, bgColor }).then(() => this.setTheme(bgColor));
    },
  },
};
</script>

<style scoped lang="scss">
.board-menu {
  position: absolute;
  right: 0;
  top: 0;
  height: 93.945%;
  background-color: #edeff0;
  width: 350px;
  transition: all 0.3s;
  margin: 40px auto;
  padding: -40px 0;
  box-sizing: border-box;
  z-index: 1;
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
        right: 10px;
        text-decoration: none;
        font-size: 24px;
        color: #999;
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
            padding-top: 21px;
          }
        }
      }
      .fa-user:nth-child(2) {
        font-size: 20px;
        &.icon {
          /* border: 1px solid black; */
          display: inline-block;
          padding: 14px;
          margin-top: 15px;
          color: white;
          border-radius: 90px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          cursor: auto;
        }
      }
      .menu-profile {
        display: inline-block;
        position: relative;
        margin-left: 13px;
        top: 17px;
        .profile-item {
          font-size: 13px;
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
      margin-top: 23px;
      &:nth-child(2) {
        margin-top: 90px;
      }
      &.delete-board {
        display: block;
        margin-top: 50px;
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
    }
    & li a {
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>
