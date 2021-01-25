<template>
  <div v-if="file.length !== 0">
    <li class="body-item">
      <div>
        <awesome icon="paperclip" class="far fa-paperclip"></awesome>
        <span class="body-card-text">Attachment</span>
        <div v-for="item in file" :key="item.id">
          <AttachmentList :item="item" />
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import AttachmentList from './AttachmentList';
import { mapState } from 'vuex';

export default {
  components: { AttachmentList },
  computed: {
    ...mapState(['file']),
  },
};
</script>

<style></style>
