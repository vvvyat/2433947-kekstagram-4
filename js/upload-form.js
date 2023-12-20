import {isEscapeKey} from './util.js';
import {VALID_HASHTAG, HASHTAG_MAX_COUNT, HASHTAG_ERROR_MESSAGES, MAX_SCALE_VALUE} from './constants.js';
import {setCurrentScale, imgUploadPreviewContainer} from './scale-picture.js';
import {slider} from './filters.js';
import {uploadData} from './fetch.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviewList = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getSplitedHashtags = (tags) => tags.toLowerCase().trim().split(/\s+/g);

const isHashtagsValid = (tags) => getSplitedHashtags(tags).every((tag) => VALID_HASHTAG.test(tag));

const isHashtagsUnique = (tags) => getSplitedHashtags(tags).length === new Set(getSplitedHashtags(tags)).size;

const isHashtagsLimited = (tags) => getSplitedHashtags(tags).length <= HASHTAG_MAX_COUNT;

pristine.addValidator(hashtagField, isHashtagsValid, HASHTAG_ERROR_MESSAGES[0]);
pristine.addValidator(hashtagField, isHashtagsUnique, HASHTAG_ERROR_MESSAGES[1]);
pristine.addValidator(hashtagField, isHashtagsLimited, HASHTAG_ERROR_MESSAGES[2]);
pristine.addValidator(descriptionField, (value) => value.length <= 140, 'Максимальная длина 140 символов');

hashtagField.addEventListener('change', () => {
  pristine.validate();
});

descriptionField.addEventListener('change', () => {
  pristine.validate();
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    imgUploadSubmit.disabled = true;
    uploadData(formData);
  }
});

const onDocumentKeydown = (evt) => {
  if (!(document.activeElement === hashtagField || document.activeElement === descriptionField) && isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

function openUploadModal () {
  uploadModal.classList.remove('hidden');
  body.classList.remove('modal-open');

  setCurrentScale(MAX_SCALE_VALUE);
  imgUploadPreviewContainer.style.transform = `scale(${MAX_SCALE_VALUE / 100})`;
  imgUploadPreviewContainer.style.filter = null;
  slider.classList.add('hidden');

  closeFormButton.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadModal () {
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadInput.addEventListener('input', openUploadModal);

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  const uploadInputUrl = URL.createObjectURL(file);
  imgUploadPreview.src = uploadInputUrl;
  for (const effectPreview of effectsPreviewList) {
    effectPreview.style.backgroundImage = `url(${uploadInputUrl})`;
  }
});

export {closeUploadModal, uploadModal, imgUploadSubmit};
