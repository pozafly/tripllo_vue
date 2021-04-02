<template>
  <li v-if="card.labelColor" class="body-item">
    <span class="detail-title">LABELS</span>
    <div
      v-for="label in labelArray"
      v-show="labelArray.includes(label)"
      :key="label"
      class="detail-label-item"
      :data-value="label"
      :style="{ backgroundColor: label }"
    ></div>
  </li>
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

  computed: {
    ...mapState(['card']),
  },

  watch: {
    card() {
      if (!this.card.labelColor) {
        return;
      }
      const array = this.card.labelColor.split(',');
      this.labelArray = array;
    },
  },
};
</script>

<style scoped lang="scss">
.detail-title {
  position: relative;
  display: block;
  margin: -15px 0;
  padding: 7px 0 3px 39px;
  height: 37px;

  font-size: 13px;
}
.detail-label-item {
  text-align: center;
  display: inline-block;
  position: relative;
  margin: 7px 0 3px 3px;
  width: 38px;
  height: 30px;
  border-radius: 4px;
}
.detail-label-item:nth-child(2) {
  margin-left: 39px;
}
</style>
