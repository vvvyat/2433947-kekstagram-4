import {picturesContainer} from './draw-miniatures.js';
import {isEscapeKey} from './util.js';
import {COMMENTS_TO_SHOW} from './constants.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const socialComments = bigPicture.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

let commentsList;
let showedCommentsCount;

const createComments = (commentsData) => {
  socialComments.innerText = '';
  const comments = [];
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

    comments.push(newComment);
  });

  return comments;
};

const loadComments = () => {
  const loadStart = showedCommentsCount;
  showedCommentsCount = Math.min(showedCommentsCount + COMMENTS_TO_SHOW,  commentsList.length);
  const commentForm = commentsList.length === 1 ? 'комментария' : 'комментариев';
  commentCount.innerHTML = `${showedCommentsCount} из <span class="comments-count">${commentsList.length}</span> ${commentForm}`;
  if (commentsList.length <= showedCommentsCount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  for (let i = loadStart; i < showedCommentsCount; i++) {
    socialComments.appendChild(commentsList[i]);
  }
};

const onCommentsLoaderClick = () => {
  loadComments();
};

const createBigPictureData = (evt, picturesData) => {
  const miniature = picturesData.find((picture) => picture.id === Number(evt.target.id));
  bigPicture.querySelector('.big-picture__img img').src = miniature.url;
  bigPicture.querySelector('.likes-count').textContent = miniature.likes;
  bigPicture.querySelector('.comments-count').textContent = miniature.comments.length;
  commentsList = createComments(miniature.comments);
  showedCommentsCount = 0;
  loadComments();
  bigPicture.querySelector('.social__caption').textContent = miniature.description;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture (evt, picturesData) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  createBigPictureData(evt, picturesData);

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', (event) => {
    onDocumentKeydown(event);
  });
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', (event) => {
    onDocumentKeydown(event);
  });
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

const renderBigPicture = (picturesData) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (!evt.target.closest('.img-upload')) {
      openBigPicture(evt, picturesData);
    }
  });
};

export {renderBigPicture};
