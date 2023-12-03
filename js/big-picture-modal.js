import {pictures} from './draw-miniatures.js';
import {picturesData} from './main.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const commentsList = bigPicture.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsToShow = 5;
let comments;
let showedComments = 0;

const createComments = (commentsData) => {
  commentsList.innerHTML = '';
  const commentsArray = [];
  commentsData.forEach((comment) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    newComment.innerHTML =
      `<img class="social__picture" src=${comment.avatar} alt=${comment.name} width="35" height="35">
      <p>${comment.message}</p>`;

    commentsArray.push(newComment);
  });

  return commentsArray;
};

const loadComments = () => {
  const loadStart = showedComments;
  showedComments = Math.min(showedComments + commentsToShow,  comments.length);
  const commentForm = comments.length === 1 ? 'комментария' : 'комментариев';
  commentCount.innerHTML = `${showedComments} из <span class="comments-count">${comments.length}</span> ${commentForm}`;
  if (comments.length <= showedComments) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  for (let i = loadStart; i < showedComments; i++) {
    commentsList.appendChild(comments[i]);
  }
};

const onCommentsLoaderClick = () => {
  loadComments();
};

const createBigPictureData = (evt) => {
  const miniature = picturesData.find((picture) => picture.id === Number(evt.target.id));
  bigPicture.querySelector('.big-picture__img img').src = miniature.url;
  bigPicture.querySelector('.likes-count').textContent = miniature.likes;
  bigPicture.querySelector('.comments-count').textContent = miniature.comments.length;
  comments = createComments(miniature.comments);
  loadComments();
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

  createBigPictureData(evt);

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', (event) => {
    onDocumentKeydown(event);
  });
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', (event) => {
    onDocumentKeydown(event);
  });
  showedComments = 0;
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

const renderBigPicture = () => {
  pictures.addEventListener('click', (evt) => {
    openBigPicture(evt);
  });
};

export {renderBigPicture};
