<template>
  <div class="card-item" :data-card-id="card.id" :data-card-pos="card.pos">
    <router-link :to="`/board/${board.id}/card/${card.id}`">
      <!-- 라벨링 -->
      <div
        v-for="label in labelArray"
        v-show="labelArray.includes(label)"
        :key="label"
        class="inside-card-label"
        :data-value="label"
        :style="{ backgroundColor: label }"
      ></div>
      <div class="card-title">{{ card.title }}</div>
      <div class="board-inside-icons">
        <!-- 햄버거 -->
        <div v-if="card.description" class="board-inside-icon">
          <awesome icon="align-left" class="fas fa-layer-group icon-item" />
        </div>
        <!-- 체크리스트 -->
        <div v-if="card.isChecklist === 'Y'" class="board-inside-icon">
          <awesome icon="check-square" class="icon-item" />
        </div>
        <!-- 시간표시 -->
        <div v-if="card.dueDate" class="board-inside-icon">
          <awesome :icon="['far', 'clock']" class="icon-item" />
        </div>
        <!-- 첨부파일 -->
        <div v-if="card.isAttachment === 'Y'" class="board-inside-icon">
          <awesome icon="paperclip" class="icon-item" />
        </div>
        <!-- 장소 -->
        <div v-if="card.location" class="board-inside-icon">
          <awesome icon="map-marker-alt" class="icon-item" />
        </div>
        <!-- 코멘트 -->
        <div v-if="card.isComment === 1" class="board-inside-icon">
          <awesome icon="comment" class="icon-item" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    card: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      labelArray: [],
    };
  },

  computed: {
    ...mapState(['board']),
  },

  watch: {
    'card.labelColor'() {
      this.labelSetting();
    },
  },

  mounted() {
    this.labelSetting();
  },

  methods: {
    labelSetting() {
      if (!this.card.labelColor) {
        this.labelArray = null;
        return;
      }
      const array = this.card.labelColor.split(',');
      this.labelArray = array;
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
  .card-title {
    font-size: 14px;
    font-weight: 450;
  }
  .board-inside-icons {
    padding: 1px 0 4px;
    .board-inside-icon {
      margin: 4px;
      font-size: 13px;
      color: #5e6c84;
      display: inline;
      .icon-item {
        padding-right: 10px;
      }
    }
  }
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
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
</style>
