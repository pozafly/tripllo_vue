<template>
  <div class="card-item" :data-card-id="card.id" :data-card-pos="card.pos">
    <router-link :to="`/board/${board.id}/card/${card.id}`">
      <!-- 라벨링 -->
      <div
        class="inside-card-label"
        v-for="label in labelArray"
        :key="label"
        :data-value="label"
        v-show="labelArray.includes(label)"
        :style="{ backgroundColor: label }"
      ></div>
      <div>{{ card.title }}</div>
      <div class="board-inside-icons">
        <!-- 햄버거 -->
        <div class="board-inside-icon" v-if="card.description">
          <awesome icon="align-left" class="fas fa-layer-group icon-item" />
        </div>
        <!-- 체크리스트 -->
        <div class="board-inside-icon" v-if="card.isChecklist === 'Y'">
          <awesome icon="check-square" class="icon-item" />
        </div>
        <!-- 시간표시 -->
        <div class="board-inside-icon" v-if="card.dueDate">
          <awesome :icon="['far', 'clock']" class="icon-item" />
        </div>
        <!-- 첨부파일 -->
        <div class="board-inside-icon" v-if="card.isAttachment === 'Y'">
          <awesome icon="paperclip" class="icon-item" />
        </div>
        <!-- 장소 -->
        <div class="board-inside-icon" v-if="card.location">
          <awesome icon="map-marker-alt" class="icon-item" />
        </div>
        <!-- 코멘트 -->
        <div class="board-inside-icon" v-if="card.isComment === 1">
          <awesome icon="comment" class="icon-item" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      labelArray: [],
    };
  },
  props: ['card'],
  computed: {
    ...mapState(['board']),
  },
  watch: {
    'card.labelColor'() {
      this.labelSetting();
    },
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
