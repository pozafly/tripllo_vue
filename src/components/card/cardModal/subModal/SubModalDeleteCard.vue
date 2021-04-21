<template>
  <MiniModal @close="$emit('close')">
    <div slot="header" class="header-text">Delete this Card?</div>
    <div slot="content">
      <button class="delete-btn" type="button" @click="onDelete">
        Delete this Card
      </button>
    </div>
  </MiniModal>
</template>

<script>
import { deleteCardAPI } from '@/api/card';
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['card', 'board']),
  },

  methods: {
    ...mapActions(['READ_BOARD_DETAIL']),

    async onDelete() {
      try {
        const boardId = this.board.id;

        await deleteCardAPI(this.card.id);
        await this.READ_BOARD_DETAIL(boardId);

        this.$router.push(`/board/${boardId}`);
      } catch (error) {
        console.log(error);
        alert('카드를 삭제하지 못했습니다.');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.delete-btn {
  width: 100%;
  height: 37px;
  background: #cf513d;
  &:hover {
    background: #eb5a46;
  }
}
</style>
