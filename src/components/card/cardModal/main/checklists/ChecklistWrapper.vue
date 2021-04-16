<template>
  <div v-if="checklists">
    <li class="body-item">
      <Checklists
        v-for="checklist in checklists"
        :key="checklist.id"
        class="checklist"
        v-bind="checklist"
        :read-checklist="readChecklist"
      />
    </li>
  </div>
</template>

<script>
import Checklists from '@/components/card/cardModal/main/checklists/Checklists.vue';
import bus from '@/utils/bus';
import { readChecklist } from '@/api/checklist';

export default {
  components: {
    Checklists,
  },

  data() {
    return {
      cardId: this.$route.params.cardId * 1,
      checklists: {},
    };
  },

  created() {
    this.readChecklist(this.cardId);
    this.busListener();
  },

  beforeDestroy() {
    this.$off('readChecklist');
  },

  methods: {
    readChecklist(cardId) {
      console.log('wrapper', cardId);

      readChecklist(cardId)
        .then(({ data }) => {
          this.checklists = data.data;
        })
        .catch(error => {
          console.log(error);
          alert('체크리스트를 정보를 가져오지 못했습니다.');
        });
    },

    busListener() {
      bus.$on('readChecklist', cardId => {
        this.readChecklist(cardId);
      });
    },
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
