<template>
  <MiniModal @close="$emit('close')">
    <div slot="header" class="header-text">Add a File?</div>
    <div slot="content">
      <button class="add-btn" type="button" @click="$refs.fileInput.click()">
        Add a file
      </button>
      <span class="refer-text">
        * 10MB 이상인 파일은 업로드할 수 없음. aws 프리티어 유저라.. 10MB 용량을
        초과하는 파일은 올릴 수 없습니다..
      </span>
      <input ref="fileInput" type="file" class="file" @change="uploadFile" />
    </div>
  </MiniModal>
</template>

<script>
import bus from '@/utils/bus';
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['card', 'file']),
  },

  methods: {
    ...mapActions(['UPLOAD']),

    uploadFile() {
      const file = this.$refs.fileInput.files[0];
      const fileData = new FormData();

      if (file.size > 1048576 * 10) {
        alert('10MB 이상인 파일은 업로드 할 수 없습니다.. 양해부탁.. 😭');
        return;
      }

      if (this.file) {
        let sameName = true;
        this.file.forEach(el => {
          if (el.fileName === file.name) {
            alert('같은 이름의 파일은 업로드할 수 없습니다.');
            sameName = false;
            return;
          }
        });
        if (!sameName) {
          return;
        }
      }

      fileData.append('data', file);
      fileData.append('cardId', this.card.id);

      bus.$emit('start:spinner');
      this.UPLOAD(fileData);
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.add-btn {
  width: 100%;
  height: 37px;
  &:hover {
    background: #60bd4e;
  }
}
.refer-text {
  position: relative;
  top: 7px;
}
.file {
  display: none;
}
</style>
