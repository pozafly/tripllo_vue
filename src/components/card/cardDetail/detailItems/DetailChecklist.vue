<template>
  <div>
    <li class="body-item">
      <!-- v-for에 key를 사용하여 변경점을 찾았다. -->
      <div
        v-for="(checklist, key) in checklists"
        :key="checklist.id"
        class="checklist"
      >
        <i class="far fa-check-square"></i>
        <!-- 여기 key를 넣어준다. -->
        <span
          class="body-card-text"
          @click="isEditTitle(key)"
          v-if="isTitle[key].is === false"
        >
          {{ checklist.title }}
        </span>
        <span v-else>
          <input
            type="text"
            :class="`form-control checkbox-input-title input${key}`"
            v-model="inputTitle"
            @blur="onSubmitTitle"
            @keypress.enter="onKeyupEnter"
          />
          <button class="checkbox-input-btn" @click="onSubmitTitle(key)">
            Save
          </button>
          <span class="checkbox-input-cancle">&times;</span>
        </span>
        <div v-for="items in checklist.items" :key="items.id">
          <input type="checkbox" :checked="isChecked(items.isChecked)" />
          <span>{{ items.item }}</span>
        </div>
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
      isTitle: [],
    };
  },
  computed: {
    ...mapState(['card', 'checklists']),
  },
  watch: {
    card() {
      this.READ_CHECKLIST({ id: this.card.id });
    },
    checklists() {
      this.checklists.forEach(() => {
        this.isTitle.push({ is: false });
      });
    },
  },
  methods: {
    ...mapActions(['READ_CHECKLIST', 'UPDATE_CHECKLIST']),
    isChecked(isChecked) {
      return isChecked === 'Y' ? true : false;
    },
    onSubmitTitle(key) {
      this.UPDATE_CHECKLIST({
        id: this.checklists[key].id,
        title: this.inputTitle[key],
      });
      this.isTitle[key].is = false;
    },
    onKeyupEnter() {
      event.target.blur();
    },
    isEditTitle(key) {
      this.isTitle[key].is = true;

      this.$nextTick(() => {
        this.$el.querySelector(`.input${key}`).focus();
      });

      // this.$refs.inputTitle[key] = this.checklists[key].title;
    },
  },
};
</script>

<style lang="scss">
.checklist {
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
    cursor: pointer;
  }
}
</style>
