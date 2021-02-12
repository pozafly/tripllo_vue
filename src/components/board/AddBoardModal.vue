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
        <div class="first-line">
          <div class="line-item">
            <div class="title-wrap">
              <awesome icon="clipboard-list" class="icon" />
              <span>Title</span>
              <span class="require">*</span>
            </div>
            <input
              class="form-control"
              type="text"
              v-model="title"
              ref="title"
              placeholder="보드 제목을 입력해주세요"
            />
          </div>

          <div class="line-item">
            <div class="title-wrap">
              <awesome icon="globe-americas" class="icon" />
              <span>Disclosure status</span>
              <span class="require">*</span>
              <div class="subtext">
                - Board의 공개여부를 결정합니다. 추후 변경 가능.
              </div>
            </div>
            <form class="radio-wrap">
              <input type="radio" id="public" value="Y" v-model="publicYn" />
              <label for="public" class="radio-label">Public</label>
              <input type="radio" id="private" value="N" v-model="publicYn" />
              <label for="private" class="radio-label">Private</label>
            </form>
          </div>
        </div>

        <div class="title-wrap" v-if="isHashtag">
          <awesome icon="hashtag" class="icon" />
          <span>Hash Tag</span>
          <div class="subtext">
            - Board를 public으로 설정할 시 해시태그로 노출됩니다.<br />
            - 15자 이내, 3개 까지 입력가능.
          </div>
        </div>
        <div class="hash-wrap" v-if="isHashtag">
          <input
            class="form-control hash-form"
            type="text"
            v-model="hashItem"
            placeholder="예시) 국내여행, 고양이 ... 등"
            @keypress.enter="pushHash"
          />
          <div class="hash-item">
            <span class="hashtag" v-for="hash in hashList" :key="hash">
              # {{ hash }}
              <span class="hashtag-delete" @click="deleteHash(hash)"
                >&times;</span
              >
            </span>
          </div>
        </div>
        <div class="color-wrap">
          <div class="title-wrap">
            <awesome icon="fill-drip" class="icon" />
            <span>Color</span>
            <div class="subtext">
              - Board의 색상을 선택합니다. 추후 변경 가능.
            </div>
          </div>
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
      title: '',
      valid: false,
      hashList: [],
      hashItem: '',
      isHashtag: true,
      publicYn: 'Y',
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
    title(value) {
      this.valid = value.trim().length > 0;
    },
    hashItem() {
      if (this.hashItem.trim().length > 14) {
        alert('해시태그는 15자를 넘길 수 없습니다.');
        return;
      }
    },
    publicYn() {
      console.log(this.publicYn);
      if (this.publicYn === 'N') this.isHashtag = false;
      else this.isHashtag = true;
    },
  },
  mounted() {
    this.$refs.title.focus();
    // 색상 선택기에 데이터 넣기
    Array.from(this.$el.querySelectorAll('.color-picker a')).forEach(el => {
      el.style.backgroundColor = el.dataset.value;
    });
  },
  methods: {
    ...mapActions(['CREATE_BOARD']),
    async addBoard() {
      const title = this.title.trim();
      const bgColor = this.selectColor;
      const publicYn = this.publicYn;
      const hashtag = JSON.stringify(this.hashList);

      const { data } = await this.CREATE_BOARD({
        title,
        bgColor,
        publicYn,
        hashtag,
      });
      await this.$notify({
        group: 'custom-template',
        duration: 5000,
        closeOnClick: true,
        title: '보드 생성 성공!',
        text: `'${this.title}' 보드가 만들어졌습니다.`,
      });
      await this.$router.push(`/board/${data.data.id}`);
    },
    pushHash() {
      if (this.hashList.includes(this.hashItem)) {
        alert('같은 이름의 해시태그는 동일한 보드에 입력 불가능합니다.');
        this.hashItem = '';
        return;
      }
      if (this.hashList.length > 2) {
        alert('해시태그는 3개까지 입력가능합니다.');
        this.hashItem = '';
        return;
      }
      this.hashList.push(this.hashItem.replace(/(\s*)/g, '').trim());
      this.hashItem = '';
    },
    deleteHash(hash) {
      let pos = this.hashList.indexOf(hash);
      this.hashList.splice(pos, 1);
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
  .first-line {
    display: flex;
    flex-direction: row;
    .line-item {
      width: 50%;
      .radio-wrap {
        display: flex;
        align-items: center;
        margin-top: 15px;
        margin-left: 10px;
        .radio-label {
          margin: 5px;
          position: relative;
          top: 3px;
        }
      }
    }
  }
  .title-wrap {
    align-items: center;
    margin-top: 13px;
    .require {
      margin-left: 2px;
      color: red;
    }
    .subtext {
      margin: 4px 0 0 18px;
      position: relative;
      top: 2px;
      font-size: 13px;
      color: gray;
    }
  }
  .form-control {
    width: 90%;
    height: 30px;
    margin: 20px 10px;
  }
  .hash-wrap {
    display: flex;
    justify-content: space-between;
    .hash-form {
      width: 45%;
    }
    .hash-item {
      display: inline-block;
      width: 50%;
      .hashtag {
        display: inline-block;
        margin: 20px 13px -10px 0;
        padding: 5px 10px;
        background: rgb(102, 121, 228);
        border-radius: 30px;
        color: #fff;
        line-height: 20px;
        font-size: 13px;
        .hashtag-delete {
          margin-left: 2px;
          cursor: pointer;
        }
      }
    }
  }
  .color-wrap {
    .color-picker {
      display: flex;
      justify-content: center;
      margin-top: 13px;
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
  }
}
.btn-wrap {
  text-align: center;
  margin: 30px 0 15px;
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
.icon {
  margin: 0 13px;
}
</style>
