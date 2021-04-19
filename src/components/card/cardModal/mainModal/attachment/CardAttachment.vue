<template>
  <div v-if="file">
    <li class="body-item">
      <div>
        <awesome icon="paperclip" class="far fa-paperclip"></awesome>
        <span class="body-card-text">Attachment</span>
        <div v-for="item in file" :key="item.id">
          <CardAttachmentList v-bind="item" />
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import CardAttachmentList from '@/components/card/cardModal/mainModal/attachment/CardAttachmentList.vue';
import { mapState } from 'vuex';

export default {
  components: {
    CardAttachmentList,
  },

  computed: {
    ...mapState(['file']),
  },
};
</script>

<style>
.fa-paperclip {
  color: #4f5d76;
}
.body-card-text {
  color: #212732;
}
</style>
