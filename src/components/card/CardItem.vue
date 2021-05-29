<template>
  <section class="card-item" :cardId="id" :pos="pos">
    <router-link :to="`/board/${board.id}/card/${id}`">
      <!-- 라벨링 -->
      <div
        v-for="label in labelArray"
        v-show="labelArray.includes(label)"
        :key="label"
        class="inside-card-label"
        :style="{ backgroundColor: label }"
      ></div>

      <div class="card-title">{{ title }}</div>
      <div class="board-inside-icons">
        <!-- 햄버거 -->
        <div v-if="description" class="board-inside-icon">
          <awesome icon="align-left" class="fas fa-layer-group icon-item" />
        </div>
        <!-- 체크리스트 -->
        <div v-if="isChecklist === 'Y'" class="board-inside-icon">
          <awesome icon="check-square" class="icon-item" />
        </div>
        <!-- 시간표시 -->
        <div v-if="dueDate" class="board-inside-icon">
          <awesome :icon="['far', 'clock']" class="icon-item" />
        </div>
        <!-- 첨부파일 -->
        <div v-if="isAttachment === 'Y'" class="board-inside-icon">
          <awesome icon="paperclip" class="icon-item" />
        </div>
        <!-- 장소 -->
        <div v-if="location" class="board-inside-icon">
          <awesome icon="map-marker-alt" class="icon-item" />
        </div>
        <!-- 코멘트 -->
        <div v-if="isComment === 1" class="board-inside-icon">
          <awesome icon="comment" class="icon-item" />
        </div>
      </div>
    </router-link>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    id: {
      type: Number,
      default: 0,
      required: false,
    },
    pos: {
      type: Number,
      default: 0,
      required: false,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    isChecklist: {
      type: String,
      required: false,
      default: 'N',
      validator(value) {
        return ['Y', 'N'].indexOf(value) !== -1;
      },
    },
    dueDate: {
      type: String,
      required: false,
      default: '',
    },
    isAttachment: {
      type: String,
      required: false,
      default: 'N',
      validator(value) {
        return ['Y', 'N'].indexOf(value) !== -1;
      },
    },
    location: {
      type: String,
      required: false,
      default: '',
    },
    isComment: {
      type: Number,
      default: 0,
      required: false,
      validator(value) {
        // 0: 없음, 1: 있음
        return [0, 1].indexOf(value) !== -1;
      },
    },
    labelColor: {
      type: String,
      required: false,
      default: '',
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
    labelColor() {
      this.labelSetting();
    },
  },

  mounted() {
    this.labelSetting();
  },

  methods: {
    labelSetting() {
      if (!this.labelColor) {
        this.labelArray = null;
        return;
      }
      const array = this.labelColor.split(',');
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
