import dragula from 'dragula';
import { updateListAPI } from '@/api/list';
import { updateCardAPI } from '@/api/card';
import './dragula.css';
import store from '@/store';

let cDragger = '';
let lDragger = '';

const dragger = {
  init(container, options) {
    return dragula([...container], options);
  },

  cardDragger() {
    if (cDragger) {
      cDragger.destroy();
    }
    cDragger = dragger.init(
      Array.from(document.querySelectorAll('.card-list')),
    );

    cDragger.on('drop', async (el, wrapper, target, siblings) => {
      // list 이동과는 다르게, card 이동은 list간의 이동도 가능해야하기때문에 listId 를 줌.
      const listId = wrapper.getAttribute('listId') * 1;

      // 모듈화
      const { id, pos } = this.computePos('card', el, wrapper);

      try {
        await updateCardAPI(id, { listId, pos });
        await store.dispatch('READ_BOARD_DETAIL', store.state.board.id);
      } catch (error) {
        console.log(error);
        alert('카드 순서가 업데이트 되지 않았습니다.');
      }
    });
  },

  listDragger() {
    if (lDragger) {
      lDragger.destroy();
    }
    const options = {
      invalid: (el, handle) => !/^list/.test(handle.className),
      // list는 가로 방향으로만 동작하므로 options에 direction을 넣어줘야 함.
      direction: 'horizontal',
    };
    lDragger = dragger.init(
      Array.from(document.querySelectorAll('.list-section')),
      options,
      'list',
    );
    lDragger.on('drop', async (el, wrapper, target, siblings) => {
      // 모듈화
      const { id, pos } = this.computePos('list', el, wrapper);

      try {
        await updateListAPI(id, { pos });
        await store.dispatch('READ_BOARD_DETAIL', store.state.board.id);
      } catch (error) {
        console.log(error);
        alert('리스트 순서가 업데이트 되지 않았습니다.');
      }
    });
  },

  computePos(type, el, wrapper) {
    const id = el.getAttribute(`${type}Id`) * 1;
    let pos = 65535;
    const selectDom = type === 'list' ? '.list' : '.card-item';

    const { prev, next } = this.siblings({
      el,
      wrapper,
      candidates: Array.from(wrapper.querySelectorAll(selectDom)),
      type,
    });

    if (!prev && next) {
      // 맨 앞으로 옮겼다면,
      pos = next.pos / 2;
    } else if (!next && prev) {
      // 맨 뒤로 옮겼다면,
      pos = prev.pos * 2;
    } else if (prev && next) {
      // 중간 어딘가로 옮겼다면,
      pos = (prev.pos + next.pos) / 2;
    }

    return { id, pos };
  },

  // candidates : 후보군 || type : card인지 list인지 구분
  siblings({ el, wrapper, candidates, type }) {
    const curId = el.getAttribute(`${type}Id`) * 1;

    let prev = null;
    let next = null;

    candidates.forEach((el, idx, arr) => {
      const id = el.getAttribute(`${type}Id`) * 1;
      if (id === curId) {
        // 이전 카드가 첫번째 카드가 아니라면 이전(-1)card의 id, pos를 줌
        prev =
          idx > 0
            ? {
                id: arr[idx - 1].getAttribute(`${type}Id`) * 1,
                pos: arr[idx - 1].getAttribute('pos') * 1,
              }
            : null;

        // 이후 카드가 마지막 카드가 아니라면 이후(+1)card의 id, pos를 줌
        next =
          idx < arr.length - 1
            ? {
                id: arr[idx + 1].getAttribute(`${type}Id`) * 1,
                pos: arr[idx + 1].getAttribute('pos') * 1,
              }
            : null;
      }
    });
    return { prev, next };
  },
};

export default dragger;
