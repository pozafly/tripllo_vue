<template>
  <li class="body-item" v-if="card.dueDate">
    <div>
      <span class="detail-title">DUE DATE</span>
      <div class="detail-duedate-item">
        {{ card.dueDate | formatDate }}
      </div>
      <button class="duedate-cancle" @click="deleteDueDate">&times;</button>
    </div>
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['card']),
  },
  methods: {
    ...mapActions(['UPDATE_CARD']),
    deleteDueDate() {
      this.UPDATE_CARD({ id: this.card.id, dueDate: '' });
    },
  },
};
</script>

<style scoped lang="scss">
.detail-title {
  position: relative;
  margin: -15px 0;
  padding: 7px 0 3px 39px;
  display: block;
  font-size: 13px;
}
.detail-duedate-item {
  /* border: 1px solid black; */
  text-align: center;
  display: inline-block;
  position: relative;
  margin: 19px 0 3px 3px;
  padding: 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.08);
  font-size: 14px;
  font-weight: 400;
}
.detail-duedate-item:nth-child(2) {
  margin-left: 39px;
}
.duedate-cancle {
  color: black;
  display: inline;
  margin: 19px 0 3px 3px;
  padding: 5px;
  width: 25px;
  background: rgba(0, 0, 0, 0.08);
  box-shadow: none;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.18);
  }
}
</style>
