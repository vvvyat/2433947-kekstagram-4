import {isEscapeKey} from './util.js';
import {uploadModal} from './upload-form.js';

const body = document.body;
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onDocumentClick = (evt) => {
  const messageModal = body.lastChild.querySelector('div');
  if (!messageModal.contains(evt.target)) {
    closeMessage();
  }
};

function closeMessage () {
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  const isErrorMessage = body.lastChild.isEqualNode(errorMessageTemplate.cloneNode(true).childNodes[1]);
  if (isErrorMessage) {
    uploadModal.classList.remove('hidden');
  }
  body.lastChild.remove();
}

const showSuccessMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  body.append(message.childNodes[1]);
  const successButton = document.querySelector('.success__button');

  successButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  body.appendChild(message.childNodes[1]);
  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showLoadErrorMessage = () => {
  const message = document.createElement('section');
  message.classList.add('error');
  message.innerHTML =
    `<div class="error__inner">
        <h2 class="error__title">Ошибка загрузки страницы</h2>
        <button type="button" class="error__button">Ок</button>
      </div>`;
  body.appendChild(message);
  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export {showSuccessMessage, showErrorMessage, showLoadErrorMessage};
