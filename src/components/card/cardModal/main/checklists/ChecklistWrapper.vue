<template>
  <div>
    <li class="body-item">
      <Checklists
        v-for="checklist in checklists"
        :key="checklist.id"
        class="checklist"
        :checklist="checklist"
      />
    </li>
  </div>
</template>

<script>
import Checklists from '@/components/card/cardModal/main/checklists/Checklists.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Checklists,
  },
  computed: {
    ...mapState(['checklists']),
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
}
</style>
