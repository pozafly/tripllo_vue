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
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['card', 'board']),
  },

  methods: {
    ...mapActions(['DELETE_CARD']),
    onDelete() {
      this.DELETE_CARD({ id: this.card.id });
      this.$router.push(`/board/${this.board.id}`);
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
