import {pictures} from './draw-miniatures.js';
import {picturesData} from './main.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const closeButton = document.querySelector('.big-picture__cancel');

const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const createComments = (commentsData) => {
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  commentsData.forEach((comment) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;
    newComment.appendChild(img);

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;
    newComment.appendChild(p);

    fragment.appendChild(newComment);
  });

  commentsList.appendChild(fragment);
};

const createBigPictureData = (evt) => {
  const miniature = picturesData.find((picture) => picture.id === Number(evt.target.id));
  bigPicture.querySelector('.big-picture__img img').src = miniature.url;
  bigPicture.querySelector('.likes-count').textContent = miniature.likes;
  bigPicture.querySelector('.comments-count').textContent = miniature.comments.length;
  createComments(miniature.comments);
  bigPicture.querySelector('.social__caption').textContent = miniature.description;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture (evt) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  createBigPictureData(evt);

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', (event) => {
    onDocumentKeydown(event);
  });
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', (event) => {
    onDocumentKeydown(event);
  });
}

const renderBigPicture = () => {
  pictures.addEventListener('click', (evt) => {
    openBigPicture(evt);
  });
};

export {renderBigPicture};
