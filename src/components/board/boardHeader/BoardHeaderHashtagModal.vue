<template>
  <div>
    <div class="hash-wrap">
      <div class="hash-item">
        <span v-for="hash in hashList" :key="hash" class="hashtag">
          # {{ hash }}
          <span class="hashtag-delete" @click="deleteHash(hash)">&times;</span>
        </span>
        <awesome
          icon="plus-circle"
          class="plus-icon"
          @click="openMadal"
        ></awesome>
      </div>
    </div>

    <div v-if="isHashModal" v-click-outside="closeModal" class="hash-modal">
      <MiniModal @close="isHashModal = false">
        <div slot="header" class="header-text">Add Hashtag</div>
        <div slot="content">
          <input
            ref="hashModal"
            v-model="hashItem"
            v-focus
            class="form-control hash-form"
            type="text"
            placeholder="예시) 국내여행, 고양이 ... 등"
            maxlength="14"
            @keypress.enter="pushHash"
          />
        </div>
      </MiniModal>
    </div>
  </div>
</template>

<script>
import MiniModal from '@/components/common/MiniModal.vue';
import { updateBoardAPI } from '@/api/board';
import { isEmpty } from '@/utils/libs';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    MiniModal,
  },

  data() {
    return {
      hashList: [],
      hashItem: '',
      isHashModal: false,
    };
  },

  computed: {
    ...mapState(['board']),
  },

  watch: {
    hashItem() {
      if (this.hashItem.trim().length > 14) {
        alert('해시태그는 15자를 넘길 수 없습니다.');
        return;
      }
    },

    board() {
      this.setHashList();
    },
  },

  mounted() {
    this.setHashList();
  },

  methods: {
    ...mapActions(['READ_BOARD_DETAIL']),

    setHashList() {
      const hashtag = this.board.hashtag;
      if (isEmpty(hashtag)) {
        return;
      }
      this.hashList = JSON.parse(hashtag);
    },

    pushHash() {
      if (this.hashList != null && this.hashList != '[]') {
        if (this.hashList.includes(this.hashItem)) {
          alert('같은 이름의 해시태그는 동일한 보드에 입력 불가능합니다.');
          this.hashItem = '';
          return;
        }
        if (this.hashList.length > 2) {
          alert('해시태그는 3개까지 입력가능합니다.');
          this.hashItem = '';
          return;
        }
      }

      this.hashList.push(this.hashItem.replace(/(\s*)/g, '').trim());
      this.hashItem = '';
      const hashtag = JSON.stringify(this.hashList);

      this.updateBoard(hashtag);
    },

    deleteHash(hash) {
      let pos = this.hashList.indexOf(hash);
      this.hashList.splice(pos, 1);
      const hashtag = JSON.stringify(this.hashList);

      this.updateBoard(hashtag);
    },

    async updateBoard(hashtag) {
      const id = this.board.id;
      try {
        await updateBoardAPI(id, { hashtag });
        await this.READ_BOARD_DETAIL(id);
      } catch (error) {
        console.log(error);
        alert('해시태그를 수정하지 못했습니다.');
      }
    },

    openMadal() {
      this.isHashModal = true;
    },

    closeModal(e) {
      if (e.target.className === 'hashtag-delete') {
        return;
      }
      this.isHashModal = false;
    },
  },
};
</script>

<style scoped lang="scss">
.hash-wrap {
  .hash-item {
    .hashtag {
      display: inline-block;
      margin-right: 8px;
      padding: 5px 10px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 30px;
      color: #fff;
      line-height: 20px;
      font-size: 13px;
      transition: all 0.3s;
      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.3);
      }
      .hashtag-delete {
        margin-left: 2px;
        cursor: pointer;
      }
    }
    .plus-icon {
      position: relative;
      top: 3px;
      color: red;
      background: white;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.hash-modal {
  position: absolute;
  top: 40px;
  right: 190px;
}
</style>
