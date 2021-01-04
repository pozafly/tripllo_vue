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
        <div
          class="detail-label-item plus"
          v-if="labelArray"
          @click="onLabelShow"
        >
          <span>&plus;</span>
        </div>
      </div>
    </li>
    <Labels @close="isLabelShow = false" v-if="isLabelShow" :xy="xy" />
  </div>
</template>

<script>
import Labels from '@/components/card/cardDetail/side/Labels';
import { mapState } from 'vuex';

export default {
  components: {
    Labels,
  },
  data() {
    return {
      labelArray: [],
      isLabelShow: false,
      xy: {},
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
  methods: {
    onLabelShow(e) {
      this.isLabelShow = !this.isLabelShow;
      const target = e.target.getBoundingClientRect();
      this.xy = {
        x: target.x + 1000,
        y: target.y + 65,
      };
    },
  },
};
</script>

<style lang="scss">
.detail-labels {
  position: absolute;
  margin: -15px 0;
  padding: 7px 0 40px 39px;
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
