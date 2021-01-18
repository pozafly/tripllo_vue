<template>
  <div>
    <Header />
    <hr />
    타겟이름: <input v-model="target" type="text" /> 내용:
    <input v-model="content" type="text" @keypress.enter="onSend" />
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import SockJS from 'sockjs-client';
import { mapState } from 'vuex';

export default {
  components: { Header },
  data() {
    return {
      socket: null,
      target: '',
      content: '',
      isConnect: false,
    };
  },
  created() {
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    this.connect();
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    connect() {
      const serverURL = `http://localhost:3000?m_id=${this.user.id}`;
      console.log(`서버 연결 시도 --- ${serverURL}`);
      this.socket = new SockJS(serverURL);

      this.socket.onopen = () => {
        this.isConnect = true;
        console.log('연결 완료');
        console.log(this.socket);

        this.socket.onmessage = ({ data }) => {
          console.log('메세지 수신');
          console.log(data);
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
