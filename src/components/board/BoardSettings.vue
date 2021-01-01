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
        <li><i class="fas fa-exchange-alt"></i>Change Background</li>
        <div class="color-picker">
          <a href="" :data-value="red" @click.prevent="onChangeTheme"></a>
          <a href="" :data-value="orange" @click.prevent="onChangeTheme"></a>
          <a href="" :data-value="yellow" @click.prevent="onChangeTheme"></a>
          <a href="" :data-value="green" @click.prevent="onChangeTheme"></a>
          <a href="" :data-value="blue" @click.prevent="onChangeTheme"></a>
          <a href="" :data-value="indigo" @click.prevent="onChangeTheme"></a>
          <a href="" :data-value="violet" @click.prevent="onChangeTheme"></a>
          <a
            href=""
            :data-value="draculaorchid"
            @click.prevent="onChangeTheme"
          ></a>
        </div>
        <li>
          <i class="fas fa-trash-alt"></i>
          <a href="" @click.prevent="onDeleteBoard">Delete Board</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      red: '#fa5252',
      orange: '#fd7e14',
      yellow: '#ffa500',
      green: '#4AC06A',
      blue: '#339af0',
      indigo: '#5c7cfa',
      violet: '#7950f2',
      draculaorchid: '#2d3436',
    };
  },
  computed: {
    ...mapState(['board']),
  },
  mounted() {
    Array.from(this.$el.querySelectorAll('.color-picker a')).forEach(el => {
      el.style.backgroundColor = el.dataset.value;
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

<style lang="scss">
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
      list-style: none;
      .fas {
        margin-right: 5px;
      }
      .color-picker {
        margin: 0 15px;
        & a {
          display: inline-block;
          width: 48%;
          height: 100px;
          border-radius: 8px;
          margin-right: 5.2px;
        }
      }
    }
    & li {
      height: 18px;
      line-height: 18px;
      padding: 10px;
      margin: 5px;
      border-radius: 3px;
      font-size: 18px;
      font-weight: 700;
      color: #111;
      margin-bottom: 5px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    & li a {
      text-decoration: none;
      color: inherit;
    }
  }
}

/* .color-picker */
</style>
