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
      <div class="board-inside-icons" v-if="isItem">
        <!-- 햄버거 -->
        <div class="board-inside-icon" v-if="card.description">
          <awesome
            icon="layer-group"
            class="fas fa-layer-group board-inside-desc"
          ></awesome>
        </div>
        <div class="board-inside-icon">
          <!-- 체크리스트 -->
          <awesome
            icon="check-square"
            class="far fa-check-square board-inside-checklist"
            v-if="card.isChecklist === 'Y'"
          ></awesome>
          <!-- <span class="board-inside-checklist-text">1/1</span> -->
        </div>
        <!-- 시간표시 -->
        <div class="board-inside-icon" v-if="card.dueDate">
          <awesome
            :icon="['far', 'clock']"
            class="far fa-clock board-inside-desc"
          ></awesome>
        </div>
        <div class="board-inside-icon" v-if="card.location">
          <awesome
            icon="map-marker-alt"
            class="fas fa-map-marker-alt"
          ></awesome>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      labelArray: [],
      isItem: false,
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
    card() {
      if (this.card.description) {
        this.isItem = true;
      } else if (this.card.isChecklist === 'Y') {
        this.isItem = true;
      } else if (this.card.dueDate) {
        this.isItem = true;
      } else if (this.card.location) {
        this.isItem = true;
      } else {
        this.isItem = false;
      }
    },
  },
  methods: {
    ...mapActions(['DELETE_CARD']),

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
    display: inline-block;
    vertical-align: middle;
    margin: 4px;
    font-size: 13px;
    color: #5e6c84;
    .board-inside-icon {
      display: inline;
      .board-inside-desc {
        /* padding-left: 3px; */
        padding-right: 10px;
      }
      .board-inside-checklist {
        /* padding-left: 3px; */
        padding-right: 10px;
      }
      .board-inside-checklist-text {
        margin-left: -5px;
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
/* .delete-card-btn {
  position: absolute;
  right: 10px;
  top: 4px;
  text-decoration: none;
  font-size: 18px;
  color: #aaa;
} */
</style>
