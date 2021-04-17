import SockJS from 'sockjs-client';
import store from '@/store';
import bus from '@/utils/bus';

let socketInstance = null;

const socketConnect = () => {
  const baseURL =
    process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_URL : '';

  try {
    if (socketInstance === null) {
      const serverURL = `${baseURL}/websocket?m_id=${store.state.user.id}`;
      console.log(`서버 연결 시도 --- ${serverURL}`);
      socketInstance = new SockJS(serverURL);

      socketInstance.onopen = () => {
        console.log('소켓 연결 완료');
        socketReceive();
      };
    }
  } catch (error) {
    console.log(error, '소켓 연결 실패');
  }
};

const socketReceive = () => {
  socketInstance.onmessage = ({ data }) => {
    console.log('메세지 수신', data);
    bus.$emit('receive-message', data);
    store.dispatch('READ_PUSH_MESSAGE', store.state.user.id);
  };
};

const socketSend = messageData => {
  try {
    socketInstance.send(messageData);
  } catch (e) {
    console.log(e);
    alert('초대 메세지가 전송되지 않았습니다.');
  }
};

export { socketConnect, socketSend };
