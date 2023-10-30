const isShorter = (str, length) => str.length <= length;

const isPolydrome = (str) => {
  str = str.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < Math.trunc(str.length / 2); i++) {
    if (str.at(i) !== str.at(-i - 1)) {
      return false;
    }
    return true;
  }
};

const getNumbers = (str) => {
  str = String(str);
  const numbers = '0123456789';
  let res = '';
  for (let i = 0; i < str.length; i++) {
    if (numbers.includes(str[i])) {
      res += str[i];
    }
  }
  return res === '' ? NaN : Number(res);
};

const isEnoughTime = (start, end, meetingStart, meetingTime) => {
  const meeting = meetingStart.split(':').map(Number);
  meeting[0] += Math.floor(meetingTime / 60) + Math.floor((meeting[1] + meetingTime % 60) / 60);
  meeting[1] = (meeting[1] + meetingTime % 60) % 60;
  const workStart = start.split(':').map(Number);
  const workEnd = end.split(':').map(Number);
  const workStartFits = workStart[0] < meeting[0] || (workStart[0] === meeting[0] && workStart[1] <= meeting[1]);
  const workEndFits = (workEnd[0] === meeting[0] && meeting[1] <= workEnd[1]) || workEnd[0] > meeting[0];
  return workStartFits && workEndFits;
};
