import { galleryItems } from './gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('.gallery'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);

refs.galleryContainer.innerHTML = galleryMarkup;

const modalWindowImg = createGalleryModal();

refs.galleryContainer.addEventListener('click', evt => {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  modalWindowImg.element().querySelector('img').src = evt.target.dataset.source;

  modalWindowImg.show();
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

function createGalleryModal() {
  return basicLightbox.create(
    `
    <img src="" width="800" height="600">
    `,
    {
      onShow: instance => {
        window.addEventListener('keydown', onClickEsc);
      },

      onClose: instance => {
        window.removeEventListener('keydown', onClickEsc);
      },
    },
  );
}

function onClickEsc(evt) {
  if (evt.code === 'Escape') {
    modalWindowImg.close();
  }
}
