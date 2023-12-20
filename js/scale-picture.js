import {MAX_SCALE_VALUE, MIN_SCALE_VALUE, SCALE_STEP} from './constants.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreviewContainer = document.querySelector('.img-upload__preview');

let currentScale;

scaleControlValue.setAttribute('value', `${MAX_SCALE_VALUE}%`);

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > MIN_SCALE_VALUE) {
    currentScale -= SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    imgUploadPreviewContainer.style.transform = `scale(${currentScale / 100})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < MAX_SCALE_VALUE) {
    currentScale += SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    imgUploadPreviewContainer.style.transform = `scale(${currentScale / 100})`;
  }
});

const setCurrentScale = (value) => {
  currentScale = value;
};

export {setCurrentScale, imgUploadPreviewContainer};
