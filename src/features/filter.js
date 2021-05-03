// 시간 나열 filter
const normalFormatDate = value => {
  const date = new Date(value);
  const year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;

  let day = date.getDate();
  day = day > 9 ? day : `0${day}`;

  let hours = date.getHours();

  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours > 9 ? hours : `0${hours}`;

  let minutes = date.getMinutes();
  minutes = minutes > 9 ? minutes : `0${minutes}`;

  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
};

// 몇분전 filter
const timeForToday = value => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );
  if (betweenTime < 1) {
    return '방금전';
  }
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const filters = Vue => {
  Vue.filter('normalFormatDate', normalFormatDate);
  Vue.filter('timeForToday', timeForToday);
};
