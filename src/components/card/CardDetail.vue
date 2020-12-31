<template>
  <div>
    <Modal> </Modal>
  </div>
</template>

<script>
import Modal from '@/components/common/Modal';
import { mapActions } from 'vuex';

export default {
  components: {
    Modal,
  },
  methods: {
    ...mapActions(['READ_CARD']),
  },
  created() {
    this.READ_CARD({ id: this.$route.params.cardId });
  },
};
</script>

<style></style>
