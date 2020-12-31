<template>
  <div class="card-item" :data-card-id="card.id" :data-card-pos="card.pos">
    <router-link :to="`/board/${boardId}/card/${card.id}`">
      <div>{{ card.title }}</div>
      <!-- 햄버거 -->
      <div class="card-item-meta" v-if="card.description">&equiv;</div>
    </router-link>
    <a class="delete-card-btn" href="" @click.prevent="onDelete">&times;</a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: ['card'],
  computed: {
    ...mapState({
      boardId: state => state.board.id,
    }),
  },
  methods: {
    ...mapActions(['DELETE_CARD']),
    onDelete() {
      // if (!window.confirm('카드를 삭제하시겠습니까?')) return;
      this.DELETE_CARD({ id: this.card.id });
    },
  },
};
</script>

<style lang="scss">
.card-item {
  background-color: #fff;
  border-radius: 3px;
  margin: 8px;
  padding: 6px 20px 2px 8px;
  box-shadow: 0 1px 0 #ccc;
  position: relative;
  a {
    text-decoration: none;
    color: #444;
    word-wrap: break-word;
    white-space: normal;
    overflow: hidden;
    display: block;
    .card-item-meta {
      font-size: 26px;
      padding: 5px 0 0 3px;
      color: #8c8c8c;
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
.delete-card-btn {
  position: absolute;
  right: 10px;
  top: 4px;
  text-decoration: none;
  font-size: 18px;
  color: #aaa;
}
</style>
