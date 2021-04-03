<template>
  <div class="checkbox-item" @click="onCheckChange">
    <input
      type="checkbox"
      class="checkbox-input"
      :checked="isChecked"
      maxlength="399"
      @click="isCheckChange"
    />
    <template v-if="!isItem">
      <span v-if="!isChecked" class="checkbox-item-text">
        {{ items.item }}
      </span>
      <span v-else class="checkbox-item-text line-through">
        {{ items.item }}
      </span>
      <awesome icon="edit" class="fas fa-edit" @click="onEditItem"></awesome>
      <span class="checkbox-item-cancel" @click="onDeleteItem">&times;</span>
    </template>
    <template v-else>
      <input
        ref="inputItem"
        v-model="inputItem"
        type="text"
        class="form-control checkbox-input-title checkboxitem-input-item"
        placeholder="Edit Item and press Enter"
        maxlength="399"
        @blur="onSubmitItem"
        @keypress.enter="onKeyupEnter"
      />
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    items: {
      type: Object,
      require: false,
      default: () => ({
        checklistId: 0,
        createdAt: '',
        createdBy: '',
        id: 0,
        isChecked: 'N',
        item: '',
        updatedAt: '',
        updatedBy: '',
        userId: '',
      }),
    },
  },

  data() {
    return {
      isItem: false,
      inputItem: '',
    };
  },

  computed: {
    isChecked() {
      const isChecked = this.items.isChecked;
      return isChecked === 'Y' ? true : false;
    },
  },

  methods: {
    ...mapActions(['DELETE_CHECKLIST_ITEM', 'UPDATE_CHECKLIST_ITEM']),
    onCheckChange({ target }) {
      if (
        target.localName === 'path' ||
        target.localName === 'svg' ||
        target.localName === 'input'
      ) {
        return;
      }

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
      if (this.inputItem.trim() === this.items.item) {
        return;
      }
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
      color: #4f5d76;
    }
  }
  .fa-edit {
    font-size: 13px !important;
    position: absolute;
    right: 35px;
    margin-top: 5px;
    visibility: hidden;
    &:hover {
      color: rgba(0, 0, 0, 0.3) !important;
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
