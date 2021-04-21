// null 체크
const isEmpty = value => {
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    value.length === 0
  ) {
    return true;
  } else {
    return false;
  }
};

export { isEmpty };
