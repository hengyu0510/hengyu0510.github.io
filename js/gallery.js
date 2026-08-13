(function () {
  const gallery = document.getElementById('gallery');
  const container = document.getElementById('gallery-container');
  const previousButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  if (!gallery || !container || !previousButton || !nextButton) return;

  const photos = (container.dataset.galleryImages || '')
    .split(',')
    .map((src) => src.trim())
    .filter(Boolean);

  if (!photos.length) return;

  let currentIndex = 0;

  photos.forEach((src, index) => {
    const item = document.createElement('div');
    const image = document.createElement('img');
    item.className = 'gallery-item';
    image.src = src;
    image.alt = `Campus and daily life photo ${index + 1}`;
    image.loading = index === 0 ? 'eager' : 'lazy';
    image.decoding = 'async';
    item.appendChild(image);
    gallery.appendChild(item);
  });

  function render() {
    gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  previousButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    render();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % photos.length;
    render();
  });

  render();
})();
