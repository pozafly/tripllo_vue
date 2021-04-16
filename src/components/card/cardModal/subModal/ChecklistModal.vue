<template>
  <MiniModal @close="$emit('close')">
    <div slot="header" class="header-text">Add Checklist</div>
    <div slot="content">
      <div class="content-text">Title</div>
      <input
        v-model="inputTitle"
        v-focus
        type="text"
        class="form-control checklist-title"
        spellcheck="false"
        maxlength="44"
        @keypress.enter="addChecklist"
      />
      <button class="checklist-btn" type="button" @click="addChecklist">
        Add
      </button>
    </div>
  </MiniModal>
</template>

<script>
import { createChecklist } from '@/api/checklist';
import bus from '@/utils/bus';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      inputTitle: 'Checklist',
    };
  },

  computed: {
    ...mapState(['board', 'card']),
  },

  methods: {
    ...mapActions(['READ_BOARD_DETAIL']),
    addChecklist() {
      this.$emit('close');
      this.createChecklist();
    },

    createChecklist() {
      createChecklist({ title: this.inputTitle, cardId: this.card.id })
        .then(() => {
          bus.$emit('readChecklist', this.card.id);
          this.READ_BOARD_DETAIL(this.board.id);
        })
        .catch(error => {
          console.log(error);
          alert('체크리스트를 생성하지 못했습니다.');
        });
    },
  },
};
</script>

<style lang="scss">
.checklist-title {
  border: 1px solid black;
  margin-top: 11px;
}
.checklist-btn {
  width: 50px;
  height: 30px;
  &:hover {
    filter: brightness(90%);
  }
}
</style>
