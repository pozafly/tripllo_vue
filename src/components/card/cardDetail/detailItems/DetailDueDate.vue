<template>
  <li class="body-item" v-if="card.dueDate">
    <div>
      <span class="detail-title">DUE DATE</span>
      <div class="detail-duedate-item">
        {{ card.dueDate | normalFormatDate }}
      </div>
      <button class="duedate-cancel" @click="isDelete = true">···</button>
      <div class="duedate-delete" v-if="isDelete">
        <MiniModal @close="isDelete = false">
          <div slot="header" class="header-text">Delete DueDate</div>
          <div slot="content">
            <button class="duedate-delete-btn" @click="deleteDueDate">
              Delete this DueDate?
            </button>
          </div>
        </MiniModal>
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      isDelete: false,
    };
  },
  computed: {
    ...mapState(['card']),
  },
  methods: {
    ...mapActions(['UPDATE_CARD']),
    deleteDueDate() {
      this.isDelete = false;
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
.duedate-cancel {
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
.duedate-delete {
  position: absolute;
  top: 155px;
  left: 207px;
  overflow-x: visible;
  z-index: 9999;
  .duedate-delete-btn {
    width: 100%;
    height: 37px;
    background: #cf513d;
    &:hover {
      background: #eb5a46;
    }
  }
}
</style>
