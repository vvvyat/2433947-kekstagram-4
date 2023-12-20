const isEscapeKey = (evt) => evt.keyCode === 27;

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const shuffleArray = (array) => {
  const arrCopy = array.slice();
  for (let currentIndex = 0; currentIndex < arrCopy.length; currentIndex++) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    [arrCopy[currentIndex], arrCopy[randomIndex]] = [arrCopy[randomIndex], arrCopy[currentIndex]];
  }
  return arrCopy;
};

export {isEscapeKey, debounce, shuffleArray};
