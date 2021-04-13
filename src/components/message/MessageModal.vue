<template>
  <MiniModal @close="$emit('close')">
    <div slot="header" class="header-text">Push Message</div>
    <div slot="content">
      <div class="content-text">Message List</div>
      <div v-if="pushMessage">
        <div v-for="message in pushMessage" :key="message.id">
          <ul>
            <MessageModalConfirm :message="message" @close="$emit('close')" />
          </ul>
        </div>
      </div>
      <span v-else class="no-message">No Message...</span>
    </div>
  </MiniModal>
</template>

<script>
import MessageModalConfirm from '@/components/message/MessageModalConfirm.vue';
import { mapState } from 'vuex';

export default {
  components: {
    MessageModalConfirm,
  },

  computed: {
    ...mapState(['pushMessage']),
  },
};
</script>

<style scoped lang="scss">
.no-message {
  display: flex;
  justify-content: center;
  font-size: 13px;
}
</style>
