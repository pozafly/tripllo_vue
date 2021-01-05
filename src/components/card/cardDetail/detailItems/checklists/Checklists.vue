<template>
  <div>
    <i class="far fa-check-square"></i>
    <span v-if="!isTitle">
      <span class="checklist-body-card-text" @click="editTitle">
        {{ checklist.title }}
      </span>
      <button class="checklist-title-delete-btn" @click="deleteChecklist">
        Delete
      </button>
    </span>
    <span v-else>
      <input
        type="text"
        :class="`form-control checkbox-input-title`"
        ref="inputTitle"
        v-model="inputTitle"
        @blur="onSubmitTitle"
        @keypress.enter="onKeyupEnter"
      />
      <button class="checkbox-input-btn" @click="onSubmitTitle">
        Save
      </button>
      <a href="" class="checkbox-input-cancle" @click.prevent="isTitle = false">
        &times;
      </a>
    </span>
    <KProgress :percent="30" class="progress" status="error" :line-height="7" />

    <ChecklistItem
      v-for="items in checklist.items"
      :key="items.id"
      :items="items"
    />

    <button class="checkbox-add-btn" @click="isAddItem" v-if="!isItem">
      Add an item
    </button>
    <span v-else>
      <input
        type="text"
        :class="`form-control checkbox-input-title checkbox-item-input`"
        v-model="inputItem"
        placeholder="Add an Item"
        @blur="onSubmitItem"
        @keypress.enter="onKeyupEnter"
      />
      <button
        class="checkbox-input-btn checkbox-item-save"
        @click="onSubmitItem"
      >
        Save
      </button>
      <a href="" class="checkbox-input-cancle checkbox-item-cancle">
        &times;
      </a>
    </span>
  </div>
</template>

<script>
import ChecklistItem from './ChecklistItem';
import { mapActions } from 'vuex';

export default {
  components: {
    ChecklistItem,
  },
  data() {
    return {
      isTitle: false,
      inputTitle: '',
      isItem: false,
      inputItem: '',
    };
  },
  props: ['checklist'],
  methods: {
    ...mapActions([
      'DELETE_CHECKLIST',
      'UPDATE_CHECKLIST',
      'CREATE_CHECKLIST_ITEM',
    ]),
    editTitle() {
      this.isTitle = true;

      this.$nextTick(() => {
        this.inputTitle = this.checklist.title;
        this.$refs.inputTitle.focus();
      });
    },
    deleteChecklist() {
      this.DELETE_CHECKLIST({
        checklistId: this.checklist.id,
        cardId: this.checklist.cardId,
      });
    },
    onSubmitTitle({ relatedTarget }) {
      this.isTitle = false;
      if (relatedTarget) {
        if (relatedTarget.className === 'checkbox-input-cancle') return;
      }
      if (this.inputTitle.trim() === this.checklist.title) return;
      this.UPDATE_CHECKLIST({
        id: this.checklist.id,
        title: this.inputTitle,
      });
    },
    isAddItem() {
      this.isItem = true;
      this.$nextTick(() => {
        this.$el.querySelector(`.checkbox-input-title`).focus();
      });
    },
    onSubmitItem({ relatedTarget }) {
      this.isItem = false;
      if (relatedTarget) {
        if (
          relatedTarget.className ===
          'checkbox-input-cancle checkbox-item-cancle'
        )
          return;
      }

      this.CREATE_CHECKLIST_ITEM({
        checklistId: this.checklist.id,
        item: this.inputItem,
      });
      this.inputItem = '';
    },
    onKeyupEnter() {
      event.target.blur();
    },
  },
};
</script>

<style lang="scss">
.checkbox-input-title {
  display: inline;
  width: 93%;
  margin-left: 13px;
  &:hover {
    filter: brightness(90%);
  }
  &.checkbox-item-input {
    margin-left: 33px;
  }
}
.checklist-title-delete-btn {
  position: absolute;
  display: inline-block;
  right: 10px;
  width: 66px;
  height: 30px;
  top: -6px;
  color: black;
  background: rgba(9, 30, 66, 0.04);
  &:hover {
    background-color: rgba(9, 30, 66, 0.1);
  }
}
.progress {
  margin: 15px -8px 15px 34px;
}
.checkbox-input-btn {
  display: inline;
  position: relative;
  width: 60px;
  height: 30px;
  margin: 0 0 15px 31px;
  &:hover {
    filter: brightness(90%);
  }
  &.checkbox-item-save {
    margin-left: 34px;
  }
}
.checkbox-input-cancle {
  color: black;
  display: inline;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    font-weight: 900;
  }
}
.checklist-body-card-text {
  position: relative;
  top: -2.5px;
  left: 11px;
  font-size: 16px !important;
  cursor: pointer;
  &:hover {
    color: rgba(9, 30, 66, 0.6);
  }
}
.checkbox-add-btn {
  position: relative;
  height: 30px;
  color: black;
  background: rgba(9, 30, 66, 0.04);
  left: 35px;
  top: 5px;
  margin-bottom: 10px;
  &:hover {
    background-color: rgba(9, 30, 66, 0.1);
  }
}
</style>
