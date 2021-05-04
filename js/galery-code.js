import images from './gallery-items.js';


const onGaleryList = document.querySelector('.js-gallery');
const onLightboxOpenModal = document.querySelector('.lightbox');
const closeLightboxButon = document.querySelector('[data-action="close-lightbox"]');
const lightboxImageElement = document.querySelector('.lightbox__image');
const overlayEl = document.querySelector('.lightbox__overlay');

// ! Шаблон розмітки
const lightboxImage = images.map((image) => {
    return  `<li class="gallery__item">
            <a
                class="gallery__link"
                href="${image.original}">
                <img
                    class="gallery__image"
                    src="${image.preview}"
                    data-source="${image.original}"
                    alt="${image.description}"
                />
            </a>
            </li>`;
}).join('')

onGaleryList.insertAdjacentHTML('afterbegin', lightboxImage);

// ! Делегирование
onGaleryList.addEventListener('click', onLightboxConteinerClick);

function onLightboxConteinerClick(evt) {
    
    evt.preventDefault();

    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }
    
    onLightboxSwitchOnModal();
    const currentSource = evt.target.dataset.source;
    lightboxImageElement.src = currentSource;
}

// ! Відкриття модалки
function onLightboxSwitchOnModal() {
    window.addEventListener('keydown', onEscClose);
    window.addEventListener('keydown', changeOriginImageByKeys);
    onLightboxOpenModal.classList.add('is-open');
}


// ! Закриття модалки
closeLightboxButon.addEventListener('click', onLightboxCloseModal);

function onLightboxCloseModal() {
    window.removeEventListener('keydown', onEscClose);
    window.removeEventListener('keydown', changeOriginImageByKeys);
    onLightboxOpenModal.classList.remove('is-open');
    lightboxImageElement.src = '';
}

// ! Закриття по оверлею
overlayEl.addEventListener('click',onOverlayClose);
function onOverlayClose(evt) {
    onLightboxCloseModal()
}

// ! закриття по Esc
function onEscClose(evt) {
    console.log(evt.code)
    if (evt.code === 'Escape') {
        onLightboxCloseModal()
    }
}

// переключання клавою
let currentImg = 0;
function changeOriginImageByKeys(evt) {
    const onArrowRight = evt.code === "ArrowRight";
    const onArrowLeft = evt.code === "ArrowLeft";
  if (!onArrowRight && !onArrowLeft) {
    return;
  }
  if (onArrowRight) {
    currentImg += 1;
  }
  if (onArrowLeft) {
    currentImg -= 1;
  }
  // з
  if (currentImg > images.length - 1) {
      currentImg = 0;
  };
  if (currentImg < 0) {
      currentImg = images.length - 1;
  }
    setModalImg(currentImg);
}
function setModalImg(index) {
  // console.log(images[index]);
    const oriImg = images[index];
    lightboxImageElement.src = oriImg.original;
}