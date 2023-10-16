const descriptions = [
  'Отличная получилась фотография',
  'Чудесный день!',
  'Небо зараза какое синее',
  'Могу написать всё что угодно',
  'Хороший кадр',
  'Какой-то текст',
  'Хорошего всем дня!',
  'Вылазь из интернета и иди работай',
  'Хехе',
  'Мяу'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['София', 'Виктория', 'Кирилл', 'Илья', 'Максим', 'Денис', 'Анастасия', 'Кира'];

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

const getId = getRandomId(1, 25);
const getUrlId = getRandomId(1, 25);
const getCommentId = getRandomId(0, 1000);

const generateComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names)
});

const getComments = () => Array.from({length: getRandomInteger(0, 30)}, generateComment);

const generatePhotoDescription = () => ({
  id: getId(),
  url: `photos/${getUrlId()}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(15, 200),
  comments: getComments()
});

const getPhotoDescriptions = () => Array.from({length: 25}, generatePhotoDescription);
