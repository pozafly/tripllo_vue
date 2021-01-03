<template>
  <li class="body-item" v-if="card.labelColor">
    <div>
      <span class="detail-labels">LABELS</span>
      <div class="detail-label-item" v-for="label in labels" :key="label"></div>
      <div class="detail-label-item plus" v-if="labels">
        <span>&plus;</span>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      labels: [],
    };
  },
  watch: {
    card() {
      const array = this.card.labelColor.split(',');
      this.labels = array;
    },
  },
  computed: {
    ...mapState(['card']),
  },
  // updated() {
  //   const array = this.card.labelColor.split(',');
  //   this.labels = array;
  // },
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
  border: 1px solid black;
  left: 39px;
  top: 20px;
  margin-right: 10px;
  width: 38px;
  height: 30px;
  border-radius: 4px;
  &.plus {
    top: 7px;
  }
  span {
    display: inline-block;
    position: relative;
    top: 2px;
  }
}
</style>
