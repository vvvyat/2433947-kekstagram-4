const validHashtag = /^#[a-zа-я0-9]{1,19}|^$/i;

const hashtagMaxCount = 5;

const hashtagErrorMessages = [
  'Использованы недопустимые символы или допущена ошибка в форме записи',
  'Один и тот же хэш-тег не может быть использован дважды',
  `Максимальное количесво хеш-тегов - ${hashtagMaxCount}`
];

const maxScaleValue = 100;
const minScaleValue = 25;
const scaleStep = 25;

export {validHashtag, hashtagMaxCount, hashtagErrorMessages, maxScaleValue, minScaleValue, scaleStep};
