<template>
  <div class="add-card">
    <div>
      <div class="textarea-wrap">
        <textarea
          type="text"
          class="form-control card-input"
          ref="inputTitle"
          v-model="inputTitle"
          placeholder="Enter a title for this card..."
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
import { mapActions } from 'vuex';

export default {
  props: ['listId'],
  data() {
    return {
      inputTitle: '',
    };
  },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim();
    },
  },
  mounted() {
    this.$refs.inputTitle.focus();
  },
  methods: {
    ...mapActions(['CREATE_CARD']),
    async onSubmit() {
      if (this.invalidInput) {
        this.$emit('close');
        return;
      }
      const { inputTitle, listId } = this;

      await this.CREATE_CARD({ title: inputTitle, listId }).finally(() => {
        this.$nextTick(() => {
          this.inputTitle = '';
          this.$refs.inputTitle.focus();
        });
      });
    },
    onKeyupEnter() {
      // 이벤트 트리거. onSubmitTitle이 두번 실행되는 것을 방지. https://velog.io/@kyh196201/1025
      event.target.blur();
    },
  },
};
</script>

<style lang="scss">
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
      font-size: 14px;
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
