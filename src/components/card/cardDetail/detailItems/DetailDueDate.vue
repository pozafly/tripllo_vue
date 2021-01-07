<template>
  <li class="body-item" v-if="card.dueDate">
    <div>
      <span class="detail-labels">DUE DATE</span>
      <div class="detail-label-item">{{ new Date(card.dueDate) }}</div>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['card']),
  },
};
</script>

<style scoped lang="scss">
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
}
</style>
