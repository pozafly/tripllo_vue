function validateId(id) {
  const re = /^[a-z]+[a-z0-9]{5,19}$/g;
  return re.test(String(id));
}

function validatePw(pw) {
  const num = pw.search(/[0-9]/g);
  const eng = pw.search(/[a-z]/gi);
  const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  let message = '';

  if (pw.length < 5 || pw.length > 20) {
    message = '비밀번호는 5자리 ~ 20자리 이내로 입력해주세요.';
    return [false, message];
  } else if (pw.search(/\s/) != -1) {
    message = '비밀번호는 공백 없이 입력해주세요.';
    return [false, message];
  } else if (num < 0 || eng < 0 || spe < 0) {
    message = '비밀번호는 영문,숫자, 특수문자를 혼합하여 입력해주세요.';
    return [false, message];
  } else {
    return [true, ''];
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { validateId, validatePw, validateEmail };
