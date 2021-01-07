<template>
  <SideBase @close="$emit('close')">
    <div slot="header" class="header-text">Change Due Date</div>
    <div slot="content">
      <div class="DatePicker">
        <DatePicker
          mode="dateTime"
          v-model="date"
          color="blue"
          is-expanded
          :minute-increment="5"
          ref="datePicker"
        />
      </div>
      <div>
        <button class="duedate-btn save-btn" @click="onSave">Save</button>
        <button class="duedate-btn remove-btn" @click="onRemove">Remove</button>
      </div>
    </div>
  </SideBase>
</template>

<script>
import SideBase from './SideBase';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    SideBase,
  },
  data() {
    let date = new Date();
    date.setMinutes(0, 0, 0);
    return {
      date,
    };
  },
  computed: {
    ...mapState(['card']),
  },
  methods: {
    ...mapActions(['UPDATE_CARD']),
    onSave() {
      this.$emit('close');
      this.UPDATE_CARD({ id: this.card.id, dueDate: this.date });
    },
    onRemove() {
      this.$emit('close');
      this.UPDATE_CARD({ id: this.card.id, dueDate: '' });
    },
  },
  mounted() {
    if (this.card.dueDate === null) return;
    const dueDate = this.card.dueDate;
    this.date = new Date(dueDate);
    this.$refs.datePicker.move(dueDate);
  },
};
</script>

<style scoped lang="scss">
.duedate-btn {
  width: 80px;
  height: 37px;
  margin: 10px 5px 0;
  &.save-btn {
    &:hover {
      background: #60bd4e;
    }
  }
  &.remove-btn {
    position: relative;
    right: -95px;
    background: #cf513d;
    &:hover {
      background: #eb5a46;
    }
  }
}
</style>
