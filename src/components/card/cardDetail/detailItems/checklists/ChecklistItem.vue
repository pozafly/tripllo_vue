<template>
  <div class="checkbox-item">
    <input type="checkbox" :checked="isChecked" @click="isCheckChange" />
    <span class="checkbox-item-text">{{ items.item }}</span>
    <span class="checkbox-item-cancel" @click="onDeleteItem">&times;</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isItem: false,
      inputItem: '',
    };
  },
  props: ['items'],
  computed: {
    isChecked() {
      const isChecked = this.items.isChecked;
      return isChecked === 'Y' ? true : false;
    },
  },
  methods: {
    ...mapActions(['DELETE_CHECKLIST_ITEM', 'UPDATE_CHECKLIST_ITEM']),
    onDeleteItem() {
      const checklistItemId = this.items.id;
      this.DELETE_CHECKLIST_ITEM({ checklistItemId });
    },
    isCheckChange(e) {
      let isChecked = '';
      e.target.checked === true ? (isChecked = 'Y') : (isChecked = 'N');
      this.UPDATE_CHECKLIST_ITEM({ checklistItemId: this.items.id, isChecked });
    },
  },
};
</script>

<style lang="scss">
.checkbox-item {
  margin: 0px 0 0px 30px;
  padding: 6px;
  border-radius: 6px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    .checkbox-item-cancel {
      visibility: visible;
      cursor: pointer;
    }
  }
  .checkbox-item-text {
    position: relative;
    font-size: 14px;
    margin-left: 3px;
    top: -2px;
  }
  .checkbox-item-cancel {
    position: absolute;
    right: 15px;
    margin-top: -1px;
    visibility: hidden;
  }
}
</style>
