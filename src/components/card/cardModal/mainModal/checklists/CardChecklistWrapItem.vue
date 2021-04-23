<template>
  <div class="checkbox-item" @click="onCheckChange">
    <input
      type="checkbox"
      class="checkbox-input"
      :checked="computedIsChecked"
      maxlength="399"
    />
    <template v-if="!isItem">
      <span v-if="!computedIsChecked" class="checkbox-item-text">
        {{ item }}
      </span>
      <span v-else class="checkbox-item-text line-through">
        {{ item }}
      </span>
      <awesome icon="edit" class="fas fa-edit" @click="onEditItem"></awesome>
      <span class="checkbox-item-cancel" @click="onDeleteItem">&times;</span>
    </template>
    <template v-else>
      <input
        v-model="inputItem"
        v-focus
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
import {
  updateChecklistItemAPI,
  deleteChecklistItemAPI,
} from '@/api/checklistItem';
import bus from '@/utils/bus';
import { mapState } from 'vuex';

export default {
  props: {
    id: {
      type: Number,
      default: 0,
      require: true,
    },
    isChecked: {
      type: String,
      require: true,
      default: 'N',
      validator(value) {
        return ['Y', 'N'].indexOf(value) !== -1;
      },
    },
    item: {
      type: [String, Number],
      require: true,
      default: '',
    },
  },

  data() {
    return {
      isItem: false,
      inputItem: '',
    };
  },

  computed: {
    ...mapState(['card']),
    computedIsChecked() {
      const isChecked = this.isChecked;
      return isChecked === 'Y' ? true : false;
    },
  },

  methods: {
    onCheckChange({ target }) {
      // 수정 버튼, 삭제 버튼 눌리지 않도록. 이벤트 캡쳐링 방지
      if (target.localName === 'path' || target.localName === 'svg') {
        return;
      }

      let isChecked = '';
      this.isChecked === 'N' ? (isChecked = 'Y') : (isChecked = 'N');
      this.updateChecklistItem({ isChecked });
    },

    onSubmitItem() {
      this.isItem = false;
      if (this.inputItem.trim() === this.item) {
        return;
      }
      this.updateChecklistItem({ item: this.inputItem });
    },

    async updateChecklistItem({ isChecked, item }) {
      try {
        await updateChecklistItemAPI(this.id, { isChecked, item });
        bus.$emit('readChecklist', this.card.id);
      } catch (error) {
        console.log(error);
        alert('체크리스트 아이템을 수정하지 못했습니다.');
      }
    },

    async onDeleteItem() {
      try {
        await deleteChecklistItemAPI(this.id);
        bus.$emit('readChecklist', this.card.id);
      } catch (error) {
        console.log(error);
        alert('체크리스트 아이템을 삭제하지 못했습니다.');
      }
    },

    onEditItem() {
      this.isItem = true;
      this.inputItem = this.item;
    },

    onKeyupEnter(event) {
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
