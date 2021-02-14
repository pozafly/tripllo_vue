<template>
  <MiniModal @close="$emit('close')">
    <div slot="header" class="header-text">Add Checklist</div>
    <div slot="content">
      <div class="content-text">Title</div>
      <input
        type="text"
        class="form-control checklist-title"
        v-model="inputTitle"
        ref="inputTitle"
        spellcheck="false"
        @keypress.enter="addChecklist"
        maxlength="44"
      />
      <button class="checklist-btn" @click="addChecklist">Add</button>
    </div>
  </MiniModal>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MiniModal from '@/components/common/MiniModal';

export default {
  components: {
    MiniModal,
  },
  data() {
    return {
      inputTitle: 'Checklist',
    };
  },
  computed: {
    ...mapState(['card']),
  },
  mounted() {
    this.$refs.inputTitle.focus();
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
