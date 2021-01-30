<template>
  <button @click="$emit('input', id)" :class="[active, 'tab']">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    id: Number,
    label: String,
    value: Number,
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
  background: #fff;
  color: #311d0a;
  line-height: 24px;
  width: 200px;
  height: 30px;
  box-shadow: none;
  border: 0;
  outline: 0;
  &:hover {
    background: #eeeeee;
  }
}
.active {
  background: #4fa0e3;
  color: #fff;
  &:hover {
    background: #88bce6;
  }
}
</style>
