<template>
  <div class="add-list" @click.prevent="onAddList">
    <input
      v-if="isAddList"
      ref="inputTitle"
      v-model="inputTitle"
      v-focus
      type="text"
      class="form-control"
      placeholder="Enter list title..."
      maxlength="64"
      @blur="onSubmitTitle"
      @keypress.enter="onKeyupEnter"
    />
    <a v-else href="">&plus; Add another list</a>
  </div>
</template>

<script>
import { createListAPI } from '@/api/list';
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
    ...mapActions(['READ_BOARD_DETAIL']),

    onAddList() {
      this.isAddList = true;
    },

    async onSubmitTitle() {
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) {
        this.isAddList = false;
        return;
      }

      const title = this.inputTitle;
      const boardId = this.board.id;
      const lastList = this.board.lists[this.board.lists.length - 1];
      const pos = lastList ? lastList.pos * 2 : 65535;

      const createListInfo = { title, boardId, pos };

      try {
        await createListAPI(createListInfo);
        await this.READ_BOARD_DETAIL(this.board.id);
      } catch (error) {
        console.log(error);
        alert('리스트를 생성하지 못했습니다.');
      } finally {
        this.inputTitle = '';
        this.$refs.inputTitle.focus();
        this.$emit('listFocus');
      }
    },

    onKeyupEnter(event) {
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
  z-index: 100;
  pointer-events: visible;
  a {
    color: #ddd;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
