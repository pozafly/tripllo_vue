<template>
  <li class="body-item">
    <awesome icon="layer-group" class="fas fa-layer-group"></awesome>
    <span class="body-card-text">Description</span>
    <textarea
      class="form-control card-desc textarea"
      ref="inputDesc"
      v-model="description"
      v-if="isEditDesc"
      :readonly="!isEditDesc"
      spellcheck="false"
      @blur="onSubmitDesc"
      @keydown="resize"
    />
    <textarea
      v-else
      class="form-control card-desc"
      @click="onEditDesc"
      :value="card.description"
      ref="firstDesc"
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
  </li>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isEditDesc: false,
      description: '',
    };
  },
  props: ['card'],
  methods: {
    ...mapActions(['UPDATE_CARD']),
    onEditDesc() {
      this.isEditDesc = true;
      this.description = this.card.description;
      this.$nextTick(() => this.$refs.inputDesc.focus());
    },
    // relatedTarget: 이벤트 발생 타겟을 의미함.
    onSubmitDesc({ relatedTarget }) {
      this.isEditDesc = false;

      // body를 눌렀을 때, 이벤트 타겟이 null로 나오므로 그냥 통과(저장된단 말임.)
      if (relatedTarget) {
        if (relatedTarget.className === 'desc-cancel') return; // x버튼을 눌렀을 때는 return
      }
      if (this.description === this.card.description) return;
      this.UPDATE_CARD({ id: this.card.id, description: this.description });
    },
    onKeyupEnter(event) {
      event.target.blur();
    },
    resize(e) {
      e.target.style.height = '1px';
      e.target.style.height = 12 + e.target.scrollHeight + 'px';
    },
    firstResize(target) {
      target.style.height = '1px';
      target.style.height = 12 + target.scrollHeight + 'px';
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.firstResize(this.$refs.firstDesc);
      // this.$refs.firstDesc.style.height = this.$refs.scrollHeight + 'px';
    });
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
  min-height: 5rem;
  background: rgba(9, 30, 66, 0.04);
  overflow-y: hidden; /* prevents scroll bar flash */
  &:hover {
    background: rgba(9, 30, 66, 0.1);
  }
  &.textarea {
    min-height: 5rem;
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
