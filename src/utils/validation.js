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

// 공백
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

// 섞어 썼는지 조사 함수(비밀번호에 사용됨.)
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

// 이메일
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

// id 정규식
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

// pw again
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

const valid = (regFunc, lengthFunc, ...args) => value => {
  // console.log(regFunc(value).flag)
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

export {
  emailValidCheck,
  passwordValidCheck,
  idValidCheck,
  passwordAgainCheck,
};

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
