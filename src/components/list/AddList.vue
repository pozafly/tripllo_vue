<template>
  <div class="add-list" @click.prevent="onAddList">
    <input
      v-if="isAddList"
      type="text"
      class="form-control"
      v-model="inputTitle"
      ref="inputTitle"
      placeholder="Enter list title..."
      @blur="onSubmitTitle"
      @keypress.enter="onKeyupEnter"
    />
    <a v-else href="">&plus; Add another list</a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      isAddList: false,
      inputTitle: '',
    };
  },
  computed: {
    ...mapState(['board']),
  },
  methods: {
    ...mapActions(['CREATE_LIST']),
    onAddList() {
      this.isAddList = true;
      this.$nextTick(() => this.$refs.inputTitle.focus());
    },
    onSubmitTitle() {
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) {
        this.isAddList = false;
        return;
      }

      const title = this.inputTitle;
      const boardId = this.board.id;

      this.CREATE_LIST({ title, boardId }).finally(() => {
        this.$nextTick(() => {
          this.inputTitle = '';
          this.$refs.inputTitle.focus();
        });
      });
    },
    onKeyupEnter() {
      event.target.blur();
    },
  },
};
</script>

<style lang="scss">
.add-list {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 12px;
  color: #ddd;
  transition: all 0.3s;
  cursor: pointer;
  a {
    color: #ddd;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
