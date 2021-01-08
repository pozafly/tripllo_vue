// 필터 관련 함수
export function formatDate(value) {
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
}
