const pictureTemplate = document.querySelector('#pictures').content;
const pictures = document.querySelector('.pictures');

const creatMiniatures = (picturesData) => {
  const fragment = document.createDocumentFragment();

  picturesData.forEach((picture) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__img').alt = picture.description;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

    fragment.appendChild(newPicture);
  });

  pictures.appendChild(fragment);
};

export {creatMiniatures};
