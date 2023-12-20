import {shuffleArray} from './util.js';
import {SHOWN_RANDOM_COUNT} from './constants.js';
import {creatMiniatures} from './draw-miniatures.js';

const imgFiltersContainer = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const onFilterDefault = (picturesData) => {
  const activeFilter = document.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  filterDefaultButton.classList.add('img-filters__button--active');
  const createdMiniatures = document.querySelectorAll('.picture');
  for (const miniature of createdMiniatures) {
    miniature.remove();
  }
  creatMiniatures(picturesData);
};

const onFilterRandom = (picturesData) => {
  const activeFilter = document.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  filterRandomButton.classList.add('img-filters__button--active');
  const randomPicturesData = shuffleArray(picturesData).slice(0, SHOWN_RANDOM_COUNT);
  const createdMiniatures = document.querySelectorAll('.picture');
  for (const miniature of createdMiniatures) {
    miniature.remove();
  }
  creatMiniatures(randomPicturesData);
};

const onFilterDiscussed = (picturesData) => {
  const activeFilter = document.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  filterDiscussedButton.classList.add('img-filters__button--active');
  const picturesDataCopy = picturesData.slice();
  const sortedPicturesData = picturesDataCopy.sort((pic1, pic2) => pic2.comments.length - pic1.comments.length);
  const createdMiniatures = document.querySelectorAll('.picture');
  for (const miniature of createdMiniatures) {
    miniature.remove();
  }
  creatMiniatures(sortedPicturesData);
};

const setFilterDefaultClick = (cb) => {
  filterDefaultButton.addEventListener('click', () => {
    cb();
  });
};

const setFilterRandomClick = (cb) => {
  filterRandomButton.addEventListener('click', () => {
    cb();
  });
};

const setFilterDiscussedClick = (cb) => {
  filterDiscussedButton.addEventListener('click', () => {
    cb();
  });
};

export {imgFiltersContainer, setFilterDefaultClick, setFilterRandomClick, setFilterDiscussedClick,
  onFilterDefault, onFilterRandom, onFilterDiscussed};
