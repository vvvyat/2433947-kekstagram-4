const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (arrName) => arrName[getRandomInteger(0, arrName.length - 1)];

const getRandomId = (min, max) => {
  const previousIds = [];
  return function () {
    let id = getRandomInteger(min, max);
    while (previousIds.includes(id)) {
      id = getRandomInteger(min, max);
    }
    previousIds.push(id);
    return id;
  };
};

export {getRandomInteger, getRandomArrayElement, getRandomId};
