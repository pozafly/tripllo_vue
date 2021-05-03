<template>
  <div ref="cardAbout" class="card-about">
    <div class="card-about-item">From Card</div>
    <div class="card-about-item">{{ title }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    x: {
      type: Number,
      default: 0,
      required: true,
    },
    y: {
      type: Number,
      default: 0,
      required: true,
    },
  },

  computed: {
    ...mapState(['card', 'board']),
  },

  watch: {
    title() {
      this.onPosition();
    },
  },

  mounted() {
    this.onPosition();
  },

  methods: {
    onPosition() {
      this.$refs.cardAbout.style.left = `${this.x - 130}px`;
      this.$refs.cardAbout.style.top = `${this.y - 150}px`;
    },
  },
};
</script>

<style scoped lang="scss">
.card-about {
  min-width: 200px;
  display: block;
  position: absolute;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  padding: 6px 8px 2px;
  z-index: 10;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #f4f5f7;
  }
  .card-about-item {
    text-align: center;
    margin: 4px;
    &:first-child {
      border-bottom: 1px solid #5e6c84;
    }
  }
}
</style>
