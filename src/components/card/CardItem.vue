<template>
  <div class="card-item" :data-card-id="card.id" :data-card-pos="card.pos">
    <router-link :to="`/board/${boardId}/card/${card.id}`">
      <div
        class="inside-card-label"
        v-for="label in labelArray"
        :key="label"
        :data-value="label"
        v-show="labelArray.includes(label)"
        :style="{ backgroundColor: label }"
      ></div>
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
  data() {
    return {
      labelArray: [],
    };
  },
  props: ['card'],
  computed: {
    ...mapState({
      boardId: state => state.board.id,
    }),
  },
  watch: {
    'card.labelColor'() {
      this.labelSetting();
    },
  },
  methods: {
    ...mapActions(['DELETE_CARD']),
    onDelete() {
      // if (!window.confirm('카드를 삭제하시겠습니까?')) return;
      this.DELETE_CARD({ id: this.card.id });
    },
    labelSetting() {
      if (!this.card.labelColor) {
        this.labelArray = null;
        return;
      }
      const array = this.card.labelColor.split(',');
      this.labelArray = array;
    },
  },
  mounted() {
    this.labelSetting();
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
    .inside-card-label {
      display: inline-block;
      position: relative;
      left: 0px;
      top: -2px;
      margin-right: 5px;
      width: 35px;
      height: 11px;
      border-radius: 5px;
    }
    .card-item-meta {
      font-size: 26px;
      padding: 5px 5px 0 3px;
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
