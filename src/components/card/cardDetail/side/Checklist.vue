<template>
  <SideBase @close="$emit('close')" :xy="xy">
    <div slot="header" class="header-text">Checklist</div>
    <div slot="content">
      <div class="content-text">Title</div>
      <input
        type="text"
        class="form-control checklist-title"
        v-model="inputTitle"
        ref="inputTitle"
        spellcheck="false"
      />
      <button class="checklist-btn" @click="addChecklist">Add</button>
    </div>
  </SideBase>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SideBase from './SideBase';

export default {
  components: {
    SideBase,
  },
  props: ['xy'],
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
