import {getRandomId, getRandomInteger, getRandomArrayElement} from './util.js';
import {descriptions, messages, names} from './constants.js';

const getId = getRandomId(1, 25);
const getUrlId = getRandomId(1, 25);
const getCommentId = getRandomId(0, 1000);

const getComments = () => (
  Array.from({length: getRandomInteger(0, 30)}, () => ({
    id: getCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  }))
);

const getPhotoDescriptions = () => (
  Array.from({length: 25}, () => ({
    id: getId(),
    url: `photos/${getUrlId()}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomInteger(15, 200),
    comments: getComments()
  }))
);

export {getPhotoDescriptions};
