<template>
  <li class="body-item">
    <awesome icon="align-left" class="fas fa-layer-group"></awesome>
    <span class="body-card-text">Description</span>
    <textarea
      v-if="isEditDesc"
      v-model="description"
      class="form-control card-desc textarea"
      :readonly="!isEditDesc"
      spellcheck="false"
      @blur="onSubmitDesc"
    />
    <textarea
      v-else
      ref="firstDesc"
      class="form-control card-desc"
      :value="cardDescription"
      spellcheck="false"
      placeholder="Add a more detailed description..."
      @click="onEditDesc"
    >
    </textarea>
    <template v-if="isEditDesc">
      <button class="card-desc-btn" type="button" @click="onSubmitDesc">
        Save
      </button>
      <a href="" class="desc-cancel" @click.prevent="isEditDesc = false">
        &times;
      </a>
    </template>
  </li>
</template>

<script>
import { updateCardAPI } from '@/api/card';
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    cardDescription: {
      type: String,
      require: false,
      default: '',
      validator(value) {
        return typeof value === 'string';
      },
    },
    cardId: {
      type: Number,
      require: false,
      default: 0,
      validator(value) {
        return typeof value === 'number';
      },
    },
  },

  data() {
    return {
      isEditDesc: false,
      description: '',
    };
  },

  computed: {
    ...mapState(['board']),
  },

  methods: {
    ...mapActions(['READ_BOARD_DETAIL', 'READ_CARD']),

    onEditDesc() {
      this.isEditDesc = true;
      this.description = this.cardDescription;
    },

    // relatedTarget: 이벤트 발생 타겟을 의미함.
    async onSubmitDesc({ relatedTarget }) {
      this.isEditDesc = false;

      // body를 눌렀을 때, 이벤트 타겟이 null로 나오므로 그냥 통과(저장된단 말임.)
      if (relatedTarget) {
        if (relatedTarget.className === 'desc-cancel') {
          return; // x버튼을 눌렀을 때는 return
        }
      }
      if (this.description === this.cardDescription) {
        return;
      }

      try {
        await updateCardAPI(this.cardId, { description: this.description });
        await this.READ_BOARD_DETAIL(this.board.id);
        await this.READ_CARD(this.cardId);
      } catch (error) {
        console.log(error);
        alert('카드 정보를 수정하지 못했습니다.');
      }
    },

    onKeyupEnter(event) {
      event.target.blur();
    },
  },
};
</script>

<style scoped lang="scss">
.card-desc {
  display: block;
  margin: 13px 0 7px 35px;
  width: 92%;
  /* overflow-wrap: break-word; */
  resize: none;
  border: none;
  font-family: Arial;
  font-size: 14px;
  background: none;
  cursor: pointer;
  height: 6rem;
  background: rgba(9, 30, 66, 0.04);

  &:hover {
    background: rgba(9, 30, 66, 0.1);
  }
  &.textarea {
    height: 7rem;
    background: #fff;
    cursor: text;
  }
}
.card-desc-btn {
  display: inline;
  margin: 0 0 40px 27px;
  width: 55px;
  height: 33px;
  position: relative;
  left: 8px;
  &:hover {
    filter: brightness(90%);
  }
}
.desc-cancel {
  margin-left: 20px;
  font-size: 20px;
  color: black;
  &:hover {
    font-weight: 700;
  }
}
</style>
