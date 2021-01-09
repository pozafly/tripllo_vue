<template>
  <SideBase @close="$emit('close')">
    <div slot="header" class="header-text">Delete this Card?</div>
    <div slot="content">
      <button class="delete-btn" @click="onDelete">
        Delete this Card
      </button>
    </div>
  </SideBase>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SideBase from './SideBase';

export default {
  computed: {
    ...mapState(['card', 'board']),
  },
  components: {
    SideBase,
  },
  methods: {
    ...mapActions(['DELETE_CARD']),
    onDelete() {
      // if (!window.confirm('카드를 삭제하시겠습니까?')) return;
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
