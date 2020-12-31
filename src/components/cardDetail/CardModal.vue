<template>
  <Modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <i class="far fa-clipboard"></i>
        <input
          class="form-control card-title-input"
          type="text"
          ref="inputTitle"
          v-if="isEditTitle"
          :value="card.title"
          @blur="onSubmitTitle"
          @keypress.enter="onKeyupEnter"
        />
        <a v-else href="" @click.prevent="onEditTitle">{{ card.title }}</a>
        <span class="card-list-title">in list {{ listTitle }}</span>
      </div>
    </div>
    <div slot="body" class="modal-card-body">
      <i class="fas fa-layer-group"></i>
      <span class="body-card-text">Description</span>
      <textarea
        class="form-control card-desc textarea"
        ref="inputDesc"
        v-model="description"
        v-if="isEditDesc"
        :readonly="!isEditDesc"
        spellcheck="false"
      />
      <textarea
        v-else
        class="form-control card-desc"
        @click="onEditDesc"
        :value="card.description"
        spellcheck="false"
        placeholder="Add a more detailed description..."
      >
      </textarea>
      <template v-if="isEditDesc">
        <button class="card-desc-btn" @click="onSubmitDesc">Save</button>
        <a href="" class="desc-cancel" @click.prevent="isEditDesc = false">
          &times;
        </a>
      </template>

      <div>
        <i class="fas fa-map-marker-alt"></i>
        <span class="body-card-text">Loction</span>
      </div>

      <div>
        <i class="fas fa-comments"></i>
        <span class="body-card-text">Comments</span>
      </div>
    </div>
    <div slot="footer"></div>
    <div slot="side" class="side-slot">
      <CardModalSide />
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/common/Modal';
import CardModalSide from '@/components/cardDetail/CardModalSide';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    Modal,
    CardModalSide,
  },
  data() {
    return {
      isEditTitle: false,
      isEditDesc: false,
      description: '',
      listTitle: '',
    };
  },
  computed: {
    ...mapState(['card', 'board']),
  },
  watch: {
    // UPDATE_CARD 후 card가 들어오면 실행되도록.
    card() {
      const { title } = this.board.lists.filter(l => {
        return l.id == this.card.listId;
      })[0];
      this.listTitle = title;
    },
  },
  methods: {
    ...mapActions(['READ_CARD', 'UPDATE_CARD']),
    onEditTitle() {
      this.isEditTitle = true;
      this.$nextTick(() => this.$refs.inputTitle.focus());
    },
    onSubmitTitle() {
      this.isEditTitle = false;

      const inputTitle = this.$refs.inputTitle.value || '';
      if (inputTitle === this.card.title) return;
      this.UPDATE_CARD({ id: this.card.id, title: inputTitle });
    },
    onEditDesc() {
      this.isEditDesc = true;
      this.description = this.card.description;
      this.$nextTick(() => this.$refs.inputDesc.focus());
    },
    onSubmitDesc() {
      this.UPDATE_CARD({ id: this.card.id, description: this.description });
      this.isEditDesc = false;
    },
    onKeyupEnter() {
      event.target.blur();
    },
  },
  created() {
    this.READ_CARD({ id: this.$route.params.cardId });
  },
};
</script>

<style lang="scss">
/* * {
  border: 1px solid black;
} */
.modal-card {
  .modal-container {
    min-width: 300px;
    max-width: 800px;
    width: 80%;
    height: 80%;
    font-size: 20px;
  }
  .modal-card-header {
    position: relative;
    .modal-card-header-title {
      padding-right: 30px;
      min-height: 30px;
      a {
        color: black;
        font-size: 23px;
        margin-left: 15px;
        &:hover {
          color: rgba(0, 0, 0, 0.3);
        }
      }
      .card-title-input {
        margin: 0 0 0 15px;
        padding: 3px 6px;
        width: 90%;
        display: inline;
        overflow: hidden;
        overflow-wrap: break-word;
        height: 28px;
        font-size: 21px;
      }
      .card-list-title {
        margin: 12px 0 40px 34px;
        display: block;
        font-size: 13px;
        font-weight: 400;
      }
      .fa-clipboard {
        padding: 1px;
        font-size: 20px;
      }
    }
  }
  .modal-card-body {
    margin-bottom: 10px;
    .fa-layer-group {
      font-size: 18px;
    }
    .body-card-text {
      display: inline;
      margin-left: 6px;
      padding: 3px 6px;
      width: 90%;
      overflow: hidden;
      overflow-wrap: break-word;
      height: 28px;
      font-size: 21px;
    }
    .card-desc {
      display: block;
      margin: 13px 0 7px 27px;
      width: 92%;
      overflow-wrap: break-word;
      resize: none;
      height: 54px;
      border: none;
      font-family: Arial;
      font-size: 14px;
      background: rgba(9, 30, 66, 0.04);
      height: 5rem;
      &:hover {
        background-color: rgba(9, 30, 66, 0.1);
      }
      &.textarea {
        height: 7rem;
        background: #fff;
      }
    }
    .card-desc-btn {
      display: inline;
      margin: 0 0 40px 27px;
      width: 55px;
      height: 33px;
    }
    .desc-cancel {
      margin-left: 10px;
      font-size: 25px;
      color: black;
    }
  }
  .side-slot {
    height: 100%;
  }
}
</style>
