<template>
  <div class="chrome-wrap">
    <chrome-color-picker
      :value="'#FFFFFF'"
      class="chrome-picker"
      @input="updateValue"
    ></chrome-color-picker>
    <button class="btn chrome-choice" type="button" @click="onSelect">
      선택
    </button>
    <button class="btn chrome-cancel" type="button" @click="onCancel">
      취소
    </button>
  </div>
</template>

<script>
import { Chrome } from 'vue-color';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    'chrome-color-picker': Chrome,
  },

  data() {
    return {
      selectColor: '',
    };
  },

  computed: {
    ...mapState(['board']),
  },

  methods: {
    ...mapActions(['UPDATE_BOARD']),
    ...mapMutations(['setTheme']),
    updateValue(e) {
      const rgba = e.rgba;
      const color = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
      this.selectColor = color;
    },
    onSelect() {
      const id = this.board.id;
      const bgColor = this.selectColor;
      this.UPDATE_BOARD({ id, bgColor }).then(() => this.setTheme(bgColor));
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped lang="scss">
.chrome-wrap {
  /* border: 1px solid black; */
  position: absolute;
  padding: 20px 30px;
  bottom: 83px;
  right: 330px;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 5px 2px;
  box-sizing: border-box;
  text-align: center;
  .btn {
    position: relative;
    width: 70px;
    height: 40px;
    margin: 15px 5px 0;
    &.chrome-cancel {
      background: #eb5a46;
    }
    &:hover {
      filter: brightness(94%);
    }
  }
}
</style>
