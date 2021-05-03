/**
 * @typedef {Object} Result
 * @property {boolean} flag - 체크 결과
 * @property {string} message - 실패 이유
 */

/**
 * 길이 체크 함수
 * @param {string} value - 길이를 체크할 대상
 * @param {number} first - 사잇 값 중 첫 번째 길이.(만약 last 변수가 없다면 이하의 의미가 된다.)
 * @param {number} last - 사잇 값 중 두 번째 길이.
 * @returns {Result}
 */
const length = (value, first, last) => {
  const length = value.length;
  let flag = false;
  let message = '';

  if (!last) {
    if (length < first) {
      flag = true;
    } else {
      message = `${first}자 이내로 입력해주세요.`;
      flag = false;
    }
  } else {
    if (length >= first && length <= last) {
      flag = true;
    } else {
      message = `${first} ~ ${last}자 사이로 입력해주세요.`;
      flag = false;
    }
  }
  return { flag, message };
};

/**
 * 공백 체크 함수
 * @param {string} value - 공백을 체크할 대상
 * @returns {Result}
 */
const blank = value => {
  let flag = false;
  let message = '';

  if (value.search(/\s/) != -1) {
    flag = false;
    message = '공백을 제거해주세요.';
  } else {
    flag = true;
  }

  return { flag, message };
};

/**
 * 비밀번호 정규화 체크 함수
 * @param {string} value - 비밀번호 체크 대상
 * @returns {Result}
 */
const password = value => {
  let flag = false;
  let message = '';

  const num = value.search(/[0-9]/g);
  const eng = value.search(/[a-z]/gi);
  const spe = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (num < 0 || eng < 0 || spe < 0) {
    message = '비밀번호는 영문, 숫자, 특수문자를 혼합하여 입력해주세요.';
    flag = false;
  } else {
    flag = true;
  }
  return { flag, message };
};

/**
 * 이메일 정규화 체크 함수
 * @param {string} value - 이메일 체크 대상
 * @returns {Result}
 */
const email = value => {
  let flag = false;
  let message = '';

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(value).toLowerCase())) {
    flag = true;
  } else {
    message = '이메일 유형에 맞지 않습니다.';
    flag = false;
  }
  return { flag, message };
};

/**
 * 아이디 정규화 체크 함수
 * @param {string} value - 아이디 체크 대상
 * @returns {Result}
 */
const id = value => {
  let flag = false;
  let message = '';

  const re = /^[a-z]+[a-z0-9]/g;
  if (re.test(String(value))) {
    flag = true;
  } else {
    message = '아이디는 영문자로 시작하는 영문자 또는 숫자이어야 합니다.';
    flag = false;
  }
  return { flag, message };
};

/**
 * 비밀번호 재입력과 비밀번호가 같은지 체크하는 함수
 * @param {string} first - 원래 입력한 비밀번호
 * @param {string} second - 후에 입력한 재입력 비밀번호
 * @returns {Result}
 */
const passwordAgainCheck = (first, second) => {
  let flag = false;
  let message = '';

  if (first === second) {
    flag = true;
  } else {
    message = '다시 입력한 비밀번호가 같지 않습니다.';
    flag = false;
  }
  return { flag, message };
};

/**
 * currying을 구현할 함수.
 * @param {function} regFunc - 정규식 함수
 * @param {function} lengthFunc - 길이체크 함수
 * @param {...number} args - 길이체크 함수에 들어갈 매개변수들
 * @param {string} value - 최종적으로 체크할 값
 * @returns {Result}
 */
const valid = (regFunc, lengthFunc, ...args) => value => {
  // closure 구현. 함수 안의 값은 함수 종료 후에도 값을 기억하고 있다.
  const regObj = regFunc(value);
  const blankObj = blank(value);
  const lengthObj = lengthFunc(value, ...args);

  if (regObj.flag) {
    if (blankObj.flag) {
      return lengthObj;
    } else {
      return blankObj;
    }
  } else {
    return regObj;
  }
};

const emailValidCheck = valid(email, length, 20);
const passwordValidCheck = valid(password, length, 1, 20);
const idValidCheck = valid(id, length, 4, 19);

/**
 * 사용법 예시
 * emailValidCheck('pozafly@gamil.com');
 * passwordValidCheck('1238447453ejfb');
 * idValidCheck('pozafly');
 */
export {
  emailValidCheck,
  passwordValidCheck,
  idValidCheck,
  passwordAgainCheck,
};

// 아래는 클로저로 바꾸기 전 사용했던 함수들.

// const validateId = id => {
//   const re = /^[a-z]+[a-z0-9]{5,19}$/g;
//   return re.test(String(id));
// };

// const validatePw = pw => {
//   const num = pw.search(/[0-9]/g);
//   const eng = pw.search(/[a-z]/gi);
//   const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
//   let message = '';

//   if (pw.length < 5 || pw.length > 20) {
//     message = '비밀번호는 5자리 ~ 20자리 이내로 입력해주세요.';
//     return [false, message];
//   } else if (pw.search(/\s/) != -1) {
//     message = '비밀번호는 공백 없이 입력해주세요.';
//     return [false, message];
//   } else if (num < 0 || eng < 0 || spe < 0) {
//     message = '비밀번호는 영문,숫자, 특수문자를 혼합하여 입력해주세요.';
//     return [false, message];
//   } else {
//     return [true, ''];
//   }
// };

// const validateEmail = email => {
//   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };

// export { validateId, validatePw, validateEmail };
