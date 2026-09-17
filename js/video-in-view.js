// Видео с атрибутом data-play-in-view играет, только пока находится в области просмотра.
const videos = document.querySelectorAll('video[data-play-in-view]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) target.play().catch(() => {});
    else target.pause();
  });
}, { threshold: 0.5 });

videos.forEach((video) => observer.observe(video));
