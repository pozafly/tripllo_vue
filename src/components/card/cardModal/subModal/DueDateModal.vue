<template>
  <MiniModal @close="$emit('close')">
    <div slot="header" class="header-text">Change Due Date</div>
    <div slot="content">
      <div class="DatePicker">
        <DatePicker
          ref="datePicker"
          v-model="date"
          mode="dateTime"
          color="blue"
          is-expanded
          :minute-increment="5"
        />
      </div>
      <div>
        <button class="duedate-btn save-btn" type="button" @click="onSave">
          Save
        </button>
        <button class="duedate-btn remove-btn" type="button" @click="onRemove">
          Cancel
        </button>
      </div>
    </div>
  </MiniModal>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
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

  mounted() {
    this.cardDueDateSync();
  },

  methods: {
    ...mapActions(['UPDATE_CARD']),

    cardDueDateSync() {
      if (this.card.dueDate === null) {
        return;
      }
      const dueDate = this.card.dueDate;
      this.date = new Date(dueDate);
      this.$refs.datePicker.move(dueDate);
    },

    onSave() {
      this.$emit('close');

      const year = this.date.getFullYear();
      const month = this.plusZero(this.date.getMonth() + 1);
      const date = this.plusZero(this.date.getDate());
      const hours = this.plusZero(this.date.getHours());
      const minutes = this.plusZero(this.date.getMinutes());
      const dueDate = `${year}${month}${date}${hours}${minutes}`;

      this.UPDATE_CARD({ id: this.card.id, dueDate });
    },

    plusZero(value) {
      return (value = value > 9 ? value : `0${value}`);
    },

    onRemove() {
      this.$emit('close');
      this.UPDATE_CARD({ id: this.card.id, dueDate: '' });
    },
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
