<template>
  <li class="message-wrap">
    <span class="message-content">{{ message.content }}</span>
    <button class="message-btn save-btn">수락</button>
    <button class="message-btn remove-btn" @click="deleteMessage">거절</button>
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: ['message'],
  methods: {
    ...mapActions(['UPDATE_PUSH_MESSAGE', 'DELETE_PUSH_MESSAGE']),
    deleteMessage() {
      let confirm = window.confirm('해당 메세지를 삭제하시겠습니까?');
      if (confirm) this.DELETE_PUSH_MESSAGE({ id: this.message.id });
    },
  },
  mounted() {
    if (this.message.isRead === 'Y') return;
    this.UPDATE_PUSH_MESSAGE({ id: this.message.id, isRead: 'Y' });
  },
};
</script>

<style scoped lang="scss">
.message-wrap {
  position: relative;
  padding: 4px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.08);
  margin-bottom: 9px;
  .message-content {
    padding: 1px;
    display: block;
  }
  .message-btn {
    position: relative;
    width: 65px;
    height: 25px;
    margin: 10px 5px 0 0;
    right: -126px;
    top: -4px;
    &.save-btn {
      &:hover {
        background: #60bd4e;
      }
    }
    &.remove-btn {
      position: relative;
      /* right: -95px; */
      background: #cf513d;
      &:hover {
        background: #eb5a46;
      }
    }
  }
}
</style>
