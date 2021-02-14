import SockJS from 'sockjs-client';
import store from '@/store';
import bus from '@/utils/bus';

function socketConnect() {
  const serverURL = `${process.env.VUE_APP_API_URL}/websocket?m_id=${store.state.user.id}`;
  console.log(`서버 연결 시도 --- ${serverURL}`);
  let newSocket = new SockJS(serverURL);

  store.commit('setSocket', newSocket);
  store.state.socket.onopen = () => {
    console.log('연결 완료');
    console.log(store.state.socket);

    store.state.socket.onmessage = ({ data }) => {
      console.log('메세지 수신');
      console.log(data);
      bus.$emit('receive-message', data);
    };
  };
}

function onClose(evt) {
  alert('연결 끊김');
}

//서버에 데이터 전송
// function socketOnSend(target, content) {
//   store.state.socket.send(JSON.stringify({ target, content }));
// }

export {
  socketConnect,
  onClose,
  // socketOnSend,
};
