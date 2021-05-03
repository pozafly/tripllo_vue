<template>
  <div class="file-wrap" @click="download">
    <div class="file-extension">
      <span class="extension-text">{{ extension.toUpperCase() }}</span>
    </div>
    <div class="file-info-wrap">
      <div class="file-name">{{ fileName }}</div>
      <div class="file-created-at">
        {{ createdAt | timeForToday }}
      </div>
      <span class="file-delete-btn" @click="deleteFile">&times;</span>
    </div>
  </div>
</template>

<script>
import { deleteFileAPI } from '@/api/upload';
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    id: {
      type: Number,
      default: 0,
      required: false,
    },
    link: {
      type: String,
      required: true,
      default: '',
    },
    extension: {
      type: String,
      required: true,
      default: '',
    },
    fileName: {
      type: [String, Number],
      required: true,
      default: '',
    },
    createdAt: {
      type: String,
      required: true,
      default: '',
    },
  },

  computed: {
    ...mapState(['board', 'user', 'card']),
  },

  methods: {
    ...mapActions(['READ_FILE', 'READ_BOARD_DETAIL']),
    download(e) {
      if (!this.isPermission()) {
        alert('권한이 없습니다.');
        return;
      }
      if (e.target.className === 'file-delete-btn') {
        return;
      }
      let download = window.confirm(
        `${this.fileName}을 다운로드 받으시겠습니까?`,
      );
      if (download) {
        location.href = `${this.link}`;
      }
    },

    async deleteFile() {
      if (!this.isPermission()) {
        alert('권한이 없습니다.');
        return;
      }
      let deleteFile = window.confirm(
        `${this.fileName} 파일을 삭제하시겠습니까?`,
      );
      if (deleteFile) {
        try {
          await deleteFileAPI(this.id);
          this.READ_FILE(this.card.id);
          this.READ_BOARD_DETAIL(this.board.id);
        } catch (error) {
          console.log(error);
          alert('파일을 삭제하는데 실패했습니다.');
        }
      }
    },

    isPermission() {
      if (this.board.createdBy === this.user.id) {
        return true;
      }
      if (this.board.invitedUser) {
        if (this.board.invitedUser.includes(this.user.id)) {
          return true;
        }
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.file-wrap {
  display: block;
  margin: 13px 0 7px 35px;
  width: 92%;
  overflow-wrap: break-word;
  resize: none;
  border: none;
  font-family: Arial;
  font-size: 14px;
  background: none;
  height: 4rem;
  cursor: pointer;
  &:hover {
    background: rgba(9, 30, 66, 0.1);
    .file-info-wrap .file-delete-btn {
      display: inline-block;
    }
  }
  .file-extension {
    background-color: rgba(9, 30, 66, 0.04);
    border-radius: 3px;
    height: 100%;
    position: relative;
    left: 0;
    text-align: center;
    text-decoration: none;
    z-index: 1;
    width: 112px;
    font-size: 20px;
    float: left;
    .extension-text {
      position: relative;
      top: 20px;
    }
  }
  .file-info-wrap {
    position: relative;
    left: 13px;
    .file-name {
      position: relative;
      top: 14px;
      margin: 13px;
      font-weight: 700;
    }
    .file-created-at {
      position: relative;
      top: 5px;
      margin: 13px;
    }
    .file-delete-btn {
      display: none;
      position: absolute;
      top: 5px;
      right: 25px;
      font-size: 20px;
      font-weight: 100;
      &:hover {
        font-weight: 700;
      }
    }
  }
}
</style>
