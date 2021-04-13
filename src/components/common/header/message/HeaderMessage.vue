<template>
  <li class="auth-items">
    <a
      v-if="noReadCount !== 0"
      href=""
      class="auth-item red"
      @click.prevent="isMessageModal = true"
    >
      <awesome icon="bell"></awesome>
      <div class="push-message-wrap">
        <span class="push-message-length">{{ noReadCount }}</span>
      </div>
    </a>
    <a v-else href="" class="auth-item" @click.prevent="isMessageModal = true">
      <awesome icon="bell"></awesome>
    </a>
    <MessageModal
      v-if="isMessageModal"
      v-click-outside="() => (isMessageModal = false)"
      class="message-modal"
      @close="isMessageModal = false"
    />
  </li>
</template>

<script>
import MessageModal from '@/components/common/header/message/HeaderMessageModal.vue';
import { socketConnect } from '@/utils/socket';
import bus from '@/utils/bus';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    MessageModal,
  },

  data() {
    return {
      noReadCount: 0,
      isMessageModal: false,
    };
  },

  computed: {
    ...mapState(['pushMessage', 'user']),
  },

  watch: {
    pushMessage() {
      this.noReadCount = 0;
      if (
        this.pushMessage === null ||
        this.pushMessage === 'null' ||
        this.pushMessage === ''
      ) {
        return;
      }
      this.pushMessage.forEach(el => {
        if (el.isRead === 'N') {
          this.noReadCount += 1;
        }
      });
    },
  },

  created() {
    socketConnect();
    this.receiveMessageListener();
    this.readPushMessage();
  },

  beforeDestroy() {
    bus.$off('receive-message');
  },

  methods: {
    ...mapActions(['READ_PUSH_MESSAGE']),

    readPushMessage() {
      this.READ_PUSH_MESSAGE(this.user.id);
    },

    receiveMessageListener() {
      bus.$on('receive-message', data => {
        const message = JSON.parse(data);
        this.$notify({
          group: 'custom-template',
          duration: 5000,
          closeOnClick: true,
          title: '초대장이 도착했습니다',
          text: `${message.content}`,
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
a {
  z-index: 999;
  display: block;
  height: 30px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
}
.auth-item {
  cursor: pointer;
  border-radius: 2px;
  padding: 0 10px;
  background-color: rgba(255, 255, 255, 0.5);
  color: white;
  transition: all 0.3s;
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.3);
  }
  &.red {
    position: relative;
    .push-message-wrap {
      position: absolute;
      display: block;
      font-size: 10px;
      top: -3px;
      right: -1px;
      border-radius: 50%;
      background: red;
      padding: 2px;
      height: 11px;
      width: 11px;
      text-align: center;
      .push-message-length {
        position: relative;
        top: -11px;
      }
    }
  }
}
.message-modal {
  position: absolute;
  left: -200px;
  top: 40px;
}
</style>
