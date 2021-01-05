<template>
  <div>
    <li class="body-item">
      <!-- v-for에 key를 사용하여 변경점을 찾았다. 배열의 순서대로 작업하기 위해. -->
      <div
        v-for="(checklist, key) in checklists"
        :key="checklist.id"
        class="checklist"
      >
        <i class="far fa-check-square"></i>
        <!-- 여기 key를 넣어준다. -->
        <span v-if="isTitle[key].is === false">
          <span class="body-card-text" @click="isEditTitle(key)">
            {{ checklist.title }}
          </span>
          <button
            class="checklist-title-delete-btn"
            @click="deleteChecklist(key)"
          >
            Delete
          </button>
          <KProgress
            :percent="30"
            class="progress"
            status="error"
            :line-height="7"
          />
        </span>
        <span v-else>
          <input
            type="text"
            :class="`form-control checkbox-input-title input${key}`"
            v-model="inputTitle"
            @blur="onSubmitTitle(key)"
            @keypress.enter="onKeyupEnter"
          />
          <button class="checkbox-input-btn" @click="onSubmitTitle(key)">
            Save
          </button>
          <span class="checkbox-input-cancle">&times;</span>
        </span>
        <div
          v-for="items in checklist.items"
          :key="items.id"
          class="checkbox-item"
        >
          <input type="checkbox" :checked="isChecked(items.isChecked)" />
          <span class="checkbox-item-text">{{ items.item }}</span>
        </div>

        <button
          class="checkbox-add-btn"
          @click="isAddItem(key)"
          v-if="isItem[key].is === false"
        >
          Add an item
        </button>
        <span v-else>
          <input
            type="text"
            :class="`form-control checkbox-input-title inputItem${key}`"
            v-model="inputItem"
          />
          <button class="checkbox-input-btn" @click="onSubmitTitle(key)">
            Save
          </button>
          <span class="checkbox-input-cancle">&times;</span>
        </span>
      </div>
    </li>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      inputTitle: '',
      inputItem: '',
      isTitle: [],
      isItem: [],
    };
  },
  computed: {
    ...mapState(['card', 'checklists']),
  },
  watch: {
    card() {},
    checklists() {},
  },
  methods: {
    ...mapActions(['READ_CHECKLIST', 'UPDATE_CHECKLIST', 'DELETE_CHECKLIST']),
    isChecked(isChecked) {
      return isChecked === 'Y' ? true : false;
    },
    onSubmitTitle(key) {
      this.isTitle[key].is = false;
      if (this.inputTitle.trim() === this.checklists[key].title) return;
      this.UPDATE_CHECKLIST({
        id: this.checklists[key].id,
        title: this.inputTitle,
      });
    },
    onKeyupEnter() {
      event.target.blur();
    },
    isEditTitle(key) {
      this.isTitle[key].is = true;

      this.$nextTick(() => {
        this.inputTitle = this.checklists[key].title;
        this.$el.querySelector(`.input${key}`).focus();
      });
    },
    deleteChecklist(key) {
      this.DELETE_CHECKLIST({ id: this.checklists[key].id });
    },
    isAddItem(key) {
      console.log(key);
    },
  },
  created() {
    this.checklists.forEach(() => {
      this.isTitle.push({ is: false });
      this.isItem.push({ is: false });
    });
  },
};
</script>

<style lang="scss">
.checklist {
  position: relative;
  height: auto;
  &:not(:first-child) {
    margin-top: 20px;
  }
  .checkbox-input-title {
    display: inline;
    width: 78%;
    margin-left: 20px;
    &:hover {
      filter: brightness(90%);
    }
  }
  .checklist-title-delete-btn {
    position: absolute;
    display: inline-block;
    right: 0px;
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
    margin: 15px 0 15px 3px;
  }
  .checkbox-input-btn {
    display: inline;
    position: relative;
    width: 60px;
    height: 30px;
    margin: 0 0 15px 39px;
    &:hover {
      filter: brightness(90%);
    }
  }
  .checkbox-input-cancle {
    display: inline;
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      font-weight: 900;
    }
  }
  .body-card-text {
    position: relative;
    top: -2.5px;
    left: -10px;
    font-size: 16px !important;
    cursor: pointer;
    &:hover {
      color: rgba(9, 30, 66, 0.6);
    }
  }
  .checkbox-item {
    margin: 5px 0;
    .checkbox-item-text {
      position: relative;
      font-size: 14px;
      margin-left: 3px;
      top: -2px;
    }
  }
  .checkbox-add-btn {
    position: relative;
    height: 30px;
    color: black;
    background: rgba(9, 30, 66, 0.04);
    left: 23px;
    top: 5px;
    margin-bottom: 10px;
    &:hover {
      background-color: rgba(9, 30, 66, 0.1);
    }
  }
}
</style>
