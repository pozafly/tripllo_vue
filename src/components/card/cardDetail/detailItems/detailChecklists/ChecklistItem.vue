<template>
  <div class="checkbox-item" @click="onCheckChange">
    <input
      type="checkbox"
      class="checkbox-input"
      :checked="isChecked"
      @click="isCheckChange"
    />
    <template v-if="!isItem">
      <span class="checkbox-item-text" v-if="!isChecked">
        {{ items.item }}
      </span>
      <span class="checkbox-item-text line-through" v-else>
        {{ items.item }}
      </span>
      <i class="fas fa-edit" @click="onEditItem"></i>
      <span class="checkbox-item-cancel" @click="onDeleteItem">&times;</span>
    </template>
    <template v-else>
      <input
        type="text"
        class="form-control checkbox-input-title checkboxitem-input-item"
        ref="inputItem"
        v-model="inputItem"
        @blur="onSubmitItem"
        @keypress.enter="onKeyupEnter"
        placeholder="Edit Item and press Enter"
      />
    </template>
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
    onCheckChange({ target }) {
      if (target.className === 'fas fa-edit' || target.localName === 'input')
        return;

      let isChecked = '';
      if (this.items.isChecked === 'Y') {
        isChecked = 'N';
      } else {
        isChecked = 'Y';
      }
      this.UPDATE_CHECKLIST_ITEM({ checklistItemId: this.items.id, isChecked });
    },
    onDeleteItem() {
      const checklistItemId = this.items.id;
      this.DELETE_CHECKLIST_ITEM({ checklistItemId });
    },
    isCheckChange(e) {
      let isChecked = '';
      e.target.checked === true ? (isChecked = 'Y') : (isChecked = 'N');
      this.UPDATE_CHECKLIST_ITEM({ checklistItemId: this.items.id, isChecked });
    },
    onSubmitItem() {
      this.isItem = false;
      if (this.inputItem.trim() === this.items.item) return;
      this.UPDATE_CHECKLIST_ITEM({
        checklistItemId: this.items.id,
        item: this.inputItem,
      });
    },
    onEditItem() {
      this.isItem = true;
      this.$nextTick(() => {
        this.$el.querySelector(`.checkboxitem-input-item`).focus();
      });
      this.inputItem = this.items.item;
    },
    onKeyupEnter() {
      event.target.blur();
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
    cursor: pointer;
    .checkbox-item-cancel,
    .fa-edit {
      visibility: visible;
      cursor: pointer;
    }
  }
  .fa-edit {
    font-size: 13px !important;
    position: absolute;
    right: 35px;
    margin-top: 5px;
    visibility: hidden;
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
  .checkbox-input {
    position: relative;
    top: 1px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    &:hover {
      filter: brightness(70%);
    }
  }
  .checkbox-item-text {
    position: relative;
    font-size: 14px;
    margin-left: 3px;
    top: -2px;
    &.line-through {
      text-decoration: line-through;
    }
  }
  .checkbox-item-cancel {
    position: absolute;
    right: 15px;
    margin-top: -1px;
    visibility: hidden;
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
}
.form-control.checkbox-input-title.checkboxitem-input-item {
  width: 92%;
  font-size: 13px;
  margin: -3px 0 0 0;
  &:hover {
    background-color: white;
  }
}
</style>
