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
