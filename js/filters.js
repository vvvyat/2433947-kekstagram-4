import {imgUploadPreview} from './scale-picture.js';

const slider = document.querySelector('.img-upload__effect-level');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const effectLevelValue = document.querySelector('.effect-level__value');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 0
  },
  start: 0,
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
});

effectNone.addEventListener('click', () => {
  slider.classList.add('hidden');
  imgUploadPreview.style.filter = null;
});

effectChrome.addEventListener('click', () => {
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  });
  imgUploadPreview.style.filter = null;
  slider.noUiSlider.on('update', () => {
    imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  });
});

effectSepia.addEventListener('click', () => {
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  });
  imgUploadPreview.style.filter = null;
  slider.noUiSlider.on('update', () => {
    imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
  });
});

effectMarvin.addEventListener('click', () => {
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  });
  imgUploadPreview.style.filter = null;
  slider.noUiSlider.on('update', () => {
    imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  });
});

effectPhobos.addEventListener('click', () => {
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  });
  imgUploadPreview.style.filter = null;
  slider.noUiSlider.on('update', () => {
    imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  });
});

effectHeat.addEventListener('click', () => {
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  });
  imgUploadPreview.style.filter = null;
  slider.noUiSlider.on('update', () => {
    imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
  });
});

export {slider};
