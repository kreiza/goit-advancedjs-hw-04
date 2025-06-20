export function createGalleryMarkup(images) {
  return images
    .map(
      ({
         webformatURL,
         largeImageURL,
         tags,
         likes,
         views,
         comments,
         downloads,
       }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${likes}</p>
          <p><b>Views</b> ${views}</p>
          <p><b>Comments</b> ${comments}</p>
          <p><b>Downloads</b> ${downloads}</p>
        </div>
      </li>
    `
    )
    .join('');
}

export function renderGallery(markup) {
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function toggleLoadMore(show = true) {
  const btn = document.querySelector('.load-more');
  if (btn) btn.style.display = show ? 'block' : 'none';
}

export function showEndMessage() {
  const msg = document.querySelector('.end-message');
  if (msg) msg.style.display = 'block';
}

export function hideEndMessage() {
  const msg = document.querySelector('.end-message');
  if (msg) msg.style.display = 'none';
}
