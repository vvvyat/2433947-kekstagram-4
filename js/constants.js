const COMMENTS_TO_SHOW = 5;

const VALID_HASHTAG = /^#[a-zа-я0-9]{1,19}|^$/i;

const HASHTAG_MAX_COUNT = 5;

const HASHTAG_ERROR_MESSAGES = [
  'Использованы недопустимые символы или допущена ошибка в форме записи',
  'Один и тот же хэш-тег не может быть использован дважды',
  `Максимальное количесво хеш-тегов - ${HASHTAG_MAX_COUNT}`
];

const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP = 25;

const SHOWN_RANDOM_COUNT = 10;

export {COMMENTS_TO_SHOW, VALID_HASHTAG, HASHTAG_MAX_COUNT, HASHTAG_ERROR_MESSAGES,
  MAX_SCALE_VALUE, MIN_SCALE_VALUE, SCALE_STEP, SHOWN_RANDOM_COUNT};
