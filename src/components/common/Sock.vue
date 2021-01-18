<template>
  <div></div>
</template>

<script>
import SockJS from 'sockjs-client';
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      target: '',
      content: '',
      isConnect: false,
    };
  },
  created() {
    this.connect();
  },
  computed: {
    ...mapState(['user', 'socket']),
  },
  methods: {
    ...mapMutations(['setSocket']),
    connect() {
      const serverURL = `http://localhost:3000/websocket?m_id=${this.user.id}`;
      console.log(`서버 연결 시도 --- ${serverURL}`);
      let newSocket = new SockJS(serverURL);

      this.setSocket(newSocket);
      this.socket.onopen = () => {
        this.isConnect = true;
        console.log('연결 완료');
        console.log(this.socket);

        this.socket.onmessage = ({ data }) => {
          console.log('메세지 수신');
          console.log(data);
          this.$emit('receive', data);
        };
      };
    },

    onClose(evt) {
      alert('연결 끊김');
    },

    onSend() {
      //서버에 데이터 전송
      this.socket.send(
        JSON.stringify({ target: this.target, content: this.content }),
      );
    },
  },
};
</script>

<style></style>
