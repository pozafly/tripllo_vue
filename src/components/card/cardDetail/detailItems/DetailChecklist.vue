<template>
  <div>
    <li class="body-item">
      <div
        v-for="checklist in checklists"
        :key="checklist.id"
        class="checklist"
      >
        <i class="far fa-check-square"></i>
        <span class="body-card-text">{{ checklist.title }}</span>
        <div>
          {{ checklist.items }}
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['card', 'checklists']),
  },
  watch: {
    card() {
      this.READ_CHECKLIST({ id: this.card.id });
    },
  },
  methods: {
    ...mapActions(['READ_CHECKLIST']),
  },
};
</script>

<style lang="scss">
.checklist:not(:first-child) {
  margin-top: 20px;
}
</style>
