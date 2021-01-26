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
  border-radius: 2px 2px 0 0;
  background: #fff;
  color: #311d0a;
  line-height: 24px;
  width: 200px;
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
