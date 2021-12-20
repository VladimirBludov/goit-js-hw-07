import { galleryItems } from './gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('.gallery'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);

refs.galleryContainer.innerHTML = galleryMarkup;

refs.galleryContainer.addEventListener('click', evt => {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const originalImgUrl = evt.target.dataset.source;

  const modalWindowImg = createGalleryModal(originalImgUrl);

  modalWindowImg.show();

  window.addEventListener('keydown', function closeModalWithEsc(evt) {
    if (evt.code === 'Escape') {
      modalWindowImg.close(() => {
        window.removeEventListener('keydown', closeModalWithEsc);
      });
    }
  });
});

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(item => createGalleryItem(item)).join('');
}

function createGalleryItem({ preview, original, description }) {
  return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
          loading="lazy"
        />
      </a>
    </div>`;
}

function createGalleryModal(imgUrl) {
  return basicLightbox.create(`
    <img src="${imgUrl}" width="800" height="600">
  `);
}
