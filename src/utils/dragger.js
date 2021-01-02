import dragula from 'dragula';
import './dragula.css';

const dragger = {
  init(container, options, direction) {
    return dragula([...container], options);
  },
  // candidates : 후보군 || type : card인지 list인지 구분
  siblings({ el, wrapper, candidates, type }) {
    const curId = el.dataset[type + 'Id'] * 1;

    let prev = null;
    let next = null;

    candidates.forEach((el, idx, arr) => {
      const id = el.dataset[type + 'Id'] * 1;
      if (id === curId) {
        // 이전 카드가 첫번째 카드가 아니라면 이전(-1)card의 id, pos를 줌
        prev =
          idx > 0
            ? {
                id: arr[idx - 1].dataset[type + 'Id'] * 1,
                pos: arr[idx - 1].dataset[type + 'Pos'] * 1,
              }
            : null;

        // 이후 카드가 마지막 카드가 아니라면 이후(+1)card의 id, pos를 줌
        next =
          idx < arr.length - 1
            ? {
                id: arr[idx + 1].dataset[type + 'Id'] * 1,
                pos: arr[idx + 1].dataset[type + 'Pos'] * 1,
              }
            : null;
      }
    });
    return { prev, next };
  },
};

export default dragger;
