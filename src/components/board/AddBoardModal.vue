<template>
  <AddBoardModalBase @close="closeModal">
    <div slot="header">
      <a href="" class="modal-default-button" @click.prevent="closeModal">
        &times;
      </a>
      <h2>
        Create New Board!
      </h2>
    </div>
    <div slot="body">
      <div class="body">
        <input
          class="form-control"
          type="text"
          v-model="input"
          ref="input"
          placeholder="Please write new board title"
        />
        <div class="color-picker">
          <a
            class="color"
            :data-value="color"
            @click.prevent="clickColor(color)"
            v-for="color in colors"
            :key="color"
          >
            <awesome
              class="check-icon"
              v-if="selectColor === color"
              :icon="['far', 'check-circle']"
            ></awesome>
          </a>
        </div>
        <div class="hash-wrap">
          <input
            class="form-control hash-form"
            type="text"
            v-model="input"
            placeholder="Please write new board title"
          />
          <div class="hash-item">
            dddd
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="btn-wrap">
      <button
        class="btn"
        type="submit"
        form="add-board-form"
        :disabled="!valid"
        @click.prevent="addBoard"
      >
        Create Board
      </button>
    </div>
    <div slot="side"></div>
  </AddBoardModalBase>
</template>

<script>
import AddBoardModalBase from '@/components/board/AddBoardModalBase';
import { mapActions } from 'vuex';

export default {
  components: { AddBoardModalBase },
  data() {
    return {
      input: '',
      valid: false,
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
      selectColor: '#339af0',
    };
  },
  watch: {
    input(value) {
      this.valid = value.trim().length > 0;
    },
  },
  mounted() {
    this.$refs.input.focus();
    // 색상 선택기에 데이터 넣기
    Array.from(this.$el.querySelectorAll('.color-picker a')).forEach(el => {
      el.style.backgroundColor = el.dataset.value;
    });
  },
  methods: {
    ...mapActions(['CREATE_BOARD']),
    async addBoard() {
      const { data } = await this.CREATE_BOARD(this.input);
      await this.$notify({
        group: 'custom-template',
        duration: 5000,
        closeOnClick: true,
        title: '보드 생성 성공!',
        text: `'${this.input}' 보드가 만들어졌습니다.`,
      });
      await this.$router.push(`/board/${data.data.id}`);
    },
    clickColor(color) {
      this.selectColor = color;
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
h2 {
  margin: 32px 32px 32px 34px;
  color: #212732;
  // color: #4f5d76;
}
.modal-default-button {
  color: black;
  font-size: 20px;
  float: right;
  position: relative;
  top: -25px;
  &:hover {
    font-weight: 700;
  }
}
.body {
  display: flex;
  flex-direction: column;
  .form-control {
    width: 98.8%;
    height: 30px;
    margin: 20px auto;
  }
  .color-picker {
    display: flex;
    justify-content: center;
    & a {
      display: inline-block;
      width: 15%;
      height: 60px;
      border-radius: 8px;
      margin: 0 5px;
      cursor: pointer;
      &:hover {
        filter: brightness(90%) !important;
      }
      .check-icon {
        position: relative;
        color: #fff;
        display: flex;
        top: 33%;
        left: 35%;
        font-size: 20px;
      }
    }
  }
  .hash-wrap {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 20px;
    .hash-form {
      width: 50%;
    }
    .hash-item {
      width: 50%;
    }
    /* height: 60px; */
    /* background: pink; */
  }
}
.btn-wrap {
  text-align: center;
  .btn {
    cursor: pointer;
    border: 0;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
    margin: 0 auto;
    width: 50%;
    height: 1.8rem;
    background: #5aac44;
    color: white;
    &:hover {
      background: #60bd4e;
    }
    &:disabled {
      background: #ccc;
      cursor: default;
    }
  }
}
</style>
