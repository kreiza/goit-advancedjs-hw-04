import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import {
  createGalleryMarkup,
  renderGallery,
  clearGallery,
  toggleLoadMore,
  showEndMessage,
  hideEndMessage,
} from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let lightbox = null;

const form = document.querySelector('form');
const loadMoreBtn = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');

toggleLoadMore(false);
hideEndMessage();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearGallery();
  toggleLoadMore(false);
  hideEndMessage();

  currentQuery = form.elements.search.value.trim();
  if (!currentQuery) return;

  currentPage = 1;
  await loadAndRender();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await loadAndRender();
});

async function loadAndRender() {
  try {
    const { hits, totalHits: hitsCount } = await fetchImages(currentQuery, currentPage);
    totalHits = hitsCount;

    if (currentPage === 1) clearGallery();

    if (hits.length === 0) {
      toggleLoadMore(false);
      showEndMessage();
      return;
    }

    renderGallery(createGalleryMarkup(hits));

    // Ініціалізація або оновлення lightbox
    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a');
    } else {
      lightbox.refresh();
    }

    // Показати/сховати кнопку "Load more" і повідомлення
    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      toggleLoadMore(true);
      hideEndMessage();
    } else {
      toggleLoadMore(false);
      showEndMessage();
    }

    // Плавне прокручування сторінки після підвантаження нових зображень
    if (currentPage > 1) {
      const firstCard = document.querySelector('.gallery').firstElementChild;
      if (firstCard) {
        const { height: cardHeight } = firstCard.getBoundingClientRect();
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
      }
    }
  } catch (err) {
    console.error(err);
    toggleLoadMore(false);
    showEndMessage();
  }
}
