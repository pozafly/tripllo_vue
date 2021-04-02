<template>
  <button :class="[active, 'tab']" type="button" @click="$emit('input', id)">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: Number,
      default: null,
    },
  },

  computed: {
    active() {
      return this.value === this.id ? 'active' : false;
    },
  },
};
</script>

<style scoped lang="scss">
.tab {
  border-radius: 6px 6px 0 0;
  background: #4fa0e3;
  color: #fff;
  line-height: 24px;
  width: 200px;
  height: 30px;
  box-shadow: none;
  border: 0;
  outline: 0;
  &:hover {
    background: #88bce6;
  }
}
.active {
  background: #fff;
  color: #311d0a;
  &:hover {
    background: #fff;
  }
}
</style>
