<template>
  <div v-if="checklists">
    <li class="body-item">
      <CardChecklistWrap
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
import CardChecklistWrap from '@/components/card/cardModal/mainModal/checklists/CardChecklistWrap.vue';
import bus from '@/utils/bus';
import { readChecklistAPI } from '@/api/checklist';

export default {
  components: {
    CardChecklistWrap,
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
    async readChecklist(cardId) {
      try {
        const { data } = await readChecklistAPI(cardId);
        this.checklists = data.data;
      } catch (error) {
        console.log(error);
        alert('체크리스트를 정보를 가져오지 못했습니다.');
      }
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
