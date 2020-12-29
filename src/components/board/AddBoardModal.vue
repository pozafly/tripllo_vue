<template>
  <modal>
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button" @click.prevent="closeModal">
          &times;
        </a>
      </h2>
    </div>
    <div slot="body">
      <form @submit.prevent="addBoard">
        <input
          class="form-control"
          type="text"
          v-model="input"
          ref="input"
          placeholder="Please write new board title"
        />
      </form>
    </div>
    <div slot="footer" class="btn-wrap">
      <button
        class="btn"
        type="submit"
        form="add-board-form"
        :disabled="!valid"
        @click.prevent="addBoard"
      >
        Create Board
      </button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/common/Modal';
import { mapActions } from 'vuex';

export default {
  components: { Modal },
  data() {
    return {
      input: '',
      valid: false,
    };
  },
  watch: {
    input(value) {
      this.valid = value.trim().length > 0;
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    ...mapActions(['ADD_BOARD', 'FETCH_BOARD']),
    addBoard() {
      this.ADD_BOARD(this.input).then(({ data }) => {
        this.$router.push(`/board/${data.data.id}`);
      });
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.form-control {
  width: 100%;
  height: 30px;
}
.btn-wrap {
  text-align: center;
  .btn {
    cursor: pointer;
    border: 0;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
    margin: 0 auto;
    width: 50%;
    height: 1.8rem;
    background: #5aac44;
    color: white;
    &:hover {
      background: #60bd4e;
    }
    &:disabled {
      background: #ccc;
      cursor: default;
    }
  }
}
</style>
