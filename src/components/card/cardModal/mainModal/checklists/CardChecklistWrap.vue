<template>
  <div>
    <awesome icon="check-square" class="far fa-check-square"></awesome>
    <span v-if="!isTitle">
      <a href="" class="checklist-body-card-text" @click.prevent="editTitle">
        {{ title }}
        <awesome icon="edit" class="fas fa-edit"></awesome>
      </a>
      <button
        class="checklist-title-delete-btn"
        type="button"
        @click="deleteChecklist"
      >
        Delete
      </button>
    </span>
    <span v-else>
      <input
        v-model="inputTitle"
        v-focus
        type="text"
        class="form-control checkbox-input-title"
        maxlength="44"
        @blur="onSubmitTitle"
        @keypress.enter="onKeyupEnter"
      />
      <button class="checkbox-input-btn" type="button" @click="onSubmitTitle">
        Save
      </button>
      <a href="" class="checkbox-input-cancel" @click.prevent="isTitle = false">
        &times;
      </a>
    </span>
    <KProgress
      :percent="percent"
      class="progress"
      :line-height="7"
      :status="status"
    />

    <CardChecklistWrapItem v-for="item in items" :key="item.id" v-bind="item" />

    <button
      v-if="!isItem"
      class="checkbox-add-btn"
      type="button"
      @click="isAddItem"
    >
      Add an item
    </button>
    <span v-else>
      <input
        v-model="inputItem"
        v-focus
        type="text"
        :class="`form-control checkbox-input-title checkbox-item-input`"
        placeholder="Add an Item"
        maxlength="399"
        @blur="onSubmitItem"
        @keypress.enter="onKeyupEnter"
      />
      <button
        class="checkbox-input-btn checkbox-item-save"
        type="button"
        @click="onSubmitItem"
      >
        Save
      </button>
      <a href="" class="checkbox-input-cancel checkbox-item-cancel">
        &times;
      </a>
    </span>
  </div>
</template>

<script>
import CardChecklistWrapItem from '@/components/card/cardModal/mainModal/checklists/CardChecklistWrapItem.vue';
import { updateChecklistAPI, deleteChecklistAPI } from '@/api/checklist';
import { createChecklistItemAPI } from '@/api/checklistItem';

export default {
  components: {
    CardChecklistWrapItem,
  },

  props: {
    cardId: {
      type: Number,
      default: 0,
      require: true,
      validator(value) {
        return typeof value === 'number';
      },
    },
    id: {
      type: Number,
      default: 0,
      require: true,
      validator(value) {
        return typeof value === 'number';
      },
    },
    items: {
      type: Array,
      default: () => [],
      require: false,
      validator: prop =>
        prop.every(
          e =>
            typeof e === 'string' ||
            typeof e === 'number' ||
            typeof e === 'object',
        ),
    },
    title: {
      type: String,
      require: true,
      default: '',
      validator(value) {
        return typeof value === 'string';
      },
    },
    readChecklist: {
      type: Function,
      require: true,
      default: () => {},
      validator(value) {
        return typeof value === 'function';
      },
    },
  },

  data() {
    return {
      isTitle: false,
      isItem: false,
      inputTitle: '',
      inputItem: '',
      percent: 0,
      status: 'error',
    };
  },

  watch: {
    items() {
      this.onProgress();
    },
  },

  mounted() {
    this.onProgress();
  },

  methods: {
    editTitle() {
      this.isTitle = true;
      this.inputTitle = this.title;
    },

    async deleteChecklist() {
      try {
        await deleteChecklistAPI({
          checklistId: this.id,
          cardId: this.cardId,
        });
        this.readChecklist(this.cardId);
      } catch (error) {
        console.log(error);
        alert('체크리스트를 삭제하지 못했습니다.');
      }
    },

    async updateChecklist() {
      try {
        await updateChecklistAPI(this.id, { title: this.inputTitle });
        this.readChecklist(this.cardId);
      } catch (error) {
        console.log(error);
        alert('체크리스트를 업데이트 하지 못했습니다.');
      }
    },

    async createChecklistItem() {
      try {
        await createChecklistItemAPI({
          checklistId: this.id,
          item: this.inputItem,
        });
        this.readChecklist(this.cardId);
      } catch (error) {
        console.log(error);
        alert('체크리스트 아이템을 생성하지 못했습니다.');
      }
    },

    onSubmitTitle({ relatedTarget }) {
      this.isTitle = false;
      if (relatedTarget) {
        if (relatedTarget.className === 'checkbox-input-cancel') {
          return;
        }
      }
      if (this.inputTitle.trim() === this.title) {
        return;
      }
      this.updateChecklist();
    },

    isAddItem() {
      this.isItem = true;
      this.$el.querySelector(`.checkbox-input-title`).focus();
    },

    onSubmitItem({ relatedTarget }) {
      this.isItem = false;
      if (relatedTarget) {
        if (
          relatedTarget.className ===
          'checkbox-input-cancel checkbox-item-cancel'
        ) {
          return;
        }
      }
      if (this.inputItem === '') {
        return;
      }

      this.createChecklistItem();
      this.inputItem = '';
      this.isAddItem();
    },

    onProgress() {
      let count = 0;
      if (this.items.length === 0) {
        return;
      }

      this.items.forEach(element => {
        if (element.isChecked === 'Y') {
          count += 1;
        }
      });

      let changeStatus = (count / this.items.length) * 100;
      this.percent = Math.round(changeStatus, -1);

      changeStatus === 100
        ? (this.status = 'success')
        : (this.status = 'error');
    },

    onKeyupEnter(event) {
      event.target.blur();
    },
  },
};
</script>

<style lang="scss">
.fa-check-square {
  color: #4f5d76;
}
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
.checkbox-input-cancel {
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
  color: #212732;
  cursor: pointer;
  &:hover {
    color: rgba(9, 30, 66, 0.6);
    .fa-edit {
      display: inline-block;
      font-size: 10px !important;
    }
  }
  .fa-edit {
    display: none;
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
