<template>
  <div>
    <li class="body-item" v-if="card.labelColor">
      <div>
        <span class="detail-labels">LABELS</span>
        <div
          class="detail-label-item"
          v-for="label in labelArray"
          :key="label"
          :data-value="label"
          v-show="labelArray.includes(label)"
          :style="{ backgroundColor: label }"
        ></div>
      </div>
    </li>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      labelArray: [],
      isLabelShow: false,
    };
  },
  watch: {
    card() {
      if (!this.card.labelColor) return;
      const array = this.card.labelColor.split(',');
      this.labelArray = array;
    },
  },
  computed: {
    ...mapState(['card']),
  },
  methods: {},
};
</script>

<style lang="scss">
.detail-labels {
  position: relative;
  margin: -15px 0;
  padding: 7px 0 3px 39px;
  display: block;
  font-size: 13px;
}
.detail-label-item {
  text-align: center;
  display: inline-block;
  position: relative;
  left: 39px;
  top: 20px;
  margin-right: 10px;
  width: 38px;
  height: 30px;
  border-radius: 4px;
  &.plus {
    top: 7px;
    background: rgba(9, 30, 66, 0.04);
    cursor: pointer;
    &:hover {
      background-color: rgba(9, 30, 66, 0.1);
    }
    span {
      display: inline-block;
      position: relative;
      top: 2px;
      pointer-events: none;
    }
  }
}
</style>
