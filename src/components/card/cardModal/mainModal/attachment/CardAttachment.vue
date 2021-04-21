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
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    CardAttachmentList,
  },

  data() {
    return {
      cardId: this.$route.params.cardId * 1,
    };
  },

  computed: {
    ...mapState(['file']),
  },

  created() {
    this.readFileInfo();
  },

  beforeDestroy() {
    this.deleteFileInfo();
  },

  methods: {
    ...mapActions(['READ_FILE', 'DELETE_FILE_FROM_STATE']),

    async readFileInfo() {
      try {
        console.log('readFileInfo');
        await this.READ_FILE(this.cardId);
      } catch (error) {
        console.log(error);
        alert('파일을 읽어오지 못했습니다.');
      }
    },

    async deleteFileInfo() {
      await this.DELETE_FILE_FROM_STATE();
    },
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
