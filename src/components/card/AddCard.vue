<template>
  <div class="add-card">
    <div>
      <div class="textarea-wrap">
        <textarea
          ref="inputTitle"
          v-model="inputTitle"
          v-focus
          type="text"
          class="form-control card-input"
          placeholder="Enter a title for this card..."
          maxlength="44"
          @keypress.enter="onKeyupEnter"
          @blur="onSubmit"
        />
      </div>
      <button class="btn btn-success" type="submit" :disabled="invalidInput">
        Add Card
      </button>
      <a class="cancel-add-btn" @click.prevent="$emit('close')">&times;</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    listId: {
      type: Number,
      default: 0,
      require: false,
    },
  },

  data() {
    return {
      inputTitle: '',
    };
  },

  computed: {
    invalidInput() {
      return !this.inputTitle.trim();
    },
    ...mapState(['board']),
  },

  methods: {
    ...mapActions(['CREATE_CARD']),

    onSubmit() {
      if (this.invalidInput) {
        this.$emit('close');
        return;
      }
      const { inputTitle, listId } = this;
      const pos = this.newCardPos();

      this.CREATE_CARD({ title: inputTitle, listId, pos }).finally(() => {
        this.inputTitle = '';
        this.$refs.inputTitle.focus();
        this.$emit('cardFocus');
      });
    },
    newCardPos() {
      // 맨 마지막(최근) 카드를 가져온다.
      const curList = this.board.lists.filter(l => l.id === this.listId)[0];
      if (!curList) {
        return 65535;
      }

      // 카드 배열을 가져온다.
      const { cards } = curList;
      if (!cards.length) {
        return 65535;
      }

      // 맨 마지막에 있는 카드의 pos의 정보를 가져와서 * 2
      return cards[cards.length - 1].pos * 2;
    },
    onKeyupEnter(event) {
      // 이벤트 트리거. onSubmitTitle이 두번 실행되는 것을 방지. https://velog.io/@kyh196201/1025
      event.target.blur();
    },
  },
};
</script>

<style scoped lang="scss">
.add-card {
  padding: 10px;
  display: block;
  position: relative;
  .textarea-wrap {
    position: relative;
    width: 257px;
    margin-left: -3.5px;
    .card-input {
      overflow-wrap: break-word;
      resize: none;
      height: 54px;
      outline: none;
      background-color: #fff;
      border-radius: 3px;
      font-family: Arial;
      font-size: 16px;
      color: #5c5c5d;
    }
  }
  .cancel-add-btn {
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
    text-decoration: none;
    color: #888;
    font-size: 24px;
    &:hover {
      color: #666;
    }
  }
  .btn-success {
    height: 30px;
  }
}
</style>
