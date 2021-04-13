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
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      inputTitle: 'Checklist',
    };
  },

  computed: {
    ...mapState(['card']),
  },

  methods: {
    ...mapActions(['CREATE_CHECKLIST']),

    addChecklist() {
      this.$emit('close');
      this.CREATE_CHECKLIST({ title: this.inputTitle, cardId: this.card.id });
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
