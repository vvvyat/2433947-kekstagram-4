import {isEscapeKey} from './util.js';
import {validHashtag, hashtagMaxCount, hashtagErrorMessages} from './constants.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getSplitedHashtags = (tags) => tags.toLowerCase().trim().split(/\s+/g);

const isHashtagsValid = (tags) => getSplitedHashtags(tags).every((tag) => validHashtag.test(tag));

const isHashtagsUnique = (tags) => getSplitedHashtags(tags).length === new Set(getSplitedHashtags(tags)).size;

const isHashtagsLimited = (tags) => getSplitedHashtags(tags).length <= hashtagMaxCount;

pristine.addValidator(hashtagField, isHashtagsValid, hashtagErrorMessages[0]);
pristine.addValidator(hashtagField, isHashtagsUnique, hashtagErrorMessages[1]);
pristine.addValidator(hashtagField, isHashtagsLimited, hashtagErrorMessages[2]);
pristine.addValidator(descriptionField, (value) => value.length <= 140, 'Максимальная длина 140 символов');

hashtagField.addEventListener('change', () => {
  pristine.validate();
});

descriptionField.addEventListener('change', () => {
  pristine.validate();
});

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
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

uploadInput.addEventListener('change', openUploadModal);
