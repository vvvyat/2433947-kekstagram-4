import {creatMiniatures} from './draw-miniatures.js';
import {renderBigPicture} from './big-picture-modal.js';
import {showSuccessMessage, showErrorMessage, showLoadErrorMessage} from './fetch-messages.js';
import {closeUploadModal, uploadModal, imgUploadSubmit} from './upload-form.js';

const loadData = () => fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
  .then((picturesData) => {
    creatMiniatures(picturesData);
    renderBigPicture(picturesData);
  })
  .catch(() => showLoadErrorMessage());

const uploadData = (formData) => fetch('https://29.javascript.pages.academy/kekstagram', {
  method: 'POST',
  body: formData,
})
  .then((response) => {
    if (response.ok) {
      closeUploadModal();
      showSuccessMessage();
    } else {
      throw new Error();
    }
  })
  .catch(() => {
    uploadModal.classList.add('hidden');
    showErrorMessage();
  })
  .finally(() => {
    imgUploadSubmit.disabled = false;
  });

export {loadData, uploadData};
